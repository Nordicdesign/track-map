import React, { Component } from 'react';

class TrackLogs extends Component {

  render() {
    console.log(this.props.turnsData);
    console.log(this.props.turn);

    let turnID = this.props.turn;
    turnID = turnID++;
    console.log(this.props.turnsData[turnID]);
    let turn = this.props.turnsData[turnID];

    return (
      <div className="track-logs">

        <ul className="corner-areas">
          <li>Entry</li>
          <li>Mid</li>
          <li>Exit</li>
        </ul>

            <ul className="track-turn">
              <li className="track-turn-individual">
                <div>
                  <ul>
                    <li key={'entry' + turnID}>
                      <button
                        onClick={() => this.props.updateTurn(turnID,"entry","understeer")}
                        className={turn.entry === "understeer" ? "selected" : ""}
                        >
                        U
                      </button>
                      <button
                        onClick={() => this.props.updateTurn(turnID,"entry","neutral")}
                        className={turn.entry === "neutral" ? "selected" : ""}
                        >
                        N
                      </button>
                      <button
                        onClick={() => this.props.updateTurn(turnID,"entry","oversteer")}
                        className={turn.entry === "oversteer" ? "selected" : ""}
                        >
                        O
                      </button>
                    </li>
                    <li key={'mid' + turnID}>
                      <button
                        onClick={() => this.props.updateTurn(turnID,"mid","understeer")}
                        className={turn.mid === "understeer" ? "selected" : ""}
                        >
                        U
                      </button>
                      <button
                        onClick={() => this.props.updateTurn(turnID,"mid","neutral")}
                        className={turn.mid === "neutral" ? "selected" : ""}
                        >
                        N
                      </button>
                      <button
                        onClick={() => this.props.updateTurn(turnID,"mid","oversteer")}
                        className={turn.mid === "oversteer" ? "selected" : ""}
                        >
                        O
                      </button>
                    </li>
                    <li key={'exit' + turnID}>
                      <button
                        onClick={() => this.props.updateTurn(turnID,"exit","understeer")}
                        className={turn.exit === "understeer" ? "selected" : ""}
                        >
                        U
                      </button>
                      <button
                        onClick={() => this.props.updateTurn(turnID,"exit","neutral")}
                        className={turn.exit === "neutral" ? "selected" : ""}
                        >
                        N
                      </button>
                      <button
                        onClick={() => this.props.updateTurn(turnID,"exit","oversteer")}
                        className={turn.exit === "oversteer" ? "selected" : ""}
                        >
                        O
                      </button>
                    </li>

                  </ul>
                </div>

                <p className="track-turn-notes">
                  <label>
                    Notes
                    <textarea
                      name=""
                      id=""
                      value={turn.notes ? turn.notes : ""}
                      onChange={(e) => this.props.registerNotes(e, turnID)}
                     />
                  </label>
                </p>
              </li>
          </ul>

      </div>
    )
  }
}

export default TrackLogs;
