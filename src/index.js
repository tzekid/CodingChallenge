import React from "react";
import ReactDOM from "react-dom";
import './index.css';

class Report extends React.Component {
  render() {
    return (
      <div className="report">
        /* fill in based on props attrs. */
      </div>
    )
  }
}

class Dashboard extends React.Component {
  render() {
    return (
      <div className="dashboard">
        /* render for each Report */
      </div>
    )
  }
}

// ========================================

ReactDOM.render(
  <Dashboard />,
  document.getElementById('root')
);
