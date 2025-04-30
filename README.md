## Overview
The ShoppingList component is a React functional component that allows users to view, search, add, edit, and delete items from a shopping list.
It interacts with a backend API to fetch and update data.

## The component uses:
React Hooks (useState, useRef)
React Bootstrap for layout and styling
Formik + Yup for dynamic form handling and validation
Toast Notifications for success/error feedback
Custom Hooks for data fetching and updating (useFetch, usePut)
Reusable Modal Component for forms and confirmations

## Main Features
Fetch Shopping List Data from API (/api/lists/1).

Search Bar to filter items by title.

Add New Item using a modal form.

Edit Existing Item using a modal form.

Delete Item with confirmation modal.

Responsive UI — tables for desktop, cards for mobile view.

Toast Notifications for user feedback.

## API Usage
GET list data:
/api/lists/1

PUT updated list:
/api/lists/1

## How Forms are Handled (Formik + Yup)
The shopping item form (ShoppingItemForm.jsx) is built using Formik for form management and Yup for validation.

Details:
Formik manages form state, submission, and validation.
Yup schema (ItemSchema) validates required fields:

    Title (string, required)

    Category (string, required)

    Quantity (positive number, required)

    Price (positive number, required)

    Added By (string, required)

    Status (boolean, required)

    Dynamic Value Setting:

When a user selects an item title from a dropdown, other fields like category and price are automatically filled based on inventory data fetched via API.

## Form Submission:

The form's submitForm method is triggered externally using a ref, allowing the parent modal to control when the form submits.

## Validation Errors:

Validation error messages are displayed in real-time under each input field if the user leaves a required field empty or enters invalid data.

## 
Key Files Used
ShoppingList.jsx — Main component logic.

ModalComponent.jsx — Reusable modal used for adding/editing/deleting.

ShoppingItemForm.jsx — Formik form for shopping item creation and editing.

Custom Hooks:

useFetch.js — for fetching data.

usePut.js — for updating data.

Icons imported from a separate icons.jsx.

Technologies Used
React

Formik

Yup

React Bootstrap

React Toastify

Axios (inside custom hooks)

JSON Server / API Server for backend

# Install dependencies
npm install

# Start the project
npm start
Ensure your API server (JSON Server or any backend) is running at the same URL used in API_URL.

Notes
Editing Mode: When editing, the form fields are automatically pre-filled.
Prevent Duplicates: If a new item has a title that already exists, an error is thrown.
Dynamic Form Filling: Selecting a product title automatically fills the category and price fields.
Form Handling: Formik is used with a ref to control form submission from the modal's Save button.

