import React from "react";
import { Switch, Route, Link } from 'react-router-dom'
import {HomeComponent} from './home-component';
import {ChannelComponent} from './channel-component';
import {NotFoundComponent} from './not-found-component';
import io from "socket.io-client";

export class MainComponent extends React.Component {
    constructor(props) {
        super(props);
        this.HomeComponentWithProps = this.HomeComponentWithProps.bind(this);
        this.ChannelComponentWithProps = this.ChannelComponentWithProps.bind(this);
        this.NotFoundComponentWithProps = this.NotFoundComponentWithProps.bind(this);
        this.socket = io();
    }

    render() {
        return <div>
            <Switch>
                <Route exact path="/" component={this.HomeComponentWithProps} />
                <Route exact path="/:channelName" component={this.ChannelComponentWithProps} />
                <Route exact path="*" component={this.NotFoundComponentWithProps} />
            </Switch>
        </div>;
    }

    HomeComponentWithProps() {
        return <HomeComponent socket={this.socket} />
    }

    NotFoundComponentWithProps() {
        return <NotFoundComponent socket={this.socket} />
    }

    ChannelComponentWithProps(props) {
        return <ChannelComponent channelName={props.match.params.channelName} socket={this.socket} />
    }
}