import PageObjectBase from './PageObjectBase';

export default class CalculationsHistoryPageObject extends PageObjectBase {
  constructor(container) {
    super();

    this.container = container;

    this.getHistoryContainer = () => this.container.queryByText(/history/i);
    this.getShowHistoryButton = () => this.container.queryByText(/show history/i);
    this.getHideHistoryButton = () => this.container.queryByText(/hide history/i);
  }

  async clickOnShowHistoryButton() {
    await PageObjectBase.clickOnButtonAndWaitDomUpdate(this.getShowHistoryButton());
  }

  async clickOnHideHistoryButton() {
    await PageObjectBase.clickOnButtonAndWaitDomUpdate(this.getHideHistoryButton());
  }
}
