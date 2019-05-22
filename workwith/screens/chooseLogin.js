
import React, {Component,PropTypes} from 'react';
import { View, TouchableOpacity,ToastAndroid, Alert,Image,AsyncStorage, Text, Button, ImageBackground, TextInput, StyleSheet, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import constants from '../common/constants';
import commonstyle from '../common/commonStyles';
import { LoginButton,LoginManager ,AccessToken, GraphRequestManager, GraphRequest} from 'react-native-fbsdk';
import LinkedInModal from 'react-native-linkedin'
import { Base_Url } from '../constants/common';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
 
 class ChooseLogin extends Component {

   constructor(props) {
        super(props);
     }

     gotoEmail=()=>{
        this.props.navigation.navigate("Login");
     }

    

         /**********************************************Facebook Login***********************************************************/

     handleFacebookLogin=()=> {
      // Alert.alert("From Facebook") 
      let _this=this;
     LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
      function (result) {
        console.log('result',result)
        if (result.isCancelled) {
          console.log('Login cancelled')
        } else {
          console.log('Login success with permissions: ' + result.grantedPermissions.toString());
            AccessToken.getCurrentAccessToken().then(
                                        (data) => {
                                          console.log("facebokkkk token",data)
                                            let accessToken = data.accessToken;
                                            // env.setState({token: accessToken});
                                            // env.fbLogin();
                const responseInfoCallback = (error, result) => {
                  if (error) {
                             console.log('Call back Error', error)
                             // alert('Error fetching data: ' + error.toString());
                             } 
                             else {
                                console.log('Facebook Login Response', result)
                                      _this.gotoCreateProfilee(result,'F')
                 
                          
                }
                }
             const infoRequest = new GraphRequest('/me',{
                 accessToken: accessToken,
                 parameters: {
                 fields: {
                 string: 'email,name,first_name,middle_name,last_name,id'
                  }
                }
               },
              responseInfoCallback);
            new GraphRequestManager().addRequest(infoRequest).start();
             })
              }
         },
      function (error) {
        console.log('Login fail with error: ' + error)
      }
    )
  }

    gotoCreateProfilee=(val,type)=>{
        // alert(val)
        // alert(type)
         this.setState({loading: true});
                  fetch(Base_Url+"/socialSignup", {
                        method: "POST",
                        headers: {
                            'accept': 'application/json',
                            'Content-Type': 'application/json',
                            'device-type':'A',
                            'version' : '1.0'
                        },
                        body: JSON.stringify({
                            email: val.email,
                            device_id: 'fhukefjrgjnrk',
                            device_type: 'A',
                            version: '1.0',
                            register_type:type,
                            social_id:val.id
                        })

                    })
                    .then((response) =>
                    {
                      this.setState({loading: false});
                       console.log("responseeeeeeee",response)
                       if(response.status==200){
                         var data = JSON.parse(response._bodyInit);
                          if(data.data) {
                         AsyncStorage.setItem('user_token', data.data.token, () => {
                           AsyncStorage.setItem('user_id', data.data.id, () => {
                               ToastAndroid.show('You are Successfully Registered', ToastAndroid.SHORT);
                              this.props.navigation.navigate("CreateProfile");
                               });
                            });
                            
                           }
                           else if(data.error){
                              if(data.error.username) {
                               ToastAndroid.show(data.error.username[0], ToastAndroid.SHORT);
                              }
                           }
                           else{
                               ToastAndroid.show(data.message, ToastAndroid.SHORT);
                           }
                          
                       }
                       else{
                         var errorr = JSON.parse(response._bodyInit);
                         ToastAndroid.show(errorr.error, ToastAndroid.SHORT);
                       }
                     
                    })

    }
    getUser=(data)=>{
     console.log(data)
     // alert(data.access_token)
              this.setState({loading: true});
                  fetch(Base_Url+"/socialSignup", {
                        method: "POST",
                        headers: {
                            'accept': 'application/json',
                            'Content-Type': 'application/json',
                            'device-type':'A',
                            'version' : '1.0'
                        },
                        body: JSON.stringify({
                            device_id: 'fhukefjrgjnrk',
                            device_type: 'A',
                            version: '1.0',
                            register_type:'L',
                            social_id:data.access_token
                        })

                    })
                    .then((response) =>
                    {
                      this.setState({loading: false});
                       console.log("responseeeeeeee",response)
                       if(response.status==200){
                         var data = JSON.parse(response._bodyInit);
                          if(data.data) {
                         AsyncStorage.setItem('user_token', data.data.token, () => {
                           AsyncStorage.setItem('user_id', data.data.id, () => {
                               ToastAndroid.show('You are Successfully Registered', ToastAndroid.SHORT);
                              this.props.navigation.navigate("CreateProfile");
                               });
                            });
                            
                           }
                           else if(data.error){
                              if(data.error.username) {
                               ToastAndroid.show(data.error.username[0], ToastAndroid.SHORT);
                              }
                           }
                           else{
                               ToastAndroid.show(data.message, ToastAndroid.SHORT);
                           }
                          
                       }
                       else{
                         var errorr = JSON.parse(response._bodyInit);
                         ToastAndroid.show(errorr.error, ToastAndroid.SHORT);
                       }
                     
                    })
    }

  gotoSignUp = () => {
        this.props.navigation.navigate('Signup');
    }

render() {
// const={this.state.navigation};
  	return ( 
        <ImageBackground source={require('../assets/gradient_bg.jpg')} style={{ width: viewportWidth, height: "100%" }}>
        <View style={styles.container}>
            <Image style={{ height:114, width:185 }} source={require('../assets/logo.png')}/>
            <Text style={styles.white_text}>By signing into Mutually, you agree with our <Text style={commonstyle.bold_text}>terms of use</Text> and <Text style={commonstyle.bold_text}>privacy policy.</Text></Text>
            <TouchableOpacity  style={[commonstyle.btn, commonstyle.white_btn]} onPress={this.gotoEmail}>
                <FontAwesome name="envelope-o" size={20}  style={[{color:constants.BLUE},commonstyle.btn_icon]} />
                <Text style={[commonstyle.btn_text, {color:constants.BLUE}, commonstyle.bold_text]}>Sign in with Email</Text>
            </TouchableOpacity>
            <TouchableOpacity  style={[commonstyle.btn, commonstyle.facebook_btn]} onPressIn={this.handleFacebookLogin.bind(this)}>
                <FontAwesome name="facebook" size={20} color={'#fff'}  style={commonstyle.btn_icon} />
                <Text style={[commonstyle.bold_text, commonstyle.btn_text]}>Sign in with Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity  style={[commonstyle.btn, commonstyle.linkedin_btn]} onPress={() => this.modal.open()}>
                <FontAwesome name="linkedin" size={20} color={'#fff'}  style={commonstyle.btn_icon} />
                <Text style={[commonstyle.bold_text, commonstyle.btn_text]}>Sign in with LinkedIn</Text>
            </TouchableOpacity>
            <LinkedInModal
            ref={ref => {
                  this.modal = ref
            }}
          clientID="81h92dfdxab44p"
          clientSecret="xPCQcosJf938ZtuW"
          linkText=""
          redirectUri="http://localhost:3000/auth/linkedin/callback"
          onSuccess={data => this.getUser(data)}
        />
           <View style={[styles.bottomText,{padding:10,width:"100%"}]}>
                                <Text style={styles.new_user}>New User?</Text>
                                <TouchableOpacity onPress={this.gotoSignUp} style={{justifyContent:"center",alignItems:"center",width:"100%"}}>
                                    <Text style={styles.signup_here} >Sign Up Here</Text>
                                </TouchableOpacity>
                            </View>
        </View>
        </ImageBackground>
  		);

  }

}

export default ChooseLogin; 

const styles = StyleSheet.create({
    container: {
        marginTop: 80,
        flex: 1,
        alignItems: 'center',
        padding:28,
        fontFamily: 'Roboto-Regular'
        
    },

    white_text: {
        color:'#fff',
        marginTop:30,
        marginBottom:15,
        textAlign:'center',
    },
      bottomText: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    new_user: {
        marginTop: 60,
        color: 'white',
    },
    signup_here: {
        marginTop: 10,
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign:"center",
        width:"100%",
        textDecorationLine: "underline"
    }

   
});