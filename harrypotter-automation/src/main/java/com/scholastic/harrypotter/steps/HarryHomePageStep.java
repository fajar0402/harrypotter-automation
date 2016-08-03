package com.scholastic.harrypotter.steps;

import com.scholastic.harrypotter.ui.pages.HarryPotterHomePage;
import cucumber.api.java.en.And;
import cucumber.api.java.en.Given;
import cucumber.api.java.en.When;
import org.junit.Assert;

/**
 * Created by C07HJAXNDJD0 on 7/29/16.
 */
public class HarryHomePageStep {

    private HarryPotterHomePage harryPotterHomePage = new HarryPotterHomePage();

    @Given( "^I am at Harry Potter home page$" )
    public void iAmAtHarryHomePage() throws InterruptedException {
        harryPotterHomePage.navigateTo( "publish", "");
        harryPotterHomePage.setNewDefaultTimeOut(30);
        harryPotterHomePage.verifyMeAsCurrentPage();
        Thread.sleep(3000);
    }

    @When( "^User's at Harry Potter Home page$" )
    public void userAtHarryPotterHomePage(){
        harryPotterHomePage.waitAndValidateVisibility(harryPotterHomePage.harryPotterTextImage);
        harryPotterHomePage.validateTextInCurrentUrl("home");
    }

    @When( "^I click 'Skip' button to skip the video$" )
    public void iClickSkipBtn(){
        harryPotterHomePage.waitAndValidateVisibility(harryPotterHomePage.skipCloseBtn);
        harryPotterHomePage.skipCloseBtn.click();
    }

    @When( "^I see the Harry Potter Image Logo$")
    public void iSeeHarryPotterImage(){
        harryPotterHomePage.waitAndValidateVisibility(harryPotterHomePage.harryPotterTextImage);
        Assert.assertTrue(harryPotterHomePage.harryPotterTextImage.getAttribute("alt").equals("harry potter"));
    }

    @When( "^I scroll the Home page : \"([^\"]*)\" Point$" )
    public void iScrollTheHomePage(String point) throws InterruptedException {
        harryPotterHomePage.scrollToElementByPointer("window.scrollBy(0,"+point+")");
    }

    @When( "^I see harry potter animations in Home page$" )
    public void iSeeHarryPotterAnimations(){
        Assert.assertTrue("Animations not displayed", harryPotterHomePage.booksTittleTxtAfterScroll.isDisplayed());
    }

    @When( "^I see the \"([^\"]*)\" button is displayed$" )
    public void iSeeCheckOutNewCoverBtn(String BtnTxt) throws InterruptedException {
        harryPotterHomePage.waitForVisibility(harryPotterHomePage.checkOutNewCoverBtn);
        Assert.assertEquals("Button is not displayed", BtnTxt, harryPotterHomePage.checkOutNewCoverBtn.getText());
    }

    @When( "^I check the books is display with old cover$" )
    public void iCheckBooksDisplaysWithOldCover() throws InterruptedException {
        harryPotterHomePage.checkOldCoverBooks();
    }

    @When( "^I click 'Check out new cover art by Kazu Kibuishi!' Button" )
    public void iClickCheckOutNewCoverBtn() throws InterruptedException {
        harryPotterHomePage.waitForVisibility(harryPotterHomePage.checkOutNewCoverBtn);
        harryPotterHomePage.checkOutNewCoverBtn.click();
        harryPotterHomePage.setDefaultTimeOut();
    }

    @When( "^I see the cover books is changed$")
    public void iCheckCoverBooksIsChanged() throws InterruptedException {
        harryPotterHomePage.checkNewCoverBooks();
    }

    @When( "^I click \"([^\"]*)\" button from Header menu$" )
    public void iClickSignInMenuFromHeader(String text) throws InterruptedException {
        Assert.assertTrue(harryPotterHomePage.signInMenuBtn.getText().equals(text));
        harryPotterHomePage.waitForelementToBeClickable(harryPotterHomePage.signInMenuBtn);
        harryPotterHomePage.signInMenuBtn.click();
        Thread.sleep(3000);
    }

    @When("^I see 'See More' button$")
    public void i_see_See_More_button() throws Throwable {
        harryPotterHomePage.scrollElementIntoView(harryPotterHomePage.accioTxt);
        harryPotterHomePage.waitAndValidateVisibility(harryPotterHomePage.seeMoreBtn);
        harryPotterHomePage.seeMoreBtn.click();
//        Thread.sleep(10000);
    }

    @And("^I scroll into 'See More' button$")
    public void i_scroll_into_See_More_button() throws Throwable {
        harryPotterHomePage.scrollToElementByPointer("window.scrollBy(0,150)");
        harryPotterHomePage.scrollElementIntoView(harryPotterHomePage.accioTxt);
        harryPotterHomePage.waitAndValidateVisibility(harryPotterHomePage.seeMoreBtn);
    }

    @When("^I click 'See More' button$")
    public void i_click_See_More_button() throws Throwable {
        harryPotterHomePage.seeMoreBtn.click();
    }

    @When( "^I click \"([^\"]*)\" Button from Book Promo section$" )
    public void iClickLearnMoreBtn(String txtBtn) throws InterruptedException {
        harryPotterHomePage.waitForelementToBeClickable(harryPotterHomePage.bookPromoLearnMoreBtn);
        Assert.assertEquals(txtBtn,harryPotterHomePage.bookPromoLearnMoreBtn.getText());
        harryPotterHomePage.bookPromoLearnMoreBtn.click();
        Thread.sleep(3000);
    }

    @And("^I able to click 'play' button$")
    public void i_view_click_button() throws InterruptedException {
        harryPotterHomePage.playBtn.click();
        Thread.sleep(3000);
    }

    @And("^I able to close 'video' window$")
    public void i_close_window() throws InterruptedException {
        harryPotterHomePage.closeVideoBtn.click();
        Thread.sleep(3000);
    }

    @And("^I click \"([^\"]*)\"  button$")
    public void click_show_hide_btn(String text){
        Assert.assertEquals(text, harryPotterHomePage.showHideBtn.getText());
        harryPotterHomePage.showHideBtn.click();
    }

    @And("^I able to view all text description display$")
    public void view_all_desc() throws InterruptedException {
        Assert.assertEquals("J.K. Rowling is the author of the record-breaking, multi-award-winning Harry Potter novels. "+
                "Loved by fans around the world, the series has sold over 450 million copies, been translated into 78 languages, "+
                "and made into eight blockbuster films. She has written three companion volumes for charity: Quidditch Through "+
                "the Ages and Fantastic Beasts and Where to Find Them (to benefit Comic Relief), and The Tales of Beedle the Bard "+
                "(to benefit Lumos), as well as a film script inspired by Fantastic Beasts and Where to Find Them. In 2012, J.K."+
                " Rowling’s digital company, Pottermore, was launched, where fans can enjoy her new writing and immerse themselves"+
                " deeper in the wizarding world. J.K. Rowling has written a novel for adult readers, The Casual Vacancy, and also"+
                " writes crime novels under the pseudonym Robert Galbraith. As well as receiving an OBE for services to children’s "+
                "literature, she has received many awards and honors, including France’s Légion d’honneur and the Hans Christian "+
                "Andersen Award.", harryPotterHomePage.textDesc.getText());
        Thread.sleep(2000);
        harryPotterHomePage.scrollToElementByPointer("window.scrollBy(0,200)");
    }

    @And("^I able to view truncated text description$")
    public void view_some_desc() throws InterruptedException {
        Assert.assertTrue(harryPotterHomePage.textDesc.getText().contains("J.K. Rowling is the author of the record-breaking, "));
    }
}
