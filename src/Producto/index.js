import React, { useState, useEffect } from "react";
import { Card, Icon } from "semantic-ui-react";
import ProductDetail from "./ProductDetail";
import AddProduct from "./AddProduct";
import PaypalCheckoutButton from "../Components/ButtonPaypal";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Product = () => {
  //https://localhost:44325/api/producto
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getProduct = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`${BASE_URL}/producto`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setData(result);
        setLoading(false);
      })
      .catch(error => {
        console.log(error)
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (loading) return "Cargando...";

  if (error) return "Ha ocurrido un error";

  const order = {
    customer: '123456',
    total: '550.00',
    items: [
      {
        sku: '112',
        name: 'Camisa ReactJS',
        price: '300.00',
        quantity: 1,
        currency: 'MXN'
      },
      {
        sku: '99',
        name: 'Camisa JS',
        price: '125.00',
        quantity: 2,
        currency: 'MXN'
      },
    ],
  };

  return (
    <div style={{ margin: 20 }}>
      <h1>Lista de productos</h1>
      <br />
      <br />
      <AddProduct refreshProduct={getProduct} />
      <PaypalCheckoutButton order={order} />
      <br />
      <br />
      <Card.Group>
        {
          data.map(product =>
            <Card key={product.idProducto}>
              <Card.Content header={product.nombre} />
              <Card.Content description={product.precio} />
              <Card.Content extra>
                <ProductDetail
                  name={product.nombre}
                  idProduct={product.idProducto}
                  amount={product.precio}
                  refreshProduct={getProduct}
                  trigger={<Icon name='arrow alternate circle right' />} />
              </Card.Content>
            </Card>
          )
        }
      </Card.Group>
    </div>
  );
};

export default Product;