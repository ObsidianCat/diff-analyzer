var _ = require('lodash');

const { diff, item } = require('../services');

function getItems() {
    return item.findItems();
}

async function postItem({req, res, next, type}) {
    const result =  await item.createItem({content: req.body.content, given_id: req.params.id, type} );
    res.send(result);
}

async function checkDiff(req, res, next) {
    const givenId = req.params.id;
    const items = await item.findItems({given_id: givenId});
    const left = items.find((item)=> item.type==='left');
    const right = items.find((item)=> item.type==='right');

    const result = diff.compareInputs({left, right});
    res.send(result);
}

module.exports = {
    postItem,
    checkDiff
};
