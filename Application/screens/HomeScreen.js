import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

// นำเข้ารูปโปรไฟล์เริ่มต้นจากเครื่อง
import defaultProfileIcon from '../assets/images/profile-2.png';

// นำเข้ารูปสัตว์ไอคอนต่าง ๆ
import dogIcon from '../assets/images/dog.png';
import catIcon from '../assets/images/cat.png';
import rabbitIcon from '../assets/images/rabbit.png';
import hamsterIcon from '../assets/images/hamster.png';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({ firstname: '', lastname: '', profileIcon: '' });

  useEffect(() => {
    const checkSession = async () => {
      const sessionData = await AsyncStorage.getItem('session');
      if (sessionData) {
        fetchUserData(sessionData);
      } else {
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
        Alert.alert('Error', `เกิดข้อผิดพลาดในการดึงข้อมูล: ${error.message}`);
      }
    };

    checkSession();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.greetingText, { fontFamily: 'IBMPlexSansThai-Medium' }]}>สวัสดี</Text>
            <Text style={[styles.nameText, { fontFamily: 'IBMPlexSansThai-Medium' }]}>{userData.firstname} {userData.lastname}</Text>
          </View>
          <TouchableOpacity>
            <Image
              source={userData.profileIcon ? { uri: userData.profileIcon } : defaultProfileIcon}
              style={styles.profileIcon}
            />
          </TouchableOpacity>
        </View>

        {/* ช่องค้นหา */}
        <View style={styles.searchContainer}>
          <TextInput placeholder="ค้นหาพี่เลี้ยง" style={[styles.searchInput, { fontFamily: 'IBMPlexSansThai-Light' }]} />
        </View>

        {/* ไอคอนหมวดหมู่สัตว์ */}
        <View style={styles.categoryContainer}>
          <TouchableOpacity style={styles.categoryItem}>
            <View style={styles.iconBackground}>
              <Image source={dogIcon} style={styles.categoryIcon} />
            </View>
            <Text>สุนัข</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryItem}>
            <View style={styles.iconBackground}>
              <Image source={catIcon} style={styles.categoryIcon} />
            </View>
            <Text>แมว</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryItem}>
            <View style={styles.iconBackground}>
              <Image source={rabbitIcon} style={styles.categoryIcon} />
            </View>
            <Text>กระต่าย</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryItem}>
            <View style={styles.iconBackground}>
              <Image source={hamsterIcon} style={styles.categoryIcon} />
            </View>
            <Text>แฮมสเตอร์</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text>บริการใกล้ฉัน</Text>
        </View>
        {/* การ์ดแนะนำ */}
        <View style={styles.cardContainer}>
          <Text style={[styles.cardTitle, { fontFamily: 'IBMPlexSansThai-Medium' }]}>สนใจเป็นพี่เลี้ยง</Text>
          <TouchableOpacity style={styles.learnMoreButton}>
            <Text style={[styles.learnMoreButtonText, { fontFamily: 'IBMPlexSansThai-Medium' }]}>เรียนรู้เพิ่มเติม</Text>
          </TouchableOpacity>
          <Image source={require('../assets/images/dog-walk.png')} style={styles.cardImage} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 60, // เพิ่มพื้นที่ให้กับแถบเมนูด้านล่าง
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  greetingText: {
    fontSize: 20,
    color: '#00C283',
  },
  usernameText: {
    fontSize: 24,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchContainer: {
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 15,
  },
  searchInput: {
    fontSize: 16,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  categoryItem: {
    alignItems: 'center',
  },
  iconBackground: {
    backgroundColor: '#E0E0E0',
    padding: 15,
    borderRadius: 50,
    marginBottom: 5,
  },
  categoryIcon: {
    width: 40,
    height: 40,
  },
  cardContainer: {
    backgroundColor: '#00C283',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  cardTitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  learnMoreButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  learnMoreText: {
    color: '#fff',
    fontSize: 14,
  },
  cardImage: {
    width: '100%',
    height: 250,
    borderRadius: 10,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#00C283',
    padding: 15,
    alignItems: 'center',
  },
  navText: {
    color: '#fff',
    fontSize: 16,
  },
});
