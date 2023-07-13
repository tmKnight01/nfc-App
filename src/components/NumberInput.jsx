import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';

function NumberInput(props) {
  const {inputValues = ['1', '2', '3'], style = {}} = props;

  return (
    <View style={[styles.InputContainer, {...style}]}>
      {inputValues.map((itme, index) => (
        <View key={index} style={styles.NumberItem}>
          <Text style={[styles.NumberText]}>{itme}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  InputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,

    justifyContent: 'space-between',
    height: 40,
    marginVertical: 20,
  },
  NumberItem: {
    height: '100%',
    width: 40,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18,
  },
  NumberText: {
    fontSize: 24,
    color: 'black',
    fontWeight: '600',
  },
});

export default NumberInput;
