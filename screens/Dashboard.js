import React, { Component } from 'react'


import { NavigationContainer} from "@react-navigation/native"

import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import UpdateScreen from "./Update"

import LocalScreen from "./Local"
import ViewScreen from "./View"

import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator()

export default class Dashboard extends Component {
    render() {
        return (
         


          
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                          let iconName;
              
                          if (route.name === 'Update') {
                            iconName = focused
                              ? 'ios-folder'
                              : 'ios-folder-outline';
                          } else if (route.name === 'View') {
                            iconName = focused ? 'ios-list' : 'ios-list-outline';
                          }
                          else if (route.name === 'Local') {
                            iconName = focused ? 'ios-tablet-portrait' : 'ios-tablet-portrait-outline';
                          }
              
                          // You can return any component that you like here!
                          return <Ionicons name={iconName} size={30} color={color} />;
                        },
                      })}
                      tabBarOptions={{
                        activeTintColor: 'tomato',
                        inactiveTintColor: 'gray',
                      }}
                >
                    <Tab.Screen name="Update" component={UpdateScreen}/>
                    <Tab.Screen name="View" component={ViewScreen}/>
                    <Tab.Screen name="Local" component={LocalScreen}/>
                </Tab.Navigator>
            </NavigationContainer>
           

        )
    }
}
