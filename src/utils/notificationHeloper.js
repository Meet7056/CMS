import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { Alert } from 'react-native';

function GetFCMToken() {
    let fcmToken = AsyncStorage.getItem("fcmtoken")
}

export async function requestUserPermission() {

    GetFCMToken();
    let fcmtoken;
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
        if (!fcmtoken) {
            try {
                fcmtoken = await messaging().getToken();
                if (fcmtoken) {
                    console.log('new fcmToken:', fcmtoken);
                    await AsyncStorage.setItem('fcmtoken', fcmtoken);
                }
            } catch (error) {
                console.log('error in Notification:', error);
            }
        }
    }

    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage.notification,
        );
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
        Alert.alert('Message from Firebase...', JSON.stringify(remoteMessage));
    });

    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage.notification,
                );
            }
        });

    messaging().onMessage(async remoteMessage => {
        console.log("notification on foregrund state......", remoteMessage);
        Alert.alert("Complaint Assigned! ", "to Complaint View Refresh...")
    })
}


