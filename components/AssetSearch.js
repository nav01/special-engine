import React, { useState } from 'react';
import { ToastAndroid, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { SNIPE_IT_PROXY_API_URL } from "@env";

export default function AssetSearch({ navigation }) {

    const [assetTag, setText] = useState('');

    const fetchAsset = (asset_tag) => {
        fetch(SNIPE_IT_PROXY_API_URL + `/hardware/bytag/${asset_tag}`)
            .then(response =>  response.json())
            .then(json => {
              if(!('status' in json))
                navigation.navigate('Asset', {asset: json});
              else {
                if (Platform.OS == 'android')
                  ToastAndroid.show('Asset not found', ToastAndroid.SHORT);
              }

            })
            .catch(error => console.error(error));
    }
  
    return (
      <View style={styles.searchAsset}>
          <TextInput
              style={{height: 80, fontSize: 25, width: '60%', marginRight: 5}}
              placeholder="Enter asset tag"
              onChangeText={newText => setText(newText)}
              defaultValue={assetTag}
          />
          <Pressable onPress={() => fetchAsset(assetTag)} style={({pressed}) =>
              [{
                  width: '30%', alignItems: 'center', borderRadius: 10, backgroundColor: pressed? '#b1e2ec' :'#30abc3'
              }]}
              >
              <Text style={{height: 40, fontSize: 25}}>Search</Text>
          </Pressable>
      </View>
    );
  }

  
const styles = StyleSheet.create({
    searchAsset: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      alignItems: 'center',
    },
  });
  