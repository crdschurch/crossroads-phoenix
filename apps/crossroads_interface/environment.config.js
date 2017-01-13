/* eslint no-var: 0 */
module.exports = {
  get() {
    return {
      __CRDS_ENV__: JSON.stringify(process.env.CRDS_ENV || ''),
      __COOKIE_DOMAIN__: JSON.stringify(process.env.CRDS_COOKIE_DOMAIN || ''),
      __API_ENDPOINT__: JSON.stringify(process.env.CRDS_API_ENDPOINT || 'https://gatewayint.crossroads.net/gateway/'),
      __CMS_ENDPOINT__: JSON.stringify(process.env.CRDS_CMS_ENDPOINT || 'https://contentint.crossroads.net/'),
      __GOOGLE_API_KEY__: JSON.stringify(process.env.CRDS_GOOGLE_API_KEY || 'AIzaSyArKsBK97N0Wi-69x10OL7Sx57Fwlmu6Cs'),
      __STRIPE_PUBKEY__: JSON.stringify(process.env.CRDS_STRIPE_PUBKEY || 'pk_test_U8U15gSZFM4AQtPDLHYnKWqH'),
      __STRIPE_API_VERSION__: JSON.stringify(process.env.CRDS_STRIPE_API_VERSION),
      __SOUNDCLOUD_API_KEY__: JSON.stringify(process.env.CRDS_SOUNDCLOUD_KEY || '67723f3ff9ea6bda29331ac06ce2960c'),
      __AWS_SEARCH_ENDPOINT__: JSON.stringify(process.env.CRDS_AWS_SEARCH_ENDPOINT || 'https://vs9gac5tz7.execute-api.us-east-1.amazonaws.com/prod/'),
      __STREAMSPOT_ENDPOINT__: JSON.stringify(process.env.CRDS_STREAMSPOT_ENDPOINT || 'https://api.streamspot.com/'),
      __STREAMSPOT_API_KEY__: JSON.stringify(process.env.CRDS_STREAMSPOT_API_KEY || '82437b4d-4e38-42e2-83b6-148fcfaf36fb'),
      __STREAMSPOT_SSID__: JSON.stringify(process.env.CRDS_STREAMSPOT_SSID || 'crossr4915'),
      __STREAMSPOT_PLAYER_ID__: JSON.stringify(process.env.CRDS_STREAMSPOT_PLAYER_ID || '1adb55de')
    };
  },
  getTest() {
    var params = this.get();
    /* eslint-disable no-underscore-dangle */
    params.__CRDS_ENV__ = JSON.stringify('');
    params.__COOKIE_DOMAIN__ = JSON.stringify('');
    /* eslint-enable */
    return params;
  }
};

