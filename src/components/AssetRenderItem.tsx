import React from 'react';
import {View} from 'react-native';
import {AssetItem} from '@/services/api';
import {isEmpty, get} from 'lodash-es';
import Video from 'react-native-video';
interface ItemProps {
  item: AssetItem;
}

function RenderItem({item}: ItemProps) {
  if (isEmpty(item)) return null;

  if ((get(item?.t?.split('/'), '[0]', '') as string) == 'video')
    return <Video source={{uri: get(item, 'b', '')}}></Video>;
}
