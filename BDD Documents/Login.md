## Feature: Logging in

#### Background:

Given I am at the login page  
And the field "Username" is empty
And the field "Password" is empty

#### Senario: Valid Username and Valid password was inputted

- When I type "standard_user" in "Username"
- And I type "secret_sauce" in "Password"
- And I click "Login"
- Then I shouldn't see "Login"
- And I should see "Products"

Senario: Valid Username and Invalid password was inputted

Senario: Invalid Username and Valid password was inputted

Senario: Invalid Username and Invalid password was inputted

Senario: Locked out Username and Valid password was inputted

Senario: Empty Username and Empty password was inputted

Senario: Non-Empty Username and Empty password was inputted

Senario: Empty Username and Non-Empty password was inputted
