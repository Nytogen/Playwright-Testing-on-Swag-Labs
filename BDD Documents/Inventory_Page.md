## Feature: Adding and removing Items

#### Background:

- GIVEN I am logged in as standard_user
- and I am on the Inventory Page

#### Senario 1: User adds one item

- WHEN I click "Add to cart" on "Sauce Labs Backpack"
- THEN I should see the cart have a red circle badgewith the number 1
- and I should not see "Add to cart" on "Sauce Labs Backpack"
- and I should see "remove" on "Sauce Labs Backpack"

#### Senario 2: User adds multiple items

- WHEN I click "Add to cart" on "Sauce Labs Backpack"
- and I click "Add to cart" on "Sauce Labs Bike Light"
- THEN I should see the cart have a red circle badge with the number 2
- and I should not see "Add to cart" on "Sauce Labs Backpack"
- and I should see "remove" on "Sauce Labs Backpack"
- and I should not see "Add to cart" on "Sauce Labs Bike Light"
- and I should see "remove" on "Sauce Labs Bike Light"

#### Senario 3: User removes an item

- WHEN I click "Add to cart" on "Sauce Labs Backpack"
- and I click "remove" on "Sauce Labs Backpack"
- THEN I should not see the cart have a red circle badge
- and I should "Add to cart" on "Sauce Labs Backpack"
- and I should not see "remove" on "Sauce Labs Backpack"

#### Senario 4: User logs out and logs back in with a saved cart

- WHEN I click "Add to cart" on "Sauce Labs Backpack"
- and I logout
- and I log back in as "standard_user"
- THEN I should see the cart have a red circle badge with the number 1
- and I should not see "Add to cart" on "Sauce Labs Backpack"
- and I should see "remove" on "Sauce Labs Backpack"

## Feature: Sorting/filter Items

#### Background:

- GIVEN I am logged in as standard_user
- and I am on the Inventory Page

#### Senario 1: User sorts items is ascending alphabetical order

- WHEN I click the filter button
- and I select "Name (A to Z)"
- THEN I should see item "Sauce Labs Backpack" as the first item
- and I should see item "Test.allTheThings() T-Shirt (Red)" as the last item

#### Senario 2: User sorts items is descending alphabetical order

- WHEN I click the filter button
- and I select "Name (Z to A)"
- THEN I should see item "Test.allTheThings() T-Shirt (Red)" as the first item
- and I should see item "Sauce Labs Backpack" as the last item

#### Senario 3: User sorts items is ascending price order

- WHEN I click the filter button
- and I select "Price (low to high)"
- THEN I should see item "Sauce Labs Onesie" as the first item
- and I should see item "Sauce Labs Fleece Jacket" as the last item

#### Senario 4: User sorts items is descending price order

- WHEN I click the filter button
- and I select "Price (high to low)"
- THEN I should see item "Sauce Labs Fleece Jacket" as the first item
- and I should see item "Sauce Labs Onesie" as the last item

## Feature: Logout

#### Background

- GIVEN I am logged in as standard_user
- and I am on the Inventory Page

#### Senario 1: user decides to logout

- WHEN I click the burger menu on the top left
- and I click on "Logout"
- THEN I should see "Login"
- and I shouldn't see "Products"

## Feature: Naviagtion

#### Background

- GIVEN I am logged in as standard_user
- and I am on the Inventory Page

#### Senario 1: User navigates to the About Page

- WHEN I click the burger menu on the top left
- and I click on "About"
- THEN I should be direct to the site "saucelabs.com"

#### Senario 2: User navigates to the Cart Page

- WHEN I click the shopping cart icon on the top right
- and I click on "About"
- THEN I should see "Your Cart"
- and I should not see "Products"

#### Senario 3: User naviagtes to the All Items Page

- WHEN I click the shopping cart icon on the top right
- and I click on the burger menu on the top left
- and I click "All items"
- THEN I should see "Products"
- and I should not see "Your Cart"

#### Senario 4: User Clicks on an item

- WHEN I click on "Sauce Labs Backpack"
- THEN I should see "Back to products"
- and I should not see "Sauce Labs Bike Light"

#### Senario 5: User resets app state

- WHEN I click "Add to cart" on "Sauce Labs Backpack"
- and I click on the burger menu on the top left
- and I click "Reset App State"
- THEN I should not see the cart have a red circle badge
- and I should see "Add to cart" on "Sauce Labs Backpack"
- and I should not see "remove" on "Sauce Labs Backpack"
