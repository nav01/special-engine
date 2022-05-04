import React, { useEffect, useState } from 'react';
import { Alert, ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import GlobalStyles from '../Styles'

import { longToast, postCheckin } from './Utils';

const Status = Object.freeze({
    PENDING: Symbol('pending'),
    SUCCESS: Symbol('successful'),
    FAIL: Symbol('fail')
});

export default function AssetListItem({ index, asset, currStatus, currNote }) {
    const [status, setStatus] = useState(Status.PENDING);
    const [statusMessage, setStatusMessage] = useState('');

    useEffect(() => {
        postCheckin(
            asset.id,
            {status_id: currStatus, note: currNote},
            message => {
                setStatus(Status.SUCCESS);
                setStatusMessage(message);
                longToast(message);
            },
            message => {
                setStatus(Status.FAIL);
                setStatusMessage(message);
                longToast(message);
            }
        );
    }, []);

    return (
        <View style={[styles.assetContainer, (index % 2 == 0) && GlobalStyles.shadeListItem]}>
            <Text style={styles.assetTag}>
                {asset.assetTag}
            </Text>
            <Pressable style={styles.checkInStatus} onPress={() => Alert.alert(statusMessage)}>
                {status == Status.PENDING && <ActivityIndicator size='large' color='blue'/>}
                {status == Status.FAIL && <Feather name="x-circle" size={30} color="red" />}
                {status == Status.SUCCESS && <Feather name="check-circle" size={30} color="green" />}
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    assetTag: {
        fontSize: 35,
        maxWidth: '70%'
    },
    assigned: {
        maxWidth: '35%'
    },
    assetContainer: {
        width: '100%',
        maxWidth: '100%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    checkInStatus: {
        justifyContent: 'center',
        maxWidth: '20%'
    }
});