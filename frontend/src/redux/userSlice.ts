import { createSlice } from '@reduxjs/toolkit';

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('reduxState');
        if (serializedState === null) {
            return null;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return null;
    }
};

const saveState = (state: any) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('reduxState', serializedState);
    } catch (error) {
        console.log(error);
    }
};

const initialState = loadState();

const userSlice = createSlice({
    name: 'user',
    initialState: initialState !== null ? initialState : null,
    reducers: {
        setUser: (_, action) => {
            const newState = action.payload;
            saveState(newState);
            return newState;
        },
        clearUser: (_) => {
            saveState(null);
            return null;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
