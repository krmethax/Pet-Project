import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Feather';  // Import Animatable

export default function SignUpScreen({ navigation }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isAgreed, setIsAgreed] = useState(false);
    const [date, setDate] = useState(new Date());
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [username, setUsername] = useState('');
    const handleNext = () => {
        if (firstName && lastName && dob && phoneNumber) {
            setStep(2);
        } else {
            Alert.alert('กรุณากรอกข้อมูลให้ครบถ้วน');
        }
    };

    const handleSignUp = async () => {
        // ตรวจสอบรหัสผ่าน
        if (password !== confirmPassword) {
            Alert.alert('รหัสผ่านไม่ตรงกัน');
            return;
        }
    
        // ตรวจสอบการยอมรับข้อตกลง
        if (!isAgreed) {
            Alert.alert('กรุณายอมรับข้อตกลง');
            return;
        }
    
        // ตรวจสอบข้อมูลให้ครบถ้วน
        if (!firstName || !lastName || !dob || !phoneNumber || !email || !password) {
            Alert.alert('กรุณากรอกข้อมูลให้ครบถ้วน');
            return;
        }
    
        try {
            // ส่งข้อมูลไปยังเซิร์ฟเวอร์
            const response = await fetch('http://10.253.62.75:3000/api/users/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstname: firstName,
                    lastname: lastName,
                    date_of_birth: date.toISOString().split('T')[0], // ส่งวันที่ในรูปแบบ 'YYYY-MM-DD'
                    tel: phoneNumber,
                    email,
                    password,
                    username, // ส่ง username หากมีการใช้
                }),
            });
    
            // ตรวจสอบผลการตอบกลับจากเซิร์ฟเวอร์
            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.error === 'อีเมลนี้ถูกใช้งานไปแล้ว') {
                    Alert.alert('เกิดข้อผิดพลาด', 'อีเมลนี้ถูกใช้งานไปแล้ว');
                } else {
                    Alert.alert('เกิดข้อผิดพลาดในการสมัครสมาชิก');
                }
                return;
            }
    
            // ถ้าสมัครสมาชิกสำเร็จ
            const data = await response.json();
            Alert.alert('สมัครสมาชิกสำเร็จ');
            navigation.navigate('MemberLogin');
        } catch (error) {
            console.error(error);
            Alert.alert('เกิดข้อผิดพลาดในการสมัครสมาชิก');
        }
    };
    
    const onChangeDate = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            const formattedDate = selectedDate.toLocaleDateString('th-TH');
            setDob(formattedDate);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.formContainer}>
                    <Text style={[styles.title, { fontFamily: 'IBMPlexSansThai-Bold' }]}>สร้างบัญชีผู้ใช้</Text>

                    {step === 1 && (
                        <>
                            <Text style={[styles.header, { fontFamily: 'IBMPlexSansThai-Medium' }]}>ชื่อ</Text>
                            <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} />

                            <Text style={[styles.header, { fontFamily: 'IBMPlexSansThai-Medium' }]}>นามสกุล</Text>
                            <TextInput style={styles.input} value={lastName} onChangeText={setLastName} />

                            <Text style={[styles.header, { fontFamily: 'IBMPlexSansThai-Medium' }]}>วัน / เดือน / ปี เกิด</Text>
                            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                                <TextInput style={styles.input} value={dob} placeholder="DD/MM/YYYY" editable={false} />
                            </TouchableOpacity>

                            {showDatePicker && (
                                <DateTimePicker value={date} mode="date" display="calendar" onChange={onChangeDate} maximumDate={new Date()} />
                            )}

                            <Text style={[styles.header, { fontFamily: 'IBMPlexSansThai-Medium' }]}>เบอร์โทรศัพท์</Text>
                            <TextInput style={styles.input} value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" />

                            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                                <Text style={[styles.buttonText, { fontFamily: 'IBMPlexSansThai-Medium' }]}>ถัดไป</Text>
                            </TouchableOpacity>
                        </>
                    )}

                    {step === 2 && (
                        <>  
                            <Text style={[styles.header, { fontFamily: 'IBMPlexSansThai-Medium' }]}>ชื่อผู้ใช้งาน</Text>
                            <TextInput style={styles.input} value={username} onChangeText={setUsername} />

                            <Text style={[styles.header, { fontFamily: 'IBMPlexSansThai-Medium' }]}>อีเมล</Text>
                            <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />

                            <Text style={[styles.header, { fontFamily: 'IBMPlexSansThai-Medium' }]}>รหัสผ่าน</Text>
                            <View style={styles.passwordContainer}>
                                <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry={!showPassword} />
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.icon}>
                                    <Icon name={showPassword ? 'eye' : 'eye-off'} size={20} color="#888" />
                                </TouchableOpacity>
                            </View>

                            <Text style={[styles.header, { fontFamily: 'IBMPlexSansThai-Medium' }]}>ยืนยันรหัสผ่าน</Text>
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    style={styles.input}
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    secureTextEntry={!showConfirmPassword}
                                />
                                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.icon}>
                                    <Icon name={showConfirmPassword ? 'eye' : 'eye-off'} size={20} color="#888" />
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity onPress={() => setIsAgreed(!isAgreed)} style={styles.agreementContainer}>
                                <Icon name={isAgreed ? 'check-square' : 'square'} size={20} color="#00C283" />
                                <Text style={[styles.agreementText, { fontFamily: 'IBMPlexSansThai-Medium' }]}>ยินยอมรับข้อตกลงทั้งหมด</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
                                <Text style={[styles.buttonText, { fontFamily: 'IBMPlexSansThai-Medium' }]}>สมัครสมาชิก</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    formContainer: {
        marginTop: 40,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    header: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 15,
        paddingRight: 45,
        marginBottom: 15,
        flex: 1,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    icon: {
        position: 'absolute',
        right: 15,
    },
    nextButton: {
        backgroundColor: '#00C283',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    signUpButton: {
        backgroundColor: '#00C283',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    agreementContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    agreementText: {
        fontSize: 16,
        marginLeft: 10,
    },
});
