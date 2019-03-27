import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Typography, Card, Paper, CardHeader} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import Manager from '../manager';

const styles = theme => ({
    root:{
        minHeight: "17cm"
    }
})
class Blog extends Component{
    constructor(props) {
        super(props);
        this.state = {articles: Manager.articles};
        console.log(props);
    }
    
    render(){
        var {classes} = this.props;
        return (
            <Paper className={classes.root}>
                {this.state.articles.map( 
                    (item, index)=> <ArticleItem key={index} data={item}/>
                )}
            </Paper>
        )
    }
}
Blog.propTypes = {
    classes : PropTypes.object.isRequired
};
export default withStyles(styles)(Blog);

const articleStyles = theme =>({
    subTitle:{
        fontSize: 18,
        color: "gray"
    }
})

class  _article extends Component{
    constructor(props) {
        super(props);
    }
    header = ({id, title}) =>(
        <Link to={"/blog/"+id}>{title}</Link>
    )
    subTitle = ({style, brief, date, author}) => (
        <div className={style}>
            <Typography paragraph>{brief}</Typography>
            <Typography style={{color:"gray"}}>Author: {author}, Date: {date}</Typography>
        </div>
    )
    render(){
        const Heaader = this.header;
        const SubTitle = this.subTitle;
        const {data} = this.props;
        const {classes} = this.props;
        return(
            <Paper>
                <Card>
                    <CardHeader
                        title={<Heaader id={data._id} title={data.title}/>}
                        subheader={<SubTitle style={classes.subTitle} author={data.author} date={data.date} brief={data.body[0]}/>}/>
                    {this.props.children}
                </Card>
            </Paper>
        )
    }
}
export const ArticleItem = withStyles(articleStyles)(_article);