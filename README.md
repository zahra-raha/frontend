# Market Place

**Market Place** is a safe and unique place, where sellers can easily advertise thier second handed items. Our mission is to help people find thier needed items and contact to the seller through prepared from. Market Place launched in February 2023 as Django only website and launched in June 2023 with React/Django.

![Responsive Mockup](https://github.com/zahra-raha/market/blob/main/static/img/Capture1.PNG)


# Super Admin credentials
1. Admin:
  - Username : admin
  - Password : zahra098
2. User:
  - Username: user
  - Password: zahra098

Deployed link : https://marketfrontend.herokuapp.com/
# User Experience

# User Stories

- As a ***user*** I can ***view list of addvertisement*** so that ***easily find the item I want to buy***
- As a ***user*** I can ***view list of my posts*** so that ***I can select one to view its details***
- As a ***user*** I can ***Fill a form on an advertisement*** so that ***I can share my phone number with the seller***
- As a ***user*** I can ***click on an advertisement*** so that ***I can read the details***
- As a ***user*** I can ***register an account*** so that ***I can post advertisements***
- As a ***user*** I can ***open a form*** so that ***I can submit and create a new post***
- As a ***user*** I can ***view the info of users who tried to buy my stuff*** so that ***I can contact them***
- As a ***user*** I can ***click a link*** so that ***view list of my addvertisements***
- As a ***user*** I can ***click a button*** so that ***delete my advertisement***
- As a ***user*** I can ***filter the advertisements*** so that ***find specific item faster***
- As a ***user*** I can ***select a category*** so that ***see all the advertisements in that category***
- As a ***user*** I can ***select a post*** so that ***view the review(comments) of others***
- As a ***user*** I can ***togle a button*** so that ***like or dislike a post***

### User Goals

- To check out and find a good item to buy
- To advertise his items to sell and find prospective customers

### Developer Goals

- To help people in yard sales
- To create a fully functional website using best technologies 

# Features

### Main Features

-	Responsiveness and User friendly – The site is fully responsive to all screen sizes and has a beautiful and easy to use design. This was achieved by using SIXTEEN CLOTHING template designed by https://www.free-css.com/

-	Alert messages – alert messages designed to inform users about event results such as: creating an advertisement or posting a comment to a post.

### Home Page
-	Two major sections are on the home page. A slogan on a buetefull hero image is included in the first section, and each category links to a page where items are filtered according to that category.

- Second section is a list of categories that include a link to view that specefic category's products.

- All categories listed in second section shows the number of posts on that category and include a link to them.

### View advertisements filtered by category
- All users can access this page by clicking on category item listed in home page or products link in the top navbar.
- This page contains all advertisement of specitic category type.
- Users can easily change the categury in this page by selecting in dropdown list.
- Users can filter the posts using the search section.

### View Advertisement Details

-	All users can access this page;  
- By viewing this page users can view the information detail about the item, including item image, number of likes and view all comments,also here is a button to contact with seller.
- Userr should be logged in to ba able to like a post or write a comment on a post.

### Create Advertisement Page
- Users can access this page after logging in. By using this page sellers can register thier advertisements.

### Profile Page
- Every logged in user has a profile page where he can update his profile information, view his advertisements list and view inbox of prespective customers.

### Contact Seller
- Users can use the button provided in advertisement detail page to contact with seller.
- This componnent contins a form the through which users can send thier phone numbers and messages to seller.

### Prospective Customer Page
- This page ispart of profile page and designed to be accessed by the item owner and contain the prospective customers information.

### Authentication Pages
- This pages are provided to handle user rigistration, ligin and log out.

## Future Features
### User accounts 
- User accounts need more improvement view profile pic and forgot password process.

### Data Managment
- Now the site is handlling predefined details about advertisement and it need more improvement to be able to get every kind of advertisements.

# Languages

- [HTML5](https://bootstrapmade.com/gp-free-multipurpose-html-bootstrap-template/)
Used in frontend

- [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS)
Used in frontend

- [Javascript](https://www.javascript.com/)
Primary language for React

# Technologies

**Template**
- [SIXTEEN CLOTHING FREE CSS TEMPLATE](https://www.free-css.com/free-css-templates/page267/sixteen-clothing/)

**Libraries**
- [React](https://react.dev/) The library for web and native user interfaces


**API**
- [Backend](https://backend-market.herokuapp.com/)
custom app designed only for this project, find here in github: https://github.com/zahra-raha/Backend

**IDE**
- [Gitpod](https://gitpod.io/)
Gitpod is used as IDE for this web app

**Deployment**
- [Heroku](https://www.heroku.com/)
Heroku is a platform as a service (PaaS) application that provides developers with hosting and data storage in the cloud. There are many tiers of service, though I used the free one. 

# Testing
## Manual Testing
1. User
  - Home page is the first page user will see. &check;
  - Website menu contain links to Register page and Login page. &check;
  - User can view the home page and advertisement detail page. &check;
  - User can filter advertisements based on category. &check;
  - user can search dvertisements in products page. &check;
  - Logged in user can write a comment to a post(advertisement). &check;
  - Logged in user can like or dislike a post. &check;
  - User can view others comments as reviews. &check;
  - User can contact to a seller and send a message. &check;
  - Both register and login works as it should. &check;
  - Profile page contain all the advertisemen of the user. &check;
  - Logged in user can use New Post link in profile page to create a new advertisement. &check;
  - Logged in user can create new advertisement without any error. &check;
  - An alert will be shown to the Logged in user when he creates a new advertisement. &check;
  - Logged in user can delete his advertisement.  &check;
  - Logged in user can view prospective customers of his advertisements. &check;
3. Super Admin
  - Super admin can manage all categories, customer , messages and advertisement posts.  &check;
  - Super admin can approve advertisements.  &check;

# Deployment

## Deployment to Heroku ##
  - On Heroku create an account and log in.
  - Goto ci-students team
  - Click ***new*** and ***create new app***.
  - Choose a name for your app, select region and click on ***Create App***

  - In Heroku ***Deploy*** Tab, the ***deployment method*** select Github,connect you gethub account if its not already connected
  - Select repository
  - Scroll down to Manual deploy and deploy branch.
  - Once the build is complete, go back to Heroku and click on ***Open App***
 
# Credits
- Tutorials in [Code Institute](https://codeinstitute.net/global/)
- [SIXTEEN CLOTHING FREE CSS TEMPLATE](https://www.free-css.com/free-css-templates/page267/sixteen-clothing)
- [Stackoverflow website](https://stackoverflow.com/)
- A friend [Ali Aref Mohammadzada](https://github.com/Ali-Aref)