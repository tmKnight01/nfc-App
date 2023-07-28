import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import pxToDp from '@/utils/pxToDp';

function KeyWord(props) {
  const wordList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  const {click} = props;

  return (
    <View style={styles.keywords}>
      {wordList.map((item, index) => (
        <View style={styles.ItemBox} key={index}>
          <TouchableOpacity
            key={index}
            style={styles.Item}
            onPress={() => click(item)}>
            <Text style={styles.KeyText}>{item}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  keywords: {
    flex: 1,

    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ItemBox: {
    width: '33%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  Item: {
    width: pxToDp(80),
    height: pxToDp(80),
    borderRadius: pxToDp(40),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginVertical: pxToDp(11),
  },
  KeyText: {
    fontSize: pxToDp(40),
    fontWeight: '500',
    color: 'black',
  },
});

export default KeyWord;
