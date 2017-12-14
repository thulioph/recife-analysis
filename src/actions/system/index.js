// store
const initialState = {
    modalIsActive: false,
    modalContent: {}
};

// action type
const DISPLAY_MODAL = 'DISPLAY_MODAL';
const UPDATE_MODAL_CONTENT = 'UPDATE_MODAL_CONTENT';

// action creator
export const displayModal = (val) => ({
    type: DISPLAY_MODAL,
    payload: val
});

export const updateModalContent = (val) => ({
    type: UPDATE_MODAL_CONTENT,
    payload: val
});

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case DISPLAY_MODAL:
            return {
                ...state,
                modalIsActive: payload
            }
        case UPDATE_MODAL_CONTENT:
            return {
                ...state,
                modalContent: payload
            }
        default:
            return state;
    }
};