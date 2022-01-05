import React, { useContext, useEffect, useState } from "react";

import classes from './Card.module.css'
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem"

const Cart = props => {
    const [disable, setDisable] = useState()

    const cartCtx = useContext(CartContext);

    const totalAmount = `${cartCtx.totalAmount.toFixed(2)}`;

    useEffect(() => {
        const hasItems = cartCtx.items.length;
        if (hasItems > 0) {
            setDisable(false)
        }
        if (hasItems <= 0) {
            setDisable(true)
        }
    }, [setDisable, cartCtx])

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 })
    };

    const cartItems = <ul className={classes['cart-items']}>
        {cartCtx.items.map(
            (item) => <CartItem
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                amount={item.amount}
                //Bind on this case is for repassing the function arguments
                //null first arg and item second arg
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
                onAdd={cartItemAddHandler.bind(null, item)}
            />
        )}</ul>;

    return (
        <Modal onClick={props.onHideCart}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']}
                    onClick={props.onHideCart}>Close</button>
                <button disabled={disable} className={classes.button}>Order</button>
            </div>
        </Modal>

    )
};

export default Cart