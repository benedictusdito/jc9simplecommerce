import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Checkout from "./Checkout";

class Cart extends Component {
  renderCart = () => {
    if (this.props.dataState.myCart.length > 0) {
      return this.props.dataState.myCart.map(item => {
        return (
          <tr key={this.props.dataState.myCart.id}>
            <td>
              <div className="row">
                <div className="col-lg-2 Product-img">
                  <img
                    src={item.src}
                    alt="Car Picture"
                    className="img-responsive"
                    style={{ width: "300px" }}
                  />
                </div>
              </div>
            </td>

            <td>
              <div className="col-lg-10">
                <b>{item.nama}</b>
              </div>
            </td>
            <td>
              {" "}
              <p>{item.desc}</p>{" "}
            </td>
            <td> Rp. {item.price} </td>
            <td>{item.quantity} Units</td>
            <td> Rp. {item.quantity * item.price} </td>
          </tr>
        );
      });
    }
  };

  render() {
    return (
      <div className="container">
        <div className="col-lg-12 pl-3 pt-3">
          {this.props.dataState.myCart.length === 0 ? (
            <center>
              <h3> No item available on your cart. </h3>
              <h3>
                {" "}
                <Link to="/"> Buy products here </Link>
              </h3>
            </center>
          ) : (
            <div>
              <center>
                <h4>
                  {" "}
                  Ini Adalah Jumlah Belanjaan Kamu
                  {this.props.dataState.username}{" "}
                </h4>
              </center>
            </div>
          )}

          <table className="table table-hover border bg-white">
            <thead>
              <tr>
                <th>
                  <center> Gambar </center>
                </th>
                <th>
                  <center> Car </center>
                </th>
                <th>Desc</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>{this.renderCart()}</tbody>
          </table>

          {this.props.dataState.myCart.length > 0 ? (
            <center>
              <Checkout total={this.props.dataState.totalPrice} />
            </center>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    dataState: state.auth
  };
};

export default connect(mapStateToProps)(Cart);
