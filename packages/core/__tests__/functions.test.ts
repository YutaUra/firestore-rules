import { FirestoreRulesVariable } from '../src/base'
import {
  bool,
  FirestoreRulesDefineFunctionStatement,
  FirestoreRulesHelperFunctionArguments,
  float,
  funcDef,
  int,
  path,
  string,
} from '../src/functions'
import {
  FirestoreRulesGlobalContext,
  FirestoreRulesLiteralBoolean,
  FirestoreRulesLiteralFloat,
  FirestoreRulesLiteralInteger,
  FirestoreRulesLiteralMap,
  FirestoreRulesLiteralNull,
  FirestoreRulesLiteralPath,
  FirestoreRulesLiteralString,
} from '../src/literal'
import * as op from '../src/operator'

describe('@firestore-rules/core/functions.ts bool', () => {
  test('with string', () => {
    const res = bool(new FirestoreRulesLiteralString('true'))
    expect(res).toBeInstanceOf(FirestoreRulesLiteralBoolean)
    expect(res.render()).toEqual("bool('true')")
  })
  test('with variable', () => {
    const res = bool(
      new FirestoreRulesVariable('x')._as(FirestoreRulesLiteralString)
    )
    expect(res).toBeInstanceOf(FirestoreRulesLiteralBoolean)
    expect(res.render()).toEqual('bool(x)')
  })
})

describe('@firestore-rules/core/functions.ts int', () => {
  test('with string', () => {
    const res = int(new FirestoreRulesLiteralString('123'))
    expect(res).toBeInstanceOf(FirestoreRulesLiteralInteger)
    expect(res.render()).toEqual("int('123')")
  })
  test('with float', () => {
    const res = int(new FirestoreRulesLiteralFloat(10.23))
    expect(res).toBeInstanceOf(FirestoreRulesLiteralInteger)
    expect(res.render()).toEqual('int(10.23)')
  })
  test('with variable', () => {
    const res = int(
      new FirestoreRulesVariable('x')._as(FirestoreRulesLiteralString)
    )
    expect(res).toBeInstanceOf(FirestoreRulesLiteralInteger)
    expect(res.render()).toEqual('int(x)')
  })
})

describe('@firestore-rules/core/functions.ts float', () => {
  test('with string', () => {
    const res = float(new FirestoreRulesLiteralString('123'))
    expect(res).toBeInstanceOf(FirestoreRulesLiteralFloat)
    expect(res.render()).toEqual("float('123')")
  })
  test('with integer', () => {
    const res = float(new FirestoreRulesLiteralInteger(123))
    expect(res).toBeInstanceOf(FirestoreRulesLiteralFloat)
    expect(res.render()).toEqual('float(123)')
  })
  test('with variable', () => {
    const res = float(
      new FirestoreRulesVariable('x')._as(FirestoreRulesLiteralString)
    )
    expect(res).toBeInstanceOf(FirestoreRulesLiteralFloat)
    expect(res.render()).toEqual('float(x)')
  })
})

describe('@firestore-rules/core/functions.ts string', () => {
  test('with boolean', () => {
    const res = string(new FirestoreRulesLiteralBoolean(true))
    expect(res).toBeInstanceOf(FirestoreRulesLiteralString)
    expect(res.render()).toEqual('string(true)')
  })
  test('with integer', () => {
    const res = string(new FirestoreRulesLiteralInteger(123))
    expect(res).toBeInstanceOf(FirestoreRulesLiteralString)
    expect(res.render()).toEqual('string(123)')
  })
  test('with float', () => {
    const res = string(new FirestoreRulesLiteralFloat(123.45))
    expect(res).toBeInstanceOf(FirestoreRulesLiteralString)
    expect(res.render()).toEqual('string(123.45)')
  })
  test('with null', () => {
    const res = string(new FirestoreRulesLiteralNull())
    expect(res).toBeInstanceOf(FirestoreRulesLiteralString)
    expect(res.render()).toEqual('string(null)')
  })
})

