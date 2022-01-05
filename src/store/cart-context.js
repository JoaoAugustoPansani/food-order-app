import React from "react"

//Receives data {cartContext} from CartProvider, and send to Cart, HeaderCartButton
// and MealItem via useContext 
const CartContext = React.createContext({
    items:[],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {},
});

export default CartContext