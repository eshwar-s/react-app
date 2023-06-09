import { useEffect, useMemo } from "react";
import { FLAGGED_LIST_NAME, TASKS_LIST_NAME } from "../model/todo-list";

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

export function useTodoLists(lists) {
  return useMemo(() => {
    return lists.filter((list) => !list.builtIn);
  }, [lists]);
}

export function useTaskList(lists) {
  return useMemo(() => {
    return lists.find((list) => list.builtIn && list.name === TASKS_LIST_NAME);
  }, [lists]);
}

export function useFlaggedList(lists) {
  return useMemo(() => {
    return lists.find(
      (list) => list.builtIn && list.name === FLAGGED_LIST_NAME
    );
  }, [lists]);
}

export function useImportantTasks(lists, includeCompleted) {
  return useMemo(() => {
    return lists.flatMap((list) =>
      list.items.filter(
        (item) => item.isImportant && (includeCompleted || !item.isCompleted)
      )
    );
  }, [lists, includeCompleted]);
}

export function usePlannedTasks(lists, includeCompleted) {
  return useMemo(() => {
    return lists.flatMap((list) =>
      list.items.filter(
        (item) => item.dueDate && (includeCompleted || !item.isCompleted)
      )
    );
  }, [lists, includeCompleted]);
}

export function useMyDayTasks(lists, includeCompleted) {
  return useMemo(() => {
    const today = new Date().toDateString();
    return lists.flatMap((list) =>
      list.items.filter(
        (item) =>
          item.dueDate &&
          new Date(item.dueDate).toDateString() === today &&
          (includeCompleted || !item.isCompleted)
      )
    );
  }, [lists, includeCompleted]);
}
