import React, { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didsubmit, setdidsubmit] = useState(false);

  const cartCtx = useContext(CartContext);

  //const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const totalAmount = `$${cartCtx.totalAmount}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch("https://fondboy.backendless.app/api/data/orders", {
      method: "POST",
      body: JSON.stringify(
       // user: userData,
       userData,
       // orderedItem: cartCtx.items,
      ),
    });
    setIsSubmitting(false);
    setdidsubmit(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const modalAction = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        بستن
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          سفارش
        </button>
      )}
    </div>
  );
  const isSubmittingModalContent = <p>درحال ارسال </p>;
  const didSubmitModalContent = (
    <React.Fragment>
      <p>سفارش با موفقیت ثبت شد ! </p>

      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          بستن
        </button>
      </div>
    </React.Fragment>
  );
  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>تعداد کل</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalAction}
    </React.Fragment>
  );
  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didsubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didsubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
