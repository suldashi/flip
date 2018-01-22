import React from "react";

let ChannelStatuses = {
    connecting:"Connecting...",
    idle:"Connected: Waiting for participants"
};

export class ChannelComponent extends React.Component {
    constructor(props) {
        super(props);
        this.channelName = props.channelName;
        this.Board = this.Board.bind(this);
        this.BoardRow = this.BoardRow.bind(this);
        this.BoardSlot = this.BoardSlot.bind(this);
        this.HorizontalFlipper = this.HorizontalFlipper.bind(this);
        this.VerticalFlipper = this.VerticalFlipper.bind(this);
        this.socket = props.socket;
        this.state = {
            channelStatus: ChannelStatuses.connecting,
            board: [[0,1,0,1,0,1],[1,0,1,0,1,0],[0,1,0,1,0,1],[1,0,1,0,1,0],[0,1,0,1,0,1],[1,0,1,0,1,0]]
        }
    }

    componentDidMount() {
        this.socket.on(`connectToChannel|${this.channelName}`, (data) => {
            this.setState({
                channelStatus:ChannelStatuses[data.status]
            })
        });
        this.socket.emit(`connectToChannel`,{channelName:this.channelName});
    }

    componentWillUnmount() {
        this.socket.off(`connectToChannel!${this.channelName}`);
    }

    Board() {
        return this.state.board.map((el,index) => <this.BoardRow key={index} index={index} />);
    }

    BoardRow(params) {
        return <div className="board-row">
            {this.state.board[params.index].map((el,index) => <this.BoardSlot row={params.index} col={index} key={index} />)}
        </div>;
    }

    BoardSlot(params) {
        let slotState = this.state.board[params.row][params.col]==0?"board-slot-black":"board-slot-white";
        return <div className={`board-slot ${slotState}`} />
    }

    HorizontalFlipper() {

    }

    VerticalFlipper() {

    }

    render() {
        return <div className="body-container">sevdalinka
            <div className="board-container">
                <this.Board />
            </div>
        </div>;
    }
}