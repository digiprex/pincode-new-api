var {checkPincode} = require('../../services/pincode');

route = {
    checkPincode : async function (req, res, next){
        let response;
        try{
            response = await checkPincode(req);
            return res.status(200).json(response);
        }catch(error){
            return res.status(400).send({"error":error.message ? error.message : error});
        }
    }
}

module.exports = route;