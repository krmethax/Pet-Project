import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // นำเข้าไอคอนจาก Ionicons

export default function MemberLoginScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    if (email && password) {
      try {
        const response = await fetch('http://192.168.242.111/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const data = await response.json();
          await AsyncStorage.setItem('token', data.token); // เก็บ Token
          await AsyncStorage.setItem('userEmail', email);  // เก็บ Email
          alert('เข้าสู่ระบบสำเร็จ');
          navigation.replace('Home'); // ไปยังหน้า Home หลังจากล็อกอินสำเร็จ
        } else {
          alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
        }
      } catch (error) {
        console.error(error);
        alert('เกิดข้อผิดพลาด กรุณาลองอีกครั้ง');
      }
    } else {
      alert('กรุณากรอกอีเมลและรหัสผ่าน');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* โลโก้ */}
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.icon}
      />

      {/* ข้อความล็อกอิน */}
      <Text style={[styles.loginText, { fontFamily: 'IBMPlexSansThai-Bold' }]}>ล็อกอินเข้าสู่ระบบ</Text>

      {/* ช่องกรอกอีเมล */}
      <TextInput
        style={styles.input}
        placeholder="อีเมล"
        textContentType="emailAddress"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      {/* ช่องกรอกรหัสผ่าน */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="รหัสผ่าน"
          textContentType="password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}

        />
        <TouchableOpacity onPress={toggleShowPassword} style={styles.toggleButton}>
          <Icon
            name={showPassword ? 'eye-off' : 'eye'}
            size={24}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      {/* ลิงก์ลืมรหัสผ่าน */}
      <TouchableOpacity>
        <Text style={[styles.forgotPasswordText, { fontFamily: 'IBMPlexSansThai-Light' }]}>ลืมรหัสผ่าน</Text>
      </TouchableOpacity>

      {/* ปุ่มเข้าสู่ระบบ */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={[styles.loginButtonText, { fontFamily: 'IBMPlexSansThai-Medium' }]}>เข้าสู่ระบบ</Text>
      </TouchableOpacity>

      {/* ข้อความสมัครสมาชิก */}
      <View style={styles.signupContainer}>
        <Text style={[styles.signupText, { fontFamily: 'IBMPlexSansThai-Light' }]}>ยังไม่มีบัญชี ? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={[styles.signupButtonText, { fontFamily: 'IBMPlexSansThai-Medium' }]}>สมัคร</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// สไตล์
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  icon: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
    alignSelf: 'center',
  },
  input: {
    width: '100%',
    height: 60,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingLeft: 15,
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    height: 60,
    paddingLeft: 15,
  },
  toggleButton: {
    paddingHorizontal: 15,
  },
  loginButton: {
    backgroundColor: '#00C283',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupText: {
    textAlign: 'center',
  },
  signupButtonText: {
    color: '#00C283',
    marginLeft: 5,
    textDecorationLine: 'underline',
  },
  loginText: {
    fontSize: 19,
    marginBottom: 10,
    color: '#000',
  },
  forgotPasswordText: {
    color: '#888',
    marginBottom: 10,
    textAlign: 'right',
    textDecorationLine: 'underline',
  },
});
