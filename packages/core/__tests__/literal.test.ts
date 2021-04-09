import {
  FirestoreRulesExpressionChain,
  FirestoreRulesVariable,
} from '../src/base'
import {
  debug,
  FirestoreRulesGlobalContext,
  FirestoreRulesGlobalDuration,
  FirestoreRulesGlobalFirestore,
  FirestoreRulesGlobalHashing,
  FirestoreRulesGlobalLatlng,
  FirestoreRulesGlobalMath,
  FirestoreRulesGlobalTimestamp,
  FirestoreRulesLiteralAuth,
  FirestoreRulesLiteralBoolean,
  FirestoreRulesLiteralDuration,
  FirestoreRulesLiteralFloat,
  FirestoreRulesLiteralInteger,
  FirestoreRulesLiteralLatLng,
  FirestoreRulesLiteralList,
  FirestoreRulesLiteralMap,
  FirestoreRulesLiteralMapDiff,
  FirestoreRulesLiteralNull,
  FirestoreRulesLiteralNumber,
  FirestoreRulesLiteralPath,
  FirestoreRulesLiteralQuery,
  FirestoreRulesLiteralRequest,
  FirestoreRulesLiteralResource,
  FirestoreRulesLiteralSet,
  FirestoreRulesLiteralString,
  FirestoreRulesLiteralTimestamp,
  FirestoreRulesLiteralTokenClaims,
} from '../src/literal'

describe('@firestore-rules/core/literal.ts FirestoreRulesLiteralNull', () => {
  test('render with null', () => {
    const nullValue = new FirestoreRulesLiteralNull()
    expect(nullValue).toBeInstanceOf(FirestoreRulesLiteralNull)
    expect(nullValue.render()).toEqual('null')
  })

  test('render render with variable', () => {
    const nullValue = new FirestoreRulesVariable('x')._as(
      FirestoreRulesLiteralNull
    )
    expect(nullValue).toBeInstanceOf(FirestoreRulesLiteralNull)
    expect(nullValue.render()).toEqual('x')
  })
})

describe('@firestore-rules/core/literal.ts FirestoreRulesLiteralBoolean', () => {
  test('render with true', () => {
    const trueValue = new FirestoreRulesLiteralBoolean(true)
    expect(trueValue).toBeInstanceOf(FirestoreRulesLiteralBoolean)
    expect(trueValue.render()).toEqual('true')
  })
  test('render with false', () => {
    const falseValue = new FirestoreRulesLiteralBoolean(false)
    expect(falseValue).toBeInstanceOf(FirestoreRulesLiteralBoolean)
    expect(falseValue.render()).toEqual('false')
  })
  test('render with variables', () => {
    const booleanValue = new FirestoreRulesVariable('x')._as(
      FirestoreRulesLiteralBoolean
    )
    expect(booleanValue).toBeInstanceOf(FirestoreRulesLiteralBoolean)
    expect(booleanValue.render()).toEqual('x')
  })
})

describe('@firestore-rules/core/literal.ts FirestoreRulesLiteralBytes', () => {
  // TODO
  // test('render with string', () => {
  //   const bytesValue = new FirestoreRulesLiteralBytes('hello')
  //   expect(bytesValue).toBeInstanceOf(FirestoreRulesLiteralBytes)
  //   expect(bytesValue.render()).toEqual("b'hello'")
  // })
  // test('render with byte string', () => {
  //   const bytesValue = new FirestoreRulesLiteralBytes('\xE2\x82\xAC')
  //   expect(bytesValue).toBeInstanceOf(FirestoreRulesLiteralBytes)
  //   expect(bytesValue.render()).toEqual("b'\xE2\x82\xAC'")
  // })
  // test('render with variables', () => {
  //   const bytesValue = new FirestoreRulesLiteralBytes(
  //     new FirestoreRulesVariable('x')
  //   )
  //   expect(bytesValue).toBeInstanceOf(FirestoreRulesLiteralBytes)
  //   expect(bytesValue.render()).toEqual('x')
  // })
  // test('size with string', () => {
  //   const size = new FirestoreRulesLiteralBytes('hello').size()
  //   expect(size).toBeInstanceOf(FirestoreRulesLiteralInteger)
  //   expect(size.render()).toEqual("b'hello'.size()")
  // })
  // test('size with byte string', () => {
  //   const size = new FirestoreRulesLiteralBytes('\xE2\x82\xAC').size()
  //   expect(size).toBeInstanceOf(FirestoreRulesLiteralInteger)
  //   expect(size.render()).toEqual("b'\xE2\x82\xAC'.size()")
  // })
  // test('size with variables', () => {
  //   const size = new FirestoreRulesLiteralBytes(
  //     new FirestoreRulesVariable('x')
  //   ).size()
  //   expect(size).toBeInstanceOf(FirestoreRulesLiteralInteger)
  //   expect(size.render()).toEqual('x.size()')
  // })
  // test('toBase64 with string', () => {
  //   const size = new FirestoreRulesLiteralBytes('hello').size()
  //   expect(size).toBeInstanceOf(FirestoreRulesLiteralString)
  //   expect(size.render()).toEqual("b'hello'.toBase64()")
  // })
  // test('toBase64 with byte string', () => {
  //   const size = new FirestoreRulesLiteralBytes('\xE2\x82\xAC').size()
  //   expect(size).toBeInstanceOf(FirestoreRulesLiteralString)
  //   expect(size.render()).toEqual("b'\xE2\x82\xAC'.toBase64()")
  // })
  // test('toBase64 with variables', () => {
  //   const size = new FirestoreRulesLiteralBytes(
  //     new FirestoreRulesVariable('x')
  //   ).size()
  //   expect(size).toBeInstanceOf(FirestoreRulesLiteralString)
  //   expect(size.render()).toEqual(`x.toBase64()`)
  // })
})

