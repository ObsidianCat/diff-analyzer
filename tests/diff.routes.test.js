const diffRoutes = require('../routes/diff.routes');
const request = require('supertest');
const app = require('../app');
const { item } = require('../services');
const ItemModel = require('../models/Item');
const diffResponseModel = require('../services/diff-response.model');


const testObjectLeft = {
    given_id:5,
    type:'left',
    content: "test item with given id 3 and type left",
};

describe('Test the POST item end point routes', () => {

    describe('invalid inputs', () => {
        test('Bad type', async () => {
            let response = await request(app)
                .post(`/v1/diff/123/middle`)
                .send({"content": testObjectLeft.content});

            expect(response.statusCode).toEqual(404)
        })

        test('Non numeric ID', async () => {
            let response = await request(app)
                .post(`/v1/diff/abc/right`)
                .send({"content": testObjectLeft.content});

            expect(response.statusCode).toEqual(500)
        })
    });

    test('The inputs data should be saved in database and contain all required properties', async () => {
        try {
            let response = await request(app)
                .post(`/v1/diff/${testObjectLeft.given_id}/${testObjectLeft.type}`)
                .send({"content": testObjectLeft.content});

            expect(response.statusCode).toEqual(200);

            const responseFromDb = await item.findItems({given_id: testObjectLeft.given_id});
            expect(responseFromDb.length).toBe(1);
            expect(responseFromDb[0]).toEqual(expect.objectContaining(testObjectLeft));
        }
        catch(error) {
            throw new Error(error);
        }
        finally {
            ItemModel.remove({ given_id: testObjectLeft.given_id }).exec().catch((error)=>{
                throw new Error(error);
            })
        }
    });
});

describe('Test the GET - do comparison end point routes', () => {
    test('Items with given ids are not in database', async () => {
        try {
            let response = await request(app)
                .get(`/v1/diff/${testObjectLeft.given_id + testObjectLeft.given_id}`);

            const model = diffResponseModel();
            model.areBothItemsExist = false;

            expect(response.statusCode).toEqual(200);
            expect(response.body).toEqual(expect.objectContaining(model));

        }
        catch(error) {
            throw new Error(error);
        }
    });
});



afterAll(() => {
    process.emit("close")
});