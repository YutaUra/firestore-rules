export * as base from './base'
export * as condition from './condition'
export * as func from './functions'
export {
  FirestoreRulesGlobalContext,
  FirestoreRulesGlobalContextType,
} from './literal'
export * as op from './operator'
export * as stmt from './statements'
export { expr }
import * as literal from './literal'

export const type = {
  Null: literal.FirestoreRulesLiteralNull,
  Boolean: literal.FirestoreRulesLiteralBoolean,
  Bytes: literal.FirestoreRulesLiteralBytes,
  Duration: literal.FirestoreRulesGlobalDuration,
  Float: literal.FirestoreRulesLiteralFloat,
  Integer: literal.FirestoreRulesLiteralInteger,
  LatLng: literal.FirestoreRulesLiteralLatLng,
  List: literal.FirestoreRulesLiteralList,
  Map: literal.FirestoreRulesLiteralMap,
  Mapdiff: literal.FirestoreRulesLiteralMapDiff,
  Number: literal.FirestoreRulesLiteralNumber,
  Path: literal.FirestoreRulesLiteralPath,
  Request: literal.FirestoreRulesLiteralRequest,
  Resource: literal.FirestoreRulesLiteralResource,
  Set: literal.FirestoreRulesLiteralSet,
  String: literal.FirestoreRulesLiteralString,
  Timestamp: literal.FirestoreRulesLiteralTimestamp,
} as const

export type Type = {
  [key in keyof typeof type]: InstanceType<typeof type[key]>
}

export type JsTypesToRulesType<T> = T extends null
  ? literal.FirestoreRulesLiteralNull
  : T extends boolean
  ? literal.FirestoreRulesLiteralBoolean
  : T extends number
  ? literal.FirestoreRulesLiteralInteger | literal.FirestoreRulesLiteralFloat
  : T extends string
  ? literal.FirestoreRulesLiteralString
  : T extends Array<infer V>
  ? literal.FirestoreRulesLiteralList<JsTypesToRulesType<V>>
  : never

function expr<V extends null | boolean | number | string>(
  value: V
): JsTypesToRulesType<V>
function expr<V, T extends Array<V>>(value: V): JsTypesToRulesType<T>
function expr(value: any): any {
  if (value === null) return new literal.FirestoreRulesLiteralNull()
  if (typeof value === 'boolean')
    return new literal.FirestoreRulesLiteralBoolean(value)
  if (typeof value === 'number' && Number.isInteger(value))
    return new literal.FirestoreRulesLiteralInteger(value)
  if (typeof value === 'number')
    return new literal.FirestoreRulesLiteralFloat(value)
  if (typeof value === 'string')
    return new literal.FirestoreRulesLiteralString(value)
  if (Array.isArray(value))
    return new literal.FirestoreRulesLiteralList(value.map((v) => expr(v)))
  throw Error('no match object signature')
}
