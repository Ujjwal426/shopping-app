import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Form,
  Button,
  Card,
  Image,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { addToCart, removeFromCart } from "../actions/cartAction";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Message from "../components/shared/Message";

const CartScreen = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const productId = params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkOut = () => {
    navigate("/login?redirect=shipping");
  };
  return (
    <>
      <Row>
        <Col md={8}>
          <h1>Cart Items</h1>
          {cartItems.length === 0 ? (
            <>
              <ListGroupItem>
                <Link to="/" className="btn btn-light" mx="2">
                  <i className="fas fa-arrow-left"></i>
                  &nbsp; GO BACK
                </Link>
              </ListGroupItem>
              <Message>Your Cart is Empty</Message>
            </>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroupItem key={item.id}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="fas fa-trash-restore"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h2>
                  SubTotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  )
                </h2>
              </ListGroupItem>
              <ListGroupItem>
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </ListGroupItem>
              <ListGroupItem>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={checkOut}
                >
                  Proceed to Checkout
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CartScreen;
