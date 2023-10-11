# Pull Request

## Naming
Make sure you include a JIRA ticket number in the branch name, and use `pr/BET-xx-some-shorter-description` as the format. If the changes being made are from a branch that 
is not regarding a JIRA ticket, ignore this step.

Some acceptable names include:
- pr/BET-23-fix-navbar-routing
- pr/BET-30-add-user-auth
- github-actions-setup

Some bad names include:
- BET-23-fix-navbar-routing
- fix-a-bug
- pr/github-actions-setup

## Things you must do with all PRs:
- Make sure to update the build in the site. This is stored in the navbar and also in the footer (as of BW-V1.2.0 this has not been implemented. If you are developing on BW-V1.3.0 this feature will be implemented).
- Make sure you remove all commented code.
- If this code is going to be in major release, make sure you add any new files with the @since documentation tag for better clarity.
- Any code using `useState` should consider using `localStorage` instead for speed.
