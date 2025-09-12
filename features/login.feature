Feature: Login Functionality for Sauce Demo

  Scenario: Successful login with valid credentials
    Given I navigate to Sauce Demo website
    When I enter username "standard_user"
    And I enter password "secret_sauce"
    And I click on the login button
    Then I should be logged in successfully
    When I click on burger menu
    And I click on logout link
    Then I should be logged out successfully
    Then I close the browser