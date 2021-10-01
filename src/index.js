import destroy from "destroy";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import './index.css';

function Report(props) {
  const [id, setId] = useState(props.id);
  const [reportId, setReportId] = useState(props.reportId);
  const [state, setState] = useState(props.state);
  const [reportType, setReportType] = useState(props.reportType);
  const [message, setMessage] = useState(props.message);

  function sendState(decision) {
    // https://jasonwatmore.com/post/2021/09/05/fetch-http-post-request-examples
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        decision: decision,
        ticketState: "CLOSED",
      })
    };
    fetch('/reports/' + reportId, requestOptions)
      .then(response => response.json())
      .then(data => console.log(data))
      .then(props.removeItem(id));
  }

  return (
    <div className="report">
      <div className="row">
        <p>ID: {reportId.split("-")[0]}</p>
        <p>State: {state}</p>
      </div>

      <div className="row">
        <p>Type: {reportType}</p>
        <p>Message: {message}</p>
      </div>
      
      <div className="row">
        <button
          onClick={() => sendState("destroy")}>
          Destroy
        </button>

        <button
          onClick={() => sendState("take_in")}>
          Take In
        </button>
      </div>
    </div>
  )
}

// https://reactjs.org/docs/faq-ajax.html
function Dashboard() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/reports/") // in package.json, add `"proxy": "http://localhost:3001"`
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          let items = result.elements;
          setItems(items);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, []);

  function removeItem(id) {
    let clone = items.filter((it, _) => it.id !== id);
    setItems(clone);
  }

  if (error) {
    return <div className="dashboard">Error: {error.message}</div>;

  } else if (!isLoaded) {
    return <div className="dashboard">Loading...</div>;

  } else if (typeof (items) != 'undefined') {
    return (
      <div className="dashboard">
        <h1>Reports</h1>

        {items.map((it, _) => (
          // need to use Fragment, see https://stackoverflow.com/a/67847088/3316831
          <React.Fragment key={it.id}>
            <Report
              id={it.id}
              reportId={it.payload.reportId}
              state={it.state}
              reportType={it.payload.reportType}
              message={it.payload.message}
              removeItem={removeItem}
            />
          </React.Fragment>
        ))}
      </div>
    )

  } else {
    return <div>Undefined error...</div>
  }
}

// ========================================

ReactDOM.render(
  <Dashboard />,
  document.getElementById('root')
);
