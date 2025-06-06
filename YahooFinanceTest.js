import { Selector, RequestLogger } from 'testcafe';

const logger = RequestLogger('https://finance.yahoo.com/');  

fixture ('Yahoo Finance Practice')
    .page ('https://finance.yahoo.com/')

.requestHooks(logger)

test('Logo Verify & HTTP 200 Test', async t => {
    const LogoIcon = Selector('#header-logo');
    
    await t
        .expect(LogoIcon.value).contains('Yahoo Finance')
        .wait(5000)
        .expect(logger.requests[0].response.statusCode).eql(200)
        .click('#caret-right')
        .wait(2000)
        .click('#caret-right')
        .wait(2000)
        .click('#caret-right')
        .wait(5000);
});

test('The Textbar Test', async t => {
    const Searchbar = Selector('#yfin-usr-qry');

    await t
        .expect(Searchbar.value).eql('', 'Input is empty')
        .typeText(Searchbar, 'amzn')
        .wait(3000)
        .expect(Searchbar.value).contains('', 'Input contains text "amzn"')
        .wait(5000)
        .click('#header-desktop-search-button') 
        .wait(10000)
        .expect('#atomic').contains('Contains text "Amazon.com"');

});