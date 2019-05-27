import { element, by, ElementFinder } from 'protractor';

export class InterviewComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-interview div table .btn-danger'));
    title = element.all(by.css('jhi-interview div h2#page-heading span')).first();

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

export class InterviewUpdatePage {
    pageTitle = element(by.id('jhi-interview-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    levelInput = element(by.id('field_level'));
    interviewDateInput = element(by.id('field_interviewDate'));
    interviewerNameInput = element(by.id('field_interviewerName'));
    interviewerEmailInput = element(by.id('field_interviewerEmail'));
    interviewerPhoneInput = element(by.id('field_interviewerPhone'));
    statusInput = element(by.id('field_status'));
    commentsInput = element(by.id('field_comments'));
    candidateSelect = element(by.id('field_candidate'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setLevelInput(level) {
        await this.levelInput.sendKeys(level);
    }

    async getLevelInput() {
        return this.levelInput.getAttribute('value');
    }

    async setInterviewDateInput(interviewDate) {
        await this.interviewDateInput.sendKeys(interviewDate);
    }

    async getInterviewDateInput() {
        return this.interviewDateInput.getAttribute('value');
    }

    async setInterviewerNameInput(interviewerName) {
        await this.interviewerNameInput.sendKeys(interviewerName);
    }

    async getInterviewerNameInput() {
        return this.interviewerNameInput.getAttribute('value');
    }

    async setInterviewerEmailInput(interviewerEmail) {
        await this.interviewerEmailInput.sendKeys(interviewerEmail);
    }

    async getInterviewerEmailInput() {
        return this.interviewerEmailInput.getAttribute('value');
    }

    async setInterviewerPhoneInput(interviewerPhone) {
        await this.interviewerPhoneInput.sendKeys(interviewerPhone);
    }

    async getInterviewerPhoneInput() {
        return this.interviewerPhoneInput.getAttribute('value');
    }

    async setStatusInput(status) {
        await this.statusInput.sendKeys(status);
    }

    async getStatusInput() {
        return this.statusInput.getAttribute('value');
    }

    async setCommentsInput(comments) {
        await this.commentsInput.sendKeys(comments);
    }

    async getCommentsInput() {
        return this.commentsInput.getAttribute('value');
    }

    async candidateSelectLastOption() {
        await this.candidateSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async candidateSelectOption(option) {
        await this.candidateSelect.sendKeys(option);
    }

    getCandidateSelect(): ElementFinder {
        return this.candidateSelect;
    }

    async getCandidateSelectedOption() {
        return this.candidateSelect.element(by.css('option:checked')).getText();
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

export class InterviewDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-interview-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-interview'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
