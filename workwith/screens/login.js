
import React, { Component, PropTypes } from 'react';
import { View, ScrollView, KeyboardAvoidingView, TouchableOpacity, Alert, ToastAndroid,Image,AsyncStorage, Text, ImageBackground, TextInput, StyleSheet, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/Octicons';
import Lock from 'react-native-vector-icons/SimpleLineIcons'
import constants from '../common/constants';
import commonstyle from '../common/commonStyles';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Icon, Right, Body, Row } from 'native-base';
import { Base_Url } from '../constants/common';
import Spinner from 'react-native-loading-spinner-overlay';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

class Login extends Component {

    constructor(props) {
        super(props);
         this.focusNextField = this.focusNextField.bind(this);
         this.inputs = {};
         this.state= {
            errTypes: []
         };
    }
    
    gotoSignUp = () => {
        this.props.navigation.navigate('Signup');
    }

    gotoChooseLogin = () => {
        this.props.navigation.goBack();
    }
    
    gotoForgot = () => {
        this.props.navigation.navigate('ForgotPassword');
    }

    componentWillMount() {
       AsyncStorage.getItem("fcmToken").then((value) => {
          console.log("fcmToken daaaaaataaaaaaa",value)
          this.setState({fctoken: value});
        }).done();
       
    }

    gotoHome = () =>
    {
      
      let errTypes = [];
       if(!this.state.email) {
            errTypes.push('email')
        }
        if(!this.state.password) {
            errTypes.push('password')
        }
         if(!errTypes.length) {
                   this.setState({loading: true});
                  fetch(Base_Url+"/login", {
                        method: "POST",
                        headers: {
                            'accept': 'application/json',
                            'Content-Type': 'application/json',
                            'device-type':'A',
                            'version' : '1.0'
                        },
                        body: JSON.stringify({
                            email: this.state.email,
                            password: this.state.password,
                            device_id: this.state.fctoken,
                            device_type: 'A',
                            version: '1.0' 
                        })

                    })
                    .then((response) =>
                    {
                      this.setState({loading: false});
                       console.log(response)
                       if(response.status==200){
                         var data = JSON.parse(response._bodyInit);
                           let _this=this;
                           if(data.data) {
                               AsyncStorage.setItem('user_token',  data.data.token);
                              
                                AsyncStorage.setItem('user_data', JSON.stringify(data), () => {
                                  // console.log("logiiinnnnn",data)
                                   ToastAndroid.show('You are Successfully LoggedIn', ToastAndroid.SHORT);
                                  this.props.navigation.navigate("CommonHome",{id:"hii"});
                               });
                           }
                           else if(data.error){
                              // if(data.error.username) {
                               ToastAndroid.show(data.error, ToastAndroid.SHORT);
                              // }
                           }
                           else{
                               ToastAndroid.show(data.message, ToastAndroid.SHORT);
                           }
                          
                       }
                       else{
                         var errorr = JSON.parse(response._bodyInit);
                         ToastAndroid.show(errorr.message, ToastAndroid.SHORT);
                       }
                     
                    })
           }
          else{
            this.setState({errTypes: errTypes});
          }
      
    }

    focusNextField(id) {
          this.inputs[id].focus();
      }

