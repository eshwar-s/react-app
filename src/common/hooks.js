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

export function useImportantTasks(lists) {
  return useMemo(() => {
    return lists.flatMap((list) =>
      list.items.filter((item) => item.isImportant)
    );
  }, [lists]);
}

export function usePlannedTasks(lists) {
  return useMemo(() => {
    return lists.flatMap((list) => list.items.filter((item) => item.dueDate));
  }, [lists]);
}

export function useSelectedTask(taskId, lists) {
  return useMemo(() => {
    for (const list of lists) {
      const task = list.items.find((item) => item.id === taskId);
      if (task) {
        return task;
      }
    }
    return null;
  }, [taskId, lists]);
}
