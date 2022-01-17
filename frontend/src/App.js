import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import ProductDetails from "./screens/ProductDetails";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import SigninScreen from "./screens/SigninScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrder from "./screens/PlaceOrder";
import ConfirmOrder from "./screens/ConfirmOrder";

function App() {
  return (
    <Router>
      <Header />
      <main className="my-3">
        <Container>
          <Routes>
            <Route exact path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/placeorder" element={<PlaceOrder />} />
            <Route path="/login/shipping" element={<ShippingScreen />} />
            <Route path="/register" element={<SigninScreen />} />
            <Route path="/order/placed" element={<ConfirmOrder />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart/:id" element={<CartScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
