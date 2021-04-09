export * as base from './base'
export * as condition from './condition'
export * as func from './functions'
export {
  FirestoreRulesGlobalContext,
  FirestoreRulesGlobalContextType,
} from './literal'
export * as op from './operator'
export * as stmt from './statements'
export * as utils from './utils'
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
