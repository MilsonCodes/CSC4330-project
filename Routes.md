# Frontend Routes
**Quick Notes:** Redirect Route When Authenticated/Unauthenticated is a route that we send users to only when they try to access that route and their authentication state matches the opposite of the intended state the routes are for. Ex. If a user is logged in and they try to access the login page, it will send them to their profile page.

## *Unauthenticated Routes*
**Description:** These routes are for when a user is not logged in yet. Some of these routes may stay global to both states of authentication.

### Home Page
* *Route:* “/”
* *General Information:* Front page for website. Contains information about our website, the functionality and processes it has for users.
* *Redirect Route When Authenticated:* N/A - Keep the home page normal. Just the header will show that a user is logged in (but that will be the same across all pages)

### Login Page
* *Route:* “/login”
* *General* Information: It’s the login page, so it allows users to log in. Will have a link to the register page.
* *Redirect Route When Authenticated:* “/profile” - Bring the user to their profile if they use the route to the login page.

### Register Page
* *Route:* “/register”
* *General Information:* It’s the register page, so it allows new users to register. Will have a link to the login page.
* *Redirect Route When Authenticated:* “/profile” - Bring the user to their profile if they use the route to the register page.

*Other pages TBD.*

## *Authenticated Routes*
**Description:** These routes are for when a user is logged in. These routes will most likely automatically redirect to the login page when a user is not logged in.

### Profile Page
* *Routes:*
    * “/profile”
    * “/profile/:id”
* *General Information:* It’s the profile page for a user. When an id is specified behind the default profile route, it will take the user to another user’s profile page. If the id specified does not exist, it will take the user to their profile page.
* *Redirect Route When Unauthenticated:* “/login” - User needs to login to access a profile page.

### Company Profile Page
* *Routes:*
    * “/company”
    * “/company/:id”
* *General Information:* Profile page for companies. The first route routes users to the company they are currently working for (unless they work for an external company). Will have all the information that a company provides and open job listings for that company.
* *Redirect Route When Unauthenticated:* “/login” - User needs to login to access a company’s profile page.

### Job Listing Page
* *Route:* “/listing/:id”
* *General Information:* Page for a job listing. Has all information about the listing. Includes a link to apply.
* *Redirect Route:*
    * “/login” - User needs to login to access a job listing.
    * “/company/:companyId” - User is logged in but does not have permissions or listing view period is closed.

### Apply Page
* *Route:* “/listing/:id/apply”
* *General Information:* Page to apply for a job listing. Provide information needed (will likely be autofilled from previous information).
* *Redirect Route:*
    * “/login” - User needs to login to access a job listing.
    * “/company/:companyId” - User is logged in but does not have permissions or listing view period is closed.

### Job Listing Applications List
* *Route:* “/listing/:id:/applications”
* *General Information:* Page to show all applications associated with a job listing. Only accessible to users with certain permissions. Will be automatically organized based on hardcoded filters.
* *Redirect Route:*
    * “/login” - User needs to login to apply to a job listing.
    * “/listing/:id” - User is logged in but does not have permissions.
    * “/company/:companyId” - User is logged in but does not have permissions or listing view period is closed.

### User Applications List
* *Route:* “/applications”
* *General Information:* Page to show all of a user’s applications.
* *Redirect Route When Unauthenticated:* “/login” - User needs to login to see their applications.

### Job Search Page
* *Route:* “/search?filter=value”
* *General Information:* Page for users to search for a specific job listing. May use information to help a user find an application that matches their specifications.
* *Redirect Route When Unauthenticated:* “/login” - User needs to login to see their applications.

### Stakeholders Page
* *Route:* “/stakeholders”
* *General Information:* Page for stakeholders (or users with special permissions) to view information and generate reports about the site.
* *Redirect Route:*
    * “/login” - User needs to login to view this page.
    * “/profile” - User is logged in but does not have permission to view those pages.

### Settings Pages
* *Routes:*
    * “/settings” - Settings General Page
    * TBD
* *General Information:* A set of pages for a user to adjust settings about their account.
* *Redirect Route When Unauthenticated:* “/login” - User needs to login to view their settings.

### Administration Page (optional)
* *Route:* “/admin”
* *General Information:* Page for us to do special tasks and control the website. Likely not needed.
* *Redirect Route:*
    * “/login” - User needs to login to apply to a job listing.
    * “/profile” - User is logged in but does not have permission to view those pages.

*Other pages TBD.*

## Backend Routes
__*OPTIONAL* - Place them here!__

