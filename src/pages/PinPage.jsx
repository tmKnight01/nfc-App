import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  ToastAndroid,
  ActivityIndicator,
  Text,
} from 'react-native';
import KeyWord from '../components/KeyWord';
import NumberInput from '../components/NumberInput';
import DeviceInfo from 'react-native-device-info';
import {useNavigation, StackActions} from '@react-navigation/native';
import {sha3_512} from 'js-sha3';
import {ROUTE} from '@/utils/constant';

function PinPage() {
  const numberList = useRef(['', '', '', '']);
  const [inputValues, setInputValues] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const password = 5087;

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
    DeviceInfo.getAndroidId().then(androidId => {
      console.log('sha3_512', sha3_512(`${androidId}password`));
    });
    setTimeout(() => {
      if (Number(numberList.current.join('')) === password) {
        showToast('Success');
        navigation.dispatch(
          StackActions.replace(ROUTE.CARDPAGE, {
            user: 'jane',
          }),
        );
      } else {
        showToast('Password Error');
      }

      setLoading(false);
      numberList.current = ['', '', '', ''];
      setInputValues([...numberList.current]);
    }, 500);
  };

  const showToast = text => {
    ToastAndroid.show(text, ToastAndroid.TOP);
  };
  return (
    <View style={styles.container}>
      <NumberInput inputValues={inputValues} style={{marginTop: 30}} />
      {loading && (
        <View style={styles.toastPlayer}>
          <ActivityIndicator animating={loading} size={'large'} />
        </View>
      )}
      <KeyWord click={keywordClick} />
      <Text style={styles.pinEnter}>Enter Pin</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'space-around',
    // paddingTop: 20,

    overflow: 'hidden',
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
  pinEnter: {
    fontWeight: '500',
    fontSize: 36,
    textAlign: 'center',
    color: 'black',
    marginBottom: 20,
  },
});

export default PinPage;
