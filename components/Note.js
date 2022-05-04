import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { StyleSheet, Text, TextInput, View } from 'react-native';


export default function Note({ onNoteChange }) {
    const [note, setNote] = useState('');
    const [quickNote, setQuickNote] = useState('');

    const concatNotes = () => {
        if (quickNote == '')
            return note;
        else if (note == '')
            return quickNote;
        else
            return quickNote + ' - ' + note;
    }

    useEffect(() => {
        onNoteChange(concatNotes());
    }, [note, quickNote]);

    return(
        <View style={styles.container}>
            <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 20}}>Notes:</Text>
                <Dropdown
                    style={styles.quickNote}
                    labelField='label'
                    valueField='value'
                    onChange={item => {
                        setQuickNote(item.value);
                    }}
                    value={quickNote}
                    placeholder='Quick Note (optional)'
                    data={[
                        {label: 'No quick note', value: ''},
                        {label: 'No notable issues', value: 'No notable issues'},
                        {label: 'Keys missing', value: 'Keys missing'},
                        {label: 'Cracked screen', value: 'Cracked screen'},
                        {label: 'Physically broken', value: 'Physically broken'},
                    ]}
                />
            </View>
            <TextInput
                style={styles.noteDetails}
                textAlign='center'
                onChangeText={newText => setNote(newText)}
                placeholder='Enter note or additonal details for quick note (optional)' 
                multiline 
                numberOfLines={4}
                defaultValue={note}
            />
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%',
    },
    quickNote: {
        marginLeft: 20,
        width: '60%'
    },
    noteDetails: {
        width: '75%',
    }
})
