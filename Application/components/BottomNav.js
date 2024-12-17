import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function BottomNav({ navigation }) {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
        <Icon name="home" size={24} color="#00C283" />
        <Text style={styles.navText}>หน้าหลัก</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('')}>
        <Icon name="card" size={24} color="#888" />
        <Text style={styles.navText}>ชำระเงิน</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('')}>
        <Icon name="people" size={24} color="#888" />
        <Text style={styles.navText}>พี่เลี้ยง</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Settings')}>
        <Icon name="settings" size={24} color="#888" />
        <Text style={styles.navText}>การตั้งค่า</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    color: '#888',
    fontSize: 12,
    fontFamily: 'IBMPlexSansThai-Medium',
  },
});
