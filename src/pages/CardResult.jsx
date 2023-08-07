import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import PagerView from 'react-native-pager-view';
import Title from '../components/Titile';
import useTimeNavigate from '@/hooks/useTimeNavigate';

function CardResut() {
  const panResPonser = useTimeNavigate();
  const colors = [
    {
      img: '../images/avator.png',
      desc: 'Your are the owner of Other text',
      icontext: 'Siler',
      color: 'gray',
      buttonText: 'Silver',
    },
    {
      img: '../images/avator.png',
      desc: 'Your are the owner of Other text1',
      icontext: 'Gold',
      color: 'yellow',
      buttonText: 'Gold',
    },
    {
      img: '../images/avator.png',
      desc: 'Your are the owner of Other text2',
      icontext: 'Gold',
      color: 'orange',
      buttonText: 'Bronze',
    },
  ];

  const PageRender = () => (
    <PagerView style={{flex: 1, backgroundColor: 'pink'}} initialPage={0}>
      {colors?.map((item, index) => (
        <View key={index} style={[styles.child, {backgroundColor: item.color}]}>
          <Image
            style={{width: 200, height: 150, marginTop: 40}}
            source={require('../images/avator.png')}
          />
          <Text style={styles.swiperText}>{item.desc}</Text>
          <TouchableOpacity>
            <Text style={[styles.button, {backgroundColor: item.color}]}>
              {item?.buttonText}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </PagerView>
  );

  return (
    <View style={styles.continer} {...panResPonser.panHandlers}>
      <View style={styles.resultTop}>
        <Image
          style={styles.resultLogo}
          source={require('../images/logo.png')}
        />
        <Text style={styles.resultText}>NFC Wallet</Text>
      </View>
      <Title />
      {PageRender()}
    </View>
  );
}
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  continer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultTop: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultLogo: {
    width: 130,
    height: 110,
    marginRight: 20,
  },
  resultText: {
    color: 'black',
    fontSize: 24,
    fontWeight: '500',
  },
  child: {width: '100%', alignItems: 'center'},
  text: {fontSize: width * 0.5, textAlign: 'center'},
  swiperText: {
    textAlign: 'center',
    marginVertical: 30,
    fontSize: 24,
    color: 'black',
    fontWeight: '500',
  },
  button: {
    width: 110,
    height: 50,
    borderRadius: 5,
    borderWidth: 2,
    textAlign: 'center',
    color: 'black',
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 50,
  },
});

export default CardResut;
{
  /* <View style={styles.continer} {...panResPonser.panHandlers}>
<View style={styles.resultTop}>
  <Image
    style={styles.resultLogo}
    source={require('../images/logo.png')}
  />
  <Text style={styles.resultText}>NFC Wallet</Text>
</View>
<Title />
<SwiperFlatList
  autoplayDelay={2}
  autoplayLoop
  index={2}
  data={colors}
  style={{width: '90%'}}
  renderItem={({item}) => (
    <View style={[styles.child, {backgroundColor: item.color}]}>
      <Image
        style={{width: 200, height: 150, marginTop: 40}}
        source={require('../images/avator.png')}
      />
      <Text style={styles.swiperText}>{item.desc}</Text>
      <TouchableOpacity>
        <Text style={[styles.button, {backgroundColor: item.color}]}>
          {item.buttonText}
        </Text>
      </TouchableOpacity>
    </View>
  )}
/>


</View> */
}
