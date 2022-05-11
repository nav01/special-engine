import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import AssetSearch from './AssetSearch';
import ScanAction from './ScanAction';
import GlobalStyles from '../Styles';

export default function Main({ navigation }) {
  return (
    <View style={{height: '100%', alignItems: 'center'}}>
      <AssetSearch action='Search' onAssetGet={(asset) => navigation.navigate('Asset', {asset})}/>
      <Pressable 
        onPress={() => navigation.navigate('QuickCheckIn')}
        style={({pressed}) => [styles.menuItem, pressed ? GlobalStyles.buttonPressedColor : GlobalStyles.buttonColor]}
      >
        <Text style={styles.menuItemText}>QUICK CHECK IN</Text>
      </Pressable>
      <Pressable 
        onPress={() => navigation.navigate('QuickCheckOut')}
        style={({pressed}) => [styles.menuItem, pressed ? GlobalStyles.buttonPressedColor : GlobalStyles.buttonColor]}
      >
        <Text style={styles.menuItemText}>QUICK CHECK OUT</Text>
      </Pressable>
      <Pressable 
        onPress={() => navigation.navigate('Audit', {navigation})}
        style={({pressed}) => [styles.menuItem, pressed ? GlobalStyles.buttonPressedColor : GlobalStyles.buttonColor]}
      >
        <Text style={styles.menuItemText}>AUDIT</Text>
      </Pressable>
      <ScanAction scanning={false} navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    marginTop: 40,
    justifyContent: 'center', 
    alignItems: 'center', 
    height: 50, 
    width: '100%'
  },
  menuItemText: {
    fontSize: 25
  }
});
