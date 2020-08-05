import React from 'react';
import axios from 'commons/axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import auth from "commons/auth";
import  { withRouter } from 'react-router-dom';



class Product extends React.Component{
    constructor(props) {
        super(props);
        // console.log("iiiiiiiiiiiiii:",props);
    }
    //點下購物車,會進入到資料庫,並比對是否資料庫有此筆資料改變mount

    addCart = async () => {
        if(!auth.isLogin()){
            this.props.history.push('/login');
            alert('請先登入');
            return;
        }
        try {
            const user= auth.getUser() || {};
            const { id, name, image, price } = this.props.product;
            const res = await axios.get(`/carts?productId=${id}`);
            const carts = res.data;
            const filterCarts=carts.filter((cart,index)=>{
                return cart.userId===user.email?true:false
            });

            // console.log("user carts:",carts);
            // console.log("res:",res);
            // console.log("filterCarts:", filterCarts);

            //filterCarts[0]['userId']===user.email

            if (filterCarts.length > 0 ) {
                const cartValue= filterCarts[0];
                cartValue.mount += 1;
                await axios.put(`/carts/${cartValue.id}`, cartValue);
                console.log("aaaa");
            } else {
                const cart = {
                    productId: id,
                    name,
                    image,
                    price,
                    mount: 1,
                    userId:user.email
                };
                await axios.post('/carts', cart);
                console.log("bbbb");
            }
            this.props.updateCartNum();
        } catch (error) {
            console.log('Add cart failed');
        }

    };
    renderMangerBtn= () => {
        const user= auth.getUser() || {};
        if(user.type===1){
            return(
                <div className="p-head has-text-right">
                    <span className="icon edit-btn">
                        <i className="fas fa-sliders-h"></i>
                    </span>
                </div>
            );

        };
    };
    render(){
        const {name , image1,image2  ,price} = this.props.product;
        //此為物件解構,從右邊取出左邊的東西 (物件解構) 右邊不能是字串跟陣列.

        const _pClass={
            available: 'product',
            unavailable: 'product out-stock'
        }
        return(
            <div >
                <div >
                    {/* {this.renderMangerBtn()} */}
                        <div className="image image-4by3 img-hover p-img">
                            <img  className="main-img"src={image1} alt={name} />
                            <img className="double-img" src={image2} alt={name} />
                        </div>
                    
                </div>
                <div className="p-name">
                    <p >{name}</p>
                </div>
                <div className="p-footer">
                    <p className="p-price">NTS {price}</p>
                    <button
                        className="add-cart"
                        onClick={this.addCart}
                    >
                        <i className="fas fa-shopping-cart"></i>
                        <i className="fas fa-exclamation"></i>
                    </button>
                </div>
            </div>
        )
    }
}

export default withRouter(Product);
