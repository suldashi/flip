import React from "react";
import { Redirect } from 'react-router';

export class HomeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.goToChannel = this.goToChannel.bind(this);
        this.onChangeChannel = this.onChangeChannel.bind(this);
        this.state = {
            targetChannel:"",
            redirect:false
        }
    }

    goToChannel(ev) {
        ev.preventDefault();
        this.setState({redirect: true});
    }

    onChangeChannel(ev) {
        let channelName = ev.target.value;
        this.setState({
            targetChannel:channelName
        });
        ev.preventDefault();
    }

    render() {
        if(this.state.redirect) {
            return <Redirect push to={this.state.targetChannel} />;
        }
        else {
            return <div className="body-container">
                    <h1>flippy</h1>
                <div className="inner-card card card-1">
                    <h3>enter a room with a friend to play a cute and strategic game</h3>
                    <form onSubmit={this.goToChannel}>
                        <input onChange={this.onChangeChannel} className="text-input" type="text" placeholder="Room name" /><br />
                        <input className="button" type="submit" value="Enter room" />
                    </form>
                </div>
            </div>;
        }
    }
}