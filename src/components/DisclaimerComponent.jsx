import {
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from 'react';
import pxToDp from 'utils/pxToDp';
import React, {
  View,
  StyleSheet,
  Animated,
  Image,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {renderHTML} from '@/utils/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Modal from 'react-native-modal';

const DisclaimerComponent = forwardRef((props, ref) => {
  const {isVisible, setIsVisible} = props;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [htmlPre, setHtmlPre] = useState('');

  // const fadeIn = () => {
  //   Animated.timing(fadeAnim, {
  //     toValue: 1,
  //     duration: 200,
  //     useNativeDriver: true,
  //   }).start();
  // };
  // const fadeOut = () => {
  //   // Will change fadeAnim value to 0 in 3 seconds
  //   Animated.timing(fadeAnim, {
  //     toValue: 0,
  //     duration: 200,
  //     useNativeDriver: true,
  //   }).start();
  // };

  // useImperativeHandle(ref, () => ({
  //   fadeIn,
  //   fadeOut,
  // }));

  // const texts = [
  //   `By using our DATM Kiosk service, you haveagreed to our terms and conditions.
  //   www.mmatrix.io`,
  //   'The material in this leaflet is for informationpurposes only and does not provide any legalor investment advice.',
  //   'Our DATM Kiosk service offers to sell and re-sell various 3rd party digital assets, It does notconstitute any solicitation or endorsement topurchase such Digital Assets or anyinvestment advice.',
  //   'Digital Assets are high-risk, highly volatile, andmay even sustain a total loss of investment.Our company assumes no fiduciaryresponsibility or liability for any consequencesof obtaining these products, wallets, ortransactions.',
  //   `The leaflet's material is not allowed tobe reproduced, copied, or circulatedwithout our prior consent from DigitalPlus Asia Ltd.`,
  // ];

  // const renderItem = ({item}) => {
  //   return (
  //     <View style={CSS.textContainer}>
  //       {/* <View style={CSS.radius} /> */}
  //       <Text
  //         style={{
  //           flexWrap: 'wrap',
  //           fontSize: pxToDp(30),
  //           fontStyle: 'normal',
  //           fontWeight: '500',
  //           color: 'black'
  //         }}>
  //         {item}
  //       </Text>
  //     </View>
  //   );
  // };
  useEffect(() => {
    AsyncStorage.getItem('disclaimer_page').then(value => {
      console.log('htmlValue', JSON.parse(value).en);
      try {
        if (value) setHtmlPre(JSON.parse(value).en);
      } catch (err) {
        console.log('err', err);
      }
    });
  }, []);

  return (
    <Modal animationType="slide" visible={isVisible} transparent={true}>
      <View style={CSS.container}>
        <View style={CSS.modal}>
          <View style={CSS.title}>
            <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
              <Image
                style={{width: pxToDp(30), height: pxToDp(40)}}
                source={require('../images/close.png')}
              />
            </TouchableWithoutFeedback>
          </View>
          <WebView source={{html: renderHTML(htmlPre)}} style={CSS.content} />
        </View>
      </View>
    </Modal>
  );
});

const CSS = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: pxToDp(312),
    height: pxToDp(594),
    backgroundColor: '#fff',
    borderRadius: pxToDp(10),
    borderWidth: pxToDp(4),
    borderColor: '#CCCCCC',
    overflow: 'hidden',
  },
  title: {
    height: pxToDp(50),
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: pxToDp(8),
  },
  content: {
    flex: 1,
    borderRadius: pxToDp(10),
    borderWidth: pxToDp(4),
    borderColor: '#CCCCCC',
    paddingTop: pxToDp(39),
    paddingBottom: pxToDp(27),
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: pxToDp(20),

    paddingHorizontal: pxToDp(20),
  },

  radius: {
    width: pxToDp(12),
    height: pxToDp(12),
    backgroundColor: 'black',
    borderRadius: pxToDp(6),
    marginRight: pxToDp(20),
  },
  contentText: {
    color: 'black',
    // fontSize: pxToDp(24),
  },
});

export default DisclaimerComponent;
