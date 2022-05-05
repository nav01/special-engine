import React, { useState } from 'react';
import { FlatList, View } from 'react-native';

import Note from './Note';
import TargetSearch from './TargetSearch';
import AssetListItem from './AssetListItem';
import AssetSearch from './AssetSearch';
import { longToast } from './Utils';

export default function QuickCheckOut() {
    const [note, setNote] = useState('');
    const [assetList, setAssetList] = useState([]);
    const [targetId, setTargetId] = useState(-1);
    const [targetType, setTargetType] = useState('');

    const onGetAssetSuccess = (asset) => {
        if(!assetList.some(a => a.id == asset.id))
            setAssetList([asset, ...assetList]);
        else 
            longToast(`${asset.assetTag} already in list`);
    }

    return (
        <View style={{height: '100%', width: '100%', backgroundColor: 'white'}}>
            <TargetSearch 
                onTargetGet={(targetId, targetType) => {
                    setTargetId(targetId);
                    setTargetType(targetType);
                }}
            />
            {targetId != -1 && <AssetSearch action='Check Out' onAssetGet={onGetAssetSuccess}/>}
            <Note onNoteChange={(note) => setNote(note)} action='checkout'/>
            <FlatList
                style={{height: '100%', width: '100%'}}
                data={assetList}
                keyExtractor={asset => asset.id}
                renderItem={({item, index}) => {
                    return <AssetListItem
                        index={index} 
                        asset={item}
                        postBody={{
                            checkout_to_type: targetType,
                            assigned_user: targetId,
                            note
                        }}
                        action='checkout'
                    />
                }} 
            />
        </View>
    );
}