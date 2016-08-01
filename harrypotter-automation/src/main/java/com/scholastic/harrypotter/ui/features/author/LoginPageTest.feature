@Login
  Feature: Harry Potter Login page test

    Background: Go To Harry Potter Login Page
      Given I am at Harry Potter home page
      And I click "Sign in" button from Header menu
      And I see "Sign in now." modal is displayed

    Scenario: Successfully Login
      And I enter username : "computingeating53" and password : "Welcome123"