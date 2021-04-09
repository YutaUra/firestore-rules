import {
  FirestoreRulesLiteralBoolean,
  FirestoreRulesLiteralFloat,
  FirestoreRulesLiteralInteger,
  FirestoreRulesLiteralList,
  FirestoreRulesLiteralMap,
  FirestoreRulesLiteralNull,
  FirestoreRulesLiteralString,
} from './literal'
import { and, FirestoreRulesTypes, ifElse, in_, is } from './operator'

export type JsTypesToRulesType<T> = T extends null
  ? FirestoreRulesLiteralNull
  : T extends boolean
  ? FirestoreRulesLiteralBoolean
  : T extends number
  ? FirestoreRulesLiteralInteger | FirestoreRulesLiteralFloat
  : T extends string
  ? FirestoreRulesLiteralString
  : T extends Array<infer V>
  ? FirestoreRulesLiteralList<JsTypesToRulesType<V>>
  : never

function expr<V extends null | boolean | number | string>(
  value: V
): JsTypesToRulesType<V>
function expr<V, T extends Array<V>>(value: V): JsTypesToRulesType<T>
function expr(value: any): any {
  if (value === null) return new FirestoreRulesLiteralNull()
  if (typeof value === 'boolean') return new FirestoreRulesLiteralBoolean(value)
  if (typeof value === 'number' && Number.isInteger(value))
    return new FirestoreRulesLiteralInteger(value)
  if (typeof value === 'number') return new FirestoreRulesLiteralFloat(value)
  if (typeof value === 'string') return new FirestoreRulesLiteralString(value)
  if (Array.isArray(value))
    return new FirestoreRulesLiteralList(value.map((v) => expr(v)))
  throw Error('no match object signature')
}

export { expr }

export const propertyTypeOf = (
  obj: FirestoreRulesLiteralMap,
  property: string,
  type: FirestoreRulesTypes
) => {
  return and(in_(expr(property), obj), is(obj.dot(property), type))
}

export const mayPropertyTypeOf = (
  obj: FirestoreRulesLiteralMap,
  property: string,
  type: FirestoreRulesTypes
) => {
  return ifElse(
    in_(expr(property), obj),
    is(obj.dot(property), type),
    expr(false)
  )
}
