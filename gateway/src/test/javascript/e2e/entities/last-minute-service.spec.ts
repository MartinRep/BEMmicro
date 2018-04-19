import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('LastMinuteService e2e test', () => {

    let navBarPage: NavBarPage;
    let lastMinuteServiceDialogPage: LastMinuteServiceDialogPage;
    let lastMinuteServiceComponentsPage: LastMinuteServiceComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load LastMinuteServices', () => {
        navBarPage.goToEntity('last-minute-service');
        lastMinuteServiceComponentsPage = new LastMinuteServiceComponentsPage();
        expect(lastMinuteServiceComponentsPage.getTitle())
            .toMatch(/bemApp.lastMinuteService.home.title/);

    });

    it('should load create LastMinuteService dialog', () => {
        lastMinuteServiceComponentsPage.clickOnCreateButton();
        lastMinuteServiceDialogPage = new LastMinuteServiceDialogPage();
        expect(lastMinuteServiceDialogPage.getModalTitle())
            .toMatch(/bemApp.lastMinuteService.home.createOrEditLabel/);
        lastMinuteServiceDialogPage.close();
    });

    it('should create and save LastMinuteServices', () => {
        lastMinuteServiceComponentsPage.clickOnCreateButton();
        lastMinuteServiceDialogPage.categorySelectLastOption();
        lastMinuteServiceDialogPage.setNameInput('name');
        expect(lastMinuteServiceDialogPage.getNameInput()).toMatch('name');
        lastMinuteServiceDialogPage.setTimeInput(12310020012301);
        expect(lastMinuteServiceDialogPage.getTimeInput()).toMatch('2001-12-31T02:30');
        lastMinuteServiceDialogPage.setPriceInput('5');
        expect(lastMinuteServiceDialogPage.getPriceInput()).toMatch('5');
        lastMinuteServiceDialogPage.setAddressInput('address');
        expect(lastMinuteServiceDialogPage.getAddressInput()).toMatch('address');
        lastMinuteServiceDialogPage.setUserInput('5');
        expect(lastMinuteServiceDialogPage.getUserInput()).toMatch('5');
        lastMinuteServiceDialogPage.profileSelectLastOption();
        lastMinuteServiceDialogPage.save();
        expect(lastMinuteServiceDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class LastMinuteServiceComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-last-minute-service div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class LastMinuteServiceDialogPage {
    modalTitle = element(by.css('h4#myLastMinuteServiceLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    categorySelect = element(by.css('select#field_category'));
    nameInput = element(by.css('input#field_name'));
    timeInput = element(by.css('input#field_time'));
    priceInput = element(by.css('input#field_price'));
    addressInput = element(by.css('input#field_address'));
    userInput = element(by.css('input#field_user'));
    profileSelect = element(by.css('select#field_profile'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setCategorySelect = function(category) {
        this.categorySelect.sendKeys(category);
    };

    getCategorySelect = function() {
        return this.categorySelect.element(by.css('option:checked')).getText();
    };

    categorySelectLastOption = function() {
        this.categorySelect.all(by.tagName('option')).last().click();
    };
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

    setAddressInput = function(address) {
        this.addressInput.sendKeys(address);
    };

    getAddressInput = function() {
        return this.addressInput.getAttribute('value');
    };

    setUserInput = function(user) {
        this.userInput.sendKeys(user);
    };

    getUserInput = function() {
        return this.userInput.getAttribute('value');
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
