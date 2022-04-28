import { AntDesign } from "@expo/vector-icons"
import { StyleSheet, Pressable } from "react-native";
import React from 'react';

export default function ScanAction({ scanning, navigation }) {
    const launchScreen = () => {
        scanning ? navigation.navigate('Main') : navigation.navigate('ScannerView');
    }
    return (
        <Pressable onPress={launchScreen} style={styles.scanAction}>
          <AntDesign name='camera' size={40}  />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    scanAction: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,  
        height: 80,   
        borderRadius: 40,            
        backgroundColor: '#30abc3',                                    
        position: 'absolute',                                          
        bottom: 10,                                                    
        right: 10, 
    }
});