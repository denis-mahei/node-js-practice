import { Router } from 'express';
import {
  getProductsController,
  getProductByIdController,
  createProductController,
  upsertProductController,
  patchProductController,
  deleteProductController,
} from '../controllers/products.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createProductsSchema,
  updateProductSchema,
} from '../validation/products.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.get('/', ctrlWrapper(getProductsController));

router.get('/:productId', isValidId, ctrlWrapper(getProductByIdController));

router.post(
  '/',
  validateBody(createProductsSchema),
  ctrlWrapper(createProductController),
);

router.delete('/:productId', ctrlWrapper(deleteProductController));

router.put(
  '/:productId',
  isValidId,
  validateBody(createProductsSchema),
  ctrlWrapper(upsertProductController),
);

router.patch(
  '/:productId',
  isValidId,
  validateBody(updateProductSchema),
  ctrlWrapper(patchProductController),
);

export default router;
