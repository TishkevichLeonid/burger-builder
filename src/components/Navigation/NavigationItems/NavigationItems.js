import React from 'react'

import classes from './NavigationIntems.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => {
    let authComponent = <NavigationItem link="/auth">Authenticate</NavigationItem>
    if (props.isAuth) {
        authComponent = <NavigationItem link="/logout">Logout</NavigationItem>
    }
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact={true}>Burger Builder</NavigationItem>
            {props.isAuth ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
            {authComponent}
        </ul>
    )
}

export default navigationItems