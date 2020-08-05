import React, { useState} from 'react';
import {Link,withRouter} from 'react-router-dom';
import auth from "commons/auth";

const Header = props =>{
    // console.log("header:",props);
    const [active,setActive]=useState(false);

    // function handleMouseOver(){
    //     setActive(true);
    // }
    // console.log(active);
    const logout = () =>{
        auth.logout();
        alert('已登出');
        props.history.push('/');
    }

    const goCart= () =>{
        if(!auth.isLogin()){
            props.history.push("/login");
            alert('請先登入');

        }else{
            props.history.push('/cart');
        }
    }

    // console.log("header",props);

    const tabs =[{tabName:'夾式耳環', id:'clip_on_earing'},
                 {tabName:'針式耳環', id:'pierced_earing'},
                 {tabName:'戒指',id:'ring'}
                ];


    return (
            <div className="header ">
                    <div className=" shop-name ">
                        <figure className="navbar-item image" >
                            <a href='/'><p className=" logo-part">MY STORE</p></a>
                        </figure>
                    </div>
                    <div className=" menu-toggle ">
                        <div className="hb-container">
                        <input type="checkbox" className="hb"></input>
                        <span></span>
                        <span></span>
                        <span></span>
                        <ul className="menu">
                            <div className="menu-part">
                                {tabs.map((tab,index)=>{
                                    return <li className="" key={index}>
                                        <a href={`/?tabName=${tab.id}`} ><p>
                                        {tab.tabName}</p></a>
                                        </li>
                                })}
                            </div>
                            <div className="login-part">
                                {props.user.nickname?(
                                     <React.Fragment>
                                            <li className="nickname">
                                                Hello，
                                                {/* <i className="fas fa-user-alt fa-2x"></i> */}
                                                <p>{props.user.nickname}</p>
                                            </li>
                                            <li className="logout">
                                                <a href='/'  onClick={logout}>
                                                    <p>登出</p>
                                                </a>
                                            </li>
                                    </React.Fragment>

                                ):(
                                    <React.Fragment>
                                        <li><Link to="/login" className="login"><p>登入</p></Link></li>
                                        <li><Link to="/register" className="sign-in"><p>註冊帳號</p></Link></li>
                                    
                                    </React.Fragment>

                                )}
                                    <li  className="cart-box" onClick={goCart}>
                                                <i className="fas fa-shopping-cart"></i>
                                                <p className="cart-num">({props.cartNum})</p>
                                    </li>
                            </div>

                        </ul>

                    </div>
                    
                </div>
            </div>
    )


};


export default withRouter(Header);
