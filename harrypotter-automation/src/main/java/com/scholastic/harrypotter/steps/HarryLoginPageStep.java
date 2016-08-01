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

    @When("^I Enter username : \"([^\"]*)\"$")
    public void iEnterUsername(String username) throws InterruptedException {
        harryPotterLoginPage.waitForelementToBeClickable(harryPotterLoginPage.inputUsername);
        harryPotterLoginPage.inputUsername.sendKeys(username);
        harryPotterLoginPage.pause(3);
    }

    @When("^I Enter password : \"([^\"]*)\"$")
    public void iEnterPassword(String password) throws InterruptedException {
        harryPotterLoginPage.waitForelementToBeClickable(harryPotterLoginPage.inputPassword);
        harryPotterLoginPage.inputPassword.sendKeys(password);
        harryPotterLoginPage.pause(3);
    }

    @When( "^I enter username : \"([^\"]*)\" and password : \"([^\"]*)\"$" )
    public void checkUserSuccessfullLogin(String username, String password) throws InterruptedException {
        iEnterUsername(username);
        iEnterPassword(password);
        harryPotterLoginPage.signInGoBtn.click();
        harryPotterLoginPage.waitAndValidateVisibility(harryPotterHomePage.signOutBtn);
        Assert.assertTrue(harryPotterHomePage.loginAccount.getText().equals("Welcome, " + username));
    }
}
