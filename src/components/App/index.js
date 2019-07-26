import React from "react";
import { Router, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

import { history } from "../helpers/history";
import { PrivateRoute } from "../helpers/privateRoute";
import { authenticationService } from "../helpers/auth-service";
import TopAppBar from "../navbar";

// import Navigation from "../Navigation";
import LandingPage from "../Landing";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import Home from "../Home";

import * as ROUTES from "../../constants/routes";
import {  deepOrange, indigo } from "@material-ui/core/colors";

const theme = createMuiTheme({
    palette: {
        primary: { main: indigo[800] },
        secondary: { main: deepOrange[400] }
    }
});

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        };
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe((x) =>
            this.setState({ currentUser: x })
        );
    }

    logout() {
        authenticationService.logout();
        history.push(ROUTES.SIGN_IN);
    }

    render() {
        const { currentUser } = this.state;
        return (
            <Router history={history}>
                <ThemeProvider theme={theme}>
                    <TopAppBar />
                    <Container component="main" maxWidth="xs">
                        <Route
                            exact
                            path={ROUTES.LANDING}
                            component={LandingPage}
                        />
                        <Route exact path={ROUTES.SIGN_IN} component={SignIn} />
                        <Route exact path={ROUTES.SIGN_UP} component={SignUp} />
                        <PrivateRoute
                            exact
                            path={ROUTES.HOME}
                            component={Home}
                        />
                    </Container>
                </ThemeProvider>
            </Router>
        );
    }
}

export default App;
