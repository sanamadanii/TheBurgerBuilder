import React from 'react';
import Auxillary from '../../../hoc/Auxillary/Auxillary';
import Button from '../../UI/Button/Button';

const orderSummary =(props) =>{
    const ingrediantsSummary = Object.keys(props.ingrediants)
    .map(igkey => {
        return (
        <li key={igkey}> 
            <span 
            style={ {textTransform: 'capitalize'} }> {igkey} 
            </span> : 
            {props.ingrediants[igkey]}
        </li>
            
        );
    });

    return(
        <Auxillary>
            <h3>Your Order:</h3>
            <p>A delicious buger with the following ingredients:</p>
            <ul>
                {ingrediantsSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchasedCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Auxillary>
    )

};

export default orderSummary;