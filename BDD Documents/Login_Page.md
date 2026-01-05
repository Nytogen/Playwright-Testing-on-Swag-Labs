## Feature: Logging in

#### Background:

- GIVEN I am a user at the login page
- And the field "Username" is empty
- And the field "Password" is empty

#### Senario 1: Sucessful login with a valid user

- WHEN I type "standard_user" in "Username"
- And I type "secret_sauce" in "Password"
- And I click "Login"
- THEN I shouldn't see "Login"
- And I should see "Products"

#### Senario 2: Unsuccessful login due to incorrect password

- WHEN I type "standard_user" in "Username"
- And I type "Wrong_password" in "Password"
- And I click "Login"
- THEN I should see "Login"
- And I should see "Epic sadface: Username and password do not match any user in this service"

#### Senario 3: Unsucessful login due to invalid username

- WHEN I type "wrong_user" in "Username"
- And I type "secret_sauce" in "Password"
- And I click "Login"
- THEN I should see "Login"
- And I should see "Epic sadface: Username and password do not match any user in this service"

#### Senario 4: Unsucessful login due to user being lockedout

- WHEN I type "locked_out_user" in "Username"
- And I type "secret_sauce" in "Password"
- And I click "Login"
- THEN I should see "Login"
- And I should see "Epic sadface: Sorry, this user has been locked out."

#### Senario 5: Unsucessful login due to empty username and password

- WHEN I click "Login"
- THEN I should see "Login"
- And I should see "Epic sadface: Username is required"

#### Senario 6: Unsucessful login due to no password was inputted

- WHEN I type "standard_user" in "Username"
- And I click "Login"
- THEN I should see "Login"
- And I should see "Epic sadface: Password is required
