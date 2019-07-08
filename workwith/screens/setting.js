
import React, { Component, PropTypes } from 'react';
import { View, Modal,AsyncStorage, ScrollView, Switch, Picker, ProgressViewIOS, TouchableOpacity, ToastAndroid, Alert, Image, Text, ImageBackground, TextInput, StyleSheet, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/Octicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import constants from '../common/constants';
import commonstyle from '../common/commonStyles';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Icon, Right, Body, Row } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import { Base_Url,Base_local_Url } from '../constants/common';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

class Setting extends Component {

    constructor(props) {
        super(props);
    }
    state = {
        modalVisible: false,
        switch1Value: false,
    };

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    DeleteModal = () => {
        this.setModalVisible(true);
    }
    CloseModal = () => {
        this.setModalVisible(false);
    }


    createProfile = () => {
        this.props.navigation.navigate("EditProfile2");
    }


    genderPicker = () => {
        //  alert('hit');
        this.setPickerVisible(true);
    }
    gotoCreateProfile = () => {
        this.props.navigation.goBack();
    }
    goToChangePassword = () => {
        this.props.navigation.navigate('ChangePassword');
    }
    goToBlockedList = () => {
        this.props.navigation.navigate('BlockedUsers');
    }

    goToContactUs = () => {
        this.props.navigation.navigate('ContactUs');
    }
     goToBugReport = () => {
        this.props.navigation.navigate('BugReport');
    }
    goToSubscription =()=>{
        this.props.navigation.navigate('Subscription');
    }
    // logout = ()=>{
    //     this.props.navigation.navigate('Login');
    // }
    componentDidMount() {
      AsyncStorage.getItem("user_data").then((value2) => {
          // console.log("daaaaaataaaaaaa",value2)
          let data=JSON.parse(value2);
          this.setState({token: data.data.token})
           // this.getSuggestions( data.data.token)
        }).done(); 
    }



       LogOut = () =>{
    // alert("hiii")
            this.setState({loading: true});
                  fetch(Base_Url+"/logout", {
                        method: "GET",
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
                       console.log("logoutt",response)
                       if(response.status==200){
                         // var data = JSON.parse(response._bodyInit);
                           AsyncStorage.removeItem('user_data', (err, result) => {
                             ToastAndroid.show("Logout Successfully", ToastAndroid.SHORT);
                              this.props.navigation.navigate('Login');
                              
                            });
                         
                         // this.setState({data:data.data,interest:data.data.user_interests})
                         // alert(this.state.data[this.state.currentIndex].email)
                         // console.log("stateee dataaaaa",this.state.data)
                       }
                       else{
                         var errorr = JSON.parse(response._bodyInit);
                         ToastAndroid.show(errorr.message, ToastAndroid.SHORT);
                       }
                     
                    })
     }

  toggleSwitch1 = (value) => {
      this.setState({switch1Value: value})
      console.log('Switch 1 is: ' + value)
   }
    render() {

        return (

            <ImageBackground source={require('../assets/gradient_bg.jpg')} style={{ width: viewportWidth, height: (viewportHeight) }}>
                <Header
                    style={styles.transparentHeader}>
                    <Left style={{ flex: 1 }}>
                        <Button style={{ backgroundColor: 'transparent',elevation:0 }} onPress={this.gotoCreateProfile}>
                        <Image style={{ height: 27, width: 27 }} source={require('../assets/back_icon.png')} />
                        </Button>
                    </Left>
                    <Text style={[commonstyle.bold_text, styles.title]}>Settings</Text>
                    <Right>
                        {/* <Text style={[commonstyle.bold_text, styles.title]}>Cancel</Text> */}
                    </Right>
                </Header>
                <ScrollView>
                 <Spinner
                      visible={this.state.loading}
                     />
                    <View style={styles.container}>
                        <View style={styles.containerView}>
                            <View style={styles.subContainer} >
                                <Text style={styles.content}>
                                    Noifications
                            </Text>
                                <Text style={styles.sub_content}>
                                    you can turn on/off push notifications.
                            </Text>
                            </View>
                            <View style={styles.toggle}>
                                <Switch
                                onValueChange = {this.toggleSwitch1}
                                value = {this.state.switch1Value}
                                />
                            </View>
                        </View>
                        <View style={{ borderWidth: 1, borderBottomColor: '#989898', opacity: 0.1, marginTop: 10 }}>
                        </View>

                        <TouchableOpacity style={styles.containerView}>

                            <View>
                                <TouchableOpacity onPress={this.goToChangePassword}>
                                    <Text style={styles.content}>
                                        Change Password
                            </Text>
                                </TouchableOpacity>
                            </View>

                            <View >
                                <Ionicons name="ios-arrow-forward" size={25} style={{ color: '#fff' }} />
                            </View>

                        </TouchableOpacity>

                        <View style={{ borderWidth: 1, borderBottomColor: '#989898', opacity: 0.1, marginTop: 10 }}>
                        </View>
                        <TouchableOpacity style={styles.containerView}>
                            <View>
                                <TouchableOpacity onPress = {this.goToSubscription}>
                                <Text style={styles.content}>
                                    Subscriptions
                            </Text>
                            </TouchableOpacity>
                            </View>
                            <View >
                                <Ionicons name="ios-arrow-forward" size={25} style={{ color: '#fff' }} />
                            </View>
                        </TouchableOpacity>
                        <View style={{ borderWidth: 1, borderBottomColor: '#989898', opacity: 0.1, marginTop: 10 }}>
                        </View>
                        <TouchableOpacity style={styles.containerView}>
                            <View>
                                <Text style={styles.content}>
                                    Match Preferences
                            </Text>
                            </View>
                            <View >
                                <Ionicons name="ios-arrow-forward" size={25} style={{ color: '#fff' }} />
                            </View>
                        </TouchableOpacity>
                        <View style={{ borderWidth: 1, borderBottomColor: '#989898', opacity: 0.1, marginTop: 10 }}>
                        </View>
                        <TouchableOpacity style={styles.containerView}>
                            <View>
                                <TouchableOpacity onPress={this.goToBlockedList}>
                                    <Text style={styles.content}>
                                        Blocked Users
                            </Text>
                                </TouchableOpacity>
                            </View>
                            <View >
                                <Ionicons name="ios-arrow-forward" size={25} style={{ color: '#fff' }} />
                            </View>
                        </TouchableOpacity>
                        <View style={{ borderWidth: 1, borderBottomColor: '#989898', opacity: 0.1, marginTop: 10 }}>
                        </View>
                        <TouchableOpacity style={styles.containerView}>
                            <View>
                                <Text style={styles.content}>
                                    About Us
                            </Text>
                            </View>
                            <View >
                                <Ionicons name="ios-arrow-forward" size={25} style={{ color: '#fff' }} />
                            </View>
                        </TouchableOpacity>
                        <View style={{ borderWidth: 1, borderBottomColor: '#989898', opacity: 0.1, marginTop: 10 }}>
                        </View>
                        <TouchableOpacity style={styles.containerView}>
                            <View>
                                <TouchableOpacity onPress={this.goToContactUs}>
                                    <Text style={styles.content}>
                                        Contact Us
                            </Text>
                                </TouchableOpacity>
                            </View>
                            <View >
                                <Ionicons name="ios-arrow-forward" size={25} style={{ color: '#fff' }} />
                            </View>
                        </TouchableOpacity>
                        <View style={{ borderWidth: 1, borderBottomColor: '#989898', opacity: 0.1, marginTop: 10 }}>
                        </View>                       
                         <TouchableOpacity style={styles.containerView} onPress={this.goToBugReport}>
                            <View>
                                <TouchableOpacity >
                                    <Text style={styles.content}>
                                        Report a bug
                            </Text>
                                </TouchableOpacity>
                            </View>
                            <View >
                                <Ionicons name="ios-arrow-forward" size={25} style={{ color: '#fff' }} />
                            </View>
                        </TouchableOpacity>
                        <View style={{ borderWidth: 1, borderBottomColor: '#989898', opacity: 0.1, marginTop: 10 }}>
                        </View>
                        <TouchableOpacity style={styles.containerView}>
                            <View>
                                <Text style={styles.content}>
                                    Invite Friends
                            </Text>
                            </View>
                            <View >
                                <Ionicons name="ios-arrow-forward" size={25} style={{ color: '#fff' }} />
                            </View>
                        </TouchableOpacity>
                        <View style={{ borderWidth: 1, borderBottomColor: '#989898', opacity: 0.1, marginTop: 10 }}>
                        </View>
                        <TouchableOpacity style={styles.containerView}>
                            <View>
                                <Text style={styles.content}>
                                    Privacy Policy
                            </Text>
                            </View>
                            <View >
                                <Ionicons name="ios-arrow-forward" size={25} style={{ color: '#fff' }} />
                            </View>
                        </TouchableOpacity>
                        <View style={{ borderWidth: 1, borderBottomColor: '#989898', opacity: 0.1, marginTop: 10 }}>
                        </View>
                        <TouchableOpacity style={styles.containerView}>
                            <View>
                                <Text style={styles.content}>
                                    Terms of Use
                            </Text>
                            </View>
                            <View >
                                <Ionicons name="ios-arrow-forward" size={25} style={{ color: '#fff' }} />
                            </View>
                        </TouchableOpacity>
                        <View style={{ borderWidth: 1, borderBottomColor: '#989898', opacity: 0.1, marginTop: 10 }}>
                        </View>
                        <TouchableOpacity style={styles.containerView} onPress = {this.LogOut}>
                            <View>
                                <TouchableOpacity >
                                <Text style={styles.content}>
                                    Logout
                            </Text>
                            </TouchableOpacity>
                            </View>
                            <View >
                                <Ionicons name="ios-arrow-forward" size={25} style={{ color: '#fff' }} />
                            </View>
                        </TouchableOpacity>
                        <View style={{ borderWidth: 1, borderBottomColor: '#989898', opacity: 0.1, marginTop: 10 }}>
                        </View>
                        <TouchableOpacity style={styles.footer}>
                            <TouchableOpacity>
                                <Text style={styles.delete}>
                                    Disable Account
                            </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.DeleteModal}>
                                <Text style={styles.delete1}>
                                    Delete Account
                            </Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                <Modal
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}
                    transparent={true}>
                    <View style={{
                        flex: 1,
                        padding: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,0.8)'
                    }}>
                        <View style={{
                            width: '100%',
                            height: 'auto',
                            borderRadius: 5,
                            padding: 20,
                            backgroundColor: '#fff'
                        }}>
                            <View style={styles.content_view}>
                                <Text style={styles.modalText}>Delete Account</Text>
                                <Text style={styles.modalText1}>Are you sure you want to delete your account?</Text>
                            </View>
                            <Text style={styles.modalText2}>GIVE A APPROPIRATE REASON</Text>
                            {/* <Image   style={styles.image}
           source={require('../assets/barcode.jpeg')} 
                      /> */}

                            <View style={styles.input_outer}>
                                <TextInput style={{
                                    alignSelf: 'stretch',
                                    alignItems: 'center',
                                    color: '#000',
                                    height: 80,
                                    textAlignVertical: "top",
                                    justifyContent: "flex-start"
                                }}
                                    multiline={true}
                                    underlineColorAndroid='transparent'
                                    numberOfLines={10}
                                    onChangeText={(email) => this.setState({ email })}
                                    autoCapitalize='none'
                                    onSubmitEditing={() => this.password.focus()}
                                    placeholder="Enter Message"
                                    placeholderTextColor='#000' >
                                </TextInput>
                            </View>
                            <View style={styles.down_Button}>
                                <View style={styles.btn}>
                                    <TouchableOpacity style={[commonstyle.btn, commonstyle.linkedin_btn, styles.btn]} onPress={this.CloseModal}>
                                        <Text style={[commonstyle.bold_text, commonstyle.btn_text]}>Submit</Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <Text style={{ textDecorationLine: 'underline', color: '#000', textAlign: 'center', marginTop: 15 }}>Cancel</Text>
                                </View>
                            </View>
                        </View>

                    </View>
                </Modal>
            </ImageBackground>
        );

    }


}



