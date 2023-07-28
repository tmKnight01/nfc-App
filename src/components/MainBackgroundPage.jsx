import {View, Image, StyleSheet, StatusBar} from 'react-native';
import pxToDp from 'utils/pxToDp';

function MainBackgroundPage(props) {
  const {children, footer} = props;

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={'black'} />
      <View style={styles.top}>
        <Image
          style={{width: pxToDp(48), height: pxToDp(48)}}
          source={require('../images/mark.png')}
        />
        <Image
          style={{width: pxToDp(48), height: pxToDp(48)}}
          source={require('../images/moreOption.png')}
        />
      </View>
      {children}

      {footer}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'black',
    alignItems: 'center',
  },
  top: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: pxToDp(8),
    paddingTop: pxToDp(8),
    alignItems: 'center',
  },
});

export default MainBackgroundPage;
