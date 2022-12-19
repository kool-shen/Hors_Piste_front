import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    passportImg: "",
    connectionCode: "",
    token: "",
    userId: "",
    mission: {
      projectName: ''
    },
    name: "",
    surname: "",
    gender: "",
    password: "",
    email: "",
    passportImg: "",
    folderIds: {
      mainFolderId: "",
      completeFolderId: "",
      toSignFolderId: "",
      toValidateFolderId: "",
    },
    photo: "",
    birthDate: "",
    birthCity: "",
    phone: "",
    degrees: "",
    occupation: "",
    RIBImg: "",
    IBAN: "",
    CESNumber: "",
    ICNumber: "",
    ICExpirationDate: "",
    address: {
      street: "",
      zipCode: "",
      city: "",
      country: "",
    },
    emergencyContact: {
      name: "",
      surname: "",
      relation: "",
      phone: "",
    },

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

export const { addUser, updateUserProperties, updateManyUserProperties } =
  userSlice.actions;
export default userSlice.reducer;
