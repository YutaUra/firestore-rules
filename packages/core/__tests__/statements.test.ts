import { FirestoreRulesVariable } from '../src/base'
import { funcDef } from '../src/functions'
import {
  FirestoreRulesGlobalContext,
  FirestoreRulesLiteralNull,
} from '../src/literal'
import * as op from '../src/operator'
import {
  FirestoreRulesServiceStatement,
  FirestoreRulesStatements,
  FirestoreRulesStatementsAllow,
  FirestoreRulesStatementsComment,
  FirestoreRulesStatementsMatch,
  FirestoreRulesVersionStatements,
} from '../src/statements'

describe('@firestore-rules/core/statements.ts FirestoreRulesStatementsComment', () => {
  test('comment one line', () => {
    const commnet = new FirestoreRulesStatementsComment('this is comment')
    expect(commnet).toBeInstanceOf(FirestoreRulesStatementsComment)
    expect(commnet.render()).toEqual('// this is comment')
  })
  test('comment multi line', () => {
    const commnet = new FirestoreRulesStatementsComment(`this is first comment
this is second comment
this is third comment`)
    expect(commnet).toBeInstanceOf(FirestoreRulesStatementsComment)
    expect(commnet.render()).toEqual(`// this is first comment
// this is second comment
// this is third comment`)
  })
})

describe('@firestore-rules/core/statements.ts FirestoreRulesStatementsAllow', () => {
  test('one method', () => {
    const allowStmt = new FirestoreRulesStatementsAllow(
      ['get'],
      op.ne(
        FirestoreRulesGlobalContext.request.auth,
        new FirestoreRulesLiteralNull()
      )
    )
    expect(allowStmt).toBeInstanceOf(FirestoreRulesStatementsAllow)
    expect(allowStmt.render()).toEqual('allow get: if (request.auth != null);')
  })
  test('two method', () => {
    const allowStmt = new FirestoreRulesStatementsAllow(
      ['get', 'update'],
      op.ne(
        FirestoreRulesGlobalContext.request.auth,
        new FirestoreRulesLiteralNull()
      )
    )
    expect(allowStmt).toBeInstanceOf(FirestoreRulesStatementsAllow)
    expect(allowStmt.render()).toEqual(
      'allow get, update: if (request.auth != null);'
    )
  })
  test('all method', () => {
    const allowStmt = new FirestoreRulesStatementsAllow(
      ['get', 'list', 'create', 'update', 'delete'],
      op.ne(
        FirestoreRulesGlobalContext.request.auth,
        new FirestoreRulesLiteralNull()
      )
    )
    expect(allowStmt).toBeInstanceOf(FirestoreRulesStatementsAllow)
    expect(allowStmt.render()).toEqual(
      'allow get, list, create, update, delete: if (request.auth != null);'
    )
  })
})

