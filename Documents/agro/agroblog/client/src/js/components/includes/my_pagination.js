import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
 
const theme = createMuiTheme();
 
export default class Example extends React.Component {
    constructor(props) {
        super(props);
        this.state = { offset: 0 };
    }
 
    handleClick(offset) {
        console.log(offset);
        this.setState({ offset });
    }
 
    render() {
        return (
            <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Pagination
                limit={10}
                offset={this.state.offset}
                total={100}
                onClick={(e, offset) => this.handleClick(offset)}
            />
            </MuiThemeProvider>
        );
    }
}