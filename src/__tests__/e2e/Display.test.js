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
});
