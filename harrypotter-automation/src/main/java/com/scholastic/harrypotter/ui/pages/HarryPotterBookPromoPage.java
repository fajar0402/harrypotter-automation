package com.scholastic.harrypotter.ui.pages;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.testng.Assert;

import java.util.Iterator;
import java.util.Set;

/**
 * Created by C07HJAXNDJD0 on 8/2/16.
 */
public class HarryPotterBookPromoPage extends HarryPotterBasePage {

    @FindBy(css = "body > div.site.detail > div > div.back-to-hp > a")
    public WebElement backToHarryPotterHomePage;

    @FindBy(css = "a.detail-link.to-press.underline")
    public WebElement seeAllAndLessBtn;

    @FindBy(css = "li.title")
    public WebElement tittleOfBook;

    @FindBy(xpath = "/html/body/div[2]/div/div[2]/div[1]/div/div[2]/div/div[3]/ul/li[5]/a/div")
    public WebElement getThisBookBtn;

    @FindBy(css = "div.age")
    public WebElement ageSection;

    /**
     *  Get the Book
     */

    @FindBy(css = "#ecommPOP > a")
    public WebElement closeModalBtn;

    @FindBy(css = "#ecommPOPcontent > h3")
    public WebElement getTheBookTxt;

    @FindBy(css = "#ecommPOPcontent > div.ecomm-sso > a > span")
    public WebElement getTheBookBtn;

    @FindBy(css = "#frmGMap > input.Find")
    public WebElement findNowBtn;

    @FindBy(css = "#frmGMap > input.Zip")
    public WebElement zipCodeField;

    /**
     *  Customer form to input DOB
     */

    @FindBy(css = "#ageScreenerContainer > h2:nth-child(2)")
    public WebElement customerFormTxt;

    @FindBy(css = "input.b-day")
    public WebElement inputDOB;

    @FindBy(css = "input.btn")
    public WebElement submitBtn;

    /**
     *  New Windows page
     */

    @FindBy(css = "div.header")
    public WebElement headerTxtNewWindows;

    @FindBy(css = "img[src=\"images/exit_h_tween.gif\"]")
    public WebElement headerTxtFindBookNewWindow;

    public String inputZipCode(String zipcode){
        waitAndValidateVisibility(zipCodeField);
        zipCodeField.sendKeys(zipcode);
        return zipcode;
    }

    public void scholasticStoreOnlineNewWindow() throws InterruptedException {
        /**
         * This method will gives you the handles of all opened windows
         */
        String parentWindow = driver.getWindowHandle();
        Set<String> childWindow = driver.getWindowHandles();
        for(String windowHandle  : childWindow){
            if(!windowHandle.equals(parentWindow)){
                driver.switchTo().window(windowHandle);
                pause(3);
                validateTextInCurrentUrl("store.scholastic.com");
                Assert.assertTrue(headerTxtNewWindows.getText().contains("You are about to enter the"));
                pause(3);
                driver.close();
                driver.switchTo().window(parentWindow);
            }
        }
    }

    public void scholasticFindBookNewWindow(String zipcode) throws InterruptedException {
        /**
         * This method will gives you the handles of all opened windows
         */
        String parentWindow = driver.getWindowHandle();
        Set<String> childWindow = driver.getWindowHandles();
        for(String windowHandle  : childWindow){
            if(!windowHandle.equals(parentWindow)){
                driver.switchTo().window(windowHandle);
                pause(3);
                validateTextInCurrentUrl(zipcode);
                Assert.assertTrue(headerTxtFindBookNewWindow.isDisplayed());
                pause(3);
                driver.close();
                driver.switchTo().window(parentWindow);
            }
        }
    }

    public HarryPotterBookPromoPage() {
        super();
        PageFactory.initElements(driver, this);
    }
}
