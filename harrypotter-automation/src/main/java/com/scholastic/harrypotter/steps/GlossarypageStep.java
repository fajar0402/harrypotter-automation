package com.scholastic.harrypotter.steps;

import com.scholastic.harrypotter.ui.pages.HarryPotterBasePage;
import com.scholastic.harrypotter.ui.pages.HarryPotterGlossaryPage;
import cucumber.api.java.en.And;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

/**
 * Created by c07nw8vqg1hw on 8/2/16.
 */
public class GlossarypageStep extends HarryPotterBasePage{
    private HarryPotterGlossaryPage glossaryPage = new HarryPotterGlossaryPage();

    @Then("^I landing in Glossary page$")
    public void i_landing_in_Glossary_page(){
        Assert.assertEquals("Glossary",driver.findElement(By.className("hero-heading")).getText().trim());
    }

    @When("^Check List of Alphabets in Glossary page$")
    public void checkListOfAlphabetsInGlossaryPage(){
        glossaryPage.checkListAlphabet();
    }

    private String getInputValueinSearchTerm;
    @And("^I input \"(.*?)\" in the search field$")
    public void i_input_in_the_search_field(String arg1){
        getInputValueinSearchTerm = glossaryPage.inputValue(arg1);
    }

    @And("^I click \"(.*?)\" button from Alphabet list$")
    public void iClickButtonFromAlphabetList(String arg1) throws InterruptedException {
        glossaryPage.clickAlphabet(arg1);
        pause(2);
    }

    @When("^I see the result of filtering by search term$")
    public void iSeeTheResultOfFilteringBySearchTerm() throws InterruptedException {
        scrollToElementByPointer("130");
        WebElement element = driver.findElement(By.xpath("/html/body/div[2]/div/div[2]/ul/li[1]/ul/li[3]/div[2]"));
        element.getText().contains(this.getInputValueinSearchTerm);
        pause(3);
    }

    @When("^I click 'Search By Book' button$")
    public void iClickSearchByBookBtn(){
        WebElement searchByBookBtn = driver.findElement(By.className("text"));
        glossaryPage.clickAlphabet("A");
        pause(2);
        searchByBookBtn.click();
        pause(3);
    }

    @And("^I see all book of harry potter is displayed$")
    public void iSeeAllBook() throws InterruptedException {
        glossaryPage.checkAllBookDisplay();
        pause(2);
    }
}
