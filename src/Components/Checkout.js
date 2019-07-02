import React from "react";
import { Link } from "react-router-dom";

class Checkout extends React.Component {
  render() {
    return (
      <center>
        <Link to="/">
          <button className="btn btn-warning text-white">
            {" "}
            <i className="fa fa-angle-left" /> Continue Shopping{" "}
          </button>
        </Link>

        <span>
          {" "}
          <strong>Total : $ {this.props.total} </strong>{" "}
        </span>

        <button
          className="btn btn-success"
          onClick={() => alert("Thankyou :)")}
        >
          {" "}
          <i className="fa fa-angle-left" /> Checkout{" "}
        </button>
      </center>
    );
  }
}

export default Checkout;
