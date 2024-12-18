import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({ firstname: '', lastname: '' });

  useEffect(() => {
    const checkSession = async () => {
      const sessionData = await AsyncStorage.getItem('session');
      if (sessionData) {
        console.log('Session Data:', sessionData);
        fetchUserData(sessionData);
      } else {
        console.log('No session found');
        Alert.alert('Error', 'ไม่พบเซสชัน');
        navigation.navigate('MemberLogin');
      }
    };

    const fetchUserData = async (sessionData) => {
      try {
        const response = await fetch('http://10.253.62.75:3000/api/users/getuser', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionData}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUserData({
          firstname: data.firstname,
          lastname: data.lastname,
        });
      } catch (error) {
        console.error('Error fetching user data:', error.message);
        Alert.alert('Error', `เกิดข้อผิดพลาดในการดึงข้อมูล: ${error.message}`);
      }
    };

    checkSession();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.welcomeText, { fontFamily: 'IBMPlexSansThai-Bold' }]}>
          {userData.firstname && userData.lastname
            ? `สวัสดี, ${userData.firstname} ${userData.lastname}`
            : 'กำลังโหลดข้อมูล...'}
        </Text>
        <TouchableOpacity>
          <Image source={require('../assets/images/user.png')} style={styles.profileIcon} />
        </TouchableOpacity>
      </View>

      {/* เนื้อหาหลัก */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* ใส่เนื้อหาตามต้องการ */}
        <Text>
          This is the Payment screen.
        </Text>
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#00C283',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 18,
    color: '#fff',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  scrollContainer: {
    flexGrow: 1,
  },
});
