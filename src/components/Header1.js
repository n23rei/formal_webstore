import React  from 'react';
import  { Fragment } from 'react';


class Header extends React.Component{

    handleLink(props){
        const nickname=this.props.nickname
        if(nickname){
            return(
            <span className="nickname">{nickname}</span>
            )
        }else{
            return(
                <Fragment>
                    <a href="/">Login</a>
                    <a href="/">Register</a>
                </Fragment>
            )

        }
    }


    render(){
        return(
            <div className="header">
                <div className="grid">
                    <div className="start">
                        <a href="/">Home</a>
                    </div>
                    <div className="end">
                        {this.handleLink()}
                        </div>
                </div>
            </div>
        )
    }


}

export default Header;
