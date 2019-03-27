import { alertConstant } from "../constants";

const error = message => ({
    variant : alertConstant.WARNING,
    message
});

const success = message => ({
    variant: alertConstant.SUCCESS,
    message
})

export const alertAction = {
    error, success
}