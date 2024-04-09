import { useContext } from "react";
import { CartContext } from "../store/CartContext";
import { currencyFormatter } from "../util/formating";

export default function CartItem({
  name,
  quantity,
  price,
  isIncrease,
  isDecrease,
}) {

  return (
    <li className="cart-item">
      <p>
        {name} - {quantity} x {currencyFormatter.format(price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={isIncrease}>+</button>
        <button>{quantity}</button>
        <button onClick={isDecrease}>-</button>
      </p>
    </li>
  );
}
