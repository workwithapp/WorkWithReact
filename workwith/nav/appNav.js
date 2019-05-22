import React from 'react';
import { createStackNavigator, createDrawerNavigator, createBottomTabNavigator, createMaterialBottomTabNavigator } from 'react-navigation';
import { StyleSheet, Image, View, Text } from 'react-native';
import ChooseLogin from '../screens/chooseLogin';
import Login from '../screens/login';
import Signup from '../screens/Signup';
import ForgotPassword from '../screens/ForgotPassword';
import CreateProfile from '../screens/createProfile';
import CreateProfile1 from '../screens/createProfile1';
import CreateProfile2 from '../screens/createProfile2';
import Suggested from '../screens/Suggested';
import Discover from '../screens/Discover';
import Messages from '../screens/Messages';
import MyProfile from '../screens/MyProfile';
import MyMatches from '../screens/MyMatches';
import Meeting from '../screens/meeting';
import ArticleDetail from '../screens/articleDetail';
import BlogList from '../screens/blogList';
import OtherProfile from '../screens/otherProfile';
import EditProfile from '../screens/editProfile';
import EditProfile1 from '../screens/editProfile1';
import EditProfile2 from '../screens/editProfile2';
import Setting from '../screens/setting';
import ChangePassword from '../screens/changePassword';
import BlockedUsers from '../screens/blockedUsers';
import ContactUs from '../screens/contactUs';
import Subscription from '../screens/subscription';
import Chat from '../screens/chat';
import CommonHome from '../screens/commonHome';

export const AppNav = createStackNavigator({
  // CreateProfile: {
  //   screen: CreateProfile,
  //   navigationOptions: { header: null }
  // },
  CommonHome: {
    screen: CommonHome,
    navigationOptions: { header: null }
  },
  
  ChooseLogin: {
    screen: ChooseLogin,
    navigationOptions: { header: null }
  },
  Login: {
    screen: Login,
    navigationOptions: { header: null }
  },
  Signup: {
    screen: Signup,
    navigationOptions: { header: null }
  },
  ForgotPassword: {
    screen: ForgotPassword,
    navigationOptions: { header: null }
  },
  CreateProfile: {
    screen: CreateProfile,
    navigationOptions: { header: null }
  },
  CreateProfile1: {
    screen: CreateProfile1,
    navigationOptions: { header: null }
  },
  CreateProfile2: {
    screen: CreateProfile2,
    navigationOptions: { header: null }
  },
  Meeting: {
    screen: Meeting,
    navigationOptions: { header: null }
  },
  ArticleDetail: {
    screen: ArticleDetail,
    navigationOptions: { header: null }
  },
    BlogList: {
    screen: BlogList,
    navigationOptions: { header: null }
  },
  OtherProfile: {
    screen: OtherProfile,
    navigationOptions: { header: null }
  },
  EditProfile: {
    screen: EditProfile,
    navigationOptions: { header: null }
  },
  EditProfile1: {
    screen: EditProfile1,
    navigationOptions: { header: null }
  },
  EditProfile2: {
    screen: EditProfile2,
    navigationOptions: { header: null }
  },
  Setting: {
    screen: Setting,
    navigationOptions: { header: null }
  },
  ChangePassword: {
    screen: ChangePassword,
    navigationOptions: { header: null }
  },
  BlockedUsers: {
    screen: BlockedUsers,
    navigationOptions: { header: null }
  },
  ContactUs: {
    screen: ContactUs,
    navigationOptions: { header: null }
  },
  Subscription: {
    screen: Subscription,
    navigationOptions: { header: null }
  },
  Chat: {
    screen: Chat,
    navigationOptions: { header: null }
  },
  Main: {
    screen: createBottomTabNavigator({
      Suggested: {
        screen: Suggested,
        navigationOptions: ({ navigation }) =>({
          title: "Suggested",
           tabBarOnPress: ({}) => {
                     
                      navigation.navigate("Suggested",{refresh: 'refresh'})
                    },
          header: null,
          tabBarIcon: ({ tintColor }) => (
            <Image
              source={require('../assets/star-sign.png')}
              style={[styles.navIcon]}
            />
          )
        })
      },
      Discover: {
        screen: Discover,
        navigationOptions: ({ navigation }) =>({
          title: "Discover",
          tabBarOnPress: ({}) => {
                     
                      navigation.navigate("Discover",{refresh: 'refresh'})
                    },
          header: null,
          tabBarIcon: ({ tintColor }) => (
            <Image
              source={require('../assets/search.png')}
              style={[styles.navIcon]}
            />
          )
        })
      },
      Messages: {
        screen: Messages,
        navigationOptions: ({ navigation }) =>({
          title: "Messages",
           tabBarOnPress: ({}) => {
                     
                      navigation.navigate("Messages",{refresh: 'refresh'})
                    },
          header: null,
          tabBarIcon: ({ tintColor }) => (
            <Image
              source={require('../assets/email.png')}
              style={[styles.navIcon]}
            />
          )
        })
      },
      MyMatches: {
        screen: MyMatches,
        navigationOptions: ({ navigation }) =>({
          title: "Matches",
           tabBarOnPress: ({}) => {
                     
                      navigation.navigate("MyMatches",{refresh: 'refresh'})
                    },
          header: null,
          tabBarIcon: ({ tintColor }) => (
            <Image
              source={require('../assets/star-sign.png')}
              style={[styles.navIcon]}
            />
          )
        })
      },
      MyProfile: {
        screen: MyProfile,
        labelStyle: { fontSize: 15 },
        navigationOptions: ({ navigation }) =>({
          title: "Profile",
          tabBarOnPress: ({}) => {
                     
                      navigation.navigate("MyProfile",{refresh: 'refresh'})
                    },
          header: null,
          tabBarIcon: ({ tintColor }) => (
            <Image
              source={require('../assets/user.png')}
              style={[styles.navIcon]}
            />
          )
        })
      },
    },
      {
        tabBarOptions: {
          style: { backgroundColor: '#fff', },
          labelStyle: { fontSize: 8, marginBottom: 5, fontFamily: 'Roboto-Bold' },
          activeTintColor: '#000',
          inactiveTintColor: '#989898',
          tabsStyle: {
            tabBarTextFontFamily: 'Roboto-Bold',
            tabBarTextfontSize: 30,
            height: 50
          },
        }
      },
      {
        navigationOptions: {
          header: null,
          gesturesEnabled: false
        }
      }
    )
  }
},
  {
    navigationOptions: {
      header: null,
      gesturesEnabled: false
    }
  }
);

export default AppNav;

const styles = StyleSheet.create({
  navIcon: {
    width: 24,
    height: 24,
    marginTop: 5,
    tintColor: 'gray'
  },
  rideIcon: {
    width: 70,
    height: 70
  }
});

