import React, {Component} from 'react';
import {Route, Switch, withRouter, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import * as actions from './store/actions/index'

import Layout from './hoc/Layout/Layout'
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";

class App extends Component {

    componentDidMount() {
        this.props.onStartUpCheckLogIn()
    }

    render() {

        let routes = (
            <Switch>
                <Route path="/auth" component={Auth} exact={true}/>
                <Route path="/" component={BurgerBuilder} exact={true}/>
                <Redirect to="/"/>
            </Switch>
        )

        if (this.props.isAuth) {
            routes = (
                <Switch>
                    <Route path="/checkout" component={Checkout}/>
                    <Route path="/orders" component={Orders} exact={true}/>
                    <Route path="/logout" component={Logout} exact={true}/>
                    <Route path="/" component={BurgerBuilder} exact={true}/>
                    <Redirect to="/"/>
                </Switch>
            )
        }

        return (
            <div>
                <Layout>
                    {routes}
                </Layout>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onStartUpCheckLogIn: () => dispatch(actions.authCheckState())
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
