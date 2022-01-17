import mongoose from "mongoose";
import colors from "colors";
import "dotenv/config";
import Users from "./data/Users.js";
import User from "./models/User.js";
import Product from "./models/ProductModel.js";
import Order from "./models/OrderModel.js";
import products from "./data/product.js";
import "./src/db/conn.js";

const importData = async () => {
  try {
    await Order.deleteMany();

    await Product.deleteMany();

    await User.deleteMany();

    const createUser = await User.insertMany(Users);
    const adminUser = createUser[0]._id;
    const sampleData = products.map((product) => {
      const p = { ...product, user: adminUser, review: [] };
      return p;
    });
    await Product.insertMany(sampleData);
    console.log(`Data Imported`.inverse);
    process.exit(0);
  } catch (err) {
    console.log(`${err.message}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log(`Data Destroy`.inverse);
    process.exit(0);
  } catch (err) {
    console.log(`${err.message}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv === "-d") {
  await destroyData();
} else {
  await importData();
}
