import React, {Component, Fragment} from 'react';
import $ from 'jquery';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, TextField, CardContent, Typography, Button} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {colors} from '../../common/colors';
import Manager from '../../manager';

const styles = theme => ({
    root: {
        minHeight: "15cm",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    header:{
        textAlign: "center",
        fontSize: 18,
        color: "white",
        fontWeight: "bold",
        backgroundColor: colors.primaryL1,
        padding: 10,
    },
    loginBox:{
        width: "15cm",
        [theme.breakpoints.down("sm")]:{
            width : "100%",
            padding:10,
            margin: 10
        }
    },
    inputContainer:{
        display: "flex",
        flexDirection: "column",
        padding : 10
    },
    button: {
        padding: 10,
        marginTop : 50,
        color: colors.primaryL2,
        backgroundColor: colors.primaryD1,
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

class login extends Component {
    constructor(props) {
        super(props);
        this.state = {username: "", password: ""};
        this.environment();
        console.log(props);
    }
    environment(){
        $('body').css("backgroundColor", colors.primary);
    }
    login(){
        const username = this.state.username;
        const password = this.state.password;
        if(username.length == 0 && password.length == 0){
            return;
        }
        Manager.fetchPost('user', 'login', {
            method: "post",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                username,
                password
            })
        }, response => {
            console.log(response);
            if(response.login){
                this.props.history.push(this.props.match.path + "/new");
            }
        })
    }
    _inputArea = ({classes}) => (
        <div className={classes.inputContainer}>
            <TextField
                id="username"
                label="Username"
                className={classes.textField}
                value={this.state.username}
                margin="normal"
                placeholder="Username"
                onChange={(e)=>this.setState({username: e.target.value})}
                />
            <TextField
                id="password"
                label="Password"
                className={classes.textField}
                value={this.state.password}
                margin="normal"
                placeholder="Username"
                type="password"
                onChange={(e)=>this.setState({password: e.target.value})}
                />
            <Button 
                variant="contained" 
                className={classes.button}
                onClick={()=>this.login()}>Login</Button>
            <Typography className={classes.resetLink}>Forgot your password?
                <Link to="/trash/reset">
                    <span className={classes.textBold}> Reset password</span>
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
                        <Typography className={classes.header}>LOGIN</Typography>
                        <InputArea classes={classes}/>
                    </CardContent>
                </Card>
            </div>
        );
    }
}
login.propTypes = {
    classes : PropTypes.object.isRequired
}
export default withStyles(styles)(login);