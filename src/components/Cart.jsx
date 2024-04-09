import { useContext } from "react";
import Modal from "./UI/Modal";
import { CartContext } from "../store/CartContext";
import { UseProgressContext } from "../store/UseProgressContext";
import { currencyFormatter } from "../util/formating";
import Button from "./UI/Button";
import CartItem from "./CartItem";
export default function Cart() {
  const cartCtx = useContext(CartContext);
  
  const CartTotal = cartCtx.items.reduce((total, item) => {
    return (total += item.price * item.quantity);
  }, 0);

  const UserProgressCtx = useContext(UseProgressContext);

  function handleCloseCart() {
    UserProgressCtx.hideCart();
  }
  function handleCheckout(){
    UserProgressCtx.showCheckout();
  }
  return (
    <Modal className="cart" open={UserProgressCtx.progress === "cart"} onClose={UserProgressCtx.progress==='cart'?handleCloseCart:null }>
      <h2>Your Order</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            {...item}
            isIncrease={() => cartCtx.addItem(item)}
            isDecrease={() => cartCtx.removeItem(item)}
          />
        ))}
      </ul>
      <p className="cart-total">
        Total Price - {currencyFormatter.format(CartTotal)}
      </p>
      <p className="modal-actions">
        <Button onClick={handleCloseCart} textOnly>
          Close
        </Button>
        { CartTotal>0 && <Button onClick={handleCheckout}>Go to Checkout</Button>}
      </p>
    </Modal>
  );
}
