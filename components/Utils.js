import { SNIPE_IT_PROXY_API_URL } from '@env';
import { Platform, ToastAndroid } from 'react-native';
import { Status } from '../models/Status';
import User from '../models/User';
import Asset from '../models/Asset';

export const fetchUsers = (searchString, success, fail) => {
    fetch(SNIPE_IT_PROXY_API_URL + '/users?search=' + searchString)
        .then(response => response.json())
        .then(json => {
          const numResults = json['total'];
          if(numResults == 1)
            success(new User(json['rows'][0]));
          else if(numResults == 0)
            fail('User not found.');
          else if(numResults > 1)
            fail('Too many users found. Try being more specific.');
        })
        .catch(error => console.error(error));
}

export const fetchUsersAssets = (userId, success) => {
    fetch(SNIPE_IT_PROXY_API_URL + `users/${userId}/assets`)
      .then(response => response.json())
      .then(json => {
        success(json['rows'].map(a => new Asset(a)));
      })
      .catch(error => console.error(error));
}

export const patchUser = (userId, postBody, success, fail) => {
  fetch(SNIPE_IT_PROXY_API_URL + `users/${userId}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(postBody)
  })
    .then(response => response.json())
    .then(json => {
      if (json['status'] == 'success')
        success(json['messages']);
      else if (json['status'] == 'error')
        fail(json['messages']);
    })
    .catch(error => console.error(error));

}

export const fetchAsset = (assetTag, success, fail) => {
    fetch(SNIPE_IT_PROXY_API_URL + `/hardware/bytag/${assetTag}`)
        .then(response =>  response.json())
        .then(json => {
          if(!('status' in json))
            success(new Asset(json));
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
              success(json['rows'].map(status => new Status(status)));
            else
              fail();
        })
        .catch(error => {
            console.error(error)
        });
}

const checkInCheckOut = (action, assetId, postBody, success, fail) => {
  fetch(SNIPE_IT_PROXY_API_URL + `/hardware/${assetId}/${action}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
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
    });

}
export const postCheckin = (assetId, postBody, success, fail) => {
  checkInCheckOut('checkin', assetId, postBody, success, fail);
}

export const postCheckout = (assetId, postBody, success, fail) => {
  checkInCheckOut('checkout', assetId, postBody, success, fail);
}

export const longToast = (message) => {
  if (Platform.OS == 'android') 
    ToastAndroid.show(message, ToastAndroid.LONG);
}

export const ActionStatus = Object.freeze({
  PENDING: Symbol('pending'),
  SUCCESS: Symbol('successful'),
  FAIL: Symbol('fail')
});