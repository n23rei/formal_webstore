//1.一次調用
//2.裝載組件
//(1) 子組件作為參數傳遞並被渲染
//(2)子組件可以關閉彈出層
//(3)子組件語調用者可以通訊

import React from 'react';
import {render} from 'react-dom';

class Panel extends React.Component{

    state ={
        active: false
    };
    open = () =>{
        this.setState({
            active: true
        })
    };
    close = () => {
        this.setState({
            active : false
        })
    };

    render(){

        const _class={
            true: 'panel-wrapper active',
            false: 'panel-wrapper'
        }
        return(
            <div className={_class[this.state.active]}>
                <div className="over-layer"onClick={this.close}></div>
                <div className="panel">
                    <div className="head">
                        <span className="close" onClick={this.close}>x</span>
                        <p className="has-text-centered">Chiledren component</p>
                    </div>
                </div>
            </div>
        );
    }
};

const _div= document.createElement('div');
document.body.appendChild(_div);
const _panel=render(<Panel/>,_div);

console.log(_panel);
export default _panel ;