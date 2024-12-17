import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function RoleSelectionScreen() {
  const navigation = useNavigation(); // เรียกใช้ navigation hook

  return (
    <View style={styles.container}>
      {/* ไอคอนสัญลักษณ์ */}
      <Image
        source={require('../assets/images/logo.png')} // ตรวจสอบให้แน่ใจว่าไฟล์ไอคอนอยู่ในโฟลเดอร์ assets
        style={styles.icon}
      />

      {/* ข้อความ */}
      <Text style={[styles.title, { fontFamily: 'IBMPlexSansThai-Bold' }]}>คุณคือใคร</Text>

      {/* ปุ่มสำหรับสมาชิก */}
      <TouchableOpacity
        style={styles.memberButton}
        onPress={() => navigation.navigate('MemberLogin')} // เพิ่มการนำทางไปหน้า MemberLoginScreen
      >
        <Text style={[styles.buttonText, { fontFamily: 'IBMPlexSansThai-Medium' }]}>สมาชิก</Text>
      </TouchableOpacity>

      {/* ปุ่มสำหรับพี่เลี้ยง */}
      <TouchableOpacity style={styles.caretakerButton}>
        <Text style={[styles.buttonText, { fontFamily: 'IBMPlexSansThai-Medium' }]}>พี่เลี้ยง</Text>
      </TouchableOpacity>
    </View>
  );
}

// สไตล์ของหน้าจอ
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  icon: {
    width: 300,
    height: 200,
    marginBottom: 60,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#000',
  },
  memberButton: {
    backgroundColor: '#00C283',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  caretakerButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
