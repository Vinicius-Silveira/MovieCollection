import React from 'react'
import { Route, Switch } from 'react-router'
import { Dashboard } from '../pages/Dashboards'
import { Repository } from '../pages/Repository'

export const Routes: React.FC = () => {
    return (
        <Switch>
            <Route component={Dashboard} path="/" exact/>
            <Route component={Repository} path="/repositories"/>
        </Switch>
    )
}