describe('@firestore-rules/core/functions.ts path', () => {
  test('with string', () => {
    const res = path(new FirestoreRulesLiteralString('/users/1'))
    expect(res).toBeInstanceOf(FirestoreRulesLiteralPath)
    expect(res.render()).toEqual("path('/users/1')")
  })
})

describe('@firestore-rules/core/functions.ts FirestoreRulesDefineFunctionStatement', () => {
  const global = FirestoreRulesGlobalContext
  const userId = new FirestoreRulesVariable('userId')
  const funcStmt = new FirestoreRulesDefineFunctionStatement(
    'customFunc',
    ['userId'],
    op.and(
      op.ne(global.request.auth, new FirestoreRulesLiteralNull()),
      op.eq(userId, global.request.auth.uid)
    )
  )
  test('render', () => {
    expect(funcStmt).toBeInstanceOf(FirestoreRulesDefineFunctionStatement)
    expect(funcStmt.render()).toEqual(`function customFunc(userId) {
    return ((request.auth != null) && (userId == request.auth.uid));
}`)
  })
  test('call with same args', () => {
    const call = funcStmt.call([new FirestoreRulesVariable('uid')])
    expect(call).toBeInstanceOf(FirestoreRulesLiteralBoolean)
    expect(call.render()).toEqual('customFunc(uid)')
  })
  test('call with different args', () => {
    expect(() =>
      funcStmt.call([
        new FirestoreRulesVariable('uid'),
        new FirestoreRulesVariable('too many args'),
      ])
    ).toThrow()
  })
})

describe('@firestore-rules/core/functions.ts FirestoreRulesHelperFunctionArguments', () => {
  test('create', () => {
    const args = new FirestoreRulesHelperFunctionArguments()
    expect(args).toBeInstanceOf(FirestoreRulesHelperFunctionArguments)
    expect(args.args).toEqual([])
    const arg = args.create('x')
    expect(arg).toBeInstanceOf(FirestoreRulesVariable)
    expect(args.args).toEqual(['x'])
  })
})

describe('@firestore-rules/core/functions.ts funcDef', () => {
  const globals = FirestoreRulesGlobalContext
  test('func with no argument', () => {
    const func = funcDef(
      ({ globals: { request } }) => {
        return op.ne(request.auth, new FirestoreRulesLiteralNull())
      },
      { name: 'isAuthenticated' }
    )
    expect(func).toBeInstanceOf(FirestoreRulesDefineFunctionStatement)
    expect(func.render()).toEqual(`function isAuthenticated() {
    return (request.auth != null);
}`)
    const res = func.call([])
    expect(res).toBeInstanceOf(FirestoreRulesLiteralBoolean)
    expect(res.render()).toEqual('isAuthenticated()')
  })
  test('func with two arguments', () => {
    const func = funcDef(
      ({ globals: { request }, args }) => {
        const uid = args.create('uid')._as(FirestoreRulesLiteralString)
        const data = args.create('data')._as(FirestoreRulesLiteralMap)
        return op.and(
          op.ne(request.auth.uid, new FirestoreRulesLiteralNull()),
          op.eq(request.auth.uid, uid),
          op.eq(data.size(), new FirestoreRulesLiteralInteger(2)),
          op.in_(new FirestoreRulesLiteralString('firstName'), data),
          op.is(data.dot('firstName'), 'string'),
          op.in_(new FirestoreRulesLiteralString('lastName'), data),
          op.is(data.dot('lastName'), 'string')
        )
      },
      { name: 'validateData' }
    )
    expect(func).toBeInstanceOf(FirestoreRulesDefineFunctionStatement)
    expect(func.render()).toEqual(`function validateData(uid, data) {
    return ((request.auth.uid != null) && (request.auth.uid == uid) && (data.size() == 2) && ('firstName' in data) && (data.firstName is string) && ('lastName' in data) && (data.lastName is string));
}`)
    const res = func.call([
      new FirestoreRulesVariable('uid'),
      globals.request.resource.data,
    ])
    expect(res).toBeInstanceOf(FirestoreRulesLiteralBoolean)
    expect(res.render()).toEqual('validateData(uid, request.resource.data)')
  })
})
