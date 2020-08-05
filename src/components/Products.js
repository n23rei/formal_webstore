import React  from 'react';
// import axios from 'axios';
import axios from 'commons/axios';
import {CSSTransition,TransitionGroup} from 'react-transition-group';
import ToolBox from 'components/ToolBox';
import Product from 'components/product';
import Panel from 'components/Panel';
import auth from "commons/auth";
import Footer from 'components/Footer';
import { withRouter } from 'react-router-dom';

class Products extends React.Component{
    state={
        products:[],
        sourceProducts:[],
        currentPage: this.props.history.location.search
    };

    //組件初次渲染時執行
    componentDidMount(props){
        console.log('componentDidMount')
        // fetch('http://localhost:3003/products')
        //     .then(response => response.json() )
        //     .then(data =>{
        //         console.log(data);
        //         this.setState ({
        //             products : data
        //         }) ;
        //     });
        function fetchByCategoryId(categoryId, callback) {
            axios.get(`https://webstorenashi-api.herokuapp.com/products?category=${categoryId}`)
            .then(response=> callback(response));
        }

        switch (this.state.currentPage) {
            case '?tabName=clip_on_earing':
                fetchByCategoryId(1, response => (
                    this.setState ({
                        products : response.data,
                        sourceProducts: response.data
                    })
                ))
                break;
            case '?tabName=pierced_earing':
                fetchByCategoryId(2, response => (
                    this.setState ({
                        products : response.data,
                        sourceProducts: response.data
                    })
                ))
                break;
            case '?tabName=ring':
                fetchByCategoryId(3, response => (
                    this.setState ({
                        products : response.data,
                        sourceProducts: response.data
                    })
                ))
                break;
        
            default:
                fetchByCategoryId(1, response => (
                    this.setState({
                        products : response.data,
                        sourceProducts: response.data
                    })
                ))
                break;
        }


        this.props.updateCartNum();//一開始要拿到購物車的值

    }

    //search
    search = text => {
        console.log(text);
        //1.get new array
        let _products = [...this.state.sourceProducts];
        //2.filter new array
        _products= _products.filter(p=>{
            //name: Abcd
            //text:ab ===> ['ab']
            //text:'' ===> ["","","",""]
            const matchArray = p.name.match(new RegExp(text,'gi'))
            return !!matchArray
        })

        //3.set State
        this.setState({
            products: _products
        })

    }

    toAdd = () =>{
        Panel.open()
    }


    //更改toolbox的購物車數量 (product組件->products組件->toolBox組件)
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
        return(
            <React.Fragment>
                <div>
                    <ToolBox search={this.search} cartNum={this.props.cartNum} />
                    <div className="products">
                        <div className=" product-card ">
                            <TransitionGroup component={null}>
                            {this.state.products.map((p)=>{
                                    return(
                                        //time out 是指整個組件作用時間,所以css效果要大於等於time out
                                        <CSSTransition classNames="product-fade" timeout={300} key={p.id}>
                                            <div className="about-product" key={p.id}>
                                                <Product
                                                product={p}
                                                updateCartNum={this.props.updateCartNum}/>
                                            </div>
                                        </CSSTransition>


                                    )
                                })
                            }
                            </TransitionGroup>
                        </div>
                    {/* <button className="button is-primary add-btn" onClick={this.toAdd}>add</button> */}

                    </div>
            </div>  <Footer/></React.Fragment>

        )
    }


}

export default withRouter(Products);
