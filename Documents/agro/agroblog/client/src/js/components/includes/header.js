import React, {Fragment, Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { AppBar, Drawer, Toolbar, IconButton, Typography, InputBase } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import {colors} from '../../common/colors';

const styles = theme => ({
  root: {
    width: '100%'
  },
  grow: {
    flexGrow: 1,
  },
  drawer:{
    backgroundColor: "#dddd"
  },
  drawerHeader:{
  },
  menuButton: {
    display: "none",
    marginLeft: -12,
    marginRight: 20,
    [theme.breakpoints.down("sm")]:{
      display: "block"
    }
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  linkContainer:{
    display:"flex", 
    flexDirection:"row",
    [theme.breakpoints.down("sm")]:{
      display: "none"
    }
  },
  linkContainerMenu:{
    display:"flex", 
    flexDirection:"column",
  },
  links: {
      color: "white", padding: 10,
      "&:hover" : {color: colors.primaryL2}//"#ec9f9f"}
  },
  linkTitle: {
      color: "white",
      fontSize: 18,
      "&:hover": {
          color: colors.primaryL2
      }
  }
  
});
const content = (props)=>{
  
  return(
    <div>

    </div>
  )
}
class SearchAppBar extends Component{
  constructor(props) {
    super(props);
    this.state = {drawerIsOpen: false};
  }
  render(){
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton 
              onClick={()=>this.setState((state)=>({drawerIsOpen: !state.drawerIsOpen}))}
              className={classes.menuButton} 
              color="inherit" 
              aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              <Link to="/"><Typography className={classes.linkTitle}>AgroBits</Typography></Link>
            </Typography>
            <div className={classes.grow} />
            <ContentLinks classes={classes}/>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="persistent"
          classes={{
            paper: classes.drawer,
          }}
          open={this.state.drawerIsOpen}
          >
              <div 
                className={classes.drawerHeader}>
                <IconButton onClick={()=>this.setState(state=>({drawerIsOpen: !state.drawerIsOpen}))}>
                  <CloseIcon/>
                </IconButton>
              </div>
              <div      
                  role="button"
                  tabIndex={0}
                  onClick={()=>this.setState(state=>({drawerIsOpen: !state.drawerIsOpen}))}
                  onKeyDown={()=>this.setState(state=>({drawerIsOpen: !state.drawerIsOpen}))}
                  className={classes.drawerInner}>
                  <ContentLinks menu={true} classes={classes}/>
              </div>
        </Drawer>
      </div>
    )
  }
}

SearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(SearchAppBar);


class ContentRoutes extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const {classes} = this.props;
    return (
      <div className={this.props.menu ? classes.linkContainerMenu: classes.linkContainer}>
        <Link to="/blog"><Typography className={classes.links}>Blog</Typography></Link>
        <Link to="/market"><Typography className={classes.links}>Market Place</Typography></Link>
      </div>
    );
  }
}
const ContentLinks = withStyles(styles)(ContentRoutes);