import path from 'node:path';
import { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import multer from 'multer';

import jwt from 'jsonwebtoken';

import { createCategory } from './app/useCases/categories/createCategory';
import { listCategories } from './app/useCases/categories/listCategories';
import { listProducts } from './app/useCases/products/listProducts';
import { createProduct } from './app/useCases/products/createProduct';
import { listProductByCategory } from './app/useCases/categories/listProductByCategory';
import { listOrders } from './app/useCases/orders/listOrders';
import { createOrder } from './app/useCases/orders/createOrder';
import { changeOrderStatus } from './app/useCases/orders/changeOrderStatus';
import { cancelOrder } from './app/useCases/orders/cancelOrder';
import { deleteCategory } from './app/useCases/categories/deleteCategory';
import { deleteProduct } from './app/useCases/products/deleteCategory';
import { listCategorById } from './app/useCases/categories/listCategoryById';
import { changeCategory } from './app/useCases/categories/changeCategory';
import { listProductById } from './app/useCases/products/listProductById';
import { changeProduct } from './app/useCases/products/changeProduct';
import { createUser } from './app/useCases/users/createUser';
import { listUsers } from './app/useCases/users/listUsers';
import { deleteUser } from './app/useCases/users/deleteUser';
import { changeUser } from './app/useCases/users/changeUser';
import { authUser } from './app/useCases/users/authUser';

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

function checkToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if(!token) {
    return  res.status(401).json({ msg: 'Acesso negado!'});
  }

  try {
    const secret = process.env.SECRET!;

    jwt.verify(token, secret);

    next();

  } catch (error) {
    res.status(400).json({msg: 'Token invalido'});
  }
}

router.get('/categories', listCategories);

router.get('/categories/:categoryId', listCategorById);

router.post('/categories', checkToken, createCategory);

router.patch('/categories/:categoryId', checkToken, changeCategory);

router.delete('/categories/:categoryId', checkToken,  deleteCategory);

router.get('/products', listProducts);

router.post('/products', upload.single('image'), createProduct);

router.get('/categories/:categoryId/products', listProductByCategory);

router.get('/products/:productId', listProductById);

router.patch('/products/:productId',  upload?.single('image'), changeProduct);

router.delete('/products/:productId', deleteProduct);

router.get('/orders', checkToken, listOrders);

router.post('/orders', createOrder);

router.patch('/orders/:orderId', changeOrderStatus);

router.delete('/orders/:orderId', cancelOrder);

router.post('/users', createUser);

router.get('/users', listUsers);

router.patch('/users/:userId', changeUser);

router.delete('/users/:userId', deleteUser);

router.post('/users/auth', authUser);
