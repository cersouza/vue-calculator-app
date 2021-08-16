import faker from 'faker';

export default class Utils {
  static getRandomOperator() {
    return faker.random.arrayElement(['+', '-', '*', '/']);
  }

  static getRandomExpression(operator = '') {
    const expression = [];
    const quantityOfElements = faker.datatype.number({ min: 2, max: 10 });

    for (let i = 0; i <= quantityOfElements; i += 1) {
      expression.push(faker.datatype.number());
      if (i !== quantityOfElements) {
        expression.push(operator || this.getRandomOperator());
      }
    }

    return expression.join('');
  }

  static getInitialStoreState() {
    return {
      calculationsHistory: [],
      currentInput: '',
    };
  }
}
