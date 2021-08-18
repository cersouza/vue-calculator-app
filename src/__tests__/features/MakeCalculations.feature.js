import { render } from '@testing-library/vue';
import { defineFeature, loadFeature } from 'jest-cucumber';
import store from '../../store';
import CalculatorPageObject from '../PageObjects/CalculatorPageObject';
import Calculator from '../../components/Calculator.vue';
import Utils from '../utils';

const feature = loadFeature('features/MakeCalculations.feature');

defineFeature(feature, (test) => {
  let container;
  let calculator;

  beforeEach(() => {
    store.replaceState(Utils.getInitialStoreState());
    container = render(Calculator, { store });
    calculator = new CalculatorPageObject(container);
  });

  test('Making Sums operations', ({ given, when, then }) => {
    given(/Clara open calculator/i, () => {});

    when(/she inputs (\d+) \+ (\d+)/i, async (num1, num2) => {
      await calculator.keyboard.type(`${num1}+${num2}`);
      await calculator.keyboard.clickOnEqualButton();
    });

    then(/should display (\d+) as result/i, (expectedResult) => {
      expect(calculator.display.inputDisplay.value).toEqual(expectedResult);
    });
  });
});
