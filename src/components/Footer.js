import React,{useMemo} from 'react';
import auth from "commons/auth";

const Layout = props =>{




    return(
        <div className="footer">
            <div className="column left about">
                <div className="navbar-item image" >
                                <p className="logo-part">MY STORE</p>
                </div>
                <i className="fab fa-facebook-square fa-2x"></i>
                <i className="fab fa-instagram fa-2x"></i>
                <i className="fab fa-line fa-2x"></i>
            </div>
            <div className="column time">
                <i className="far fa-envelope"></i>
                <p>service@gmail.com</p>

            </div>
            <div className="column time">
                <i className="far fa-clock"></i>
                <p>09:00-18:00</p>
            </div>
        </div>
    );
};

export default Layout ;