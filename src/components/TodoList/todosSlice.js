// const initState = [
//   { id: 1, name: 'Learn Yoga', completed: false, priority: 'Medium' },
//   { id: 2, name: 'Learn Redux', completed: true, priority: 'High' },
//   { id: 3, name: 'Learn JavaScript', completed: false, priority: 'Low' },
// ];

// const todoListReducer = (state = initState, action) => {
//   switch (action.type) {
//     case 'todoList/addTodo':
//       return [...state, action.payload];

//     case 'todoList/toggleTodoStatus':
//       return state.map((todo) =>
//         todo.id === action.payload
//           ? { ...todo, completed: !todo.completed }
//           : todo
//       );
//     default:
//       return state;
//   }
// };

// export default todoListReducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const todosSlice = createSlice({
  name: "todoList",
  initialState: {
    status: "idle",
    todos: [],
  },
  reducers: {
    // IMMER
    addTodo: (state, action) => {
      state.push(action.payload);
    }, // action creators
    toggleTodoStatus: (state, action) => {
      const currentTodo = state.find((todo) => todo.id === action.payload);
      if (currentTodo) {
        currentTodo.completed = !currentTodo.completed;
      }
    },
  },
  extraReducers: (buider) => {
    buider
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.status = "idle";
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(updateTodo.fulfilled,(state, action) =>{
        let currentTodo = state.todos.find((todo) => todo.id === action.payload);

        currentTodo = action.payload
      })
  },
});

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const res = await fetch("api/todos");
  const data = await res.json();
  return data.todos;
});

export const addNewTodo = createAsyncThunk(
  "todos/addNewTodos",
  async (newTodo) => {
    const res = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify(newTodo),
    });
    const data = await res.json();
    console.log({ data });
    return data.todos;
  }
);
export const updateTodo = createAsyncThunk('todo/updataTodo', async (updatedTodo) =>{
    const res = await fetch('/api/updateTodo',{
      method:'POST',
      body: JSON.stringify(updatedTodo)

    })
    const data = await res.json()
    return data.todos
}) 

// export function addTodos(todo) {
//   //thunk acctions
//   return function addTodosThunk(dispatch, getState) {
//     dispatch(todosSlice.actions.addTodo(todo));
//   };
// }

export default todosSlice;
