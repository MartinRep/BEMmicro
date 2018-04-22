import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Appointment e2e test', () => {

    let navBarPage: NavBarPage;
    let appointmentDialogPage: AppointmentDialogPage;
    let appointmentComponentsPage: AppointmentComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Appointments', () => {
        navBarPage.goToEntity('appointment');
        appointmentComponentsPage = new AppointmentComponentsPage();
        expect(appointmentComponentsPage.getTitle())
            .toMatch(/bemApp.appointment.home.title/);

    });

    it('should load create Appointment dialog', () => {
        appointmentComponentsPage.clickOnCreateButton();
        appointmentDialogPage = new AppointmentDialogPage();
        expect(appointmentDialogPage.getModalTitle())
            .toMatch(/bemApp.appointment.home.createOrEditLabel/);
        appointmentDialogPage.close();
    });

    it('should create and save Appointments', () => {
        appointmentComponentsPage.clickOnCreateButton();
        appointmentDialogPage.setNameInput('name');
        expect(appointmentDialogPage.getNameInput()).toMatch('name');
        appointmentDialogPage.setAddressInput('address');
        expect(appointmentDialogPage.getAddressInput()).toMatch('address');
        appointmentDialogPage.setTimeInput(12310020012301);
        expect(appointmentDialogPage.getTimeInput()).toMatch('2001-12-31T02:30');
        // appointmentDialogPage.profileSelectLastOption();
        appointmentDialogPage.save();
        expect(appointmentDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class AppointmentComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-appointment div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class AppointmentDialogPage {
    modalTitle = element(by.css('h4#myAppointmentLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    addressInput = element(by.css('input#field_address'));
    timeInput = element(by.css('input#field_time'));
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

    setAddressInput = function(address) {
        this.addressInput.sendKeys(address);
    };

    getAddressInput = function() {
        return this.addressInput.getAttribute('value');
    };

    setTimeInput = function(time) {
        this.timeInput.sendKeys(time);
    };

    getTimeInput = function() {
        return this.timeInput.getAttribute('value');
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
