import express from "express";
import {productController} from "../controllers/productController";

const router = express().router;


// | GET    | `/api/products`| Get all products (filter, search, paginate) |
router.get("/", productController.getProducts)
// | POST    | `/api/products`        | add many products in one time
router.post("/bulk", productController.addManyProducts)
// | GET    | `/api/products/:id`    | Get single product details |
router.get("/:id", productController.getProductById)
// | POST   | `/api/products`        | Create new product (Admin) |
router.post("/", productController.createProduct)
// | PUT    | `/api/products/:id`    | Update product |
router.put("/:id", productController.updateProduct)
// | DELETE | `/api/products/:id`    | Delete product |
router.delete("/:id", productController.deleteProduct)

export const productRouter = router;