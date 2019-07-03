import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Checkout from "./Checkout";
import Axios from "axios";

class Cart extends Component {
  state = {
    myCart: [],
    selectedId: 0
  };
  componentDidMount() {
    this.getChart();
  }
  getChart = () => {
    Axios.get("http://localhost:2020/cart").then(res => {
      this.setState({ myCart: res.data, selectedId: 0 });
      console.log(this.state.myCart);
      console.log(res);
    });
  };

  totalQuantity = () => {
    // Mengambil objek di dalam array state myCart
    // Menampung hasil penjumlahaan
    var BesarQuantity = 0;
    // Looping array hasil maping diatas
    for (let i = 0; i < this.state.myCart.length; i++) {
      BesarQuantity += parseInt(this.state.myCart[i].quantitiy);
    }
    return (
      // Merender hasil penjumlahan quantity & dimasukan ke besarQuantity
      <td>{BesarQuantity}</td>
    );
  };
  deleteCart = id => {
    Axios.delete("http://localhost:2020/cart/" + id).then(res => {
      this.getChart();
    });
  };

  saveCart = item => {
    // Buat penampungan untuk quantity
    const quantitiyBaru = this.editQuantity.value;

    Axios.patch("http://localhost:2020/cart/" + item.id, {
      quantitiy: quantitiyBaru
    }).then(res => this.getChart());
  };

  renderList = () => {
    return this.state.myCart.map(item => {
      if (item.id !== this.state.selectedId) {
        return (
          <tr>
            <td>
              <img className="list" src={item.src} />
            </td>
            <td>{item.namaProduct}</td>
            <td>{item.price}</td>
            <td>{item.quantitiy}</td>
            <td>{item.quantitiy * item.price}</td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => {
                  this.setState({ selectedId: item.id });
                }}
              >
                Edit
              </button>

              <button
                className="btn btn-warning"
                onClick={() => this.deleteCart(item.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      } else {
        return (
          <tr>
            <td>
              <img className="list" src={item.src} />
            </td>
            <td>{item.namaProduct}</td>
            <td>{item.price}</td>
            <td>
              <input
                className="form-control"
                ref={input => {
                  this.editQuantity = input;
                }}
              />
            </td>
            <td>{item.quantitiy * item.price}</td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => {
                  this.saveCart(item);
                }}
              >
                Save
              </button>
              <button
                className="btn btn-warning"
                onClick={() => this.setState({ selectedId: 0 })}
              >
                Cancel
              </button>
            </td>
          </tr>
        );
      }

      // this.state.products.map(item => { {id.name,price,desc,src}
    });
  };

  render() {
    return (
      <div className="container">
        <div className="col-lg-12 pl-3 pt-3">
          {this.props.dataState.myCart.length === 0 ? (
            <center>
              <h3>Hallo, {this.props.dataState.username} </h3>
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

                <th>Desc</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {this.renderList()}
              <tr>
                <td />
                <td />

                <td>
                  <h1>Total Belanjaan: {this.totalQuantity()}</h1>
                </td>
              </tr>
            </tbody>
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
