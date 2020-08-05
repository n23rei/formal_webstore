import React, { useState} from 'react';
import axios from 'commons/axios';
import auth from "commons/auth";

const Clip_on = props =>{
    const aaa= async () => {
        axios.get(`https://webstorenashi-api.herokuapp.com/products?category=1`)
        .then(
            response=>{
                this.setState ({
                    products : response.data,
                    sourceProducts: response.data
                }) ;

        });
    }
    
}
export default Clip_on ;