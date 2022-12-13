import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    name: "",
    surname: "",
    gender: "",
    email: "",
    password: "",
    photo: "",
    birthDate: "",
    birthCity: "",
    phone: "",
    degrees: "",
    occupation: "",
    IBAN: "",
    CESNumber: "",
    ICNumber: "",
    address: { street: "", zipCode: "", city: "", country: "" },
    emergencyContact: { name: "", surname: "", relation: "", phone: "" },
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.value = action.payload;
    },
    updateUserProperties: (state, action) => {
      state.value = { ...state.value, ...action.payload };
      console.log(state.value);
    },
    updateManyUserProperties: (state, action) => {
      action.payload.forEach((element) => {
        state.value = { ...state.value, ...element };
      });
    },
    deleteUser: (state, action) => {
      state.value = {};
    },
  },
});

export const {
  addUser,
  updateUserProperties,
  updateManyUserProperties,
  deleteUser,
} = userSlice.actions;
export default userSlice.reducer;

//dispatch(updateUserProperties({ propertyName: "degrees" }));
