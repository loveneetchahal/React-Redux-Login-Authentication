import React, { useState } from "react";
import { Link,NavLink } from "react-router-dom";
import styles from "./Left_nav.module.css"


const Left_nav = () =>{
    const [isActive, setActive] = useState(false);
    console.log(process.env.REACT_APP_API_URL);
    const toggleLeftNavigation=(setlocalStorage: boolean)=>{
        if (setlocalStorage) {
            setActive(!isActive);
          /*var LMSNavigationToggle = localStorage.getItem("LMSNavigationToggle");
          if (LMSNavigationToggle) {
            //local storage item exists
            if (LMSNavigationToggle == "Collapsed Left Nav") {
              localStorage.setItem("LMSNavigationToggle", "Expanded Left Nav");
            } else {
              localStorage.setItem("LMSNavigationToggle", "Collapsed Left Nav");
            }
          } else {
            //local storage item does not exists
            localStorage.setItem("LMSNavigationToggle", "Collapsed Left Nav");
          }*/
        }
        //$("#leftNavigation").toggleClass("active");    
      }
    return( 
        <div className={styles.left_menu} id="leftNavigation">
            <ul className={styles.navbar_nav_top}>
                <li className="nav-item justify-content-center align-items-center d-none d-lg-flex">                
                    <Link to="javascript:void(0);" onClick={()=>toggleLeftNavigation(true)} className={[styles.nav_link,"d-flex","justify-content-start","align-items-center","flex-row","leftToggle"].join(' ')}>
                        <div className={styles.menu_lines}>
                            <span className={[styles.line,styles.first].join(' ')}></span>
                            <span className={[styles.line,styles.middle].join(' ')}></span>
                            <span className={[styles.line,styles.last].join(' ')}></span>
                        </div>
                        <span className={styles.menu_title}>MENU</span>
                    </Link>
                </li>
            </ul>
            <ul className={[styles.navbar_nav,"d-flex","flex-column"].join(' ')}>

            <li className="nav-item d-flex justify-content-center align-items-center">
                <NavLink to="/validate-form" activeClassName={styles.link_active}  className={[styles.nav_link,"d-flex","justify-content-start","align-items-center","flex-row"].join(' ')}>
                    <div className={styles.menu_image}>
                        <i className="fas fa-home"></i>
                    </div>
                    <span className={styles.menu_title}>Home</span>
                </NavLink>
            </li>
            <li  className="nav-item d-flex justify-content-center align-items-center">
                <NavLink to="/SignalRChatbot" activeClassName={styles.link_active} className={[styles.nav_link, "d-flex", "justify-content-start", "align-items-center", "flex-row"].join(' ')}>
                    <div className={styles.menu_image}>
                        <i className="far fa-comment-dots"></i>
                    </div>
                    <span className={styles.menu_title}>SignalRChatbot</span>
                </NavLink>
            </li>
            <li  className="nav-item d-flex justify-content-center align-items-center">
                <NavLink to='/datatable' activeClassName={styles.link_active} className={[styles.nav_link,"d-flex","justify-content-start","align-items-center","flex-row"].join(' ')}>
                    <div className={styles.menu_image}>
                            <i className="fas fa-chart-pie"></i>
                    </div>
                    <span className={styles.menu_title}>Dashboard</span>
                </NavLink>
            </li>
            <li className="nav-item d-flex justify-content-center align-items-center">
                <NavLink to="/register-user" activeClassName={styles.link_active} className={[styles.nav_link,"d-flex","justify-content-start","align-items-center","flex-row"].join(' ')}>
                    <div className={styles.menu_image}>
                            <i className="fas fa-play-circle"></i>
                        </div>
                        <span className={styles.menu_title}>Browse</span>
                </NavLink>
                </li>
            <li className="nav-item d-flex justify-content-center align-items-center">
                <NavLink to="/itemlist" activeClassName={styles.link_active} className={[styles.nav_link,"d-flex","justify-content-start","align-items-center","flex-row"].join(' ')}>
                    <div className={styles.menu_image}>
                        <i className="fas fa-graduation-cap"></i>
                    </div>
                        <span className={styles.menu_title}>Certificates</span>
                </NavLink>
            </li>
            <li className="nav-item d-flex justify-content-center align-items-center">
                <NavLink to="/validate" activeClassName={styles.link_active} className={[styles.nav_link,"d-flex","justify-content-start","align-items-center","flex-row"].join(' ')}>
                    <div className={styles.menu_image}>
                        <i className="fas fa-calendar-week"></i>
                    </div>
                    <span className={styles.menu_title}>Events</span>
                </NavLink>
            </li>
            <li  className="nav-item d-flex justify-content-center align-items-center">
                <NavLink to="/datatable" activeClassName={styles.link_active} className={[styles.nav_link, "d-flex", "justify-content-start", "align-items-center", "flex-row"].join(' ')}>
                    <div className={styles.menu_image}>
                        <i className="fas fa-question-circle"></i>
                    </div>
                    <span className={styles.menu_title}>FAQ</span>
                </NavLink>
            </li>            
            <li  className="nav-item d-flex justify-content-center align-items-center">
                <NavLink to="/logout" activeClassName={styles.link_active} className={[styles.nav_link,"d-flex","justify-content-start","align-items-center","flex-row"].join(' ')}>
                    <div className={styles.menu_image}>
                        <i className="fas fa-user-tie"></i>
                    </div>
                    <span className={styles.menu_title}>Admin</span>
                </NavLink>
            </li>
            <li  className="nav-item d-flex justify-content-center align-items-center">
                <NavLink to="/chatbotUi" activeClassName={styles.link_active} className={[styles.nav_link, "d-flex", "justify-content-start", "align-items-center", "flex-row"].join(' ')}>
                    <div className={styles.menu_image}>
                        <i className="far fa-comment-dots"></i>
                    </div>
                    <span className={styles.menu_title}>Chatbot</span>
                </NavLink>
            </li>
            <li  className="nav-item d-flex justify-content-center align-items-center">
                <NavLink to="/chatbot" activeClassName={styles.link_active} className={[styles.nav_link, "d-flex", "justify-content-start", "align-items-center", "flex-row"].join(' ')}>
                    <div className={styles.menu_image}>
                        <i className="far fa-comment-dots"></i>
                    </div>
                    <span className={styles.menu_title}>checkChatbot</span>
                </NavLink>
            </li>
            </ul>
        </div>
        );
};

export default Left_nav;

