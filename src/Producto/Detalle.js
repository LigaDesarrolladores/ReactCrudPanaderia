import React, { useState } from "react";
import { Form, Modal, Button } from 'semantic-ui-react';
const DetalleProducto = ({ idProducto, nombre, precio, trigger, refreshProducto }) => {
  const [nombreProducto, setNombreProducto] = useState(nombre);
  const [precioProducto, setPrecioProducto] = useState(precio);


  const guardarProducto = () => {
    var formdata = new FormData();
    formdata.append("idProducto", idProducto);
    formdata.append("nombre", nombreProducto);
    formdata.append("precio", parseFloat(precioProducto));
    var requestOptions = {
      method: 'PUT',
      body: formdata,
      redirect: 'follow'
    };
    fetch(`https://localhost:44325/api/producto/${idProducto}`, requestOptions)
      .then(response => response.text())
      .then(result =>{
        refreshProducto();
      })
      .catch(error => console.log('error', error));
  }

  return (
    <Modal size="mini" trigger={trigger}>
      <Modal.Header>
        Detalle de {nombre}
      </Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input
            fluid
            label='Nombre'
            value={nombreProducto}
            placeholder='Digite nombre'
            onChange={(e, { value }) => setNombreProducto(value)}
          />
          <Form.Input
            fluid
            type="number"
            label='Precio'
            value={precioProducto}
            placeholder='Digite precio'
            onChange={(e, { value }) => setPrecioProducto(value)}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={guardarProducto} content="Guardar" />
      </Modal.Actions>
    </Modal>
  );
}

export default DetalleProducto;