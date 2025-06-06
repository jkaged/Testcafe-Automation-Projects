import { Selector, RequestLogger } from 'testcafe';

const logger = RequestLogger('https://www.wikipedia.org');
const WikiLogo = Selector('img').withAttribute('src', 'portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png');
const Searchbar = Selector('#searchInput');
const CC = Selector('#mw-content-text');
const contentHeading = Selector('#mw-toc-heading');

fixture("Wiki Testcase")
    .page("https://www.wikipedia.org/")

    .requestHooks(logger)

test("#1 Website Validation", async t => {
    await t

        .expect(WikiLogo.exists).ok({ timeout: 5000 })
        .click('#js-lang-list-button')
        .click('#js-lang-list-button', { timeout: 5000 });
});


test("#2 SearchBar Test", async t => {

    await t
        .expect(Searchbar.value).eql('', 'Input is empty', { timeout: 5000 })
        .typeText(Searchbar, "Chitlin' Circuit", { timeout: 5000 })
        .pressKey('enter', { timeout: 5000 })
        .expect(Selector('#firstHeading').innerText).eql("Chitlin' Circuit")
        .expect(logger.requests[0].response.statusCode).eql(200)
        .expect(CC.withText('to be by, for, and about Black people', { timeout: 5000 }).exists).ok()
        .expect(contentHeading.exists).ok()
        .expect(contentHeading.innerText).eql('Contents');
});

