import React, {useContext} from "react";

import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'
import CartContext from "../../store/cart-context";

const HeaderCartButton = props => {
    const cartCtx = useContext(CartContext);
    //Updates the cart amount. currNum is the items number.
    //Takes the sum of the array index items
    const cartAmount = cartCtx.items.reduce((currNum, item) => {
        return currNum + item.amount
    }, 0)

    return (
            <button className={classes.button} onClick={props.onClick}>
                <span className={classes.icon}><CartIcon /></span>
                <span className={classes.bump}>Your Cart</span>
                <span className={classes.badge}>{cartAmount}</span>
            </button>
    )
};

export default HeaderCartButton