import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Offer e2e test', () => {

    let navBarPage: NavBarPage;
    let offerDialogPage: OfferDialogPage;
    let offerComponentsPage: OfferComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Offers', () => {
        navBarPage.goToEntity('offer');
        offerComponentsPage = new OfferComponentsPage();
        expect(offerComponentsPage.getTitle())
            .toMatch(/bemApp.offer.home.title/);

    });

    it('should load create Offer dialog', () => {
        offerComponentsPage.clickOnCreateButton();
        offerDialogPage = new OfferDialogPage();
        expect(offerDialogPage.getModalTitle())
            .toMatch(/bemApp.offer.home.createOrEditLabel/);
        offerDialogPage.close();
    });

    it('should create and save Offers', () => {
        offerComponentsPage.clickOnCreateButton();
        offerDialogPage.setNameInput('name');
        expect(offerDialogPage.getNameInput()).toMatch('name');
        offerDialogPage.setTimeInput(12310020012301);
        expect(offerDialogPage.getTimeInput()).toMatch('2001-12-31T02:30');
        offerDialogPage.setPriceInput('5');
        expect(offerDialogPage.getPriceInput()).toMatch('5');
        offerDialogPage.setUserInput('5');
        expect(offerDialogPage.getUserInput()).toMatch('5');
        offerDialogPage.requestSelectLastOption();
        offerDialogPage.profileSelectLastOption();
        offerDialogPage.save();
        expect(offerDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class OfferComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-offer div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class OfferDialogPage {
    modalTitle = element(by.css('h4#myOfferLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    timeInput = element(by.css('input#field_time'));
    priceInput = element(by.css('input#field_price'));
    userInput = element(by.css('input#field_user'));
    requestSelect = element(by.css('select#field_request'));
    profileSelect = element(by.css('select#field_profile'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setTimeInput = function(time) {
        this.timeInput.sendKeys(time);
    };

    getTimeInput = function() {
        return this.timeInput.getAttribute('value');
    };

    setPriceInput = function(price) {
        this.priceInput.sendKeys(price);
    };

    getPriceInput = function() {
        return this.priceInput.getAttribute('value');
    };

    setUserInput = function(user) {
        this.userInput.sendKeys(user);
    };

    getUserInput = function() {
        return this.userInput.getAttribute('value');
    };

    requestSelectLastOption = function() {
        this.requestSelect.all(by.tagName('option')).last().click();
    };

    requestSelectOption = function(option) {
        this.requestSelect.sendKeys(option);
    };

    getRequestSelect = function() {
        return this.requestSelect;
    };

    getRequestSelectedOption = function() {
        return this.requestSelect.element(by.css('option:checked')).getText();
    };

    profileSelectLastOption = function() {
        this.profileSelect.all(by.tagName('option')).last().click();
    };

    profileSelectOption = function(option) {
        this.profileSelect.sendKeys(option);
    };

    getProfileSelect = function() {
        return this.profileSelect;
    };

    getProfileSelectedOption = function() {
        return this.profileSelect.element(by.css('option:checked')).getText();
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
