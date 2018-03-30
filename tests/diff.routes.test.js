const diffRoutes = require('../routes/diff.routes');
const request = require('supertest');
const app = require('../app');
const { item } = require('../services');
const ItemModel = require('../models/Item');


const testObjectLeft = {
    given_id:3,
    type:'left',
    content: "test item with given id 3 and type left",
};

describe('Test the diff end point routes', () => {
    test('The inputs data should be saved in database and contain all required properties', async () => {
        try {
            await request(app)
                .post(`/v1/diff/${testObjectLeft.given_id}/${testObjectLeft.type}`)
                .send({"content": testObjectLeft.content});

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