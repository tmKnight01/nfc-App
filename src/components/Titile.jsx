import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';

function Title() {
  return (
    <View style={styles.Top}>
      <Image style={styles.Logo} source={require('../images/logo.png')} />
      <Text style={styles.resultText}>NFC Wallet</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  Top: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Logo: {
    width: 130,
    height: 110,
    marginRight: 20,
  },
  resultText: {
    color: 'black',
    fontSize: 24,
    fontWeight: '500',
  },
});

export default Title;