describe('@firestore-rules/core/literal.ts FirestoreRulesLiteralDuration', () => {
  const durationValue = new FirestoreRulesVariable('x')._as(
    FirestoreRulesLiteralDuration
  )
  test('render with variable', () => {
    expect(durationValue).toBeInstanceOf(FirestoreRulesLiteralDuration)
    expect(durationValue.render()).toEqual('x')
  })
  test('nanos with variables', () => {
    const nanos = durationValue.nanos()
    expect(nanos).toBeInstanceOf(FirestoreRulesLiteralInteger)
    expect(nanos.render()).toEqual('x.nanos()')
  })
  test('seconds with variables', () => {
    const seconds = durationValue.seconds()
    expect(seconds).toBeInstanceOf(FirestoreRulesLiteralInteger)
    expect(seconds.render()).toEqual('x.seconds()')
  })
})

describe('@firestore-rules/core/literal.ts FirestoreRulesLiteralFloat', () => {
  test('render with integer', () => {
    const floatValue = new FirestoreRulesLiteralFloat(100)
    expect(floatValue).toBeInstanceOf(FirestoreRulesLiteralFloat)
    expect(floatValue.render()).toEqual('100.0')
  })
  test('render with float', () => {
    const floatValue = new FirestoreRulesLiteralFloat(123.45)
    expect(floatValue).toBeInstanceOf(FirestoreRulesLiteralFloat)
    expect(floatValue.render()).toEqual('123.45')
  })
  test('render with variable', () => {
    const floatValue = new FirestoreRulesVariable('x')._as(
      FirestoreRulesLiteralFloat
    )
    expect(floatValue).toBeInstanceOf(FirestoreRulesLiteralFloat)
    expect(floatValue.render()).toEqual('x')
  })
})

describe('@firestore-rules/core/literal.ts FirestoreRulesLiteralInteger', () => {
  test('render with integer', () => {
    const integerValue = new FirestoreRulesLiteralInteger(100)
    expect(integerValue).toBeInstanceOf(FirestoreRulesLiteralInteger)
    expect(integerValue.render()).toEqual('100')
  })
  test('render with float(throw error)', () => {
    expect(() => {
      new FirestoreRulesLiteralInteger(123.45)
    }).toThrow()
  })
  test('render with variables', () => {
    const integerValue = new FirestoreRulesVariable('x')._as(
      FirestoreRulesLiteralInteger
    )
    expect(integerValue).toBeInstanceOf(FirestoreRulesLiteralInteger)
    expect(integerValue.render()).toEqual('x')
  })
})

describe('@firestore-rules/core/literal.ts FirestoreRulesLiteralLatLng', () => {
  test('render with variable', () => {
    const latlngValue = new FirestoreRulesVariable('x')._as(
      FirestoreRulesLiteralLatLng
    )
    expect(latlngValue).toBeInstanceOf(FirestoreRulesLiteralLatLng)
    expect(latlngValue.render()).toEqual('x')
  })
  test('distance with variable', () => {
    const latlngValue = new FirestoreRulesVariable('x')
      ._as(FirestoreRulesLiteralLatLng)
      .distance(
        new FirestoreRulesVariable('y')._as(FirestoreRulesLiteralLatLng)
      )
    expect(latlngValue).toBeInstanceOf(FirestoreRulesLiteralFloat)
    expect(latlngValue.render()).toEqual('x.distance(y)')
  })
  test('latitude with variable', () => {
    const latlngValue = new FirestoreRulesVariable('x')
      ._as(FirestoreRulesLiteralLatLng)
      .latitude()
    expect(latlngValue).toBeInstanceOf(FirestoreRulesLiteralFloat)
    expect(latlngValue.render()).toEqual('x.latitude()')
  })
  test('longitude with variable', () => {
    const latlngValue = new FirestoreRulesVariable('x')
      ._as(FirestoreRulesLiteralLatLng)
      .longitude()
    expect(latlngValue).toBeInstanceOf(FirestoreRulesLiteralFloat)
    expect(latlngValue.render()).toEqual('x.longitude()')
  })
})

