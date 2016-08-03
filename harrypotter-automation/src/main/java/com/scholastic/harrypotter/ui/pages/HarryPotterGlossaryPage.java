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

    @FindBy(css = "input[name=\"search-terms\"]")
    public WebElement searchField;

    @FindBy(css = "body > div.site > div > div.main.glossary > ul > li.section.first > ul > li[style=\"display: inline-block;\"] > div.title")
    public WebElement resultTitle;

    @FindBy(css = ".characters-outer > ul.characters > li:nth-child(27) > a")
    public WebElement filterBoookBtn;

    String[] alphabet ={"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"};
    String[] bookCode = {"HPSS","HPCS","HPPA","HPGF","HPOP","HPHP","HPDH"};
    List<WebElement> listAlphabet = new ArrayList<WebElement>(driver.findElements(By.cssSelector(".characters-outer > ul.characters > li > a")));
    int totalListAlphabet = listAlphabet.size();
    List<WebElement> listBook = driver.findElements(By.cssSelector("ul.books > li"));
    int totalListBook      = listBook.size();

    public void checkListAlphabet(){
        for(int i = 1; i < totalListAlphabet; i++){
            WebElement a = driver.findElement(By.cssSelector(".characters-outer > ul.characters > li:nth-child("+i+") > a"));
            Assert.assertEquals(a.getText(), alphabet[i-1].toUpperCase());
        }
    }

    public void clickAlphabet(String input){
        int num = 0;
        for(int i = 1; i < totalListAlphabet; i++){
            if (input.toLowerCase().equals(alphabet[i-1])){
                WebElement alphabetBtn = driver.findElement(By.cssSelector(".characters-outer > ul.characters > li:nth-child("+i+") > a"));
                alphabetBtn.click();
                WebElement alphabetTitle = driver.findElement(By.cssSelector("body > div.site > div > div.main.glossary > ul> li:nth-child("+i+") > div > span"));
                Assert.assertEquals(alphabetTitle.getText(), input);
                break;
            }
        }
    }

    public void checkAllBookDisplay(){
        for(int i = 1; i <= totalListBook; i++){
            String bookCodeElement = driver.findElement(By.cssSelector("ul.books > li:nth-child("+i+")")).getAttribute("data-book-code");
            Assert.assertEquals(bookCode[i-1],bookCodeElement);
        }
    }
}
