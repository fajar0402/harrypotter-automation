@BookPromo
  Feature: Harry Potter Book Promo

    Background: Go To Harry Potter Book Promo Details
      Given I am at Harry Potter home page
      And I click 'Skip' button to skip the video
      And I scroll the Home page : "150" Point
      And I scroll the Home page : "750" Point
      When I click "LEARN MORE" Button from Book Promo section
      Then The 'Book Promo Details' page is loaded

    Scenario: User navigates to Home page by clicking 'Back' button
      When I click "Harry Potter Home Page" button to navigated to Home page
      Then User's at Harry Potter Home page

    Scenario: I should be able to click 'See All' Button
      And I click 'See All' Button
      And Check 'See Less' Button is displayed after clicking 'See All' Button
      When I click 'See Less' Button
      Then Check the button is changed into 'See All'
      
    Scenario: I should be able to view 'Get The Book' modal is displayed
      When I click "rGET THIS BOOK" button from Book Promo details page
      Then Check "Get the Book!" modal is displayed

    Scenario: I should be able to Get The Book
      And I click "rGET THIS BOOK" button from Book Promo details page
      And Check "Get the Book!" modal is displayed
      And I click "Get the Book" button from the Modal
      And Check 'Customer form' is displayed
      And Input DOB as "02/04/1992" in 'Customer Form'
      When I click 'Submit' button
      Then Check scholastic store in new window

    @CloseBrowserAfterScenarioFinished
    Scenario: I should be able to Find The Book
      And I click "rGET THIS BOOK" button from Book Promo details page
      And Check "Get the Book!" modal is displayed
      Then I click 'Find Now' button from Get the book modal
      When Check scholastic find book in new window