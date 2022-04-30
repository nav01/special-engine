import { SNIPE_IT_PROXY_API_URL } from '@env';
import { Platform, ToastAndroid } from 'react-native';

export const fetchAsset = (assetTag, success, fail) => {
    fetch(SNIPE_IT_PROXY_API_URL + `/hardware/bytag/${assetTag}`)
        .then(response =>  response.json())
        .then(json => {
          if(!('status' in json))
            success(json);
          else { 
            fail(assetTag);
          } 
        })
        .catch(error => console.error(error));
}

export const fetchStatuses = (success, fail) => {
    fetch(SNIPE_IT_PROXY_API_URL + '/statuslabels')
        .then(response => response.json())
        .then(json => {
            if (json['total'] > 0)
              success(json['rows']);
            else
              fail();
        })
        .catch(error => {
            console.error(error)
        });
}

export const postCheckin = (assetId, postBody, success, fail) => {
  fetch(SNIPE_IT_PROXY_API_URL + `/hardware/${assetId}/checkin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postBody)
  })
  .then(response => response.json())
  .then(json => {
      if (json['status'] == 'success')
        success(json['messages']);
      else if (json['status'] == 'error')
        fail(json['messages']);
  })
  .catch(error => {
      console.error(error);
  })
}

export const longToast = (message) => {
  if (Platform.OS == 'android') 
    ToastAndroid.show(message, ToastAndroid.LONG)
}