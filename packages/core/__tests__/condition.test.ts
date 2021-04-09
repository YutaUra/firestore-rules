import {
  FirestoreRulesExpression,
  FirestoreRulesVariable,
  operator,
} from '../src/base'
import { FirestoreRulesCondition } from '../src/condition'

describe('@firestore-rules/core/condition.ts FirestoreRulesCondition', () => {
  test('render', () => {
    const condition = new FirestoreRulesCondition(
      new FirestoreRulesVariable('x'),
      new FirestoreRulesVariable('y'),
      operator.PLUS
    )
    expect(condition).toBeInstanceOf(FirestoreRulesCondition)
    expect(condition.render()).toEqual('(x + y)')
  })
  test('polymer 2', () => {
    const condition = FirestoreRulesCondition.polymer(
      operator.PLUS,
      new FirestoreRulesVariable('x'),
      new FirestoreRulesVariable('y')
    )
    expect(condition).toBeInstanceOf(FirestoreRulesExpression)
    expect(condition.render()).toEqual('(x + y)')
  })
  test('polymer 3', () => {
    const condition = FirestoreRulesCondition.polymer(
      operator.PLUS,
      new FirestoreRulesVariable('x'),
      new FirestoreRulesVariable('y'),
      new FirestoreRulesVariable('z')
    )
    expect(condition).toBeInstanceOf(FirestoreRulesExpression)
    expect(condition.render()).toEqual('(x + y + z)')
  })
  test('custom', () => {
    const condition = FirestoreRulesCondition.custom(
      operator.NOT,
      new FirestoreRulesVariable('x')
    )
    expect(condition).toBeInstanceOf(FirestoreRulesExpression)
    expect(condition.render()).toEqual('(!x)')
  })
})
