import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import ProductScreen from "./ProductScreen";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productAction.js";
import Loading from "../components/shared/Loading";
import Message from "../components/shared/Message";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} md={3}>
              <ProductScreen product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