describe('@firestore-rules/core/literal.ts FirestoreRulesLiteralList', () => {
  test('render with string list', () => {
    const listValue = new FirestoreRulesLiteralList([
      new FirestoreRulesLiteralString('hello 1'),
      new FirestoreRulesLiteralString('hello 2'),
      new FirestoreRulesLiteralString('hello 3'),
    ])
    expect(listValue).toBeInstanceOf(FirestoreRulesLiteralList)
    expect(listValue.render()).toEqual("['hello 1', 'hello 2', 'hello 3']")
  })
  test('render with integer list', () => {
    const listValue = new FirestoreRulesLiteralList([
      new FirestoreRulesLiteralInteger(10),
      new FirestoreRulesLiteralInteger(100),
      new FirestoreRulesLiteralInteger(1000),
    ])
    expect(listValue).toBeInstanceOf(FirestoreRulesLiteralList)
    expect(listValue.render()).toEqual('[10, 100, 1000]')
  })
  test('render with integer variables', () => {
    const listValue = new FirestoreRulesLiteralList([
      new FirestoreRulesVariable('x'),
      new FirestoreRulesVariable('y'),
      new FirestoreRulesVariable('z'),
    ])
    expect(listValue).toBeInstanceOf(FirestoreRulesLiteralList)
    expect(listValue.render()).toEqual('[x, y, z]')
  })

  test('slice with variable(start only)', () => {
    const listValue = new FirestoreRulesLiteralList([
      new FirestoreRulesVariable('x'),
      new FirestoreRulesVariable('y'),
      new FirestoreRulesVariable('z'),
    ]).slice(1)
    // TODO: slice one should return more useabe type
    expect(listValue).toBeInstanceOf(FirestoreRulesExpressionChain)
    expect(listValue.render()).toEqual('[x, y, z][1]')
  })
  test('slice with variable(start and end)', () => {
    const listValue = new FirestoreRulesLiteralList([
      new FirestoreRulesVariable('x'),
      new FirestoreRulesVariable('y'),
      new FirestoreRulesVariable('z'),
    ]).slice(1, 3)
    expect(listValue).toBeInstanceOf(FirestoreRulesLiteralList)
    expect(listValue.render()).toEqual('[x, y, z][1:3]')
  })

  test('concat with variables', () => {
    const listValue = new FirestoreRulesLiteralList([
      new FirestoreRulesVariable('x'),
      new FirestoreRulesVariable('y'),
      new FirestoreRulesVariable('z'),
    ]).concat(
      new FirestoreRulesLiteralList([
        new FirestoreRulesVariable('a'),
        new FirestoreRulesVariable('b'),
        new FirestoreRulesVariable('c'),
      ])
    )
    expect(listValue).toBeInstanceOf(FirestoreRulesLiteralList)
    expect(listValue.render()).toEqual('[x, y, z].concat([a, b, c])')
  })

  test('hasAll with variables', () => {
    const listValue = new FirestoreRulesLiteralList([
      new FirestoreRulesVariable('x'),
      new FirestoreRulesVariable('y'),
      new FirestoreRulesVariable('z'),
    ]).hasAll(
      new FirestoreRulesLiteralList(new FirestoreRulesVariable('array'))
    )
    expect(listValue).toBeInstanceOf(FirestoreRulesLiteralBoolean)
    expect(listValue.render()).toEqual('[x, y, z].hasAll(array)')
  })

  test('hasAny with variables', () => {
    const listValue = new FirestoreRulesLiteralList([
      new FirestoreRulesVariable('x'),
      new FirestoreRulesVariable('y'),
      new FirestoreRulesVariable('z'),
    ]).hasAny(
      new FirestoreRulesLiteralList(new FirestoreRulesVariable('array'))
    )
    expect(listValue).toBeInstanceOf(FirestoreRulesLiteralBoolean)
    expect(listValue.render()).toEqual('[x, y, z].hasAny(array)')
  })

  test('hasOnly with variables', () => {
    const listValue = new FirestoreRulesLiteralList([
      new FirestoreRulesVariable('x'),
      new FirestoreRulesVariable('y'),
      new FirestoreRulesVariable('z'),
    ]).hasOnly(
      new FirestoreRulesLiteralList(new FirestoreRulesVariable('array'))
    )
    expect(listValue).toBeInstanceOf(FirestoreRulesLiteralBoolean)
    expect(listValue.render()).toEqual('[x, y, z].hasOnly(array)')
  })

  test('join with string', () => {
    const listValue = new FirestoreRulesLiteralList([
      new FirestoreRulesVariable('x'),
      new FirestoreRulesVariable('y'),
      new FirestoreRulesVariable('z'),
    ]).join(new FirestoreRulesLiteralString('sep'))
    expect(listValue).toBeInstanceOf(FirestoreRulesLiteralString)
    expect(listValue.render()).toEqual("[x, y, z].join('sep')")
  })

  test('removeAll with variables', () => {
    const listValue = new FirestoreRulesLiteralList([
      new FirestoreRulesVariable('x'),
      new FirestoreRulesVariable('y'),
      new FirestoreRulesVariable('z'),
    ]).removeAll(
      new FirestoreRulesLiteralList(new FirestoreRulesVariable('array'))
    )
    expect(listValue).toBeInstanceOf(FirestoreRulesLiteralList)
    expect(listValue.render()).toEqual('[x, y, z].removeAll(array)')
  })

  test('size with variables', () => {
    const listValue = new FirestoreRulesLiteralList([
      new FirestoreRulesVariable('x'),
      new FirestoreRulesVariable('y'),
      new FirestoreRulesVariable('z'),
    ]).size()
    expect(listValue).toBeInstanceOf(FirestoreRulesLiteralInteger)
    expect(listValue.render()).toEqual('[x, y, z].size()')
  })

  test('toSet with variables', () => {
    const listValue = new FirestoreRulesLiteralList([
      new FirestoreRulesVariable('x'),
      new FirestoreRulesVariable('y'),
      new FirestoreRulesVariable('z'),
    ]).toSet()
    expect(listValue).toBeInstanceOf(FirestoreRulesLiteralSet)
    expect(listValue.render()).toEqual('[x, y, z].toSet()')
  })
})

describe('@firestore-rules/core/literal.ts FirestoreRulesLiteralMap', () => {
  test('render with variable', () => {
    const mapValue = new FirestoreRulesLiteralMap(
      new FirestoreRulesVariable('x')
    )
    expect(mapValue).toBeInstanceOf(FirestoreRulesLiteralMap)
    expect(mapValue.render()).toEqual('x')
  })

  test('slice with string', () => {
    const mapValue = new FirestoreRulesLiteralMap(
      new FirestoreRulesVariable('x')
    ).slice(new FirestoreRulesLiteralString('y'))
    expect(mapValue).toBeInstanceOf(FirestoreRulesExpressionChain)
    expect(mapValue.render()).toEqual("x['y']")
  })

  test('dot with string', () => {
    const mapValue = new FirestoreRulesLiteralMap(
      new FirestoreRulesVariable('x')
    ).dot('y')
    expect(mapValue).toBeInstanceOf(FirestoreRulesExpressionChain)
    expect(mapValue.render()).toEqual('x.y')
  })

  test('diff with string', () => {
    const mapValue = new FirestoreRulesLiteralMap(
      new FirestoreRulesVariable('x')
    ).diff(new FirestoreRulesLiteralMap(new FirestoreRulesVariable('y')))
    expect(mapValue).toBeInstanceOf(FirestoreRulesLiteralMapDiff)
    expect(mapValue.render()).toEqual('x.diff(y)')
  })

  test('get with string', () => {
    const mapValue = new FirestoreRulesLiteralMap(
      new FirestoreRulesVariable('x')
    ).get(
      new FirestoreRulesLiteralString('y'),
      new FirestoreRulesLiteralString('default')
    )
    expect(mapValue).toBeInstanceOf(FirestoreRulesLiteralString)
    expect(mapValue.render()).toEqual("x.get('y', 'default')")
  })

  test('get with list', () => {
    const mapValue = new FirestoreRulesLiteralMap(
      new FirestoreRulesVariable('x')
    ).get(
      new FirestoreRulesLiteralList([
        new FirestoreRulesLiteralString('y'),
        new FirestoreRulesLiteralString('z'),
      ]),
      new FirestoreRulesLiteralString('default')
    )
    expect(mapValue).toBeInstanceOf(FirestoreRulesLiteralString)
    expect(mapValue.render()).toEqual("x.get(['y', 'z'], 'default')")
  })

  test('keys with list', () => {
    const mapValue = new FirestoreRulesLiteralMap(
      new FirestoreRulesVariable('x')
    ).keys()
    expect(mapValue).toBeInstanceOf(FirestoreRulesLiteralList)
    expect(mapValue.render()).toEqual('x.keys()')
  })

  test('size with list', () => {
    const mapValue = new FirestoreRulesLiteralMap(
      new FirestoreRulesVariable('x')
    ).size()
    expect(mapValue).toBeInstanceOf(FirestoreRulesLiteralInteger)
    expect(mapValue.render()).toEqual('x.size()')
  })

  test('values with list', () => {
    const mapValue = new FirestoreRulesLiteralMap(
      new FirestoreRulesVariable('x')
    ).values()
    expect(mapValue).toBeInstanceOf(FirestoreRulesLiteralList)
    expect(mapValue.render()).toEqual('x.values()')
  })
})