describe('@firestore-rules/core/statements.ts FirestoreRulesStatementsMatch', () => {
  test('use with function stmt builder', () => {
    const match = new FirestoreRulesStatementsMatch(
      '/users/{uid}',
      ({ arg, global: {} }) => {
        const uid = arg.create('uid')
        const isAuthenticated = funcDef(
          ({ globals: { request } }) =>
            op.ne(request.auth, new FirestoreRulesLiteralNull()),
          { name: 'isAuthenticated' }
        )
        const isMe = funcDef(
          ({ globals: { request } }) =>
            op.and(isAuthenticated.call([]), op.eq(request.auth.uid, uid)),
          { name: 'isMe' }
        )
        return [
          new FirestoreRulesStatementsComment('users collection'),
          isAuthenticated,
          isMe,
          new FirestoreRulesStatementsAllow(['get', 'update'], isMe.call([])),
          new FirestoreRulesStatementsAllow(
            ['create'],
            isAuthenticated.call([])
          ),
        ]
      }
    )
    expect(match).toBeInstanceOf(FirestoreRulesStatementsMatch)
    expect(match.render()).toEqual(`match /users/{uid} {
// users collection
function isAuthenticated() {
    return (request.auth != null);
}
function isMe() {
    return (isAuthenticated() && (request.auth.uid == uid));
}
allow get, update: if isMe();
allow create: if isAuthenticated();
}`)
  })
  test('use with static stmts', () => {
    const uid = new FirestoreRulesVariable('uid')
    const isAuthenticated = funcDef(
      ({ globals: { request } }) =>
        op.ne(request.auth, new FirestoreRulesLiteralNull()),
      { name: 'isAuthenticated' }
    )
    const isMe = funcDef(
      ({ globals: { request } }) =>
        op.and(isAuthenticated.call([]), op.eq(request.auth.uid, uid)),
      { name: 'isMe' }
    )
    const match = new FirestoreRulesStatementsMatch('/users/{uid}', [
      new FirestoreRulesStatementsComment('users collection'),
      isAuthenticated,
      isMe,
      new FirestoreRulesStatementsAllow(['get', 'update'], isMe.call([])),
      new FirestoreRulesStatementsAllow(['create'], isAuthenticated.call([])),
    ])
    expect(match).toBeInstanceOf(FirestoreRulesStatementsMatch)
    expect(match.render()).toEqual(`match /users/{uid} {
// users collection
function isAuthenticated() {
    return (request.auth != null);
}
function isMe() {
    return (isAuthenticated() && (request.auth.uid == uid));
}
allow get, update: if isMe();
allow create: if isAuthenticated();
}`)
  })
})

describe('@firestore-rules/core/statements.ts FirestoreRulesVersionStatements', () => {
  test('version 2', () => {
    const version2 = new FirestoreRulesVersionStatements(2)
    expect(version2).toBeInstanceOf(FirestoreRulesVersionStatements)
    expect(version2.render()).toEqual('rules_version = "2";')
  })
})

describe('@firestore-rules/core/statements.ts FirestoreRulesServiceStatement', () => {
  test('database', () => {
    const service = new FirestoreRulesServiceStatement(
      new FirestoreRulesStatementsMatch('/databases/{database}/documents', [])
    )
    expect(service).toBeInstanceOf(FirestoreRulesServiceStatement)
    expect(service.render()).toEqual(`service cloud.firestore {
match /databases/{database}/documents {

}
}`)
  })
})

describe('@firestore-rules/core/statements.ts FirestoreRulesStatements', () => {
  test('render', () => {
    const stmts = new FirestoreRulesStatements([
      new FirestoreRulesStatementsComment('this is comment'),
      new FirestoreRulesVersionStatements(2),
      new FirestoreRulesServiceStatement(
        new FirestoreRulesStatementsMatch(
          '/databases/{database}/documents',
          () => {
            const isAuthenticated = funcDef(
              ({ globals: { request } }) =>
                op.ne(request.auth, new FirestoreRulesLiteralNull()),
              { name: 'isAuthenticated' }
            )
            const isMe = funcDef(
              ({ globals: { request }, args }) => {
                const uid = args.create('uid')
                return op.and(
                  isAuthenticated.call([]),
                  op.eq(request.auth.uid, uid)
                )
              },
              { name: 'isMe' }
            )
            return [
              isAuthenticated,
              isMe,
              new FirestoreRulesStatementsMatch('/users/{uid}', () => {
                const uid = new FirestoreRulesVariable('uid')
                return [
                  new FirestoreRulesStatementsAllow(['get'], isMe.call([uid])),
                  new FirestoreRulesStatementsAllow(
                    ['create'],
                    isAuthenticated.call([])
                  ),
                  new FirestoreRulesStatementsAllow(
                    ['update'],
                    isMe.call([uid])
                  ),
                ]
              }),
            ]
          }
        )
      ),
    ])
    expect(stmts.render()).toEqual(`// this is comment
rules_version = "2";
service cloud.firestore {
match /databases/{database}/documents {
function isAuthenticated() {
    return (request.auth != null);
}
function isMe(uid) {
    return (isAuthenticated() && (request.auth.uid == uid));
}
match /users/{uid} {
allow get: if isMe(uid);
allow create: if isAuthenticated();
allow update: if isMe(uid);
}
}
}`)
  })
})
