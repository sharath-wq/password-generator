import request from 'supertest';
import { app } from '../../../app';
import { getCookies } from '../../../utils/get-cookies';

it('can only be accessed if the user is signed in', async () => {
    await request(app).get('/api/password/passwords').expect(401);
});

it('returns passwords if the user is signed in', async () => {
    const cookies = getCookies();

    const mockPasswords: any = [];

    const response1 = await request(app)
        .post('/api/password/save')
        .set('Cookie', cookies)
        .send({
            name: 'password1',
            password: 'testpassword',
        })
        .expect(201);

    const response2 = await request(app)
        .post('/api/password/save')
        .set('Cookie', cookies)
        .send({
            name: 'password2',
            password: 'testpassword',
        })
        .expect(201);

    mockPasswords.push(response1.body);
    mockPasswords.push(response2.body);

    const response = await request(app).get('/api/password/passwords').set('Cookie', cookies).expect(200);

    expect(response.body).toHaveLength(mockPasswords.length);
    expect(response.body[0].userId).toBe(mockPasswords[0].userId);
    expect(response.body[0].name).toBe(mockPasswords[0].name);
    expect(response.body[0].password).toBe(mockPasswords[0].password);
    expect(response.body[1].userId).toBe(mockPasswords[1].userId);
    expect(response.body[1].name).toBe(mockPasswords[1].name);
    expect(response.body[1].password).toBe(mockPasswords[1].password);
});

it('returns an empty array if no passwords are found for the user', async () => {
    const cookies = getCookies();

    const response = await request(app).get('/api/password/passwords').set('Cookie', cookies).expect(200);

    expect(response.body).toHaveLength(0);
});
