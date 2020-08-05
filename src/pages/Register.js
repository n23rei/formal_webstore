import React from "react";
import axios from 'commons/axios';
import { useForm } from "react-hook-form";
import auth from "commons/auth";

export default function Register (props){

    const {register,handleSubmit,errors} = useForm();
    //register接管註冊
    const  onSubmit = async data =>{

        console.log( "註冊1:" ,data);
    //3.處理登入邏輯
        try {
            const { nickname, email, password } = data;
            const res = await axios.post('/auth/register',{
                nickname,
                email,
                password,
                type : 0
            });
            console.log( "註冊2:" ,data);
            const jwToken = res.data;
            console.log(jwToken);
            auth.setToken(jwToken);
    //4.跳轉到首頁
            props.history.push('/');
            alert('註冊成功')
        } catch (error) {
            console.log(error);
            alert('email已存在');
        }
    };
    console.log(errors);

    return(
        <div className="login-wrapper">
                <form className="box login-box" onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                        <label className="label" htmlFor="">暱稱</label>
                        <div className="control">
                            <input className={`input ${errors.nickname && 'is-danger'}`}
                            type="text"
                            placeholder="Nickname"
                            name="nickname"
                            ref={register({
                                required: 'nickname is required'
                            })}
                            />
                            {
                                errors.nickname &&
                            <p className="helper has-text-danger">
                                {errors.nickname.message}
                            </p>
                            }
                        </div>
                    </div>
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
                    <div className="control">
                        <button className="button is-fullwidth bt-color" >
                            Submit
                        </button>
                    </div>
                </form>
            </div>

    )
}




