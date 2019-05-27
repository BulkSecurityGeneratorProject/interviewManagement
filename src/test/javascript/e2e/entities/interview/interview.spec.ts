/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { InterviewComponentsPage, InterviewDeleteDialog, InterviewUpdatePage } from './interview.page-object';

const expect = chai.expect;

describe('Interview e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let interviewUpdatePage: InterviewUpdatePage;
    let interviewComponentsPage: InterviewComponentsPage;
    let interviewDeleteDialog: InterviewDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Interviews', async () => {
        await navBarPage.goToEntity('interview');
        interviewComponentsPage = new InterviewComponentsPage();
        await browser.wait(ec.visibilityOf(interviewComponentsPage.title), 5000);
        expect(await interviewComponentsPage.getTitle()).to.eq('Interviews');
    });

    it('should load create Interview page', async () => {
        await interviewComponentsPage.clickOnCreateButton();
        interviewUpdatePage = new InterviewUpdatePage();
        expect(await interviewUpdatePage.getPageTitle()).to.eq('Create or edit a Interview');
        await interviewUpdatePage.cancel();
    });

    it('should create and save Interviews', async () => {
        const nbButtonsBeforeCreate = await interviewComponentsPage.countDeleteButtons();

        await interviewComponentsPage.clickOnCreateButton();
        await promise.all([
            interviewUpdatePage.setLevelInput('level'),
            interviewUpdatePage.setInterviewDateInput('2000-12-31'),
            interviewUpdatePage.setInterviewerNameInput('interviewerName'),
            interviewUpdatePage.setInterviewerEmailInput('interviewerEmail'),
            interviewUpdatePage.setInterviewerPhoneInput('interviewerPhone'),
            interviewUpdatePage.setStatusInput('status'),
            interviewUpdatePage.setCommentsInput('comments'),
            interviewUpdatePage.candidateSelectLastOption()
        ]);
        expect(await interviewUpdatePage.getLevelInput()).to.eq('level');
        expect(await interviewUpdatePage.getInterviewDateInput()).to.eq('2000-12-31');
        expect(await interviewUpdatePage.getInterviewerNameInput()).to.eq('interviewerName');
        expect(await interviewUpdatePage.getInterviewerEmailInput()).to.eq('interviewerEmail');
        expect(await interviewUpdatePage.getInterviewerPhoneInput()).to.eq('interviewerPhone');
        expect(await interviewUpdatePage.getStatusInput()).to.eq('status');
        expect(await interviewUpdatePage.getCommentsInput()).to.eq('comments');
        await interviewUpdatePage.save();
        expect(await interviewUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await interviewComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Interview', async () => {
        const nbButtonsBeforeDelete = await interviewComponentsPage.countDeleteButtons();
        await interviewComponentsPage.clickOnLastDeleteButton();

        interviewDeleteDialog = new InterviewDeleteDialog();
        expect(await interviewDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Interview?');
        await interviewDeleteDialog.clickOnConfirmButton();

        expect(await interviewComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
