import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { COLOR } from '../util/config';

const ActivityLoader = () => {
    return (<View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: COLOR.defaultBackGroundColor }}>
        <ActivityIndicator size={'large'} />
    </View>);
}

export default ActivityLoader