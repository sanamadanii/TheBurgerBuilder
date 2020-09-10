import React from 'react';
import burgerIngrediant from './BurgerIngrediants/BurgerIngrediants';
import classes from './Burger.css'
import BurgerIngrediants  from './BurgerIngrediants/BurgerIngrediants';

const burger =(props)=>{
    let transformedIngrediants = Object.keys(props.ingrediants)
        .map( igkey=>{
            return [...Array(props.ingrediants[igkey])].map((_,i)=>{
               return <BurgerIngrediants key={igkey + i} type={igkey}/>;
            });
        }).reduce( (arr,el) => {
             return arr.concat(el)
        } ,[]);
        if (transformedIngrediants.length ===0){
            transformedIngrediants = <p>Please start adding ingrediants</p>
        }
    return(
        <div className={classes.Burger}>
            <BurgerIngrediants type="bread-top"/>
            {transformedIngrediants}
            <BurgerIngrediants type="bread-bottom"/>
        </div>
    );
}

export default burger;