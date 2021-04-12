# The Wholesale Group Project

## Table of contents
=================
- [Project Vision](#project-vision)
- [Non-Functional Requirement](##-2.-Non-functional-Requirement)
- [Software Architecture](#Software-Architecture)
- [Functional Requirements](#F-Requirements )
- [Components](#Components)
- [Timeline](#Timeline)

<a name="project-vision"></a>
## 1. Project Vision
- ### Objective
The wholesale group is RL Liquidators' wholesaling division that will provide freight to our existing network of locations and dealers and wholesaling to other companies. The objective is to create a system that will allow The Wholesale Group to create and manage shipments while assigning those shipments in real-time to customers.  This function should be asynchronous in that the user will see the most up-to-date information at all times.  The architecture needs to be scalable to support many thousands of users and millions of orders. The system will include a homepage, authentication system, administrative dashboard, customer dashboard, login, logout, register, contact, and orders page. The system will also communicate to the necessary parties via email when sales orders are created, changes to shipments are made, and received orders. 

- ### Suppositions & Dependencies
From deployment, the application will be developed in a manner that allows the web application to scale as the company scales. The following decisions regarding the software architecture assume that the application will need to handle high-volumes of traffic. 

____________________________________________________________________________________________

## 2. Non-functional requirement
- ### Appearance & Design
 
There will be two views depending on the role. The home page, contact page, and orders page will include images as well as the content. The login, register, and dashboard page will be minimal as far as content and images go. The ideal color scheme will be greyish black with white or off-white text. The order process needs to be simple for customers and salespeople to generate and modify orders. 

Upon registration, the customer should go through an approval process on the admin side before placing orders. This will ensure that the customers are properly vetted before being able to place orders.  Sales should have the ability to create customers and place orders on their behalf.

- ### System Roles

There will be 3 roles in the system.

* Administrator
* Sales
* Customer

 

Administrators will be able to add or remove customers and sales agents, the ability to create customers, generate orders on their behalf, and view customer account information. 

Sales will have the ability to create customers, generate orders on their behalf, and view customer account information. 

The Customer’ ability to view their own account information, generate orders, and view their open transactions in their dashboard.

____________________________________________________________________________________________

## 3. Software Architecture 
- ### Technology Stack

* ### Notion 
Notion is a software used for bug tracking, issue tracking, and project management. 
* ### Bitbucket 
Bitbucket is a Git repository management solution that allows teams to manage git repositories, collaborate on your source code and guide you through the development flow. 
* ### Figma
Figma is a browser-based design application with excellent design, prototyping, and code-generation tools. It allows multiple users to collaborate at the same time to achieve the ultimate design. 

* ### React
React is an open-source, front-end JavaScript library for building user interfaces or UI components. It can be used as a base in the development of single-page or mobile applications.

* ### Django
Django is a high-level Python web framework that enables the rapid development of secure and maintainable websites.

* ### Heroku
Heroku is a container-based cloud Platform as a Service (PaaS) that developers can use to deploy, manage, and scale modern apps.

## 4. Programming Languages
- ### Python
Python is a high-level programming language that is highly readable and easy to maintain.

- ### JavaScript
JavaScript is a lightweight, interpreted, object-oriented language with first-class functions and is best known as the scripting language for Web pages.

____________________________________________________________________________________________

### 4. Functional Requirements 
- Scalability - The application needs the ability to handle thousands of buyers and millions of orders.

- Authentication - We will use Django’s built-in authentication to validate users' credentials

- Management Dashboard - This will allow admin users and sales to, view customers information, financial information, assign orders to customers and update their account’s status.

- Customer Dashboard - This will allow customers to see available truckloads and purchase trucks directly from their portal.

- Order Creation - Create a sales order and upload a spreadsheet into a new order. 

- Sales Orders - The sales team needs to be able to create sales orders that will notify accounting?

- Assign orders to buyers - The sales team needs to be able to assign orders to buyers.

- Asynchronous - Orders need to update in real-time.

____________________________________________________________________________________________

### 5. Components

- Navigation (CUSTOMER && ADMIN)

The navigation will vary based on the user's login status (Admin, Sales, or Buyer.) 

Features:

All applicable page navigation will be available in the sidebar.

____________________________________________________________________________________________

- Modals (CUSTOMER && ADMIN)

These components will include the logic for the modals themselves within the application.

Features:

A pop-up modal that can be closed by either pressing anywhere else on the screen outside of the modal or by pressing the x at the top right.

____________________________________________________________________________________________

- Alert (CUSTOMER && ADMIN)

This component will be reusable alert functionality to display information to the users based on their actions.

Features:

A pop-up alert (either red or green) that displays a message to the user about an action they’ve just made. This will verify to the user that the action they have attempted to make has been successfully made.

____________________________________________________________________________________________

- About (CUSTOMER)

This page will have the RL wholesale group information as well as an “objective” statement to help the users understand the purpose and flow of the website.

Features:

A bold, eye-catching heading. 

The main objective for the website.

Maps or addresses for key locations?

Links or buttons to contact support.

____________________________________________________________________________________________

- Contact (CUSTOMER)

This page will have a contact form along with relevant contact phone numbers and email addresses, if applicable. It may also include addresses and/or map representations of warehouse locations.

Features:

A contact form with error handling.

Should we combine about and contact? Maybe a side-by-side view?

____________________________________________________________________________________________

- Dashboard (CUSTOMER)

The dashboard will have 3 views: Admin, Sales, and Buyer. Each view will default to an overview with settings, account, and logout options at the bottom left. 

Features:

Each view will default to an overview with settings, account, and logout options at the bottom left. 

The sidebar will include tabs relevant to the user type.

The top of the dashboard will have a search option and the user's profile icon, as well as a mail icon, to contact support.

The mail icon will populate an email service when clicked. The to and subject fields will be filled out for the user. The body field will be partially filled out with starter text to simplify the user experience.

The main view of the dashboard is at the center of the page and will include the most relevant component to the user; (ex: The inventory in the case of the customer view.)

Below this will be 2 views of equal width that include secondary relevant information.  

____________________________________________________________________________________________

- Dashboard (ADMIN)

The dashboard will have 3 views: Admin, Sales, and Buyer. Each view will default to an overview with settings, account, and logout options at the bottom left. 

Features:

Each view will default to an overview with settings, account, and logout options at the bottom left. 

The sidebar will include tabs relevant to the user type.

The top of the dashboard will have a search option and the user's profile icon.

The main view of the dashboard is at the center of the page and will include the most relevant component to the user; (ex: Open orders for the admin view.)
There will be a sortable line graph to show relevant sales information.

Below this will be 2 views of equal width that include secondary relevant information.  

____________________________________________________________________________________________

- Statements (CUSTOMER && ADMIN)

The statements page will include the user's statements for each order as well as purchase and financial information for each transaction.

Features:

The user's statements will be listed in a detailed view.

All information, including financial and purchase, will be displayed as tabular data.

We can implement an eyeball feature if we want the financial information to be hidden by default until the eyeball is pressed.

____________________________________________________________________________________________

- Add Inventory (ADMIN)

This component will be used to add truckloads.

Features:

Form to add truckloads to inventory.
____________________________________________________________________________________________

- Inventory (CUSTOMER && ADMIN)

This page will showcase all available inventory in a tabular format with sortable headers.

Features:

All available inventory will be shown and will be very easy on the eyes and easy to read through.
The background color of each row will correspond to the availability of that specific load; red for sold, green for available and yellow for pending sale.

The user will be able to easily scroll through and browse items.

There will be distinguishing features to separate the items from one another to help the user easily  differentiate between them.

____________________________________________________________________________________________

- Item Details (CUSTOMER && ADMIN)

This page will show a detailed view of the item clicked on. 

Features:
A notes section for each department to take notes.

A detailed view of the item the user clicked on.

An icon representing “favorites” will be shown and will add the item to favorites when clicked.

An order button to submit the order for admin approval.

A modal pops up, asking the user if they’re sure they would like to submit the order for approval.

The item will then be moved to their orders page with the status of “Awaiting admin approval.”

This page will also include options to edit or delete the truck information.

____________________________________________________________________________________________

- Favorites (CUSTOMER && ADMIN)

We will add a “Like/Favorite” option to each item both in the inventory view, and item details view for users to add items to their watch list to come back to later. 

Features:

A detailed view of the items the user has “favorited.”

The user will be able to click each item to go to the item details page.

____________________________________________________________________________________________

- Orders (CUSTOMER && ADMIN)

This page will be a view of all open orders placed by a user listed with dates, order status, number of items in the order, etc.

Features:

A view of all orders placed in a tabular format.

Options to click into each order to view the order details.

____________________________________________________________________________________________

- Order Details (CUSTOMER && ADMIN)

This page will show details of each order a user placed.

Features:

A detailed view of an order placed by the user. 

All relevant information will be displayed.

____________________________________________________________________________________________

- Customer Info (ADMIN)

This will be a page for the admin view and will show detailed information about all clients.

Features:

A list of all customers in a tabular format.

An accordion option that expands with more information about each customer.

All options within the accordion will be clickable to go to more detailed overviews of the information desired.

____________________________________________________________________________________________

- Customer Details (ADMIN)

This page will show details for each specific client (profile type format.)

Features:

This will be the information shown when the Customer Info accordion is expanded for the selected customer.

Detailed information about each customer, including total orders, the amount spent, orders awaiting approval, etc.

All options within the accordion will be clickable to go to more detailed overviews of the information desired.

____________________________________________________________________________________________

- Customer Creation (ADMIN)

This page will allow admins to create client profiles on behalf of the client.

Features:

Fields to create a new customer within the system.

____________________________________________________________________________________________

- Account (CUSTOMER && ADMIN)

This page will show the user's information. 

Features:

Editable account information, including name, company, contact number, and billing address.

Users will also be able to change their passwords.

____________________________________________________________________________________________

 

### 6. Timeline
Setup The Backend - XX Hours Estimation

Setting up the backend of the project

 

Login & Authentication - XX Hours Estimation

Login Form

Reset Password Functionality

User Management (Add/Remove/Update Roles)

 

Back-End Development - XX Hours Estimation

Creating Environment

Create API

Create database

 

 

Front- End Development - XX Hours Estimation

Creating React App

Design Components

Styling CSS

 

 

Dashboard Development -  XX Hours Estimation 

Create an admin dashboard and customer dashboard. 

Create filters for different types of accounts.

 

Order Creation Page - XX Hours Estimation

Manifest Upload Functionality



Created by [Stephanie Raymos](https://github.com/stephanieraymos)
