import React, { useState ,useEffect} from 'react';
import {TransitionGroup,CSSTransition} from 'react-transition-group';
import axios from 'commons/axios';
import CartItem from 'components/CartItem';
import auth from "commons/auth";

const Cart  = () => {

        // console.log("iiiiiiiiiiiiii:",props);


    const [carts,setCarts] = useState ([]);

    // console.log(carts);

    useEffect(()=>{
        const user = auth.getUser() || {};
        axios.get(`/carts?userId=${user.email}`).then(
            res => {
                console.log("res",res);
                setCarts (res.data)
            });
    },[]);

    const totalPrice = () =>{

        const totalPrice=carts.map(cart => cart.mount * parseInt(cart.price))
        .reduce((pre,next)=> pre + next,0);
        return totalPrice;
    }

    const updateCart = cart =>{
        const newCarts = [...carts];
        // console.log(cart);
        // console.log(newCarts);
        const _index = newCarts.findIndex (c => c.id === cart.id);
        //從新購物車中刪掉與原購物車同樣的索引直,再加入更動的商品(cart)
        newCarts.splice(_index,1, cart);
        setCarts(newCarts);
    };

    const deleteCart =  cart =>{
        console.log(carts);
        //cartitem組件傳入刪除的商品id ,原購物車的商品id過濾不是傳入的id
        const _carts = carts.filter (c=> c.id !== cart.id);
        // console.log(_carts);
        setCarts(_carts);
    }

    return(
        // <Layout>
        <div className="cart-page">
            <span className="cart-title">Shopping Cart</span>
            <div className="cart-list">
                <TransitionGroup component={null}>
                    {carts.map(cart => (
                        <div className="cart-content" timeout={300} key={cart.id}>
                            <CartItem
                            key={cart.id}
                            cart={cart}
                            updateCart={updateCart}
                            deleteCart={deleteCart} />
                        </div>
                    ))}
                </TransitionGroup>

            </div>
            {carts.length===0?<p className="no-cart">NO GOODS</p> : ''}

            <div className="cart-total">
                Total:
                <span className="total-price">NTS {totalPrice()}</span>
            </div>
        </div>
    // </Layout>
    )
};

export default Cart;