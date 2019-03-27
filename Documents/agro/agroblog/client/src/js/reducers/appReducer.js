import { appConstants } from '../constants';
const INITIAL_STATE = {
    snackbar: {
        open : false,
        variant: '',
        message: ""
    },
    name : "chijioke"
}
export const appReducer = (state = INITIAL_STATE, action)=>{
    switch(action.type){
        case appConstants.SNACKBAR_OPEN : {
            return {snackbar : action.payload};
        };
        case appConstants.SNACKBAR_CLOSE : {
            return {...state, snackbar : {...state.snackbar, message: '', open: false}}
        }
        default : return state;
    }
}