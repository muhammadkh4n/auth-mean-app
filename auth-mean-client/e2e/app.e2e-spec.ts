import { SocialMeanClientPage } from './app.po';

describe('social-mean-client App', () => {
  let page: SocialMeanClientPage;

  beforeEach(() => {
    page = new SocialMeanClientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
