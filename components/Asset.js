import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Image, View, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Checkin from './Checkin';
import CheckOut from './CheckOut';

export default function Asset({ route, navigation }) {
    const { asset } = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [status, setStatus] = useState({
        id: asset['status_label']['id'],
        name: asset['status_label']['name'],
        meta: asset['status_label']['meta']
    });
    const [assignedTo, setAssignedTo] = useState(
        asset['assigned_to'] == null ? 
            null :
            {
                id: asset['assigned_to']['id'],
                name: asset['assigned_to']['name'],
                employeeNumber: asset['assigned_to']['employee_number'],
                type: asset['assigned_to']['type']
            }
    )

    useEffect(() => navigation.setOptions({title: `Asset - ${asset['asset_tag']}`}));
    
    return (
        <View style={{height: '100%', width: '100%', alignItems: 'center', backgroundColor: 'white'}}>
            <View style={[{height: '100%', width: '100%', alignItems: 'center'}]}>
                <Image source={{uri: asset['image']}} style={styles.assetImage}/>
                <Pressable onPress={() => setModalVisible(true)}><Text style={styles.assetAction}>{ assignedTo == null  ? 'Checkout' : 'Checkin'}</Text></Pressable>
                <View style={[styles.detailRow, styles.detailRowOdd]}>
                    <Text style={styles.detailHeader}>Status</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={[styles.circle, assignedTo == null ? styles.circleAvailable : styles.circleUnavailable]}/>
                        <Text style={styles.detail}>{status.name}</Text>
                        <Text style={{fontSize: 15, backgroundColor: '#d2d6de', color: '#444', borderRadius: 5, marginLeft: 3}}>
                            {status.meta}
                        </Text>
                    </View>
                    {
                        assignedTo != null &&
                        <View styles={{flexDirection: 'row'}}>
                            <Text style={styles.detail}>
                                {assignedTo.type == 'user' && <AntDesign name="user" size={22}/>}
                                {assignedTo.name}
                            </Text>
                        </View>
                    }
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailHeader}>Serial</Text>
                    <Text style={styles.detail}>{asset['serial']}</Text>
                </View>
                <View style={[styles.detailRow, styles.detailRowOdd]}>
                    <Text style={styles.detailHeader}>Category</Text>
                    <Text style={styles.detail}>{asset['category']['name']}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailHeader}>Model</Text>
                    <Text style={styles.detail}>{asset['model']['name']}</Text>
                </View>
            </View>
            {(modalVisible && assignedTo != null) && <Checkin asset={asset} checkInSuccess={() => setAssignedTo(null)} closeModal={() => setModalVisible(false)}/>}
            {(modalVisible && assignedTo == null) && <CheckOut asset={asset} checkOutSuccess={() => {}} closeModal={() => setModalVisible(false)}/>}
        </View>
    );
}

const styles = StyleSheet.create({
    assetImage: {
        resizeMode: 'contain',
        width: '100%',
        minHeight: 200,
    },
    assetAction: {
        backgroundColor: '#30abc3',
        height: 40,
        fontSize: 25,
        borderRadius: 5,
        paddingLeft: 5,
        paddingRight: 5,
        marginTop: 5,
        marginBottom: 10
    },
    detailRow: {
        width: '100%',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5
    },
    detailRowOdd: {
        backgroundColor: '#f9f9f9',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderBottomColor: '#dddddd'
    },
    detailHeader: {
        fontWeight: 'bold',
        fontSize: 20
    },
    detail: {
        fontSize: 22
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 20/2,
        marginRight: 5
    },
    circleAvailable: {
        backgroundColor: '#00a65a'
    },
    circleUnavailable: {
        backgroundColor: '#0073b7'
    },
    rightCaret: {
        borderTopWidth: 0,
        borderBottomWidth: 0,
        borderLeftWidth: 3,
        borderRightWidth: 3,
        padding: 3,
        transform: [{rotate: '-45deg'}]
    }
});