import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Request e2e test', () => {

    let navBarPage: NavBarPage;
    let requestDialogPage: RequestDialogPage;
    let requestComponentsPage: RequestComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Requests', () => {
        navBarPage.goToEntity('request');
        requestComponentsPage = new RequestComponentsPage();
        expect(requestComponentsPage.getTitle())
            .toMatch(/bemApp.request.home.title/);

    });

    it('should load create Request dialog', () => {
        requestComponentsPage.clickOnCreateButton();
        requestDialogPage = new RequestDialogPage();
        expect(requestDialogPage.getModalTitle())
            .toMatch(/bemApp.request.home.createOrEditLabel/);
        requestDialogPage.close();
    });

    it('should create and save Requests', () => {
        requestComponentsPage.clickOnCreateButton();
        requestDialogPage.categorySelectLastOption();
        requestDialogPage.setNameInput('name');
        expect(requestDialogPage.getNameInput()).toMatch('name');
        requestDialogPage.setDurationInput(12310020012301);
        expect(requestDialogPage.getDurationInput()).toMatch('2001-12-31T02:30');
        requestDialogPage.setExpPriceInput('5');
        expect(requestDialogPage.getExpPriceInput()).toMatch('5');
        requestDialogPage.setUserInput('5');
        expect(requestDialogPage.getUserInput()).toMatch('5');
        requestDialogPage.profileSelectLastOption();
        requestDialogPage.save();
        expect(requestDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class RequestComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-request div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class RequestDialogPage {
    modalTitle = element(by.css('h4#myRequestLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    categorySelect = element(by.css('select#field_category'));
    nameInput = element(by.css('input#field_name'));
    durationInput = element(by.css('input#field_duration'));
    expPriceInput = element(by.css('input#field_expPrice'));
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

    setDurationInput = function(duration) {
        this.durationInput.sendKeys(duration);
    };

    getDurationInput = function() {
        return this.durationInput.getAttribute('value');
    };

    setExpPriceInput = function(expPrice) {
        this.expPriceInput.sendKeys(expPrice);
    };

    getExpPriceInput = function() {
        return this.expPriceInput.getAttribute('value');
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
