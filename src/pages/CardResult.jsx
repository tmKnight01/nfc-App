import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import PagerView from 'react-native-pager-view';
import useTimeNavigate from '@/hooks/useTimeNavigate';
import {get} from 'lodash-es';
import {getProfileAsset} from 'services/api';
import AssetRenderItem from '@/components/AssetRenderItem';
import pxToDp from 'utils/pxToDp';

function CardResut() {
  const [assetArr, setAssetArr] = useState([]);

  useEffect(() => {
    getProfileAsset(
      {
        d: 'hash004',
        a: '12345678',
      },
      'Bearer 2wyEGL6X9PlBLN1K9Jiekc3wt8wrIS6ZucQkreM4',
    )
      .then(value => {
        console.log('value', value);
        if (Array.isArray(value.d)) setAssetArr(value.d);
      })
      .catch(err => {
        console.log('err', err);
      });
  }, []);

  return (
    <View style={styles.continer}>
      <View style={styles.resultTop}>
        <Image
          style={styles.resultLogo}
          source={require('../images/logo.png')}
        />
        <Text style={styles.resultText}>NFC Wallet</Text>
      </View>
      {assetArr && assetArr.length > 0 ? (
        <PagerView style={{flex: 1, width: '100%'}} initialPage={0}>
          {assetArr?.map((item, index) => (
            <View
              key={index}
              style={[styles.child, {backgroundColor: item.color}]}>
              <AssetRenderItem item={item} />
              <Text style={styles.swiperText}>{get(item, 'c.others', '')}</Text>
              <TouchableOpacity>
                <Text style={[styles.button, {backgroundColor: item.color}]}>
                  {get(item, 'c.tier', '')}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </PagerView>
      ) : (
        <Text
          style={{
            textAlign: 'center',
            textAlign: 'center',
            fontSize: pxToDp(30),
            fontWeight: '500',
            marginTop: pxToDp(50),
           
          }}>
          No record result.
        </Text>
      )}
    </View>
  );
}
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  continer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
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
