import Vue from 'vue';
import { fireEvent } from '@testing-library/vue';

export default class PageObjectBase {

  async clickOnButtonAndWaitDomUpdate(button) {
    await fireEvent.click(button);
    await Vue.nextTick();
  }

  async pressEnterOn(element) {
    await fireEvent.keyDown(element, { key: 'Enter', code: 'Enter' });
    await Vue.nextTick();
  }
}
