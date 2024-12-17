import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Setting() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('session');
      Alert.alert('คุณได้ออกจากระบบแล้ว', [
        { text: 'OK', onPress: () => navigation.replace('SelectLogin') },
      ]);
    } catch (error) {
      console.error('Error logging out:', error);
      Alert.alert('Error', 'เกิดข้อผิดพลาดในการออกจากระบบ');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <Image
          source={require('../assets/images/user.png')}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Methasit</Text>
          <Text style={styles.profileEmail}>methasit.ka.65@ubu.ac.th</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuText}>บัญชี</Text>
        <Icon name="chevron-forward" size={20} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuText}>การแจ้งเตือน</Text>
        <Icon name="chevron-forward" size={20} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
        <Text style={styles.menuText}>ออกจากระบบ</Text>
        <Icon name="chevron-forward" size={20} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  profileInfo: {
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  menuText: {
    fontSize: 16,
  },
});
