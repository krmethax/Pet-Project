import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import defaultProfileIcon from '../assets/images/profile-2.png';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({ firstname: '', lastname: '', profileIcon: '', email: '' });
  const [loading, setLoading] = useState(false);  // State สำหรับการโหลด

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
        const response = await fetch('http://10.253.62.75:5000/api/users/getuser', {
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
          email: data.email,
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
    Alert.alert(
      'ยืนยันการออกจากระบบ',
      'คุณต้องการออกจากระบบใช่หรือไม่?',
      [
        {
          text: 'ยกเลิก',
          onPress: () => console.log('Logout cancelled'),
          style: 'cancel',
        },
        {
          text: 'ออกจากระบบ',
          onPress: async () => {
            setLoading(true);  // เริ่มแสดง loader

            try {
              await AsyncStorage.removeItem('session');  // ลบเซสชันที่เก็บใน AsyncStorage
              navigation.navigate('MemberLogin');  // นำผู้ใช้กลับไปหน้าล็อกอิน
            } catch (error) {
              console.error('Logout Error:', error.message);
              Alert.alert('Error', 'เกิดข้อผิดพลาดในการออกจากระบบ');
            } finally {
              setLoading(false);  // หยุดแสดง loader
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.welcomeText, { fontFamily: 'IBMPlexSansThai-Medium' }]}>
          การตั้งค่า
        </Text>
      </View>

      {/* การ์ดแสดงข้อมูลผู้ใช้ */}
      <View style={styles.card}>
        <Image
          source={userData.profileIcon ? { uri: userData.profileIcon } : defaultProfileIcon}
          style={styles.profileIcon}
        />
        <View style={styles.userInfo}>
          <Text style={styles.cardTitle}>ชื่อ: {userData.firstname} {userData.lastname}</Text>
          <Text style={[styles.cardText, { fontFamily: 'IBMPlexSansThai-Medium' }]}>อีเมล: {userData.email}</Text>
        </View>
      </View>

      {/* เนื้อหาหลัก */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
       
      </ScrollView>

      {/* ปุ่ม Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        {loading ? (  // แสดง Loader ถ้ากำลังออกจากระบบ
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.logoutText}>Logout</Text>
        )}
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
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
  },
  profileIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 20,
  },
  userInfo: {
    flexDirection: 'column', // จัดเรียงข้อมูลเป็นแนวตั้ง
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: 'IBMPlexSansThai-Medium',
    color: '#333',
    marginBottom: 5,
  },
  cardText: {
    fontSize: 16,
    fontFamily: 'IBMPlexSansThai',
    color: '#333',
    marginBottom: 5,
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
