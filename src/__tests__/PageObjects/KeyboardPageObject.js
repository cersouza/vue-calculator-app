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
    this.percentageButton = container.queryByText('%');
  }

  async type(expression) {
    const charactersList = String(expression).split('');

    const promises = charactersList.map((character) => {
      const button = this.container.queryByText(character);
      return PageObjectBase.clickOnButtonAndWaitDomUpdate(button);
    });

    return Promise.all(promises);
  }

  async typeRandomExpression(operator = '') {
    const expression = Utils.getRandomExpression(operator);
    return this.type(expression);
  }

  async clickOnEqualButton() {
    return PageObjectBase.clickOnButtonAndWaitDomUpdate(this.equalButton);
  }

  async clickOnClearButton() {
    return PageObjectBase.clickOnButtonAndWaitDomUpdate(this.clearButton);
  }

  async clickOnSumButton() {
    return PageObjectBase.clickOnButtonAndWaitDomUpdate(this.sumButton);
  }

  async clickOnSubtractButton() {
    return PageObjectBase.clickOnButtonAndWaitDomUpdate(this.subtractButton);
  }

  async clickOnMultiplyButton() {
    return PageObjectBase.clickOnButtonAndWaitDomUpdate(this.multiplyButton);
  }

  async clickOnDivideButton() {
    return PageObjectBase.clickOnButtonAndWaitDomUpdate(this.dividerButton);
  }

  async clickOnPercentageButton() {
    return PageObjectBase.clickOnButtonAndWaitDomUpdate(this.percentageButton);
  }
}
