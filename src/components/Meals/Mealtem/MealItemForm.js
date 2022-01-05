import React, {useRef, useState} from "react";

import classes from './MealItemForm.module.css'
import Input from "../../UI/Input";

const MealItemForm = props => {
    //It allow us to access input props
    const inputAmountRef = useRef();

    const [inputAmountIsValid, setIsValid] = useState(true)

    const sumbmitHandler = event => {
        event.preventDefault();

        const refValue = inputAmountRef.current.value;
        const enteredAmount = +refValue;

        if(refValue.trim().length === 0 || enteredAmount < 1 || enteredAmount > 5){
            setIsValid(false)
            return;
        }

        props.onAddToCart(enteredAmount);
    };

    return (
        <form className={classes.form} onSubmit={sumbmitHandler}>
            <Input 
            ref={inputAmountRef}
            label='Amount'
            input={{
                id: 'amount' + props.id,
                type: 'number',
                min: '1',
                max: '5',
                step:'1',
                defaultValue: '1'
            }}/>
            <button>+ Add</button>
            {!inputAmountIsValid && <p>
                Input is not valid. Please set a valid number (1-5)</p>}
        </form>
    )
};

export default MealItemForm