import React, { Component } from 'react'
import { Text, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps';

export default class MapPreview extends Component {
    render() {

        let cameraConfig = {
            center:{
                latitude:this.props.route.params.latitude,
                longitude:this.props.route.params.longitude
            },
            pitch:0,
            heading:0,
            altitude:0,
            zoom:15
        }
        console.log(this.props.route.params)
        return (
            <View style={{flex:1}}>
                <MapView style={{flex:1}}
                    camera={
                        cameraConfig
                    }
                >

                   <Marker coordinate={{
                       latitude:this.props.route.params.latitude,
                       longitude:this.props.route.params.longitude
                   }}/> 
                </MapView>


            </View>
        )
    }
}
