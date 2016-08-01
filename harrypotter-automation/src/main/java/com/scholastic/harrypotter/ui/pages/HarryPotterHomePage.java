package com.scholastic.harrypotter.ui.pages;

import org.junit.Assert;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

/**
 * Created by C07HJAXNDJD0 on 7/29/16.
 */
public class HarryPotterHomePage extends HarryPotterBasePage {

    /**
     *  Harry Potter - Home Page - Header
     */

    @FindBy(xpath = "//*[@id=\"unav-stacks-u\"]/a[1]")
    public WebElement signInMenuBtn;

    @FindBy(xpath = "//*[@id=\"unav-stacks\"]/ul/li[2]/a")
    public WebElement registerMenuBtn;

    @FindBy(css = ".video-close.showed")
    public WebElement skipCloseBtn;

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

    public void checkOldCoverBooks(){
        Assert.assertTrue(oldCoverBooks1.getAttribute("class").equals("cover old"));
        Assert.assertTrue(oldCoverBooks2.getAttribute("class").equals("cover old"));
        Assert.assertTrue(oldCoverBooks3.getAttribute("class").equals("cover old"));
        Assert.assertTrue(oldCoverBooks4.getAttribute("class").equals("cover old"));
        Assert.assertTrue(oldCoverBooks5.getAttribute("class").equals("cover old"));
        Assert.assertTrue(oldCoverBooks6.getAttribute("class").equals("cover old"));
        Assert.assertTrue(oldCoverBooks7.getAttribute("class").equals("cover old"));
    }

    public void checkNewCoverBooks(){
        Assert.assertTrue(newCoverBooks1.getAttribute("class").equals("cover new"));
        Assert.assertTrue(newCoverBooks2.getAttribute("class").equals("cover new"));
        Assert.assertTrue(newCoverBooks3.getAttribute("class").equals("cover new"));
        Assert.assertTrue(newCoverBooks4.getAttribute("class").equals("cover new"));
        Assert.assertTrue(newCoverBooks5.getAttribute("class").equals("cover new"));
        Assert.assertTrue(newCoverBooks6.getAttribute("class").equals("cover new"));
        Assert.assertTrue(newCoverBooks7.getAttribute("class").equals("cover new"));
    }

    public HarryPotterHomePage() {
        super();
        PageFactory.initElements(driver, this);
    }

    /**
     *  Check the current url of Harry Potter is contain 'home'
     */
    @Override
    public void verifyMeAsCurrentPage() {
        //TODO Update as soon as Carousel component starts working again
        Assert.assertTrue( "Current page is not Home page", validateTextInCurrentUrl( "home") );
    }
}
