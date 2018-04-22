import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
import * as path from 'path';
describe('Profile e2e test', () => {

    let navBarPage: NavBarPage;
    let profileDialogPage: ProfileDialogPage;
    let profileComponentsPage: ProfileComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Profiles', () => {
        navBarPage.goToEntity('profile');
        profileComponentsPage = new ProfileComponentsPage();
        expect(profileComponentsPage.getTitle())
            .toMatch(/bemApp.profile.home.title/);

    });

    it('should load create Profile dialog', () => {
        profileComponentsPage.clickOnCreateButton();
        profileDialogPage = new ProfileDialogPage();
        expect(profileDialogPage.getModalTitle())
            .toMatch(/bemApp.profile.home.createOrEditLabel/);
        profileDialogPage.close();
    });

    it('should create and save Profiles', () => {
        profileComponentsPage.clickOnCreateButton();
        profileDialogPage.setNameInput('name');
        expect(profileDialogPage.getNameInput()).toMatch('name');
        profileDialogPage.setPhNumberInput('phNumber');
        expect(profileDialogPage.getPhNumberInput()).toMatch('phNumber');
        profileDialogPage.setPictureInput(absolutePath);
        profileDialogPage.userSelectLastOption();
        profileDialogPage.locationSelectLastOption();
        profileDialogPage.save();
        expect(profileDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ProfileComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-profile div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ProfileDialogPage {
    modalTitle = element(by.css('h4#myProfileLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    phNumberInput = element(by.css('input#field_phNumber'));
    pictureInput = element(by.css('input#file_picture'));
    userSelect = element(by.css('select#field_user'));
    locationSelect = element(by.css('select#field_location'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setPhNumberInput = function(phNumber) {
        this.phNumberInput.sendKeys(phNumber);
    };

    getPhNumberInput = function() {
        return this.phNumberInput.getAttribute('value');
    };

    setPictureInput = function(picture) {
        this.pictureInput.sendKeys(picture);
    };

    getPictureInput = function() {
        return this.pictureInput.getAttribute('value');
    };

    userSelectLastOption = function() {
        this.userSelect.all(by.tagName('option')).last().click();
    };

    userSelectOption = function(option) {
        this.userSelect.sendKeys(option);
    };

    getUserSelect = function() {
        return this.userSelect;
    };

    getUserSelectedOption = function() {
        return this.userSelect.element(by.css('option:checked')).getText();
    };

    locationSelectLastOption = function() {
        this.locationSelect.all(by.tagName('option')).last().click();
    };

    locationSelectOption = function(option) {
        this.locationSelect.sendKeys(option);
    };

    getLocationSelect = function() {
        return this.locationSelect;
    };

    getLocationSelectedOption = function() {
        return this.locationSelect.element(by.css('option:checked')).getText();
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
