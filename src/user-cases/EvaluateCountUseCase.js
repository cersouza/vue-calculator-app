import { evaluate } from 'mathjs';

export default class EvaluateCountUseCase {
  static execute(req) {
    const expression = EvaluateCountUseCase.prepareExpressionToEvaluate(req.data);
    return evaluate(expression);
  }

  static prepareExpressionToEvaluate(data) {
    let expressionPrepared = EvaluateCountUseCase.removeblankSpaces(data);
    expressionPrepared = EvaluateCountUseCase.replaceIfFirstElementIsPercent(expressionPrepared);
    expressionPrepared = EvaluateCountUseCase.replacePercentExpressions(expressionPrepared);
    return expressionPrepared;
  }

  static removeBlankSpaces(data) {
    return data.replace(/\s/g, '');
  }

  static replaceIfFirstElementIsPercent(data) {
    const firstElementIsPercent = /^(\d+\.)?\d*%/;
    return firstElementIsPercent.test(data) ? data.replace('%', '/ 100') : data;
  }

  static replacePercentExpressions(data) {
    let result = data;
    const expressionWithPercentageOperator = /(\d+\.)?\d+(?=\D(\d+\.)?\d+%)/;

    if (expressionWithPercentageOperator.test(result)) {
      const numberToGetPercentage = expressionWithPercentageOperator.exec(result)[0];
      const percentageNumberBase = /(\d+\.)?\d*(?=%)/.exec(result)[0];
      result = result.replace(/(\d+\.)?\d+%/, `(${percentageNumberBase / 100} * ${numberToGetPercentage})`);
    }

    return result;
  }
}
