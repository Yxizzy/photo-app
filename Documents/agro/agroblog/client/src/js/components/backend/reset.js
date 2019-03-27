import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Card, TextField, CardContent, Typography, Button} from '@material-ui/core';
import {colors} from '../../common/colors';

const styles = theme => ({
    root: {
        minHeight: "15cm",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    header:{
        textAlign: "center",
        fontSize: 18,
        color: colors.primary,
        fontWeight: "bold",
        padding: 10,
    },
    loginBox:{
        width: "15cm",
        [theme.breakpoints.down("sm")]:{
            width : "100%",
        }
    },
    inputContainer:{
        display: "flex",
        flexDirection: "column",
        padding : 10
    },
    button: {
        padding: 10,
        backgroundColor: colors.primary,
        marginTop : 50,
        color: colors.primaryL2,
        "&:hover" : {
            backgroundColor: colors.primaryL1,
            color: "white"
        }
    },
    textBold: {
        fontWeight: "bold"
    },
    resetLink:{
        cursor : 'pointer',
        marginTop: 10,
    }
})
class reset extends Component {
    constructor(props) {
        super(props);
        this.state = {email: ""};
    }
    
    _inputArea = ({classes}) => (
        <div className={classes.inputContainer}>
            <TextField
                id="email"
                label="Email"
                className={classes.textField}
                value={this.state.email}
                margin="normal"
                placeholder="Email"
                onChange={(e)=>this.setState({email: e.target.value})}
                />
            <Button 
                variant="contained" 
                className={classes.button}
                onClick={()=>this.login()}>Reset Password</Button>
            <Typography className={classes.resetLink}>Back to 
                <Link to="/login">
                    <span className={classes.textBold}> Login</span>
                </Link>
            </Typography>
        </div>
    )
    render() {
        const {classes} = this.props;
        const InputArea = this._inputArea;
        return (
            <div className={classes.root}>
                <Card className={classes.loginBox}> 
                    <CardContent>
                        <Typography className={classes.header}>RESET PASSWORD</Typography>
                        <InputArea classes={classes}/>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

reset.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(reset);