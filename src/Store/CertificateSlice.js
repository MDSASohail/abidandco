import { createSlice } from '@reduxjs/toolkit';

const certificate = createSlice({
    name:"Certificate",
    initialState :{currentUser:[], allCertificate:[]},
    reducers:{
        addCurrentUser :(state,acion)=>{
              state.currentUser=acion.payload
        },
        addAllCertificate :(state, action) =>{
            state.allCertificate = action.payload
        }
    }
})

export const {addCurrentUser, addAllCertificate}= certificate.actions;
export default certificate.reducer;