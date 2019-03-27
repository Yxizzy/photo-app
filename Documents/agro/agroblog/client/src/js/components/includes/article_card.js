
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { 
    Card, CardHeader, CardMedia, CardContent, CardActions, 
    Collapse, Avatar, IconButton, Typography 
} from '@material-ui/core';
import classnames from 'classnames';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {FacebookProvider, Share, ShareButton } from 'react-facebook';
// import shareFacebook  from 'share-facebook';


import Manager from '../../manager';
import { userActions } from '../../actions';


const styles = theme => ({
  card: {
    //maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class ArticleCardWithCollapse extends React.Component {
  constructor(props) {
    super(props);
    this.favColors = {
      primary : "inherit", secondary : "secondary"
    }
    this.state = { expanded: false, fav : false, favColor: this.favColors.primary};
    console.log(this.props);
    this.handleFavorite = this.handleFavorite.bind(this);
    
  }
  generateFacebookLink(){
    const {title} = this.props.data;
    return shareFacebook({
      quote : title,
      url: "http://localhost:8082", 
      redirect_uri: "http://localhost:8082", 
      app_id: Manager.facebookAppId
    })
  }
  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
  handleFavorite(){
    if(this.state.fav){
      userActions.removePopular(
        this.props.data._id,
        ()=>{}
      )(this.props.dispatch);
      this.setState({fav: false, favColor: this.favColors.primary});
    }else{
      userActions.makePopular(
        this.props.data._id,
        ()=>{}
      )(this.props.dispatch);
      this.setState({fav: true, favColor: this.favColors.secondary});
    }
  }
  render() {
    const { classes, data} = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          /* avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              R
            </Avatar>
          } 
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }*/
          title={<Link to={"/article/"+data._id}>{data.title}</Link>}
          subheader={data.date}
        />
        {data.media && data.media[0] && <CardMedia
            className={classes.media}
            image={Manager.blogImagePath+data.media[0]}
            title="Paella dish"
          /> 
        }
        <CardContent>
          {data.body ?
            <Typography component="p">
              {data.body[0]}
            </Typography>: 
            <Fragment/>
          }
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton 
            aria-label="Add to favorites"
            onClick={this.handleFavorite}>
            <FavoriteIcon color={this.state.favColor}/>
          </IconButton>
          <FacebookProvider appId={Manager.facebookAppId}>
            <ShareButton style={{color: "blue"}} href={Manager.facebookUri}>
                share on facebook
            </ShareButton>
          </FacebookProvider>
          {/* <a href={this.generateFacebookLink()}><ShareIcon/></a> */}
          <div data-href="http://localhost:8082/" data-layout="button_count" data-size="small"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A8082%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">Share</a></div>
          {/* <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton> */}
        </CardActions>
        {/* <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {this.props.data.body.map(
                (elem, index)=><Typography key={index} paragraph>{elem}</Typography>
            )}
          </CardContent>
        </Collapse> */}
      </Card>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {dispatch};
}
ArticleCardWithCollapse.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(ArticleCardWithCollapse));
