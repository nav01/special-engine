import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import AssetListItem from './AssetListItem';
import AssetStatus from './AssetStatus';
import Note from './Note';
import { fetchAsset, longToast } from './Utils';

export default function QuickCheckIn() {
    const [assetTag, setAssetTag] = useState('');
    const [assetStatus, setAssetStatus] = useState(null);
    const [note, setNote] = useState('');
    const [assetList, setAssetList] = useState([
    ]);

    const onGetAssetSuccess = (asset) => {
        if(!assetList.some(a => a.id == asset.id))
            setAssetList([asset, ...assetList]);
        else 
            longToast(`${asset.assetTag} already in list`);
    }

    return (
        <View style={{height: '100%', width: '100%', backgroundColor: 'white'}}>
            <View style={styles.searchAsset}>
                <TextInput
                    style={{height: 80, fontSize: 25, width: '60%', marginRight: 5}}
                    textAlign='center'
                    placeholder="Enter asset tag"
                    onChangeText={newText => setAssetTag(newText)}
                    defaultValue={assetTag}
                />
                <Pressable onPress={() => {setAssetTag(''); fetchAsset(assetTag, onGetAssetSuccess, (assetTag) => longToast(`${assetTag} - not found`));}} style={({pressed}) =>
                    [{
                        width: '30%', alignItems: 'center', borderRadius: 10, backgroundColor: pressed? '#b1e2ec' :'#30abc3'
                    }]}
                    >
                    <Text style={{height: 40, fontSize: 25}}>Check In</Text>
                </Pressable>
            </View>
            <AssetStatus onStatusChange={(status) => setAssetStatus(status)}/>
            <Note onNoteChange={(note) => setNote(note)} />
            <FlatList
                style={{height: '100%', width: '100%'}}
                data={assetList}
                keyExtractor={asset => asset.id}
                renderItem={({item, index}) => {
                    return <AssetListItem
                        index={index} 
                        asset={item} currStatus={assetStatus == null ? item.status.id : assetStatus} 
                        currNote={note} 
                    />}
                } 
            />
            
        </View>
    );
}

const styles = StyleSheet.create({
    searchAsset: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });