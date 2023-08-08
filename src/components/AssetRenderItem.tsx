import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {AssetItem} from '@/services/api';
import {isEmpty, get} from 'lodash-es';
// import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import pxToDp from 'utils/pxToDp';

interface ItemProps {
  item: AssetItem;
}

function RenderItem({item}: ItemProps) {
  const isStartsWithHttp = (str: string) => str.startsWith('http');
  console.log('item_value', item);
  if (isEmpty(item)) return null;

  if ((get(item?.t?.split('/'), '[0]', '') as string) == 'video')
    return (
      <View style={{width: pxToDp(300), height: pxToDp(250)}}>
        <VideoPlayer
          disableBack
          resizeMode="contain"
          source={{uri: get(item, 'b', '')}}
          style={{
            marginTop: pxToDp(40),
          }}
        />
      </View>
    );

  if ((get(item?.t?.split('/'), '[0]', '') as string) == 'image') {
    if (isStartsWithHttp(item?.b)) {
      return (
        <Image
          onError={e => console.log(e.nativeEvent.error)}
          style={CSS.itemBox}
          source={{uri: item?.b}}
        />
      );
    }
    return (
      <Image
        style={CSS.itemBox}
        onError={e => console.log(e.nativeEvent.error)}
        source={{uri: 'data:image/png;base64,' + item?.b}}
      />
    );
  }
}

const CSS = StyleSheet.create({
  itemBox: {
    width: pxToDp(200),
    height: pxToDp(150),
    marginTop: pxToDp(40),
  },
});

export default RenderItem;
