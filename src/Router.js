import React,{ useState}from 'react';
import { BrowserRouter, Switch, Route, Link , withRouter} from 'react-router-dom';
import App from 'pages/App';
import Login from 'pages/Login';
import Cart from 'pages/Cart';
import Register from 'pages/Register';
import NotFound from 'pages/NotFound';
import Layout from 'Layout';
import Products from 'components/Products';
import axios from 'commons/axios';
import auth from "commons/auth";
import Header from "components/Header";
// import UserProfile from 'components/UserProfile';


const Router = props => {
    console.log('props',props);

    //tab
    const [tabIndex,setTabIndex]= useState(0);
    const [newProducts,setNewProducts]=useState([]);

    const clickTabs = async(index) =>{
        // console.log("index:",index);
        const tabIndex=index;
        setTabIndex(tabIndex);

        if(tabIndex===0){
            const res = await axios.get(`https://webstorenashi-api.herokuapp.com/products?category=1`);
            const newProducts = res.data;
            setNewProducts(newProducts);

            // console.log("newProducts",newProducts);
        }else if (tabIndex === 1){
            const res = await axios.get(`https://webstorenashi-api.herokuapp.com/products?category=2`);
            const newProducts = res.data;
            setNewProducts(newProducts);
            console.log("newProducts",newProducts);

        }else if (tabIndex ===2){
            const res = await axios.get(`https://webstorenashi-api.herokuapp.com/products?category=3`);
            const newProducts = res.data;
            setNewProducts(newProducts);
            console.log("newProducts",newProducts);

        }

    }

    //購物車

    const [cartNum, setCarNum] = useState(0);

    //更改toolbox的購物車數量 (product組件->products組件->toolBox組件)
    const updateCartNum = async () => {
        const cartNum = await initCartNum()
        setCarNum(cartNum);
    };

    const initCartNum = async () =>{
        const user = auth.getUser() || {};
        const res = await axios.get('/carts',{
            params:{
                userId: user.email
            }
        });
        const carts = res.data
        console.log (carts);

        const cartNum =carts
        .map(cart => cart.mount) //(會拿到cart 中每個組件的mount)
        .reduce((pre, next) => pre + next ,0)
        return cartNum

    }


return(

    <BrowserRouter>
        <Layout  cartNum={cartNum} clickTabs={clickTabs}/>
        <Switch>
                <Route path="/" exact >
                    <Products
                        initCartNum={initCartNum}
                        updateCartNum={updateCartNum}
                        cartNum={cartNum}
                        newProducts={newProducts}
                        tabIndex={tabIndex}
                        />
                </Route>
                <Route path="/login"  component={Login}/>
                <Route path="/cart" component={Cart} />
                <Route path="/register" component={Register} />
                <Route path="/clip_on_earing" component={Products} />
                <Route path="/pierced_earing" component={Products} />
                <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
    )

};


export default Router;