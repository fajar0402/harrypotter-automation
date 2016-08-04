@SmokeTest
Feature: Harry Potter Glossary Filter

  Background: Go To Harry Potter Home Page
    Given I am at Harry Potter home page
    And I click 'Skip' button to skip the video
    And I see the Harry Potter Image Logo
    And I scroll the Home page : "130" Point
    When I click 'See More' button
    Then I landing in Glossary page

  Scenario: I want to filter book by search term
    When I input "Accio" in the search field
    Then I see the result of filtering by search term

  Scenario: I should be able to choose the list of alphabets
    And Check List of Alphabets in Glossary page
    And I click "A" button from Alphabet list
    And I click "B" button from Alphabet list
    And I click "C" button from Alphabet list
    And I click "D" button from Alphabet list
    And I click "E" button from Alphabet list
    And I click "F" button from Alphabet list
    And I click "G" button from Alphabet list
    And I click "H" button from Alphabet list
    And I click "I" button from Alphabet list
    And I click "J" button from Alphabet list

  @CloseBrowserAfterScenarioFinished
  Scenario: I should be able to search by book
    When I click 'Search By Book' button
    Then I see all book of harry potter is displayed
