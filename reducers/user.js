import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    email: "",
    passportImg: '',
    folderId: '',
    connectionCode: '',
    token: '',
    userId: '',
    mission: { _id: "639494b656430998cd5eabb1" },
    name: "",
    surname: "",
    gender: "",
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
    ICExpirationDate: "",
    address: {
      street: '',
      zipCode: "",
      city: "",
      country: ""
    },
    emergencyContact: {
      name: "",
      relation: "",
      phone: ""
    },
  }
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
    }
  }
});

export const { addUser, updateUserProperties, updateManyUserProperties } = userSlice.actions;
export default userSlice.reducer;