describe('@firestore-rules/core/literal.ts FirestoreRulesLiteralMapDiff', () => {
  test('render with variables', () => {
    const mapdiffValue = new FirestoreRulesLiteralMapDiff(
      new FirestoreRulesVariable('x')
    )
    expect(mapdiffValue).toBeInstanceOf(FirestoreRulesLiteralMapDiff)
    expect(mapdiffValue.render()).toEqual('x')
  })

  test('addedKeys with variables', () => {
    const mapdiffValue = new FirestoreRulesLiteralMapDiff(
      new FirestoreRulesVariable('x')
    ).addedKeys()
    expect(mapdiffValue).toBeInstanceOf(FirestoreRulesLiteralSet)
    expect(mapdiffValue.render()).toEqual('x.addedKeys()')
  })
  test('affectedKeys with variables', () => {
    const mapdiffValue = new FirestoreRulesLiteralMapDiff(
      new FirestoreRulesVariable('x')
    ).affectedKeys()
    expect(mapdiffValue).toBeInstanceOf(FirestoreRulesLiteralSet)
    expect(mapdiffValue.render()).toEqual('x.affectedKeys()')
  })
  test('changedKeys with variables', () => {
    const mapdiffValue = new FirestoreRulesLiteralMapDiff(
      new FirestoreRulesVariable('x')
    ).changedKeys()
    expect(mapdiffValue).toBeInstanceOf(FirestoreRulesLiteralSet)
    expect(mapdiffValue.render()).toEqual('x.changedKeys()')
  })
  test('removedKeys with variables', () => {
    const mapdiffValue = new FirestoreRulesLiteralMapDiff(
      new FirestoreRulesVariable('x')
    ).removedKeys()
    expect(mapdiffValue).toBeInstanceOf(FirestoreRulesLiteralSet)
    expect(mapdiffValue.render()).toEqual('x.removedKeys()')
  })
  test('unchangedKeys with variables', () => {
    const mapdiffValue = new FirestoreRulesLiteralMapDiff(
      new FirestoreRulesVariable('x')
    ).unchangedKeys()
    expect(mapdiffValue).toBeInstanceOf(FirestoreRulesLiteralSet)
    expect(mapdiffValue.render()).toEqual('x.unchangedKeys()')
  })
})

describe('@firestore-rules/core/literal.ts FirestoreRulesLiteralNumber', () => {
  test('render with variable', () => {
    const numberValue = new FirestoreRulesLiteralNumber(
      new FirestoreRulesVariable('x')
    )
    expect(numberValue).toBeInstanceOf(FirestoreRulesLiteralNumber)
    expect(numberValue.render()).toEqual('x')
  })
})

describe('@firestore-rules/core/literal.ts FirestoreRulesLiteralPath', () => {
  test('render with string', () => {
    const pathValue = new FirestoreRulesLiteralPath('/users/1')
    expect(pathValue).toBeInstanceOf(FirestoreRulesLiteralPath)
    expect(pathValue.render()).toEqual('/users/1')
  })

  test('render with invalid string', () => {
    expect(() => {
      new FirestoreRulesLiteralPath('invalid string')
    }).toThrow()
  })

  test('render with variable', () => {
    const pathValue = new FirestoreRulesLiteralPath(
      new FirestoreRulesVariable('x')
    )
    expect(pathValue).toBeInstanceOf(FirestoreRulesLiteralPath)
    expect(pathValue.render()).toEqual('x')
  })

  test('slice with variable', () => {
    const pathValue = new FirestoreRulesLiteralPath(
      new FirestoreRulesVariable('x')
    ).slice(new FirestoreRulesVariable('y'))
    expect(pathValue).toBeInstanceOf(FirestoreRulesExpressionChain)
    expect(pathValue.render()).toEqual('x[y]')
  })

  test('dot with variable', () => {
    const pathValue = new FirestoreRulesLiteralPath(
      new FirestoreRulesVariable('x')
    ).dot('y')
    expect(pathValue).toBeInstanceOf(FirestoreRulesExpressionChain)
    expect(pathValue.render()).toEqual('x.y')
  })

  test('bind with variable', () => {
    const pathValue = new FirestoreRulesLiteralPath(
      new FirestoreRulesVariable('x')
    ).bind(new FirestoreRulesLiteralMap(new FirestoreRulesVariable('y')))
    expect(pathValue).toBeInstanceOf(FirestoreRulesLiteralPath)
    expect(pathValue.render()).toEqual('x.bind(y)')
  })
})

