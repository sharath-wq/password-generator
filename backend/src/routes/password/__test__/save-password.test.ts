import request from 'supertest';
import { app } from '../../../app';
import { getCookies } from '../../../utils/get-cookies';
import { Password } from '../../../model/password';

it('can only be accessed if the user is signed in', async () => {
    await request(app).post('/api/password/save').send({}).expect(401);
});

it('returns a status other than 401 if the user is signed in', async () => {
    const response = await request(app).post('/api/user/signup').set('Cookie', getCookies()).send({});

    expect(response.status).not.toEqual(401);
});

it('fails to save a password when name is missing', async () => {
    await request(app)
        .post('/api/password/save')
        .set('Cookie', getCookies())
        .send({
            password: 'testpassword',
        })
        .expect(400);
    await request(app)
        .post('/api/password/save')
        .set('Cookie', getCookies())
        .send({
            name: 'aldfjkald',
        })
        .expect(400);
});

it('successfully saves a password when userId, name, and password are provided', async () => {
    await request(app)
        .post('/api/password/save')
        .set('Cookie', getCookies())
        .send({
            name: 'testname',
            password: 'testpassword',
        })
        .expect(201);

    const savedPassword = await Password.findOne({ name: 'testname' });
    expect(savedPassword).toBeTruthy();
    expect(savedPassword?.name).toBe('testname');
    expect(savedPassword?.password).toBe('testpassword');
});

it('fails to save a password with duplicate name', async () => {
    await request(app)
        .post('/api/password/save')
        .set('Cookie', getCookies())
        .send({
            name: 'duplicateName',
            password: 'testpassword',
        })
        .expect(201);

    await request(app)
        .post('/api/password/save')
        .set('Cookie', getCookies())
        .send({
            name: 'duplicateName',
            password: 'anotherpassword',
        })
        .expect(400);
});
