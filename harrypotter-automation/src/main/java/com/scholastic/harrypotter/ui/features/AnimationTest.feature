@Animation
Feature: Harry Potter Home Page Animation

  Background: Go To Harry Potter Home Page
    Given I am at Harry Potter home page
    And I click 'Skip' button to skip the video

  Scenario: I want to see harry potter animations in home page
    And I see the Harry Potter Image Logo
    When I scroll the Home page : "150" Point
    Then I see harry potter animations in Home page

  Scenario: I should be able to click 'Check out new cover art by Kazu Kibuishi!' Button'
    And I scroll the Home page : "150" Point
    And I see the "Check out new cover art by Kazu Kibuishi!" button is displayed
    And I scroll the Home page : "150" Point
    And I check the books is display with old cover
    When I click 'Check out new cover art by Kazu Kibuishi!' Button
    Then I see the cover books is changed

  Scenario: I should be able to view and close video
    When I scroll the Home page : "150" Point
    When I scroll the Home page : "1875" Point
    And I able to click 'play' button
    And I able to close 'video' window

  @CloseBrowserAfterScenarioFinished
  Scenario: I should be able to show all text and hide text description
    And I scroll the Home page : "150" Point
    And I scroll the Home page : "2450" Point
    When I click "See All"  button
    And I able to view all text description display
    When I click "Close"  button
    And I able to view truncated text description






