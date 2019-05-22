
import React, { Component, PropTypes } from 'react';
import { View, Modal,AsyncStorage, TouchableHighlight, TouchableOpacity, ToastAndroid, Alert, Image, Text, ImageBackground, TextInput, StyleSheet, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/Octicons';
import Lock from 'react-native-vector-icons/SimpleLineIcons'
import constants from '../common/constants';
import commonstyle from '../common/commonStyles';
import { Base_Url } from '../constants/common';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Icon, Right, Body, Row } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

class ForgotPassword extends Component {
  

     constructor(props) {
        super(props);
          this.inputs = {};
          this.state = {
                modalVisible: false,
                errTypes: []
            };
    }
    

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

   
    forgotPopup = () => {
        this.setModalVisible(true);
    }

    forgotClose = () => {
        this.setModalVisible(false);
    }
    
    gotoLogin = () => {
        this.props.navigation.goBack();
    }

   componentWillMount() {
       AsyncStorage.getItem("user_data").then((value) => {
          console.log("daaaadaaaaaataaaaaaa",value)
           let data=JSON.parse(value);
          // this.setState({token: data.data.token})
        }).done();
       
    }
   
    forgotPassword = () =>
    {
      
      let errTypes = [];
       if(!this.state.email) {
            errTypes.push('email')
        }
         if(!errTypes.length) {
                   this.setState({loading: true});
                  fetch(Base_Url+"/forgotPassword", {
                        method: "POST",
                        headers: {
                            'accept': 'application/json',
                            'Content-Type': 'application/json',
                            'device-type':'A',
                            'version' : '1.0'
                        },
                        body: JSON.stringify({
                            email: this.state.email 
                        })

                    })
                    .then((response) =>
                    {
                      this.setState({loading: false});
                       console.log("forgotttt",response)
                       if(response.status==200){
                         var data = JSON.parse(response._bodyInit);
                           let _this=this;
                          this.props.navigation.goBack();
                             ToastAndroid.show(data.message, ToastAndroid.SHORT);
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

    render() {

        return (

            <ImageBackground source={require('../assets/gradient_bg.jpg')} style={{ width: viewportWidth, height: (viewportHeight) }}>
                <Header
                    style={styles.transparentHeader}>
                     <Left style={{ flex: 1 }}>
                        <Button style={{ backgroundColor: 'transparent',elevation:0 }} onPress={this.gotoLogin} >
                          <Image style={{ height: 27, width: 27 }} source={require('../assets/back_icon.png')} />
                        </Button>
                    </Left>
                    <Text style={styles.forgot}>Forgot Password</Text>
                    <Right style={{ flex: 1 }}>
                    </Right>

                </Header>
                <View style={styles.container}>
                <Spinner
                      visible={this.state.loading}
                     />
                    <Text style={styles.forgotContent}>If you have forgotten your password, please enter in your e-mail and we will send you an e-mail to that address so you can reset your password.</Text>
                    <View style={styles.input_outer}>
                        <FontAwesome name="envelope-o" size={25} style={styles.input_icon} />
                        <TextInput style={{
                            alignSelf: 'stretch',
                            alignItems: 'center',
                            paddingLeft: 40,
                            paddingBottom:10,
                            color: 'white'
                        }}
                          selectionColor={'white'}
                            onChangeText={(email) => this.setState({ email })}
                            autoCapitalize='none'
                            returnKeyType="done"
                            keyboardType='email-address'
                            underlineColorAndroid='transparent'
                            placeholder="Enter Registered Email Address"
                            placeholderTextColor='white' >
                        </TextInput>
                    </View>
                     <View style={{flexDirection:'row', width:'100%'}}>
                                   {this.state.errTypes.map((item) => (
                                      item == 'email' ?  <Text style={{fontSize:14, color: 'red', marginLeft:25, marginTop: 10}}>Email is required</Text> : null
                                    ))}
                             </View>
                    <TouchableOpacity style={[styles.btn, commonstyle.white_btn]} onPress={this.forgotPassword}>
                        <Text style={[commonstyle.btn_text, { color: constants.BLUE }, commonstyle.bold_text]}>Reset Password</Text>
                    </TouchableOpacity>
                </View>

                <Modal
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}
                    transparent={true}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 20,
                        backgroundColor: 'rgba(0,0,0,0.8)'
                    }}>
                        <View style={{
                            width: '100%',
                            height: 'auto',
                            borderRadius: 5,
                            paddingTop: 20,
                            backgroundColor: '#fff'
                        }}>
                            <Text style={styles.modalText}>An email has been sent to your</Text>
                            <Text style={styles.modalText}>registered email address. Follow</Text>
                            <Text style={styles.modalText}>the directions in the email to</Text>
                            <Text style={styles.modalText}>reset your password</Text>
                            {/* <Image   style={styles.image}
           source={require('../assets/barcode.jpeg')} 
                      /> */}
                            <View style={styles.buttonContainer1}>
                                <TouchableOpacity style={[commonstyle.btn, commonstyle.linkedin_btn]} onPress={this.forgotClose}>
                                    <Text style={[commonstyle.bold_text, commonstyle.btn_text]}>Done</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </Modal>

            </ImageBackground>
            // </Container>
        );

    }


}



export default ForgotPassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 28,
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
        borderBottomColor: 'transparent',
    },
    btn_icon: {
        color: 'white'
    },
    textInput: {

    },
    input_outer: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        borderBottomWidth: 1,
        borderColor: 'rgba(0,172,176,0.3)',
        backgroundColor: 'transparent',
        borderBottomColor: 'white',
        marginTop: 45,
        position: 'relative'
    },
    input_icon: {
        position: 'absolute',
        left: 5,
        bottom: 10,
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
    },
    new_user: {
        fontWeight: 'bold',
        color: 'white',
        textDecorationLine: 'underline'
    },
    privacy_policy: {
        paddingLeft: 3,
        paddingRight: 3,
        color: 'white'
    },
    signup_here: {
        fontWeight: 'bold',
        color: 'white',
        textDecorationLine: "underline"
    },
    forgot: {
        alignItems: 'center',
        alignSelf: 'center',
        fontFamily: 'Avenir Heavy',
        color: 'white',
        fontSize: 20
    },
    forgotContent: {
        color: 'white',
        marginTop:10,
        textAlign:'center'
    },
    modalText: {
        textAlign: 'center',
        fontSize: 15
    },
    buttonContainer1: {
        // backgroundColor: "#d9534f",
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        margin: 20,
        borderColor: 'transparent'

    },
    buttonLabel: {
        backgroundColor: 'transparent',
        padding: 5
    },
    btnText: {
        color: '#fff',
        fontFamily: 'Avenir Heavy',
        fontSize: 15
    }


});