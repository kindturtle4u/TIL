import {reactive, toRef} from "vue";

export const useStorage = () => {
    const KEY = 'my-todo-list';
    const storage_obj = reactive( { storage_id: 0});
    const loadTodos = (initTodos) => {
        let temp_todo = JSON.parse(localStorage.getItem(KEY) || '[]');
        temp_todo.forEach((todo, idx) => {
            todo.id = idx;
        });

        storage_obj.storage_id = temp_todo.length;
        initTodos(temp_todo);
    }

    const saveTodos = (todos) => {
        localStorage.setItem(KEY, JSON.stringify(todos.value))
    }

    return {
        ...toRef(storage_obj),
        loadTodos,
        saveTodos,
    }
}