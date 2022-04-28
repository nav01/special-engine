import React, { useState, useEffect } from 'react';
import { View, Pressable, StyleSheet, ToastAndroid, Platform } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { AntDesign } from "@expo/vector-icons";

import ScanAction from "./ScanAction";
import { fetchAsset } from './Utils';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

export default function ScannerView({ navigation }) {
    const [scanned, setScanned] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);

    useEffect(() => {
        (async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
      }, []);

    const fetchAssetSuccess = (asset) => navigation.navigate('Asset', {asset});
    
    const fetchAssetFailure = (assetTag) => {
        if (Platform.OS == 'android')
          ToastAndroid.show(`Asset ${assetTag} not found. Tap barcode to enable scanning again.`, ToastAndroid.LONG);
    }
    
    const handleBarCodeScanned = ({ data }) => {
        setScanned(true);
        fetchAsset(data, fetchAssetSuccess, fetchAssetFailure);
    };

    return (
        <View style={{height: '100%', width: '100%'}}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined: handleBarCodeScanned}
                style={[StyleSheet.absoluteFillObject, {backgroundColor: 'black'}]}
            />
            {scanned && <Pressable onPress={() => setScanned(false)} style={styles.scanAgain}><AntDesign name='barcode' size={40} /></Pressable>}
            <ScanAction scanning={true} navigation={navigation}/>
        </View>
    );
}

const styles = StyleSheet.create({
    scanAgain: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,  
        height: 60,   
        borderRadius: 30,            
        backgroundColor: '#30abc3',                                    
        position: 'absolute',                                          
        bottom: 150,                                                    
        right: 10, 
    }
});