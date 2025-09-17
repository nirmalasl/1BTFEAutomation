Feature: Sauce Demo Login
  As a user of the Sauce Demo application
  I want to be able to login with valid credentials
  So that I can access the product inventory

  Background:
    Given I navigate to the Sauce Demo login page

  Scenario: Successful login with valid credentials
    When I enter username "standard_user"
    And I enter password "secret_sauce"
    And I click the login button
    Then I should be redirected to the inventory page
    And I should see the products page title

  Scenario: Failed login with invalid credentials
    When I enter username "invalid_user"
    And I enter password "wrong_password"
    And I click the login button
    Then I should see an error message "Epic sadface: Username and password do not match any user in this service"

  Scenario: Failed login with locked user
    When I enter username "locked_out_user"
    And I enter password "secret_sauce"
    And I click the login button
    Then I should see an error message "Epic sadface: Sorry, this user has been locked out."