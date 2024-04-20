import request from 'supertest';
import { app } from '../app';

const getCookies = async () => {
    const email = 'test@test.com';
    const displayName = 'testUser';
    const password = 'password';

    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email,
            displayName,
            password,
        })
        .expect(201);

    const cookie = response.get('Set-Cookie');

    return cookie;
};

export { getCookies };
