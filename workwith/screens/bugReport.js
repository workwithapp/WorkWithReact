import React, { Component, PropTypes } from 'react';
import { View, ScrollView,KeyboardAvoidingView, TouchableOpacity, ToastAndroid, Alert, Image, Text, ImageBackground, TextInput, StyleSheet, Dimensions,AsyncStorage } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather'
import constants from '../common/constants';
import commonstyle from '../common/commonStyles';
import { Dropdown } from 'react-native-material-dropdown';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Spinner from 'react-native-loading-spinner-overlay';
import { Base_Url,Base_local_Url } from '../constants/common';
// import RNPickerSelect from 'react-native-picker-select';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Icon, Right, Body } from 'native-base';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

class BugReport extends Component {

    static navigationOptions = {
        header: {
            visible: false,
        }
    };

    constructor() {
        super();
        this.state = {
            email:'',
            subject:'',
            message:'',
            errorFalse:false,
            subjectFalse:false,
            messageFalse:false,
            items: [],
            activeItem: 0,
        }
         this.inputs = {};
        this.focusNextField = this.focusNextField.bind(this);
    }

    componentDidMount() {
      AsyncStorage.getItem("user_data").then((value2) => {
          // console.log("daaaaaataaaaaaa",value2)
          let data=JSON.parse(value2);
          this.setState({token: data.data.token})
           // this.getSuggestions( data.data.token)
        }).done(); 
    }

    gotoCreateProfile = () => {
        this.props.navigation.goBack();
    }
    contactUs = ()=>{
        this.props.navigation.goBack();
    }

    reportBug = () =>{
    	if(!this.state.email){this.setState({errorFalse: true})}
       else{this.setState({errorFalse: false})}
       if(!this.state.subject){this.setState({subjectFalse: true})}
       else{this.setState({subjectFalse: false})}
       	if(!this.state.message){this.setState({messageFalse: true})}
       else{this.setState({messageFalse: false})
            this.setState({loading: true});
                  fetch(Base_Url+"/report_bug", {
                        method: "POST",
                        body: JSON.stringify({
                            email: this.state.email,
                            subject: this.state.subject,
                            message:this.state.message,
                            device_type: 'A',
                            version: '1.0' 
                        }),
                        headers: {
                            'accept': 'application/json',
                            'Content-Type': 'application/json',
                            'device-type':'A',
                            'version' : '1.0',
                            'token':this.state.token
                        }

                    })
                    .then((response) =>
                    {
                      this.setState({loading: false});
                       console.log("buggg",response)
                       if(response.status==200){
                       	ToastAndroid.show("Bug has been reported successfully.");
                         this.props.navigation.goBack();
                       }
                       else{
                         var errorr = JSON.parse(response._bodyInit);
                         ToastAndroid.show(errorr.message, ToastAndroid.SHORT);
                       }
                     
                    })
                }
     }
      focusNextField(id) {
    this.inputs[id].focus();
    }

