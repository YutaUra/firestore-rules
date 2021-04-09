import {
  FirestoreRulesExpression,
  FirestoreRulesExpressionChain,
  FirestoreRulesFunctionCall,
  FirestoreRulesVariable,
  IFirestoreRulesElementConstructor,
} from './base'

/**
 * Represents a Null
 */
export class FirestoreRulesLiteralNull extends FirestoreRulesVariable {
  constructor(value?: FirestoreRulesExpression | null) {
    super(value || 'null')
  }
}

/**
 * Represents a Boolean
 *
 * @see {@link https://firebase.google.com/docs/reference/rules/rules.Boolean}
 */
export class FirestoreRulesLiteralBoolean extends FirestoreRulesVariable {
  constructor(value: boolean | FirestoreRulesExpression) {
    if (value instanceof FirestoreRulesExpression) {
      super(value)
    } else {
      super(new FirestoreRulesVariable(value ? 'true' : 'false'))
    }
  }
}

/**
 * Represents a Bytes
 *
 * // TODO
 * @see {@link https://firebase.google.com/docs/reference/rules/rules.Bytes}
 */
export class FirestoreRulesLiteralBytes extends FirestoreRulesVariable {
  constructor(value: string | FirestoreRulesExpression) {
    super(null!)
    throw Error('literal bytes class is not supported yet')
  }

  size() {
    return this._callMethod('size', [])._as(FirestoreRulesLiteralInteger)
  }

  toBase64() {
    return this._callMethod('toBase64', [])._as(FirestoreRulesLiteralString)
  }
  toHexString() {
    return this._callMethod('toHexString', [])._as(FirestoreRulesLiteralString)
  }
}

/**
 * Represents a Duration
 *
 * @see {@link https://firebase.google.com/docs/reference/rules/rules.Duration}
 */
export class FirestoreRulesLiteralDuration extends FirestoreRulesExpression {
  nanos() {
    return this._callMethod('nanos', [])._as(FirestoreRulesLiteralInteger)
  }
  seconds() {
    return this._callMethod('seconds', [])._as(FirestoreRulesLiteralInteger)
  }
}

/**
 * Represents a Float
 *
 * @see {@link https://firebase.google.com/docs/reference/rules/rules.Float}
 */
export class FirestoreRulesLiteralFloat extends FirestoreRulesExpression {
  constructor(value: number | FirestoreRulesExpression) {
    if (value instanceof FirestoreRulesExpression) {
      super(value)
    } else {
      super(
        new FirestoreRulesVariable(
          Number.isInteger(value) ? value.toFixed(1) : value.toString()
        )
      )
    }
  }
}

/**
 * Represents a Integer
 *
 * @see {@link https://firebase.google.com/docs/reference/rules/rules.Integer}
 */
export class FirestoreRulesLiteralInteger extends FirestoreRulesExpression {
  constructor(value: number | FirestoreRulesExpression) {
    if (value instanceof FirestoreRulesExpression) {
      super(value)
    } else {
      if (!Number.isInteger(value)) {
        console.log(value)
        throw Error(`value ${value} is not integer`)
      }
      super(new FirestoreRulesVariable(`${value}`))
    }
  }
}

/**
 * Represents a LatLng
 *
 * @see {@link https://firebase.google.com/docs/reference/rules/rules.LatLng}
 */
export class FirestoreRulesLiteralLatLng extends FirestoreRulesExpression {
  distance(other: FirestoreRulesLiteralLatLng) {
    return this._callMethod('distance', [other])._as(FirestoreRulesLiteralFloat)
  }

  latitude() {
    return this._callMethod('latitude', [])._as(FirestoreRulesLiteralFloat)
  }

  longitude() {
    return this._callMethod('longitude', [])._as(FirestoreRulesLiteralFloat)
  }
}

/**
 * Represents a List
 *
 * @see {@link https://firebase.google.com/docs/reference/rules/rules.List}
 */
export class FirestoreRulesLiteralList<
  T extends FirestoreRulesExpression
