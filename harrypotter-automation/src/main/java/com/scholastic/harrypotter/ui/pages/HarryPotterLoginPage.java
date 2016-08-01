package com.scholastic.harrypotter.ui.pages;

import org.junit.Assert;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.How;
import org.openqa.selenium.support.PageFactory;

/**
 * Created by C07HJAXNDJD0 on 8/1/16.
 */
public class HarryPotterLoginPage extends HarryPotterBasePage {

    @FindBy(how = How.CSS, using = "#kids_registration_sign_in_head")
    public WebElement loginModalText;

    @FindBy(css = "input[name=\"username\"]")
    public WebElement inputUsername;

    @FindBy(css = "input[name=\"password\"]")
    public WebElement inputPassword;

    @FindBy(css = "#kids_registration_sign_in_submit")
    public WebElement signInGoBtn;

    @FindBy(css = "a.kids_registration_close")
    public WebElement signInCloseBtn;

    public HarryPotterLoginPage() {
        super();
        PageFactory.initElements(driver, this);
    }

    /**
     *  Check the current url of Harry Potter is on Login page
     */
    @Override
    public void verifyMeAsCurrentPage() {
        //TODO Update as soon as Carousel component starts working again
        Assert.assertTrue( "Current page is not Login page", waitAndValidateVisibility(loginModalText));
    }
}
