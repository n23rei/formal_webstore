import React from 'react';
import {withRouter} from 'react-router-dom';
import auth from "commons/auth";

class ToolBox extends React.Component{

    constructor(props) {
        super(props);

        console.log("tttttttttt:",props);
        // this.handleClick = this.handleClick.bind(this);
    }
    state={
        searchText:''
    }
    handleChange= e =>{
        const value = e.target.value;
        this.setState({
            searchText: value
        });
        this.props.search(value)

    };
    clearSearchText = () =>{
        this.setState({
            searchText:''
        });
        this.props.search('')
    };

    goCart= () =>{
        if(!auth.isLogin()){
            this.props.history.push('/login');
            alert('請先登入');
            return;
        }
        this.props.history.push('/cart');
    }

    render(){

        return(
            <div className="tool-box">
                <div className="search-box">
                            <input type="text" 
                            className="input search-input" 
                            placeholder="Search Product"
                            value={this.state.searchText}
                            onChange={this.handleChange}/>

                </div>
                <div className="control">
                    <button className="button"onClick={this.clearSearchText}>X</button>
                </div>
                {/* <div  className="cart-box" onClick={this.goCart}>
                    <i className="fas fa-shopping-cart"></i>
                    <span className="cart-num">({this.props.cartNum})</span>
                </div> */}
            </div>
        )
    }
}

export default withRouter(ToolBox);
