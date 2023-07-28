import React, {useEffect, useState, useRef} from 'react';
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
  const IntervalrRef = useRef(null);
  const timeOutRef = useRef(null);
  const isClicking = useRef(false);
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
        if (tag) {
          showToast('nfc read successfully!');
          navigation.navigate(ROUTE.PINPAGE);
        } else showToast('sorry this device does not support nfc！');
      });
    }
    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    };
  }, [hasNfc]);

  const backDoorClick = async () => {
    isClicking.current = true;
    clearTimeout(timeOutRef.current);
    console.log('count', count);
    if (Number(count) === 15) {
      try {
        await AsyncStorage.removeItem('pin');
        navigation.navigate(ROUTE.HOME);
      } catch (err) {
        console.log('err', err);
      }
    } else {
      setCount(count => count + 1);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      IntervalrRef.current = setInterval(() => {
        console.log('isClicking', isClicking.current);
        if (!isClicking.current) {
          setCount(0);
        }
      }, 1000);
      return () => clearInterval(IntervalrRef.current);
    }, []),
  );

  const Body = () => {
    return (
      <>
        <View style={{alignItems: 'center', marginTop: pxToDp(-50)}}>
          <Text style={styles.title}>Welcome,please tap yout NFC card</Text>
          <Image style={styles.nfc} source={require('../images/nfc.png')} />
        </View>
      </>
    );
  };

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
          <Image
            source={require('../images/company_logo.png')}
            style={styles.companyLogo}
          />
        </TouchableOpacity>
      </>
    );
  };

  return (
    // <View style={styles.container}>
    //   <Image source={require('../images/nfc.png')} style={styles.nfc} />
    //   <TouchableOpacity
    //     onPressIn={backDoorClick}
    //     onPressOut={() => {
    //       timeOutRef.current = setTimeout(
    //         () => (isClicking.current = false),
    //         1000,
    //       );
    //     }}
    //     style={{alignItems: 'center'}}
    //     activeOpacity={1}>
    //     <Image
    //       source={require('../images/company_logo.png')}
    //       style={styles.companyLogo}
    //     />
    //     <Text style={styles.title}>Welcome,Please tap your NFC card</Text>
    //   </TouchableOpacity>
    //   <TouchableOpacity
    //     onPress={() => {
    //       navigation.navigate(ROUTE.DISCLAIMER);
    //     }}>
    //     <Text style={styles.bottomText}> Disclaimer</Text>
    //   </TouchableOpacity>
    // </View>

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
