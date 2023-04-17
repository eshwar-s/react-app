import { useEffect } from "react";

export const useDisableContextMenu = () => {
  useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);
};
