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
        this.VerticalFlipper = this.VerticalFlipper.bind(this);
        this.VerticalFlipperTile = this.VerticalFlipperTile.bind(this);
        this.HorizontalFlipperTile = this.HorizontalFlipperTile.bind(this);
        this.flipRow = this.flipRow.bind(this);
        this.flipCol = this.flipCol.bind(this);
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
        return <div><this.VerticalFlipper />{this.state.board.map((el,index) => <this.BoardRow key={index} index={index} />)}<this.VerticalFlipper /></div>;
    }

    BoardRow(params) {
        return <div className="board-row">
            <this.HorizontalFlipperTile coord={params.index} />
            {this.state.board[params.index].map((el,index) => <this.BoardSlot row={params.index} col={index} key={index} />)}
            <this.HorizontalFlipperTile coord={params.index} />
        </div>;
    }

    BoardSlot(params) {
        let slotState = this.state.board[params.row][params.col]==0?"board-slot-black":"board-slot-white";
        return <div className={`board-slot ${slotState}`} />
    }

    VerticalFlipperTile(params) {
        return <div onClick={() => this.flipCol(params.coord)} className="board-slot">{params.coord}</div>
    }

    VerticalFlipper() {
        return <div className="board-row">
            <div className="board-slot"></div>
            <this.VerticalFlipperTile coord={0} />
            <this.VerticalFlipperTile coord={1} />
            <this.VerticalFlipperTile coord={2} />
            <this.VerticalFlipperTile coord={3} />
            <this.VerticalFlipperTile coord={4} />
            <this.VerticalFlipperTile coord={5} />
            <div className="board-slot"></div>
        </div>;
    }

    HorizontalFlipperTile(params) {
        return <div onClick={() => this.flipRow(params.coord)} className="board-slot">{params.coord}</div>
    }

    flipCol(col) {
        let currentBoard = this.state.board.map(e => e.slice());
        for(var i in currentBoard[col]) {
            currentBoard[i][col] = currentBoard[i][col]===0?1:0;
        }
        this.setState({
            board:currentBoard
        });
    }

    flipRow(row) {
        let currentBoard = this.state.board.map(e => e.slice());
        for(var i in currentBoard[row]) {
            currentBoard[row][i] = currentBoard[row][i]===0?1:0;
        }
        this.setState({
            board:currentBoard
        });
    }

    render() {
        return <div className="body-container">sevdalinka
            <div className="board-container">
                <this.Board />
            </div>
        </div>;
    }
}