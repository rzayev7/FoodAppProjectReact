import { createContext, useState } from "react";



export const UseProgressContext = createContext({
    progress: "", //'cart','checkout'
    showCart:()=>{},
    hideCart:()=>{},
    showCheckout:()=>{},
    hideCheckout:()=>{}
});

export const UseProgressContextProvider=({children})=>{
    const [userProgress,setUserProgress] = useState('');

    function showCart(){
        setUserProgress('cart');
    }
    function hideCart(){
        setUserProgress('');
    }
    function showCheckout(){
        setUserProgress('checkout');
    }
    function hideCheckout(){
        setUserProgress(''); 
    }

    const userProgressCtx = {
        progress:userProgress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout,
    }

    return <UseProgressContext.Provider value={userProgressCtx}>
        {children}
    </UseProgressContext.Provider>
}

