import express from 'express';
import { body } from 'express-validator';
import { Request, Response } from 'express';

import { validateRequest } from '../../middleware/validate-request';
import { Password } from '../../model/password';
import { BadRequestError } from '../../errors/bad-request-error';
import { requireAuth } from '../../middleware/require-auth';
import { currentUser } from '../../middleware/current-user';

const router = express.Router();

router.post(
    '/api/password/save',
    currentUser,
    requireAuth,
    [
        body('name').isString().trim().notEmpty().withMessage('Name is required'),
        body('password').trim().notEmpty().withMessage('Password is required'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { name, password } = req.body;

        const existingName = await Password.findOne({ name: name });

        if (existingName) {
            throw new BadRequestError('Name already exists');
        }

        console.log(name, password, req.currentUser);

        const newPassword = await Password.create({
            userId: req.currentUser!.id,
            name,
            password,
        });

        res.status(201).send(newPassword);
    }
);

export { router as savePasswordRotuer };
