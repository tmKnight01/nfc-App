import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

import pxToDp from '@/utils/pxToDp';
import BackGroundPage from '@/components/BackGroundPage';

function Resgister() {
  const Header = () => (
    <Text style={resgisterCSS.headerText}>Please register device first.</Text>
  );
  const bodyButtom = () => (
    <TouchableOpacity>
      <Text>Register.</Text>
    </TouchableOpacity>
  );

  return <BackGroundPage header={<Header />} />;
}

const resgisterCSS = StyleSheet.create({
  headerText: {
    color: '#fff',
    fontSize: pxToDp(40),
    lineHeight: pxToDp(60),
    marginLeft: pxToDp(13),
    fontWeight: '500',
  },
});

export default Resgister;