export default Setting;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        padding: 25,
        fontFamily: 'Roboto-Regular',
    },
    title: {
        color: '#fff',
        fontSize: 20,
        alignSelf: 'center'
    },

    transparentHeader: {
        elevation: 0,
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent'
    },

    btn_icon: {
        color: 'white'
    },
    containerView: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'relative'
    },
    subContainer: {
        flexDirection: 'column'
    },
    content: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Roboto-Bold'
    },
    sub_content: {
        color: '#fff'
    },
    toggle: {
        position: 'absolute',
        top: 10,
        right: 0
    },
    footer: {
        marginTop: 20,
        flexDirection: 'row',
        marginBottom: 30
    },
    delete: {
        color: '#fff',
        textDecorationLine: 'underline',
        fontFamily: 'Roboto-Bold'
    },
    delete1: {
        color: '#fff',
        textDecorationLine: 'underline',
        paddingLeft: 20,
        fontFamily: 'Roboto-Bold'
    },
    modalText: {
        textAlign: 'center',
        fontSize: 20,
        color: '#54007c'
    },
    modalText1: {
        marginTop: 5,
        textAlign: 'center',
        fontSize: 15,
        color: '#000',
        fontFamily: 'Roboto-Bold'
    },
    modalText2: {
        fontSize: 12,
        color: '#989898',
        fontFamily: 'Roboto-Bold'
    },
    buttonContainer1: {
        // backgroundColor: "#d9534f",
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 20,
        marginRight: 20,
        marginLeft: 20,
        borderColor: 'transparent'

    },
    content_view: {
        padding: 20,
        textAlign: 'center'
    },
    btn: {
        borderRadius: 60,
        color: '#488aff',
        position: 'relative',
        marginTop: 10,
        height: 45,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    down_Button: {
        padding: 10,
        justifyContent: 'space-between'
    },
    input_outer: {
        padding: 10,
        flexDirection: 'row',
        alignSelf: 'stretch',
        borderBottomWidth: 1,
        // borderColor: 'rgba(0,172,176,0.3)',
        backgroundColor: 'transparent',
        borderBottomColor: '#000',
        opacity: 0.5
    },
});