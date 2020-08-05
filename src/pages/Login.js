import React from "react";
import axios from 'commons/axios';
import { useForm } from "react-hook-form";
import auth from "commons/auth";



export default function Login (props){

    const {register,handleSubmit,errors} = useForm();
    //register接管註冊
    const  onSubmit = async data =>{
    //1.阻止默認行為
    //2.獲取表單數據
        console.log(data);
    //3.處理登入邏輯
        try {
            const {email,password} = data;
            const res = await axios.post('auth/login',{email,password});
            const jwToken = res.data;
            console.log(jwToken);
            auth.setToken(jwToken);
    //4.跳轉到首頁
            props.history.push('/');
            
        } catch (error) {
            alert('登入失敗');
        }
    };
    console.log(errors);

    return(
        <div className="login-wrapper">
                <form className="box login-box" onSubmit={handleSubmit(onSubmit)}>
                    <div className="field">
                        <label className="label" htmlFor="">Email</label>
                        <div className="control">
                            <input className={`input ${errors.email && 'is-danger'}`}
                            type="text"
                            placeholder="Email"
                            name="email"
                            ref={register({
                                required: 'email is required',
                                pattern:{
                                    value: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,
                                    message: 'invalid email'
                                }
                            })}
                            />
                            {
                                errors.email &&
                            <p className="helper has-text-danger">
                                {errors.email.message}
                            </p>
                            }
                        </div>
                    </div>
                    <div className="field">
                        <label className="label" htmlFor="">Password</label>
                        <div className="control">
                            <input  className={`input ${errors.password && 'is-danger'}`}
                            type="password"
                            placeholder="Password"
                            name="password"
                            ref={register({
                                required: 'password is required',
                                minLength: {
                                    value:6,
                                    message: 'cannot be less than 6 digits'
                                }
                            })}
                            />
                            {
                                errors.password &&
                                <p className="helper has-text-danger">
                                    {errors.password.message}
                                </p>
                            }
                        </div>
                    </div>
                    <div className="control login-button">
                        <button className="button  bt-color" >
                            Login
                        </button>
                    </div>
                </form>
            </div>

    )
}




