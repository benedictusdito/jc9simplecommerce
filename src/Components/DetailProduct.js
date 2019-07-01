import React, { Component } from "react";
import axios from "axios";

class DetailProduct extends Component {
  state = {
    nameDetail: ""
  };

  componentDidMount() {
    let pro_id = this.props.match.params.product_id;

    axios.get("http://localhost:2020/products/" + pro_id).then(res => {
      console.log(res.data);
      this.setState({ nameDetail: res.data });
    });

    // axios
    //   .get("http://localhost:2020/products", {
    //     params: {
    //       id: this.props.match.product_id
    //     }
    //   })
    //   .then(res => {
    //     console.log(res.data);
    //   });
  }

  render() {
    var { name, desc, price, src } = this.state.nameDetail;
    return (
      <div className="card col-4 mt-5 mx-auto">
        <img className="card-img-top" src={src} />
        <div className="card-body">
          <h3 className="card-title">Product: {name}</h3>
          <p className="card-text">Description: {desc}</p>
          <p className="card-text">Price: Rp.{price}</p>
          <form className="input-group my-3">
            <input
              ref={input => (this.name = input)}
              className="form-control"
              defaultValue="0"
              type="number"
            />
          </form>
          <button className="btn btn-primary">Add To Cart</button>
        </div>
      </div>
    );
  }
}

export default DetailProduct;
