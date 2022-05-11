import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import GlobalStyles from '../Styles';

export default function AssetItemAudit({ index, asset, navigation }) {
    return (
        <Pressable
            onPress={() => navigation.navigate('Asset', {asset})}
            style={[styles.assetContainer, (index % 2 == 0) && GlobalStyles.shadeListItem]}
        >
            <Text style={styles.assetTag}>
                {asset.assetTag}
            </Text>
            {asset.name != "" && <Text>Name: {asset.name}</Text>}
            <Text>{asset.category.name + ' ' + asset.model.name}</Text>
            <Text>Checked out: {asset.lastCheckout == null ? 'Never' : asset.lastCheckout}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    assetTag: {
        fontSize: 25,
        maxWidth: '70%'
    },
    assigned: {
        maxWidth: '35%'
    },
    assetContainer: {
        width: '100%',
        maxWidth: '100%',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20
    },
});