> extends FirestoreRulesExpression {
  cls?: IFirestoreRulesElementConstructor<T>
  constructor(value: T[] | FirestoreRulesExpression) {
    if (!Array.isArray(value)) {
      super(value)
      this.cls = undefined
    } else {
      super({ render: () => `[${value.map((v) => v.render()).join(', ')}]` })
      this.cls = value[0].constructor as IFirestoreRulesElementConstructor<T>
    }
  }

  slice(start: number): FirestoreRulesExpressionChain
  slice(start: number, end: number): FirestoreRulesLiteralList<T>
  slice(
    start: number,
    end?: number
  ): FirestoreRulesLiteralList<T> | T | FirestoreRulesExpressionChain {
    if (end) {
      return this._range(
        new FirestoreRulesLiteralInteger(start),
        new FirestoreRulesLiteralInteger(end)
      )._as(FirestoreRulesLiteralList) as FirestoreRulesLiteralList<T>
    }
    return this._slice(new FirestoreRulesLiteralInteger(start))
  }

  concat(list: FirestoreRulesLiteralList<T>) {
    return this._callMethod('concat', [list])._as(
      FirestoreRulesLiteralList
    ) as FirestoreRulesLiteralList<T>
  }

  hasAll(list: FirestoreRulesLiteralList<T>) {
    return this._callMethod('hasAll', [list])._as(FirestoreRulesLiteralBoolean)
  }

  hasAny(list: FirestoreRulesLiteralList<T>) {
    return this._callMethod('hasAny', [list])._as(FirestoreRulesLiteralBoolean)
  }

  hasOnly(list: FirestoreRulesLiteralList<T>) {
    return this._callMethod('hasOnly', [list])._as(FirestoreRulesLiteralBoolean)
  }

  join(separator: FirestoreRulesLiteralString) {
    return this._callMethod('join', [separator])._as(
      FirestoreRulesLiteralString
    )
  }

  removeAll(list: FirestoreRulesLiteralList<T>) {
    return this._callMethod('removeAll', [list])._as(
      FirestoreRulesLiteralList
    ) as FirestoreRulesLiteralList<T>
  }

  size() {
    return this._callMethod('size', [])._as(FirestoreRulesLiteralInteger)
  }

  toSet(): FirestoreRulesLiteralSet<T> {
    return this._callMethod('toSet', [])._as(
      FirestoreRulesLiteralSet
    ) as FirestoreRulesLiteralSet<T>
  }
}

/**
 * Represents a Map
 *
 * @see {@link https://firebase.google.com/docs/reference/rules/rules.Map}
 */
export class FirestoreRulesLiteralMap extends FirestoreRulesExpression {
  slice(value: FirestoreRulesLiteralString) {
    return this._slice(value)
  }

  dot(value: string) {
    return this._dot(value)
  }

  diff(map_to_compare: FirestoreRulesLiteralMap) {
    return this._callMethod('diff', [map_to_compare])._as(
      FirestoreRulesLiteralMapDiff
    )
  }

  get<T extends FirestoreRulesExpression>(
    key: FirestoreRulesLiteralString | FirestoreRulesLiteralList<any>,
    default_value: T
  ) {
    const cls = default_value.constructor as IFirestoreRulesElementConstructor<T>
    return this._callMethod('get', [key, default_value])._as(cls)
  }

  keys() {
    return this._callMethod('keys', [])._as(FirestoreRulesLiteralList)
  }

  size() {
    return this._callMethod('size', [])._as(FirestoreRulesLiteralInteger)
  }

  values() {
    return this._callMethod('values', [])._as(FirestoreRulesLiteralList)
  }
}

/**
 * Represents a MapDiff
 *
 * @see {@link https://firebase.google.com/docs/reference/rules/rules.MapDiff}
 */
export class FirestoreRulesLiteralMapDiff extends FirestoreRulesExpression {
  addedKeys() {
    return this._callMethod('addedKeys', [])._as(FirestoreRulesLiteralSet)
  }
  affectedKeys() {
    return this._callMethod('affectedKeys', [])._as(FirestoreRulesLiteralSet)
  }
  changedKeys() {
    return this._callMethod('changedKeys', [])._as(FirestoreRulesLiteralSet)
  }
  removedKeys() {
    return this._callMethod('removedKeys', [])._as(FirestoreRulesLiteralSet)
  }
  unchangedKeys() {
    return this._callMethod('unchangedKeys', [])._as(FirestoreRulesLiteralSet)
  }
}

