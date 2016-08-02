package com.scholastic.harrypotter.ui.pages;

import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by c07nw8vqg1hw on 8/2/16.
 */
public class HarryPotterGlossaryPage extends HarryPotterBasePage{
    @FindBy(css = "body > div.site > div > div.main.glossary > div.header-outer > div > div.hero > div.hero-heading > h1")
    public WebElement titleTxt;

    @FindBy(css = "body > div.site > div > div.main.glossary > div.header-outer > div > div.hero > div.hero-search > form > input[type=\"text\"]")
    public WebElement searchField;

    @FindBy(css = "body > div.site > div > div.main.glossary > ul > li.section.first > ul > li[style=\"display: inline-block;\"] > div.title")
    public WebElement resultTitle;

    public void checkListAlphabet(){
        String[] alphabet ={"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"};
        List<WebElement> listAlphabet = new ArrayList<WebElement>(driver.findElements(By.cssSelector(".characters-outer > ul.characters > li > a")));
        int totalList = listAlphabet.size();
        for(int i = 1; i < totalList; i++){
            WebElement a = driver.findElement(By.cssSelector(".characters-outer > ul.characters > li:nth-child("+i+") > a"));
            Assert.assertEquals(a.getText(), alphabet[i-1].toUpperCase());
        }
    }
}
