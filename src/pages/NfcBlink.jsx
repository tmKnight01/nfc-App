import React, {useEffect, useState, useRef, useCallback} from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NfcManager, {NfcEvents} from 'react-native-nfc-manager';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import MainBackgroundPage from '@/components/MainBackgroundPage';
import {showToast} from '@/utils/index';
import {ROUTE} from '@/utils/constant';
import pxToDp from 'utils/pxToDp';

function NfcBlink() {
  const navigation = useNavigation();
  const [hasNfc, setHasNFC] = useState(null);
  const [count, setCount] = useState(0);
  const [nfclink, setNfcLink] = useState(0);
  const [imgUrl, setImgUrl] = useState(null);
  const IntervalrRef = useRef(null);
  const timeOutRef = useRef(null);
  const isClicking = useRef(false);

  const tags = useRef([]);

  useEffect(() => {
    (async () => {
      const deviceIsSupported = await NfcManager.isSupported();

      setHasNFC(deviceIsSupported);

      if (deviceIsSupported) {
        await NfcManager.start();
        await NfcManager.registerTagEvent();
      } else {
        showToast('sorry this device does not support nfc！');
      }
    })();
  }, []);

  useEffect(() => {
    if (hasNfc) {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
        if ((tag && nfclink == 0) || (tag && nfclink == 1)) {
          setNfcLink(val => val + 1);
          tags.current.push(tag);
        } else showToast('sorry this device does not support nfc！');
      });
    }
    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      setNfcLink(0);
    };
  }, [hasNfc]);

  useEffect(() => {
    AsyncStorage.getItem('merchant_logo').then(value => {
      if (value) {
        setImgUrl(value?.split(',')[1]);
      }
    });
  }, []);

  useEffect(() => {
    if (nfclink == 2) {
      showToast('nfc read successfully!');
      console.log('tags', tags.current);
      navigation.navigate(ROUTE.PINPAGE, {
        nfcTag: tags.current[0],
      });
    }
  }, [nfclink]);

  const backDoorClick = async () => {
    isClicking.current = true;
    clearTimeout(timeOutRef.current);
    if (Number(count) === 15) {
      try {
        await AsyncStorage.clear();
        navigation.navigate(ROUTE.RESGISTER);
      } catch (err) {
        console.log('Error clearing data: ', err);
      }
    } else {
      setCount(count => count + 1);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      IntervalrRef.current = setInterval(() => {
        if (!isClicking.current) {
          setCount(0);
        }
      }, 1000);
      return () => {
        setNfcLink(0);
        clearInterval(IntervalrRef.current);
      };
    }, []),
  );

  const Body = useCallback(() => {
    return (
      <>
        <View style={{alignItems: 'center', marginTop: pxToDp(-50)}}>
          <Text style={styles.title}>
            Welcome,please tap yout NFC card {nfclink == 1 && 'again'}
          </Text>
          <Image style={styles.nfc} source={require('../images/nfc.png')} />
        </View>
      </>
    );
  }, [nfclink]);

  const Footer = () => {
    return (
      <>
        <TouchableOpacity
          style={styles.bottomPart}
          onPressIn={backDoorClick}
          onPressOut={() => {
            timeOutRef.current = setTimeout(
              () => (isClicking.current = false),
              1000,
            );
          }}
          activeOpacity={1}>
          {imgUrl && (
            <Image
              key={imgUrl}
              source={{uri: 'data:image/png;base64,' + imgUrl}}
              style={styles.companyLogo}
            />
          )}
        </TouchableOpacity>
      </>
    );
  };

  return (
    <>
      <MainBackgroundPage children={<Body />} footer={<Footer />} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  nfc: {
    width: pxToDp(140),
    height: pxToDp(140),
    marginTop: pxToDp(80),
  },
  companyLogo: {
    width: pxToDp(250),
    height: pxToDp(154),
  },
  title: {
    fontSize: pxToDp(30),
    color: '#fff',
    fontWeight: '700',
    flexDirection: 'row',
    lineHeight: pxToDp(45),
    fontFamily: 'Arial',
    paddingHorizontal: 20,
    textAlign: 'center',
    marginTop: 10,
  },
  bottomPart: {
    marginBottom: pxToDp(40),
    alignItems: 'center',
  },
  // bottomText: {
  //   fontSize: 36,
  //   fontWeight: '500',
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   color: 'black',
  // },
});

export default NfcBlink;
