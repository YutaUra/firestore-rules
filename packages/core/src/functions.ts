import {
  AbstructFirestoreRulesStatement,
  FirestoreRulesExpression,
  FirestoreRulesFunctionCall,
  FirestoreRulesVariable,
  IFirestoreRulesElement,
  IFirestoreRulesElementConstructor,
} from './base'
import {
  FirestoreRulesGlobalContext,
  FirestoreRulesGlobalContextType,
  FirestoreRulesLiteralBoolean,
  FirestoreRulesLiteralFloat,
  FirestoreRulesLiteralInteger,
  FirestoreRulesLiteralNull,
  FirestoreRulesLiteralPath,
  FirestoreRulesLiteralString,
} from './literal'

export const bool = (value: FirestoreRulesLiteralString) => {
  return new FirestoreRulesFunctionCall('bool', [value])._as(
    FirestoreRulesLiteralBoolean
  )
}

export const int = (
  value: FirestoreRulesLiteralString | FirestoreRulesLiteralFloat
) => {
  return new FirestoreRulesFunctionCall('int', [value])._as(
    FirestoreRulesLiteralInteger
  )
}

export const float = (
  value: FirestoreRulesLiteralString | FirestoreRulesLiteralInteger
) => {
  return new FirestoreRulesFunctionCall('float', [value])._as(
    FirestoreRulesLiteralFloat
  )
}

export const string = (
  value:
    | FirestoreRulesLiteralBoolean
    | FirestoreRulesLiteralInteger
    | FirestoreRulesLiteralFloat
    | FirestoreRulesLiteralNull
) => {
  return new FirestoreRulesFunctionCall('string', [value])._as(
    FirestoreRulesLiteralString
  )
}

export const path = (value: FirestoreRulesLiteralString) => {
  return new FirestoreRulesFunctionCall('path', [value])._as(
    FirestoreRulesLiteralPath
  )
}

export class FirestoreRulesDefineFunctionStatement<
  T extends FirestoreRulesExpression = any
> extends AbstructFirestoreRulesStatement {
  constructor(
    readonly name: string,
    readonly args: string[],
    readonly expr: T
  ) {
    super()
  }
  render() {
    return `function ${this.name}(${this.args.join(', ')}) {
    return ${this.expr.render()};
}`
  }

  call(args: IFirestoreRulesElement[]) {
    if (this.args.length !== args.length) {
      throw Error(
        `argument length not match. expectd ${this.args.length} but got ${
          args.length
        }. parameter: [${this.args.join(', ')}], inputs: [${args
          .map((v) => v.render())
          .join(', ')}]`
      )
    }
    const cls = this.expr.constructor as IFirestoreRulesElementConstructor<T>
    return new FirestoreRulesFunctionCall(this.name, args)._as(cls)
  }
}

export class FirestoreRulesHelperFunctionArguments {
  readonly args: string[]
  constructor() {
    this.args = []
  }
  create(name: string) {
    this.args.push(name)
    return new FirestoreRulesVariable(name)
  }
}

export type FirestoreRulesCustomFunctionContext<
  T extends FirestoreRulesExpression
> = (context: {
  globals: FirestoreRulesGlobalContextType
  args: FirestoreRulesHelperFunctionArguments
}) => T

export const funcDef = <T extends FirestoreRulesExpression>(
  callback: FirestoreRulesCustomFunctionContext<T>,
  option: { name: string }
) => {
  const args = new FirestoreRulesHelperFunctionArguments()
  const res = callback({
    globals: FirestoreRulesGlobalContext,
    args,
  })
  return new FirestoreRulesDefineFunctionStatement(option.name, args.args, res)
}
