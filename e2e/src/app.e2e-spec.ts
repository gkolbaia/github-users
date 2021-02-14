import { AppPage } from './app.po';
import { by, element, browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display hone Link', () => {
    page.navigateTo();
    expect(page.getNavbarHome().getText()).toEqual('Home');
  });
  it('should display links div', () => {
    page.navigateTo();
    expect(page.getNavbarLinkDivs().getText()).toEqual(page.getNavbarHome().getText());
  });
  it('should display navbar', () => {
    page.navigateTo();
    expect(page.getNavbar().getText()).toEqual(page.getNavbarLinkDivs().getText());
  });
  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });
});
