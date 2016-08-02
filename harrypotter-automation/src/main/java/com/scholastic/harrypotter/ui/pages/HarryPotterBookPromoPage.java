package com.scholastic.harrypotter.ui.pages;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

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

    @FindBy(css = "div.get")
    public WebElement getThisBookBtn;

    @FindBy(css = "div.age")
    public WebElement ageSection;

    public HarryPotterBookPromoPage() {
        super();
        PageFactory.initElements(driver, this);
    }
}
