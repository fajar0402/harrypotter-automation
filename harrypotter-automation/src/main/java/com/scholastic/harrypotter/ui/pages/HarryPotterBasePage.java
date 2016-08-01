package com.scholastic.harrypotter.ui.pages;

import com.scholastic.aem.pages.BasePage;
import com.scholastic.driver.DriverManager;
import com.scholastic.utils.Log;
import org.junit.Assert;
import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.List;


public class HarryPotterBasePage extends BasePage {

    public HarryPotterBasePage(){
        super();
    }

    @Override
    public void verifyMeAsCurrentPage() {
        //Overriding method from abstract class
    }

    public boolean validateTextInCurrentUrl(String text ) {
        return driver.getCurrentUrl().contains( text );
    }

    public boolean findElements (WebElement webElement, By selector) {
        List<WebElement> list = webElement.findElements(selector);
        return !list.isEmpty();
    }

    public boolean waitAndValidateVisibility(WebElement element) {
        try {
            wait = new WebDriverWait( driver, DriverManager.getWaitTime());
            wait.until(ExpectedConditions.visibilityOf(element));
            return true;
        }catch(TimeoutException e){
            //No exception is being thrown because we don't want to fail the step here.
            //The fail of the validation should be performed in the assertion
            Log.info("Time out waiting for element: " + element);
            return false;
        }
    }

    public void scrollToElementByPointer(String valueOfScrolls) throws InterruptedException {
        Thread.sleep(3000);
        JavascriptExecutor js = (JavascriptExecutor) driver;
        js.executeScript(valueOfScrolls,"");
        Thread.sleep(5000);
    }

    public void scrollElementIntoView(WebElement element) {
        ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", element);
    }

    public void validatePlaceHolderTagText( WebElement webElement, String placeHolderText ) {
        waitForVisibility( webElement );
        Assert.assertTrue( webElement + " is not displayed",
                webElement.getAttribute( "placeholder" ).contains( placeHolderText ) );
    }

    public void setNewDefaultTimeOut(int value){
        driverManager = DriverManager.getInstance();
        driverManager.setNewDefaultTimeOut(value);
    }

    public void setDefaultTimeOut(){
        driverManager = DriverManager.getInstance();
        driverManager.setDefaultTimeOut();
    }
}
