import React, { Component } from "react";
import { Link } from "react-router-dom";

class ProductItem extends Component {
  state = {
    order: 0
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
      <div className="card col-3 m-5">
        <img className="card-img-top" src={this.props.barang.src} />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">Rp. {price}</p>
          <input type="text" className="form-control" />
          <br />
          <Link to={"/detailproduct/" + id}>
            <button className="btn btn-outline-primary btn-block">
              Details
            </button>
          </Link>
          <button
            onClick={this.handlePlus}
            className="btn btn-primary btn-block"
          >
            Add To Cart
          </button>
          <input className="btn-block" type="text" value={this.state.order} />
          <button onClick={this.handleMinus} className="minus">
            -
          </button>
          <button onClick={this.handlePlus} className="plus">
            +
          </button>
        </div>
      </div>
    );
  }
}

export default ProductItem;
