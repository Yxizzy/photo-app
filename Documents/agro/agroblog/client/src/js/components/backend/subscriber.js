import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Typography,TableBody, Paper, Table, TableHead, TableRow, TableCell, Button} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';

import {colors} from '../../common/colors';

const subList = [
    {_id:1,name: "Agu Chijioke", email: "chokey2nv@yahoo.com", date: ""},
    {_id:2,name: "Agu Chijioke", email: "chokey2nv@yahoo.com", date: ""},
    {_id:3,name: "Agu Chijioke", email: "chokey2nv@yahoo.com", date: ""},
    {_id:4,name: "Agu Chijioke", email: "chokey2nv@yahoo.com", date: ""}
]
const styles = theme => ({
    root:{
        minHeight: "15cm",
        overflowX: "scroll"
    },
    unsubButton:{
        backgroundColor: "tomato",
        color: "white",
        "&:hover":{
            backgroundColor: "red"
        }
    },
    container:{
        width: "100%"
    }
})

class subscriber extends Component {
    constructor(props) {
        super(props);
        this.state = {subList};
    }
    
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                {/* <Paper className={classes.container}> */}
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">S/N</TableCell>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="left">Email</TableCell>
                                <TableCell align="left">Date</TableCell>
                                <TableCell align="left">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.subList.map(
                                (item, index)=>
                                <TableRow key={index}>
                                    <TableCell>{item._id}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.date}</TableCell>
                                    <TableCell>
                                        <Button
                                            size="small"
                                            variant="contained"
                                            className={classes.unsubButton}
                                            onClick={()=>this.unsubscribe(item._id)}>
                                            unsubscribe
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                {/* </Paper> */}
            </div>
        );
    }
}
subscriber.propTypes = {
    classes: PropTypes.object.isRequired
}
export default withStyles(styles)(subscriber);