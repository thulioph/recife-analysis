// store
const initialState = {
    barCurrentValue: null
};

// action type
const CHANGE_CURRENT_VALUE_BAR = 'CHANGE_CURRENT_VALUE_BAR';

// action creator
export const changeBarCurrentValue = (val) => ({
    type: CHANGE_CURRENT_VALUE_BAR,
    payload: val
});

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case CHANGE_CURRENT_VALUE_BAR:
            return {
                ...state,
                barCurrentValue: payload
            }
        default:
            return state;
    }
};