const Item = require('../models/Item');

function findItems(filter = {}) {
    return Item.find(filter).lean().exec();
}

async function createItem({content, given_id, type}) {
    //query - condition of search
    //update - what to change if document found
    const query = {given_id, type},
        update = { content: content },
        options = { upsert: true, new: true, setDefaultsOnInsert: true };

    try {
        const savedItem = await Item.findOneAndUpdate(query, update, options);
        return savedItem;
    } catch (validateError) {
        throw new Error(validateError.message);
    }
}

module.exports = {
    findItems,
    createItem,
};
