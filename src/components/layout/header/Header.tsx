import React from "react";
import styles from "./header.module.css"

import {  Button} from "@material-ui/core";
import { Link,NavLink, useHistory } from "react-router-dom";

const Header = () =>{
    const toggleLeftNavigation = () =>{
        
    }
    return(
        <div className={[styles.top_menu].join(' ')}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">                        
                        <nav className="navbar navbar-expand-lg">
                            <button onClick={()=>toggleLeftNavigation()} type="button" className={[styles.navbar_toggler,"left-trigger"].join(' ')}>Sign in</button>
                            <NavLink to="/#" className={[styles.navbar_brand,"d-flex","justify-content-center","align-items-center"].join(' ')} ></NavLink>
                            <button className={[styles.navbar_toggler].join(' ')} type="button" data-toggle="collapse" data-target="#main-menu"
                                aria-controls="main-menu" aria-expanded="false" aria-label="Toggle navigation">                       
                            </button>
                            <div className={["collapse",styles.navbar_collapse,"collapse","justify-content-between"].join(' ')} id="main-menu">
                                
                                <ul className={[styles.navbar_nav,"justify-content-start"].join(' ')}>
                                <li className={[styles.nav_item].join(' ')}>
                                    <NavLink to="/user/certificates" activeClassName='link-active' className="nav-link">Certificates</NavLink>
                                </li>
                                <li className={[styles.nav_item].join(' ')}>
                                    <NavLink to="/" activeClassName="link-active" className="nav-link">My Courses</NavLink>
                                </li>
                                </ul>
                                <ul className={[styles.navbar_nav,"justify-content-end","right-menu","d-flex","flex-row","justify-content-end","align-items-center","mb-3","mb-lg-0"].join(' ')}>
                                    <li className={[styles.nav_item].join(' ')}>
                                        <form>
                                        <input type="search" className="form-control" name="search" placeholder="Search"/>
                                        <input type="button" className="btn-submit" value=""/>
                                        </form>                                        
                                    </li>
                                    <li className={[styles.nav_item].join(' ')} app-authorization >
                                        <div className="dropdown tablet-full-width">
                                        <button className="btn btn-secondary btn-secondary-small dropdown-toggle hide-caret mr-2" type="button"
                                            id="dropdownMenuButtonSettings" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="fas fa-cog"></i>
                                        </button>
                                        </div>
                                    </li>
                                    <li className={[styles.nav_item,"d-flex","flex-row","justify-content-center","align-items-center"].join(' ')}>
                                        <a href="#" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                        className={[styles.notification_bell].join(' ')}>
                                        <i className="fas fa-bell">
                                        </i>
                                        <div className="notification-holder d-flex justify-content-center align-items-center">
                                            <span className="badge"></span>
                                        </div>

                                        <div className={[styles.dropdown_menu,"dropdown-menu-right"].join(' ')} aria-labelledby="dropdownMenuButton">                                           
                                        </div>
                                        </a>
                                        <p className="user"><br /></p>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>                
                </div>
           
            </div>
        </div>

    );
};
export default Header;