/**
 * Represents a Number
 *
 * @see {@link https://firebase.google.com/docs/reference/rules/rules.Number}
 */
export class FirestoreRulesLiteralNumber extends FirestoreRulesExpression {}

/**
 * Represents a Path
 *
 * @see {@link https://firebase.google.com/docs/reference/rules/rules.Path}
 */
export class FirestoreRulesLiteralPath extends FirestoreRulesExpression {
  constructor(value: string | FirestoreRulesExpression) {
    if (value instanceof FirestoreRulesExpression) {
      super(value)
    } else {
      if (!value.startsWith('/')) {
        throw Error(`path object should be starts with '/'. but ${value}`)
      }
      super(new FirestoreRulesVariable(value))
    }
  }
  slice(value: FirestoreRulesExpression) {
    return this._slice(value)
  }

  dot(value: string) {
    return this._dot(value)
  }

  bind(map: FirestoreRulesLiteralMap) {
    return this._callMethod('bind', [map])._as(FirestoreRulesLiteralPath)
  }
}

/**
 * Represents a Request
 *
 * @see {@link https://firebase.google.com/docs/reference/rules/rules.Request}
 */
export class FirestoreRulesLiteralRequest extends FirestoreRulesLiteralMap {
  get auth() {
    return this.dot('auth')._as(FirestoreRulesLiteralAuth)
  }
  get method() {
    return this.dot('method')._as(FirestoreRulesLiteralString)
  }
  get path() {
    return this.dot('path')._as(FirestoreRulesLiteralPath)
  }
  get query() {
    return this.dot('query')._as(FirestoreRulesLiteralQuery)
  }
  get resource() {
    return this.dot('resource')._as(FirestoreRulesLiteralResource)
  }
  get time() {
    return this.dot('time')._as(FirestoreRulesLiteralTimestamp)
  }
}
export class FirestoreRulesLiteralAuth extends FirestoreRulesLiteralMap {
  get uid() {
    return this.dot('uid')._as(FirestoreRulesLiteralString)
  }
  get token() {
    return this.dot('token')._as(FirestoreRulesLiteralTokenClaims)
  }
}
export class FirestoreRulesLiteralTokenClaims extends FirestoreRulesLiteralMap {
  get email() {
    return this.dot('email')._as(FirestoreRulesLiteralString)
  }
  get email_verified() {
    return this.dot('email_verified')._as(FirestoreRulesLiteralString)
  }
  get phone_number() {
    return this.dot('phone_number')._as(FirestoreRulesLiteralString)
  }
  get name() {
    return this.dot('name')._as(FirestoreRulesLiteralString)
  }
  get sub() {
    return this.dot('sub')._as(FirestoreRulesLiteralString)
  }
  get firebase__identities() {
    return this.dot('firebase.identities')._as(FirestoreRulesLiteralString)
  }
  get firebase__sign_in_provider() {
    return this.dot('firebase.sign_in_provider')._as(
      FirestoreRulesLiteralString
    )
  }
}
export class FirestoreRulesLiteralQuery extends FirestoreRulesLiteralMap {
  get limit() {
    return this.dot('limit')._as(FirestoreRulesLiteralInteger)
  }
  get offset() {
    return this.dot('offset')._as(FirestoreRulesLiteralInteger)
  }
  get orderBy() {
    return this.dot('orderBy')
  }
}

/**
 * Represents a Resource
 *
 * @see {@link https://firebase.google.com/docs/reference/rules/rules.Resource}
 */
export class FirestoreRulesLiteralResource extends FirestoreRulesLiteralMap {
  get __name__() {
    return this.dot('__name__')._as(FirestoreRulesLiteralPath)
  }
  get data() {
    return this.dot('data')._as(FirestoreRulesLiteralMap)
  }
  get id() {
    return this.dot('id')._as(FirestoreRulesLiteralString)
  }
}

/**
 * Represents a debug
 *
 * @see {@link https://firebase.google.com/docs/reference/rules/rules.debug}
 */
