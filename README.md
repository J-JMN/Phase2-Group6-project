# ShopMate 🛒

A collaborative household shopping list management system built with React. Simplify shopping planning and execution with real-time updates and family sharing.


## Authentication Module

### Overview
Implements family-based authentication for ShopMate using a shared password system. Handles login flow, form validation, and protected routes.

### Features
- **Form Handling**: Built with Formik for robust form management  
- **Validation**: Uses Yup for password field validation  
- **Global State**: Context API for authentication state management  
- **Protected Routes**: React Router integration for route protection  
- **Notifications**: Toast messages for user feedback  
- **Responsive Design**: Mobile-first layout with React-Bootstrap  

---

## Settings Page handled by Joseph

### Overview  
The **Settings Page** allows authenticated family members to update account credentials, manage categories, and manage group members. Access is restricted—only logged-in users can view and interact with this page; unauthenticated users are redirected to the login screen.

### Key Features

1. **Authentication & Route Protection**  
   - Uses `AuthContext` (Context API) to track login state and current user data.  
   - On app mount, reads `signedInUser` from `localStorage` to persist sessions across refreshes.  
   - If `isAuthenticated === false`, the user is redirected to `/login`; otherwise they remain on their requested route.

2. **Account Settings**  
   - **Account Name** and **Password** fields, managed via **Formik** and validated with **Yup**.  
   - Submission triggers a `PUT` request to the JSON-server endpoint (e.g. `/accounts/1`), updates context, and displays toast notifications.

3. **Category Management**  
   - Displays current categories; **owners/members** can add/remove categories. 
   - Actions immediately persist via the same `PUT` request and confirm success/error with toasts.

4. **Member Management**  
   - Displays group members with name, email, and role.  
   - **Owners** can add new members (with email validation) and remove existing ones; **members** cannot.  
   - All changes persist to the backend and surface user feedback via toasts.

5. **Role-Based UI**  
   - UI components check `user.role === "owner"` to conditionally render “Add” and “Remove” buttons.  
   - Both code and interface prevent unauthorized actions.

6. **Session Persistence**  
   - On every reload, `AuthProvider` rehydrates `isAuthenticated` from `localStorage`.  
   - Authenticated users redirect to homepage after refresh, without unwanted redirects.


### How It Works  

1. **Login Flow**  
   - On successful login, `login(userData)` from `useAuth()` stores user in `localStorage` and flips `isAuthenticated` to `true`.

2. **Route Protection**  
   - `SettingsPage` reads `isAuthenticated` from context:  
     - `false` → `<Navigate to="/login" replace />`  
     - `true` → render the settings interface

3. **Data Fetch & Update**  
   - `useSettingsData` fetches `/accounts/1` on mount.  
   - `updateSettings(payload)` performs a `PUT` to that endpoint, updates local state, and fires a toast.

4. **Role Checks**  
   - Both `CategoryManager` and `MemberManager` receive `user.role` to determine which controls to show/hide.

5. **Persistent Sessions**  
   - Because `AuthProvider` reads `localStorage` once on mount, users remain authenticated on a page refresh—no unwanted login redirects.

## Dependencies
```bash
npm install formik yup react-toastify react-router-dom