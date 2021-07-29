import CalculationsHistoryPageObject from './CalculationsHistoryPageObject';
import DisplayPageObject from './DisplayPageObject';
import KeyboardPageObject from './KeyboardPageObject';

export default class CalculatorPageObject {
  constructor(container) {
    this.display = new DisplayPageObject(container);
    this.keyboard = new KeyboardPageObject(container);
    this.history = new CalculationsHistoryPageObject(container);
  }
}
