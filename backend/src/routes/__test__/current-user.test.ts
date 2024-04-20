import request from 'supertest';
import { app } from '../../app';
import { getCookies } from '../../utils/get-cookies';

it('responds with details about the current user', async () => {
    const cookie = await getCookies();

    // Check if cookie is defined before setting it in the request
    if (!cookie) {
        throw new Error('Cookie is undefined');
    }

    const response = await request(app).get('/api/users/currentuser').set('Cookie', cookie).send().expect(200);

    expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('responds with null if not authenticated', async () => {
    const response = await request(app).get('/api/users/currentuser').send().expect(200);

    expect(response.body.currentUser).toEqual(null);
});
