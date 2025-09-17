Feature: Sauce Demo Add Single Product
  As a user of the Sauce Demo application
  I want to be able to add a single product to my cart
  So that I can purchase items from the inventory

  Background:
    Given I navigate to the Sauce Demo login page
    And I login with valid credentials

  Scenario: Add single product to cart and complete checkout
    When I add "Sauce Labs Backpack" to cart
    Then the product should be added to cart
    And the cart badge should show "1"
    When I click on the cart icon
    Then I should be on the cart page
    And the cart should contain "Sauce Labs Backpack"
    When I click the checkout button
    Then I should be on the checkout page
    When I enter checkout information
    And I click continue
    Then I should be on the checkout overview page
    And the order should contain "Sauce Labs Backpack"
    When I click finish
    Then I should be on the checkout complete page
    And I should see the order confirmation message