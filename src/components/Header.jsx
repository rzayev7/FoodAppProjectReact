import { useContext } from "react";
import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button";
import { CartContext } from "../store/CartContext";
import {UseProgressContext} from "../store/UseProgressContext";
const Header = () => {
  const cartCtx = useContext(CartContext);
  const UserProgressCtx = useContext(UseProgressContext);

  const totalCartItems = cartCtx.items.reduce((totalNumOfItems, item) => {
    return totalNumOfItems + item.quantity;
  }, 0);

  function handleShowCart() {
    UserProgressCtx.showCart();
  }
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A restaurant" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button onClick={handleShowCart} textOnly>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
};
export default Header;
