import React, {useState, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import NumberInput from '@/components/NumberInput';
import KeyWord from '@/components/KeyWord';
import {useNavigation} from '@react-navigation/native';
import {StackActions} from '@react-navigation/native';
import {ROUTE} from '@/utils/constant';

function Home() {
  const numberList = useRef(['', '', '', '', '', '']);
  const [inputValues, setInputValues] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const password = 111111;

  const keywordClick = content => {
    for (let i = 0; i < numberList.current.length; i++) {
      if (numberList.current[i] === '') {
        numberList.current[i] = content;
        setInputValues([...numberList.current]);
        i === numberList.current.length - 1 ? onFinish() : null;
        return;
      }
    }
  };

  const onFinish = () => {
    setLoading(true);
    setTimeout(async () => {
      if (Number(numberList.current.join('')) === password) {
        try {
          await AsyncStorage.setItem(
            'pin',
            JSON.stringify(numberList.current.join('')),
          );
          showToast('Success');
          navigation.dispatch(StackActions.replace(ROUTE.NFCBLINK));
        } catch (e) {
          console.log('err', err);
        }
      } else {
        showToast('Password Error');
      }

      setLoading(false);
      numberList.current = ['', '', '', '', '', ''];
      setInputValues([...numberList.current]);
    }, 500);
  };

  const showToast = text => {
    ToastAndroid.show(text, ToastAndroid.TOP);
  };

  return (
    <View style={styles.pageContianer}>
      <Image style={styles.imgLogo} source={require('../images/logo.png')} />
      <Text style={styles.title}>Merchant code:</Text>
      <NumberInput inputValues={inputValues} />
      {loading && (
        <View style={styles.toastPlayer}>
          <ActivityIndicator animating={loading} size={'large'} />
        </View>
      )}
      <KeyWord click={keywordClick} />
    </View>
  );
}

const styles = StyleSheet.create({
  pageContianer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    height: '100%',
    overflow: 'hidden',
  },
  imgLogo: {
    width: 200,
    height: 180,
  },
  title: {
    fontSize: 36,
    fontWeight: '600',
    color: 'black',
    marginTop: 10,
  },
  toastPlayer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'black',
    opacity: 0.8,
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
