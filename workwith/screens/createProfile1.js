
import React, { Component, PropTypes } from 'react';
import { View, Picker,KeyboardAvoidingView,ScrollView, ProgressViewIOS, TouchableOpacity, ToastAndroid, Alert, Image, Text, ImageBackground, TextInput, StyleSheet, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/Octicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import constants from '../common/constants';
import commonstyle from '../common/commonStyles';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Icon, Right, Body, Row } from 'native-base';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
let name,image,gender,birth,about;
class CreateProfile1 extends Component {
    
    state = {
        PickerVisible: false,
        name:"",
        image:"",
        gender:"",
        birth:"",
        about:"",
        errTypes: []
    };

    setPickerVisible(visible) {
        this.setState({ PickerVisible: visible });
    }
    constructor(props) {
        super(props);
    }

    createProfile = () => {
           var errTypes =[];
       if(!this.state.title) {
            errTypes.push('title')
        }
        if(!this.state.projects) {
          errTypes.push('projects')
        }
       if(!errTypes.length) {
             const { title,projects }=this.state;
            this.props.navigation.navigate("CreateProfile2",{title:title,projects:projects,name:name,image:image,gender:gender,birth:birth,about:about});
       }
       else{
        this.setState({errTypes: errTypes});
       }
    }

    genderPicker = () => {
        this.setPickerVisible(true);
    }
    gotoCreateProfile = () => {
        this.props.navigation.goBack();
    }

         componentWillMount() {
              const { navigation } = this.props;
              console.log("nameee",navigation.getParam('name'))
                name=navigation.getParam('name');
                image=navigation.getParam('image');
                gender=navigation.getParam('lang');
                birth=navigation.getParam('birth');
                about=navigation.getParam('about');
               console.log("name",name)
                console.log("image",image)
                 console.log("gender",gender)
                  console.log("birth",birth)
                  console.log("about",about)
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
                    <Text style={[commonstyle.bold_text, styles.title]}>Create Profile</Text>
                    <Right></Right>
                </Header>
                <ScrollView>
                    <KeyboardAvoidingView behavior="padding" enabled >
                <View style={styles.container}>

                    <View style={{ height: 5, width: 200, borderRadius: 2, flexDirection: 'row', marginTop: 30, backgroundColor: '#fff' }}>
                        <View style={styles.progressBar1}>
                        </View>
                        <View style={styles.progressBar2}>
                        </View>
                    </View>

                    <Text style={{ color: '#fff', fontSize: 15, alignSelf: 'center', marginTop: 10, marginBottom: 30 }}>2/3</Text>

                    <View style={styles.input_outer}>
                        <TextInput style={{
                            alignSelf: 'stretch',
                            alignItems: 'center',
                            color: 'white',
                           fontSize: 15,
                            paddingLeft: 10,
                            paddingBottom:10
                        }}
                            onChangeText={(title) => this.setState({ title })}
                            selectionColor={'white'}
                            autoCapitalize='words' 
                            returnKeyType="next"
                            underlineColorAndroid='transparent'
                            placeholder="Enter Job Title"
                            placeholderTextColor='white' >
                        </TextInput>
                    </View>
                       <View style={{flexDirection:'row', width:'100%'}}>
                       {this.state.errTypes.map((item) => (
                          item == 'title' ?  <Text style={{fontSize:12, color: 'red', marginLeft:10}}>Job Title is required</Text> : null
                        ))}
                     </View>
                    <View style={styles.input_outer}>
                        <TextInput style={{
                            alignSelf: 'stretch',
                            alignItems: 'center',
                            color: 'white',
                            fontSize: 15,
                            paddingLeft: 10,
                            paddingBottom:10
                        }}
                            onChangeText={(projects) => this.setState({ projects })}
                            selectionColor={'white'}
                             autoCapitalize='words' 
                            returnKeyType="next"
                            underlineColorAndroid='transparent'
                            placeholder="Projects and activities you’re working on"
                            placeholderTextColor='white' >
                        </TextInput>
                    </View>
                      <View style={{flexDirection:'row', width:'100%'}}>
                       {this.state.errTypes.map((item) => (
                          item == 'projects' ?  <Text style={{fontSize:12, color: 'red', marginLeft:10}}>Projects are required</Text> : null
                        ))}
                     </View>
                    <TouchableOpacity style={[styles.btn, commonstyle.white_btn]} onPress={this.createProfile}>
                        <Text style={[commonstyle.btn_text, { color: constants.BLUE }, commonstyle.bold_text]}>Continue</Text>
                    </TouchableOpacity>
                </View>
                </KeyboardAvoidingView>
                </ScrollView>
            </ImageBackground>
        );

    }


}



export default CreateProfile1;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height:'100%',
        alignItems: 'center',
        padding: 35,
        fontFamily: 'Roboto-Regular',
    },
    title: {
        color: '#fff',
        fontSize: 20,
        alignSelf: 'center'
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

    },
    input_outer: {
        marginTop:30,
        flexDirection: 'row',
        alignSelf: 'stretch',
        borderBottomWidth: 1,
        borderColor: 'rgba(0,172,176,0.3)',
        backgroundColor: 'transparent',
        borderBottomColor: 'white'
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