import { fireEvent } from '@testing-library/vue';
import Utils from '../utils';
import PageObjectBase from './PageObjectBase';

export default class DisplayPageObject extends PageObjectBase {
  constructor(container) {
    super();

    this.inputDisplay = container.queryByTestId('input-display');
  }

  async type(expression) {
    await fireEvent.update(this.inputDisplay, expression);
  }

  async typeRandomExpressionOnInputDisplay() {
    const expression = Utils.getRandomExpression();
    await this.type(expression);
  }

  async pressEnterOnInputDisplay() {
    await PageObjectBase.pressEnterOn(this.inputDisplay);
  }
}
