import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import GlobalStyles from '../Styles'

import { ActionStatus, longToast, postCheckin, postCheckout } from './Utils';
import AssetActionStatus from './AssetActionStatus';


export default function AssetListItem({ index, asset, postBody, action}) {
    const [status, setStatus] = useState(ActionStatus.PENDING);
    const [statusMessage, setStatusMessage] = useState('');

    const actionSuccess = message => {
        setStatus(ActionStatus.SUCCESS);
        setStatusMessage(message);
        longToast(message);
    }

    const actionFail = message => {
        setStatus(ActionStatus.FAIL);
        setStatusMessage(message);
        longToast(message);
    }

    useEffect(() => {
        if(action == 'checkin')
            postCheckin(
                asset.id,
                postBody,
                actionSuccess,
                actionFail
            );
        else if(action == 'checkout')
            postCheckout(
                asset.id,
                postBody,
                actionSuccess,
                actionFail
            )
    }, []);

    return (
        <View style={[styles.assetContainer, (index % 2 == 0) && GlobalStyles.shadeListItem]}>
            <Text style={styles.assetTag}>
                {asset.assetTag}
            </Text>
            <AssetActionStatus status={status} statusMessage={statusMessage}/>
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
});