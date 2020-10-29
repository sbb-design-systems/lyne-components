const axios = require('axios');

require('dotenv')
  .config();

module.exports = async (id) => {
  try {

    const requestHeaders = {
      'Accept': 'application/json',
      'Authorization': `token ${process.env.TRAVIS_TOKEN}`,
      'Content-Type': 'application/json',
      'Travis-API-Version': '3'
    };

    const requestConfig = {
      headers: requestHeaders,
      method: 'GET',
      url: `https://api.travis-ci.com/build/${id}`
    };

    const travisResponse = await axios.request(requestConfig);

    return travisResponse.data.commit.message;

  } catch (e) {
    console.log('-->> Error while getting commit message from Travis');
    console.log(e);

    return 'chore: empty commit';
  }
};
