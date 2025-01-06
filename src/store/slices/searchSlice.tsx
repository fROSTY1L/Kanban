import { createSlice } from "@reduxjs/toolkit";

interface SearchState {
    value: string
}

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        value: ''
    },
    reducers: {
        setSearch: (state: SearchState, action) => {
            state.value = action.payload
        }
    }
})

export const { setSearch } = searchSlice.actions
export default searchSlice.reducer