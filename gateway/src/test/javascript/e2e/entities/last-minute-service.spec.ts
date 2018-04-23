import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
import * as path from 'path';
describe('LastMinuteService e2e test', () => {

    let navBarPage: NavBarPage;
    let lastMinuteServiceDialogPage: LastMinuteServiceDialogPage;
    let lastMinuteServiceComponentsPage: LastMinuteServiceComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);

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
        lastMinuteServiceDialogPage.setPriceInput('5');
        expect(lastMinuteServiceDialogPage.getPriceInput()).toMatch('5');
        lastMinuteServiceDialogPage.setAddressInput('address');
        expect(lastMinuteServiceDialogPage.getAddressInput()).toMatch('address');
        lastMinuteServiceDialogPage.setCategoryInput('5');
        expect(lastMinuteServiceDialogPage.getCategoryInput()).toMatch('5');
        lastMinuteServiceDialogPage.setDescriptionInput('description');
        expect(lastMinuteServiceDialogPage.getDescriptionInput()).toMatch('description');
        lastMinuteServiceDialogPage.setAvailableInput(12310020012301);
        expect(lastMinuteServiceDialogPage.getAvailableInput()).toMatch('2001-12-31T02:30');
        lastMinuteServiceDialogPage.setLocationInput('location');
        expect(lastMinuteServiceDialogPage.getLocationInput()).toMatch('location');
        lastMinuteServiceDialogPage.setImageInput(absolutePath);
        lastMinuteServiceDialogPage.setProfileInput('5');
        expect(lastMinuteServiceDialogPage.getProfileInput()).toMatch('5');
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
    priceInput = element(by.css('input#field_price'));
    addressInput = element(by.css('input#field_address'));
    categoryInput = element(by.css('input#field_category'));
    descriptionInput = element(by.css('input#field_description'));
    availableInput = element(by.css('input#field_available'));
    locationInput = element(by.css('input#field_location'));
    imageInput = element(by.css('input#file_image'));
    profileInput = element(by.css('input#field_profile'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

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

    setCategoryInput = function(category) {
        this.categoryInput.sendKeys(category);
    };

    getCategoryInput = function() {
        return this.categoryInput.getAttribute('value');
    };

    setDescriptionInput = function(description) {
        this.descriptionInput.sendKeys(description);
    };

    getDescriptionInput = function() {
        return this.descriptionInput.getAttribute('value');
    };

    setAvailableInput = function(available) {
        this.availableInput.sendKeys(available);
    };

    getAvailableInput = function() {
        return this.availableInput.getAttribute('value');
    };

    setLocationInput = function(location) {
        this.locationInput.sendKeys(location);
    };

    getLocationInput = function() {
        return this.locationInput.getAttribute('value');
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
