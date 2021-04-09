import {
  FirestoreRulesExpression,
  FirestoreRulesVariable,
  IFirestoreRulesElementConstructor,
  operator,
} from './base'
import { FirestoreRulesCondition } from './condition'
import {
  FirestoreRulesLiteralBoolean,
  FirestoreRulesLiteralFloat,
  FirestoreRulesLiteralInteger,
  FirestoreRulesLiteralList,
  FirestoreRulesLiteralMap,
  FirestoreRulesLiteralPath,
  FirestoreRulesLiteralSet,
  FirestoreRulesLiteralString,
  FirestoreRulesNumberLike,
} from './literal'

export const and = (
  left: FirestoreRulesLiteralBoolean,
  right: FirestoreRulesLiteralBoolean,
  ...rest: FirestoreRulesLiteralBoolean[]
) => {
  return FirestoreRulesCondition.polymer(
    operator.AND,
    left,
    right,
    ...rest
  )._as(FirestoreRulesLiteralBoolean)
}

export const or = (
  left: FirestoreRulesLiteralBoolean,
  right: FirestoreRulesLiteralBoolean,
  ...rest: FirestoreRulesLiteralBoolean[]
) => {
  return FirestoreRulesCondition.polymer(operator.OR, left, right, ...rest)._as(
    FirestoreRulesLiteralBoolean
  )
}

export const not = (value: FirestoreRulesLiteralBoolean) => {
  return FirestoreRulesCondition.custom(operator.NOT, value)._as(
    FirestoreRulesLiteralBoolean
  )
}

export const eq = <
  T extends
    | FirestoreRulesNumberLike
    | FirestoreRulesLiteralString
    | FirestoreRulesLiteralList<any>
    | FirestoreRulesLiteralMap
    | FirestoreRulesLiteralPath
    | FirestoreRulesLiteralSet<any>
>(
  left: T,
  right: T
) => {
  return new FirestoreRulesCondition(left, right, operator.EQ)._as(
    FirestoreRulesLiteralBoolean
  )
}

export const ne = <
  T extends FirestoreRulesNumberLike | FirestoreRulesLiteralString
>(
  left: T,
  right: T
) => {
  return new FirestoreRulesCondition(left, right, operator.NE)._as(
    FirestoreRulesLiteralBoolean
  )
}

export const gt = <
  T extends FirestoreRulesNumberLike | FirestoreRulesLiteralString
>(
  left: T,
  right: T
) => {
  return new FirestoreRulesCondition(left, right, operator.GT)._as(
    FirestoreRulesLiteralBoolean
  )
}

export const lt = <
  T extends FirestoreRulesNumberLike | FirestoreRulesLiteralString
>(
  left: T,
  right: T
) => {
  return new FirestoreRulesCondition(left, right, operator.LT)._as(
    FirestoreRulesLiteralBoolean
  )
}

export const gte = <
  T extends FirestoreRulesNumberLike | FirestoreRulesLiteralString
>(
  left: T,
  right: T
) => {
  return new FirestoreRulesCondition(left, right, operator.GTE)._as(
    FirestoreRulesLiteralBoolean
  )
}

export const lte = <
  T extends FirestoreRulesNumberLike | FirestoreRulesLiteralString
>(
  left: T,
  right: T
) => {
  return new FirestoreRulesCondition(left, right, operator.LTE)._as(
    FirestoreRulesLiteralBoolean
  )
}

export const plus = <
  T extends FirestoreRulesNumberLike | FirestoreRulesLiteralString
>(
  left: T,
  right: T,
  ...rest: T[]
) => {
  const cls = left.constructor as IFirestoreRulesElementConstructor<T>
  return FirestoreRulesCondition.polymer(
    operator.PLUS,
    left,
    right,
    ...rest
  )._as(cls)
}

export const minus = <T extends FirestoreRulesNumberLike>(
  left: T,
  right: T,
  ...rest: T[]
) => {
  const cls = left.constructor as IFirestoreRulesElementConstructor<T>
  return FirestoreRulesCondition.polymer(
    operator.MINUS,
    left,
    right,
    ...rest
  )._as(cls)
}

export const div = <T extends FirestoreRulesNumberLike>(left: T, right: T) => {
  return new FirestoreRulesCondition(left, right, operator.DIV)._as(
    FirestoreRulesLiteralFloat
  )
}

export const multi = <T extends FirestoreRulesNumberLike>(
  left: T,
  right: T,
  ...rest: T[]
) => {
  return FirestoreRulesCondition.polymer(
    operator.MULTI,
    left,
    right,
    ...rest
  )._as(FirestoreRulesLiteralFloat)
}

export const mod = (
  left: FirestoreRulesLiteralInteger,
  right: FirestoreRulesLiteralInteger
) => {
  return new FirestoreRulesCondition(left, right, operator.MOD)._as(
    FirestoreRulesLiteralInteger
  )
}

export const neg = <T extends FirestoreRulesNumberLike>(value: T) => {
  const cls = value.constructor as IFirestoreRulesElementConstructor<T>
  return FirestoreRulesCondition.custom(operator.NEG, value)._as(cls)
}

function in_<T extends FirestoreRulesExpression>(
  left: T,
  array: FirestoreRulesLiteralList<T> | FirestoreRulesLiteralSet<T>
): FirestoreRulesLiteralBoolean
function in_(
  left: FirestoreRulesLiteralString,
  array: FirestoreRulesLiteralMap
): FirestoreRulesLiteralBoolean
function in_<T extends FirestoreRulesExpression>(
  left: T | FirestoreRulesLiteralString,
  array:
    | FirestoreRulesLiteralList<T>
    | FirestoreRulesLiteralSet<T>
    | FirestoreRulesLiteralMap
) {
  return new FirestoreRulesCondition(left, array, operator.IN)._as(
    FirestoreRulesLiteralBoolean
  )
}

export { in_ }

export type FirestoreRulesTypes = 'string' | 'list' | 'path'

export const is = (
  expr: FirestoreRulesExpression,
  type: FirestoreRulesTypes
) => {
  return new FirestoreRulesCondition(
    expr,
    new FirestoreRulesVariable(type),
    operator.IS
  )._as(FirestoreRulesLiteralBoolean)
}

export const ifElse = <T extends FirestoreRulesExpression>(
  condition: FirestoreRulesLiteralBoolean,
  True: T,
  False: T
) => {
  const cls = True.constructor as IFirestoreRulesElementConstructor<T>
  return FirestoreRulesCondition.custom(condition, '?', True, ':', False)._as(
    cls
  )
}
