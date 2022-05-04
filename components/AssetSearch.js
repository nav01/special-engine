import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import GlobalStyles from '../Styles';
import { fetchAsset, longToast } from './Utils';

export default function AssetSearchTemp({ onAssetGet, action }) {
    const [assetTag, setAssetTag] = useState('');

    return (
        <View style={styles.searchContainer}>
          <View style={styles.searchAsset}>
            <TextInput
                style={styles.assetInput}
                placeholder="Enter asset tag"
                onChangeText={newText => setAssetTag(newText)}
                defaultValue={assetTag}
            />
            <Pressable
                style={({pressed}) =>
                    [styles.actionButton, pressed ? GlobalStyles.buttonPressedColor : GlobalStyles.buttonColor]}
                onPress={() => {
                    fetchAsset(
                        assetTag, 
                        onAssetGet,
                        message => longToast(message)
                    );
                    setAssetTag('');
                }}
            >
                <Text style={styles.actionLabel}>{ action }</Text>
            </Pressable>
          </View>
        </View>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        width: '100%'
    },
    actionLabel: {
        height: 40,
        fontSize: 25
    },
    actionButton: {
        width: '30%',
        alignItems: 'center',
        borderRadius: 10
    },
    assetInput: {
        height: 80, 
        fontSize: 25, 
        width: '60%', 
        marginRight: 5
    },
    searchAsset: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
});