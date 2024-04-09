import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Cart from "../Cart";
export default function Modal({ children,onClose, open, className = "" }) {
  const dialog = useRef();
  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);
  return createPortal(
    <dialog ref={dialog} onClose={onClose} className={`modal ${className}`}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
