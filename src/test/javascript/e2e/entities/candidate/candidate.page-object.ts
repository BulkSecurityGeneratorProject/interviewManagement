import { element, by, ElementFinder } from 'protractor';

export class CandidateComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-candidate div table .btn-danger'));
    title = element.all(by.css('jhi-candidate div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getText();
    }
}

export class CandidateUpdatePage {
    pageTitle = element(by.id('jhi-candidate-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    emailInput = element(by.id('field_email'));
    phoneNoInput = element(by.id('field_phoneNo'));
    currentCompanyInput = element(by.id('field_currentCompany'));
    experienceInput = element(by.id('field_experience'));
    positionInput = element(by.id('field_position'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setEmailInput(email) {
        await this.emailInput.sendKeys(email);
    }

    async getEmailInput() {
        return this.emailInput.getAttribute('value');
    }

    async setPhoneNoInput(phoneNo) {
        await this.phoneNoInput.sendKeys(phoneNo);
    }

    async getPhoneNoInput() {
        return this.phoneNoInput.getAttribute('value');
    }

    async setCurrentCompanyInput(currentCompany) {
        await this.currentCompanyInput.sendKeys(currentCompany);
    }

    async getCurrentCompanyInput() {
        return this.currentCompanyInput.getAttribute('value');
    }

    async setExperienceInput(experience) {
        await this.experienceInput.sendKeys(experience);
    }

    async getExperienceInput() {
        return this.experienceInput.getAttribute('value');
    }

    async setPositionInput(position) {
        await this.positionInput.sendKeys(position);
    }

    async getPositionInput() {
        return this.positionInput.getAttribute('value');
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class CandidateDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-candidate-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-candidate'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
