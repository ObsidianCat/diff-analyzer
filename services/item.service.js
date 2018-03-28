const { ServerError } = require('../helpers/server-error.helper');
const Item = require('../models/Item');

function findItems(filter = {}) {
    return Item.find(filter).lean().exec();
}

async function createItem({content, given_id, type}) {
    const newItem = new Item();
    newItem.content = content;
    newItem.given_id = given_id;
    newItem.type = type;

    try {
        await newItem.validate();
        const savedItem = await newItem.save();
        return savedItem;
    } catch (validateError) {
        throw new ServerError(validateError.message, 400);
    }
}

module.exports = {
    findItems,
    createItem,
};
