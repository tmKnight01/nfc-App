import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useTimeNavigate from '@/hooks/useTimeNavigate';
import {ROUTE} from '@/utils/constant';

function CardPage() {
  const panResPonser = useTimeNavigate();
  const navigation = useNavigation();
  const [imgUrl, setImgUrl] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('merchant_logo').then(value => {
      if (value) {
        setImgUrl(value?.split(',')[1]);
      }
    });
  }, []);

  return (
    <View style={styles.container} {...panResPonser.panHandlers}>
      <Image
        style={styles.logoImg}
        source={{uri: 'data:image/png;base64,' + imgUrl}}
      />
      <TouchableOpacity onPress={() => navigation.navigate(ROUTE.CARDRESULT)}>
        <View style={styles.buttom}>
          <Text style={styles.buttomText}>{'Check'}</Text>
          <Text style={styles.buttomText}>{'Membership'}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate(ROUTE.ERRORPAGE)}>
        <View style={[styles.buttom, {backgroundColor: 'gray'}]}>
          <Text style={styles.buttomText}>{'Check'}</Text>
          <Text style={styles.buttomText}>{'Error Page'}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  buttom: {
    width: 200,
    height: 90,
    borderRadius: 20,
    borderWidth: 2,
    backgroundColor: '#ff3399',
    paddingTop: 10,
  },
  logoImg: {
    width: 200,
    height: 200,
  },
  buttomText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '500',
  },
});

export default CardPage;
