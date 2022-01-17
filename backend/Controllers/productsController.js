import Product from "../models/ProductModel.js";
import statusCode from "../Constants/HttpStatusCode.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (err) {
    res.status(statusCode.INTERNAL_SERVER).send(err.message);
  }
};

export const getProduct = async (req, res) => {
  try {
    const _id = req.params.id;
    const product = await Product.findById(_id);
    if (product) {
      res.send(product);
    } else
      res.status(statusCode.NOT_FOUND).send({
        message: `id Not Found`,
      });
  } catch (err) {
    res.status(statusCode.INTERNAL_SERVER).send({
      message: err.message,
      Error: err.stack,
    });
  }
};
