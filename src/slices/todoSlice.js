// src/redux/todoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    updateTodo: (state, action) => {
      const index = state.todos.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    updateTodoCompletion: (state, action) => {
        const index = state.todos.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) {
          state.todos[index].completed = action.payload.completed;
        }
      },
  },
});

// Export actions
export const { setTodos, addTodo, updateTodo, deleteTodo, setLoading, setError,updateTodoCompletion } = todoSlice.actions;

// Export the reducer
export default todoSlice.reducer;




// // src/slices/todoSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Async thunks for API operations
// export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (_, { rejectWithValue }) => {
//   try {
//     const token = localStorage.getItem('token'); // Get the token inside the thunk
//     const response = await axios.get('http://localhost:8001/api/todo/getTodos', {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response?.data || 'An error occurred');
//   }
// });

// export const addTodo = createAsyncThunk('todos/addTodo', async (newTodo, { rejectWithValue }) => {
//   try {
//     const token = localStorage.getItem('token'); // Get the token inside the thunk
//     const response = await axios.post('http://localhost:8001/api/todo/createTodo', newTodo, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response?.data || 'An error occurred');
//   }
// });

// export const updateTodo = createAsyncThunk('todos/updateTodo', async (updatedTodo, { rejectWithValue }) => {
//   try {
//     const token = localStorage.getItem('token'); // Get the token inside the thunk
//     const response = await axios.put(`http://localhost:8001/api/todo/updateTodo/${updatedTodo.id}`, updatedTodo, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response?.data || 'An error occurred');
//   }
// });

// export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id, { rejectWithValue }) => {
//   try {
//     const token = localStorage.getItem('token'); // Get the token inside the thunk
//     await axios.delete(`http://localhost:8001/api/todo/deleteTodo/${id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return id;
//   } catch (error) {
//     return rejectWithValue(error.response?.data || 'An error occurred');
//   }
// });

// // Initial state
// const initialState = {
//   todos: [], // Initialize as an array
//   loading: false,
//   error: null,
// };

// // Redux Slice
// const todoSlice = createSlice({
//   name: 'todos',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchTodos.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchTodos.fulfilled, (state, action) => {
//         state.loading = false;
//         state.todos = Array.isArray(action.payload) ? action.payload : []; // Ensure payload is an array
//       })
//       .addCase(fetchTodos.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || action.error.message;
//       })
//       .addCase(addTodo.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(addTodo.fulfilled, (state, action) => {
//         state.loading = false;
//         if (Array.isArray(state.todos)) { // Ensure state.todos is an array before pushing
//           state.todos.push(action.payload);
//         } else {
//           state.todos = [action.payload]; // Fallback to initialize as an array with the new todo
//         }
//       })
//       .addCase(addTodo.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || action.error.message;
//       })
//       .addCase(updateTodo.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateTodo.fulfilled, (state, action) => {
//         state.loading = false;
//         const index = state.todos.findIndex(todo => todo.id === action.payload.id);
//         if (index !== -1) {
//           state.todos[index] = action.payload;
//         }
//       })
//       .addCase(updateTodo.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || action.error.message;
//       })
//       .addCase(deleteTodo.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deleteTodo.fulfilled, (state, action) => {
//         state.loading = false;
//         state.todos = state.todos.filter(todo => todo.id !== action.payload);
//       })
//       .addCase(deleteTodo.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || action.error.message;
//       });
//   },
// });

// // Export the reducer
// export default todoSlice.reducer;
