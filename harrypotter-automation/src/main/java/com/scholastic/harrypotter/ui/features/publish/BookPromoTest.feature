@BookPromo
  Feature: Harry Potter Book Promo

    Background: Go To Harry Potter Book Promo Details
      Given I am at Harry Potter home page
      And I click 'Skip' button to skip the video
      And I scroll the Home page : "150" Point
      And I scroll the Home page : "750" Point
      When I click "LEARN MORE" Button from Book Promo section
      Then The 'Book Promo Details' page is loaded

    Scenario: I should be able to click 'See All' Button
      And I click 'See All' Button
      And Check 'See Less' Button is displayed after clicking 'See All' Button
      When I click 'See Less' Button
      Then Check the button is changed into 'See All'