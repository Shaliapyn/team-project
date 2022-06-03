import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    member : {
        email: null,
        firstName: null,
        lastName: null,
        score: null,
        role: null,
        id: null,
        birthDate: null,
        phone: null,
        organisation: null,
    }
};

const memberSlice = createSlice({
    name: 'member',
    initialState,
    reducers: {
        setMember(state, action) {
            state.member = action.payload;
        },
        removeMember(state) {
            state.member.email = null;
            state.member.firstName = null;
            state.member.lastName = null;
            state.member.score = null;
            state.member.role = null;
            state.member.id = null;
            state.member.birthDate = null;
            state.member.phone = null;
            state.member.organisation = null;
        },
    },
});

export const {setMember, removeMember} = memberSlice.actions;

export default memberSlice.reducer;