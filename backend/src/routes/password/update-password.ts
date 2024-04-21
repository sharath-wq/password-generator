import express from 'express';
import { body } from 'express-validator';
import { Request, Response } from 'express';

import { validateRequest } from '../../middleware/validate-request';
import { Password } from '../../model/password';
import { BadRequestError } from '../../errors/bad-request-error';
import { requireAuth } from '../../middleware/require-auth';
import { currentUser } from '../../middleware/current-user';

const router = express.Router();

router.put(
    '/api/password/update/:id',
    currentUser,
    requireAuth,
    [
        body('name').isString().trim().notEmpty().withMessage('Name is required'),
        body('password').trim().notEmpty().withMessage('Password is required'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const { name, password } = req.body;

        try {
            const existingPassword = await Password.findById(id);

            if (!existingPassword) {
                throw new BadRequestError('Password not found');
            }

            if (existingPassword.userId !== req.currentUser!.id) {
                throw new BadRequestError('Unauthorized access to update password');
            }

            existingPassword.name = name;
            existingPassword.password = password;
            await existingPassword.save();

            res.status(200).send(existingPassword);
        } catch (error: any) {
            throw new BadRequestError(error.message);
        }
    }
);

export { router as updatePasswordRouter };
