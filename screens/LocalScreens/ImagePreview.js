import React from 'react'
import { View, Text,Image } from 'react-native'

export default function ImagePreview(props) {

 
    return (
        <View style={{flex:1,position:"relative",height:"100%"}}>
            <Image style={{flex:1,height:"100%",width:"100%"}} source={{uri:props.route.params.uri}} />
        </View>
    )
}
