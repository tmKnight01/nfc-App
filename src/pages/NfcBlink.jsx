import React, {useEffect, useState, useRef} from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NfcManager, {NfcEvents} from 'react-native-nfc-manager';
import {useNavigation, useRoute} from '@react-navigation/native';
import {showToast} from '@/utils/index';
import {ROUTE} from '@/utils/constant';
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

  useEffect(() => {
    IntervalrRef.current = setInterval(() => {
      // console.log(isClicking.current);
      if (!isClicking.current) {
        setCount(0);
      }
    }, 1000);

    return () => clearInterval(IntervalrRef.current);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../images/nfc.png')} style={styles.nfc} />
      <TouchableOpacity
        onPressIn={backDoorClick}
        onPressOut={() => {
          timeOutRef.current = setTimeout(
            () => (isClicking.current = false),
            1000,
          );
        }}
        style={{alignItems: 'center'}}
        activeOpacity={1}>
        <Image
          source={require('../images/company_logo.png')}
          style={styles.companyLogo}
        />
        <Text style={styles.title}>Welcome,Please tap your NFC card</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(ROUTE.DISCLAIMER);
        }}>
        <Text style={styles.bottomText}> Disclaimer</Text>
      </TouchableOpacity>
    </View>
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
    width: 100,
    height: 100,
  },
  companyLogo: {
    width: 140,
    height: 140,
  },
  title: {
    fontSize: 24,
    color: 'black',
    fontWeight: '500',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    textAlign: 'center',
    marginTop: 10,
  },
  bottomText: {
    fontSize: 36,
    fontWeight: '500',
    flexDirection: 'row',
    justifyContent: 'center',
    color: 'black',
  },
});

export default NfcBlink;
