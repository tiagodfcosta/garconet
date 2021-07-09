import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

//TODO pop up para incrementar quantidade e pedir produto
// export default () => (
//     <Popup trigger={<button> Trigger</button>} position="right center">
//       <div>Popup content here !!</div>
//     </Popup>
//   );


export class Bebidas extends React.Component{
    constructor(props){
        super(props);
    }


    handleClick(){

    }

    render(){
        return (
        <>
            
            <div>
           
            </div>
            <div>
                <button onClick={this.handleClick}>Coca</button>
                <button onClick={this.handleClick}>extasi</button>
                <button onClick={this.handleClick}>com sabor</button>
                <button onClick={this.handleClick}>a careca</button>
            </div>
        </>
        )
    }
}

