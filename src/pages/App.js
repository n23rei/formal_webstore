import React  from 'react';
import Products from 'components/Products';
import Layout from 'Layout';
import auth from "commons/auth";
import axios from 'commons/axios';

class App extends React.Component{

    // state={
    //     cartNum: 0
    // };


    // //更改toolbox的購物車數量 (product組件->products組件->toolBox組件)
    // updateCartNum = async () => {
    //     const cartNum = await this.initCartNum()
    //     this.setState({
    //         cartNum: cartNum
    //     });

    // };

    // initCartNum = async () =>{
    //     const user = auth.getUser() || {};
    //     const res = await axios.get('/carts',{
    //         params:{
    //             userId: user.email
    //         }
    //     });
    //     const carts = res.data
    //     console.log (carts);

    //     const cartNum =carts
    //     .map(cart => cart.mount) //(會拿到cart 中每個組件的mount)
    //     .reduce((pre, next) => pre + next ,0)
    //     return cartNum

    // }

    render(){
        console.log("APP-props",this.props)
        return(
            // <Layout updateCartNum={this.updateCartNum} initCartNum={this.initCartNum} cartNum={this.state.cartNum} >
                <Products />
            // </Layout>
        );
    }


}

export default App;
