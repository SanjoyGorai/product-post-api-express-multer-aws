import express from 'express';
import { createProduct } from '../controllers/productController.js';
import { validateProduct } from '../middlewares/validationMiddleware.js';
import { upload } from '../middlewares/multerConfig.js';

const router = express.Router();

router.post('/products', upload.array('images', 10), validateProduct, createProduct);

export default router;
