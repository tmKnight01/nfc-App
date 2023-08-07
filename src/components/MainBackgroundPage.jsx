import {useRef} from 'react';
import {
  View,
  Image,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import DisclaimerComponent from './DisclaimerComponent';
import pxToDp from 'utils/pxToDp';

function MainBackgroundPage(props) {
  const {children, footer} = props;
  const childRef = useRef();

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <SafeAreaView
        style={{
          ...styles.mainContainer,
        }}>
        <DisclaimerComponent ref={childRef} />
        <View style={styles.top}>
          <TouchableOpacity
            onPress={() => childRef.current.fadeIn()}
            activeOpacity={1}>
            <Image
              style={{width: pxToDp(48), height: pxToDp(48)}}
              source={require('../images/mark.png')}
            />
          </TouchableOpacity>

          <Image
            style={{width: pxToDp(48), height: pxToDp(48)}}
            source={require('../images/moreOption.png')}
          />
        </View>
        {children}
        {footer}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'black',
    alignItems: 'center',
    paddingTop: pxToDp(10),
  },
  top: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: pxToDp(16),
    marginTop: pxToDp(16),
    alignItems: 'center',
  },
});

export default MainBackgroundPage;
