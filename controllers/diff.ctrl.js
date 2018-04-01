const { diff, item } = require('../services');
const diffResponseModel = require('../services/diff-response.model');

const LEFT = "left";
const RIGHT = "right";

/**
 * Creates new item in database
 * @param req
 * @param res
 * @param next
 * @param type
 * @returns created item
 */
async function postItem({req, res, next, type}) {
    try{
        let id = req.params.id;

        let content = req.body.content;

        if (!content) {
            res.error("Empty content")
        }

        const result =  await item.createItem({content: content, given_id: id, type});
        res.send(result);
    } catch(error){
        next(error);
    }
}

/**
 * Checks if two entries in DB are same or not
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
async function checkDiff(req, res, next) {
    try{
        const givenId = req.params.id;
        const items = await item.findItems({given_id: givenId});
        let result;
        if(items && items.length === 2){
            //two items are found
            const left = items.find((item)=> item.type===LEFT);
            const right = items.find((item)=> item.type===RIGHT);
            result = diff.compareInputs({left: left.content, right: right.content});
        }
        else{
            //none or only one item is found
            //TODO improvement - to send different response, based upon if there is only one item or none
            result = diffResponseModel();
            result.areBothItemsExist = false;
        }

        res.send(result);
    } catch(error){
        console.error(error);
        next(error);
    }
}

module.exports = {
    postItem,
    checkDiff
};
