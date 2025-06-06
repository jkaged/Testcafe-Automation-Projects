import { selector } from 'testcafe';

const baseUrl = 'www.mobygames.com';

fixture ('MobyGames Practice')
    .page (baseUrl)

test('My First Test', async t => {
    
    //const title = selector('a[href$="https://www.mobygames.com/"]');

	await t
        //.expect(Selector(title).innerText).eql('MobyGames')
        .typeText('#qsearch', 'Jonathan Cage')
        .pressKey('enter', { timeout: 5000 });
        
});

test.skip('My Second Test', async t => {

    const Cage_Btn = selector('a[href$="https://www.mobygames.com/developer/sheet/view/developerId,425064/"]');
    
    await t
	    .hover(Cage_Btn.nth(0))
	    .wait(5000)
	    .click(Cage_Btn.nth(0))
	    .wait(15000);
});