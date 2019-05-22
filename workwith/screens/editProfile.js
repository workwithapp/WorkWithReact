
import React, { Component, PropTypes } from 'react';
import { View, ScrollView,AsyncStorage, KeyboardAvoidingView, Picker, TouchableOpacity, ToastAndroid, Alert, Image, Text, ImageBackground, TextInput, StyleSheet, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/Octicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import ImagePicker from 'react-native-image-picker';
import constants from '../common/constants';
import commonstyle from '../common/commonStyles';
import ActionSheet from 'react-native-actionsheet';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Icon, Right, Body, Row } from 'native-base';
import { Base_Url } from '../constants/common';
import ModalDropdown from 'react-native-modal-dropdown';
import Spinner from 'react-native-loading-spinner-overlay';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

class EditProfile extends Component {
    state = {
        PickerVisible: false,
        birth:"Select Date of Birth",
        errTypes: []
    };

    setPickerVisible(visible) {
        this.setState({ PickerVisible: visible });
    }

    constructor(props) {
        super(props);
    }
    showActionSheet = () => {
          this.ActionSheet.show()
    }

     openCamera = (index) => {
    
           const options = {
              title: 'Select Avatar',
              storageOptions: {
                skipBackup: true,
              },
            };

       if(index == 0) {
            ImagePicker.launchCamera(options, (response) => {
                         let source1 = response.uri ;
                         let source = { uri: 'data:image/jpeg;base64,' + response.data };

                        this.setState({
                          profile_image: source,
                          profile_image_send: source1
                        });
            });
       }
       else if(index == 1) {
           ImagePicker.launchImageLibrary(options, (response) => {
               console.log('Response = ', response);
                    let source1 = response.uri ;
                         let source = { uri: 'data:image/jpeg;base64,' + response.data };

                        this.setState({
                          profile_image: source,
                          profile_image_send: source1
                        });
            });
       }   
      
    }
 
 _showDatePicker = () => this.setState({ isDatePickerVisible: true });

