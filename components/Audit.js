import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import CheckBox from 'expo-checkbox';

import TargetSearch from './TargetSearch';
import AssetItemAudit from './AssetItemAudit';
import { fetchUsersAssets, longToast, patchUser } from './Utils';
import GlobalStyles from '../Styles';


export default function Audit({ navigation }) {
    const DEFAULT_AUDIT_MARKS_STATE = {
        clear: {value: false, note: 'All clear' },
        multiple: {value: false, note: 'Multiple chromebooks'},
        wrong: {value: false, note: 'Wrong chromebook'},
        damaged: {value: false, note: 'Damaged chromebook'},
        forgot: {value: false, note: 'Forgot chromebook'}
    };

    const [target, setTarget] = useState(null);
    const [assetList, setAssetList] = useState([]);
    const [assetListExpanded, setAssetListExpanded] = useState(true);
    const [auditMarks, setAuditMarks] = useState(DEFAULT_AUDIT_MARKS_STATE);
    const [auditMarksExpanded, setAuditMarksExpanded] = useState(true);
    const [additionalNotes, setAdditionalNotes] = useState('');
    const [notes, setNotes] = useState('');

    useEffect(() => {
        let note = '';
        for (var mark in auditMarks) {
            if (auditMarks[mark].value)
                note += ' | ' + auditMarks[mark].note;
        }

        if (additionalNotes != '')
            setNotes(note + ' | ' + additionalNotes);
        else
            setNotes(note);
        
    }, [auditMarks, additionalNotes]);

    useEffect(() => {
        if(target != null)
            fetchUsersAssets(target.id, (assetList) => setAssetList(assetList));
    }, [target]);

    
    return (
        <View>
            <TargetSearch onTargetGet={(target) => setTarget(target) }/>
            {target != null &&
                <View style={styles.targetDetails}>
                    <Text style={styles.targetAttribute}>Identifier: {target.username}</Text>
                    <Text style={styles.targetAttribute}>Asset Count: {target.assetsCount}</Text>
                    <Text style={styles.targetAttribute}>Site: {target.site}</Text>
                </View>
            }
            {target != null && target.assetsCount > 0 &&
                <>
                    <Pressable 
                        style={styles.listHeader}
                        onPress={() => setAssetListExpanded(!assetListExpanded)}
                    >
                        <Ionicons name={assetListExpanded ? 'caret-down-circle' : 'caret-forward-circle-sharp'} size={24} color="black" />
                        <Text style={styles.listHeaderLabel}>Assets</Text>
                    </Pressable>
                    {assetListExpanded &&
                        <FlatList
                            style={{width: '100%', marginLeft: 30}}
                            data={assetList}
                            keyExtractor={asset => asset.id}
                            renderItem={({item, index}) => {
                                return <AssetItemAudit
                                    index={index} 
                                    asset={item}
                                    navigation={navigation}
                                />
                            }} 
                        />
                    }
                </>
            }
            {target != null &&
                <>
                    <Pressable 
                        style={styles.listHeader}
                        onPress={() => setAuditMarksExpanded(!auditMarksExpanded)}
                    >
                        <Ionicons name={auditMarksExpanded ? 'caret-down-circle' : 'caret-forward-circle-sharp'} size={24} color="black" />
                        <Text style={styles.listHeaderLabel}>Marks</Text>
                    </Pressable>
                    {target != null && auditMarksExpanded &&
                        <View style={styles.marksContainer}>
                            <View style={styles.markContainer}>
                                <CheckBox
                                    value={auditMarks.clear.value}
                                    onValueChange={(value) => {
                                        setAuditMarks({
                                            ...auditMarks,
                                            clear: {...auditMarks.clear, value}
                                        });
                                    }}
                                />
                                <Text style={styles.markNote}>{auditMarks.clear.note}</Text>
                            </View>
                            <View style={styles.markContainer}>
                                <CheckBox
                                    value={auditMarks.multiple.value}
                                    onValueChange={(value) => {
                                        setAuditMarks({
                                            ...auditMarks,
                                            multiple: {...auditMarks.multiple, value}
                                        });
                                    }}
                                />
                                <Text style={styles.markNote}>{auditMarks.multiple.note}</Text>
                            </View>
                            <View style={styles.markContainer}>
                                <CheckBox
                                    value={auditMarks.wrong.value}
                                    onValueChange={(value) => {
                                        setAuditMarks({
                                            ...auditMarks,
                                            wrong: {...auditMarks.wrong, value}
                                        });
                                    }}
                                />
                                <Text style={styles.markNote}>{auditMarks.wrong.note}</Text>
                            </View>
                            <View style={styles.markContainer}>
                                <CheckBox
                                    value={auditMarks.damaged.value}
                                    onValueChange={(value) => {
                                        setAuditMarks({
                                            ...auditMarks,
                                            damaged: {...auditMarks.damaged, value}
                                        });
                                    }}
                                />
                                <Text style={styles.markNote}>{auditMarks.damaged.note}</Text>
                            </View>
                            <View style={styles.markContainer}>
                                <CheckBox
                                    value={auditMarks.forgot.value}
                                    onValueChange={(value) => {
                                        setAuditMarks({
                                            ...auditMarks,
                                            forgot: {...auditMarks.forgot, value}
                                        });
                                    }}
                                />
                                <Text style={styles.markNote}>{auditMarks.forgot.note}</Text>
                            </View>
                        </View>
                    }
                    <View style={{width: '100%', alignItems: 'center'}}>
                        <TextInput
                            style={styles.additionalNotes}
                            textAlign='center'
                            onChangeText={newText => setAdditionalNotes(newText)}
                            placeholder='Additional notes' 
                            multiline 
                            numberOfLines={4}
                            defaultValue={additionalNotes}
                        />
                    </View>
                </>
            }
            {target != null &&
                <Pressable  
                    style={({pressed}) => [{alignItems: 'center'}, pressed ? GlobalStyles.buttonPressedColor : GlobalStyles.buttonColor]}
                    onPress={() => {
                        patchUser(
                            target.id, 
                            {
                                notes: target.notes + ` | Audit Spring 2022 | Num assets: ${target.assetsCount}`  + notes
                            }, 
                            longToast,
                            longToast
                        );
                        setAdditionalNotes('');
                        setAuditMarks(DEFAULT_AUDIT_MARKS_STATE);
                    }}
                >
                    <Text style={{fontSize: 30}}>SUBMIT</Text>
                </Pressable>
            }         
        </View>
    );
}

const styles = StyleSheet.create({
    targetDetails: {
        alignItems: 'center',
    },
    targetAttribute: {
        fontSize: 20
    },
    listHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 25
    },
    listHeaderLabel: {
        fontSize: 30,
        marginLeft: 10
    },
    markContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    marksContainer: {
        marginLeft: 35
    },
    markNote: {
        fontSize: 20,
        marginLeft: 5
    },
    additionalNotes: {
        width: '80%'
    }
})