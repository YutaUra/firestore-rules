import { FirestoreRulesModel, op, type } from '@firestore-rules/cli'

export default class extends FirestoreRulesModel {
  get path() {
    return '/databases/{database}/documents'
  }
  get isAuthenticated() {
    return this.defineFunc(op.ne(this.ctx.request.auth, new type.Null()))
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
