
import React, { Component, PropTypes } from 'react';
import { View,StatusBar,ActivityIndicator, FlatList,crollView, Picker, KeyboardAvoidingView, Modal,TouchableOpacity, ToastAndroid, Alert, Image, Text,AsyncStorage, ImageBackground, TextInput, StyleSheet, Dimensions } from 'react-native';
import { Base_Url } from '../constants/common';
import constants from '../common/constants';
import firebase from 'react-native-firebase';

// import Home from './home';
// import HomeProvider from './homeProvider';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');


class CommonHome extends Component {
  
   constructor(props) {
        super(props);
       this.state={
        provider:true,
        patient:false
     }
     }

  componentDidMount() {
     this._getStoredData();
     this.getAskPermission();
        
    }

    _getStoredData(){
     AsyncStorage.getItem("user_data").then((value) => {
          console.log("daaaaaataaaaaaa",value)
          if (value !== null) {
          let data=JSON.parse(value);
          this.getProfile(data.data.token)
          // this.props.navigation.navigate('UserType')
          }
      else{
        this.props.navigation.navigate('ChooseLogin')
      }
        }).done();
    }
    
    componentWillReceiveProps(nextProps) {
    this._getStoredData();
    if(nextProps.myProp !== this.props.myProps) {
    }
  }

    componentWillMount() {
        const channel = new firebase.notifications.Android.Channel( 'channelId', 'Channel Name', firebase.notifications.Android.Importance.Max )
        .setDescription('A natural description of the channel'); 
        firebase.notifications().android.createChannel(channel);  

        
     this.notificationListener = firebase.notifications().onNotification((notification) => {
        console.log("notification received", notification.data, notification);
        if(notification.data.label == 'chat' && global.otherId !='' && global.otherId == notification.data.sender_id) {
       
        }
        else{
         const localNotification = new firebase.notifications.Notification({ 
         sound: 'default', show_in_foreground: true, }) 
         .setNotificationId(notification.notificationId) 
         .setTitle(notification.title) 
         .setSubtitle(notification.subtitle) 
         .setBody(notification.body) 
         .setData(notification.data) 
         .android.setChannelId('channelId') // e.g. the id you chose above 
         .android.setSmallIcon('ic_launcher') // create this icon in Android Studio 
         .android.setColor('#000000') // you can set a color here 
         .android.setPriority(firebase.notifications.Android.Priority.High);

       firebase.notifications() .displayNotification(localNotification) 
       .catch(err => console.log("errrrrrrrrrrrrrrr ",err));

       // firebase.notifications() .displayNotification(localNotification)
       //  .then(x => { resolve() }) 
       //  .catch(err => reject(err));
     }
    });
  }

      getProfile = (token) =>{
        // alert("profileee")
        this.setState({loading: true});
          fetch(Base_Url+"/getProfile", {
                method: "GET",
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'device-type':'A',
                    'version' : '1.0',
                    'token': token,
                     }

                  })
                    .then((response) =>
                    {
                      this.setState({loading: false});
                     
                      
                       console.log(response)
                       if(response.status==200){
                         // alert("response")
                         var data = JSON.parse(response._bodyInit);
                         if(data.data.name){
                            this.props.navigation.navigate('Suggested')
                         }
                         else{
                            this.props.navigation.navigate('CreateProfile')
                         }
                       }
                       else{
                        // alert("errorrr")
                         this.props.navigation.navigate('ChooseLogin')
                       }
                     
                    })
                  }
       getAskPermission = () => {
       
              firebase.messaging().hasPermission()
              .then(enabled => {
                if (enabled) {
                  this.getToken();

                } else {
                  console.log("User do not have permission for Push notification");
                  this.askPermission()
                }
              });
          
        
    }


  getToken = () => {
    firebase.messaging().getToken().then(fcmToken => {
     console.log("tokennnnn",fcmToken)
    
      if (fcmToken) {

      AsyncStorage.setItem('fcmToken', fcmToken, () => {
         // this.updateDeviceToken(fcmToken)
        });
        console.log("fcmTokenfcmToken", fcmToken);
      } else {
        console.log("no token found");
      }
    });
  }


    render() {
  		return(
  		<View style={styles.container}>   
  		<View>
          <ActivityIndicator size="large" color = {constants.BLUE}/>
          <StatusBar barStyle="default" />
        </View>
        </View>
        );

    }


}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        flex:1,
        justifyContent:"center",
        alignItems:"center"
        },
    });
export default CommonHome;