    render() {


        return (
            <View style={styles.container}>
                <Header
                    style={styles.transparentHeader}>
                    <Left style={{ flex: 1 }}>
                        <Button style={{ backgroundColor: 'transparent',elevation:0 }} onPress={this.gotoCreateProfile}>
                        <Image style={{ height: 27, width: 27 }} source={require('../assets/back_icon.png')} />
                        </Button>
                    </Left>
                    <Text style={{ color: '#fff', fontSize: 18 }}>Report A Bug</Text>
                    <Right>
                    </Right>
                </Header>
                <ScrollView>
                <Spinner overlayColor='transparent'
                      visible={this.state.loading}
                     />
                <KeyboardAvoidingView behavior="padding" enabled >
                    <View style={styles.containerVIew}>
                        <View style={styles.content_view}>
                          
                         
                            <View style={styles.inner_content}>
                                <Text style={{ color: '#54007c', textAlign: 'center' }}>We are here to answer any questions you have about our services, as well as assist with any issues. Please fill out this form and we will respond promptly.
                                </Text>
                            </View>

                            <View style={styles.input_outer}>
                                <TextInput style=
                                {{
                                    alignSelf: 'stretch',
                                    alignItems: 'center',
                                    color: '#000',
                                    paddingLeft:5,
                                    paddingBottom:10

                                }}
                                    onChangeText={(email) => this.setState({ email })}
                                    autoCapitalize='none'
                                    blurOnSubmit={false}
                                    returnKeyType="next"
                                    value={this.state.email}
                                    onSubmitEditing={() => this.subject.focus()}
                                    keyboardType='email-address'
                                    underlineColorAndroid='transparent'
                                    placeholder="Enter Email Address"
                                    placeholderTextColor='#000' >
                                </TextInput>
                            </View>
                            {this.state.errorFalse?<Text style={{color:'red'}}>Email is Required</Text>:null}
                            <View style={[styles.input_outer,{marginTop:10}]}>
                                <TextInput style={{
                                    alignSelf: 'stretch',
                                    alignItems: 'center',
                                    color: '#000',
                                    paddingLeft:5,
                                    paddingBottom:10
                                }}
                                    onChangeText={(subject) => this.setState({ subject })}
                                    autoCapitalize='none'
                                     blurOnSubmit={false}
			                        ref={(input) => { this.subject = input; }}
                                    value={this.state.subject}
                                    returnKeyType="next"
                                    onSubmitEditing={() => this.message.focus()}
                                    underlineColorAndroid='transparent'
                                    placeholder="Enter Subject"
                                    placeholderTextColor='#000' >
                                </TextInput>
                            </View>
                            {this.state.subjectFalse?<Text style={{color:'red'}}>Subject is Required</Text>:null}
                            <View style={styles.input_outer}>
                                <TextInput style={{
                                    alignSelf: 'stretch',
                                    alignItems: 'center',
                                    color: '#000',
                                    height: 80,
                                    paddingLeft:5,
                                    textAlignVertical: "top",
                                    justifyContent: "flex-start"
                                }}
                                    multiline={true}
			                        ref={(input) => { this.message = input; }}
			                        blurOnSubmit={ true }
                                    value={this.state.message}
                                    underlineColorAndroid='transparent'
                                    numberOfLines={10}
                                    onChangeText={(message) => this.setState({ message })}
                                    autoCapitalize='none'
                                    placeholder="Enter Message"
                                    placeholderTextColor='#000' >
                                </TextInput>
                            </View>
                            {this.state.messageFalse?<Text style={{color:'red'}}>Message is Required</Text>:null}
                            <View style={styles.btn}>
                                <TouchableOpacity style={[commonstyle.btn, commonstyle.linkedin_btn, styles.btn]} onPress={this.reportBug}>
                                    <Text style={[commonstyle.bold_text, commonstyle.btn_text]}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>

        )
    }

}

export default BugReport;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    transparentHeader: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#488aff',
        borderBottomColor: 'transparent'
    },
    btn_icon: {
        color: 'white',
        elevation: 0,
    },
    containerVIew: {
        padding: 15,
        height: viewportHeight,
        width: viewportWidth
    },
    content_view: {
        padding: 10,
        backgroundColor: '#fff'
    },
    contnet: {
        marginTop: 10,
        flexDirection: 'row',
        position: 'relative'
    },
    right_content: {
        flexDirection: 'column',
        paddingLeft: 40
    },
    phone_content: {
        color: '#54007c',
        fontSize: 18
    },
    card: {
        // marginTop:10,
        fontFamily: 'Roboto-Regular',
        height: 260,
        width: '100%',
        borderRadius: 5,
        backgroundColor: '#000',
        position: 'relative'
    },
    dots: {
        paddingLeft: 10,
        paddingRight: 10,
        alignSelf: 'flex-end'
    },
    dotSetting: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
    },
    cardOuter: {
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    cardProfile: {
        height: 100,
        width: 100,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 50,
        marginLeft: 35,
        marginRight: 35,
        backgroundColor: '#fff'
    },
    cardInner: {
        justifyContent: 'center',
        backgroundColor: '#11ad3d',
        alignItems: 'center',
        height: 35,
        width: 70,
        borderRadius: 5
    },
    profileData: {
        marginTop: 15,
        alignItems: 'center'
    },
    view_profile: {
        flexDirection: 'row'
    },
    divider: {
        borderWidth: 1,
        borderBottomColor: '#000',
        opacity: 0.1,
        marginTop: 10

    },
    inner_content: {
        padding: 20
    },
    input_outer: {
        marginTop:25,
        flexDirection: 'row',
        alignSelf: 'stretch',
        borderBottomWidth: 1,
        // borderColor: 'rgba(0,172,176,0.3)',
        backgroundColor: 'transparent',
        borderBottomColor: '#000',
        opacity: 0.5
    },
    btn: {
        borderRadius: 60,
        color: '#488aff',
        position: 'relative',
        marginTop: 20,
        height: 45,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }

})