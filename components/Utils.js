import { SNIPE_IT_PROXY_API_URL } from "@env";

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