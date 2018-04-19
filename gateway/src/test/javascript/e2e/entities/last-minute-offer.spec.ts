import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('LastMinuteOffer e2e test', () => {

    let navBarPage: NavBarPage;
    let lastMinuteOfferDialogPage: LastMinuteOfferDialogPage;
    let lastMinuteOfferComponentsPage: LastMinuteOfferComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load LastMinuteOffers', () => {
        navBarPage.goToEntity('last-minute-offer');
        lastMinuteOfferComponentsPage = new LastMinuteOfferComponentsPage();
        expect(lastMinuteOfferComponentsPage.getTitle())
            .toMatch(/bemApp.lastMinuteOffer.home.title/);

    });

    it('should load create LastMinuteOffer dialog', () => {
        lastMinuteOfferComponentsPage.clickOnCreateButton();
        lastMinuteOfferDialogPage = new LastMinuteOfferDialogPage();
        expect(lastMinuteOfferDialogPage.getModalTitle())
            .toMatch(/bemApp.lastMinuteOffer.home.createOrEditLabel/);
        lastMinuteOfferDialogPage.close();
    });

    it('should create and save LastMinuteOffers', () => {
        lastMinuteOfferComponentsPage.clickOnCreateButton();
        lastMinuteOfferDialogPage.setPriceInput('5');
        expect(lastMinuteOfferDialogPage.getPriceInput()).toMatch('5');
        lastMinuteOfferDialogPage.setUserInput('5');
        expect(lastMinuteOfferDialogPage.getUserInput()).toMatch('5');
        lastMinuteOfferDialogPage.serviceSelectLastOption();
        lastMinuteOfferDialogPage.profileSelectLastOption();
        lastMinuteOfferDialogPage.save();
        expect(lastMinuteOfferDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class LastMinuteOfferComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-last-minute-offer div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class LastMinuteOfferDialogPage {
    modalTitle = element(by.css('h4#myLastMinuteOfferLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    priceInput = element(by.css('input#field_price'));
    userInput = element(by.css('input#field_user'));
    serviceSelect = element(by.css('select#field_service'));
    profileSelect = element(by.css('select#field_profile'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

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

    serviceSelectLastOption = function() {
        this.serviceSelect.all(by.tagName('option')).last().click();
    };

    serviceSelectOption = function(option) {
        this.serviceSelect.sendKeys(option);
    };

    getServiceSelect = function() {
        return this.serviceSelect;
    };

    getServiceSelectedOption = function() {
        return this.serviceSelect.element(by.css('option:checked')).getText();
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
