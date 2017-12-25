// store
const initialState = {
    barCurrentValue: null,
    bubbleCurrentValue: null
};

// action type
const CHANGE_CURRENT_VALUE_BAR = 'CHANGE_CURRENT_VALUE_BAR';
const UPDATE_BUBBLE_VALUE = 'UPDATE_BUBBLE_VALUE';

// action creator
export const changeBarCurrentValue = (val) => ({
    type: CHANGE_CURRENT_VALUE_BAR,
    payload: val
});

export const changeBubbleValue = (val) => ({
    type: UPDATE_BUBBLE_VALUE,
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
        
        case UPDATE_BUBBLE_VALUE:
            return {
                ...state,
                bubbleCurrentValue: payload
            };
        
        default:
            return state;
    }
};