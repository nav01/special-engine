import React, { useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, TextInput, View } from 'react-native';
import { longToast, postCheckout, fetchUsers } from './Utils';
import { Foundation } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function CheckOut({ asset, onCheckOutSuccess, closeModal }) {
    const [checkoutSearch, setCheckoutSearch] = useState('');
    const [checkoutTarget, setCheckoutTarget] = useState(null);
    const [note, setNote] = useState('');
    

    const checkOut = () => {
        postCheckout(asset.id, {checkout_to_type: 'user', assigned_user: checkoutTarget.id, note: note}, onCheckOutSuccess, longToast);
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
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
                        <TextInput
                            style={{fontSize: 20, width: '60%', marginRight: 5}}
                            placeholder="Enter target details"
                            onChangeText={newText => setCheckoutSearch(newText)}
                            defaultValue={checkoutSearch}
                        />
                        <Pressable onPress={() => fetchUsers(checkoutSearch, (target) => setCheckoutTarget(target), (message) => longToast(message))} style={({pressed}) =>
                            [{
                                alignItems: 'center', justifyContent: 'center', width: 50, height: 35, alignItems: 'center', borderRadius: 10, backgroundColor: pressed? '#b1e2ec' :'#30abc3'
                            }]}
                            >
                            <AntDesign name="search1" size={24} color="black" />
                        </Pressable>
                    </View>
                    
                    {
                        checkoutTarget != null &&
                        <Text style={{fontSize: 25}}>
                            <Foundation name="target" size={24} color="red" />
                            <AntDesign name="arrowright" size={24} color="black" />
                            {checkoutTarget['name']}
                        </Text>
                    }
                    <Text>Notes:</Text>
                    <TextInput
                        onChangeText={newText => setNote(newText)}
                        placeholder='Enter notes here' 
                        multiline 
                        numberOfLines={4}
                        defaultValue={note}
                    />
                    <Pressable 
                        disabled={checkoutTarget == null ? true : false}
                        onPress={checkOut} 
                        style={[styles.checkOut, {backgroundColor: checkoutTarget == null ? 'lightgrey' : '#30abc3'}]}>
                            <Text style={{color: checkoutTarget == null ? 'darkgrey' : 'black', fontSize: 25, paddingLeft: 10, paddingRight: 10}}>Check Out</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
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