package com.scholastic.harrypotter.steps;

import com.scholastic.harrypotter.ui.pages.HarryPotterBasePage;
import com.scholastic.harrypotter.ui.pages.HarryPotterBookPromoPage;
import cucumber.api.java.en.When;
import gherkin.lexer.Th;
import org.junit.Assert;

/**
 * Created by C07HJAXNDJD0 on 8/2/16.
 */
public class BookPromoPageStep extends HarryPotterBasePage {

    private HarryPotterBookPromoPage harryPotterBookPromoPage = new HarryPotterBookPromoPage();

    @When( "^The 'Book Promo Details' page is loaded$" )
    public void theBookPromoDetailsPageIsLoaded() throws InterruptedException {
        harryPotterBookPromoPage.waitAndValidateVisibility(harryPotterBookPromoPage.backToHarryPotterHomePage);
        harryPotterBookPromoPage.pause(3);
        Assert.assertTrue( "The page didn't load the Book details",
                harryPotterBookPromoPage.validateTextInCurrentUrl("books"));
    }

    @When( "^I click \"([^\"]*)\" button to navigated to Home page$" )
    public void iClickHarryPotterHomePage(String text){
        Assert.assertTrue(harryPotterBookPromoPage.backToHarryPotterHomePage.getText().equals(text));
        harryPotterBookPromoPage.backToHarryPotterHomePage.click();
        harryPotterBookPromoPage.pause(3);
    }

    @When( "^I click 'See All' Button$" )
    public void iClickSeeAllBtn() throws InterruptedException {
        harryPotterBookPromoPage.scrollElementIntoView(harryPotterBookPromoPage.tittleOfBook);
        harryPotterBookPromoPage.pause(2);
        Assert.assertEquals("See All", harryPotterBookPromoPage.seeAllAndLessBtn.getText());
        harryPotterBookPromoPage.seeAllAndLessBtn.click();
        harryPotterBookPromoPage.pause(3);
    }

    @When( "^Check 'See Less' Button is displayed after clicking 'See All' Button$" )
    public void checkSeeLessBtnIsDisplayed() throws InterruptedException {
        harryPotterBookPromoPage.scrollElementIntoView(harryPotterBookPromoPage.ageSection);
        harryPotterBookPromoPage.pause(3);
        Assert.assertEquals("See Less",harryPotterBookPromoPage.seeAllAndLessBtn.getText());
    }

    @When( "^I click 'See Less' Button$" )
    public void iClickSeeLessBtn() throws InterruptedException {
        harryPotterBookPromoPage.waitForelementToBeClickable(harryPotterBookPromoPage.seeAllAndLessBtn);
        harryPotterBookPromoPage.pause(3);
        harryPotterBookPromoPage.seeAllAndLessBtn.click();
        harryPotterBookPromoPage.pause(3);
    }

    @When( "^Check the button is changed into 'See All'$" )
    public void checkButtonIsChangedIntoSeeAll() throws InterruptedException {
        harryPotterBookPromoPage.scrollElementIntoView(harryPotterBookPromoPage.tittleOfBook);
        harryPotterBookPromoPage.pause(3);
        Assert.assertEquals("See All", harryPotterBookPromoPage.seeAllAndLessBtn.getText());
    }

    @When( "^I click \"([^\"]*)\" button from Book Promo details page$" )
    public void iClickGetThisBookBtnFromBookPromoDetails(String text){
        harryPotterBookPromoPage.scrollElementIntoView(harryPotterBookPromoPage.ageSection);
        harryPotterBookPromoPage.pause(3);
        Assert.assertTrue(harryPotterBookPromoPage.getThisBookBtn.getText().equals(text));
        harryPotterBookPromoPage.getThisBookBtn.click();
        harryPotterBookPromoPage.pause(3);
    }

    @When( "^Check \"([^\"]*)\" modal is displayed$" )
    public void checkGetTheBookModalIsDisplayed(String text){
        Assert.assertEquals("The Modal is not displayed", text, harryPotterBookPromoPage.getTheBookTxt.getText());
        harryPotterBookPromoPage.pause(2);
    }

    @When( "^I click \"([^\"]*)\" button from the Modal$" )
    public void iClickGetTheBookBtnInModal(String getTheBookBtnTxt){
        harryPotterBookPromoPage.waitForelementToBeClickable(harryPotterBookPromoPage.getTheBookBtn);
        Assert.assertTrue("The button is not displayed", harryPotterBookPromoPage.getTheBookBtn.getText().equals(getTheBookBtnTxt));
        harryPotterBookPromoPage.getTheBookBtn.click();
        harryPotterBookPromoPage.pause(3);
    }

    @When( "^Check 'Customer form' is displayed$" )
    public void checkCustomerFormIsDisplayed(){
        harryPotterBookPromoPage.waitAndValidateVisibility(harryPotterBookPromoPage.customerFormTxt);
        Assert.assertEquals("Customer form is not displayed", "Customer Form", harryPotterBookPromoPage.customerFormTxt.getText());
        harryPotterBookPromoPage.pause(3);
    }

    @When( "^Input DOB as \"([^\"]*)\" in 'Customer Form'$" )
    public void inputDOB(String DOB){
        harryPotterBookPromoPage.waitForelementToBeClickable(harryPotterBookPromoPage.inputDOB);
        harryPotterBookPromoPage.inputDOB.sendKeys(DOB);
    }

    @When( "^I click 'Submit' button$" )
    public void iClickSubmitBtn(){
        harryPotterBookPromoPage.waitForelementToBeClickable(harryPotterBookPromoPage.submitBtn);
        harryPotterBookPromoPage.submitBtn.click();
        harryPotterBookPromoPage.pause(3);
    }

    @When( "^I click 'Find Now' button from Get the book modal$" )
    public void iClickFindNowBtn(){
        harryPotterBookPromoPage.waitForelementToBeClickable(harryPotterBookPromoPage.findNowBtn);
        harryPotterBookPromoPage.findNowBtn.click();
        harryPotterBookPromoPage.pause(3);
    }

    @When( "^Check scholastic store in new window$" )
    public void checkScholasticStoreNewWindow() throws InterruptedException {
        harryPotterBookPromoPage.scholasticStoreOnlineNewWindow(harryPotterBookPromoPage.headerTxtNewWindows.getText().contains("You are about to enter the"));
    }

    @When( "^Check scholastic find book in new window$" )
    public void checkScholasticFindBookNewWindow() throws InterruptedException {
        harryPotterBookPromoPage.scholasticStoreOnlineNewWindow(harryPotterBookPromoPage.headerTxtFindBookNewWindow.isDisplayed());
    }
}
