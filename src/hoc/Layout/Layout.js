import React, {Component} from 'react';

import Aux from '../Aux'
import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    showSideDrawerClickHandler = () => {
        // approach from lecture, works clean too
        // this.setState((prevState) => {
        //     return {showSideDrawer: !prevState.showSideDrawer}
        // })

        const state = {...this.state}
        const show = state.showSideDrawer
        state.showSideDrawer = !show
        this.setState(state)
    }

    render() {
        return (
            <Aux>
                <Toolbar showSideDrawerClick={this.showSideDrawerClickHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;