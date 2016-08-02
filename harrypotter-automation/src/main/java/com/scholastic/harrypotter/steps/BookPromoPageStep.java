package com.scholastic.harrypotter.steps;

import com.scholastic.harrypotter.ui.pages.HarryPotterBasePage;
import com.scholastic.harrypotter.ui.pages.HarryPotterBookPromoPage;
import cucumber.api.java.en.When;
import gherkin.lexer.Th;
import org.junit.Assert;

/**
 * Created by C07HJAXNDJD0 on 8/2/16.
 */
public class BookPromoPageStep extends HarryPotterBasePage {

    private HarryPotterBookPromoPage harryPotterBookPromoPage = new HarryPotterBookPromoPage();

    @When( "^The 'Book Promo Details' page is loaded$" )
    public void theBookPromoDetailsPageIsLoaded() throws InterruptedException {
        harryPotterBookPromoPage.waitAndValidateVisibility(harryPotterBookPromoPage.backToHarryPotterHomePage);
        harryPotterBookPromoPage.pause(3);
        Assert.assertTrue( "The page didn't load the Book details",
                harryPotterBookPromoPage.validateTextInCurrentUrl("books"));
    }

    @When( "^I click 'See All' Button$" )
    public void iClickSeeAllBtn() throws InterruptedException {
        harryPotterBookPromoPage.scrollElementIntoView(harryPotterBookPromoPage.tittleOfBook);
        harryPotterBookPromoPage.pause(2);
        Assert.assertEquals("See All", harryPotterBookPromoPage.seeAllAndLessBtn.getText());
        harryPotterBookPromoPage.seeAllAndLessBtn.click();
        harryPotterBookPromoPage.pause(3);
    }

    @When( "^Check 'See Less' Button is displayed after clicking 'See All' Button$" )
    public void checkSeeLessBtnIsDisplayed() throws InterruptedException {
        harryPotterBookPromoPage.scrollElementIntoView(harryPotterBookPromoPage.ageSection);
        harryPotterBookPromoPage.pause(3);
        Assert.assertEquals("See Less",harryPotterBookPromoPage.seeAllAndLessBtn.getText());
    }

    @When( "^I click 'See Less' Button$" )
    public void iClickSeeLessBtn() throws InterruptedException {
        harryPotterBookPromoPage.waitForelementToBeClickable(harryPotterBookPromoPage.seeAllAndLessBtn);
        harryPotterBookPromoPage.pause(3);
        harryPotterBookPromoPage.seeAllAndLessBtn.click();
        harryPotterBookPromoPage.pause(3);
    }

    @When( "^Check the button is changed into 'See All'$" )
    public void checkButtonIsChangedIntoSeeAll() throws InterruptedException {
        harryPotterBookPromoPage.scrollElementIntoView(harryPotterBookPromoPage.tittleOfBook);
        harryPotterBookPromoPage.pause(3);
        Assert.assertEquals("See All", harryPotterBookPromoPage.seeAllAndLessBtn.getText());
    }
}
