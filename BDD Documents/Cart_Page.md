## Feature: Checking Cart

#### Background:

- GIVEN I am logged in as standard_user
- and I am on the Inventory Page

#### Checking Cart Senario 1: Check for 1 item added

- WHEN I click "Add to cart" on "Sauce Labs Backpack"
- and I navigate to my cart
- THEN I should see "Sauce Labs Backpack"

#### Checking Cart Senario 2: Check for multiple items added

- WHEN I click "Add to cart" on "Sauce Labs Backpack" and "Sauce Labs Bike Light"
- and I navigate to my cart
- THEN I should see "Sauce Labs Backpack" and "Sauce Labs Bike Light"

#### Checking Car Senario 3: Check for empty Cart

- WHEN I navigate to my cart
- THEN I should see no items

## Feature: Navigation

#### Background:

- GIVEN I am logged in as standard_user
- and I am on the Cart Page

#### Navigation Senario 1: Return to inventory page

- WHEN I Click on the "Continue Shopping" Button
- THEN I should see "Products"

#### Navigation Senario 2: Go to Checkout

- WHEN I Click on the "Checkout" Button
- THEN I should see "Checkout: Your Information"

## Feature: Removing an Item

#### Background:

- GIVEN I am logged in as standard_user
- and I am on the Inventory Page

#### Remove Senario 1: Remove 1 item from Cart

- WHEN I click "Add to cart" on "Sauce Labs Backpack"
- and I navigate to my cart
- and I remove "Sauce Labs Backpack"
- THEN I should not see "Sauce Labs Backpack"

#### Remove Senario 2: Remove multiple items from Cart

- WHEN I click "Add to cart" on "Sauce Labs Backpack" and "Sauce Labs Bike Light"
- and I navigate to my cart
- and I remove "Sauce Labs Backpack" and "Sauce Labs Bike Light"
- THEN I should not see "Sauce Labs Backpack" and "Sauce Labs Bike Light"