describe('@firestore-rules/core/literal.ts FirestoreRulesLiteralRequest', () => {
  const request = new FirestoreRulesLiteralRequest(
    new FirestoreRulesVariable('request')
  )
  test('auth property', () => {
    expect(request.auth).toBeInstanceOf(FirestoreRulesLiteralAuth)
    expect(request.auth.render()).toEqual('request.auth')
  })
  test('method property', () => {
    expect(request.method).toBeInstanceOf(FirestoreRulesLiteralString)
    expect(request.method.render()).toEqual('request.method')
  })
  test('path property', () => {
    expect(request.path).toBeInstanceOf(FirestoreRulesLiteralPath)
    expect(request.path.render()).toEqual('request.path')
  })
  test('query property', () => {
    expect(request.query).toBeInstanceOf(FirestoreRulesLiteralQuery)
    expect(request.query.render()).toEqual('request.query')
  })
  test('resource property', () => {
    expect(request.resource).toBeInstanceOf(FirestoreRulesLiteralResource)
    expect(request.resource.render()).toEqual('request.resource')
  })
  test('time property', () => {
    expect(request.time).toBeInstanceOf(FirestoreRulesLiteralTimestamp)
    expect(request.time.render()).toEqual('request.time')
  })

  describe('@firestore-rules/core/literal.ts FirestoreRulesLiteralRequest.auth', () => {
    const auth = request.auth
    test('uid', () => {
      expect(auth.uid).toBeInstanceOf(FirestoreRulesLiteralString)
      expect(auth.uid.render()).toEqual('request.auth.uid')
    })
    test('token', () => {
      expect(auth.token).toBeInstanceOf(FirestoreRulesLiteralTokenClaims)
      expect(auth.token.render()).toEqual('request.auth.token')
    })
    describe('@firestore-rules/core/literal.ts FirestoreRulesLiteralRequest.auth.token', () => {
      const token = auth.token
      test('email', () => {
        expect(token.email).toBeInstanceOf(FirestoreRulesLiteralString)
        expect(token.email.render()).toEqual('request.auth.token.email')
      })
      test('email_verified', () => {
        expect(token.email_verified).toBeInstanceOf(FirestoreRulesLiteralString)
        expect(token.email_verified.render()).toEqual(
          'request.auth.token.email_verified'
        )
      })
      test('phone_number', () => {
        expect(token.phone_number).toBeInstanceOf(FirestoreRulesLiteralString)
        expect(token.phone_number.render()).toEqual(
          'request.auth.token.phone_number'
        )
      })
      test('name', () => {
        expect(token.name).toBeInstanceOf(FirestoreRulesLiteralString)
        expect(token.name.render()).toEqual('request.auth.token.name')
      })
      test('sub', () => {
        expect(token.sub).toBeInstanceOf(FirestoreRulesLiteralString)
        expect(token.sub.render()).toEqual('request.auth.token.sub')
      })
      test('firebase__identities', () => {
        expect(token.firebase__identities).toBeInstanceOf(
          FirestoreRulesLiteralString
        )
        expect(token.firebase__identities.render()).toEqual(
          'request.auth.token.firebase.identities'
        )
      })
      test('firebase__sign_in_provider', () => {
        expect(token.firebase__sign_in_provider).toBeInstanceOf(
          FirestoreRulesLiteralString
        )
        expect(token.firebase__sign_in_provider.render()).toEqual(
          'request.auth.token.firebase.sign_in_provider'
        )
      })
    })
  })
  describe('@firestore-rules/core/literal.ts FirestoreRulesLiteralRequest.query', () => {
    const query = request.query
    test('limit', () => {
      expect(query.limit).toBeInstanceOf(FirestoreRulesLiteralInteger)
      expect(query.limit.render()).toEqual('request.query.limit')
    })
    test('offset', () => {
      expect(query.offset).toBeInstanceOf(FirestoreRulesLiteralInteger)
      expect(query.offset.render()).toEqual('request.query.offset')
    })
    test('orderBy', () => {
      expect(query.orderBy).toBeInstanceOf(FirestoreRulesExpressionChain)
      expect(query.orderBy.render()).toEqual('request.query.orderBy')
    })
  })
})

describe('@firestore-rules/core/literal.ts FirestoreRulesLiteralResource', () => {
  const resource = new FirestoreRulesLiteralResource(
    new FirestoreRulesVariable('resource')
  )
  test('__name__', () => {
    expect(resource.__name__).toBeInstanceOf(FirestoreRulesLiteralPath)
    expect(resource.__name__.render()).toEqual('resource.__name__')
  })
  test('data', () => {
    expect(resource.data).toBeInstanceOf(FirestoreRulesLiteralMap)
    expect(resource.data.render()).toEqual('resource.data')
  })
  test('id', () => {
    expect(resource.id).toBeInstanceOf(FirestoreRulesLiteralString)
    expect(resource.id.render()).toEqual('resource.id')
  })
})

describe('@firestore-rules/core/literal.ts debug', () => {
  test('debug with string', () => {
    const value = debug(new FirestoreRulesLiteralString('hello'))
    expect(value).toBeInstanceOf(FirestoreRulesLiteralString)
    expect(value.render()).toEqual("debug('hello')")
  })

  test('debug with variable', () => {
    const value = debug(
      new FirestoreRulesVariable('hello')._as(FirestoreRulesLiteralInteger)
    )
    expect(value).toBeInstanceOf(FirestoreRulesLiteralInteger)
    expect(value.render()).toEqual('debug(hello)')
  })
})

describe('@firestore-rules/core/literal.ts FirestoreRulesGlobalDuration', () => {
  const duration = new FirestoreRulesGlobalDuration()
  test('render', () => {
    expect(duration).toBeInstanceOf(FirestoreRulesGlobalDuration)
    expect(duration.render()).toBe('duration')
  })

  test('abs', () => {
    const abs = duration.abs(
      new FirestoreRulesVariable('x')._as(FirestoreRulesLiteralDuration)
    )
    expect(abs).toBeInstanceOf(FirestoreRulesLiteralDuration)
    expect(abs.render()).toEqual('duration.abs(x)')
  })
  test('time', () => {
    const time = duration.time(
      new FirestoreRulesVariable('hours')._as(FirestoreRulesLiteralInteger),
      new FirestoreRulesVariable('mins')._as(FirestoreRulesLiteralInteger),
      new FirestoreRulesVariable('secs')._as(FirestoreRulesLiteralInteger),
      new FirestoreRulesVariable('nanos')._as(FirestoreRulesLiteralInteger)
    )
    expect(time).toBeInstanceOf(FirestoreRulesLiteralDuration)
    expect(time.render()).toEqual('duration.time(hours, mins, secs, nanos)')
  })
  test('value', () => {
    const value = duration.value(
      new FirestoreRulesLiteralInteger(123),
      new FirestoreRulesLiteralString('m')
    )
    expect(value).toBeInstanceOf(FirestoreRulesLiteralDuration)
    expect(value.render()).toEqual("duration.value(123, 'm')")
  })
})

