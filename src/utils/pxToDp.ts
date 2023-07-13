import {Dimensions} from 'react-native';

const deviceWidthDp = Dimensions.get('window').width;

// 默认UI图是640
const uiWidthPx = 640;

function pxToDp(uiElementPx: number) {
  return (uiElementPx * deviceWidthDp) / uiWidthPx;
}

export default pxToDp;
