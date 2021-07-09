import React from 'react';
import React, { useState } from 'react';
import Popup from './Popup';
import 'reactjs-popup/dist/index.css';

//TODO pop up para incrementar quantidade e pedir produto
// export default () => (
//     <Popup trigger={<button> Trigger</button>} position="right center">
//       <div>Popup content here !!</div>
//     </Popup>
//   );

export default function buttonPopUp () {
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }
}

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
    <input
      type="button"
      value="Click to Open Popup"
      onClick={togglePopup}
    />
    <p>Alberto</p>
    {isOpen && <Popup
      content={<>
        <b>Design your Popup</b>
        <p>Joaquim</p>
        <button>Test button</button>
      </>}
      handleClose={togglePopup}
    />}
  </div>  
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

