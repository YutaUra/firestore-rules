import {
  AbstructFirestoreRulesElement,
  AbstructFirestoreRulesStatement,
  FirestoreRulesExpression,
  FirestoreRulesExpressionChain,
  FirestoreRulesFunctionCall,
  FirestoreRulesVariable,
} from '../src/base'
import { FirestoreRulesLiteralInteger } from '../src/literal'

describe('@firestore-rules/core/base.ts AbstructFirestoreRulesElement', () => {
  test('render', () => {
    const abstruct = new AbstructFirestoreRulesElement()
    expect(() => {
      abstruct.render()
    }).toThrow()
  })
})

describe('@firestore-rules/core/base.ts AbstructFirestoreRulesStatement', () => {
  test('render', () => {
    const abstruct = new AbstructFirestoreRulesStatement()
    expect(() => {
      abstruct.render()
    }).toThrow()
  })
})

describe('@firestore-rules/core/base.ts FirestoreRulesExpression', () => {
  const expr = new FirestoreRulesExpression({ render: () => 'x' })
  test('render', () => {
    expect(expr.render()).toEqual('x')
  })
  test('_as', () => {
    expect(expr).toBeInstanceOf(FirestoreRulesExpression)
    expect(expr._as(FirestoreRulesLiteralInteger)).toBeInstanceOf(
      FirestoreRulesLiteralInteger
    )
  })
})

describe('@firestore-rules/core/base.ts FirestoreRulesExpressionChain', () => {
  const x = new FirestoreRulesVariable('x')
  test('dot member', () => {
    const dot = new FirestoreRulesExpressionChain(x, 'dot', 'y')
    expect(dot.render()).toEqual('x.y')
  })
  test('dot method', () => {
    const dot = new FirestoreRulesExpressionChain(
      x,
      'dot',
      new FirestoreRulesFunctionCall('y', [])
    )
    expect(dot.render()).toEqual('x.y()')
  })
  test('slice', () => {
    const dot = new FirestoreRulesExpressionChain(
      x,
      'slice',
      new FirestoreRulesVariable('y')
    )
    expect(dot.render()).toEqual('x[y]')
  })
  test('range', () => {
    const dot = new FirestoreRulesExpressionChain(x, 'range', [
      new FirestoreRulesVariable('y'),
      new FirestoreRulesVariable('z'),
    ])
    expect(dot.render()).toEqual('x[y:z]')
  })
  test('error', () => {
    expect(
      () =>
        // @ts-ignore
        new FirestoreRulesExpressionChain(x, 'dot', [
          new FirestoreRulesVariable('y'),
          new FirestoreRulesVariable('z'),
        ])
    ).toThrow()
    expect(
      () =>
        // @ts-ignore
        new FirestoreRulesExpressionChain(x, 'slice', [
          new FirestoreRulesVariable('y'),
          new FirestoreRulesVariable('z'),
        ])
    ).toThrow()
    expect(
      () =>
        // @ts-ignore
        new FirestoreRulesExpressionChain(
          x,
          'range',
          new FirestoreRulesVariable('y')
        )
    ).toThrow()
  })
})

describe('@firestore-rules/core/base.ts FirestoreRulesVariable', () => {
  test('render', () => {
    const x = new FirestoreRulesVariable('x')
    expect(x.render()).toEqual('x')
  })
})

describe('@firestore-rules/core/base.ts FirestoreRulesFunctionCall', () => {
  test('render with no arguments', () => {
    const x = new FirestoreRulesFunctionCall('x', [])
    expect(x.render()).toEqual('x()')
  })
  test('render with one arguments', () => {
    const x = new FirestoreRulesFunctionCall('x', [
      new FirestoreRulesVariable('y'),
    ])
    expect(x.render()).toEqual('x(y)')
  })
  test('render with one arguments', () => {
    const x = new FirestoreRulesFunctionCall('x', [
      new FirestoreRulesVariable('y'),
      new FirestoreRulesVariable('z'),
    ])
    expect(x.render()).toEqual('x(y, z)')
  })
})
