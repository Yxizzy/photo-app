import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Paper, Input, 
    Button, TextField, Typography, Checkbox, 
    FormControlLabel, IconButton} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'
import {withStyles} from '@material-ui/core/styles';
import {colors} from '../../common/colors';
import Manager from '../../manager';
import {connect} from 'react-redux';
import { appActions, adminActions } from '../../actions';
import { alertConstant } from '../../constants';

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: "center",
        marginTop: 20,
        minHeight: "15cm",
        padding: 15
    },
    box:{
        width: "70%",
        backgroundColor: colors.primaryL2,
        [theme.breakpoints.down("sm")]:{
            width: "100%"
        }
    }, 
    inputBox: {
        margin: 60,
        [theme.breakpoints.down("sm")]:{
            padding: 15,
            margin: 10
        }
    },
    input: {
        width: "100%",
        backgroundColor: colors.primaryL3,
        borderRadius: 5
    },
    file:{

    }, 
    heading: {
        textAlign: "center",
        paddingTop: 20,
        color: "white"
    },
    pButtonContainer: {
        height: "1.5cm",
        overflow: "none"
    },
    pButton:{
        float: "right",
        padding: 10,
        marginTop: 5,
        backgroundColor: colors.primaryL2,
        color: "white",
        "&:hover":{
            backgroundColor: colors.primaryL3
        }
    },
    addButtonContainer:{
        textAlign: "center"
    },
    addButton: {
        backgroundColor: colors.primary,
        color : colors.primaryL1,
        padding: "10px 50px",
        "&:hover":{
            color: "white",
            backgroundColor: colors.primary
        }
    },
    imageContainer: {
        maxWidth: 200,
        alignContent: "center",
        display: "flex",
        float: "left",
        marginRight: 50,
        marginBottom: 10
    }, 
    imageDeleteIcon : {
        padding: 0,
        paddingTop: 10
    }
})
class new_blog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title:"", author:"",
            contents: ["",'',""],
            notify: false,
            files : []
        };
        if(this.props.location.state && this.props.location.state.article){
            let article= this.props.location.state.article;
            console.log(article);
            this.state.title = article.title;
            this.state.id = article._id;
            this.state.contents = article.body;
            this.state.author = article.author;
            this.state.files = [...article.media];
            // this.state = {
            //     title: article.title, author: article.author,
            //     contents: article.body,
            //     notify: false,
            //     files : article.media
            // };
        }
    }
    updateBlogContent(index, value){
        let contents = [...this.state.contents];
        contents[index] = value;
        this.setState({contents});
    }
    loadFiles(e){
        const files = [...this.state.files, ...e.target.files];
        this.setState({files: Array.from(files)});
    }
    addBlog(){
        const self = this;
        const title = this.state.title;
        const author = this.state.author;
        const body = this.state.contents.join("@#$");
        var form = new FormData();
        form.append("title", title);
        form.append("author", author);
        form.append("body", body);
        this.state.files.forEach(file => {
            form.append(file.name.split(" ").join(""), file);
        });
        adminActions.newBlog(form, blog=>{
            if(blog) self.resetFields();
        })(this.props.dispatch);
    }
    resetFields(){
        this.setState({
            title: "", author: "", contents: ['','',''], files: []
        })
    }
    deleteImage(file){
        var files = [...this.state.files];
        const index = files.indexOf(file);
        if(index != -1){
            files.splice(index, 1);
            this.setState({files});
        }
    }
    deleteRemoteImage(id, filename){

    }
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Paper className={classes.box}>
                    <Typography className={classes.heading} variant="h3">{this.state.id ? 'Edit ' : 'New '} Blog</Typography>
                    <div className={classes.inputBox}>
                        <input
                            accept="image/*"
                            className={classes.file}
                            id="text-button-file"
                            multiple
                            type="file"
                            onChange={event => this.loadFiles(event)}
                        />
                        <div> 
                        {this.state.files.map((file, index) => 
                            <div key={index}><div className={classes.imageContainer}>
                                <div>
                                    <img 
                                        key={index} 
                                        src={this.state.id ? Manager.blogImagePath+file : URL.createObjectURL(file)} 
                                        style={{height: 200, width: 200, padding: 10}}
                                        />
                                </div><div>
                                    <IconButton 
                                        className={classes.imageDeleteIcon} aria-label={file.name}
                                        onClick={()=>this.deleteImage(file)}>
                                        <DeleteIcon style={{color: "red"}}/>
                                    </IconButton>
                                </div>
                            </div></div>
                        )}                        
                        </div>
                        <TextField
                            label="Title"
                            placeholder="Title"
                            value={this.state.title}
                            onChange={(e)=>this.setState({title:e.target.value})}
                            margin="normal"
                            id="blog_title"
                            className={classes.input}/>
                        <TextField
                            label="Author"
                            placeholder="Author"
                            value={this.state.author}
                            onChange={(e)=>this.setState({author:e.target.value})}
                            margin="normal"
                            id="blog_author"
                            className={classes.input}/>
                        <Typography paragraph/>
                        <Typography>Contents (in paragraphs)</Typography>
                        {
                            this.state.contents.map(
                                (elem, index)=>
                                <TextField
                                    key={index}
                                    label={"Paragraph "+(index+1)}
                                    placeholder="Paragraph"
                                    multiline
                                    rows="3"
                                    value={elem}
                                    onChange={(e)=>this.updateBlogContent(index, e.target.value)}
                                    margin="normal"
                                    id="blog_author"
                                    className={classes.input}/>
                            )
                        }
                        <div className={classes.pButtonContainer}>
                            <Button 
                                variant="contained" 
                                className={classes.pButton}
                                onClick={()=>this.setState(state=>({contents: [...state.contents, '']}))}>
                                Add Paragraph
                            </Button>
                        </div>
                        <FormControlLabel control={<Checkbox
                                checked={this.state.notify}
                                color="default"
                                value="notify"
                                onChange={()=>this.setState(state=>({notify: !state.notify}))}
                                />}
                                label="Send news letter"/>
                        <div className={classes.addButtonContainer}>
                            <Button
                                variant="contained"
                                className={classes.addButton}
                                onClick={this.state.id ? ()=>this.editBlog() : ()=>this.addBlog()}>
                                {this.state.id ? 'Update ' : 'Post '} Blog    
                            </Button>
                        </div>
                    </div>
                </Paper>
            </div>
        );
    }
}
const mapStateToProps = state => {
    var {snackbar} = state.appReducer;
    return {
        snackbar 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(new_blog));