describe('@firestore-rules/core/literal.ts FirestoreRulesGlobalFirestore', () => {
  const global = FirestoreRulesGlobalFirestore
  test('request', () => {
    expect(global.request).toBeInstanceOf(FirestoreRulesLiteralRequest)
    expect(global.request.render()).toEqual('request')
  })
  test('resource', () => {
    expect(global.resource).toBeInstanceOf(FirestoreRulesLiteralResource)
    expect(global.resource.render()).toEqual('resource')
  })
  test('exists', () => {
    const exists = global.exists(
      new FirestoreRulesVariable('path')._as(FirestoreRulesLiteralPath)
    )
    expect(exists).toBeInstanceOf(FirestoreRulesLiteralBoolean)
    expect(exists.render()).toEqual('exists(path)')
  })
  test('existsAfter', () => {
    const existsAfter = global.existsAfter(
      new FirestoreRulesVariable('path')._as(FirestoreRulesLiteralPath)
    )
    expect(existsAfter).toBeInstanceOf(FirestoreRulesLiteralBoolean)
    expect(existsAfter.render()).toEqual('existsAfter(path)')
  })
  test('get', () => {
    const get = global.get(
      new FirestoreRulesVariable('path')._as(FirestoreRulesLiteralPath)
    )
    expect(get).toBeInstanceOf(FirestoreRulesLiteralResource)
    expect(get.render()).toEqual('get(path)')
  })
  test('getAfter', () => {
    const getAfter = global.getAfter(
      new FirestoreRulesVariable('path')._as(FirestoreRulesLiteralPath)
    )
    expect(getAfter).toBeInstanceOf(FirestoreRulesLiteralResource)
    expect(getAfter.render()).toEqual('getAfter(path)')
  })
})

describe('@firestore-rules/core/literal.ts FirestoreRulesGlobalHashing', () => {
  const hashing = new FirestoreRulesGlobalHashing()
  test('render', () => {
    expect(hashing).toBeInstanceOf(FirestoreRulesGlobalHashing)
    expect(hashing.render()).toEqual('hashing')
  })
  test('crc32', () => {
    // TODO: when bytes support
    // const crc32 = hashing.crc32(new FirestoreRulesLiteralString('xyz'))
    // expect(crc32).toBeInstanceOf(FirestoreRulesLiteralBytes)
    // expect(crc32.render()).toEqual("hasing.crc32('xyz')")
  })
  test('crc32c', () => {
    // TODO: when bytes support
    // const crc32c = hashing.crc32c(new FirestoreRulesLiteralString('xyz'))
    // expect(crc32c).toBeInstanceOf(FirestoreRulesLiteralBytes)
    // expect(crc32c.render()).toEqual("hasing.crc32c('xyz')")
  })
  test('md5', () => {
    // TODO: when bytes support
    // const md5 = hashing.md5(new FirestoreRulesLiteralString('xyz'))
    // expect(md5).toBeInstanceOf(FirestoreRulesLiteralBytes)
    // expect(md5.render()).toEqual("hasing.md5('xyz')")
  })
  test('sha256', () => {
    // TODO: when bytes support
    // const sha256 = hashing.sha256(new FirestoreRulesLiteralString('xyz'))
    // expect(sha256).toBeInstanceOf(FirestoreRulesLiteralBytes)
    // expect(sha256.render()).toEqual("hasing.sha256('xyz')")
  })
})

describe('@firestore-rules/core/literal.ts FirestoreRulesGlobalLatlng', () => {
  const latlng = new FirestoreRulesGlobalLatlng()
  test('render', () => {
    expect(latlng).toBeInstanceOf(FirestoreRulesGlobalLatlng)
    expect(latlng.render()).toEqual('latlng')
  })
  test('value', () => {
    const value = latlng.value(
      new FirestoreRulesVariable('lat'),
      new FirestoreRulesVariable('lng')
    )
    expect(value).toBeInstanceOf(FirestoreRulesLiteralLatLng)
    expect(value.render()).toEqual('latlng.value(lat, lng)')
  })
})

describe('@firestore-rules/core/literal.ts FirestoreRulesGlobalMath', () => {
  const math = new FirestoreRulesGlobalMath()
  test('render', () => {
    expect(math).toBeInstanceOf(FirestoreRulesGlobalMath)
    expect(math.render()).toEqual('math')
  })
  test('abs', () => {
    const abs = math.abs(new FirestoreRulesLiteralInteger(123))
    expect(abs).toBeInstanceOf(FirestoreRulesLiteralInteger)
    expect(abs.render()).toEqual('math.abs(123)')
  })
  test('ceil', () => {
    const ceil = math.ceil(new FirestoreRulesLiteralInteger(123))
    expect(ceil).toBeInstanceOf(FirestoreRulesLiteralInteger)
    expect(ceil.render()).toEqual('math.ceil(123)')
  })
  test('floor', () => {
    const floor = math.floor(new FirestoreRulesLiteralInteger(123))
    expect(floor).toBeInstanceOf(FirestoreRulesLiteralInteger)
    expect(floor.render()).toEqual('math.floor(123)')
  })
  test('isInfinite', () => {
    const isInfinite = math.isInfinite(new FirestoreRulesLiteralInteger(123))
    expect(isInfinite).toBeInstanceOf(FirestoreRulesLiteralBoolean)
    expect(isInfinite.render()).toEqual('math.isInfinite(123)')
  })
  test('isNaN', () => {
    const isNaN = math.isNaN(new FirestoreRulesLiteralInteger(123))
    expect(isNaN).toBeInstanceOf(FirestoreRulesLiteralBoolean)
    expect(isNaN.render()).toEqual('math.isNaN(123)')
  })
  test('pow', () => {
    const pow = math.pow(
      new FirestoreRulesLiteralInteger(123),
      new FirestoreRulesLiteralInteger(10)
    )
    expect(pow).toBeInstanceOf(FirestoreRulesLiteralFloat)
    expect(pow.render()).toEqual('math.pow(123, 10)')
  })
  test('round', () => {
    const round = math.round(new FirestoreRulesLiteralInteger(123))
    expect(round).toBeInstanceOf(FirestoreRulesLiteralInteger)
    expect(round.render()).toEqual('math.round(123)')
  })
  test('sqrt', () => {
    const sqrt = math.sqrt(new FirestoreRulesLiteralInteger(123))
    expect(sqrt).toBeInstanceOf(FirestoreRulesLiteralFloat)
    expect(sqrt.render()).toEqual('math.sqrt(123)')
  })
})

