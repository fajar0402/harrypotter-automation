package com.scholastic.harrypotter.steps;

import com.scholastic.harrypotter.ui.pages.HarryPotterBasePage;
import com.scholastic.utils.StatusManager;
import cucumber.api.java.After;
import cucumber.api.java.Before;

/**
 * Created by C07HJAXNDJD0 on 8/4/16.
 */
public class HarryPotterHooks {

    private HarryPotterBasePage harryPotterBasePage = new HarryPotterBasePage();
    private StatusManager setStatus;

    @Before("@SetBrowser")
    public void setUp() {
        setStatus = new StatusManager();
    }

    @After("@CloseBrowserAfterScenarioFinished")
    public void closeBrowserAfterScenarioFinished(){
        harryPotterBasePage.closeBrowser();
    }

}
