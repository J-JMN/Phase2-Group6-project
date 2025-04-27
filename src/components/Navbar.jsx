import { NavLink } from 'react-router-dom';
import { useAuth } from './Auth/AuthContext';

const Navbar = () => {
  const { user } = useAuth();
  return (
    <nav className="navbar px-3">
      <div className="container-fluid">
        {/* Logo */}
        <NavLink to="/" className="navbar-brand text-decoration-none">
          <h1 className="custom-text-color-primary fw-bold fs-2">
            <span className="custom-text-color-secondary">Shop</span>Mate
          </h1>
        </NavLink>

        {/* Drawer Toggle Button */}
        <button
          className="btn d-lg-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#mobileDrawer"
          aria-controls="mobileDrawer"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Desktop Menu */}
        <div className="d-none d-lg-flex flex-row gap-4 align-items-center p-2 px-4 fs-5 ms-auto">
          <MenuLinks user={user}/>
        </div>
      </div>

      {/* Offcanvas Drawer for Mobile */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="mobileDrawer"
        aria-labelledby="mobileDrawerLabel"
      >
        <div className="offcanvas-header">
          <h1 className="custom-text-color-primary fw-bold fs-2 offcanvas-title" id="mobileDrawerLabel">
            <span className="custom-text-color-secondary">Shop</span>Mate
          </h1>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <div className="d-flex flex-column gap-3 fs-5">
            <MenuLinks />
          </div>
        </div>
      </div>
    </nav>
  );
};

// Separate MenuLinks for reuse
const MenuLinks = ({user}) => (
  <>
    <NavLink
      to="/home"
      className={({ isActive }) =>
        `custom-text-color-primary fw-bold pb-1 ${
          isActive ? 'border-bottom border-2 custom-border-secondary' : ''
        }`
      }
    >
      Home
    </NavLink>

    <NavLink
      to="/home"
      className={({ isActive }) =>
        `custom-text-color-primary fw-bold pb-1 ${
          isActive ? 'border-bottom border-2 custom-border-secondary' : ''
        }`
      }
    >
      Shop
    </NavLink>

    <NavLink
      to="/inventory"
      className={({ isActive }) =>
        `custom-text-color-primary fw-bold pb-1 ${
          isActive ? 'border-bottom border-2 custom-border-secondary' : ''
        }`
      }
    >
      Inventory
    </NavLink>

    <NavLink
      to="/settings"
      className={({ isActive }) =>
        `custom-text-color-primary fw-bold pb-1 ${
          isActive ? 'border-bottom border-2 custom-border-secondary' : ''
        }`
      }
    >
      <div className="d-flex align-items-center gap-2">
        <div className="rounded-circle bg-warning" style={{ width: '40px', height: '40px' }}></div>
        <div className="d-flex flex-column">
          <span className="fw-bold text-dark my-0" style={{fontSize:'medium'}}>{user?.name || 'User'}</span>
          <span className="text-muted small my-0" style={{fontSize:'small'}}>{user?.role || 'Member'}</span>
        </div>
      </div>
    </NavLink>
  </>
);

export default Navbar;
