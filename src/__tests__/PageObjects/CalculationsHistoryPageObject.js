import PageObjectBase from './PageObjectBase';

export default class CalculationsHistoryPageObject extends PageObjectBase {
  constructor(container) {
    super();

    this.container = container;
    
    this.getHistoryContainer = () => this.container.queryByText(/histórico/i);
    this.getShowHistoryButton = () => this.container.queryByText(/exibir histórico/i);
    this.getHideHistoryButton = () => this.container.queryByText(/ocultar histórico/i);
  }

  async clickOnShowHistoryButton() {
    await this.clickOnButtonAndWaitDomUpdate(this.getShowHistoryButton());
  }

  async clickOnHideHistoryButton() {
    await this.clickOnButtonAndWaitDomUpdate(this.getHideHistoryButton());
  }
}
