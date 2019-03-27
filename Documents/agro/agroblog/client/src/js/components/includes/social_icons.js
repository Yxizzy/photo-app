import React, { Component, Fragment } from 'react';
import PropTypes  from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import {colors} from '../../common/colors';
import {Button} from '@material-ui/core';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter} from "@fortawesome/free-brands-svg-icons";

const styles = theme => ({
    iconContainer:{
        height: "2cm",
        backgroundColor: colors.primary,
        display: "flex",
        justifyContent: "center",
        alignItems : "center"
    },
    copyContainer:{
        padding: 20,
        display: "flex",
        justifyContent: "center",
        alignItems : "center",
        backgroundColor: colors.primaryD2,
        color: colors.primaryL1
    },
    icon: {
        fontSize: 35,
        color: "white"
    }
})

class SocialLinks extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <div className={classes.iconContainer}>
                    <Button component="a" href="#"><
                        FontAwesomeIcon className={classes.icon} icon={faFacebookF}/>
                    </Button>
                    <Button component="a" href="#"><
                        FontAwesomeIcon className={classes.icon} icon={faTwitter}/>
                    </Button>
                    <Button component="a" href="#"><
                        FontAwesomeIcon className={classes.icon} icon={faInstagram}/>
                    </Button>
                </div>
                <div className={classes.copyContainer}>
                    © 2019 LoftyBits
                </div>
            </Fragment>
        );
    }
}
SocialLinks.propTypes = {
    classes : PropTypes.object.isRequired
};
export default withStyles(styles)(SocialLinks);