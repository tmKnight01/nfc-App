import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import pxToDp from '@/utils/pxToDp';

function KeyWord(props) {
  const wordList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];
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
    // backgroundColor: 'pink',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    // paddingHorizontal: 20,
  },
  ItemBox: {
    width: '33%',
    height: '25%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  Item: {
    width: pxToDp(110),
    height: pxToDp(110),
    borderRadius: pxToDp(55),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: pxToDp(3),
    marginVertical: 10,
  },
  KeyText: {
    fontSize: pxToDp(48),
    fontWeight: '500',
    color:'black'
  },
});

export default KeyWord;
