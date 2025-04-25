import React from 'react'
import { NavLink } from 'react-router-dom';

function Navbar() {

    return (
        <div className='d-flex flex-column flex-md-row justify-content-between align-items-center overflow-sm-hidden px-4 pt-4'>
            <NavLink to="/" className="text-decoration-none">
                <h1 className='custom-text-color-primary fw-bold text-xl'> <span className='custom-text-color-secondary'>Shop</span>Mate </h1>
            </NavLink>

            <div className='d-flex flex-row gap-4 align-items-center p-2 px-4 fs-5'>
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
                    <div class="d-flex align-items-center gap-2">
                        <div class="rounded-circle bg-warning" style={{width: "40px",height: "40px"}}></div>
                        <div class="d-flex flex-column">
                            <span class="fw-bold text-dark">User</span>
                            <span class="text-muted small">owner</span>
                        </div>
                    </div>
                </NavLink>
            </div>
        </div>
    )
}

export default Navbar;