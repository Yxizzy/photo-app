import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import {withStyles} from '@material-ui/core/styles';
import {List, Typography, ListItem, ListItemText, ListSubheader} from '@material-ui/core';

import MyPagination from '../includes/my_pagination';

const styles = theme => ({
    root: {
        //flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
    header: {
        backgroundColor: "blue",
        color: "white",
        borderRadius: "5px 5pc"
    },
    inline: {
        display: "inline"
    }
})
class ArticleList extends Component{
    constructor(props){
        super(props);
    }
    article = ({data})=>(
        <div>
            <Link to={"/articles/"+data._id}>
                <ListItem alignItems="flex-start" >
                    <ListItemText
                        primary={data.title}
                        secondary={
                            <Fragment>
                                <Typography component="span" className={this.props.classes.inline} color="textPrimary">
                                    Author: {data.author +", "} 
                                </Typography>
                                {data.date}
                            </Fragment>
                        }
                        />
                </ListItem>
            </Link>
        </div>
    )
    render(){
        const Article = this.article;
        const {classes, data, pagination, pageConfig} = this.props;
        let limit, offset, total;
        if(pagination){
            limit = pageConfig.limit;
            offset = pageConfig.offset;
            total = pageConfig.total;
        }
        return(
            <Fragment><List 
                className={styles.root}
                component="nav"
                subheader={<ListSubheader className={classes.header} component="div">{this.props.heading}</ListSubheader>}>
            {
                data.map(
                    (elem, index) => <Article key={index} data={elem}/>
                )
            }
            </List>
            {pagination && total > limit ? 
                <MyPagination
                    total={total}
                    limit={limit}
                    offset={offset}/> : <Fragment/>}
            </Fragment>
        )
    }
}
ArticleList.propTypes = {
    classes: PropTypes.object.isRequired
}
export default withStyles(styles)(ArticleList);
