import {View, ImageBackground, StatusBar, Text} from 'react-native';

function Loading() {
  return (
    <View style={{width: '100%'}}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <ImageBackground
        style={{width: '100%', height: '100%'}}
        // source={require('../images/loading.png')}
      >
        <Text style={{fontSize: 100, color: 'skyblue'}}> Loading</Text>
      </ImageBackground>
    </View>
  );
}

export default Loading;
