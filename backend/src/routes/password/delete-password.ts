import express from 'express';
import { Request, Response } from 'express';
import { param } from 'express-validator';
import { validateRequest } from '../../middleware/validate-request';
import { Password } from '../../model/password';
import { BadRequestError } from '../../errors/bad-request-error';
import { requireAuth } from '../../middleware/require-auth';
import { currentUser } from '../../middleware/current-user';

const router = express.Router();

router.delete(
    '/api/password/delete/:id',
    currentUser,
    requireAuth,
    [param('id').isMongoId().withMessage('Invalid password ID')],
    validateRequest,
    async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const existingPassword = await Password.findById(id);

            if (!existingPassword) {
                throw new BadRequestError('Password not found');
            }

            if (existingPassword.userId !== req.currentUser!.id) {
                throw new BadRequestError('Unauthorized access to delete password');
            }

            await Password.findByIdAndDelete(id);

            res.status(204).send();
        } catch (error: any) {
            throw new BadRequestError(error.message);
        }
    }
);

export { router as deletePasswordRouter };
