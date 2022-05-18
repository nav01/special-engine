const dotenv = require('dotenv');
dotenv.config({ override: true })

export default {
  name: 'SnipeITNative',
  version: '0.0.1',
  extra: {
    apiUrl: process.env.SNIPE_IT_PROXY_API_URL,
  },
};