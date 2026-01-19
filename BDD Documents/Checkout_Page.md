## Feature: Shipping information

#### Background:

- GIVEN I am logged in as standard_user
- and I am on the checkout Page

#### Shipping Information Senario 1: Valid information is entered

- WHEN I enter "Foo" in the "First Name" Field
- and I enter "Bar" in the "Last Name" Field
- and I enter "Foobar" in the "Zip/Postal Code" Field
- and I click "Continue"
- THEN I should see "Checkout: Overview"

#### Shipping Information Senario 2: First name is not entered

- WHEN and I enter "Bar" in the "Last Name" Field
- and I enter "Foobar" in the "Zip/Postal Code" Field
- and I click "Continue"
- THEN I should see "Error: First Name is required"
- and I should see "Checkout: Your information"

#### Shipping Information Senario 3: Last name is not entered

- WHEN I enter "Foo" in the "First Name" Field
- and I enter "Foobar" in the "Zip/Postal Code" Field
- and I click "Continue"
- THEN I should see "Error: Last Name is required"
- and I should see "Checkout: Your information"

#### Shipping Information Senario 4: Postal Code is not entered

- WHEN I enter "Foo" in the "First Name" Field
- and I enter "Bar" in the "Last Name" Field
- and I click "Continue"
- THEN I should see "Error: Postal Code is required"
- and I should see "Checkout: Your information"

## Feature: Price and Item Verification

#### Background:

- GIVEN I am logged in as standard_user
- and I am on the Inventory Page

#### Price Senario 1: Checking out one item

- WHEN I click "Add to cart" on "Sauce Labs Backpack"
- and I go to the checkout page
- and I enter valid credentials
- and I click "continue"
- THEN I should see "Item total: $29.99"
- and I should see "Sauce Labs Backpack"

#### Price Senario 2: Checking out multiple items

- WHEN I click "Add to cart" on "Sauce Labs Backpack" and "Sauce Labs Bike Light"
- and I go to the checkout page
- and I enter valid credentials
- and I click "continue"
- THEN I should see "Item total: $39.98"
- and I should see "Sauce Labs Backpack"
- and I should see "Sauce Labs Bike Light"

#### Price Senario 3: Checking out after removing some items

- WHEN I click "Add to cart" on "Sauce Labs Backpack" and "Sauce Labs Bike Light"
- and I click "Remove" on "Sauce Labs Backpack"
- and I go to the checkout page
- and I enter valid credentials
- and I click "continue"
- THEN I should see "Item total: $9.99"
- and I should see "Sauce Labs Bike Light"
- and I should not see "Sauce Labs Backpack"

#### Price Senario 4: Checking out after removing all items

- WHEN I click "Add to cart" on "Sauce Labs Backpack" and "Sauce Labs Bike Light"
- and I click "Remove" on "Sauce Labs Backpack" and "Sauce Labs Bike Light"
- and I go to the checkout page
- and I enter valid credentials
- and I click "continue"
- THEN I should see "Item total: $0"
- and I should not see "Sauce Labs Backpack"
- and I should not see "Sauce Labs Bike Light"

## Feature: Complete Checkout

#### Background:

- GIVEN I am logged in as standard_user
- and I am on the checkout Page

#### Complete Checkout Senario 1: Complete Checkout

- WHEN I enter valid credentials
- and I click "continue"
- and I click "Finish"
- THEN I should see "Checkout: Complete!"

#### Compelete Checkout Senario 2: Go back to home

- WHEN I enter valid credentials
- and I click "continue"
- and I click "Finish"
- and I click "Back Home"
- THEN I should see "Products"
- and I should see an empty cart
