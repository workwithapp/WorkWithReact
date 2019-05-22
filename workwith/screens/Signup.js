
import React, { Component, PropTypes } from 'react';
import { View, ScrollView, KeyboardAvoidingView, TouchableOpacity, ToastAndroid, AsyncStorage, Alert, Image, Text, ImageBackground, TextInput, StyleSheet, Dimensions } from 'react-native';
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

class Signup extends Component {

    constructor(props) {
        super(props);
         this.focusNextField = this.focusNextField.bind(this);
         this.inputs = {};
         this.state= {
            errTypes: [],
            reg: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
         };
    }

    //  gotoSignUp=()=>{
    //     this.props.navigation.navigate("Login");
    //  }
    gotoLogin = () => {
        this.props.navigation.goBack();
    }

    gotoCreateProfile = () => {
        let errTypes = [];
       if(!this.state.email) {
            errTypes.push('email')
        }
        if(!this.state.password) {
            errTypes.push('password')
        }
         if(!this.state.cpassword) {
            errTypes.push('cpassword')
        }
         if(!errTypes.length) {
           this.setState({errTypes: errTypes, emailWrong: false});
                if(this.state.reg.test(this.state.email) === false) {
                        this.setState({emailWrong: true});
                   }
              else if(!this.state.emailWrong){
                   this.setState({loading: true});
                  fetch(Base_Url+"/signup", {
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
                            cpassword: this.state.cpassword,
                            device_id: 'fhukefjrgjnrk',
                            device_type: 'A',
                            version: '1.0' 
                        })

                    })
                    .then((response) =>
                    {
                      this.setState({loading: false});
                       console.log("responseeeeeeee",response)
                       if(response.status==200){
                         var data = JSON.parse(response._bodyInit);
                          if(data.data) {
                         console.log("responseeeeeeee",data)
                         AsyncStorage.setItem('user_token', data.data.token, () => {
                           AsyncStorage.setItem('user_id', data.data.id, () => {
                               ToastAndroid.show('You are Successfully Registered', ToastAndroid.SHORT);
                                AsyncStorage.setItem('user_data', JSON.stringify(data), () => {
                                  this.props.navigation.navigate("CreateProfile");
                               });
                              
                               });
                            });
                            
                           }
                           else if(data.error){
                              if(data.error.username) {
                               ToastAndroid.show(data.error.username[0], ToastAndroid.SHORT);
                              }
                           }
                           else if(response._bodyInit.message='Registration successfully,Please check your mail address to verify you account'){
                              ToastAndroid.show(data.message, ToastAndroid.SHORT);
                              this.props.navigation.navigate("CreateProfile");
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

            <ImageBackground source={require('../assets/gradient_bg.jpg')} style={{ width: viewportWidth, height:"100%" }}>
                 <Spinner
                      visible={this.state.loading}
                     />
                <Header
                    style={styles.transparentHeader}>
                    <Left style={{ flex: 1 }}>
                        <Button style={{ backgroundColor: 'transparent',elevation:0 }} onPress={this.gotoLogin}>
                        <Image style={{ height: 27, width: 27 }} source={require('../assets/back_icon.png')} />
                        </Button>
                    </Left>
                </Header>
                <ScrollView>
                    <KeyboardAvoidingView behavior="padding" enabled >
                        <View style={styles.container}>
                            <Image style={{ height: 60, width: 97 }} source={require('../assets/logo_without_text.png')} />
                            <Text style={[commonstyle.bold_text, commonstyle.welcome_text]}>Create an account</Text>
                            <Text style={styles.signin_continuetext}>Fill out the information below to sign up</Text>
                            <View style={styles.textInput}>
                                <View style={styles.input_outer}>
                                    {/* <Icons name="mail" size={25}  style={commonstyle.input_icon}/> */}
                                    <FontAwesome name="envelope-o" size={20} style={styles.input_icon} />
                                    <TextInput style={{
                                        alignSelf: 'stretch',
                                        alignItems: 'center',
                                        paddingLeft: 40,
                                        paddingTop:20,
                                        color: 'white'
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
                                        secureTextEntry
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
                              <View style={{flexDirection:'row', width:'100%'}}>
                               {this.state.emailWrong
                                   ?  <Text style={{fontSize:12, color: 'red', marginLeft:20}}>Please enter correct email</Text> 
                                   : null
                               }
                             </View>

                                <View style={[styles.input_outer,{marginTop:10}]}>
                                    <Lock name="lock" size={20} style={styles.input_icon} />
                                    <TextInput style={{
                                        alignSelf: 'stretch',
                                        alignItems: 'center',
                                        paddingLeft: 40,
                                         paddingTop:20,
                                        color: 'white'
                                    }}
                                       selectionColor={'white'}
                                        onChangeText={(password) => this.setState({ password })}
                                        autoCapitalize='none'
                                        secureTextEntry
                                        returnKeyType="next"
                                         ref={ input => {
                                            this.inputs['password'] = input;
                                         }}
                                        onSubmitEditing={() => {
                                                this.focusNextField('cpassword');
                                              }}
                                        secureTextEntry
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

                                <View style={[styles.input_outer,{marginTop:10}]}>
                                    <Lock name="lock" size={20} style={styles.input_icon} />
                                    <TextInput style={{
                                        alignSelf: 'stretch',
                                        alignItems: 'center',
                                        paddingLeft: 40,
                                        paddingTop:20,
                                        color: 'white'
                                    }}
                                        onChangeText={(cpassword) => this.setState({ cpassword })}
                                        selectionColor={'white'}
                                        autoCapitalize='none'
                                        secureTextEntry
                                        returnKeyType="done"
                                         ref={ input => {
                                            this.inputs['cpassword'] = input;
                                         }}
                                        underlineColorAndroid='transparent'
                                        placeholder="Re-Enter Password"
                                        placeholderTextColor='white' >
                                    </TextInput>
                                </View>
                            </View>
                             <View style={{flexDirection:'row', width:'100%'}}>
                                   {this.state.errTypes.map((item) => (
                                          item == 'password' ?  <Text style={{fontSize:14, color: 'red', marginLeft:25, marginTop: 10}}>Password confirmation is required</Text> : null
                                        ))}
                                 </View>
                            <TouchableOpacity style={[styles.btn, commonstyle.white_btn]} onPress={this.gotoCreateProfile} >
                                <Text style={[commonstyle.btn_text, { color: constants.BLUE }, commonstyle.bold_text]}>Sign Up</Text>
                            </TouchableOpacity>
                            <Text style={styles.bold_text}>By clicking on sign up button, you agree with our</Text>
                               <View style={[styles.bottomText,{width:"100%"}]}>
                                <Text style={styles.new_user}>Terms & Use</Text>
                                <Text style={styles.privacy_policy}>and</Text>
                                <Text style={styles.signup_here} onPress={this.gotoSignUp}>Privacy Policy</Text>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </ImageBackground>
            // </Container>


        );

    }


}



export default Signup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 25,
        fontFamily: 'Roboto-Regular',
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
        alignSelf: 'stretch',
        marginTop: 10
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
    },
    bottomText: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent:"center",
        alignItems:"center",
        padding:10
    },
    new_user: {
        fontFamily: 'Roboto-Bold',
        color: 'white',
        width:'auto',
        textDecorationLine: 'underline'
    },
    privacy_policy: {
        paddingLeft: 3,
        paddingRight: 3,
        color: 'white'
    },
    signup_here: {
        fontFamily: 'Roboto-Bold',
        color: 'white',
         width:'auto',
        textDecorationLine: "underline"
    }


});