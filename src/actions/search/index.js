// store
const initialState = {
    year: 0,
    keyword: ''
};

// action type
const UPDATE_YEAR = 'UPDATE_YEAR';
const UPDATE_KEYWORD = 'UPDATE_KEYWORD';

// action creator
export const updateYear = (val) => ({
    type: UPDATE_YEAR,
    payload: val
});

export const updateKeyword = (val) => ({
    type: UPDATE_YEAR,
    payload: val
});

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case UPDATE_YEAR:
            return {
                ...state,
                year: payload
            }
        case UPDATE_KEYWORD:
            return {
                ...state,
                keyword: payload
            }
        default:
            return state;
    }
};