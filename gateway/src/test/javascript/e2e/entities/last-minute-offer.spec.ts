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
            .toMatch(/gatewayApp.lastMinuteOffer.home.title/);

    });

    it('should load create LastMinuteOffer dialog', () => {
        lastMinuteOfferComponentsPage.clickOnCreateButton();
        lastMinuteOfferDialogPage = new LastMinuteOfferDialogPage();
        expect(lastMinuteOfferDialogPage.getModalTitle())
            .toMatch(/gatewayApp.lastMinuteOffer.home.createOrEditLabel/);
        lastMinuteOfferDialogPage.close();
    });

    it('should create and save LastMinuteOffers', () => {
        lastMinuteOfferComponentsPage.clickOnCreateButton();
        lastMinuteOfferDialogPage.setNameInput('name');
        expect(lastMinuteOfferDialogPage.getNameInput()).toMatch('name');
        lastMinuteOfferDialogPage.setProfileInput('profile');
        expect(lastMinuteOfferDialogPage.getProfileInput()).toMatch('profile');
        lastMinuteOfferDialogPage.lastMinuteServiceSelectLastOption();
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
    nameInput = element(by.css('input#field_name'));
    profileInput = element(by.css('input#field_profile'));
    lastMinuteServiceSelect = element(by.css('select#field_lastMinuteService'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setProfileInput = function(profile) {
        this.profileInput.sendKeys(profile);
    };

    getProfileInput = function() {
        return this.profileInput.getAttribute('value');
    };

    lastMinuteServiceSelectLastOption = function() {
        this.lastMinuteServiceSelect.all(by.tagName('option')).last().click();
    };

    lastMinuteServiceSelectOption = function(option) {
        this.lastMinuteServiceSelect.sendKeys(option);
    };

    getLastMinuteServiceSelect = function() {
        return this.lastMinuteServiceSelect;
    };

    getLastMinuteServiceSelectedOption = function() {
        return this.lastMinuteServiceSelect.element(by.css('option:checked')).getText();
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
