import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import { FormControl, FormControlLabel, FormGroup, Checkbox, Paper, FormHelperText, FormLabel, Input, CardActions, Button } from '@material-ui/core';
import Manager from '../../manager';
import { ArticleItem } from '../blog';
import { adminActions } from '../../actions';

const style1 = theme =>({
    label:{
        width: "100%"
    }
})
class _RowItem extends Component{
    render(){
        const {classes} = this.props;
        return(
            <FormControlLabel
                classes={classes}
                control={
                    <Checkbox 
                        checked={
                            this.props.selectedItems.indexOf(this.props.data._id) != -1 
                        }
                                // true : false   
                        value={""+this.props.data._id}
                        onChange={this.props.handleChange(this.props.data._id)}/>
                }
                label={
                    <ArticleItem data={this.props.data}>
                        <CardActions style={{float: "right"}}>
                            <Button 
                                variant="contained" 
                                color="primary"
                                onClick={()=>this.props.handleEdit(this.props.data._id)}>Edit</Button>
                            <Button 
                                variant="contained" 
                                color="secondary"
                                onClick={()=>this.props.handleDelete(this.props.data._id)}>Delete</Button>
                        </CardActions>
                    </ArticleItem>
                }
            />                  
        )
    }
}
const RowItem = withStyles(style1)(_RowItem);

const styles = theme => ({
    root: {
        display : 'flex',
        minHeight: "17cm"
    },
    formControl:{
        margin: theme.spacing.unit * 3,
        width: "100%",
    },
    itemRow :{
        padding: 10,
        marginBottom: 10
    },
    formControlLabel:{
        width: "100%"
    },
    
})
class blogs extends Component {
    constructor(props) {
        super(props);
        this.getBlogs();
        this.state = {selectedItems : []};
        this.handleChange = this.handleChange.bind(this);
    }
    getBlogs(){
        adminActions.getBlogs()(this.props.dispatch);
        // adminActions.getBlogs()(this.props.dispatch);
        // Manager.fetchGet('blog', 'getBlogs', {nf: 0}, response=>{
        //     this.props.setBlogs(response.blogs);
        // })
    }
    getAnArticle(id){
        const blogs = this.props.blogs;
        for(let i = 0; i < blogs.length; i++){
            if(blogs[i]._id == id){
                return blogs[i];
            }
        }
    }
    handleEdit(id){
        this.props.history.push({
            pathname: this.props.match.path+"/edit",
            state : {
                article : this.getAnArticle(id)
            }
        });
    }
    handleDelete(id){
        adminActions.removeBlog(id)(this.props.dispatch);
        // Manager.fetchGet('blog', 'deleteBlog', {
        //     id
        // }, response=>{
        //     console.log(response);
        //     if(response.deleteBlog){
        //         this.props.removeBlog(id);
        //         this.props.showSnackbar({
        //             open: true,
        //             variant : "success",
        //             message: response.message
        //         })
        //     }else{
        //         this.props.showSnackbar({
        //             open: true,
        //             variant : "error",
        //             message: response.message
        //         })
        //     }
        // })
    }
    handleChange = _id => event => {
        var newSelected = [...this.state.selectedItems];
        if(event.target.checked){
            newSelected.indexOf(_id) == -1 ?
                newSelected.push(_id): '';
        }else{
            newSelected.splice(newSelected.indexOf(_id), 1) ;
        }
        
        this.setState({selectedItems: newSelected});
    }
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Your blogs</FormLabel>
                    <FormGroup>
                    {this.props.blogs.map( 
                        (item, index)=> 
                        <RowItem 
                            key={index} 
                            handleEdit={this.handleEdit.bind(this)}
                            handleDelete={this.handleDelete.bind(this)}
                            selectedItems={this.state.selectedItems}
                            handleChange={this.handleChange} 
                            data={item}/>
                    )}
                    </FormGroup>
                </FormControl>
            </div>
        );
    }
}

blogs.propTypes = {
    classes : PropTypes.object.isRequired
};
const mapStateToProps = state => {
    var {snackbar} = state.appReducer;
    var {blogs} = state.adminReducer;
    return {
        snackbar, blogs
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(blogs));