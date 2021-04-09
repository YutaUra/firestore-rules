import { AbstructFirestoreRulesStatement, IFirestoreRulesElement } from './base'
import { FirestoreRulesHelperFunctionArguments } from './functions'
import {
  FirestoreRulesGlobalContext,
  FirestoreRulesGlobalContextType,
  FirestoreRulesLiteralBoolean,
} from './literal'

export class FirestoreRulesStatementsComment extends AbstructFirestoreRulesStatement {
  constructor(readonly comment: string) {
    super()
  }
  render() {
    return this.comment
      .split(/\n/g)
      .map((v) => `// ${v}`)
      .join('\n')
  }
}

export type FirestoreRulesAllowMethod =
  | ('read' | 'write')[]
  | ('get' | 'list' | 'write')[]
  | ('read' | 'create' | 'update' | 'delete')[]
  | ('get' | 'list' | 'create' | 'update' | 'delete')[]

export class FirestoreRulesStatementsAllow extends AbstructFirestoreRulesStatement {
  constructor(
    readonly methods: FirestoreRulesAllowMethod,
    readonly condition: FirestoreRulesLiteralBoolean
  ) {
    super()
  }
  render() {
    return `allow ${this.methods.join(', ')}: if ${this.condition.render()};`
  }
}

export class FirestoreRulesStatementsMatch extends AbstructFirestoreRulesStatement {
  readonly arg: FirestoreRulesHelperFunctionArguments
  readonly res: IFirestoreRulesElement[]
  constructor(
    readonly path: string,
    readonly statementsBuilder:
      | ((context: {
          global: FirestoreRulesGlobalContextType
          arg: FirestoreRulesHelperFunctionArguments
        }) => IFirestoreRulesElement[])
      | IFirestoreRulesElement[]
  ) {
    super()
    this.arg = new FirestoreRulesHelperFunctionArguments()
    if (Array.isArray(statementsBuilder)) {
      this.res = statementsBuilder
    } else {
      this.res = statementsBuilder({
        arg: this.arg,
        global: FirestoreRulesGlobalContext,
      })
    }
  }
  render(): string {
    return `match ${this.path} {
${this.res.map((v) => v.render()).join('\n')}
}`
  }
}

export class FirestoreRulesVersionStatements extends AbstructFirestoreRulesStatement {
  constructor(readonly version: 2) {
    super()
  }
  render() {
    return `rules_version = "${this.version}";`
  }
}

export class FirestoreRulesServiceStatement extends AbstructFirestoreRulesStatement {
  constructor(readonly statement: AbstructFirestoreRulesStatement) {
    super()
  }
  render() {
    return `service cloud.firestore {
${this.statement.render()}
}`
  }
}

export class FirestoreRulesStatements extends AbstructFirestoreRulesStatement {
  constructor(readonly statements: AbstructFirestoreRulesStatement[]) {
    super()
  }
  render() {
    return this.statements.map((v) => v.render()).join('\n')
  }
}
