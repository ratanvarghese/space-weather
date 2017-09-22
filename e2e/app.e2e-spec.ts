import { SolarPage } from './app.po';

describe('solar App', () => {
  let page: SolarPage;

  beforeEach(() => {
    page = new SolarPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
