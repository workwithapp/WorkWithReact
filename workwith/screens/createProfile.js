
import React, { Component, PropTypes } from 'react';
import { View, ScrollView,AsyncStorage, KeyboardAvoidingView, TouchableOpacity, ToastAndroid, Alert, Image, Text, ImageBackground, TextInput, StyleSheet, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/Octicons';
import ImagePicker from 'react-native-image-picker';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import constants from '../common/constants';
import commonstyle from '../common/commonStyles';
import ActionSheet from 'react-native-actionsheet';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ModalDropdown from 'react-native-modal-dropdown';        
// import DatePicker from 'react-native-datepicker';     
import { Picker,DatePicker } from 'react-native-woodpicker'  

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Icon, Right, Body, Row } from 'native-base';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
 let data = [{
      value: 'Male',
      id:'M'
    }, {
      value: 'Female',
      id:'F'
    }, {
      value: 'Other',
      id:'O'
    }];
class CreateProfile extends Component {
    state = {
        PickerVisible: false,
        birth:"Select Date of Birth",
        errTypes: [],
        pickedData: null
        // date:"2016-05-15"
    };

     data = [
    { label: "DataCat", value: 1 },
    { label: "DataDog", value: 2 },
    { label: "DataSnake", value: 3 },
    { label: "DataPlatypus", value: 4 },
    { label: "DataWhale", value: 5 }
  ];


    setPickerVisible(visible) {
        this.setState({ PickerVisible: visible });
    }
    constructor(props) {
        super(props);
    }

    componentWillMount() {
       
    }
    
