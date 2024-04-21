import express from 'express';
import { currentUser } from '../../middleware/current-user';
import { Password } from '../../model/password';
import { requireAuth } from '../../middleware/require-auth';

const router = express.Router();

router.get('/api/password/passwords', currentUser, requireAuth, async (req, res) => {
    const passwords = await Password.find({ userId: req.currentUser!.id });

    res.status(200).send(passwords);
});

export { router as getPasswordsRouter };
