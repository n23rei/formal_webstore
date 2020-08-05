import React, { Fragment } from 'react';

class Login extends  React.Component{

state = {
        email:'',
        password:''
};

handleSubmit = event =>{
    //1.阻止默認行為
    event.preventDefault();
    //2.獲取表單數據
    console.log(this.state);
    //3.處理登入邏輯
    //4.跳轉到首頁
    // this.props.history.push('/');
}

handleChang = e =>{
    console.log(e.target.name);
    console.log(e.target.value);

    this.setState({
        [e.target.name]:e.target.value
    })

}

    render(){
        return(
            <div className="login-wrapper">
                <form className="box login-box">
                    <div className="field">
                        <label className="label" htmlFor="">Email</label>
                        <div className="control">
                            <input className="input" 
                            type="text"
                            placeholder="Email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChang}/> 
                        </div>
                    </div>
                    <div className="field">
                        <label className="label" htmlFor="">Password</label>
                        <div className="control">
                            <input  className="input" 
                            type="text" 
                            placeholder="Password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChang}/> 
                        </div>
                    </div>
                    <div className="control">
                        <button className="button is-fullwidth bt-color" onClick={this.handleSubmit}>
                            Login
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default  Login;