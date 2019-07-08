
import React, { Component, PropTypes } from 'react';
import { View, Picker, ProgressViewIOS,AsyncStorage, TouchableOpacity, ToastAndroid, Alert, Image, Text, ImageBackground, TextInput, StyleSheet, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/Octicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import constants from '../common/constants';
import commonstyle from '../common/commonStyles';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Icon, Right, Body, Row } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import { Base_Url } from '../constants/common';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

let name,image,gender,birth,about;
class EditProfile1 extends Component {
    state = {
        PickerVisible: false,
    };

    setPickerVisible(visible) {
        this.setState({ PickerVisible: visible });
    }
    constructor(props) {
        super(props);
        this.state={
            title:'',
            project:''
        }
    }

    createProfile = () => {
        const { title,project }=this.state;
         this.props.navigation.navigate("EditProfile2",{title:title,projects:project,name:name,image:image,gender:gender,birth:birth,about:about});
    }

    genderPicker = () => {
        //  alert('hit');
        this.setPickerVisible(true);
    }
    gotoCreateProfile = () => {
        this.props.navigation.goBack();
    }

    componentWillMount() {
        let title,project;
         AsyncStorage.getItem("user_data").then((value) => {
          console.log("daaaaaataaaaaaa",value)
          if (value !== null) {
          let data=JSON.parse(value);
          this.setState({token:data.data.token})
          }
        }).done();
              const { navigation } = this.props;
              console.log("nameee",navigation.getParam('name'))
                name=navigation.getParam('name');
                image=navigation.getParam('profile');
                gender=navigation.getParam('gender');
                birth=navigation.getParam('dob');
                about=navigation.getParam('bio');
                title=navigation.getParam('title');
                project=navigation.getParam('project');
                // alert(project)
                this.setState({title:title,project:project})
    }

       updateProfile = () => {
          this.setState({loading: true});
            var photo;
           if(image) {
             photo = {
                  uri: image,
                  type: 'image/jpeg',
                  name: 'photo.jpg',
              };
            }
            else {
                photo = ''
            }
              var data = new FormData();
              data.append('name',name);
              data.append('gender', gender);
              data.append('dob', birth);
              data.append('bio', about);
              data.append('job_title', this.state.title);
              data.append('project', this.state.project);
              data.append('devicetype', 'A');
              data.append('appversion', '1.0');
              data.append('token', this.state.token);
          
              fetch(Base_Url+"/updateProfile", {
                method: "POST",
                headers: {
                    'accept': 'application/json',            
                    'token': this.state.token,
                    'device-type':'A',
                    'version' : '1.0'
                },
                body: data
            })
            .then((response) =>
            {
              this.setState({loading: false});
               console.log(response)
               if(response.status==200){
                 var data = JSON.parse(response._bodyInit);
                   ToastAndroid.show(data.message, ToastAndroid.SHORT);
                   
                   this.props.navigation.navigate("Suggested");
                  
               }
               else{
                 ToastAndroid.show('An error occured, try again later', ToastAndroid.SHORT);
               }
             
            })
     

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
                    <Text style={[commonstyle.bold_text, styles.title]}>Edit Profile</Text>
                    <Right>
                        <TouchableOpacity onPress={this.gotoCreateProfile}>
                        <Text style={[commonstyle.bold_text, styles.title]}>Cancel</Text>
                    </TouchableOpacity>
                    </Right>
                </Header>
                <View style={styles.container}>
                   <Spinner
                      visible={this.state.loading}
                     />
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
                            paddingLeft:5,
                            paddingBottom:10
                        }}
                            onChangeText={(title) => this.setState({ title })}
                            selectionColor={'white'}
                            autoCapitalize='none'
                            returnKeyType="next"
                            value = {this.state.title}
                            underlineColorAndroid='transparent'
                            placeholder="Enter Job Title"
                            placeholderTextColor='white' >
                        </TextInput>
                    </View>
                    <View style={styles.input_outer}>
                        <TextInput style={{
                            alignSelf: 'stretch',
                            alignItems: 'center',
                            color: 'white',
                            paddingLeft:5,
                            paddingBottom:10
                        }}
                            onChangeText={(project) => this.setState({ project })}
                            autoCapitalize='none'
                            selectionColor={'white'}
                            returnKeyType="next"
                            value = {this.state.project}
                            underlineColorAndroid='transparent'
                            placeholder="Project & Activities user working on"
                            placeholderTextColor='white' >
                        </TextInput>
                    </View>
                    <View style = {styles.btn}>
                        <TouchableOpacity style={[styles.btn, commonstyle.white_btn]} onPress={this.createProfile}>
                            <Text style={[commonstyle.btn_text, { color: constants.BLUE }, commonstyle.bold_text]}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.save_btn}>
                        <TouchableOpacity style={[styles.btn, commonstyle.white_btn]} onPress={this.updateProfile}>
                            <Text style={[commonstyle.btn_text, { color: constants.BLUE }, commonstyle.bold_text]}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        );

    }


}



export default EditProfile1;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 25,
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
    save_btn:{
        borderRadius: 60,
        color: '#fff',
        position: 'relative',
        marginTop: 10,
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
        marginTop: 30,
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