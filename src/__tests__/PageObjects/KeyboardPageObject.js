import Utils from '../utils';
import PageObjectBase from './PageObjectBase';

export default class KeyboardPageObject extends PageObjectBase {
  constructor(container) {
    super();

    this.container = container;

    this.equalButton = container.queryByText('=');
    this.sumButton = container.queryByText('+');
    this.subtractButton = container.queryByText('-');
    this.multiplyButton = container.queryByText('*');
    this.dividerButton = container.queryByText('/');
    this.clearButton = container.queryByText('C');
    this.decimalDotButton = container.queryByText('.');
  }

  async type(expression) {
    const charactersList = String(expression).split('');

    const promises = charactersList.map((character) => {
      let button = this.container.queryByText(character);
      return this.clickOnButtonAndWaitDomUpdate(button);
    });

    return Promise.all(promises);
  }

  async typeRandomExpression(operator = '') {
    const expression = Utils.getRandomExpression();
    return this.type(expression);
  }

  async clickOnEqualButton() {
    return this.clickOnButtonAndWaitDomUpdate(this.equalButton);
  }

  async clickOnClearButton() {
    return this.clickOnButtonAndWaitDomUpdate(this.clearButton);
  }

  async clickOnSumButton() {
    return this.clickOnButtonAndWaitDomUpdate(this.sumButton);
  }

  async clickOnSubtractButton() {
    return this.clickOnButtonAndWaitDomUpdate(this.subtractButton);
  }

  async clickOnMultiplyButton() {
    return this.clickOnButtonAndWaitDomUpdate(this.multiplyButton);
  }

  async clickOnDivideButton() {
    return this.clickOnButtonAndWaitDomUpdate(this.dividerButton);
  }
}
