import React, { Component } from 'react'
import { Text, View } from 'react-native'

import {createStackNavigator} from "@react-navigation/stack"

import LocalUploadsScreen from "./Local"

import ImagePreview from "./LocalScreens/ImagePreview"

import MapPreview from "./LocalScreens/MapPreview"

export default class LocalScreenMain extends Component {
    render() {

        let Stack = createStackNavigator()
        return (
           <Stack.Navigator
           screenOptions={{
            headerTintColor: 'white',
            headerStyle: { backgroundColor: '#2283f2' },
          }}
           >
               <Stack.Screen name="Local Uploads" component={LocalUploadsScreen}/>
               <Stack.Screen name="Preview" component={ImagePreview}/>
               <Stack.Screen name="Map" component={MapPreview}/>
           </Stack.Navigator>
        )
    }
}
