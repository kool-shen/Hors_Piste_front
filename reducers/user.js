import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    email: "",
    passportImg: "",
    folderId: "",
    connectionCode: "",
    token: "",
    userId: "",
    mission: { _id: "639494b656430998cd5eabb1" },
    name: "",
    surname: "",
    gender: "",
    password: "",
    email: "chen@gmail.com",
    passportImg: "",
    folderIds: {
      mainFolderId: "1ywHhaMbyg6PJFYBbyMbZ3cmbGoeRVe_-",
      completeFolderId: "1wDyGB2C4l65tT_7GBMcj_dX23h9mQPZ2",
      toSignFolderId: "1QvIdyPb2ekYueYumJUtdMDMNVbbl63Oh",
      toValidateFolderId: "1iiSAEEbHeXFHbmXbKoFZcS7-ifxHyR8z",
    },
    connectionCode: "6398a42dac77fef2a1ea8bb3",
    token: "",
    userId: "6398a42dac77fef2a1ea8bb3",
    mission: { _id: "63978a322c47055615199fbf" },
    name: "Youss",
    surname: "Chen",
    gender: "Non-binary",
    password: "$2b$10$JyKMRgRCbEG1nC2lQn1eWu7YFIRujndUoO8v7F4Gg5j1zZYbvuHuy",
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
