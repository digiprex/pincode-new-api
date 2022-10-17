const axios = require('axios');
const moment = require("moment");
const fs = require("fs").promises;

const checkPincode = async (req) => {

    try {

      const token = await getAuthToken();
      let config = {
        method: 'get',
        url: `${process.env.SHIP_ROCKET_URL}?pickup_postcode=500034&delivery_postcode=${req.body.pincode}&weight=1&cod=0`,
        headers: { 
          'Authorization': `Bearer ${token.token}`
        }
      };

      if(!req.body.pincode) throw 'Please enter pincode';
      if(req.body.pincode < 100000) throw 'Please enter valid pincode';
      const response  = await axios(config);
      const link = req.body.brand == 'Mars' ? process.env.MARS_AMAZON_LINK: process.env.SATURN_AMAZON_LINK;
      response.data.link =  link;
      return response.data
    } catch(error) {
        throw error;
    }
}

  async function getAuthToken() {
    let todayDate = moment().format("YYYY-MM-DD");
    let yesterdayDate = moment().subtract(1, "d").format("YYYY-MM-DD");
    try {
      await fs.unlink(`./shiprocket-token-${yesterdayDate}.json`);
    } catch (e) {}
    let token, page;
    try {
      token = await fs.readFile(`./shiprocket-token-${todayDate}.json`, "utf8");
    } catch (e) {}
    if (token) {
      return JSON.parse(token );
    } else {
      let data = JSON.stringify({
        email: process.env.EMAIL,
        password: process.env.PASSWORD,
      });
      let config = {
        method: "post",
        url: "https://apiv2.shiprocket.in/v1/external/auth/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      let response = await axios(config);
      await fs.writeFile(
        `./shiprocket-token-${todayDate}.json`,
        JSON.stringify(response.data, null, 2)
      );
      return JSON.stringify(response.data);
    }
  }

module.exports = {
    checkPincode:checkPincode
}