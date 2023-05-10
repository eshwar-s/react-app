import { useEffect, useMemo } from "react";

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

export function useTodoList(lists) {
  return useMemo(() => {
    return lists.filter((list) => !list.builtIn);
  }, [lists]);
}
