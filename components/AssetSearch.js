import React, { useState, useEffect } from 'react';
import { ToastAndroid, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { fetchAsset } from './Utils';
import ScanAction from './ScanAction';

export default function AssetSearch({ navigation }) {

    const [assetTag, setAssetTag] = useState('');

    const assetFetchSuccess = (asset) => {
      navigation.navigate('Asset', {asset});
    }

    const assetFetchFailure = (assetTag) => {
      if (Platform.OS == 'android')
        ToastAndroid.show(`Asset ${assetTag} not found`, ToastAndroid.LONG);
    }
  
    return (
      <View style={{height: '100%', width: '100%'}}>
        <View style={styles.searchAsset}>
          <TextInput
              style={{height: 80, fontSize: 25, width: '60%', marginRight: 5}}
              placeholder="Enter asset tag"
              onChangeText={newText => setAssetTag(newText)}
              defaultValue={assetTag}
          />
          <Pressable onPress={() => fetchAsset(assetTag, assetFetchSuccess, assetFetchFailure)} style={({pressed}) =>
              [{
                  width: '30%', alignItems: 'center', borderRadius: 10, backgroundColor: pressed? '#b1e2ec' :'#30abc3'
              }]}
              >
              <Text style={{height: 40, fontSize: 25}}>Search</Text>
          </Pressable>
        </View>
        <ScanAction scanning={false} navigation={navigation} />
      </View>
    );
  }

const styles = StyleSheet.create({
    searchAsset: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });
  