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
            .toMatch(/gatewayApp.offer.home.title/);

    });

    it('should load create Offer dialog', () => {
        offerComponentsPage.clickOnCreateButton();
        offerDialogPage = new OfferDialogPage();
        expect(offerDialogPage.getModalTitle())
            .toMatch(/gatewayApp.offer.home.createOrEditLabel/);
        offerDialogPage.close();
    });

    it('should create and save Offers', () => {
        offerComponentsPage.clickOnCreateButton();
        offerDialogPage.setDescriptionInput('description');
        expect(offerDialogPage.getDescriptionInput()).toMatch('description');
        offerDialogPage.setAvailableOnInput(12310020012301);
        expect(offerDialogPage.getAvailableOnInput()).toMatch('2001-12-31T02:30');
        offerDialogPage.setPriceInput('5');
        expect(offerDialogPage.getPriceInput()).toMatch('5');
        offerDialogPage.setProfileInput('profile');
        expect(offerDialogPage.getProfileInput()).toMatch('profile');
        offerDialogPage.requestSelectLastOption();
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
    descriptionInput = element(by.css('input#field_description'));
    availableOnInput = element(by.css('input#field_availableOn'));
    priceInput = element(by.css('input#field_price'));
    profileInput = element(by.css('input#field_profile'));
    requestSelect = element(by.css('select#field_request'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setDescriptionInput = function(description) {
        this.descriptionInput.sendKeys(description);
    };

    getDescriptionInput = function() {
        return this.descriptionInput.getAttribute('value');
    };

    setAvailableOnInput = function(availableOn) {
        this.availableOnInput.sendKeys(availableOn);
    };

    getAvailableOnInput = function() {
        return this.availableOnInput.getAttribute('value');
    };

    setPriceInput = function(price) {
        this.priceInput.sendKeys(price);
    };

    getPriceInput = function() {
        return this.priceInput.getAttribute('value');
    };

    setProfileInput = function(profile) {
        this.profileInput.sendKeys(profile);
    };

    getProfileInput = function() {
        return this.profileInput.getAttribute('value');
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
