import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { addToCart } from "../actions/index";

class ProductItem extends Component {
  handleClick = id => {
    const inputQuantity = parseInt(this.quantitiy.value);
    console.log(inputQuantity);
    if (isNaN(inputQuantity)) {
      alert("Mohon masukan quantitiy");
    } else {
      this.props.addToCart(id, inputQuantity);
    }
  };
  handlePlus = () => {
    this.setState({
      order: this.state.order + 1
    });
  };

  handleMinus = () => {
    if (this.state.order > 0) {
      this.setState({
        order: this.state.order - 1
      });
    }
  };
  render() {
    var { id, name, price } = this.props.barang;

    return (
      <div className="card col-3 m-5" key={this.props.barang.id}>
        <div className="card-image" />
        <img className="card-img-top" src={this.props.barang.src} />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">Rp. {price}</p>

          <br />
          <Link to={"/detailproduct/" + id}>
            <button className="btn btn-outline-primary btn-block">
              Details
            </button>
          </Link>
          <button
            className="btn btn-primary btn-block"
            onClick={() => {
              this.handleClick(this.props.barang.id);
            }}
          >
            Add To Cart
          </button>
          <input
            ref={input => (this.quantitiy = input)}
            className="form-control"
            placeholder="Quantity"
            type="number"
          />
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { addToCart }
)(ProductItem);
