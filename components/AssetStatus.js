import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { fetchStatuses } from './Utils';


export default function AssetStatus({ onStatusChange }) {
    const [statuses, setStatuses] = useState([]);
    const [status, setStatus] = useState(null);
    
    useEffect(() => {
        fetchStatuses(
            (statuses) => setStatuses(statuses),
            () => longToast('Statuses could not be loaded. Please try again or edit status later')
        );
    }, []);

    return (
        <View style={styles.statusContainer}>
            <Text style={styles.statusLabel}>Status:</Text>
            <Dropdown
                style={styles.status}
                data={statuses}
                labelField='name'
                valueField='id'
                placeholder='Choose Status (optional)'
                value={status}
                onChange={item => {
                    onStatusChange(item.id);
                    setStatus(item.id);
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    status: {
        marginLeft: 20,
        width: '60%'
    },
    statusLabel: {
        fontSize: 20
    }
});