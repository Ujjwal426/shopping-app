import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Button,
  Image,
  ListGroupItem,
  Form,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";
import { listProductDetails } from "../actions/productAction";
import Loading from "../components/shared/Loading";
import Message from "../components/shared/Message";

const ProductDetails = () => {
  const [qty, setQty] = useState(1);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  useEffect(() => {
    dispatch(listProductDetails(params.id));
  }, [dispatch, params]);

  const addToCartHandler = () => {
    navigate(`/cart/${params.id}?qty=${qty}`);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <div>
          <Link to="/" className="btn btn-light" mx="2">
            <i className="fas fa-arrow-left    "></i>
            &nbsp; GO BACK
          </Link>
          <Row>
            <Col md={6}>
              <Image src={product.imageUrl} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h3>{product.name}</h3>
                </ListGroupItem>
                <ListGroupItem>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} Reviews`}
                  />
                </ListGroupItem>
                <ListGroupItem>Price: ${product.price}</ListGroupItem>
                <ListGroupItem>{product.description}</ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={3}>
              <ListGroupItem>
                <Row>
                  <Col> Status: </Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroupItem>
              {product.countInStock > 0 && (
                <ListGroupItem>
                  <Row>
                    <Col>Qty</Col>
                    <Form.Control
                      as="select"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Row>
                </ListGroupItem>
              )}
              <ListGroupItem>
                <Button
                  className="btn-block"
                  type="button"
                  onClick={addToCartHandler}
                >
                  {" "}
                  Add to cart
                </Button>
              </ListGroupItem>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
