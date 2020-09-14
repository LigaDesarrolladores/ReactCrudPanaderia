import React, { useState } from "react";
import { Form, Modal, Button, Popup, Placeholder, Header } from 'semantic-ui-react';
const BASE_URL = process.env.REACT_APP_BASE_URL;
const ProductDetail = ({ idProduct, name, amount, trigger, refreshProduct }) => {
  const [productName, setproductName] = useState(name);
  const [amountProduct, setAmountProduct] = useState(amount);
  const [loading, setLoading] = useState(false);
  const [onSuccess, setOnSuccess] = useState(false);
  const saveProduct = () => {
    var formdata = new FormData();
    formdata.append("idProducto", idProduct);
    formdata.append("nombre", productName);
    formdata.append("precio", parseFloat(amountProduct));
    var requestOptions = {
      method: 'PUT',
      body: formdata,
      redirect: 'follow'
    };
    fetch(`${BASE_URL}/producto/${idProduct}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        refreshProduct();
        setLoading(false);
        setOnSuccess(true);
      })
      .catch(error => console.log('error', error));
  }

  return (
    <Modal size="mini" trigger={trigger}>
      <Modal.Header>
        Detalle de {name}
      </Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input
            fluid
            label='Nombre'
            value={productName}
            placeholder='Digite nombre'
            onChange={(e, { value }) => setproductName(value)}
          />
          <Form.Input
            fluid
            type="number"
            label='Precio'
            value={amountProduct}
            placeholder='Digite precio'
            onChange={(e, { value }) => setAmountProduct(value)}
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
              loading={loading}
              disabled={!amountProduct || !productName.trim()}
              onClick={saveProduct}
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
                  subheader="El producto se ha actualizado exitosamente." />
              </>
            )}
        </Popup>
      </Modal.Actions>
    </Modal>
  );
}

export default ProductDetail;