import { SET_DATE } from '../actions';

const initialState = {
    date: {
        day: '',
        month: '',
        weekday: '',
        time: ''
    }
};

export default function(state = initialState, action) {
    const newState = Object.assign({}, state);

    switch (action.type) {
        case SET_DATE:
            newState.date = action.date;
            break;
        default:
            return state;
    }

    return newState;
};

export const getDate = state => {
    return state.date.date;
};
