import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
import * as path from 'path';
describe('Request e2e test', () => {

    let navBarPage: NavBarPage;
    let requestDialogPage: RequestDialogPage;
    let requestComponentsPage: RequestComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

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
        requestDialogPage.setCategoryInput('category');
        expect(requestDialogPage.getCategoryInput()).toMatch('category');
        requestDialogPage.setRegionInput('region');
        expect(requestDialogPage.getRegionInput()).toMatch('region');
        requestDialogPage.setDescriptionInput('description');
        expect(requestDialogPage.getDescriptionInput()).toMatch('description');
        requestDialogPage.setDurationInput(12310020012301);
        expect(requestDialogPage.getDurationInput()).toMatch('2001-12-31T02:30');
        requestDialogPage.setExpPriceInput('5');
        expect(requestDialogPage.getExpPriceInput()).toMatch('5');
        requestDialogPage.setImageInput(absolutePath);
        requestDialogPage.setProfileInput('5');
        expect(requestDialogPage.getProfileInput()).toMatch('5');
        requestDialogPage.setPostedInput(12310020012301);
        expect(requestDialogPage.getPostedInput()).toMatch('2001-12-31T02:30');
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
    categoryInput = element(by.css('input#field_category'));
    regionInput = element(by.css('input#field_region'));
    descriptionInput = element(by.css('input#field_description'));
    durationInput = element(by.css('input#field_duration'));
    expPriceInput = element(by.css('input#field_expPrice'));
    imageInput = element(by.css('input#file_image'));
    profileInput = element(by.css('input#field_profile'));
    postedInput = element(by.css('input#field_posted'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setCategoryInput = function(category) {
        this.categoryInput.sendKeys(category);
    };

    getCategoryInput = function() {
        return this.categoryInput.getAttribute('value');
    };

    setRegionInput = function(region) {
        this.regionInput.sendKeys(region);
    };

    getRegionInput = function() {
        return this.regionInput.getAttribute('value');
    };

    setDescriptionInput = function(description) {
        this.descriptionInput.sendKeys(description);
    };

    getDescriptionInput = function() {
        return this.descriptionInput.getAttribute('value');
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

    setImageInput = function(image) {
        this.imageInput.sendKeys(image);
    };

    getImageInput = function() {
        return this.imageInput.getAttribute('value');
    };

    setProfileInput = function(profile) {
        this.profileInput.sendKeys(profile);
    };

    getProfileInput = function() {
        return this.profileInput.getAttribute('value');
    };

    setPostedInput = function(posted) {
        this.postedInput.sendKeys(posted);
    };

    getPostedInput = function() {
        return this.postedInput.getAttribute('value');
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
