import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(
      by.css('app-root .content span')
    ).getText() as Promise<string>;
  }
  getNavbarHome() {
    return element(by.css('[routerLink="/"]'))
  }
  getNavbarLinkDivs() {
    return element(by.className('navigation-links'))
  }
  getNavbar() {
    return element(by.className('navbar'))
  }
}
