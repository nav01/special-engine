import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { longToast, postCheckin, fetchStatuses } from './Utils';
import AssetStatus from './AssetStatus';
import Note from './Note';

export default function Checkin({ asset, onCheckInSuccess, closeModal }) {
    const [selectedStatus, setSelectedStatus] = useState(asset.status.id);
    const [note, setNote] = useState('');

    const checkIn = () => {
        postCheckin(asset.id, {status_id: selectedStatus, note: note}, onCheckInSuccess, longToast);
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            onRequestClose={closeModal}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={{fontSize: 25}}>Check In <Text style={{fontWeight: 'bold'}}>{asset.assetTag}</Text></Text>
                    <AssetStatus onStatusChange={setSelectedStatus}/>
                    <Note onNoteChange={setNote} action='checkin' />
                    <Pressable 
                        onPress={checkIn} 
                        style={styles.checkIn}>
                            <Text style={styles.checkInText}>Check In</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    checkInText: {
        fontSize: 25, 
        paddingLeft: 10, 
        paddingRight: 10
    },
    checkIn: {
        borderRadius: 10,
        backgroundColor: '#30abc3'
    },
    centeredView: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        flex: 1,
        alignItems: "center",
        paddingTop: 200,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalView: {
        width: '90%',
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        borderTopWidth: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
  });