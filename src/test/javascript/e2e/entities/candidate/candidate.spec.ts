/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CandidateComponentsPage, CandidateDeleteDialog, CandidateUpdatePage } from './candidate.page-object';

const expect = chai.expect;

describe('Candidate e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let candidateUpdatePage: CandidateUpdatePage;
    let candidateComponentsPage: CandidateComponentsPage;
    let candidateDeleteDialog: CandidateDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Candidates', async () => {
        await navBarPage.goToEntity('candidate');
        candidateComponentsPage = new CandidateComponentsPage();
        await browser.wait(ec.visibilityOf(candidateComponentsPage.title), 5000);
        expect(await candidateComponentsPage.getTitle()).to.eq('Candidates');
    });

    it('should load create Candidate page', async () => {
        await candidateComponentsPage.clickOnCreateButton();
        candidateUpdatePage = new CandidateUpdatePage();
        expect(await candidateUpdatePage.getPageTitle()).to.eq('Create or edit a Candidate');
        await candidateUpdatePage.cancel();
    });

    it('should create and save Candidates', async () => {
        const nbButtonsBeforeCreate = await candidateComponentsPage.countDeleteButtons();

        await candidateComponentsPage.clickOnCreateButton();
        await promise.all([
            candidateUpdatePage.setNameInput('name'),
            candidateUpdatePage.setEmailInput('email'),
            candidateUpdatePage.setPhoneNoInput('phoneNo'),
            candidateUpdatePage.setCurrentCompanyInput('currentCompany'),
            candidateUpdatePage.setExperienceInput('5'),
            candidateUpdatePage.setPositionInput('position')
        ]);
        expect(await candidateUpdatePage.getNameInput()).to.eq('name');
        expect(await candidateUpdatePage.getEmailInput()).to.eq('email');
        expect(await candidateUpdatePage.getPhoneNoInput()).to.eq('phoneNo');
        expect(await candidateUpdatePage.getCurrentCompanyInput()).to.eq('currentCompany');
        expect(await candidateUpdatePage.getExperienceInput()).to.eq('5');
        expect(await candidateUpdatePage.getPositionInput()).to.eq('position');
        await candidateUpdatePage.save();
        expect(await candidateUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await candidateComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Candidate', async () => {
        const nbButtonsBeforeDelete = await candidateComponentsPage.countDeleteButtons();
        await candidateComponentsPage.clickOnLastDeleteButton();

        candidateDeleteDialog = new CandidateDeleteDialog();
        expect(await candidateDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Candidate?');
        await candidateDeleteDialog.clickOnConfirmButton();

        expect(await candidateComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
