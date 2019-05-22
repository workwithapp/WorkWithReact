
import React, { Component, PropTypes } from 'react';
import { View, Picker, ProgressViewIOS, TouchableOpacity, ToastAndroid, Alert, Image, Text, ImageBackground, TextInput, StyleSheet, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/Octicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import constants from '../common/constants';
import commonstyle from '../common/commonStyles';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Icon, Right, Body, Row } from 'native-base';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

class ChangePassword extends Component {
    state = {
        PickerVisible: false,
    };

    setPickerVisible(visible) {
        this.setState({ PickerVisible: visible });
    }
    constructor(props) {
        super(props);
    }

    createProfile = () => {
        this.props.navigation.navigate("CreateProfile2");
    }

    genderPicker = () => {
        //  alert('hit');
        this.setPickerVisible(true);
    }
    gotoCreateProfile = () => {
        this.props.navigation.goBack();
    }
    changePassword = () =>{
        this.props.navigation.goBack();
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
                    <Text style={[commonstyle.bold_text, styles.title]}>Change Password</Text>
                    <Right></Right>
                </Header>
                <View style={styles.sub_conatainer}>
                    <View style={styles.input_outer}>
                        <TextInput style={{
                            alignSelf: 'stretch',
                            alignItems: 'center',
                            color: '#000',
                            paddingLeft:5,
                            paddingBottom:10
                        }}
                            onChangeText={(email) => this.setState({ email })}
                            selectionColor={'white'}
                            autoCapitalize='none'
                            returnKeyType="next"
                            onSubmitEditing={() => this.password.focus()}
                            keyboardType='email-address'
                            underlineColorAndroid='transparent'
                            placeholder="Enter Old Password"
                            placeholderTextColor='#000' >
                        </TextInput>
                    </View>
                    <View style={styles.input_outer}>
                        <TextInput style={{
                            alignSelf: 'stretch',
                            alignItems: 'center',
                            color: '#000',
                            paddingLeft:5,
                            paddingBottom:10
                        }}
                            onChangeText={(email) => this.setState({ email })}
                            selectionColor={'white'}
                            autoCapitalize='none'
                            returnKeyType="next"
                            onSubmitEditing={() => this.password.focus()}
                            underlineColorAndroid='transparent'
                            placeholder="Enter New Password"
                            placeholderTextColor='#000' >
                        </TextInput>
                    </View>
                    <View style={styles.input_outer}>
                        <TextInput style={{
                            alignSelf: 'stretch',
                            alignItems: 'center',
                            color: '#000',
                            paddingLeft:5,
                            paddingBottom:10
                        }}
                            onChangeText={(email) => this.setState({ email })}
                            selectionColor={'white'}
                            autoCapitalize='none'
                            returnKeyType="next"
                            onSubmitEditing={() => this.password.focus()}
                            underlineColorAndroid='transparent'
                            placeholder="Re-Enter New Password"
                            placeholderTextColor='#000' >
                        </TextInput>
                    </View>
                    <View style={styles.btn}>
                        <TouchableOpacity style={[commonstyle.btn, commonstyle.linkedin_btn, styles.btn]} onPress={this.changePassword}>
                            <Text style={[commonstyle.bold_text, commonstyle.btn_text]}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );

    }


}



export default ChangePassword;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        color: '#fff',
        fontSize: 20,
        alignSelf: 'center'
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
    },
    sub_conatainer: {
        height: viewportHeight,
        width: viewportWidth,
        padding: 25

    },
    transparentHeader: {
        elevation: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#488aff',
        borderBottomColor: 'transparent'
    },
    btn_icon: {
        color: 'white'
    },
    textInput: {

    },
    input_outer: {
        marginTop: 30,
        flexDirection: 'row',
        alignSelf: 'stretch',
        borderBottomWidth: 1,
        // borderColor: 'rgba(0,172,176,0.3)',
        backgroundColor: 'transparent',
        borderBottomColor: '#000',
        opacity: 0.5
    },
    input_icon: {
        // position:'absolute',
        // Right:5,
        alignItems: 'center',
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
    cameraLogo: {
        color: '#000',
        alignSelf: 'center'
    },
    progressBar1: {
        height: 5,
        width: 100,
        backgroundColor: '#3179ff',
        borderRadius: 2
    }

});