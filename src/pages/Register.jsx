import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

import pxToDp from '@/utils/pxToDp';
import {sha3_512} from 'js-sha3';
import DeviceInfo from 'react-native-device-info';
import BackGroundPage from '@/components/BackGroundPage';
import QRCode from 'react-native-qrcode-svg';
import {useEffect, useRef, useState} from 'react';

function Resgister() {
  const qrRef = useRef();
  const [isShowQR, setIsShowQR] = useState(false);

  useEffect(() => {
    DeviceInfo.getAndroidId().then(androidId => {
      qrRef.current = sha3_512(androidId);
    });
  }, []);

  const showQR = () => setIsShowQR(true);

  const FirstText = 'Please register device first';
  const QRText = `Scan QR code for complete registrantion.`;

  const Header = () => (
    <Text style={resgisterCSS.headerText}>{isShowQR ? QRText : FirstText}</Text>
  );
  const BodyButtom = () => (
    <View style={resgisterCSS.buttonBox}>
      {isShowQR ? (
        <View
          style={{
            backgroundColor: '#fff',
            padding: pxToDp(5),
            borderWidth: pxToDp(1),
            borderColor: '#CAD1D7',
          }}>
          <QRCode value={qrRef.current} size={pxToDp(220)} />
        </View>
      ) : (
        <TouchableOpacity
          onPress={showQR}
          style={resgisterCSS.buttonTextBox}
          activeOpacity={0.5}>
          <Text
            style={{fontSize: pxToDp(30), color: '#fff', fontWeight: '500'}}>
            Register
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return <BackGroundPage header={<Header />} body={<BodyButtom />} />;
}

const resgisterCSS = StyleSheet.create({
  headerText: {
    color: '#fff',
    fontSize: pxToDp(40),
    lineHeight: pxToDp(60),
    marginLeft: pxToDp(13),
    marginTop: pxToDp(50),
    fontWeight: '500',
  },

  buttonBox: {
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: pxToDp(-80),
  },
  buttonTextBox: {
    backgroundColor: '#AC24FF',
    borderRadius: pxToDp(6),
    height: pxToDp(70),
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: pxToDp(320),
    fontSize: pxToDp(30),
  },
});

export default Resgister;
