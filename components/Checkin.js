import React, { useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { longToast, postCheckin, fetchStatuses } from './Utils';

export default function Checkin({ asset, checkInSuccess, closeModal }) {
    const [statuses, setStatuses] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState(asset['status_label']['id']);
    const [note, setNote] = useState('');
    

    useEffect(() => {
        fetchStatuses(
            (statuses) => setStatuses(statuses),
            () => longToast('Statuses could not be loaded. Please try again or edit status later')
        );
    }, []);

    const onCheckInSuccess = (message) => {
        longToast(message);
        checkInSuccess();
        closeModal();
    }

    const checkIn = () => {
        if (note != '') 
            postCheckin(asset['id'], {status_id: selectedStatus, note: note}, onCheckInSuccess, longToast);
        else    
            postCheckin(asset['id'], {status_id: selectedStatus}, onCheckInSuccess, longToast);
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            onRequestClose={closeModal}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={{fontSize: 25}}>Check In <Text style={{fontWeight: 'bold'}}>{asset['asset_tag']}</Text></Text>
                    <Picker
                        selectedValue={selectedStatus}
                        style={{ width: '80%' }}
                        onValueChange={(itemValue, itemIndex) => setSelectedStatus(itemValue)}
                    >
                        <Picker.Item label={asset['status_label']['name']} value={asset['status_label']['id']} />
                        {
                            statuses.map((status) => 
                                //avoid rerendering assets current status that is already loaded
                                (status['id'] != asset['status_label']['id']) && <Picker.Item label ={status['name']} value={status['id']} />
                            )
                        }
                    </Picker>
                    <Text>Notes:</Text>
                    <TextInput
                        onChangeText={newText => setNote(newText)}
                        placeholder='Enter notes here' 
                        multiline 
                        numberOfLines={4}
                        defaultValue={note}
                    />
                    <Pressable 
                        onPress={checkIn} 
                        style={styles.checkIn}>
                            <Text style={{fontSize: 25, paddingLeft: 10, paddingRight: 10}}>Check In</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    checkIn: {
        fontSize: 20,
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