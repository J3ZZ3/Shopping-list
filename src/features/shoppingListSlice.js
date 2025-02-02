import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  lists: JSON.parse(localStorage.getItem('shoppingLists')) || [],
  searchKeyword: '',
  sortOption: 'name',
};

const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState,
  reducers: {
    setLists: (state, action) => {
      state.lists = action.payload;
      localStorage.setItem('shoppingLists', JSON.stringify(action.payload));
    },
    addList: (state, action) => {
      state.lists.push(action.payload);
      localStorage.setItem('shoppingLists', JSON.stringify(state.lists));
    },
    updateList: (state, action) => {
      const index = state.lists.findIndex(list => list.id === action.payload.id);
      state.lists[index] = action.payload;
      localStorage.setItem('shoppingLists', JSON.stringify(state.lists));
    },
    deleteList: (state, action) => {
      state.lists = state.lists.filter(list => list.id !== action.payload);
      localStorage.setItem('shoppingLists', JSON.stringify(state.lists));
    },
    searchLists: (state, action) => {
      state.searchKeyword = action.payload;
    },
    sortLists: (state, action) => {
      state.sortOption = action.payload;
      state.lists.sort((a, b) => {
        if (action.payload === 'name') return a.name.localeCompare(b.name);
        if (action.payload === 'category') return a.category.localeCompare(b.category);
        if (action.payload === 'date') return new Date(a.dateAdded) - new Date(b.dateAdded);
        return 0;
      });
    },
  },
});

export const { setLists, addList, updateList, deleteList, searchLists, sortLists } = shoppingListSlice.actions;

export const fetchLists = (userId) => async (dispatch) => {
  const response = await axios.get('http://localhost:5000/shoppingLists', { params: { userId } });
  dispatch(setLists(response.data));
};

export const createList = (list) => async (dispatch) => {
  const response = await axios.post('http://localhost:5000/shoppingLists', list);
  dispatch(addList(response.data));
};

export const editList = (id, listData) => async (dispatch) => {
  const response = await axios.patch(`http://localhost:5000/shoppingLists/${id}`, listData);
  dispatch(updateList(response.data));
};

export const removeList = (id) => async (dispatch) => {
  await axios.delete(`http://localhost:5000/shoppingLists/${id}`);
  dispatch(deleteList(id));
};

export default shoppingListSlice.reducer;