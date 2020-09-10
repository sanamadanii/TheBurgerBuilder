import React,{Component} from 'react';
import Auxillary from '../../hoc/Auxillary/Auxillary';
import Burger from '../../Components/Burger/Burger';
import BuildControls  from '../../Components/Burger/BuildControls/BuildControls';
import Model from '../../Components/UI/Model/Model';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';

const INGREDIANT_PRICE ={
    salad: 0.5,
    cheese:0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
   // constructor(props){
   //     super(props);
   //     this.state={...}
   // }
    state={
        ingrediants:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0,
        },
        totalPrice : 4,
        purchasable : false,
        purchasing: false
    }
    updatePurchaseState (ingrediants) {
        
        const sum = Object.keys(ingrediants)
        .map( igkey =>{
            return ingrediants[igkey];
        } ).reduce((sum,el)=>{
            return sum +el;
        },0);
        this.setState({purchasable: sum > 0});
    }
    addIngrediantHandler = (type) => {
        const oldCount = this.state.ingrediants[type];
        const updatedCount = oldCount + 1;
        const updatedIngrediants = {
            ...this.state.ingrediants
        };
        updatedIngrediants[type] = updatedCount;
        const priceAddition = INGREDIANT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice , ingrediants:updatedIngrediants});
        this.updatePurchaseState(updatedIngrediants);
    }
    removeIngrediantHandler = (type) => {
        const oldCount = this.state.ingrediants[type];
        if (oldCount <= 0){
            return;
        }
        else{
        const updatedCount = oldCount - 1;
        const updatedIngrediants ={
            ...this.state.ingrediants
        }
        updatedIngrediants[type] = updatedCount;
        const priceSubtract = INGREDIANT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceSubtract;
        this.setState({ totalPrice: newPrice , ingrediants:updatedIngrediants});
        this.updatePurchaseState(updatedIngrediants);

    }
    }

    purchaseHandler = () => {
        this.setState({purchasing:true});
    }
    purchaseCancelHandler =()=>{
        this.setState({purchasing:false});
    }
    purchaseContinueHandler = () =>{
        alert("You continue!");
    }
    render(){
        const disabledInfo ={
            ...this.state.ingrediants
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0 
        }
        // {salad: true, meat: false, ...}
        return(
           <Auxillary>
               <Model show={this.state.purchasing} modelClosed={this.purchaseCancelHandler}>
                   <OrderSummary 
                        ingrediants={this.state.ingrediants}
                        purchasedCanceled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        price={this.state.totalPrice}/>
               </Model>
               <Burger ingrediants={this.state.ingrediants}/>
               <BuildControls
                    ingerediantAdded={this.addIngrediantHandler}
                    ingrediantSubtracted={this.removeIngrediantHandler}
                    disabled ={disabledInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice}/>
           </Auxillary>
        );
    }
}

export default BurgerBuilder;