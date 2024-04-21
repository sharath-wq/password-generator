import request from 'supertest';
import { app } from '../../../app';
import { getCookies } from '../../../utils/get-cookies';
import { Password } from '../../../model/password';

it('updates a password if the user is signed in and authorized', async () => {
    const cookies = getCookies();

    const response1 = await request(app)
        .post('/api/password/save')
        .set('Cookie', cookies)
        .send({
            name: 'password1',
            password: 'testpassword',
        })
        .expect(201);

    const newData = {
        name: 'newPassword',
        password: 'newTestPassword',
    };

    const response = await request(app)
        .put(`/api/password/update/${response1.body.id}`)
        .set('Cookie', cookies)
        .send(newData)
        .expect(200);

    expect(response.body.name).toBe(newData.name);
    expect(response.body.password).toBe(newData.password);
});

it('returns 400 if the password is not found', async () => {
    const cookies = getCookies();

    await request(app)
        .put('/api/password/update/NonExistingId')
        .set('Cookie', cookies)
        .send({
            name: 'newPassword',
            password: 'newTestPassword',
        })
        .expect(400);
});

it('returns 400 if the user is not authorized to update the password', async () => {
    const cookies = getCookies();

    const mockPassword = new Password({
        name: 'oldPassword',
        password: 'oldTestPassword',
        userId: 'mockUserId',
    });
    await mockPassword.save();

    await request(app)
        .put(`/api/password/update/${mockPassword._id}`)
        .set('Cookie', cookies)
        .send({
            name: 'newPassword',
            password: 'newTestPassword',
        })
        .expect(400);
});

it('returns 400 if the request body is invalid', async () => {
    const cookies = getCookies();

    const mockPassword = new Password({
        name: 'oldPassword',
        password: 'oldTestPassword',
        userId: 'mockUserId',
    });
    await mockPassword.save();

    await request(app)
        .put(`/api/password/update/${mockPassword._id}`)
        .set('Cookie', cookies)
        .send({
            password: 'newTestPassword',
        })
        .expect(400);
});
