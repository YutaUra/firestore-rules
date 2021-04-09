export interface IFirestoreRulesElement {
  render(): string
}

export interface IFirestoreRulesElementConstructor<
  T extends IFirestoreRulesElement
> {
  new (value: IFirestoreRulesElement | any, ...rest: any): T
}

export class AbstructFirestoreRulesElement implements IFirestoreRulesElement {
  render(): string {
    throw Error('You should impliment render function')
  }
}

export class AbstructFirestoreRulesStatement extends AbstructFirestoreRulesElement {
  render(): string {
    throw Error('You should impliment render function')
  }
}

export class FirestoreRulesExpression extends AbstructFirestoreRulesElement {
  constructor(readonly _value: IFirestoreRulesElement) {
    super()
  }

  render(): string {
    return this._value.render()
  }

  _as<T extends FirestoreRulesExpression>(
    cls: IFirestoreRulesElementConstructor<T>
  ): T {
    return new cls(this)
  }
  protected _dot(
    value: string | FirestoreRulesFunctionCall
  ): FirestoreRulesExpressionChain {
    return new FirestoreRulesExpressionChain(this, 'dot', value)
  }
  protected _callMethod(
    name: string,
    args: IFirestoreRulesElement[]
  ): FirestoreRulesExpressionChain {
    return this._dot(new FirestoreRulesFunctionCall(name, args))
  }
  protected _slice(
    value: IFirestoreRulesElement
  ): FirestoreRulesExpressionChain {
    return new FirestoreRulesExpressionChain(this, 'slice', value)
  }
  protected _range(
    from: IFirestoreRulesElement,
    to: IFirestoreRulesElement
  ): FirestoreRulesExpressionChain {
    return new FirestoreRulesExpressionChain(this, 'range', [from, to])
  }
}

export class FirestoreRulesExpressionChain extends FirestoreRulesExpression {
  _meta:
    | {
        type: 'dot'
        value: IFirestoreRulesElement
        index: string | FirestoreRulesFunctionCall
      }
    | {
        type: 'slice'
        value: IFirestoreRulesElement
        index: IFirestoreRulesElement
      }
    | {
        type: 'range'
        value: IFirestoreRulesElement
        index: [IFirestoreRulesElement, IFirestoreRulesElement]
      }
  constructor(
    value: IFirestoreRulesElement,
    type: 'dot',
    index: string | FirestoreRulesFunctionCall
  )
  constructor(
    value: IFirestoreRulesElement,
    type: 'slice',
    index: IFirestoreRulesElement
  )
  constructor(
    value: IFirestoreRulesElement,
    type: 'range',
    index: [IFirestoreRulesElement, IFirestoreRulesElement]
  )
  constructor(
    value: IFirestoreRulesElement,
    type: 'dot' | 'slice' | 'range',
    index:
      | IFirestoreRulesElement
      | [IFirestoreRulesElement, IFirestoreRulesElement]
      | string
      | FirestoreRulesFunctionCall
  ) {
    if (type === 'dot') {
      if (
        typeof index === 'string' ||
        index instanceof FirestoreRulesFunctionCall
      ) {
        super(value)
        this._meta = { type, value, index }
      } else {
        throw Error(
          `Chain dot with not string or two index is not allowed. got ${typeof value}`
        )
      }
    } else if (type === 'slice') {
      if (index instanceof FirestoreRulesExpression && !Array.isArray(index)) {
        super(value)
        this._meta = { type, value, index }
      } else {
        throw Error(
          `Chain slice, range with not FirestoreRulesExpression or two index is not allowed. got ${typeof value}`
        )
      }
    } else {
      if (
        value instanceof FirestoreRulesExpression &&
        Array.isArray(index) &&
        index.length === 2
      ) {
        super(value)
        this._meta = { type, value, index }
      } else {
        throw Error(
          `Chain slice, range with not FirestoreRulesExpression or one index is not allowed. got ${typeof value}`
        )
      }
    }
  }

  render() {
    if (this._meta.type === 'dot') {
      if (typeof this._meta.index === 'string') {
        return `${this._value.render()}.${this._meta.index}`
      } else {
        return `${this._value.render()}.${this._meta.index.render()}`
      }
    }
    if (this._meta.type === 'slice') {
      return `${this._value.render()}[${this._meta.index.render()}]`
    }
    if (this._meta.type === 'range') {
      return `${this._value.render()}[${this._meta.index[0].render()}:${this._meta.index[1].render()}]`
    }
    // this error will not throw. but for typescript compiler.
    throw Error(`chain type not match. ${this._meta}`)
  }
}

export class FirestoreRulesVariable extends FirestoreRulesExpression {
  constructor(name: string | FirestoreRulesExpression) {
    super(
      name instanceof FirestoreRulesExpression
        ? name
        : {
            render: () => name,
          }
    )
  }
}

export class FirestoreRulesFunctionCall extends FirestoreRulesExpression {
  constructor(readonly name: string, readonly args: IFirestoreRulesElement[]) {
    super({
      render: () =>
        `${this.name}(${this.args.map((v) => v.render()).join(', ')})`,
    })
  }
}

export const operator = {
  AND: '&&',
  OR: '||',
  NOT: '!',
  EQ: '==',
  NE: '!=',
  GT: '>',
  LT: '<',
  GTE: '>=',
  LTE: '<=',
  IN: 'in',
  IS: 'is',
  PLUS: '+',
  MINUS: '-',
  DIV: '/',
  MULTI: '*',
  MOD: '%',
  NEG: '-',
} as const
export type FirestoreRulesOperator = typeof operator[keyof typeof operator]
