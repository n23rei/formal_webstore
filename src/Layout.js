import React,{useMemo} from 'react';
import Header from 'components/Header';
import auth from "commons/auth";
import  { withRouter } from 'react-router-dom';

const Layout = props =>{


    const user = auth.getUser()|| {};


    return (
        <div className="main">
            <Header user={user}  cartNum={props.cartNum} clickTabs={props.clickTabs}/>
            {props.children}
        </div>
    );
};

export default withRouter(Layout);