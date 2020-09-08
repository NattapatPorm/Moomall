import React, { Component } from 'react'
import './App.css';
import axios from 'axios';
import { browserHistory } from 'react-router';


import { productsURL, insertOrder, countOrder,getOrder } from './apiURL/url';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      orders:[],
      stateComponent: 0,
      selectedProduct: {},
      orderProduct_name: "",
      orderProduct_color: "",
      orderProduct_size: "",
      orderProduct_quantity: 0,
      countOrderNumber: 0
    }
  }

  componentDidMount() {
    axios.get(productsURL)
      .then(res => {
        this.setState({
          products: res.data.data
        })
      })
      .then(() => {
        axios.get(countOrder)
          .then(res => {
            this.setState({
              countOrderNumber: res.data.data
            })
          })
          .catch(err => {
            throw err;
          })
      })
      .catch(err => {
        throw err;
      })
  }

  onCart = () => {
    const { selectedProduct, orderProduct_color, orderProduct_size, orderProduct_quantity } = this.state;
    console.log('---------Product Cart---------');
    console.log(selectedProduct.name);
    console.log(orderProduct_color);
    console.log(orderProduct_size);
    console.log(orderProduct_quantity);
    axios.post(insertOrder, { name: selectedProduct.name, color: orderProduct_color, size: orderProduct_size, quantity: orderProduct_quantity,image:selectedProduct.image })
      .then(res => {
         axios.get(countOrder)
         .then(res=>{
           this.setState({
             countOrderNumber:res.data.data,
             stateComponent:0
           })
         })
         .catch(err=>{
           throw err;
         })
      })
      .catch(err => {
        throw err;
      })
  }

  onOrder = () => {
    const { stateComponent, selectedProduct, orderProduct_color, orderProduct_size, orderProduct_quantity } = this.state;
    console.log('---------Product Order---------');
    console.log(selectedProduct.name);
    console.log(orderProduct_color);
    console.log(orderProduct_size);
    console.log(orderProduct_quantity);
    this.setState({
      stateComponent: stateComponent + 1
    })
  }

  onSelectProduct = (product) => {
    const { stateComponent } = this.state;
    this.setState({
      selectedProduct: product,
      stateComponent: stateComponent + 1
    })
  }

  onRenderCompoenent = () => {
    const { stateComponent, products, selectedProduct
      , orderProduct_name, orderProduct_color
      , orderProduct_size, orderProduct_quantity,orders } = this.state;

    if (stateComponent === 0) {
      return <div className="container">
        <div className="row">
          <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
              <li data-target="#carouselExampleIndicators" data-slide-to={0} className="active" />
              <li data-target="#carouselExampleIndicators" data-slide-to={1} />
              <li data-target="#carouselExampleIndicators" data-slide-to={2} />
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="/images/headImage1.jpg" className="d-block w-100" alt="head-image" />
              </div>
              <div className="carousel-item">
                <img src="/images/headImage2.jpg" className="d-block w-100" alt="head-image" />
              </div>
              <div className="carousel-item">
                <img src="/images/headImage3.jpg" className="d-block w-100" alt="head-image" />
              </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
        <div className="row product-list">
          {products.map(product => {
            return <div className="col-5 product-item" key={product._id}>
              <div className="card" style={{ width: '18rem' }}>
                <img src={product.image} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">ทั้งแอพที่สร้างสรรค์มาเป็นพิเศษเพื่อเพลง ทีวี และพ็อดคาสท์โดยเฉพาะ,
                  คุณสมบัติใหม่ๆ อันชาญฉลาดอย่าง Sidecar, เทคโนโลยีที่ทรงพลังสำหรับนักพัฒนา
                    และแอพ iPad ที่คุณชื่นชอบ ทั้งหมดพร้อมแล้ววันนี้บน Mac</p>
                  <a href="#" onClick={() => this.onSelectProduct(product)} className="btn btn-primary">เลือกสินค้า</a>
                </div>
              </div>
            </div>
          })}
        </div>
      </div>
    }
    if (stateComponent === 1) {
      return <div className="container" style={{marginTop:"40px"}}>
        <img src={selectedProduct.image} alt="product-image" width={500} />
        <form>
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">Product Name</label>
            <div className="col-sm-10 mb-2">
              {selectedProduct.name}
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="color" className="col-sm-2 col-form-label">Color</label>
            <div className="custom-control custom-radio custom-control-inline">
              <input type="radio" value="red" id="color1" name="color1" className="custom-control-input" onChange={e => this.setState({ orderProduct_color: e.target.value })} />
              <label className="custom-control-label" htmlFor="color1">Red</label>
            </div>
            <div className="custom-control custom-radio custom-control-inline">
              <input type="radio" value="green" id="color2" name="color1" className="custom-control-input" onChange={e => this.setState({ orderProduct_color: e.target.value })} />
              <label className="custom-control-label" htmlFor="color2">Green</label>
            </div>
            <div className="custom-control custom-radio custom-control-inline">
              <input type="radio" value="blue" id="color2" name="color1" className="custom-control-input" onChange={e => this.setState({ orderProduct_color: e.target.value })} />
              <label className="custom-control-label" htmlFor="color2">Blue</label>
            </div>

          </div>
          <div className="form-group row">
            <label htmlFor="size" className="col-sm-2 col-form-label">Size</label>
            <div className="custom-control custom-radio custom-control-inline">
              <input type="radio" value="s" id="size1" name="size1" className="custom-control-input" onChange={e => this.setState({ orderProduct_size: e.target.value })} />
              <label className="custom-control-label" htmlFor="size1">s</label>
            </div>
            <div className="custom-control custom-radio custom-control-inline">
              <input type="radio" value="m" id="size2" name="size1" className="custom-control-input" onChange={e => this.setState({ orderProduct_size: e.target.value })} />
              <label className="custom-control-label" htmlFor="size2">m</label>
            </div>
            <div className="custom-control custom-radio custom-control-inline">
              <input type="radio" value="l" id="size2" name="size1" className="custom-control-input" onChange={e => this.setState({ orderProduct_size: e.target.value })} />
              <label className="custom-control-label" htmlFor="size2">l</label>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="quantity" className="col-sm-2 col-form-label">Quantity</label>
            <div className="col-sm-10 mb-2">
              <input type="number" width={100} className="form-control-plaintext" id="quantity" defaultValue="0" onChange={e => this.setState({ orderProduct_quantity: e.target.value })} />
            </div>
          </div>
          <button className="btn btn-primary mb-2" onClick={() => this.onOrder()}>ซื้อสินค้านี้</button>
        </form>

      </div>
    }
    if (stateComponent === 2) {
      return <div className="container" style={{marginTop:"40px"}}>
        <div className="row">
          <img src={selectedProduct.image} className="card-img-top" alt="..." style={{width:"250px",height:"auto"}}/>
        </div>
        <div className="row">
          Product Name : {selectedProduct.name}
        </div>
        <div className="row">
          Product Color : {orderProduct_color}
        </div>
        <div className="row">
          Product Size : {orderProduct_size}
        </div>
        <div className="row">
          Product Quantity : {orderProduct_quantity}
        </div>
        <div className="row">
          <button className="btn btn-primary mb-2" onClick={() => this.onCart()}>ยืนยันการซื้อสินค้า</button>
        </div>
      </div>
    }
    if(stateComponent ===3){
      return <div className="container" >
          <ul class="list-group" style={{marginTop:"40px"}}>
            {orders.map(order=>{
               return <li class="list-group-item" style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                 <img src={order.image} alt="order-image" width={150}/>
                 <div>{order.name}</div>
                 <div>{order.quantity}</div>
               </li>
            })} 
          </ul>
      </div>
    }
  }

  onShowList = ()=>{
      axios.get(getOrder)
      .then(res=>{
        this.setState({
          orders:res.data.data,
          stateComponent:3
        })
      })
      .catch(err=>{
        throw err;
      })
  }

  render() {

    const {countOrderNumber} = this.state;
    return (
      <div className="container-fluid">
        <nav className="navbar navbar-dark bg-dark">
          <span className="navbar-brand mb-0 h1" style={{cursor:'pointer'}} onClick={()=>this.setState({stateComponent:0})}>Moomall</span>
          <a style={{float:"right",color:"#fff",cursor:"pointer"}} onClick={()=>this.onShowList()}><span>CART ({countOrderNumber})</span></a>
        </nav>
        {this.onRenderCompoenent()}
      </div>
    )
  }
}

export default App;


