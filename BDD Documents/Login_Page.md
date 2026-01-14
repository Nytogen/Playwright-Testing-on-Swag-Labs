## Feature: Logging in

#### Background:

- GIVEN I am a user at the login page
- And the field "Username" is empty
- And the field "Password" is empty

#### Login Senario 1: Sucessful login with a valid user

- WHEN I type "standard_user" in "Username"
- And I type "secret_sauce" in "Password"
- And I click "Login"
- THEN I shouldn't see the login button
- And I should see "Products"

#### Login Senario 2: Unsuccessful login due to incorrect password

- WHEN I type "standard_user" in "Username"
- And I type "Wrong_password" in "Password"
- And I click "Login"
- THEN I should see the login button
- And I should see "Epic sadface: Username and password do not match any user in this service"

#### Login Senario 3: Unsucessful login due to invalid username

- WHEN I type "wrong_user" in "Username"
- And I type "secret_sauce" in "Password"
- And I click "Login"
- HEN I should see the login button
- And I should see "Epic sadface: Username and password do not match any user in this service"

#### Login Senario 4: Unsucessful login due to user being lockedout

- WHEN I type "locked_out_user" in "Username"
- And I type "secret_sauce" in "Password"
- And I click "Login"
- HEN I should see the login button
- And I should see "Epic sadface: Sorry, this user has been locked out."

#### Login Senario 5: Unsucessful login due to empty username and password

- WHEN I click "Login"
- HEN I should see the login button
- And I should see "Epic sadface: Username is required"

#### Login Senario 6: Unsucessful login due to no password was inputted

- WHEN I type "standard_user" in "Username"
- And I click "Login"
- THEN I should see the login button
- And I should see "Epic sadface: Password is required
