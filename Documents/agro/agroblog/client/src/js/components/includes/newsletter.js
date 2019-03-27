import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { TextField, CircularProgress, Grid, Button, Typography} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';

import {colors} from '../../common/colors';

const styles = theme => ({
    layout: {
        backgroundColor: colors.primaryL2,
        marginTop: "3cm",
        display: "flex",
        justifyContent: "center",
        paddingBottom: 50
    },
    container: {
        diplay: "flex",
        flexWrap: "wrap"
    },
    img:{
        padding: 20, borderRadius: 100, height: 250, width: 250
    },
    imgContainer : {
        display: "flex",
        [theme.breakpoints.up('md')]: {
            alignItems: "center",
            justifyContent: "flex-end"
        },
        [theme.breakpoints.down('md', 'sm')] :{
            justifyContent: "center"
        }
    },
    header:{
        color:colors.primaryD2,
        fontWeigth: "bold",
        [theme.breakpoints.down('md', 'sm', 'xs')]: {
            textAlign: "center"
        }
    },
    subscribe: {
        [theme.breakpoints.up("md")]:{
            padding: theme.spacing.unit * 10
        }
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: "100%",
        [theme.breakpoints.up("md")]: {
            paddingRight: "2cm"
        },
        [theme.breakpoints.down('md')]:{
            paddingRight: "1cm"
        }
    },
    button: {
        margin: theme.spacing.unit,
        backgroundColor: colors.primaryD2,
        color: "white",
    }
})
class NewsLetter extends Component{
    constructor(props){
        super(props);
        this.state = {submitting: false, name: "", email: ""};
    }
    submitSubscription(){

    }
    handleChange(e, name){
        this.setState({[name]: e.target.value});
    }
    notificationText = ({classes})=>
    <Typography className={classes.header} variant="h2">
        Get our News Letters
    </Typography>
    notificationInput = ({classes})=>
    <Fragment>
        <TextField
            id="standard-name"
            label="Full Name"
            className={classes.textField}
            value={this.state.name}
            onChange={(e)=>this.handleChange(e, 'name')}
            margin="normal"
            placeholder="Full Name"
            />
        <TextField
            id="standard-email"
            label="Email"
            className={classes.textField}
            value={this.state.email}
            onChange={(e)=>this.handleChange(e, 'email')}
            margin="normal"
            placeholder="Email"
            />
        <Button size="large" variant="contained" disabled={this.state.submitting? true: false} className={classes.button}>
            {this.state.submitting ? <CircularProgress/> : ''}
            SUBSCRIBE
        </Button>
    </Fragment>

    render(){
        const {classes} = this.props;
        const NotificationText = this.notificationText;
        const NotificationInput = this.notificationInput;
        return(
            <Grid container className={classes.layout}>
                <Grid item md sm={12} className={classes.imgContainer}>
                    <img className={classes.img} src="../../../src/files/img/newsletter.png"/>
                </Grid>
                <Grid item  md sm={12} className={classes.subscribe}>
                    <form noValidate autoComplete="off" className={classes.container}>
                        <NotificationText classes={classes}/>
                        <NotificationInput classes={classes}/>
                    </form>
                </Grid>
            </Grid>
        )
    }
}

NewsLetter.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(NewsLetter);