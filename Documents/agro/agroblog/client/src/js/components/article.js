import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Manager from '../manager';
import { Typography } from '@material-ui/core';
const styles = theme =>({
    root:{
        minHeight: "15cm"
    },
    content: {
        marginLeft: 20
    },
    heading: {
        marginLeft: 20
    },
    headingContainer: {
        marginTop: 20
    }
})

class _article extends Component{
    constructor(props) {
        super(props);
        this.state = {article:null, id: props.match.params.id};
        this.getArticle(this.state.id);
        console.log(this.state);
    }
    getArticle(id){
        Manager.getArticle(id, article=>{
            //use set state when fetching from database
            if(article != null) this.state.article = article ;//this.setState({article});
        });
    }
    img = props => (
        <div>
            <img src={props.image} className={props.style}/>
        </div>
    )
    heading = props =>(
        <div className={props.styleContainer}>
            <Typography className={props.style} variant="h2">{props.title}</Typography>
            <Typography className={props.style} style={{color:"gray"}} variant="subheading" gutterBottom>
                Author: {props.author}  {props.date}
            </Typography>
        </div>
    )
    content = props =>(
        <div>{
            props.body.map((element, index) => (
                <Typography className={props.style} key={index} paragraph>{element}</Typography>
            ))
        }</div>
    )
    render(){
        const {classes} = this.props;
        const {article} = this.state; 
        const Img = this.img;
        const Heading = this.heading;
        const Content = this.content;
        return (
            <div className={classes.root}>
            {article.image ? 
                <Img image={article.image} style={classes.img}/> : ''
            }
            <Heading styleContainer={classes.headingContainer} style={classes.heading} title={article.title} date={article.date} author={article.author}/>
            <Typography paragraph/>
            <Content style={classes.content} body={article.body}/>
            </div>
        )
    }
}

_article.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(_article);