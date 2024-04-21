import request from 'supertest';
import { app } from '../../../app';
import { getCookies } from '../../../utils/get-cookies';
import { Password } from '../../../model/password';

describe('DELETE /api/password/delete/:id', () => {
    it('deletes a password if the user is signed in and authorized', async () => {
        const cookies = getCookies();

        const saveResponse = await request(app)
            .post('/api/password/save')
            .set('Cookie', cookies)
            .send({
                name: 'password1',
                password: 'testpassword',
            })
            .expect(201);

        const passwordId = saveResponse.body.id;

        await request(app).delete(`/api/password/delete/${passwordId}`).set('Cookie', cookies).expect(204);

        const deletedPassword = await Password.findById(passwordId);
        expect(deletedPassword).toBeNull();
    });

    it('returns 400 if the password is not found', async () => {
        const cookies = getCookies();

        await request(app).delete('/api/password/delete/NonExistingId').set('Cookie', cookies).expect(400);
    });

    it('returns 400 if the user is not authorized to delete the password', async () => {
        const cookies = getCookies();

        const mockPassword = new Password({
            name: 'oldPassword',
            password: 'oldTestPassword',
            userId: 'mockUserId',
        });
        await mockPassword.save();

        await request(app).delete(`/api/password/delete/${mockPassword._id}`).set('Cookie', cookies).expect(400);
    });
});
