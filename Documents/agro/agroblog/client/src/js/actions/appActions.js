import { appConstants } from '../constants';
export const appActions = {
    showSnackbar,
    closeSnackbar
}

function showSnackbar(options){
    return (dispatch) => {
        const newOption = {...options, open: true};
        dispatch({
            type : appConstants.SNACKBAR_OPEN,
            payload: newOption
        });
    }
}
function closeSnackbar(){
    return (dispatch) => {
        dispatch({
            type: appConstants.SNACKBAR_CLOSE,
        })
    }
}