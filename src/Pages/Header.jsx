import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-primary">
            <div className="container-xxl">
                <a className="navbar-brand" href="/">POLL</a>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto mb-2 mb-lg-0">

                        <NavLink className="link" to="/IndexUser">
                            <li className="nav-item">
                                <a className="nav-link" href="/IndexUser">Register page</a>
                            </li>
                        </NavLink>

                        <NavLink className="link" to="/Login">
                            <li className="nav-item">
                                <a className="nav-link" href="/Login">Login page</a>
                            </li>
                        </NavLink>

                        <NavLink className="link" to="/IndexPoll">
                            <li className="nav-item">
                                <a className="nav-link" href="/IndexPoll">Poll</a>
                            </li>
                        </NavLink>

                    </ul>

                </div>
            </div>
        </nav>
    );
};

export default Header;