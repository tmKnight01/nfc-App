import {
  View,
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
} from 'react-native';
import pxToDp from '@/utils/pxToDp';

function BackGroundPage(props) {
  const {header, body} = props;

  return (
    <ImageBackground
      style={{height: '100%', width: '100%'}}
      source={require('../images/register.png')}>
      <StatusBar backgroundColor="#FF008A" />
      <View style={resgisterCSS.contanier}>
        {header}
        {body}
        <View>
          <Image
            style={resgisterCSS.bottomLogo}
            source={require('../images/matirxLogo.png')}
          />
        </View>
      </View>
    </ImageBackground>
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
