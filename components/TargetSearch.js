import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';

import GlobalStyles from '../Styles';
import { longToast, fetchUsers } from './Utils';

export default function TargetSearch({ onTargetGet }) {
    const [targetSearch, setTargetSearch] = useState('');
    const [target, setTarget] = useState(null);

    return(
        <View style={{width: '100%', alignItems: 'center'}}>
            <View style={styles.targetSearchContainer}>
                <TextInput
                    style={styles.targetField}
                    placeholder="Enter target details"
                    onChangeText={newText => setTargetSearch(newText)}
                    defaultValue={targetSearch}
                />
                <Pressable 
                    onPress={() => 
                        fetchUsers(
                            targetSearch, 
                            (foundTarget) => {
                                setTargetSearch('');
                                setTarget(foundTarget);
                                onTargetGet(foundTarget);
                            },
                            (message) => longToast(message)
                        )
                    } 
                    style={
                        ({pressed}) =>
                            [styles.searchButton, pressed ? GlobalStyles.buttonPressedColor : GlobalStyles.buttonColor]
                    }
                >
                    <AntDesign name="search1" size={24} color="black" />
                </Pressable>
            </View>
            {
                target != null &&
                <Text style={styles.target}>
                    <Foundation name="target" size={24} color="red" />
                    <AntDesign name="arrowright" size={24} color="black" />
                    {target.name}
                </Text>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    targetSearchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20
    },
    searchButton: {
        alignItems: 'center', 
        justifyContent: 'center', 
        width: 50, 
        height: 35, 
        alignItems: 'center', 
        borderRadius: 10
    },
    targetField: {
        fontSize: 25,
        width: '60%', 
        marginRight: 5,
        textAlign: 'center'
    },
    target: {
        marginTop: 10,
        fontSize: 25
    }
});