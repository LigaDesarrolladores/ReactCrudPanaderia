import React, { useState, useEffect } from "react";
import { Card, Icon } from "semantic-ui-react";
import DetalleProducto from "./Detalle";
import AgregarProducto from "./Agregar";
import PaypalCheckoutButton from "../Components/ButtonPaypal";



const Producto = () => {
  //https://localhost:44325/api/producto
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const traerProductos = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("https://localhost:44325/api/producto", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
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
    traerProductos();
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
      <AgregarProducto refreshProducto={traerProductos} />

      <PaypalCheckoutButton order={order} />
      <br />
      <br />
      <Card.Group>
        {
          data.map(producto =>
            <Card key={producto.idProducto}>
              <Card.Content header={producto.nombre} />
              <Card.Content description={producto.precio} />
              <Card.Content extra>
                <DetalleProducto
                  nombre={producto.nombre}
                  idProducto={producto.idProducto}
                  precio={producto.precio}
                  refreshProducto={traerProductos}
                  trigger={<Icon name='arrow alternate circle right' />} />
              </Card.Content>
            </Card>
          )
        }
      </Card.Group>
    </div>
  );
};

export default Producto;