export const debug = <T extends FirestoreRulesExpression>(value: T) => {
  const cls = value.constructor as IFirestoreRulesElementConstructor<T>
  return new FirestoreRulesFunctionCall('debug', [value])._as(cls)
}

/**
 * Represents a duration
 *
 * @see {@link https://firebase.google.com/docs/reference/rules/rules.duration_}
 */
export class FirestoreRulesGlobalDuration extends FirestoreRulesExpression {
  constructor() {
    super(new FirestoreRulesVariable('duration'))
  }
  abs(duration: FirestoreRulesLiteralDuration) {
    return this._callMethod('abs', [duration])._as(
      FirestoreRulesLiteralDuration
    )
  }
  time(
    hours: FirestoreRulesLiteralInteger,
    mins: FirestoreRulesLiteralInteger,
    secs: FirestoreRulesLiteralInteger,
    nanos: FirestoreRulesLiteralInteger
  ) {
    return this._callMethod('time', [hours, mins, secs, nanos])._as(
      FirestoreRulesLiteralDuration
    )
  }
  value(
    magnitude: FirestoreRulesLiteralInteger,
    unit: FirestoreRulesLiteralString
  ) {
    return this._callMethod('value', [magnitude, unit])._as(
      FirestoreRulesLiteralDuration
    )
  }
}

/**
 * Represents a firestore
 *
 * @see {@link https://firebase.google.com/docs/reference/rules/rules.firestore}
 */
export const FirestoreRulesGlobalFirestore = {
  request: new FirestoreRulesVariable('request')._as(
    FirestoreRulesLiteralRequest
  ),
  resource: new FirestoreRulesVariable('resource')._as(
    FirestoreRulesLiteralResource
  ),
  exists: (path: FirestoreRulesLiteralPath) =>
    new FirestoreRulesFunctionCall('exists', [path])._as(
      FirestoreRulesLiteralBoolean
    ),
  existsAfter: (path: FirestoreRulesLiteralPath) =>
    new FirestoreRulesFunctionCall('existsAfter', [path])._as(
      FirestoreRulesLiteralBoolean
    ),
  get: (path: FirestoreRulesLiteralPath) =>
    new FirestoreRulesFunctionCall('get', [path])._as(
      FirestoreRulesLiteralResource
    ),
  getAfter: (path: FirestoreRulesLiteralPath) =>
    new FirestoreRulesFunctionCall('getAfter', [path])._as(
      FirestoreRulesLiteralResource
    ),
} as const

/**
 * Represents a hashing
 *
 * @see {@link https://firebase.google.com/docs/reference/rules/rules.hashing}
 */
export class FirestoreRulesGlobalHashing extends FirestoreRulesExpression {
  constructor() {
    super(new FirestoreRulesVariable('hashing'))
  }
  crc32(
    bytes_or_string: FirestoreRulesLiteralBytes | FirestoreRulesLiteralString
  ) {
    return this._callMethod('crc32', [bytes_or_string])._as(
      FirestoreRulesLiteralBytes
    )
  }
  crc32c(
    bytes_or_string: FirestoreRulesLiteralBytes | FirestoreRulesLiteralString
  ) {
    return this._callMethod('crc32c', [bytes_or_string])._as(
      FirestoreRulesLiteralBytes
    )
  }
  md5(
    bytes_or_string: FirestoreRulesLiteralBytes | FirestoreRulesLiteralString
  ) {
    return this._callMethod('md5', [bytes_or_string])._as(
      FirestoreRulesLiteralBytes
    )
  }
  sha256(
    bytes_or_string: FirestoreRulesLiteralBytes | FirestoreRulesLiteralString
  ) {
    return this._callMethod('sha256', [bytes_or_string])._as(
      FirestoreRulesLiteralBytes
    )
  }
}

/**
 * Represents a latlng
 *
 * @see {@link https://firebase.google.com/docs/reference/rules/rules.latlng}
 */
export class FirestoreRulesGlobalLatlng extends FirestoreRulesExpression {
  constructor() {
    super(new FirestoreRulesVariable('latlng'))
  }
  value(lat: FirestoreRulesLiteralFloat, lng: FirestoreRulesLiteralFloat) {
    return this._callMethod('value', [lat, lng])._as(
      FirestoreRulesLiteralLatLng
    )
  }
}

/**
 * Represents a math
 *
 * @see {@link https://firebase.google.com/docs/reference/rules/rules.math}
 */
export class FirestoreRulesGlobalMath extends FirestoreRulesExpression {
  constructor() {
    super(new FirestoreRulesVariable('math'))
  }
  abs(num: FirestoreRulesLiteralInteger) {
    return this._callMethod('abs', [num])._as(FirestoreRulesLiteralInteger)
  }
  ceil(num: FirestoreRulesNumberLike) {
    return this._callMethod('ceil', [num])._as(FirestoreRulesLiteralInteger)
  }
  floor(num: FirestoreRulesNumberLike) {
    return this._callMethod('floor', [num])._as(FirestoreRulesLiteralInteger)
  }
  isInfinite(num: FirestoreRulesNumberLike) {
    return this._callMethod('isInfinite', [num])._as(
      FirestoreRulesLiteralBoolean
    )
  }
  isNaN(num: FirestoreRulesNumberLike) {
    return this._callMethod('isNaN', [num])._as(FirestoreRulesLiteralBoolean)
  }
  pow(base: FirestoreRulesNumberLike, exponent: FirestoreRulesNumberLike) {
    return this._callMethod('pow', [base, exponent])._as(
      FirestoreRulesLiteralFloat
    )
  }
  round(num: FirestoreRulesNumberLike) {
    return this._callMethod('round', [num])._as(FirestoreRulesLiteralInteger)
  }
  sqrt(num: FirestoreRulesNumberLike) {
    return this._callMethod('sqrt', [num])._as(FirestoreRulesLiteralFloat)
  }
}

/**
 * Represents a timestamp
 *
 * @see {@link https://firebase.google.com/docs/reference/rules/rules.timestamp}
 */
export class FirestoreRulesGlobalTimestamp extends FirestoreRulesVariable {
  constructor() {
    super(new FirestoreRulesVariable('timestamp'))
  }
  date(
    year: FirestoreRulesLiteralInteger,
    month: FirestoreRulesLiteralInteger,
    day: FirestoreRulesLiteralInteger
  ) {
    return this._callMethod('date', [year, month, day])._as(
      FirestoreRulesLiteralTimestamp
    )
  }
  value(epochMillis: FirestoreRulesLiteralInteger) {
    return this._callMethod('value', [epochMillis])._as(
      FirestoreRulesLiteralTimestamp
    )
  }
}

/**
 * Represents a Set
 *
 * @see {@link https://firebase.google.com/docs/reference/rules/rules.Set}
 */
export class FirestoreRulesLiteralSet<
  T extends FirestoreRulesExpression
> extends FirestoreRulesExpression {
  difference(other: FirestoreRulesLiteralSet<T>) {
    return this._callMethod('difference', [other])._as(
      FirestoreRulesLiteralSet
    ) as FirestoreRulesLiteralSet<T>
  }
  hasAll(other: FirestoreRulesLiteralList<T> | FirestoreRulesLiteralSet<T>) {
    return this._callMethod('hasAll', [other])._as(FirestoreRulesLiteralBoolean)
  }
  hasAny(other: FirestoreRulesLiteralList<T> | FirestoreRulesLiteralSet<T>) {
    return this._callMethod('hasAny', [other])._as(FirestoreRulesLiteralBoolean)
  }
  hasOnly(other: FirestoreRulesLiteralList<T> | FirestoreRulesLiteralSet<T>) {
    return this._callMethod('hasOnly', [other])._as(
      FirestoreRulesLiteralBoolean
    )
  }
  intersection(
    other: FirestoreRulesLiteralList<T> | FirestoreRulesLiteralSet<T>
  ) {
    return this._callMethod('intersection', [other])._as(
      FirestoreRulesLiteralSet
    ) as FirestoreRulesLiteralSet<T>
  }
  size() {
    return this._callMethod('size', [])._as(FirestoreRulesLiteralInteger)
  }
  union(other: FirestoreRulesLiteralSet<T>) {
    return this._callMethod('union', [other])._as(
      FirestoreRulesLiteralSet
    ) as FirestoreRulesLiteralSet<T>
  }
}

