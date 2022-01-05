import React, { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        //Return the index of the elements that (state.id===action.id)
        const existingCartItemIndex = state.items.findIndex(
            item => item.id === action.item.id
        );
        //Return the objects that have been add
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            //It join the state (existing items) and the action (the add item),
            //in one new array
            updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    };
    if (action.type === 'REMOVE'){
        const existingCartItemIndex = state.items.findIndex(
            item => item.id === action.id
        );
        const existingItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;

        if(existingItem.amount === 1){
            //If the - button is clicked and the amount is one
            //it will return a new array, without the item
            updatedItems = state.items.filter(item => item.id !== action.id);
        } else {    
            const updatedItem = {...existingItem, amount: existingItem.amount - 1}
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    };
};

const CartProvider = props => {
    //He uses the reducer here for manage the ADD ITEMS and REMOVE ITEMS state  
    const [cartState, dispatchCartState] = useReducer(cartReducer, defaultCartState)

    const addItemHandler = item => {
        dispatchCartState({ type: 'ADD', item: item });
    };

    const removeItemHandler = id => {
        dispatchCartState({ type: 'REMOVE', id: id });
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )

};

export default CartProvider