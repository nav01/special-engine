import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from "react-native";
import AssetListItem from './AssetListItem';
import AssetSearchTemp from './AssetSearch';
import AssetStatus from './AssetStatus';
import Note from './Note';
import { longToast } from './Utils';

export default function QuickCheckIn() {
    const [assetStatus, setAssetStatus] = useState(null);
    const [note, setNote] = useState('');
    const [assetList, setAssetList] = useState([]);

    const onGetAssetSuccess = (asset) => {
        if(!assetList.some(a => a.id == asset.id))
            setAssetList([asset, ...assetList]);
        else 
            longToast(`${asset.assetTag} already in list`);
    }

    return (
        <View style={{height: '100%', width: '100%', backgroundColor: 'white'}}>
            <AssetSearchTemp action='Check In' onAssetGet={onGetAssetSuccess}/>
            <AssetStatus onStatusChange={(status) => setAssetStatus(status)}/>
            <Note onNoteChange={(note) => setNote(note)}/>
            <FlatList
                style={{height: '100%', width: '100%'}}
                data={assetList}
                keyExtractor={asset => asset.id}
                renderItem={({item, index}) => {
                    return <AssetListItem
                        index={index} 
                        asset={item} currStatus={assetStatus == null ? item.status.id : assetStatus} 
                        currNote={note} 
                    />
                }} 
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