/**
 * Represents a String
 *
 * @see {@link https://firebase.google.com/docs/reference/rules/rules.String}
 */
export class FirestoreRulesLiteralString extends FirestoreRulesExpression {
  constructor(value: string | FirestoreRulesExpression) {
    if (value instanceof FirestoreRulesExpression) {
      super(value)
    } else {
      super(new FirestoreRulesVariable(`'${value}'`))
    }
  }
  slice(start: number, end?: number) {
    if (end) {
      return this._range(
        new FirestoreRulesLiteralInteger(start),
        new FirestoreRulesLiteralInteger(end)
      )._as(FirestoreRulesLiteralString)
    }
    return this._slice(new FirestoreRulesLiteralInteger(start))._as(
      FirestoreRulesLiteralString
    )
  }
  lower() {
    return this._callMethod('lower', [])._as(FirestoreRulesLiteralString)
  }
  matches(re: FirestoreRulesLiteralString) {
    return this._callMethod('matches', [re])._as(FirestoreRulesLiteralString)
  }
  replace(re: FirestoreRulesLiteralString, sub: FirestoreRulesLiteralString) {
    return this._callMethod('replace', [re, sub])._as(
      FirestoreRulesLiteralString
    )
  }
  size() {
    return this._callMethod('size', [])._as(FirestoreRulesLiteralInteger)
  }
  split(re: FirestoreRulesLiteralString) {
    return this._callMethod('split', [re])._as(FirestoreRulesLiteralList)
  }
  toUtf8() {
    return this._callMethod('toUtf8', [])._as(FirestoreRulesLiteralBytes)
  }
  trim() {
    return this._callMethod('trim', [])._as(FirestoreRulesLiteralString)
  }
  upper() {
    return this._callMethod('upper', [])._as(FirestoreRulesLiteralString)
  }
}

/**
 * Represents a Timestamp
 *
 * @see {@link https://firebase.google.com/docs/reference/rules/rules.Timestamp}
 */
export class FirestoreRulesLiteralTimestamp extends FirestoreRulesExpression {
  date() {
    return this._callMethod('date', [])._as(FirestoreRulesLiteralTimestamp)
  }
  day() {
    return this._callMethod('day', [])._as(FirestoreRulesLiteralInteger)
  }
  dayOfWeek() {
    return this._callMethod('dayOfWeek', [])._as(FirestoreRulesLiteralInteger)
  }
  dayOfYear() {
    return this._callMethod('dayOfYear', [])._as(FirestoreRulesLiteralInteger)
  }
  hours() {
    return this._callMethod('hours', [])._as(FirestoreRulesLiteralInteger)
  }
  minutes() {
    return this._callMethod('minutes', [])._as(FirestoreRulesLiteralInteger)
  }
  month() {
    return this._callMethod('month', [])._as(FirestoreRulesLiteralInteger)
  }
  nanos() {
    return this._callMethod('nanos', [])._as(FirestoreRulesLiteralInteger)
  }
  seconds() {
    return this._callMethod('seconds', [])._as(FirestoreRulesLiteralInteger)
  }
  time() {
    return this._callMethod('time', [])._as(FirestoreRulesLiteralDuration)
  }
  toMillis() {
    return this._callMethod('toMillis', [])._as(FirestoreRulesLiteralInteger)
  }
  year() {
    return this._callMethod('year', [])._as(FirestoreRulesLiteralInteger)
  }
}

export type FirestoreRulesNumberLike =
  | FirestoreRulesLiteralInteger
  | FirestoreRulesLiteralFloat

export const FirestoreRulesGlobalContext = {
  ...FirestoreRulesGlobalFirestore,
  hashing: new FirestoreRulesGlobalHashing(),
  latlng: new FirestoreRulesGlobalLatlng(),
  math: new FirestoreRulesGlobalMath(),
  timestamp: new FirestoreRulesGlobalTimestamp(),
  duration: new FirestoreRulesGlobalDuration(),
} as const
export type FirestoreRulesGlobalContextType = typeof FirestoreRulesGlobalContext
