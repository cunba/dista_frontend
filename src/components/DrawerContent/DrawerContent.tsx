import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { AuthContext } from 'App';
import GlobalButton from 'components/GlobalButton/GlobalButton';
import { COLORS } from '../../config/Colors';
import i18n from 'infrastructure/localization/i18n';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar, Drawer, Title } from 'react-native-paper';
import { SessionStoreFactory } from '../../infrastructure/data/SessionStoreFactory';
import { dispatch } from '../../RootNavigation';

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingTop: 20,
    alignItems: 'center',
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
    color: 'black'
  },
  subtitle: {
    fontSize: 13,
    color: 'black'
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  button: {
    position: 'absolute',
    bottom: 0,
  },
  bottom: {
    width: '90%',
    marginLeft: '5%',
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,
  },
});

export interface IDrawerContentProps {
  props: DrawerContentComponentProps;
  onLogOutPress: () => void;
}

export default function DrawerContent(props: any) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')

  const { signOut } = React.useContext(AuthContext);

  const logout = async () => {
    signOut()
  }


  SessionStoreFactory.getSessionStore()
    .getUser()
    .then((response) => {
      setName(response!.name)
      setSurname(response!.surname)
      setEmail(response!!.email);
    });

  //TODO: Change the hardcoded for the new user details in the cloud
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
      <Drawer.Section >
        <TouchableOpacity
          style={{
            flexDirection: 'row-reverse',
            marginHorizontal: '10%',
            top: 10,
          }}
          onPress={() => dispatch(DrawerActions.closeDrawer())}>
        </TouchableOpacity>
        <View style={styles.userInfoSection}>
          <Avatar.Text
            style={{ backgroundColor: COLORS.button }}
            label={name.substring(0, 1).toUpperCase() + '' + surname.substring(0, 1).toUpperCase()}
            size={100}
          />
          <Title style={styles.title}>{name} {surname}</Title>
          <Title style={styles.title}>{email}</Title>
        </View>
        <View
          style={{
            backgroundColor: COLORS.button,
            height: 2,
            marginHorizontal: '10%',
          }}></View>
      </Drawer.Section>
      <ScrollView style={{ flex: 1, minHeight: '48%' }}>
        <DrawerItemList {...props} />
      </ScrollView>
      <View style={styles.bottom}>
        <View
          style={{
            backgroundColor: COLORS.button,
            height: 2,
            marginHorizontal: '10%',
            marginVertical: '10%',
          }}></View>
        <GlobalButton
          onPress={() => {
            logout()
          }}
          text={i18n.t('logout')}
          style={{
            backgroundColor: COLORS.button,
            borderRadius: 25,
            marginHorizontal: '15%',
            color: 'white',
          }}
          labelStyle={{ color: 'white' }}
        />
      </View>
    </DrawerContentScrollView>
  );
}
