import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  Image
} from 'react-native';

import axios from "axios"

import Geolocation from '@react-native-community/geolocation';

import React, { useState, useCallback, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { useForm, Controller } from 'react-hook-form';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [username, setUsername] = useState('');

  const [monthAndYear, setMonthAndYear] = useState('');
  const getUsername = useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem('username');
      if (value !== null) {
        setUsername(value);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getUsername();
  }, [getUsername]);

  //Location api ---------------------------------------------------------------------------------------

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      (error) => {
        if (error.code === 2) {
          //Show alert or something here that GPS need to turned on.
          Alert.alert("Turn On Location!")
        }
      },
    );
  }, []);

  const getAddressFromCoordinates = (latitude, longitude) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        const address = `${data.address.road}, ${data.address.city}, ${data.address.state}, ${data.address.postcode}, ${data.address.country}`;
        setAddress(address)
        return address;
      })
      .catch(error => {
        console.error(error);
      });
  };
  if (latitude && longitude) {

    getAddressFromCoordinates(latitude, longitude);

  }


  // setModal--------------------------------------------------------------------------------------------------------------
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const toggleModalClose = () => {
    setIsModalVisible(false);
  };

  // Current Date

  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    setCurrentDate(`${year}-${month}-${day}`);
    setMonthAndYear(`${month}-${year}`);
  }, []);
  // current time
  const [currentTime, setCurrentTime] = useState('');

  // Actions

  // Retrieve gender data from AsyncStorage
  const retrieveGenderData = async () => {
    try {
      const genderData = await AsyncStorage.getItem('gender');
      if (genderData) {
        const parsedGenderData = JSON.parse(genderData);
        setGender(parsedGenderData);
        console.log('Gender data retrieved from AsyncStorage', parsedGenderData);
      }
    } catch (error) {
      console.error('Error retrieving gender data from AsyncStorage:', error);
    }
  };

  // Call the retrieveGenderData function when the component mounts
  useEffect(() => {
    retrieveGenderData();
  }, []);

  const [genderOpen, setGenderOpen] = useState(false);
  const [genderValue, setGenderValue] = useState(null);
  const [gender, setGender] = useState([
    { label: 'Punch In', value: 'Punch In' },
    { label: 'Lunch Out', value: 'Lunch Out' },
    { label: 'Personal Out', value: 'Personal Out' },
  ])

  const { handleSubmit, control } = useForm();

  useEffect(() => {
    const now = new Date();

    const formatTime = now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    });

    setCurrentTime(formatTime);
  });

  // main output function------------------------------------------------------------------------------------------------------------------
  const onSubmit = async () => {
    if (genderValue) {

      if (genderValue) {
        Alert.alert(genderValue + ' SuccessFully!');
        setIsModalVisible(false)
        console.log(genderValue)
        const data = {
          name: username,
          status: genderValue,
          time: currentTime,
          currentDate,
          address,
          longitude,
          latitude,
          monthAndYear,
        }
        axios.post('https://cms-sparrow.herokuapp.com/attendance/add_engineer_attendance', data)
          .catch(error => {
            console.error(error);
          });

      } else {
        Alert.alert("Failed to get Location!")
      }
    } else {
      Alert.alert("Please select Action (punch in)")
    }

    switch (genderValue) {
      case 'Punch In':
        setGender(prevGender => {
          const updatedGender = prevGender.map(item => {
            if (item.value === 'Punch In') {
              return { ...item, label: 'Punch Out', value: 'Punch Out' };
            } else {
              return item;
            }
          });
        
          if (updatedGender !== prevGender) {
            try {
              AsyncStorage.setItem('gender', JSON.stringify(updatedGender))
                .then(() => {
                  console.log('Gender data saved to AsyncStorage:', updatedGender);
                })
                .catch(error => {
                  console.error('Error saving gender data to AsyncStorage:', error);
                });
            } catch (error) {
              console.error('Error saving gender data to AsyncStorage:', error);
            }
          }
        
          return updatedGender;
        });
        
        break;
      case 'Punch Out':
        setGender(prevGender => {
          const updatedGender = prevGender.map(item => {
            if (item.value === 'Punch Out') {
              return { ...item, label: 'Punch In', value: 'Punch In' };
            } else {
            }
            return item;
          });
          return updatedGender;
        });
        try {
          await AsyncStorage.setItem('gender', JSON.stringify(gender));
          console.log('Gender data saved to AsyncStorage', gender);
        } catch (error) {
          console.error('Error saving gender data to AsyncStorage:', error);
        }
        break;
      case 'Lunch In':
        setGender(prevGender => {
          const updatedGender = prevGender.map(item => {
            if (item.value === 'Lunch In') {
              return { ...item, label: 'Lunch Out', value: 'Lunch Out' };
            } else {
            }
            return item;
          });
          return updatedGender;
        });
        try {
          await AsyncStorage.setItem('gender', JSON.stringify(gender));
          console.log('Gender data saved to AsyncStorage', gender);
        } catch (error) {
          console.error('Error saving gender data to AsyncStorage:', error);
        }
        break;
      case 'Lunch Out':
        setGender(prevGender => {
          const updatedGender = prevGender.map(item => {
            if (item.value == 'Lunch Out') {
              return { ...item, label: 'Lunch In', value: 'Lunch In' };
            } else {
            }
            return item;
          });
          return updatedGender;
        });
        try {
          await AsyncStorage.setItem('gender', JSON.stringify(gender));
          console.log('Gender data saved to AsyncStorage', gender);
        } catch (error) {
          console.error('Error saving gender data to AsyncStorage:', error);
        }
        break;
      case 'Personal In':
        setGender(prevGender => {
          const updatedGender = prevGender.map(item => {
            if (item.value === 'Personal In') {
              return { ...item, label: 'Personal Out', value: 'Personal Out' };
            } else {
            }
            return item;
          });
          return updatedGender;
        });
        try {
          await AsyncStorage.setItem('gender', JSON.stringify(gender));
          console.log('Gender data saved to AsyncStorage', gender);
        } catch (error) {
          console.error('Error saving gender data to AsyncStorage:', error);
        }
        break;
      case 'Personal Out':
        setGender(prevGender => {
          const updatedGender = prevGender.map(item => {
            if (item.value === 'Personal Out') {
              return { ...item, label: 'Personal In', value: 'Personal In' };
            } else {
            }
            return item;
          });
          return updatedGender;
        });
        try {
          await AsyncStorage.setItem('gender', JSON.stringify(gender));
          console.log('Gender data saved to AsyncStorage', gender);
        } catch (error) {
          console.error('Error saving gender data to AsyncStorage:', error);
        }
        break;
    }

    try {
      await AsyncStorage.setItem('gender', JSON.stringify(gender));
      console.log('Gender data saved to AsyncStorage', gender);
    } catch (error) {
      console.error('Error saving gender data to AsyncStorage:', error);
    }
    setGenderValue(null)
  };


  // -----------------------------------------------------------------------------------------------------------------------------------------------------

  // -----------------------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleModal}>
        {genderValue ?
          (
            <View style={[styles.actionBtnText, { marginRight: 50, marginLeft: 3, }]}>

              <Text style={{ fontWeight: 'bold', color: "black", paddingHorizontal: 0, }}>   {genderValue}   </Text>
            </View>
          ) :
          (
            <View style={styles.actionBtn}>
              <Image
                source={require('../icons/punchinIcon.png')}
                style={{ height: 25, width: 25 }}
              />
            </View>

          )}
        <Modal
          visible={isModalVisible}
          animationType="fade"
          onRequestClose={toggleModal}>
          <View style={styles.modal}>
            <View style={{ marginBottom: -100 }}>
              <Image
                style={{ width: 350, height: 350 }}
                source={require('../assets/punchInGif.gif')}
              />
            </View>
            <View style={styles.container}>
              <Controller
                name="gender"
                defaultValue=""
                control={control}
                render={({ field: { onChange } }) => (
                  <View style={styles.dropdownGender}>
                    <DropDownPicker
                      style={styles.dropdown}
                      open={genderOpen}
                      value={genderValue}
                      items={gender}
                      setOpen={setGenderOpen}
                      setValue={setGenderValue}
                      placeholder="Select Gender"
                      placeholderStyle={styles.placeholderStyles}
                      onChangeValue={onChange}
                      dropDownContainerStyle={{ maxHeight: 300 }}
                    />
                  </View>
                )}
              />

              <TouchableOpacity
                style={{
                  backgroundColor: '#0E24A5',
                  padding: 10,
                  borderRadius: 5,
                  margin: 15,
                  width: 150,
                  alignItems: "center",
                  zIndex: -10
                }}
                onPress={onSubmit}>
                {genderValue ?
                  (
                    <Text style={{ fontWeight: "bold", color: "white" }}>{genderValue} now!</Text>
                  ) :
                  (
                    <Text style={{ fontWeight: "bold", color: "white" }}>Submit</Text>

                  )}
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  actionBtn: {
    width: 60,
    height: 60,
    backgroundColor: '#8fc5e3',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 50,
  },
  dropdownGender: {
    marginHorizontal: 10,
    width: "100%",
    marginBottom: 15,
  },
  placeholderStyles: {
    color: 'grey',
  },
  getStarted: {
    backgroundColor: '#5188E3',
    color: 'white',
    textAlign: 'center',
    paddingVertical: 15,
    width: '100%',
  },
  actionBtnText: {
    backgroundColor: '#8fc5e3',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 100,
  },
});
