package com.scholastic.harrypotter.steps;

import com.scholastic.harrypotter.ui.pages.HarryPotterHomePage;
import com.scholastic.harrypotter.ui.pages.HarryPotterLoginPage;
import cucumber.api.java.en.When;
import junit.framework.Assert;

/**
 * Created by C07HJAXNDJD0 on 8/1/16.
 */
public class HarryLoginPageStep {

    private HarryPotterHomePage harryPotterHomePage = new HarryPotterHomePage();
    private HarryPotterLoginPage harryPotterLoginPage = new HarryPotterLoginPage();

    @When("^I see \"([^\"]*)\" modal is displayed$")
    public void iSeeLoginPageDisplayed(String text){
        harryPotterLoginPage.verifyMeAsCurrentPage();
        harryPotterLoginPage.waitAndValidateVisibility(harryPotterLoginPage.loginModalText);
        Assert.assertEquals(text + "is not displayed", text, harryPotterLoginPage.loginModalText.getText());
    }

    private String getUsername;
    @When("^I Enter username : \"([^\"]*)\"$")
    public void iEnterUsername(String username) throws InterruptedException {
        getUsername = harryPotterLoginPage.inputUsername(username);
    }

    @When("^I Enter password : \"([^\"]*)\"$")
    public void iEnterPassword(String password) throws InterruptedException {
        harryPotterLoginPage.inputPassword(password);
    }

    @When("^I click \"([^\"]*)\" button from 'Sign In' modal$")
    public void iClickGOBtnFromLoginModal(String checkAssertBtn){
        harryPotterLoginPage.waitForelementToBeClickable(harryPotterLoginPage.signInGoBtn);
        Assert.assertTrue(harryPotterLoginPage.signInGoBtn.getAttribute("alt").equals(checkAssertBtn));
        harryPotterLoginPage.signInGoBtn.click();
        harryPotterLoginPage.pause(3);
    }

    @When( "^System validates username and password$" )
    public void checkUserSuccessfullLogin() throws InterruptedException {
        harryPotterLoginPage.waitAndValidateVisibility(harryPotterHomePage.signOutBtn);
        Assert.assertTrue(harryPotterHomePage.loginAccount.getText().equals("Welcome, " + this.getUsername));
    }
}
