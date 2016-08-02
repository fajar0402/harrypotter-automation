package com.scholastic.harrypotter.ui.pages;

import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

/**
 * Created by C07HJAXNDJD0 on 7/29/16.
 */
public class HarryPotterHomePage extends HarryPotterBasePage {

    /**
     *  Harry Potter - Home Page - Header
     */

    @FindBy(css = "#unav-stacks > ul")
    public WebElement rightMenuHeader;

    @FindBy(xpath = "//*[@id=\"unav-stacks-u\"]/a[1]")
    public WebElement signInMenuBtn;

    @FindBy(xpath = "//*[@id=\"unav-stacks\"]/ul/li[2]/a")
    public WebElement registerMenuBtn;

    @FindBy(css = ".video-close.showed")
    public WebElement skipCloseBtn;

    @FindBy(css = "#unav-stacks-u > ul > li:nth-child(1)")
    public WebElement loginAccount;

    @FindBy(css = "#unav-stacks-u > ul > li:nth-child(2) > a")
    public WebElement signOutBtn;

    /**
     *  Animation
     */

    @FindBy(xpath = "/html/body/div[2]/div/div/div[1]/div/div[2]/div[3]/div/div[2]/a/span")
    public WebElement checkOutNewCoverBtn;

    @FindBy(xpath = "/html/body/div[2]/div/div/div[1]/div/div[2]/div[3]/div/div[1]/img")
    public WebElement harryPotterTextImage;

    @FindBy(xpath = "/html/body/div[2]/div/div/div[1]/div/div[2]/div[3]/div/div[2]/h2")
    public WebElement booksTittleTxtAfterScroll;

    @FindBy(css = "img[src=\"/content/dam/scholastic/harrypotter/image/covers/cover-1.jpg\"]")
    public WebElement oldCoverBooks1;

    @FindBy(css = "img[src=\"/content/dam/scholastic/harrypotter/image/covers/cover-2.jpg\"]")
    public WebElement oldCoverBooks2;

    @FindBy(css = "img[src=\"/content/dam/scholastic/harrypotter/image/covers/cover-3.jpg\"]")
    public WebElement oldCoverBooks3;

    @FindBy(css = "img[src=\"/content/dam/scholastic/harrypotter/image/covers/cover-4.jpg\"]")
    public WebElement oldCoverBooks4;

    @FindBy(css = "img[src=\"/content/dam/scholastic/harrypotter/image/covers/cover-5.jpg\"]")
    public WebElement oldCoverBooks5;

    @FindBy(css = "img[src=\"/content/dam/scholastic/harrypotter/image/covers/cover-6.jpg\"]")
    public WebElement oldCoverBooks6;

    @FindBy(css = "img[src=\"/content/dam/scholastic/harrypotter/image/covers/cover-7.jpg\"]")
    public WebElement oldCoverBooks7;

    @FindBy(css = "img[src=\"/content/dam/scholastic/harrypotter/image/covers/cover-new-1.jpg\"]")
    public WebElement newCoverBooks1;

    @FindBy(css = "img[src=\"/content/dam/scholastic/harrypotter/image/covers/cover-new-2.jpg\"]")
    public WebElement newCoverBooks2;

    @FindBy(css = "img[src=\"/content/dam/scholastic/harrypotter/image/covers/cover-new-3.jpg\"]")
    public WebElement newCoverBooks3;

    @FindBy(css = "img[src=\"/content/dam/scholastic/harrypotter/image/covers/cover-new-4.jpg\"]")
    public WebElement newCoverBooks4;

    @FindBy(css = "img[src=\"/content/dam/scholastic/harrypotter/image/covers/cover-new-5.jpg\"]")
    public WebElement newCoverBooks5;

    @FindBy(css = "img[src=\"/content/dam/scholastic/harrypotter/image/covers/cover-new-6.jpg\"]")
    public WebElement newCoverBooks6;

    @FindBy(css = "img[src=\"/content/dam/scholastic/harrypotter/image/covers/cover-new-7.jpg\"]")
    public WebElement newCoverBooks7;

    @FindBy(css = ".button.bordered.big-gap")
    public WebElement seeMoreBtn;

    @FindBy(css = ".input > input[type=\"text\"]")
    public WebElement accioTxt;

    /**
     *  Book Promo
     */

    @FindBy(css = ".button.bordered.small-gap")
    public WebElement bookPromoLearnMoreBtn;

    public void checkOldCoverBooks(){
        List<WebElement> elements = new ArrayList<WebElement>(driver.findElements(By.cssSelector(".cover-holder")));
        int total = elements.size();
        for (int i = 1; i < total; ++i){
            WebElement element = driver.findElement(By.cssSelector("img[src=\"/content/dam/scholastic/harrypotter/image/covers/cover-"+i+".jpg\"]"));
            Assert.assertTrue(element.getAttribute("class").equals("cover old"));
        }
    }

    public void checkNewCoverBooks(){
        List<WebElement> elements = new ArrayList<WebElement>(driver.findElements(By.cssSelector(".cover-holder")));
        int total = elements.size();
        for (int i = 1; i < total; ++i){
            WebElement element = driver.findElement(By.cssSelector("img[src=\"/content/dam/scholastic/harrypotter/image/covers/cover-new-"+i+".jpg\"]"));
            Assert.assertTrue(element.getAttribute("class").equals("cover new"));
        }
    }

    public void getTxtInRightMenuHeader(int index){
        List<WebElement> rightMenuOptions = rightMenuHeader.findElements(By.cssSelector("li"));
        WebElement rightMenuOption = rightMenuOptions.get(index);
        rightMenuOption.getText();
    }

    public HarryPotterHomePage() {
        super();
        PageFactory.initElements(driver, this);
    }
}
