import {
  View,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import pxToDp from '@/utils/pxToDp';
import {useNavigation, StackActions} from '@react-navigation/native';
import {ROUTE} from '@/utils/constant';

function BackGroundPage(props) {
  const {header, body} = props;
  const navigation = useNavigation();

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        style={{flex: 1, resizeMode: 'cover'}}
        source={require('../images/register.png')}>
        <View style={resgisterCSS.contanier}>
          {header}
          {body}
          <TouchableOpacity
            activeOpacity={1}
            onPress={() =>
              navigation.dispatch(StackActions.replace(ROUTE.NFCBLINK))
            }>
            <Image
              style={resgisterCSS.bottomLogo}
              source={require('../images/matirxLogo.png')}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </>
  );
}

const resgisterCSS = StyleSheet.create({
  contanier: {
    flex: 1,
    justifyContent: 'space-between',
  },
  bottomLogo: {
    width: pxToDp(79),
    height: pxToDp(63),
    marginLeft: pxToDp(20),
    marginBottom: pxToDp(20),
  },
});

export default BackGroundPage;
