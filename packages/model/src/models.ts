import {
  base,
  FirestoreRulesGlobalContext,
  FirestoreRulesGlobalContextType,
  func,
  stmt,
  Type,
} from '@firestore-rules/core'
import {
  FirestoreRulesExpression,
  FirestoreRulesVariable,
  IFirestoreRulesElement,
} from '@firestore-rules/core/lib/base'
import '@firestore-rules/core/lib/functions'
import { FirestoreRulesLiteralString } from '@firestore-rules/core/lib/literal'

type NullOrBoolean = Type['Boolean'] | null

export type IFirestoreRulesModelConstructor = {
  new (): IFirestoreRulesModel
}

export interface IFirestoreRulesModel extends base.IFirestoreRulesElement {
  readonly path: string
  readonly variables: Record<string, Type['String']>

  get(): NullOrBoolean
  list(): NullOrBoolean
  create(): NullOrBoolean
  update(): NullOrBoolean
  delete(): NullOrBoolean
}

export class FirestoreRulesModel
  implements IFirestoreRulesModel, IFirestoreRulesElement {
  get path(): string {
    throw Error('Not implimented')
  }
  readonly variables: Record<string, Type['String']> = {}
  protected readonly ctx: FirestoreRulesGlobalContextType = FirestoreRulesGlobalContext
  protected readonly _args = new Map<string, string[]>()
  protected readonly _defined = new Map<string, boolean>()
  protected readonly _models: IFirestoreRulesModel[] = []

  constructor() {
    if (!this.path) {
      throw Error('you should provide path attribute.')
    }
    if (!this.path.startsWith('/')) {
      throw Error(`${this.path} is not start with '/'`)
    }
    const variableNames = Array.from(
      this.path.matchAll(/{([a-zA-Z][a-zA-Z0-9]*)}/g)
    ).map((v) => v[1])
    this.variables = Object.fromEntries(
      variableNames.map((name) => [
        name,
        new FirestoreRulesVariable(name)._as(FirestoreRulesLiteralString),
      ])
    )
  }

  defineFunc<T extends FirestoreRulesExpression>(ret: T) {
    const callerFrom =
      new Error().stack?.split?.('\n')?.[2]?.trim?.()?.split?.(' ')?.[2] || ''
    this._defined.set(callerFrom, true)
    const values = this._args.get(callerFrom) || []
    return func.funcDef(
      ({ args }) => {
        values.forEach((value) => {
          args.create(value)
        })
        return ret
      },
      { name: callerFrom }
    )
  }

  args(name: string) {
    const callerFrom =
      new Error().stack?.split?.('\n')?.[2]?.trim?.()?.split?.(' ')?.[2] || ''
    if (this._args.get(callerFrom) || false) {
      return new base.FirestoreRulesVariable(name)
    }
    this._args.set(callerFrom, [...(this._args.get(callerFrom) || []), name])
    return new base.FirestoreRulesVariable(name)
  }

  defineModel(cls: IFirestoreRulesModelConstructor) {
    this._models.push(new cls())
  }

  render() {
    const matchStmt = new stmt.FirestoreRulesStatementsMatch(this.path, () => {
      const funcNames = Object.entries(
        Object.getOwnPropertyDescriptors(this.constructor.prototype)
      )
        .filter(([_, descriptor]) => !!descriptor.get)
        .filter(
          ([name, _]) =>
            !Object.getOwnPropertyNames(FirestoreRulesModel).includes(name)
        )
        .map(([name]) => name as keyof this & string)
      const get = this.get()
      const list = this.list()
      const create = this.create()
      const update = this.update()
      const delete_ = this.delete()
      const stmts: base.IFirestoreRulesElement[] = []

      funcNames.forEach((name) => {
        const a = this[name]
        if (a instanceof func.FirestoreRulesDefineFunctionStatement) {
          stmts.push(a)
        }
      })
      get && stmts.push(new stmt.FirestoreRulesStatementsAllow(['get'], get))
      list && stmts.push(new stmt.FirestoreRulesStatementsAllow(['list'], list))
      create &&
        stmts.push(new stmt.FirestoreRulesStatementsAllow(['create'], create))
      update &&
        stmts.push(new stmt.FirestoreRulesStatementsAllow(['update'], update))
      delete_ &&
        stmts.push(new stmt.FirestoreRulesStatementsAllow(['delete'], delete_))
      this._models.forEach((model) => {
        stmts.push(model)
      })
      return stmts
    })
    return matchStmt.render()
  }

  get(): NullOrBoolean {
    return null
  }
  list(): NullOrBoolean {
    return null
  }
  create(): NullOrBoolean {
    return null
  }
  update(): NullOrBoolean {
    return null
  }
  delete(): NullOrBoolean {
    return null
  }
}