describe('@firestore-rules/core/literal.ts FirestoreRulesGlobalTimestamp', () => {
  const timestamp = new FirestoreRulesGlobalTimestamp()
  test('render', () => {
    expect(timestamp).toBeInstanceOf(FirestoreRulesGlobalTimestamp)
    expect(timestamp.render()).toEqual('timestamp')
  })
  test('date', () => {
    const date = timestamp.date(
      new FirestoreRulesLiteralInteger(2021),
      new FirestoreRulesLiteralInteger(10),
      new FirestoreRulesLiteralInteger(3)
    )
    expect(date).toBeInstanceOf(FirestoreRulesLiteralTimestamp)
    expect(date.render()).toEqual('timestamp.date(2021, 10, 3)')
  })
  test('value', () => {
    const value = timestamp.value(new FirestoreRulesLiteralInteger(1617897479))
    expect(value).toBeInstanceOf(FirestoreRulesLiteralTimestamp)
    expect(value.render()).toEqual('timestamp.value(1617897479)')
  })
})

describe('@firestore-rules/core/literal.ts FirestoreRulesLiteralSet', () => {
  const set = new FirestoreRulesVariable('x')._as(FirestoreRulesLiteralSet)
  test('render', () => {
    expect(set).toBeInstanceOf(FirestoreRulesLiteralSet)
    expect(set.render()).toEqual('x')
  })
  test('difference', () => {
    const difference = set.difference(
      new FirestoreRulesVariable('y')._as(FirestoreRulesLiteralSet)
    )
    expect(difference).toBeInstanceOf(FirestoreRulesLiteralSet)
    expect(difference.render()).toEqual('x.difference(y)')
  })
  test('hasAll', () => {
    const hasAll = set.hasAll(
      new FirestoreRulesVariable('y')._as(FirestoreRulesLiteralSet)
    )
    expect(hasAll).toBeInstanceOf(FirestoreRulesLiteralBoolean)
    expect(hasAll.render()).toEqual('x.hasAll(y)')
  })
  test('hasAny', () => {
    const hasAny = set.hasAny(
      new FirestoreRulesVariable('y')._as(FirestoreRulesLiteralSet)
    )
    expect(hasAny).toBeInstanceOf(FirestoreRulesLiteralBoolean)
    expect(hasAny.render()).toEqual('x.hasAny(y)')
  })
  test('hasOnly', () => {
    const hasOnly = set.hasOnly(
      new FirestoreRulesVariable('y')._as(FirestoreRulesLiteralSet)
    )
    expect(hasOnly).toBeInstanceOf(FirestoreRulesLiteralBoolean)
    expect(hasOnly.render()).toEqual('x.hasOnly(y)')
  })
  test('intersection', () => {
    const intersection = set.intersection(
      new FirestoreRulesVariable('y')._as(FirestoreRulesLiteralSet)
    )
    expect(intersection).toBeInstanceOf(FirestoreRulesLiteralSet)
    expect(intersection.render()).toEqual('x.intersection(y)')
  })
  test('size', () => {
    const size = set.size()
    expect(size).toBeInstanceOf(FirestoreRulesLiteralInteger)
    expect(size.render()).toEqual('x.size()')
  })
  test('union', () => {
    const union = set.union(
      new FirestoreRulesVariable('y')._as(FirestoreRulesLiteralSet)
    )
    expect(union).toBeInstanceOf(FirestoreRulesLiteralSet)
    expect(union.render()).toEqual('x.union(y)')
  })
})

describe('@firestore-rules/core/literal.ts FirestoreRulesLiteralString', () => {
  const string = new FirestoreRulesVariable('x')._as(
    FirestoreRulesLiteralString
  )
  test('render', () => {
    expect(string).toBeInstanceOf(FirestoreRulesLiteralString)
    expect(string.render()).toEqual('x')
  })
  test('slice (start only)', () => {
    const slice = string.slice(1)
    expect(slice).toBeInstanceOf(FirestoreRulesLiteralString)
    expect(slice.render()).toEqual('x[1]')
  })
  test('slice (both start and end)', () => {
    const slice = string.slice(1, 3)
    expect(slice).toBeInstanceOf(FirestoreRulesLiteralString)
    expect(slice.render()).toEqual('x[1:3]')
  })
  test('lower', () => {
    const lower = string.lower()
    expect(lower).toBeInstanceOf(FirestoreRulesLiteralString)
    expect(lower.render()).toEqual('x.lower()')
  })
  test('matches', () => {
    const matches = string.matches(new FirestoreRulesLiteralString('regex'))
    expect(matches).toBeInstanceOf(FirestoreRulesLiteralString)
    expect(matches.render()).toEqual("x.matches('regex')")
  })
  test('replace', () => {
    const replace = string.replace(
      new FirestoreRulesLiteralString('regex'),
      new FirestoreRulesLiteralString('sub')
    )
    expect(replace).toBeInstanceOf(FirestoreRulesLiteralString)
    expect(replace.render()).toEqual("x.replace('regex', 'sub')")
  })
  test('size', () => {
    const size = string.size()
    expect(size).toBeInstanceOf(FirestoreRulesLiteralInteger)
    expect(size.render()).toEqual('x.size()')
  })
  test('split', () => {
    const split = string.split(new FirestoreRulesLiteralString(','))
    expect(split).toBeInstanceOf(FirestoreRulesLiteralList)
    expect(split.render()).toEqual("x.split(',')")
  })
  test('toUtf8', () => {
    // TODO: when bytes support
    // const toUtf8 = string.toUtf8()
    // expect(toUtf8).toBeInstanceOf(FirestoreRulesLiteralBytes)
    // expect(toUtf8.render()).toEqual('x.toUtf8()')
  })
  test('trim', () => {
    const trim = string.trim()
    expect(trim).toBeInstanceOf(FirestoreRulesLiteralString)
    expect(trim.render()).toEqual('x.trim()')
  })
  test('upper', () => {
    const upper = string.upper()
    expect(upper).toBeInstanceOf(FirestoreRulesLiteralString)
    expect(upper.render()).toEqual('x.upper()')
  })
})

