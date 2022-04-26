import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function AssetSearch() {

    const [assetTag, setText] = useState('');

    const fetchAsset = (asset_tag) => {
        console.log(process.env.SNIPE_IT_PROXY_API_URL + `/hardware/bytag/${asset_tag}`);
        fetch(process.env.SNIPE_IT_PROXY_API_URL + `/hardware/bytag/${asset_tag}`)
            .then(response => response.json()).then(json => console.log(json))
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
  