  _hideDatePicker = () => this.setState({ isDatePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log(date)
    this._hideDatePicker();
       this.setState({ birth : date.getFullYear() +  '-' + (date.getMonth()+1) + '-' + date.getDate() }); 
  };


    componentDidMount() {
      AsyncStorage.getItem("user_data").then((value) => {
          console.log("daaaaaataaaaaaa",value)
          if (value !== null) {
          let data=JSON.parse(value);
          this.getProfile(data.data.token)
          this.setState({token:data.data.token})
          }
        }).done();
        
    }

      getProfile = (token) =>{
                   this.setState({loading: true});
                  fetch(Base_Url+"/getProfile", {
                        method: "GET",
                        headers: {
                            'accept': 'application/json',
                            'Content-Type': 'application/json',
                            'device-type':'A',
                            'version' : '1.0',
                            'token': token,
                        }

                    })
                    .then((response) =>
                    {
                      this.setState({loading: false});
                       console.log("profillllleeeeee",response)
                       if(response.status==200){
                         var data = JSON.parse(response._bodyInit);
                        this.setState({
                            data:data.data,
                            name:data.data.name,
                            gender:data.data.gender,
                            birth:data.data.dob,
                            bio:data.data.bio,
                            profile:data.data.profile_pic,
                            title:data.data.job_title,
                            project:data.data.project
                        })
                        if(data.data.gender='M'){
                          this.setState({gender:'Male'})
                        }
                        else{
                          this.setState({gender:'Female'})
                        }
                         if(this.state.name== 'undefined' || this.state.name== 'null'){
                             this.setState({name:""})
                         }
                          if(this.state.gender== 'undefined' || this.state.name== 'null'){
                             this.setState({gender:""})
                         }
                          if(this.state.birth== 'undefined' || this.state.birth== 'null'){
                             this.setState({birth:""})
                         }  
                         if(this.state.bio== 'undefined' || this.state.bio== 'null'){
                             this.setState({bio:""})
                         }
                       }
                       else{
                        ToastAndroid.show(data.message, ToastAndroid.SHORT);
                       }
                     
                    })
                  }

    gotoLogin = () => {
        this.props.navigation.navigate("Login");
    }


    genderPicker = () => {
        //  alert('hit');
        this.setPickerVisible(true);
    }
    changeProfile = () => {

    }
    completeProfile = () => {
        this.props.navigation.navigate("EditProfile1",{name:this.state.name,gender:this.state.gender,dob:this.state.birth,bio:this.state.bio,profile:this.state.profile_image_send,title:this.state.title,project:this.state.project});
    }

       updateProfile = () => {
          this.setState({loading: true});
            var photo;
           if(this.state.profile_image_send) {
             photo = {
                  uri: this.state.profile_image_send,
                  type: 'image/jpeg',
                  name: 'photo.jpg',
              };
            }
            else {
                photo = ''
            }
              var data = new FormData();
              data.append('name', this.state.name);
              data.append('gender', this.state.gender);
              data.append('dob', this.state.birth);
              data.append('bio', this.state.bio);
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


     _dropdown_6_onSelect(idx, value) {
      // alert(value)
      if(value=="Male"){
        this.setState({ gender: "M" })

      }
      else if(value=="Female"){
        this.setState({ gender: "F" })

      }
      else{
        this.setState({ gender: "O" })

      }
   
      // this.setState({
      //   dropdown_6_icon_heart: !this.state.dropdown_6_icon_heart,
      // })
     }

    _dropdown_5_show() {
      // alert("hiiii")
        this._dropdown_5 && this._dropdown_5.show();
    }


  gotoBack = () => {
        this.props.navigation.goBack();
    }
    render() {
   
        return (

            <ImageBackground source={require('../assets/gradient_bg.jpg')} style={{ width: viewportWidth, height: (viewportHeight),paddingBottom:30 }}>
                 <ScrollView>
                <Header
                    style={styles.transparentHeader}>
                    <Left style={{ flex: 1 }}>
                        <TouchableOpacity onPress={this.gotoBack}>
                            <Text style={[commonstyle.bold_text, styles.title]}>Cancel</Text>
                        </TouchableOpacity>
                    </Left>

                    <TouchableOpacity style={{marginTop:5}}>
                        <Text style={[commonstyle.bold_text, styles.header_title]}>Edit Profile</Text>
                    </TouchableOpacity>

                    <Right>
                    </Right>
                </Header>
               
                    <KeyboardAvoidingView behavior="padding" enabled >
                        <View style={styles.container}>
                         <Spinner
                      visible={this.state.loading}
                     />

                            <View style={{ height: 100, width: 100, borderRadius: 50, backgroundColor: '#fff', alignContent: 'center', justifyContent: 'center' }} onPress={this.changeProfile}>
                             <Button style={{ backgroundColor: 'transparent', elevation: 0 }} onPress={this.showActionSheet}>
                               {this.state.profile && !this.state.profile_image?<Image style={{ height: 100, width: 100, borderRadius: 50 }} source={{uri:this.state.profile}} onPress={this.showActionSheet}/>:(this.state.profile_image ? <Image style={{ height: 100, width: 100, borderRadius: 50 }} source={this.state.profile_image} onPress={this.showActionSheet}/>:
                               <Image style={{ height: 100, width: 100, borderRadius: 50 }} source={require('../assets/user1.png')} onPress={this.showActionSheet}/>)}
                             </Button>

                            </View>
                            <Text style={{ alignSelf: 'center', paddingTop: 10, color: '#fff' }}>Change Profile Picture</Text>
                            <View style={styles.input_outer}>
                                {/* <Icons name="mail" size={25}  style={commonstyle.input_icon}/> */}
                                {/* <FontAwesome name="envelope-o" size={20}  style={styles.input_icon} /> */}
                                <TextInput style={{
                                    alignSelf: 'stretch',
                                    alignItems: 'center',
                                    color: 'white',
                                    paddingLeft:15,
                                    paddingBottom:10
                                }}
                                    onChangeText={(name) => this.setState({ name })}
                                    selectionColor={'white'}
                                    autoCapitalize='none'
                                    placeholder="Enter Name"
                                    placeholderTextColor='white'
                                    returnKeyType="next"
                                    value={this.state.name}
                                    keyboardType='email-address'
                                    underlineColorAndroid='transparent'>
                                </TextInput>
                            </View>
                            <View style={{
                                alignSelf: 'stretch',
                                alignItems: 'center',
                                color: 'white',
                                height: 45,
                                width: '100%',
                                backgroundColor: '#fff',
                                marginTop: 10,
                                flexDirection: 'row',
                                borderBottomWidth: 1,
                                borderColor: 'rgba(0,172,176,0.3)',
                                backgroundColor: 'transparent',
                                borderBottomColor: 'white',
                            }}>
                              <ModalDropdown 
                              ref={el => this._dropdown_5 = el}
                                defaultValue={this.state.gender}
                                style={{ 
                                width: '100%'}}
                                           ref={ref => {
                                                  this.modall = ref
                                           }}
                                          textStyle={{ color: '#fff',
                                            fontSize: 15,
                                            padding: 15,
                                            paddingLeft: 0,
                                            width: '100%',
                                            }}
                                             onSelect={(idx, value) => this._dropdown_6_onSelect(idx, value)}
                                            dropdownTextStyle= {{ color: '#737373',
                                            fontSize: 13,
                                            padding: 15,
                                            paddingTop: 18,
                                            paddingBottom: 18,
                                            paddingLeft: 0,
                                            width: '100%',
                                            marginLeft: 10}}
                                            dropdownStyle= {{ width: '80%', height: 100, backgroundColor: '#fff', borderWidth: 1, borderColor: '#737373'}} 
                                            options={['Male', 'Female','Other']}/>
                                             <Ionicons name="ios-arrow-down" size={25} style={styles.input_icon} onPress={this._dropdown_5_show}/>
                            </View>

                           <TouchableOpacity style={[styles.input_outer,{height:50,marginTop: 10,alignSelf: 'stretch', padding: 10,
                                alignItems: 'center',}]} onPress={this._showDatePicker}>
                                <Text style={{color:"white",paddingBottom:10, fontSize: 16, marginTop: 13}}>{this.state.birth}</Text>
                               
                                <EvilIcons name="calendar" size={25} style={styles.input_icon} />
                            </TouchableOpacity>

                            <View style={styles.input_outer}>

                                <TextInput style={{
                                    alignItems:'flex-start',
                                    color: 'white',
                                    height: 70,
                                    flex:1,
                                    textAlignVertical: "top",
                                    paddingLeft:15,
                                    paddingBottom:10
                                }}
                                    multiline={true}
                                    selectionColor={'white'}
                                    underlineColorAndroid='transparent'
                                    numberOfLines={10}
                                    value = {this.state.bio}
                                    onChangeText={(bio) => this.setState({ bio })}
                                    autoCapitalize='none' >
                                </TextInput>
                                {/* <Lock name="lock" size={20}  style={styles.input_icon} /> */}
                            </View>
                            <TouchableOpacity style={[styles.btn, commonstyle.white_btn]} onPress={this.completeProfile} >
                                <Text style={[commonstyle.btn_text, { color: constants.BLUE }, commonstyle.bold_text]}>Continue</Text>
                            </TouchableOpacity>
                            <View style = {styles.save_btn}>
                            <TouchableOpacity style={[styles.btn, commonstyle.white_btn]} onPress={this.updateProfile}>
                                <Text style={[commonstyle.btn_text, { color: constants.BLUE }, commonstyle.bold_text]}>Save</Text>
                            </TouchableOpacity>
                    </View>
                        </View>
                    </KeyboardAvoidingView>
                     <DateTimePicker
                            isVisible={this.state.isDatePickerVisible}
                            onConfirm={this._handleDatePicked}
                            onCancel={this._hideDatePicker}
                            mode={'date'}

                          />
                     <ActionSheet
                          ref={o => this.ActionSheet = o}
                          title={'Choose image from ?'}
                          options={['Camera', 'Gallery', 'Cancel']}
                          cancelButtonIndex={2}
                          destructiveButtonIndex={2}
                          onPress={(index) => {this.openCamera(index)}}
                        />
                </ScrollView>
            </ImageBackground>


        );

    }

}


export default EditProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
        alignItems: 'center',
        fontFamily: 'Roboto-Regular',
    },
    title: {
        color: '#fff',
        fontSize: 16

    },
    header_title: {
        color: '#fff',
        fontSize: 20,
        alignSelf: 'center',
        justifyContent: 'center'
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
        padding:20,
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent',
    },
    btn_icon: {
        color: 'white'
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
    select_menu: {
        position: 'relative'
    },
    input_outer: {
        marginTop: 30,
        flexDirection: 'row',
        alignSelf: 'stretch',
        borderBottomWidth: 1,
        borderColor: 'rgba(0,172,176,0.3)',
        backgroundColor: 'transparent',
        borderBottomColor: 'white',
        position: 'relative'
    },
    input_icon: {
        position: 'absolute',
        right: 5,
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
    cameraLogo: {
        color: '#000',
        alignSelf: 'center'
    }


});