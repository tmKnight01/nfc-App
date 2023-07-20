import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  PanResponder,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import useTimeNavigate from '@/hooks/useTimeNavigate';
import {ROUTE} from '@/utils/constant';

function CardPage() {
  const panResPonser = useTimeNavigate();
  // const [count, setCount] = useState(0);
  // const IntervalrRef = useRef(null);
  // const navigation = useNavigation();
  // const panResPonser = useRef(
  //   PanResponder.create({
  //     onStartShouldSetPanResponder: () => true,
  //     onPanResponderEnd: e => {
  //       setCount(0);
  //     },
  //   }),
  // ).current;

  // useFocusEffect(
  //   React.useCallback(() => {
  //     IntervalrRef.current = setInterval(() => {
  //       console.log('count', count);
  //       if (count == 30) {
  //         navigation.navigate(ROUTE.PINPAGE);
  //       }
  //       setCount(count => count + 1);
  //     }, 1000);
  //     return () => clearInterval(IntervalrRef.current);
  //   }, [count]),
  // );

  return (
    <View style={styles.container} {...panResPonser.panHandlers}>
      <Image
        style={styles.logoImg}
        source={require('../images/company_logo.png')}
      />
      <TouchableOpacity onPress={() => navigation.navigate(ROUTE.CARDRESULT)}>
        <View style={styles.buttom}>
          <Text style={styles.buttomText}>{'Check'}</Text>
          <Text style={styles.buttomText}>{'Membership'}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate(ROUTE.ERRORPAGE)}>
        <View style={[styles.buttom, {backgroundColor: 'gray'}]}>
          <Text style={styles.buttomText}>{'Check'}</Text>
          <Text style={styles.buttomText}>{'Error Page'}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  buttom: {
    width: 200,
    height: 90,
    borderRadius: 20,
    borderWidth: 2,
    backgroundColor: '#ff3399',
    paddingTop: 10,
  },
  logoImg: {
    width: 200,
    height: 200,
  },
  buttomText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '500',
  },
});

export default CardPage;
