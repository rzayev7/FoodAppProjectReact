import Cart from "./components/Cart";
import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContextProvider } from "./store/CartContext";
import { UseProgressContextProvider } from "./store/UseProgressContext";
function App() {
  return (
    <UseProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
      </CartContextProvider>
    </UseProgressContextProvider>
  );
}

export default App;
