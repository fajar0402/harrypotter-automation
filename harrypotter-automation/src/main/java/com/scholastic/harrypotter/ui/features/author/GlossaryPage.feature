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
    And I filter with click "A" button
    And I filter with click "B" button
    And I filter with click "C" button
    And I filter with click "D" button
    And I filter with click "E" button
    And I filter with click "F" button
    And I filter with click "G" button
    And I filter with click "H" button
    And I filter with click "I" button
    And I filter with click "J" button
#    And I filter by selected book
