import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  ToastAndroid,
  ActivityIndicator,
  Image,
  Text,
} from 'react-native';
import KeyWord from '../components/KeyWord';
import MainBackgroundPage from '@/components/MainBackgroundPage';
import DeviceInfo from 'react-native-device-info';
import {sha3_512} from 'js-sha3';
import {useNavigation, StackActions} from '@react-navigation/native';
import {ROUTE} from '@/utils/constant';
import pxToDp from 'utils/pxToDp';

function PinPage({route}) {
  const numberList = useRef(['', '', '', '', '', '']);
  const [inputValues, setInputValues] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const password = 654321;

  const {nfcTag} = route.params;
  console.log('nfcTag', nfcTag);
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
      setTimeout(() => {
        const pin = Number(numberList.current.join(''));
        if (pin === password) {
          showToast('Success');
          console.log('nfcTopin', sha3_512(nfcTag?.id + '' + pin));
          navigation.dispatch(
            StackActions.replace(ROUTE.CARDPAGE, {
              nfcToPin: sha3_512(nfcTag?.id + '' + pin),
              decviceID: sha3_512(androidId),
            }),
          );
        } else {
          showToast('Password Error');
        }

        setLoading(false);
        numberList.current = ['', '', '', '', '', ''];
        setInputValues([...numberList.current]);
      }, 0);
    });
  };

  const Footer = () => (
    <Image
      source={require('../images/company_logo.png')}
      style={styles.companyLogo}
    />
  );

  const Body = () => {
    return (
      <>
        <Text style={styles.title}>Enter Pin</Text>
        {loading && (
          <View style={styles.toastPlayer}>
            <ActivityIndicator animating={loading} size={'large'} />
          </View>
        )}
        <KeyWord click={keywordClick} />
      </>
    );
  };

  const showToast = text => {
    ToastAndroid.show(text, ToastAndroid.TOP);
  };
  return <MainBackgroundPage footer={<Footer />} children={<Body />} />;
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  title: {
    color: '#fff',
    fontSize: pxToDp(30),
    fontWeight: '700',
    marginVertical: pxToDp(20),
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

  companyLogo: {
    width: pxToDp(250),
    height: pxToDp(154),
    marginBottom: pxToDp(40),
  },
});

export default PinPage;
