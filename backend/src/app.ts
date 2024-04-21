import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import cors from 'cors';

import { currentuserRouter } from './routes/auth/current-user';
import { signinRouter } from './routes/auth/sign-in';
import { signoutRouter } from './routes/auth/sign-out';
import { signupRouter } from './routes/auth/sign-up';
import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middleware/error-handler';
import { savePasswordRotuer } from './routes/password/save-password';
import { getPasswordsRouter } from './routes/password/get-passwords';
import { updatePasswordRouter } from './routes/password/update-password';
import { deletePasswordRouter } from './routes/password/delete-password';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    })
);
app.use(
    cookieSession({
        signed: false,
        secure: false,
    })
);
// auth routes
app.use(currentuserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// password routes
app.use(savePasswordRotuer);
app.use(getPasswordsRouter);
app.use(updatePasswordRouter);
app.use(deletePasswordRouter);

app.all('*', async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
