import React, { Component } from 'react'
import { Text, View } from 'react-native'

import { createStackNavigator } from '@react-navigation/stack';
import UpdateScreen from "./Update"

import ComponentsScreen from "./Components"

import CameraScreen from "../components/CameraComponent"

import ImagePreview from './ImagePreview';

export default class UpdateScreenMain extends Component {
    render() {

        let Stack = createStackNavigator()
        return (
            <Stack.Navigator
            screenOptions={{
                headerTintColor: 'white',
                headerStyle: { backgroundColor: '#2283f2' },
              }}
            >
                <Stack.Screen name="Projects List"  children={(props)=> <UpdateScreen {...props} internet={this.props.internet} />}/>
                <Stack.Screen name="Project Components"  children={(props)=> <ComponentsScreen {...props} internet={this.props.internet} />}/>
                <Stack.Screen name="Camera Screen"  children={(props)=> <CameraScreen {...props} internet={this.props.internet} />}/>
                <Stack.Screen name="Image Preview"  children={(props)=> <ImagePreview {...props} internet={this.props.internet} />}/>
            </Stack.Navigator>
        )
    }
}
