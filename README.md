Update Readme for feature/pauline-Authentication

# ShopMate 🛒

A collaborative household shopping list management system built with React. Simplify shopping planning and execution with real-time updates and family sharing.

---

## 🔐 Authentication Module

### Overview
Implements secure family-based authentication using a shared password system with individual member accounts. Handles complete login/signup flows with route protection.

### ✨ Core Features

**User Management**
- Family-shared password with unique member emails
- Persistent sessions with localStorage

**Technical Implementation**
| Feature                | Technology Used         | Description                          |
|------------------------|-------------------------|--------------------------------------|
| Form Handling          | Formik                  | Robust form state management         |
| Validation             | Yup                     | Schema-based field validation        |
| Global State           | Context API             | Cross-component auth state           |
| Route Protection       | React Router            | Authenticated route guarding         |
| Notifications          | react-toastify          | User feedback toasts                 |
| Session Persistence    | localStorage            | Remembers logged-in users            |
| Performance Optimization | useCallback           | Memoized auth functions             |

**Security Features**
- Password encryption
- Protected routes
- Automatic token storage
- Role-based access control

