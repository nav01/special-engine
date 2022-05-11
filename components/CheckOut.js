import React, { useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, TextInput, View } from 'react-native';
import { longToast, postCheckout, fetchUsers } from './Utils';
import TargetSearch from './TargetSearch';
import Note from './Note';

export default function CheckOut({ asset, onCheckOutSuccess, closeModal }) {
    const [targetId, setTargetId] = useState(-1);
    const [targetType, setTargetType] = useState('');
    const [note, setNote] = useState('');
    

    const checkOut = () => {
        postCheckout(asset.id, {checkout_to_type: targetType, assigned_user: targetId, note: note}, onCheckOutSuccess, longToast);
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            onRequestClose={closeModal}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={{fontSize: 25}}>Check Out <Text style={{fontWeight: 'bold'}}>{asset.assetTag}</Text></Text>
                    <TargetSearch 
                        onTargetGet={target => {
                            setTargetId(target.id);
                            setTargetType(target.type);
                        }}
                    />
                    <Note  onNoteChange={note => setNote(note)} action='checkout'/>
                    <Pressable 
                        disabled={targetId == -1 ? true : false}
                        onPress={checkOut} 
                        style={[styles.checkOut, {backgroundColor: targetId == -1 ? 'lightgrey' : '#30abc3'}]}>
                           <Text style={[{color: targetId == -1 ? 'darkgrey' : 'black'}, styles.checkOutButton]}>Check Out</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    checkOutButton: {
        fontSize: 25, 
        paddingLeft: 10, 
        paddingRight: 10
    },
    checkOut: {
        fontSize: 20,
        borderRadius: 10,
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
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1
      },
  });