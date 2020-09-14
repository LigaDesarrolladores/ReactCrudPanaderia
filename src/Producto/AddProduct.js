import React, { useState } from "react";
import { Form, Modal, Button, Popup, Placeholder, Header } from 'semantic-ui-react';
const BASE_URL = process.env.REACT_APP_BASE_URL;
const AddProduct = ({ refreshProduct }) => {
  const [nameProduct, setnameProduct] = useState("");
  const [amountProduct, setamountProduct] = useState(0);
  const [loading, setLoading] = useState(false);
  const [onSuccess, setOnSuccess] = useState(false);
  const createProduct = () => {
    var formdata = new FormData();
    formdata.append("nombre", nameProduct);
    formdata.append("precio", parseFloat(amountProduct));
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };
    setLoading(true);
    fetch(`${BASE_URL}/producto/`, requestOptions)
      .then(response => response.text())
      .then(result => {
        refreshProduct();
        setLoading(false);
        setOnSuccess(true);
        setnameProduct("");
        setamountProduct(0);
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
            value={nameProduct}
            placeholder='Digite nombre'
            onChange={(e, { value }) => setnameProduct(value)}
          />
          <Form.Input
            fluid
            label='Precio'
            type="number"
            value={amountProduct}
            placeholder='Digite precio'
            onChange={(e, { value }) => setamountProduct(value)}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Popup
          on='click'
          position='right center'
          offset='15px, 0px'
          onClose={() => setOnSuccess(false)}
          trigger={
            <Button
              disabled={!nameProduct || !amountProduct}
              loading={loading}
              onClick={createProduct}
              content="Guardar" />}
          wide>
          {onSuccess === false ? (
            <Placeholder style={{ minWidth: '200px' }}>
              <Placeholder.Header>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Header>
              <Placeholder.Paragraph>
                <Placeholder.Line length='medium' />
                <Placeholder.Line length='short' />
              </Placeholder.Paragraph>
            </Placeholder>
          ) : (
              <>
                <Header
                  as='h2'
                  content="Confirmación"
                  subheader="El producto se ha agregado exitosamente." />
              </>
            )}
        </Popup>
      </Modal.Actions>
    </Modal>
  );
}

export default AddProduct;