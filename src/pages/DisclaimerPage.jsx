import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import pxToDp from '@/utils/pxToDp';

function Disclaimer() {
  const texts = [
    `By using our DATM Kiosk service, you haveagreed to our terms and conditions.
    www.mmatrix.io`,
    'The material in this leaflet is for informationpurposes only and does not provide any legalor investment advice.',
    'Our DATM Kiosk service offers to sell and re-sell various 3rd party digital assets, It does notconstitute any solicitation or endorsement topurchase such Digital Assets or anyinvestment advice.',
    'Digital Assets are high-risk, highly volatile, andmay even sustain a total loss of investment.Our company assumes no fiduciaryresponsibility or liability for any consequencesof obtaining these products, wallets, ortransactions.',
    `The leaflet's material is not allowed tobe reproduced, copied, or circulatedwithout our prior consent from DigitalPlus Asia Ltd.`,
  ];

  const ClaimerText = props => {
    const {content} = props;
    return (
      <View style={styles.textContainer}>
        <View style={styles.radius} />
        <Text style={styles.contentText}>{content}</Text>
      </View>
    );
  };

  return (
    <View style={styles.contanier}>
      <Text style={styles.title}> General disclaimer</Text>

      {texts.map((text, i) => (
        <ClaimerText key={i} content={text} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  contanier: {
    flex: 1,
    marginTop: pxToDp(100),
    paddingHorizontal: pxToDp(50),
  },
  title: {
    color: 'black',
    fontSize: pxToDp(36),
    fontWeight: '500',
  },

  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: pxToDp(20),
  },

  radius: {
    width: pxToDp(12),
    height: pxToDp(12),
    backgroundColor: 'black',
    borderRadius: pxToDp(6),
    marginRight: pxToDp(20),
  },
  contentText: {
    color: 'black',
    fontSize: pxToDp(24),
  },
});

export default Disclaimer;
