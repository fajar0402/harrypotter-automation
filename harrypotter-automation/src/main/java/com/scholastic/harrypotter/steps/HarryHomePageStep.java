package com.scholastic.harrypotter.steps;

import com.scholastic.harrypotter.ui.pages.HarryPotterBasePage;
import com.scholastic.harrypotter.ui.pages.HarryPotterHomePage;
import cucumber.api.java.en.Given;
import cucumber.api.java.en.When;
import junit.framework.Assert;

/**
 * Created by C07HJAXNDJD0 on 7/29/16.
 */
public class HarryHomePageStep {

    private HarryPotterHomePage harryPotterHomePage = new HarryPotterHomePage();

    @Given( "^I am at Harry Potter home page$" )
    public void iAmAtHarryHomePage() {
        harryPotterHomePage.navigateTo( "publish", HarryPotterBasePage.getHomePagePath() );
        harryPotterHomePage.setNewDefaultTimeOut(30);
        harryPotterHomePage.verifyMeAsCurrentPage();
        harryPotterHomePage.setDefaultTimeOut();
    }

    @When( "^I click 'Skip' button to skip the video$" )
    public void iClickSkipBtn(){
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

}
