import { useContext } from "react";
import Modal from "./UI/Modal";
import { CartContext } from "../store/CartContext";
import { currencyFormatter } from "../util/formating";
import Input from "./UI/Input";
import { UseProgressContext } from "../store/UseProgressContext";
import Button from "./UI/Button";
export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UseProgressContext);

  const totalAmount = cartCtx.items.reduce((total, current) => {
    return (total += current.price * current.quantity);
  }, 0);

  function handleClose() {
    userProgressCtx.hideCheckout();
  }
  function handleSubmit(e){
    e.preventDefault();

    const formData = new FormData(e.target);
    const customerData = Object.fromEntries(formData.entries());
    console.log(customerData);

    fetch('http://localhost:3000/orders',{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
        }, 
        body:JSON.stringify({
            order:{
                items,
                customer:customerData,
            }
        })
    })
  }
  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form action="" onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount:  {currencyFormatter.format(totalAmount)}</p>
        <Input label="Full Name" type="text" id="full-name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        <p className="modal-actions">
          <Button type="button" textOnly onClick={handleClose}>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}
