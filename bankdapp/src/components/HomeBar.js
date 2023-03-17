import React from 'react'
import {Link} from 'react-router-dom'

const HomeBar = () =>{
    return(
        <header className="site-header">
            <nav className="navbar navbar-expand-md navbar-dark fixed-top" style={{background: "transparent", padding: "15px"}}>
              <div className="container">
                <div className="collapse navbar-collapse" id="navbarToggle">                  
                    <div className="navbar-nav ms-auto" style={{textAlign: "right"}}>
                        <li className="nav-item">
                            <Link className="nav-link" to="/account-home" role="button" style={{color: "white"}}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register" role="button" style={{color: "white"}}>Register</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login" role="button" style={{color: "white"}}>Login</Link>
                        </li>
                    </div>
                </div>
              </div>
            </nav>
        </header>
    )
}

export default HomeBar;