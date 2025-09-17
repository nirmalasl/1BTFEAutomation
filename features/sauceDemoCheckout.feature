Feature: Sauce Demo Product Checkout
  As a user of the Sauce Demo application
  I want to be able to add products to cart and complete the checkout process
  So that I can purchase items from the store

  Background:
    Given I navigate to the Sauce Demo login page
    And I login with valid credentials

  Scenario: Add single product to cart
    When I add "Sauce Labs Backpack" to cart
    Then the cart badge should show "1"
    And the product should be added to cart

  Scenario: Add multiple products to cart
    When I add "Sauce Labs Backpack" to cart
    And I add "Sauce Labs Bike Light" to cart
    And I add "Sauce Labs Bolt T-Shirt" to cart
    Then the cart badge should show "3"

  Scenario: Remove product from cart
    Given I add "Sauce Labs Backpack" to cart
    When I remove "Sauce Labs Backpack" from cart
    Then the cart badge should not be visible
    And the cart should be empty

  Scenario: View cart details
    Given I add "Sauce Labs Backpack" to cart
    And I add "Sauce Labs Bike Light" to cart
    When I click on the cart icon
    Then I should see the cart page
    And I should see "Sauce Labs Backpack" in cart
    And I should see "Sauce Labs Bike Light" in cart

  Scenario: Continue shopping from cart
    Given I add "Sauce Labs Backpack" to cart
    And I click on the cart icon
    When I click "Continue Shopping" button
    Then I should be redirected to the inventory page

  Scenario: Proceed to checkout from cart
    Given I add "Sauce Labs Backpack" to cart
    And I click on the cart icon
    When I click "Checkout" button
    Then I should see the checkout information page

  Scenario: Complete checkout with valid information
    Given I add "Sauce Labs Backpack" to cart
    And I proceed to checkout
    When I enter checkout information:
      | firstName | lastName | postalCode |
      | John      | Doe      | 12345      |
    And I click "Continue" button
    Then I should see the checkout overview page
    And I should see order summary with "Sauce Labs Backpack"

  Scenario: Complete full checkout process
    Given I add "Sauce Labs Backpack" to cart
    And I proceed to checkout
    And I enter checkout information:
      | firstName | lastName | postalCode |
      | John      | Doe      | 12345      |
    And I click "Continue" button
    When I click "Finish" button
    Then I should see the checkout complete page
    And I should see "Thank you for your order!" message

  Scenario: Checkout with missing information
    Given I add "Sauce Labs Backpack" to cart
    And I proceed to checkout
    When I click "Continue" button without entering information
    Then I should see error message "Error: First Name is required"

  Scenario: Cancel checkout process
    Given I add "Sauce Labs Backpack" to cart
    And I proceed to checkout
    When I click "Cancel" button
    Then I should be redirected to the cart page

  Scenario Outline: Add different products to cart
    When I add "<productName>" to cart
    Then the cart badge should show "1"
    And the product should be added to cart

    Examples:
      | productName                |
      | Sauce Labs Backpack        |
      | Sauce Labs Bike Light      |
      | Sauce Labs Bolt T-Shirt    |
      | Sauce Labs Fleece Jacket   |
      | Sauce Labs Onesie          |
      | Test.allTheThings() T-Shirt (Red) |