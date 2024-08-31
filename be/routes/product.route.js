import express from "express";
import {
  deleteProduct,
  getProduct,
  postProduct,
  putProduct,
} from "../controller/product.controller.js";
const router = express.Router();

router.get("/", getProduct).post("/", postProduct);
router.put("/:id", putProduct).delete("/:id", deleteProduct);

export default router;
