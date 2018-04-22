import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Categories e2e test', () => {

    let navBarPage: NavBarPage;
    let categoriesDialogPage: CategoriesDialogPage;
    let categoriesComponentsPage: CategoriesComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Categories', () => {
        navBarPage.goToEntity('categories');
        categoriesComponentsPage = new CategoriesComponentsPage();
        expect(categoriesComponentsPage.getTitle())
            .toMatch(/bemApp.categories.home.title/);

    });

    it('should load create Categories dialog', () => {
        categoriesComponentsPage.clickOnCreateButton();
        categoriesDialogPage = new CategoriesDialogPage();
        expect(categoriesDialogPage.getModalTitle())
            .toMatch(/bemApp.categories.home.createOrEditLabel/);
        categoriesDialogPage.close();
    });

    it('should create and save Categories', () => {
        categoriesComponentsPage.clickOnCreateButton();
        categoriesDialogPage.setCategoryInput('category');
        expect(categoriesDialogPage.getCategoryInput()).toMatch('category');
        categoriesDialogPage.appointmentSelectLastOption();
        categoriesDialogPage.save();
        expect(categoriesDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CategoriesComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-categories div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CategoriesDialogPage {
    modalTitle = element(by.css('h4#myCategoriesLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    categoryInput = element(by.css('input#field_category'));
    appointmentSelect = element(by.css('select#field_appointment'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setCategoryInput = function(category) {
        this.categoryInput.sendKeys(category);
    };

    getCategoryInput = function() {
        return this.categoryInput.getAttribute('value');
    };

    appointmentSelectLastOption = function() {
        this.appointmentSelect.all(by.tagName('option')).last().click();
    };

    appointmentSelectOption = function(option) {
        this.appointmentSelect.sendKeys(option);
    };

    getAppointmentSelect = function() {
        return this.appointmentSelect;
    };

    getAppointmentSelectedOption = function() {
        return this.appointmentSelect.element(by.css('option:checked')).getText();
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
