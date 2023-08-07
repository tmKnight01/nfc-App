import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useTimeNavigate from '@/hooks/useTimeNavigate';
import pxToDp from '@/utils/pxToDp';
import WebView from 'react-native-webview';
import {renderHTML} from '@/utils/index';

function ErrorPage() {
  const panResPonser = useTimeNavigate();
  const [errorPage, setErrorPage] = useState();

  useEffect(() => {
    AsyncStorage.getItem('member_error_page').then(value => {
      if (value) setErrorPage(value);
    });
  }, []);

  return (
    <View style={styles.container}>
      <WebView
        {...panResPonser}
        source={{html: renderHTML(errorPage || '')}}
        style={styles.content}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: pxToDp(10),
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
});

export default ErrorPage;

// <> <Title />
//       <Text style={styles.content}>
//         Sorry, we are not able to locate any record on the blockchain.
//       </Text>
//       <Text style={[styles.content, {fontSize: 18}]}>
//         Please retry or contact our customer service if you face any
//         difficulties
//       </Text>
//       <Image style={{marginTop: 50}} source={require('../images/tel.jpg')} /></>
