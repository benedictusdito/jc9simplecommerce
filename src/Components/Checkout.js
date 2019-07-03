import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Axios from "axios";

class Checkout extends React.Component {
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

  hargaTotal = () => {
    // Mengambil objek di dalam array state myCart
    // Menampung hasil perkalian
    var totalHarga = 0;
    for (let i = 0; i < this.state.myCart.length; i++) {
      {
        totalHarga += parseInt(
          this.state.myCart[i].quantitiy * this.state.myCart[i].price
        );
      }
    }
    return totalHarga;
  };

  render() {
    return (
      <center>
        <Link to="/">
          <button className="btn btn-warning text-white">
            {" "}
            <i className="fa fa-angle-left" /> Lanjutkan Belanja{" "}
          </button>
        </Link>

        <span>
          {" "}
          <strong>Total : Rp. {this.hargaTotal()} </strong>{" "}
        </span>

        <button
          className="btn btn-success"
          onClick={() => alert("Thankyou :)")}
        >
          {" "}
          <i className="fa fa-angle-left" /> Bayar Sekarang{" "}
        </button>
      </center>
    );
  }
}

const mapStateToProps = state => {
  return {
    dataState: state.auth
  };
};

export default connect(mapStateToProps)(Checkout);