    render() {

        return (

            <ImageBackground source={require('../assets/gradient_bg.jpg')} style={{ width: viewportWidth, height: "100%" }}>
                 <Spinner
                      visible={this.state.loading}
                     />
                <Header
                    style={styles.transparentHeader}>
                    <Left style={{ flex: 1 }}>
                        <Button style={{ backgroundColor: 'transparent',elevation:0 }} onPress={this.gotoChooseLogin} >
                          <Image style={{ height: 27, width: 27 }} source={require('../assets/back_icon.png')} />
                        </Button>
                    </Left>
                </Header>
                <ScrollView>
                    <KeyboardAvoidingView behavior="padding" enabled >
                        <View style={styles.container}>

                            <Image style={{ height: 60, width: 97 }} source={require('../assets/logo_without_text.png')} />
                            <Text style={[commonstyle.bold_text, commonstyle.welcome_text]}>Welcome back!</Text>
                            <Text style={styles.signin_continuetext}>Sign in to continue</Text>
                            <View style={styles.input_outer}>
                                <FontAwesome name="envelope-o" size={20} style={styles.input_icon} />
                                <TextInput style={{
                                    alignSelf: 'stretch',
                                    paddingLeft: 40,
                                    paddingTop:20,
                                    color: 'white',
                                    fontFamily: 'Roboto-Light'
                                }}
                                    selectionColor={'white'}
                                    onChangeText={(email) => this.setState({ email })}
                                    autoCapitalize='none'
                                    returnKeyType="next"
                                  ref={ input => {
                                        this.inputs['email'] = input;
                                     }}
                                    onSubmitEditing={() => {
                                            this.focusNextField('password');
                                          }}
                                    keyboardType='email-address'
                                    underlineColorAndroid='transparent'
                                    placeholder="Enter Email Address"
                                    placeholderTextColor='white' >
                                </TextInput>
                            </View>
                              <View style={{flexDirection:'row', width:'100%'}}>
                                   {this.state.errTypes.map((item) => (
                                      item == 'email' ?  <Text style={{fontSize:14, color: 'red', marginLeft:25, marginTop: 10}}>Email is required</Text> : null
                                    ))}
                             </View>
                            <View style={[styles.input_outer,{marginTop:10}]}>
                                <Lock name="lock" size={20} style={styles.input_icon} />
                                <TextInput style={{
                                    alignSelf: 'stretch',
                                    paddingLeft: 40,
                                     paddingTop:20,
                                    color: 'white',
                                    fontFamily: 'Roboto-Light'
                                }}
                                    selectionColor={'white'}
                                    onChangeText={(password) => this.setState({ password })}
                                    autoCapitalize='none'
                                    returnKeyType="done"
                                    secureTextEntry
                                    ref={ input => {
                                        this.inputs['password'] = input;
                                     }}
                                    underlineColorAndroid='transparent'
                                    placeholder="Enter Password"
                                    placeholderTextColor='white' >
                                </TextInput>
                            </View>
                              <View style={{flexDirection:'row', width:'100%'}}>
                                   {this.state.errTypes.map((item) => (
                                          item == 'password' ?  <Text style={{fontSize:14, color: 'red', marginLeft:25, marginTop: 10}}>Password is required</Text> : null
                                        ))}
                                 </View>

                            <TouchableOpacity style={[styles.btn, commonstyle.white_btn]} onPress={this.gotoHome}>
                                <Text style={[commonstyle.btn_text, { color: constants.BLUE }, commonstyle.bold_text]}>Sign in</Text>
                            </TouchableOpacity>
                            <Text style={styles.bold_text} onPress={this.gotoForgot}>Forgot Password?</Text>
                            <View style={[styles.bottomText,{padding:10,width:"100%"}]}>
                                <Text style={styles.new_user}>New User?</Text>
                                <TouchableOpacity onPress={this.gotoSignUp} style={{justifyContent:"center",alignItems:"center",width:"100%"}}>
                                    <Text style={styles.signup_here} >Sign Up Here</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </ImageBackground>
            // </Container>


        );

    }


}


export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 25,
        fontFamily: 'Roboto-Regular'
    },

    btn: {
        borderRadius: 60,
        color: '#fff',
        position: 'relative',
        marginTop: 30,
        height: 45,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    signin_continuetext: {
        color: '#fff',
        fontFamily: 'Roboto-Light'
    },
    transparentHeader: {
        elevation: 0,
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent'
    },
    btn_icon: {
        color: 'white'
    },
    textInput: {

    },
    input_outer: {
        marginTop:30,
        height:50,
        flexDirection: 'row',
        alignSelf: 'stretch',
        borderBottomWidth: 1,
        borderColor: 'rgba(0,172,176,0.3)',
        backgroundColor: 'transparent',
        borderBottomColor: 'white',
        position:'relative'
    },
    input_icon: {
        position: 'absolute',
        left:10,
        bottom:10,
        backgroundColor: 'transparent',
        color: 'white'
    },
    btnView: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    bold_text: {
        marginTop: 35,
        color: 'white',
        textDecorationLine: "underline",
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