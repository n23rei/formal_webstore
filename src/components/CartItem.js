import React,{useState,useMemo} from 'react';
import axios from 'commons/axios';


    const CartItem = props =>{

        const [mount,setMount]=useState(props.cart.mount);
        const { id,name , image , price } = props.cart || {};
        const sumPrice= mount * parseInt(price);

        const handleChange = e =>{
            const _mount=parseInt(e.target.value);
            setMount(_mount);
            const newCart={
                ...props.cart,
                mount: _mount
            }
            console.log('hello:',{...props.cart});
            //...物件展開
            //修改的參數為newcart
            axios.put(`/carts/${id}`,newCart).then(res=>{
                props.updateCart(newCart);

            })
            console.log("newCart:",newCart);

    };

    const deletCart =  () =>{
        axios.delete(`/carts/${id}`).then(res=>{
            console.log("props:",props.cart )
            props.deleteCart(props.cart);
        })

    }

    return(
        <div className="cart-items">
            <div className="cart-items-desktop">
                <div className="about-cart-item item-close">
                    <span className="close" onClick={deletCart}>X</span>
                </div>
                <div className="about-cart-item item-img">
                    <img src={image} alt={name} width="100"/>
                </div>
                <div className="about-cart-item item-name">
                    <p>{name}</p>
                </div>
                <div className="about-cart-item item-number">
                    <input
                    type="number"
                    className="input num-input"
                    min={1}
                    value={mount}
                    onChange={handleChange}
                    />
                </div>
                <div className="about-cart-item item-sum-price">
                    <span className="sum-price">NTS {sumPrice}</span>
                </div>
            </div>

            <div className="cart-items-mobile">
                <div className="about-cart-item-mobile item-close-mobile">
                    <span className="close" onClick={deletCart}>X</span>
                </div>
                <div className="about-cart-item-mobile item-img-mobile">
                    <img src={image} alt={name} />
                </div>
                <div className="about-cart-item-mobile item-another-content-mobile">
                    <div className="product-name">
                        <p>{name}</p>
                    </div>
                    <div className="product-input">
                        <input
                        type="number"
                        className="input num-input"
                        min={1}
                        value={mount}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="product-price">
                        <span className="sum-price">NTS {sumPrice}</span>
                    </div>
                </div>
            </div>
        </div>
    );



};

export default CartItem ;