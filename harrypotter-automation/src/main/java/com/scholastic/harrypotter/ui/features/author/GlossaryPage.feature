@SmokeTest
Feature: Harry Potter Glossary Filter

  Background: Go To Harry Potter Home Page
    Given I am at Harry Potter home page
    And I click 'Skip' button to skip the video
    And I see the Harry Potter Image Logo
    And I scroll into 'See More' button
    When I click 'See More' button
    Then I landing in Glossary page

  Scenario: I want to check filter in glossary page
#    And I input "Giant" in the search field