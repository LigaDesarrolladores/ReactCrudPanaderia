import React, { useState } from "react";
import { Form, Modal, Button } from 'semantic-ui-react';
const AgregarProducto = ({ refreshProducto }) => {
  const [nombreProducto, setNombreProducto] = useState("");
  const [precioProducto, setPrecioProducto] = useState(0);


  const crearProducto = () => {
    var formdata = new FormData();
    formdata.append("nombre", nombreProducto);
    formdata.append("precio", parseFloat(precioProducto));
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch("https://localhost:44325/api/producto/", requestOptions)
      .then(response => response.text())
      .then(result => {
        refreshProducto();
      })
      .catch(error => console.log('error', error));
  };

  return (
    <Modal size="mini" trigger={<Button content="Crear producto" />}>
      <Modal.Header>
        Crear de producto
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
            label='Precio'
            type="number"
            value={precioProducto}
            placeholder='Digite precio'
            onChange={(e, { value }) => setPrecioProducto(value)}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={crearProducto} content="Guardar" />
      </Modal.Actions>
    </Modal>
  );
}

export default AgregarProducto;