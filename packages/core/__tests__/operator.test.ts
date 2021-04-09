import { FirestoreRulesVariable } from '../src/base'
import {
  FirestoreRulesLiteralBoolean,
  FirestoreRulesLiteralFloat,
  FirestoreRulesLiteralInteger,
  FirestoreRulesLiteralList,
} from '../src/literal'
import * as op from '../src/operator'

describe('@firestore-rules/core/operator.ts and', () => {
  test('and', () => {
    const and = op.and(
      new FirestoreRulesLiteralBoolean(true),
      new FirestoreRulesVariable('x')._as(FirestoreRulesLiteralBoolean)
    )
    expect(and).toBeInstanceOf(FirestoreRulesLiteralBoolean)
    expect(and.render()).toEqual('(true && x)')
  })
})

describe('@firestore-rules/core/operator.ts or', () => {
  test('or', () => {
    const or = op.or(
      new FirestoreRulesLiteralBoolean(true),
      new FirestoreRulesVariable('x')._as(FirestoreRulesLiteralBoolean)
    )
    expect(or).toBeInstanceOf(FirestoreRulesLiteralBoolean)
    expect(or.render()).toEqual('(true || x)')
  })
})

describe('@firestore-rules/core/operator.ts not', () => {
  test('not', () => {
    const not = op.not(new FirestoreRulesLiteralBoolean(true))
    expect(not).toBeInstanceOf(FirestoreRulesLiteralBoolean)
    expect(not.render()).toEqual('(!true)')
  })
})

describe('@firestore-rules/core/operator.ts eq', () => {
  test('eq', () => {
    const eq = op.eq(
      new FirestoreRulesLiteralBoolean(true),
      new FirestoreRulesVariable('x')._as(FirestoreRulesLiteralBoolean)
    )
    expect(eq).toBeInstanceOf(FirestoreRulesLiteralBoolean)
    expect(eq.render()).toEqual('(true == x)')
  })
})

describe('@firestore-rules/core/operator.ts ne', () => {
  test('ne', () => {
    const ne = op.ne(
      new FirestoreRulesLiteralBoolean(true),
      new FirestoreRulesVariable('x')._as(FirestoreRulesLiteralBoolean)
    )
    expect(ne).toBeInstanceOf(FirestoreRulesLiteralBoolean)
    expect(ne.render()).toEqual('(true != x)')
  })
})

describe('@firestore-rules/core/operator.ts gt', () => {
  test('gt', () => {
    const gt = op.gt(
      new FirestoreRulesLiteralInteger(15),
      new FirestoreRulesVariable('x')._as(FirestoreRulesLiteralBoolean)
    )
    expect(gt).toBeInstanceOf(FirestoreRulesLiteralBoolean)
    expect(gt.render()).toEqual('(15 > x)')
  })
})

describe('@firestore-rules/core/operator.ts lt', () => {
  test('lt', () => {
    const lt = op.lt(
      new FirestoreRulesLiteralInteger(15),
      new FirestoreRulesVariable('x')._as(FirestoreRulesLiteralBoolean)
    )
    expect(lt).toBeInstanceOf(FirestoreRulesLiteralBoolean)
    expect(lt.render()).toEqual('(15 < x)')
  })
})

describe('@firestore-rules/core/operator.ts gte', () => {
  test('gte', () => {
    const gte = op.gte(
      new FirestoreRulesLiteralInteger(15),
      new FirestoreRulesVariable('x')._as(FirestoreRulesLiteralBoolean)
    )
    expect(gte).toBeInstanceOf(FirestoreRulesLiteralBoolean)
    expect(gte.render()).toEqual('(15 >= x)')
  })
})

describe('@firestore-rules/core/operator.ts lte', () => {
  test('lte', () => {
    const lte = op.lte(
      new FirestoreRulesLiteralInteger(15),
      new FirestoreRulesVariable('x')._as(FirestoreRulesLiteralBoolean)
    )
    expect(lte).toBeInstanceOf(FirestoreRulesLiteralBoolean)
    expect(lte.render()).toEqual('(15 <= x)')
  })
})

describe('@firestore-rules/core/operator.ts plus', () => {
  test('plus', () => {
    const plus = op.plus(
      new FirestoreRulesLiteralInteger(15),
      new FirestoreRulesVariable('x')._as(FirestoreRulesLiteralInteger)
    )
    expect(plus).toBeInstanceOf(FirestoreRulesLiteralInteger)
    expect(plus.render()).toEqual('(15 + x)')
  })
})

describe('@firestore-rules/core/operator.ts minus', () => {
  test('minus', () => {
    const minus = op.minus(
      new FirestoreRulesLiteralInteger(15),
      new FirestoreRulesVariable('x')._as(FirestoreRulesLiteralInteger)
    )
    expect(minus).toBeInstanceOf(FirestoreRulesLiteralInteger)
    expect(minus.render()).toEqual('(15 - x)')
  })
})

describe('@firestore-rules/core/operator.ts div', () => {
  test('div', () => {
    const div = op.div(
      new FirestoreRulesLiteralInteger(15),
      new FirestoreRulesVariable('x')._as(FirestoreRulesLiteralInteger)
    )
    expect(div).toBeInstanceOf(FirestoreRulesLiteralFloat)
    expect(div.render()).toEqual('(15 / x)')
  })
})

describe('@firestore-rules/core/operator.ts multi', () => {
  test('multi', () => {
    const multi = op.multi(
      new FirestoreRulesLiteralInteger(15),
      new FirestoreRulesVariable('x')._as(FirestoreRulesLiteralInteger)
    )
    expect(multi).toBeInstanceOf(FirestoreRulesLiteralFloat)
    expect(multi.render()).toEqual('(15 * x)')
  })
})

describe('@firestore-rules/core/operator.ts mod', () => {
  test('mod', () => {
    const mod = op.mod(
      new FirestoreRulesLiteralInteger(15),
      new FirestoreRulesVariable('x')._as(FirestoreRulesLiteralInteger)
    )
    expect(mod).toBeInstanceOf(FirestoreRulesLiteralInteger)
    expect(mod.render()).toEqual('(15 % x)')
  })
})

describe('@firestore-rules/core/operator.ts neg', () => {
  test('neg', () => {
    const neg = op.neg(new FirestoreRulesLiteralInteger(15))
    expect(neg).toBeInstanceOf(FirestoreRulesLiteralInteger)
    expect(neg.render()).toEqual('(-15)')
  })
})

describe('@firestore-rules/core/operator.ts in', () => {
  test('in', () => {
    const in_ = op.in_(
      new FirestoreRulesLiteralInteger(15),
      new FirestoreRulesLiteralList([
        new FirestoreRulesLiteralInteger(10),
        new FirestoreRulesLiteralInteger(100),
      ])
    )
    expect(in_).toBeInstanceOf(FirestoreRulesLiteralBoolean)
    expect(in_.render()).toEqual('(15 in [10, 100])')
  })
})

describe('@firestore-rules/core/operator.ts is', () => {
  test('is', () => {
    const is = op.is(new FirestoreRulesVariable('x'), 'string')
    expect(is).toBeInstanceOf(FirestoreRulesLiteralBoolean)
    expect(is.render()).toEqual('(x is string)')
  })
})