describe('@firestore-rules/core/literal.ts FirestoreRulesLiteralTimestamp', () => {
  const timestamp = new FirestoreRulesVariable('x')._as(
    FirestoreRulesLiteralTimestamp
  )
  test('render', () => {
    expect(timestamp).toBeInstanceOf(FirestoreRulesLiteralTimestamp)
    expect(timestamp.render()).toEqual('x')
  })
  test('date', () => {
    const date = timestamp.date()
    expect(date).toBeInstanceOf(FirestoreRulesLiteralTimestamp)
    expect(date.render()).toEqual('x.date()')
  })
  test('day', () => {
    const day = timestamp.day()
    expect(day).toBeInstanceOf(FirestoreRulesLiteralInteger)
    expect(day.render()).toEqual('x.day()')
  })
  test('dayOfWeek', () => {
    const dayOfWeek = timestamp.dayOfWeek()
    expect(dayOfWeek).toBeInstanceOf(FirestoreRulesLiteralInteger)
    expect(dayOfWeek.render()).toEqual('x.dayOfWeek()')
  })
  test('dayOfYear', () => {
    const dayOfYear = timestamp.dayOfYear()
    expect(dayOfYear).toBeInstanceOf(FirestoreRulesLiteralInteger)
    expect(dayOfYear.render()).toEqual('x.dayOfYear()')
  })
  test('hours', () => {
    const hours = timestamp.hours()
    expect(hours).toBeInstanceOf(FirestoreRulesLiteralInteger)
    expect(hours.render()).toEqual('x.hours()')
  })
  test('minutes', () => {
    const minutes = timestamp.minutes()
    expect(minutes).toBeInstanceOf(FirestoreRulesLiteralInteger)
    expect(minutes.render()).toEqual('x.minutes()')
  })
  test('month', () => {
    const month = timestamp.month()
    expect(month).toBeInstanceOf(FirestoreRulesLiteralInteger)
    expect(month.render()).toEqual('x.month()')
  })
  test('nanos', () => {
    const nanos = timestamp.nanos()
    expect(nanos).toBeInstanceOf(FirestoreRulesLiteralInteger)
    expect(nanos.render()).toEqual('x.nanos()')
  })
  test('seconds', () => {
    const seconds = timestamp.seconds()
    expect(seconds).toBeInstanceOf(FirestoreRulesLiteralInteger)
    expect(seconds.render()).toEqual('x.seconds()')
  })
  test('time', () => {
    const time = timestamp.time()
    expect(time).toBeInstanceOf(FirestoreRulesLiteralDuration)
    expect(time.render()).toEqual('x.time()')
  })
  test('toMillis', () => {
    const toMillis = timestamp.toMillis()
    expect(toMillis).toBeInstanceOf(FirestoreRulesLiteralInteger)
    expect(toMillis.render()).toEqual('x.toMillis()')
  })
  test('year', () => {
    const year = timestamp.year()
    expect(year).toBeInstanceOf(FirestoreRulesLiteralInteger)
    expect(year.render()).toEqual('x.year()')
  })
})

describe('@firestore-rules/core/literal.ts FirestoreRulesGlobalContext', () => {
  const global = FirestoreRulesGlobalContext
  test('request', () => {
    expect(global).toHaveProperty('request')
    expect(global.request).toBeInstanceOf(FirestoreRulesLiteralRequest)
    expect(global.request.render()).toEqual('request')
  })
  test('resource', () => {
    expect(global).toHaveProperty('resource')
    expect(global.resource).toBeInstanceOf(FirestoreRulesLiteralResource)
    expect(global.resource.render()).toEqual('resource')
  })
  test('exists', () => {
    expect(global).toHaveProperty('exists')
    expect(global.exists).toBeInstanceOf(Function)
  })
  test('existsAfter', () => {
    expect(global).toHaveProperty('existsAfter')
    expect(global.existsAfter).toBeInstanceOf(Function)
  })
  test('get', () => {
    expect(global).toHaveProperty('get')
    expect(global.get).toBeInstanceOf(Function)
  })
  test('getAfter', () => {
    expect(global).toHaveProperty('getAfter')
    expect(global.getAfter).toBeInstanceOf(Function)
  })
  test('getAfter', () => {
    expect(global).toHaveProperty('getAfter')
    expect(global.getAfter).toBeInstanceOf(Function)
  })
  test('hashing', () => {
    expect(global).toHaveProperty('hashing')
    expect(global.hashing).toBeInstanceOf(FirestoreRulesGlobalHashing)
    expect(global.hashing.render()).toEqual('hashing')
  })
  test('latlng', () => {
    expect(global).toHaveProperty('latlng')
    expect(global.latlng).toBeInstanceOf(FirestoreRulesGlobalLatlng)
    expect(global.latlng.render()).toEqual('latlng')
  })
  test('math', () => {
    expect(global).toHaveProperty('math')
    expect(global.math).toBeInstanceOf(FirestoreRulesGlobalMath)
    expect(global.math.render()).toEqual('math')
  })
  test('timestamp', () => {
    expect(global).toHaveProperty('timestamp')
    expect(global.timestamp).toBeInstanceOf(FirestoreRulesGlobalTimestamp)
    expect(global.timestamp.render()).toEqual('timestamp')
  })
  test('duration', () => {
    expect(global).toHaveProperty('duration')
    expect(global.duration).toBeInstanceOf(FirestoreRulesGlobalDuration)
    expect(global.duration.render()).toEqual('duration')
  })
})