    gotoLogin = () => {
        this.props.navigation.navigate("Login");
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
                       if(response.data){
                         this.setState({
                          profile_image: source,
                          profile_image_send: source1
                        });
                        }
                      
                        console.log("phooooooootooooo",response.data)
            });
       }
       else if(index == 1) {
           ImagePicker.launchImageLibrary(options, (response) => {
               console.log('Response = ', response);
                    let source1 = response.uri ;
                         let source = { uri: 'data:image/jpeg;base64,' + response.data };
                        if(response.data){
                         this.setState({
                          profile_image: source,
                          profile_image_send: source1
                        });
                        }
                         console.log("phooooooootooooo",response.data)
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


    genderPicker = () => {
        this.setPickerVisible(true);
    }

    changeProfile = () => {

    }

    completeProfile = () => {
       // alert(this.state.pickedDate)
      var errTypes =[];
       if(!this.state.name) {
            errTypes.push('name')
        }
        if(!this.state.gender) {
          errTypes.push('gender')
        }
        if(!this.state.pickedDate) {
          errTypes.push('dob')
        }
        if(!this.state.about_me) {
          errTypes.push('about')
        }
       if(!errTypes.length) {
             const { name,profile_image_send,gender,pickedDate,about_me }=this.state;
        this.props.navigation.navigate("CreateProfile1",{name:name,image:profile_image_send,lang:gender,birth:pickedDate,about:about_me});
       }
       else{
        this.setState({errTypes: errTypes});
       }     
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

  handleDatePicker = date => {
    this.setState({ pickedDate : date.getFullYear() +  '-' + (date.getMonth()+1) + '-' + date.getDate() }); 
    // this.setState({ pickedDate: data });
  };

  handlePlaceholder = () =>
    this.state.pickedDate
      ? this.state.pickedDate
      : "Select Date of Birth";
    render() {
    const { birth }=this.state;
     // var data = [["Male","Female","Other"]];
        return (

            <ImageBackground source={require('../assets/gradient_bg.jpg')} style={{ width: viewportWidth, height:"100%" }}>
                    <ScrollView>
                    <KeyboardAvoidingView behavior="padding" enabled >
                        <View style={styles.container}>
                            <Text style={[commonstyle.bold_text, styles.title]}>Create Profile</Text>
                          

                            <View style={{ height: 100, width: 100, borderRadius: 50, backgroundColor: '#fff', alignContent: 'center', justifyContent: 'center' }} onPress={this.changeProfile}>
                              <Button style={{ backgroundColor: 'transparent', elevation: 0 }} onPress={this.showActionSheet}>
                              {!this.state.profile_image ?
                               <EvilIcons name="camera" size={60} style={styles.cameraLogo} />
                              : <Image style={{ height: 100, width: 100, borderRadius: 90 }} source={this.state.profile_image} /> }
                            </Button>


                            </View>
                            <Text style={{ alignSelf: 'center', paddingTop: 10, color: '#fff' }}>Upload Profile Picture</Text>
                            <View style={styles.input_outer}>
                                {/* <Icons name="mail" size={25}  style={commonstyle.input_icon}/> */}
                                {/* <FontAwesome name="envelope-o" size={20}  style={styles.input_icon} /> */}
                                <TextInput style={{
                                    alignSelf: 'stretch',
                                    alignItems: 'center',
                                    color: 'white',
                                    paddingBottom:10,
                                    flex:1,
                                    fontSize: 15,
                                    paddingLeft: 10
                                }}
                                    onChangeText={(name) => this.setState({ name })}
                                    selectionColor={'white'}
                                    autoCapitalize='words'
                                    returnKeyType="done"         
                                    underlineColorAndroid='transparent'
                                    placeholder="Enter Name"
                                    placeholderTextColor='white' >
                                </TextInput>
                            </View>
                            <View style={{flexDirection:'row', width:'100%'}}>
                               {this.state.errTypes.map((item) => (
                                  item == 'name' ?  <Text style={{fontSize:12, color: 'red', marginLeft:10}}>Name is required</Text> : null
                                ))}
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
                                defaultValue="Select Gender"
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
                             <View style={{flexDirection:'row', width:'100%'}}>
                               {this.state.errTypes.map((item) => (
                                  item == 'gender' ?  <Text style={{fontSize:12, color: 'red', marginLeft:10}}>Gender is required</Text> : null
                                ))}
                             </View>

                           { /*<TouchableOpacity style={[styles.input_outer,{height:50,marginTop: 10,alignSelf: 'stretch', padding: 10,
                                alignItems: 'center',}]} onPress={this._showDatePicker}>
                                <Text style={{color:"white",paddingBottom:10, fontSize: 16, marginTop: 13}}>{birth}</Text>
                               
                                <EvilIcons name="calendar" size={25} style={styles.input_icon} />
                            </TouchableOpacity>*/}
                            
                           
                              <DatePicker
                              containerStyle={[styles.input_outer,{height:50,marginTop: 10,alignSelf: 'stretch', padding: 10,alignItems: 'center'}]}
                              placeholderStyle={{color:"white",paddingBottom:10, fontSize: 16, marginTop: 13}}
                              onDateChange={this.handleDatePicker}
                              value={this.state.pickedDate}
                              title="Date Picker"
                              placeholder={this.handlePlaceholder()}
                              maxDate={new Date()}
                              //iosPickerMode="date"
                              androidPickerMode="spinner"
                              //locale="fr"
                              //isNullable
                            />
                            
                              <View style={{flexDirection:'row', width:'100%'}}>
                               {this.state.errTypes.map((item) => (
                                  item == 'dob' ?  <Text style={{fontSize:12, color: 'red', marginLeft:10}}>DOB is required</Text> : null
                                ))}
                             </View>
                             <View style={[styles.input_outer,{marginTop:10}]}>

                                <TextInput style={{
                                    alignItems: 'center',
                                    color: 'white',
                                    height: 70,
                                    justifyContent: "flex-start",
                                    textAlignVertical:'top',
                                    fontSize: 16,
                                    paddingLeft: 10
                                }}
                                   value={this.state.about_me}
                                    multiline={true}
                                    selectionColor={'white'}
                                    underlineColorAndroid='transparent'
                                    numberOfLines={10}
                                    onChangeText={(about_me) => this.setState({ about_me })}
                                     autoCapitalize='sentences' 
                                    placeholder="Tell people a little bit about yourself"
                                    placeholderTextColor='white' >
                                </TextInput>
                                {/* <Lock name="lock" size={20}  style={styles.input_icon} /> */}
                            </View>
                              <View style={{flexDirection:'row', width:'100%'}}>
                               {this.state.errTypes.map((item) => (
                                  item == 'about' ?  <Text style={{fontSize:12, color: 'red', marginLeft:10}}>A description of yourself is required.</Text> : null
                                ))}
                             </View>


                             <Text style={{textAlign:'center',color:'#fff',marginTop:10,fontSize:10}}>Note*: Gender and Birthdate are not visible on your public profile.</Text>
                            <TouchableOpacity style={[styles.btn, commonstyle.white_btn]} onPress={this.completeProfile} >
                                <Text style={[commonstyle.btn_text, { color: constants.BLUE }, commonstyle.bold_text]}>Continue</Text>
                            </TouchableOpacity>

                        </View>
                    </KeyboardAvoidingView>

                     <DateTimePicker
                            isVisible={this.state.isDatePickerVisible}
                            onConfirm={this._handleDatePicked}
                            onCancel={this._hideDatePicker}
                             maxDate={new Date()}
                            mode={'date'}/>
                     <ActionSheet
                          ref={o => this.ActionSheet = o}
                          title={'Choose an image from the following'}
                          options={['Camera', 'Gallery', 'cancel']}
                          cancelButtonIndex={2}
                          destructiveButtonIndex={2}
                          onPress={(index) => {this.openCamera(index)}}
                        />
                        </ScrollView>
            </ImageBackground>


        );

    }

}


export default CreateProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingLeft: 35,
        paddingRight: 35,
        height:'100%',
        fontFamily: 'Roboto-Regular',
    },
    title: {
        color: '#fff',
        fontSize: 20,
        marginTop: 20,
        marginBottom: 30
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
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent',
    },
    btn_icon: {
        color: 'white'
    },
    textInput: {

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
        right: 10,
        bottom: 8,
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
        alignSelf: 'center',
        marginLeft: 20
    }


});