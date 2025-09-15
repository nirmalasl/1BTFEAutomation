Feature: Login Functionality for Sauce Demo

  Scenario Outline: Login with different credentials
    Given I navigate to Sauce Demo website
    When I enter username from test data "<userType>"
    And I enter password from test data "<userType>"
    And I click on the login button
    Then I should see the expected result for "<userType>"
    When I click on burger menu
    And I click on logout link
    Then I should be logged out successfully
    Then I close the browser

    Examples:
      | userType    |
      | validUser   |

 