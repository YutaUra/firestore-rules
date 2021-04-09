import {
  FirestoreRulesExpression,
  FirestoreRulesOperator,
  IFirestoreRulesElement,
} from './base'

export class FirestoreRulesCondition extends FirestoreRulesExpression {
  constructor(
    left: IFirestoreRulesElement,
    right: IFirestoreRulesElement,
    operator: FirestoreRulesOperator
  ) {
    super({
      render: () => `(${left.render()} ${operator} ${right.render()})`,
    })
  }

  static polymer(
    operator: FirestoreRulesOperator,
    ...values: [
      IFirestoreRulesElement,
      IFirestoreRulesElement,
      ...IFirestoreRulesElement[]
    ]
  ) {
    return new FirestoreRulesExpression({
      render: () => `(${values.map((v) => v.render()).join(` ${operator} `)})`,
    })
  }

  static custom(...values: (string | IFirestoreRulesElement)[]) {
    return new FirestoreRulesExpression({
      render: () =>
        `(${values
          .map((v) => (v instanceof FirestoreRulesExpression ? v.render() : v))
          .join('')})`,
    })
  }
}
