import React, { useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, FlatList } from 'react-native';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'ไม่มีเวลาว่าง',
    description: 'ไม่มีเวลาว่างดูแลสัตว์เลี้ยงที่คุณรัก?',
    image: require('../assets/images/intro-1.png'),
  },
  {
    id: '2',
    title: 'ค้นหาพี่เลี้ยง',
    description: 'ค้นหาพี่เลี้ยงสัตว์เลี้ยงที่เหมาะกับคุณ',
    image: require('../assets/images/intro-2.png'),
  },
  {
    id: '3',
    title: 'สะดวกสบาย',
    description: 'ประหยัดเวลาในการหาพี่เลี้ยงสัตว์เลี้ยง',
    image: require('../assets/images/intro-3.png'),
  },
];

const Onboarding = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef(null);

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const startApp = () => {
    navigation.replace('SelectLogin');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={slides}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={item.image} style={styles.image} />
            <Text style={[styles.title, { fontFamily: 'IBMPlexSansThai-Bold' }]}>{item.title}</Text>
            <Text style={[styles.description, { fontFamily: 'IBMPlexSansThai-Light' }]}>{item.description}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        ref={slideRef}
      />
      <View style={styles.dotsContainer}>
        {slides.map((_, index) => (
          <View key={index} style={[styles.dot, currentIndex === index && styles.activeDot]} />
        ))}
      </View>
      {currentIndex === slides.length - 1 && (
        <TouchableOpacity style={styles.button} onPress={startApp}>
          <Text style={[styles.buttonText, { fontFamily: 'IBMPlexSansThai-Medium' }]}>เริ่มต้นใช้งาน</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 400,
    height: 350,
    marginBottom: 40,
  },
  title: {
    fontSize: 35,
    marginBottom: 10,
    fontWeight: '200'
  },
  description: {
    fontSize: 20,
    color: '#555',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#34d399',
  },
  button: {
    backgroundColor: '#34d399',
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 40,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Onboarding;
