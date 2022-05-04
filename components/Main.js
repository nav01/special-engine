import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import AssetSearch from './AssetSearch';
import ScanAction from './ScanAction';

export default function Main({ navigation }) {
  return (
    <View style={{height: '100%', alignItems: 'center'}}>
      <AssetSearch navigation={navigation}/>
      <Pressable 
        onPress={() => navigation.navigate('QuickCheckIn')}
        style={{marginTop: 20, backgroundColor: '#30abc3', justifyContent: 'center', alignItems: 'center', height: 50, width: '100%'}}
      >
        <Text style={{fontSize: 25}}>QUICK CHECK IN</Text>
      </Pressable>
      <ScanAction scanning={false} navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({

});
