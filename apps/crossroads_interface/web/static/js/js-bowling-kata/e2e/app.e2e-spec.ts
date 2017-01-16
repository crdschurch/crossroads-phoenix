import { JsBowlingKataPage } from './app.po';

describe('js-bowling-kata App', function() {
  let page: JsBowlingKataPage;

  beforeEach(() => {
    page = new JsBowlingKataPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
