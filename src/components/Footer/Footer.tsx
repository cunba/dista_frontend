import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import GlobalButton from '../GlobalButton/GlobalButton';
import { MultiLevelFabButton } from '../MultiLevelFabButton/MultiLevelFabButton';
import { IGlobalButton } from '../GlobalButton/GlobalButton';
import { COLORS } from 'config/Colors';

interface FooterProps {
  fabButtonProps?: MultiLevelFabButton
}

export const Footer = (props: MultiLevelFabButton) => {
  const width = Dimensions.get('window');

  return (
    <>
      <View style={styles.shadowContainer}>
        <View style={styles.shadow}></View>
        <View style={styles.shadow}></View>
      </View>
      <View style={styles.footer}>
      </View>
      <MultiLevelFabButton {...props} />
    </>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    height: 73,

    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.appBackground,
  },
  footerLabels: {
    width: '40%',
    height: '100%'
  },
  shadowContainer: {
    width: '100%',
    height: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  shadow: {
    width: Dimensions.get('window').width / 2 - 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24,
  }
})
