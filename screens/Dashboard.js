import React, { Component } from 'react'


import { NavigationContainer} from "@react-navigation/native"

import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import UpdateMainScreen from "./UpdateScreenMain"

import LocalScreen from "./LocalScreenMain"
import ViewScreen from "./View"

import UserScreen from "./UserScreen"

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
                          
                          else if (route.name === 'User') {
                            iconName = focused ? 'ios-person-circle' : 'ios-person-circle-outline';
                          }
                          // You can return any component that you like here!
                          return <Ionicons name={iconName} size={30} color={color} />;
                        },
                      })}
                      tabBarOptions={{
                        activeTintColor: '#1760cf',
                        inactiveTintColor: 'gray',
      
                      }}
                >
                    <Tab.Screen name="Update"  children={()=> <UpdateMainScreen internet={this.props.internet} />}/>
                    <Tab.Screen name="View" component={ViewScreen}/>
                    <Tab.Screen name="Local" component={LocalScreen}/>
                    <Tab.Screen name="User" component={UserScreen}/>
                </Tab.Navigator>
            </NavigationContainer>
           

        )
    }
}
