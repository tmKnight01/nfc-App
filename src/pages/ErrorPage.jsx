import React from 'react';
// import {View, Text, Image} from 'react-native';
import {StyleSheet, View, Image, Text} from 'react-native';
import Title from '../components/Titile';

function ErrorPage() {
  return (
    <View style={styles.container}>
      <Title />
      <Text style={styles.content}>
        Sorry, we are not able to locate any record on the blockchain.
      </Text>
      <Text style={[styles.content, {fontSize: 18}]}>
        Please retry or contact our customer service if you face any
        difficulties
      </Text>
      <Image style={{marginTop: 50}} source={require('../images/tel.jpg')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  content: {
    paddingHorizontal: 50,
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
    marginTop: 30,
  },
});

export default ErrorPage;
