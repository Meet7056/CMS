
import React, { memo, useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import axios from 'axios';

const Drawer = createDrawerNavigator();

import HomeScreen from './Home';
import All from '../Complaints/AllComplaints';
import Pending from '../Complaints/TodayStartComplaint';
import Review from '../Complaints/ReviewComplaint';
import Completed from '../Complaints/CompleteComplaints';
import Repeat from '../Complaints/RepeatComplaints';
import Today from '../Complaints/TodayComplaints';
import ProfileScreen from '../components/Profile';
import AttendanceReport from '../components/AttendenceReport';

const Main = ({navigation}) => {

    const CustomDrawerContent = (props) => {
        return (
            <View style={{ flex: 1 }}>
                <DrawerContentScrollView {...props}>
                    <DrawerItemList {...props} />
                </DrawerContentScrollView>
                
                <TouchableOpacity
                    style={{
                        backgroundColor: "#0E24A5",
                        padding: 10,
                        borderRadius: 5,
                        margin: 10,
                        alignItems: "center",
                    }}
                    onPress={() => {Alert.alert(
                        'Logout',
                        'Are you sure you want to log out?',
                        [
                          {
                            text: 'Cancel',
                            style: 'cancel',
                          },
                          {
                            text: 'Logout',
                            onPress: () => {
                              // Perform logout logic here
                              // Example: Navigating to the Login screen
                              navigation.navigate('Details');
                            },
                          },
                        ],
                        { cancelable: false }
                      );
                    }}
                >
                    <Text style={{ fontWeight: "bold", color: "white" }}>Logout</Text>
                </TouchableOpacity>
            </View>
    
        );
    };
    return (
        <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    drawerIcon: ({ focused }) => (
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                            }}>
                            <Image
                                style={{
                                    width: 150,
                                    height: 150,
                                    margin: 45,
                                    marginBottom: 20,
                                    marginTop: 20,
                                }}
                                source={require('../assets/ProfileDP.png')}
                            />
                        </View>
                    )
                }}
            />
            <Drawer.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    drawerIcon: ({ focused }) => (
                        <Image
                            source={require('../icons/homeIcon32x32.png')}
                            style={styles.icon}
                        />

                    )
                }}
            />

            <Drawer.Screen
                name="Attendence Report"
                component={AttendanceReport}
                options={{
                    drawerIcon: ({ focused }) => (
                        <Image
                            source={require('../icons/punchinIcon32x32.png')}
                            style={styles.icon}
                        />
                    )
                }}
            />
            <Drawer.Screen
                name="All Complaints"
                component={All}
                options={{
                    drawerIcon: ({ focused }) => (
                        <Image
                            source={require('../icons/allIcon32x32.png')}
                            style={styles.icon}
                        />
                    )
                }}
            />
            <Drawer.Screen
                name="Pending Complaints"
                component={Pending}
                options={{
                    drawerIcon: ({ focused }) => (
                        <Image
                            source={require('../icons/pendingIcon32x32.png')}
                            style={styles.icon}
                        />
                    )
                }}
            />
            <Drawer.Screen
                name="Review Complaints"
                component={Review}
                options={{
                    drawerIcon: ({ focused }) => (
                        <Image
                            source={require('../icons/reviewIcon32x32.png')}
                            style={styles.icon}
                        />
                    )
                }}
            />
            <Drawer.Screen
                name="Completed Complaints"
                component={Completed}
                options={{
                    drawerIcon: ({ focused }) => (
                        <Image
                            source={require('../icons/completeIcon32x32.png')}
                            style={styles.icon}
                        />
                    )
                }}
            />
            <Drawer.Screen
                name="Repeat Complaints"
                component={Repeat}
                options={{
                    drawerIcon: ({ focused }) => (
                        <Image
                            source={require('../icons/repeatIcon32x32.png')}
                            style={styles.icon}
                        />
                    )
                }}
            />
            <Drawer.Screen
                name="Today Complaints"
                component={Today}
                options={{
                    drawerIcon: ({ focused }) => (
                        <Image
                            source={require('../icons/todayIcon32x32.png')}
                            style={styles.icon}
                        />
                    )
                }}
            />
        </Drawer.Navigator>
    );
};

const styles = StyleSheet.create({
    logoutButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    logoutButton: {
        paddingLeft: 30,
        paddingRight: 30,
    },
    styleHeader: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
    },
    styleHeaderText: {
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: -20,
    },
    styleHeaderImage: {
        width: 40,
        height: 40,
        padding: 5,
        paddingRight: 5,
    },
    styleHeaderImageLogout: {
        width: 30,
        height: 30,
        padding: 5,
        paddingRight: 5,
    },
    icon: {
        width: 25,
        height: 25,
    }
});

export default Main;
