import React, { Component } from 'react';

class TrackLogs extends Component {

  render() {
    return (
      <div className="track-logs">

        <h1>{this.props.trackName}</h1>

        <ul className="corner-areas">
          <li>Entry</li>
          <li>Mid</li>
          <li>Exit</li>
        </ul>

        {this.props.turns.map((turn,i) =>
            <ul className="track-turn">
              <li className="track-turn-individual">
                <div>
                  <p>
                    {i}
                    <span>{this.props.turnNames[i]}</span>
                  </p>


                  <ul>
                    <li key={'entry' + i}>
                      <button
                        onClick={() => this.props.updateTurn(i,"entry","understeer")}
                        className={turn.entry === "understeer" ? "selected" : ""}
                        >
                        U
                      </button>
                      <button
                        onClick={() => this.props.updateTurn(i,"entry","neutral")}
                        className={turn.entry === "neutral" ? "selected" : ""}
                        >
                        N
                      </button>
                      <button
                        onClick={() => this.props.updateTurn(i,"entry","oversteer")}
                        className={turn.entry === "oversteer" ? "selected" : ""}
                        >
                        O
                      </button>
                    </li>
                    <li key={'mid' + i}>
                      <button
                        onClick={() => this.props.updateTurn(i,"mid","understeer")}
                        className={turn.mid === "understeer" ? "selected" : ""}
                        >
                        U
                      </button>
                      <button
                        onClick={() => this.props.updateTurn(i,"mid","neutral")}
                        className={turn.mid === "neutral" ? "selected" : ""}
                        >
                        N
                      </button>
                      <button
                        onClick={() => this.props.updateTurn(i,"mid","oversteer")}
                        className={turn.mid === "oversteer" ? "selected" : ""}
                        >
                        O
                      </button>
                    </li>
                    <li key={'exit' + i}>
                      <button
                        onClick={() => this.props.updateTurn(i,"exit","understeer")}
                        className={turn.exit === "understeer" ? "selected" : ""}
                        >
                        U
                      </button>
                      <button
                        onClick={() => this.props.updateTurn(i,"exit","neutral")}
                        className={turn.exit === "neutral" ? "selected" : ""}
                        >
                        N
                      </button>
                      <button
                        onClick={() => this.props.updateTurn(i,"exit","oversteer")}
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
                      onChange={(e) => this.props.registerNotes(e, i)}
                     />
                  </label>
                </p>
              </li>
          </ul>
        )};

      </div>
    )
  }
}

export default TrackLogs;
