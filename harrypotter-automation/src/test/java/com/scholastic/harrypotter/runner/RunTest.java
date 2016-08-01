package com.scholastic.harrypotter.runner;

import com.comcast.zucchini.TestContext;
import com.comcast.zucchini.ZucchiniOutput;
import com.scholastic.runner.AbstractZucchiniCustomTest;
import cucumber.api.CucumberOptions;

/**
 * Created by C07HJAXNDJD0 on 7/28/16.
 */

@CucumberOptions( features = "src/main/java", glue = { "com.scholastic.kids.steps",
        "com.scholastic.aem.steps" }, plugin = { "pretty"}, tags = {"@TestingNow", "~@ignore"})

@ZucchiniOutput( )
public class RunTest extends AbstractZucchiniCustomTest {
    @Override
    public void run() {
        super.run();
    }

    @Override
    public void setup( TestContext out ) {
    }
}
