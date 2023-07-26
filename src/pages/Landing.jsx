import {View, Image} from 'react-native';

function Loading() {
  return (
    <View style={{width: '100%'}}>
      <Image
        style={{width: '100%', height: '100%'}}
        source={require('../images/loading.png')}
      />
    </View>
  );
}

export default Loading;
