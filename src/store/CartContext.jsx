import { createContext, useReducer } from "react";

export const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

function cartReducer(state, action) {
  console.log(state.items);
  console.log(action.item);

  const existingItemInArrayIndex = state.items.findIndex(
    (x) => x.id === action.item.id,
  );
  if (action.type === "ADD_ITEM") {
    const updatedItems = [...state.items];
    if (existingItemInArrayIndex>-1) {
      const existingItem = state.items[existingItemInArrayIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingItemInArrayIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }
    return { ...state, items: updatedItems };
  }
  if (action.type === "REMOVE_ITEM") {
    const existingCartItem = state.items[existingItemInArrayIndex];
    const updatedItems = [...state.items];
    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingItemInArrayIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingItemInArrayIndex] = updatedItem;
    }
    return { ...state, items: updatedItems };
  }
  console.log(CartContext);
}

export const CartContextProvider = ({ children }) => {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItem(item){
    dispatchCartAction({type:'ADD_ITEM',item:item});
  }
  function removeItem(item){
    dispatchCartAction({type:'REMOVE_ITEM',item:item})
  }
  const cartContext = {
    items:cart.items,
    addItem,
    removeItem
  };
  return (
    <CartContext.Provider value={cartContext}>
      {children}
    </CartContext.Provider>
  );
};
