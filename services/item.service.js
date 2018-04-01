const Item = require('../models/Item');

/**
 *
 * @param filter - example {given_id: 1}
 * @returns {Promise}
 */
function findItems(filter = {}) {
    return Item.find(filter).lean().exec();
}

/**
 *
 * @param content
 * @param given_id
 * @param type
 * @returns {Promise<*>} return newly created of updated item
 */
async function createItem({content, given_id, type}) {
    //query - condition of search
    //update - what to change if document found
    const query = {given_id, type},
        update = { content: content },
        options = { upsert: true, new: true, setDefaultsOnInsert: true };

    const savedItem = await Item.findOneAndUpdate(query, update, options).exec();
    return savedItem;
}

module.exports = {
    findItems,
    createItem,
};
