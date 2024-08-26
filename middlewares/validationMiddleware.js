import { body } from 'express-validator';

export const validateProduct = [
    body('title').notEmpty().withMessage('Title is required'),
    body('price').optional().isNumeric().withMessage('Price must be a number'),
];
