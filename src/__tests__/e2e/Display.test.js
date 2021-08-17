import { render } from '@testing-library/vue';
import Calculator from '../../components/Calculator.vue';
import store from '../../store';
import CalculatorPageObject from '../PageObjects/CalculatorPageObject';
import Utils from '../utils';

const updateCurrentInputMock = jest.fn();

store.subscribe((mutation) => {
  if (mutation.type === 'updateCurrentInput') {
    updateCurrentInputMock(mutation.payload);
  }
});

describe('display component', () => {
  beforeEach(() => {
    store.replaceState(Utils.getInitialStoreState());
  });

  describe('nothing has been typed', () => {
    it('given nothing has been typed and Enter has been pressed on Display then should do not update currentInput', async () => {
      expect.hasAssertions();

      const container = render(Calculator, { store });
      const { history, display } = new CalculatorPageObject(container);

      await display.pressEnterOnInputDisplay();

      expect(history.getHistoryContainer()).toBeNull();
      expect(updateCurrentInputMock).not.toHaveBeenCalled();
    });

    it('given nothing has been typed and Equal Signer has been clicked then should do not update currentInput', async () => {
      expect.hasAssertions();

      const container = render(Calculator, { store });
      const { history, keyboard } = new CalculatorPageObject(container);

      await keyboard.clickOnEqualButton();

      expect(history.getHistoryContainer()).toBeNull();
      expect(updateCurrentInputMock).not.toHaveBeenCalled();
    });
  });

  describe('percentage operator', () => {
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
      const { display } = new CalculatorPageObject(container);

      await display.type(expression);
      await display.pressEnterOnInputDisplay();

      expect(display.inputDisplay).toHaveValue(expectedDisplayValue);
    });

    it.each([
      ['100 + 10', '110'],
      ['50 - 25', '25'],
      ['23 / 100', '0.23'],
      ['20 * 10', '200'],
      ['35 + %', '35'],
      ['35 - %', '35'],
      ['35 * %', '0'],
      ['10% - 100', '-99.9'],
      ['100 - 6.5%', '93.5'],
      ['100.5 - 10.5%', '89.9475'],
      ['100.5 - 0.5%', '99.9975'],
    ])('given a %p expression with blanc spaces has been inserted and enter button has been clicked then should display the %p as result', async (expression, expectedDisplayValue) => {
      expect.hasAssertions();

      const container = render(Calculator, { store });
      const { display } = new CalculatorPageObject(container);

      await display.type(expression);
      await display.pressEnterOnInputDisplay();

      expect(display.inputDisplay).toHaveValue(expectedDisplayValue);
    });
  });
});
