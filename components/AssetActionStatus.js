import React from 'react';
import { ActivityIndicator, Alert, Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons'; 

import { ActionStatus } from './Utils';

export default function AssetActionStatus({ status, statusMessage }) {
    return (
        <Pressable style={styles.checkInStatus} onPress={() => Alert.alert(statusMessage)}>
            {status == ActionStatus.PENDING && <ActivityIndicator size='large' color='blue'/>}
            {status == ActionStatus.FAIL && <Feather name="x-circle" size={30} color="red" />}
            {status == ActionStatus.SUCCESS && <Feather name="check-circle" size={30} color="green" />}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    checkInStatus: {
        justifyContent: 'center',
        maxWidth: '20%'
    }
});