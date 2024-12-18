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

import defaultProfileIcon from '../assets/images/profile-2.png';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({ firstname: '', lastname: '', profileIcon: '' });

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
          profileIcon: data.profile_picture,
        });
      } catch (error) {
        console.error('Error fetching user data:', error.message);
        Alert.alert('Error', `เกิดข้อผิดพลาดในการดึงข้อมูล: ${error.message}`);
      }
    };

    checkSession();
  }, []);

  // ฟังก์ชันสำหรับการ Logout
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('session');  // ลบเซสชันที่เก็บใน AsyncStorage
      navigation.navigate('MemberLogin');  // นำผู้ใช้กลับไปหน้าล็อกอิน
      Alert.alert('Success', 'คุณได้ออกจากระบบแล้ว');
    } catch (error) {
      console.error('Logout Error:', error.message);
      Alert.alert('Error', 'เกิดข้อผิดพลาดในการออกจากระบบ');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.welcomeText, { fontFamily: 'IBMPlexSansThai-Bold' }]}>
          ชำระเงิน
        </Text>
      </View>

      {/* เนื้อหาหลัก */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.contentText}>This is the Home screen.</Text>
      </ScrollView>

      {/* ปุ่ม Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 18,
    color: '#00C283',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  contentText: {
    fontSize: 16,
    padding: 10,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#FF4F5A',
    padding: 15,
    margin: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'IBMPlexSansThai-Medium',
  },
});
