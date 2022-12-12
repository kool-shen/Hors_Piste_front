import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: {},
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		addUser: (state, action) => {
            state.value = action.payload
		},
        updateUserProperties: (state, action) => {
            state.value = {...state.value, ...action.payload}
        },
        updateManyUserProperties: (state, action) => {
            action.payload.forEach(element => {
                state.value = {...state.value, ...element}
            });
        },
        deleteUser: (state, action) => {
            state.value = {}
        } 
	},
});

export const { addUser, addCity, deleteCity } = userSlice.actions;
export default userSlice.reducer;

dispatch(updateUserProperties({propertyName: 'degrees', }))