// store
const initialState = {
    allPaidValue: 0,
    allRecords: [],
    allMayorEntry: [],
    allViceMayorEntry: [],
};

// action type
const ADD_NEW_RECORD = 'ADD_NEW_RECORD';
const CLEAR_RECORDS = 'CLEAR_RECORDS';
const ADD_MAYOR_ENTRY = 'ADD_MAYOR_ENTRY';
const ADD_VICE_MAYOR_ENTRY = 'ADD_VICE_MAYOR_ENTRY';
const UPDATE_PAID_VALUE = 'UPDATE_PAID_VALUE';

// action creator
export const addNewRecord = (val) => ({
    type: ADD_NEW_RECORD,
    payload: val
});

export const clearRecords = (val) => ({
    type: CLEAR_RECORDS,
    payload: val
});

export const addMayorEntry = (val) => ({
    type: ADD_MAYOR_ENTRY,
    payload: val
});

export const addViceMayorEntry = (val) => ({
    type: ADD_VICE_MAYOR_ENTRY,
    payload: val
});

export const updatePaidValue = (val) => ({
    type: UPDATE_PAID_VALUE,
    payload: val
});

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case ADD_NEW_RECORD:
            return {
                ...state,
                allRecords: [...state.allRecords, payload]
            }
        case CLEAR_RECORDS:
            return {
                ...state,
                allRecords: []
            }
        case ADD_MAYOR_ENTRY:
            return {
                ...state,
                allMayorEntry: [...state.allMayorEntry, payload]
            }
        case ADD_VICE_MAYOR_ENTRY:
            return {
                ...state,
                allViceMayorEntry: [...state.allViceMayorEntry, payload]
            }
        case UPDATE_PAID_VALUE:
            return {
                ...state,
                allPaidValue: payload
            }
        default:
            return state;
    }
};