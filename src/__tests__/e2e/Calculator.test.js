import { fireEvent, render } from '@testing-library/vue';
import faker from 'faker';
import Calculator from '../../components/Calculator.vue';
import store from '../../store';
import CalculatorPageObject from '../PageObjects/CalculatorPageObject';
import Utils from '../utils';

describe('calculator component', () => {
  beforeEach(() => {
    store.replaceState(Utils.getInitialStoreState());
  });

  describe('keyboard interaction', () => {
    describe('general operations', () => {
      it.each([
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '/', '*',
      ])('given button with %p label has been clicked then should show the same value on display', async (buttonLabel) => {
        expect.hasAssertions();

        const container = render(Calculator, { store });
        const { display } = new CalculatorPageObject(container);

        const button = container.queryByText(buttonLabel);

        await fireEvent.click(button);

        expect(display.inputDisplay).toBeVisible();
        expect(display.inputDisplay).toHaveValue(buttonLabel);
      });

      it('given some expression has been typed and clear button has been clicked then should show clear the text on display', async () => {
        expect.hasAssertions();

        const container = render(Calculator, { store });
        const { display, keyboard } = new CalculatorPageObject(container);

        await keyboard.typeRandomExpression();
        await keyboard.clickOnClearButton();

        expect(display.inputDisplay).toBeVisible();
        expect(display.inputDisplay).toHaveValue('');
      });

      it('given two numbers has been inserted with Sum operator between them then should show the correct result on Display', async () => {
        expect.hasAssertions();

        const firstNumber = faker.datatype.number();
        const secondNumber = faker.datatype.number();
        const expectedResult = String(firstNumber + secondNumber);

        const container = render(Calculator, { store });
        const { display, keyboard } = new CalculatorPageObject(container);

        await keyboard.type(firstNumber);
        await keyboard.clickOnSumButton();
        await keyboard.type(secondNumber);
        await keyboard.clickOnEqualButton();

        expect(display.inputDisplay).toBeVisible();
        expect(display.inputDisplay).toHaveValue(expectedResult);
      });

      it('given two numbers has been inserted with Subtract operator between them then should show the correct result on Display', async () => {
        expect.hasAssertions();

        const firstNumber = faker.datatype.number();
        const secondNumber = faker.datatype.number();
        const expectedResult = String(firstNumber - secondNumber);

        const container = render(Calculator, { store });
        const { display, keyboard } = new CalculatorPageObject(container);

        await keyboard.type(firstNumber);
        await keyboard.clickOnSubtractButton();
        await keyboard.type(secondNumber);
        await keyboard.clickOnEqualButton();

        expect(display.inputDisplay).toBeVisible();
        expect(display.inputDisplay).toHaveValue(expectedResult);
      });

      it('given two numbers has been inserted with Multiply operator between them then should show the correct result on Display', async () => {
        expect.hasAssertions();

        const firstNumber = faker.datatype.number();
        const secondNumber = faker.datatype.number();
        const expectedResult = String(firstNumber * secondNumber);

        const container = render(Calculator, { store });
        const { display, keyboard } = new CalculatorPageObject(container);

        await keyboard.type(firstNumber);
        await keyboard.clickOnMultiplyButton();
        await keyboard.type(secondNumber);
        await keyboard.clickOnEqualButton();

        expect(display.inputDisplay).toBeVisible();
        expect(display.inputDisplay).toHaveValue(expectedResult);
      });

      it('given two numbers has been inserted with Divider operator between them then should show the correct result on Display', async () => {
        expect.hasAssertions();

        const firstNumber = faker.datatype.number();
        const secondNumber = faker.datatype.number();
        const expectedResult = String(firstNumber / secondNumber);

        const container = render(Calculator, { store });
        const { display, keyboard } = new CalculatorPageObject(container);

        await keyboard.type(firstNumber);
        await keyboard.clickOnDivideButton();
        await keyboard.type(secondNumber);
        await keyboard.clickOnEqualButton();

        expect(display.inputDisplay).toBeVisible();
        expect(display.inputDisplay).toHaveValue(expectedResult);
      });

      it('given two numbers has been inserted with Divider operator between them then should show the correct result on Display', async () => {
        expect.hasAssertions();

        const firstNumber = faker.datatype.number();
        const secondNumber = faker.datatype.number();
        const expectedResult = String(firstNumber / secondNumber);

        const container = render(Calculator, { store });
        const { display, keyboard } = new CalculatorPageObject(container);

        await keyboard.type(firstNumber);
        await keyboard.clickOnDivideButton();
        await keyboard.type(secondNumber);
        await keyboard.clickOnEqualButton();

        expect(display.inputDisplay).toBeVisible();
        expect(display.inputDisplay).toHaveValue(expectedResult);
      });

      it('given some expression has been typed but Equal button has not been clicked then should not show History button', async () => {
        expect.hasAssertions();

        const container = render(Calculator, { store });
        const { history, keyboard } = new CalculatorPageObject(container);

        await keyboard.typeRandomExpression();

        expect(history.getHistoryContainer()).toBeNull();
      });

      it('given some expression has been calculated then this expression should show showHistoryButton', async () => {
        expect.hasAssertions();

        const container = render(Calculator, { store });
        const { history, keyboard } = new CalculatorPageObject(container);

        await keyboard.typeRandomExpression();
        await keyboard.clickOnEqualButton();

        expect(history.getHistoryContainer()).toBeVisible();
        expect(history.getHideHistoryButton()).toBeNull();
        expect(history.getShowHistoryButton()).toBeVisible();
      });

      it('given some expression has been calculated then this expression should show on History and show hideHistoryButton', async () => {
        expect.hasAssertions();

        const container = render(Calculator, { store });
        const { history, keyboard } = new CalculatorPageObject(container);

        const expression = Utils.getRandomExpression();

        await keyboard.type(expression);
        await keyboard.clickOnEqualButton();
        await history.clickOnShowHistoryButton();

        const historyElement = container.queryByText(expression);

        expect(history.getHistoryContainer()).toBeVisible();
        expect(history.getHideHistoryButton()).toBeVisible();
        expect(history.getShowHistoryButton()).toBeNull();
        expect(historyElement).toBeVisible();
      });
    });

    describe('percentage operators', () => {
      it('given percentage button has been clicked after a non-number character then should have display "0" before percentage operator', async () => {
        expect.hasAssertions();

        const container = render(Calculator, { store });
        const { display, keyboard } = new CalculatorPageObject(container);

        await keyboard.clickOnPercentageButton();

        expect(display.inputDisplay).toHaveValue('0%');
      });

      it('given percentage button has been clicked after a number then should not add "0" before percentage operator', async () => {
        expect.hasAssertions();

        const container = render(Calculator, { store });
        const { display, keyboard } = new CalculatorPageObject(container);
        const number = faker.datatype.number();

        await keyboard.type(number);
        await keyboard.clickOnPercentageButton();

        const expectedDisplayValue = `${number}%`;

        expect(display.inputDisplay).toHaveValue(expectedDisplayValue);
      });

      it('given only percentage and after equal buttons has been clicked then should display "0" as result', async () => {
        expect.hasAssertions();

        const container = render(Calculator, { store });
        const { display, keyboard } = new CalculatorPageObject(container);

        await keyboard.clickOnPercentageButton();
        await keyboard.clickOnEqualButton();

        expect(display.inputDisplay).toHaveValue('0');
      });

      it('given a number has been inserted and after percentage and equal buttons has been clicked then should display the number in percent as result', async () => {
        expect.hasAssertions();

        const container = render(Calculator, { store });
        const { display, keyboard } = new CalculatorPageObject(container);

        const number = faker.datatype.number();

        await keyboard.type(number);
        await keyboard.clickOnPercentageButton();
        await keyboard.clickOnEqualButton();

        const expectedDisplayValue = String(number / 100);

        expect(display.inputDisplay).toHaveValue(expectedDisplayValue);
      });

      it.each([
        ['100+1%', '101'],
        ['50-50%', '25'],
        ['23/100%', '1'],
        ['20*10%', '40'],
        ['35+%', '35'],
        ['35-%', '35'],
        ['35*%', '0'],
        ['10%-100', '-99.9'],
        ['100-6.5%', '93.5'],
        ['100.5-10.5%', '89.9475'],
        ['100.5-0.5%', '99.9975'],
      ])('given a %p expression has been inserted with percentage and equal buttons has been clicked then should display the %p as result', async (expression, expectedDisplayValue) => {
        expect.hasAssertions();

        const container = render(Calculator, { store });
        const { display, keyboard } = new CalculatorPageObject(container);

        await keyboard.type(expression);
        await keyboard.clickOnEqualButton();

        expect(display.inputDisplay).toHaveValue(expectedDisplayValue);
      });
    });
  });

  describe('display interaction', () => {
    it('given some expression has been calculated then this expression should show showHistoryButton', async () => {
      expect.hasAssertions();

      const container = render(Calculator, { store });
      const { history, display } = new CalculatorPageObject(container);

      await display.typeRandomExpressionOnInputDisplay();
      await display.pressEnterOnInputDisplay();

      expect(history.getHistoryContainer()).toBeVisible();
      expect(history.getHideHistoryButton()).toBeNull();
      expect(history.getShowHistoryButton()).toBeVisible();
    });

    it('given some expression has been calculated then this expression should show on History and show hideHistoryButton', async () => {
      expect.hasAssertions();

      const container = render(Calculator, { store });
      const { history, display } = new CalculatorPageObject(container);

      const expression = Utils.getRandomExpression();

      await display.type(expression);
      await display.pressEnterOnInputDisplay();
      await history.clickOnShowHistoryButton();

      const historyElement = container.queryByText(expression);

      expect(history.getHistoryContainer()).toBeVisible();
      expect(history.getHideHistoryButton()).toBeVisible();
      expect(history.getShowHistoryButton()).toBeNull();
      expect(historyElement).toBeVisible();
    });
  });

  describe('history interaction', () => {
    it('given some expression has been calculated and Expression in history has been clicked then should update Display value with expression', async () => {
      expect.hasAssertions();

      const container = render(Calculator, { store });
      const { history, display } = new CalculatorPageObject(container);

      const expression = Utils.getRandomExpression();

      await display.type(expression);
      await display.pressEnterOnInputDisplay();
      await history.clickOnShowHistoryButton();

      const historyExpressionElement = container.queryByText(expression);

      await fireEvent.click(historyExpressionElement);

      expect(history.getHistoryContainer()).toBeVisible();
      expect(historyExpressionElement).toBeVisible();
      expect(display.inputDisplay).toHaveValue(expression);
    });

    it('given some expression has been calculated and Result in history has been clicked then should update Display value with expression', async () => {
      expect.hasAssertions();

      const container = render(Calculator, { store });
      const { history, display } = new CalculatorPageObject(container);

      await display.typeRandomExpressionOnInputDisplay();
      await display.pressEnterOnInputDisplay();
      await history.clickOnShowHistoryButton();

      const expressionResult = store.state.currentInput;
      const historyResultExpressionElement = container.queryByText(expressionResult);

      await display.typeRandomExpressionOnInputDisplay();
      await fireEvent.click(historyResultExpressionElement);

      expect(history.getHistoryContainer()).toBeVisible();
      expect(historyResultExpressionElement).toBeVisible();
      expect(display.inputDisplay).toHaveValue(expressionResult);
    });
  });
});
