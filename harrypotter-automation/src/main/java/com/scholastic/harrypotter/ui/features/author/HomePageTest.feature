@Animation
Feature: Harry Potter Home Page Animation

  Background: Go To Harry Potter Home Page
    Given I am at Harry Potter home page
    And I click 'Skip' button to skip the video

  @SmokeTest
  Scenario: I want to see harry potter animations in home page
    And I see the Harry Potter Image Logo
    When I scroll the Home page : "150" Point
    Then I see harry potter animations in Home page

  @SmokeTest
  Scenario: I should be able to click 'Check out new cover art by Kazu Kibuishi!' Button'
    And I scroll the Home page : "150" Point
    And I see the "Check out new cover art by Kazu Kibuishi!" button is displayed
    And I scroll the Home page : "150" Point
    And I check the books is display with old cover
    When I click 'Check out new cover art by Kazu Kibuishi!' Button
    Then I see the cover books is changed

  Scenario: I should be able to see the book details in 'Book Promo' section
    And 


