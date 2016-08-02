@Login
  Feature: Harry Potter Login page test

    Background: Go To Harry Potter Login Page
      Given I am at Harry Potter home page
      And I click "Sign in" button from Header menu
      And I see "Sign in now." modal is displayed

    Scenario: Successfully Login
      And I Enter username : "computingeating53"
      And I Enter password : "Welcome123"
      When I click "Go" button from 'Sign In' modal
      Then System validates username and password