import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types'
import { Grid, Paper } from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles'
import {connect} from 'react-redux';

import Carousel from './includes/carousel';
import PopularArticles from './includes/popular';
import NewsLetter from './includes/newsletter';

import MyArticleCard from './includes/article_card';
import { userActions } from '../actions';


const styles = theme => ({
    article_root: {
        //margin: "20px 10px 10px 10px"
        marginTop: 20,
        paddingLeft: 10,
        paddingRight: 10
    },
    grid: {
        borderRight: "solid gray 0.5px"
    },
    article: {
        padding: 5
    },
    list: {
        marginTop: 20,
        border: "solid"
    }
})
class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            popularArticleList : [],
            allArticleList: [],
            allArticlePaginationConfig: {
                offset: 0,
                limit : 10
            }
        };
        this.initializeComponent();
    }
    initializeComponent(){
        this.getLatestBlogs(6);
        this.getTotalCount();
        this.getPopularArticles(10);
        const {offset, limit} = this.state.allArticlePaginationConfig;
        this.getBlogPage(offset, limit);
    }
    getLatestBlogs(number){
        userActions.getLatestBlogs(number, articles=>{
            if(articles) this.setState({articles})
        })(this.props.dispatch);
    }
    getTotalCount(){
        userActions.getTotalBlogCount(count=>{
            if(count) this.setState(state => ({
                allArticlePaginationConfig: {
                    ...state.allArticlePaginationConfig, 
                    total: count
                }
            }));
        })(this.props.dispatch);
    }
    getPopularArticles (number){
        userActions.getPopularArticles(number, blogs=>{
            if(blogs) this.setState({
                popularArticleList: blogs
            });
        })(this.props.dispatch);
    }
    getBlogPage(offset, limit){
        userActions.getBlogPage(offset, limit, blogs=>{
            this.setState({allArticleList: blogs});
        })(this.props.dispatch);
    }
    render(){
        const {classes} = this.props;
        const {
            allArticleList, 
            allArticlePaginationConfig, 
            popularArticleList
        } = this.state;
        return(
            <Fragment>
                <Carousel/>
                <Grid container spacing={24} className={classes.article_root}>
                    <Grid container xs={12} sm={6} md={8}>
                        {this.state.articles.map(
                            (article, index)=> <Grid key={index} className={classes.article} xs={12} sm={12} md={6}><MyArticleCard data={article}/></Grid>
                        )}
                    </Grid>
                    <Grid item sm={6} md={4}>
                        <Paper elevation={1}>
                            <PopularArticles 
                                data={popularArticleList} 
                                heading={"Popular Articles"} 
                                pagination={false}/>
                        </Paper>
                        <Paper elevation={1} style={{marginTop: "20px"}}>
                            <PopularArticles  
                                heading={"Articles"} 
                                data={allArticleList}
                                pagination={true}
                                pageConfig={allArticlePaginationConfig}/>
                        </Paper>
                    </Grid>
                </Grid>
                <NewsLetter/>
            </Fragment>
        )
    }
}

Home.proTypes = {
    classes : PropTypes.object.isRequired
}
const mapDispatchToProps = dispatch => {
    return {dispatch}
}
export default connect(null, mapDispatchToProps)(withStyles(styles)(Home));