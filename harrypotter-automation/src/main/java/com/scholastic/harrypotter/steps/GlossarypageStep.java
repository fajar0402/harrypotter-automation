package com.scholastic.harrypotter.steps;

import com.scholastic.harrypotter.ui.pages.HarryPotterBasePage;
import com.scholastic.harrypotter.ui.pages.HarryPotterGlossaryPage;
import cucumber.api.java.en.And;
import cucumber.api.java.en.Then;
import org.junit.Assert;

/**
 * Created by c07nw8vqg1hw on 8/2/16.
 */
public class GlossarypageStep extends HarryPotterBasePage{
    private HarryPotterGlossaryPage glossaryPage = new HarryPotterGlossaryPage();

    @Then("^I landing in Glossary page$")
    public void i_landing_in_Glossary_page(){
//        glossaryPage.waitAndValidateVisibility(glossaryPage.titleTxt);
//        assert glossaryPage.titleTxt.getText() == "Glossary";
//        assert glossaryPage.searchField.isDisplayed() == true;
        glossaryPage.checkListAlphabet();
    }

    @And("^I input \"(.*?)\" in the search field$")
    public void i_input_in_the_search_field(String arg1){
        glossaryPage.waitAndValidateVisibility(glossaryPage.searchField);
        glossaryPage.scrollElementIntoView(glossaryPage.titleTxt);
        glossaryPage.searchField.sendKeys(arg1);
        Assert.assertEquals(glossaryPage.resultTitle.getText(), arg1);
    }

    @And("^I filter with click \"(.*?)\" button$")
    public void i_Click_button(String arg1) throws InterruptedException {
        glossaryPage.clickAlphabet(arg1);
        Thread.sleep(2000);
    }

    @And("^I filter by selected book$")
    public void i_filter_by_book() throws InterruptedException {
        glossaryPage.filterBookBtn.click();
        glossaryPage.checkAllBookDisplay();
    }
}
