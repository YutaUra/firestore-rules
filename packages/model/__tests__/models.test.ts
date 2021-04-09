import { literal, op } from '@firestore-rules/core'
import { FirestoreRulesModel } from '../src/models'

describe('@firestore-rules/model/models.ts FirestoreRulesModel', () => {
  it('basic usage', () => {
    class UserCollection extends FirestoreRulesModel {
      get path() {
        return '/users/{uid}'
      }

      get isAuthenticated() {
        return this.defineFunc(
          op.ne(this.ctx.request.auth, new literal.FirestoreRulesLiteralNull())
        )
      }
      get isMe() {
        const uid = this.args('uid')
        return this.defineFunc(
          op.and(
            this.isAuthenticated.call([]),
            op.eq(uid, this.ctx.request.auth.uid)
          )
        )
      }
      get() {
        return this.isMe.call([this.variables.uid])
      }
      create() {
        return this.isAuthenticated.call([])
      }
      update() {
        return this.isMe.call([this.variables.uid])
      }
    }
    const userCollection = new UserCollection()
    expect(userCollection.render()).toEqual(`match /users/{uid} {
function isAuthenticated() {
    return (request.auth != null);
}
function isMe(uid) {
    return (isAuthenticated() && (uid == request.auth.uid));
}
allow get: if isMe(uid);
allow create: if isAuthenticated();
allow update: if isMe(uid);
}`)
  })

  test('nested model', () => {
    class Document extends FirestoreRulesModel {
      get path() {
        return '/databases/{database}/documents'
      }
      get isAuthenticated() {
        return this.defineFunc(
          op.ne(this.ctx.request.auth, new literal.FirestoreRulesLiteralNull())
        )
      }
      get isMe() {
        const uid = this.args('uid')
        return this.defineFunc(
          op.and(
            this.isAuthenticated.call([]),
            op.eq(uid, this.ctx.request.auth.uid)
          )
        )
      }

      get userCollection() {
        const self = this
        return this.defineModel(
          class extends FirestoreRulesModel {
            get path() {
              return '/users/{uid}'
            }
            get() {
              return self.isMe.call([this.variables.uid])
            }
            create() {
              return self.isAuthenticated.call([])
            }
            update() {
              return self.isMe.call([this.variables.uid])
            }
          }
        )
      }
    }

    expect(new Document().render()).toEqual(
      `match /databases/{database}/documents {
function isAuthenticated() {
    return (request.auth != null);
}
function isMe(uid) {
    return (isAuthenticated() && (uid == request.auth.uid));
}
match /users/{uid} {
allow get: if isMe(uid);
allow create: if isAuthenticated();
allow update: if isMe(uid);
}
}`
    )
  })
})
