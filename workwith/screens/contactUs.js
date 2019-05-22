import React, { Component, PropTypes } from 'react';
import { View, ScrollView,KeyboardAvoidingView, TouchableOpacity, ToastAndroid, Alert, Image, Text, ImageBackground, TextInput, StyleSheet, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather'
import constants from '../common/constants';
import commonstyle from '../common/commonStyles';
import { Dropdown } from 'react-native-material-dropdown';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import RNPickerSelect from 'react-native-picker-select';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Icon, Right, Body } from 'native-base';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

class ContactUs extends Component {

    static navigationOptions = {
        header: {
            visible: false,
        }
    };

    constructor() {
        super();
        this.state = {

            items: [],
            activeItem: 0,
        }
    }

    componentDidMount() {

    }
    gotoCreateProfile = () => {
        this.props.navigation.goBack();
    }
    contactUs = ()=>{
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
                    <Text style={{ color: '#fff', fontSize: 18 }}>Contact Us</Text>
                    <Right>
                    </Right>
                </Header>
                <ScrollView>
                <KeyboardAvoidingView behavior="padding" enabled >
                    <View style={styles.containerVIew}>
                        <View style={styles.content_view}>
                            <View style={styles.contnet}>
                                <Feather name="phone" size={25} style={{ color: '#54007c', position: 'absolute', top: 4, left: 0 }} />
                                <View style={styles.right_content}>
                                    <Text style={styles.phone_content}>
                                        Phone
                                </Text>
                                    <Text style={{ color: '#000' }}>
                                        (123) 456-7890
                                </Text>
                                </View>
                            </View>

                            <View style={styles.contnet}>
                                <Octicons name="mail" size={25} style={{ color: '#54007c', position: 'absolute', top: 4, left: 0 }} />
                                <View style={styles.right_content}>
                                    <Text style={styles.phone_content}>
                                        Email
                                </Text>
                                    <Text style={{ color: '#000' }}>
                                        workwith-support@gmail.com
                                </Text>
                                </View>
                            </View>

                            <View style={styles.contnet}>
                                <SimpleLineIcons name="location-pin" size={25} style={{ color: '#54007c', position: 'absolute', top: 4, left: 0 }} />
                                <View style={styles.right_content}>
                                    <Text style={styles.phone_content}>
                                        Address
                                </Text>
                                    <Text style={{ color: '#000' }}>
                                        202 main town,california,USA 190001
                                </Text>
                                </View>
                            </View>
                            <View style={styles.inner_content}>
                                <Text style={{ color: '#54007c', textAlign: 'center' }}>We are here to answer any questions you have about our services, as well as assist with any issues. Please fill out this form and we will respond promptly.
                                </Text>
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
                                    autoCapitalize='none'
                                    returnKeyType="next"
                                    onSubmitEditing={() => this.password.focus()}
                                    keyboardType='email-address'
                                    underlineColorAndroid='transparent'
                                    placeholder="Enter Email Address"
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
                                    autoCapitalize='none'
                                    returnKeyType="next"
                                    onSubmitEditing={() => this.password.focus()}
                                    keyboardType='email-address'
                                    underlineColorAndroid='transparent'
                                    placeholder="Enter Subject"
                                    placeholderTextColor='#000' >
                                </TextInput>
                            </View>
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
                                    underlineColorAndroid='transparent'
                                    numberOfLines={10}
                                    onChangeText={(email) => this.setState({ email })}
                                    autoCapitalize='none'
                                    onSubmitEditing={() => this.password.focus()}
                                    placeholder="Enter Message"
                                    placeholderTextColor='#000' >
                                </TextInput>
                            </View>
                            <View style={styles.btn}>
                                <TouchableOpacity style={[commonstyle.btn, commonstyle.linkedin_btn, styles.btn]} onPress={this.contactUs}>
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

export default ContactUs;

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