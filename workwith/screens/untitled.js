
import React, { Component, PropTypes } from 'react';
import { View, ScrollView,CheckBox,Modal,FlatList, KeyboardAvoidingView, Picker, ProgressViewIOS, TouchableOpacity, ToastAndroid, Alert, Image, Text, ImageBackground, TextInput, StyleSheet, Dimensions,AsyncStorage } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/Octicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import constants from '../common/constants';
import commonstyle from '../common/commonStyles';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Icon, Right, Body, Row } from 'native-base';
import { Base_Url } from '../constants/common';
import Spinner from 'react-native-loading-spinner-overlay';
import SelectMultiple from 'react-native-select-multiple'

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
let selectedFruits1= [],selectedWork=[],selectedDay=[],selectedTime=[];


class EditProfile2 extends Component {
      state = {
        projects:"",
        name:"",
        image:"",
        gender:"",
        birth:"",
        about:"",
        title:"",
        selectedItems : [],
        interestList: [],
        daysList: [],
        workList: [],
        timeList: [],
        checkBoxChecked: [],
        PickerVisible: false,
        errInterest: false,
        modalVisible: false,
        workVisible:false,
        daysVisible:false,
        timeVisible:false,
        check:false,
        checkwork:false,
        checkday:false,
        checktime:false,
        interestText:"Select what you’re looking for",
    };

    setPickerVisible(visible) {
        this.setState({ PickerVisible: visible });
    }
    constructor(props) {
        super(props);
    }
   
    componentDidMount() {
       thisObj = this;
     }
    gotoCreateProfile = () => {
        this.props.navigation.goBack();
    }

    genderPicker = () => {
        this.setPickerVisible(true);
    }

    goToSuggestScreen = () => {
        this.props.navigation.navigate("Main");
    }
    
    genderPicker = () => {
        //  alert('hit');
        this.setPickerVisible(true);
    }

    getInterests() {
       var arry=[];
        this.setState({loading: true});
         fetch(Base_Url+"/getInterest", {
            method: "GET",
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                'device-type':'A',
                'version' : '1.0',
                'token': this.state.token,
            }
        })
        .then((response) =>
        {
          
           console.log(response)
           if(response.status==200){
             var data = JSON.parse(response._bodyInit);
              var _data=data.data;
              console.log(_data)
              for(var i in _data){
                arry.push({
                  label:_data[i].name,
                  value:_data[i].id
                })
              }
              this.setState({interestList: arry})
              console.log("arrryyyy",this.state.interestList)
              this.getDays();
           }
       
          else{

          }
        })
  }

    getDays() {
      var arry=[];
          fetch(Base_Url+"/getDays", {
                method: "GET",
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'device-type':'A',
                    'version' : '1.0',
                    'token': this.state.token,
                }
            })
            .then((response) =>
            {
            //  this.setState({loading: false});
               console.log(response)
               if(response.status==200){
                 var data = JSON.parse(response._bodyInit);
                  // this.setState({daysList: data.data})
              var _data=data.data;
              console.log(_data)
              for(var i in _data){
                // console.log("looppp",_data[i].name)
                arry.push({
                  label:_data[i].name,
                  value:_data[i].id
                })
              }
              this.setState({daysList: arry})
              console.log("daysList",this.state.daysList)
                  this.getWorkplace();
               }
             
              else{

              }
            })
      }
          getWorkplace() {
         var arry=[];
          fetch(Base_Url+"/getWorkplace", {
                method: "GET",
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'device-type':'A',
                    'version' : '1.0',
                    'token': this.state.token,
                }
            })
            .then((response) =>
            {
            // this.setState({loading: false});
               console.log(response)
               if(response.status==200){
                 var data = JSON.parse(response._bodyInit);
                  // this.setState({workList: data.data})
                   var _data=data.data;
              console.log(_data)
              for(var i in _data){
                // console.log("looppp",_data[i].name)
                arry.push({
                  label:_data[i].name,
                  value:_data[i].id
                })
              }
              this.setState({workList: arry})
              console.log("workList",this.state.workList)
                  this.getTimes();
               }
             
              else{

              }
            })
      }
           getTimes() {
          var arry=[];
          fetch(Base_Url+"/getTimes", {
                method: "GET",
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'device-type':'A',
                    'version' : '1.0',
                    'token': this.state.token,
                }
            })
            .then((response) =>
            {
              this.setState({loading: false});
               console.log(response)
               if(response.status==200){
                 var data = JSON.parse(response._bodyInit);
                  // this.setState({timeList: data.data})
              var _data=data.data;
              console.log(_data)
              for(var i in _data){
                // console.log("looppp",_data[i].name)
                arry.push({
                  label:_data[i].name,
                  value:_data[i].id
                })
              }
              this.setState({timeList: arry})
              console.log("timeList",this.state.timeList)
                  
               }
             
              else{

              }
            })
      }
    
     componentWillMount() {

     AsyncStorage.getItem("user_data").then((value2) => {
          console.log("daaaaaataaaaaaa",value2)
          let data=JSON.parse(value2);
          this.setState({token: data.data.token, user_id: data.data.id})
          this.getInterests();
        }).done();

      const { navigation } = this.props;
      console.log("hjgcsdhfvj",navigation.getParam('name'))
        // this.setState({
        //         name:navigation.getParam('name'),
        //         image:navigation.getParam('image'),
        //         gender:navigation.getParam('gender'),
        //         birth:navigation.getParam('birth'),
        //         about:navigation.getParam('about'),
        //         title:navigation.getParam('title'),
        //         projects:navigation.getParam('projects')
        //         })
        }

       onSelectedItemsChange = (selectedItems) => {
        console.log(selectedItems)
        this.setState({ selectedItems });
       }
       setModalVisible(visible) {
       this.setState({ modalVisible: visible });
       }

        DeleteModal = () => {
            this.setModalVisible(true);
        }
        CloseModal = () => {
            this.setModalVisible(false);
            this.setState({check:true,isFetching:!this.state.isFetching})
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
                    <Text style={[commonstyle.bold_text, styles.title]}>Cancel</Text>

                    </Right>
                </Header>
                <ScrollView>
                    <KeyboardAvoidingView behavior="padding" enabled >
                        <View style={styles.container}>
                            <View style={{ height: 5, width: 200, borderRadius: 2, flexDirection: 'row', marginTop: 30, backgroundColor: '#3179ff' }}>
                                {/* <View style = {styles.progressBar1}>
                  </View>
                  <View style = {styles.progressBar2}>
                  </View> */}
                            </View>

                            <Text style={{ color: '#fff', fontSize: 15, alignSelf: 'center', marginTop: 10, marginBottom: 30 }}>3/3</Text>

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
                                <Picker
                                    mode='dropdown'
                                    selectedValue={this.state.language}
                                    style={{ color: 'white', width: '100%' }}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}>
                                    <Picker.Item label="Java" value="java" />
                                    <Picker.Item label="JavaScript" value="js" />
                                </Picker>
                                <Ionicons name="ios-arrow-down" size={25} style={styles.input_icon} onPress={this.genderPicker} />
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
                                <Picker
                                    mode='dropdown'
                                    selectedValue={this.state.language}
                                    style={{ color: 'white', width: '100%' }}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}>
                                    <Picker.Item label="Java" value="java" />
                                    <Picker.Item label="JavaScript" value="js" />
                                </Picker>
                                <Ionicons name="ios-arrow-down" size={25} style={styles.input_icon} onPress={this.genderPicker} />
                            </View>
                            {/* </View> */}
                            <Text style={{ color: '#fff', alignSelf: 'flex-start', marginTop: 30, paddingLeft: 10 }}>Desired work hours</Text>
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
                                <Picker
                                    mode='dropdown'
                                    selectedValue={this.state.language}
                                    style={{ color: 'white', width: '100%' }}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}>
                                    <Picker.Item label="Java" value="java" />
                                    <Picker.Item label="JavaScript" value="js" />
                                </Picker>
                                <Ionicons name="ios-arrow-down" size={25} style={styles.input_icon} onPress={this.genderPicker} />
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
                                <Picker
                                    mode='dropdown'
                                    selectedValue={this.state.language}
                                    style={{ color: 'white', width: '100%' }}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}>
                                    <Picker.Item label="Java" value="java" />
                                    <Picker.Item label="JavaScript" value="js" />
                                </Picker>
                                <Ionicons name="ios-arrow-down" size={25} style={styles.input_icon} onPress={this.genderPicker} />
                            </View>

                             <View style={[styles.input_outer,{marginTop:10}]}>

                                <TextInput style={{
                                    alignItems: 'center',
                                    color: 'white',
                                    height: 70,
                                    justifyContent: "flex-start",
                                    textAlignVertical:'top',
                                    fontSize: 14,
                                    paddingLeft: 10
                                }}
                                   value={this.state.goal}
                                   selectionColor={'white'}
                                    multiline={true}
                                    underlineColorAndroid='transparent'
                                    numberOfLines={10}
                                    onChangeText={(goal) => this.setState({ goal })}
                                    autoCapitalize='none'
                                    placeholder="Write your goals"
                                    placeholderTextColor='white' >
                                </TextInput>
                                {/* <Lock name="lock" size={20}  style={styles.input_icon} /> */}
                            </View>

                            <View style={styles.button_submit}>
                                <TouchableOpacity style={[styles.btn, commonstyle.white_btn]} onPress={this.goToSuggestScreen}>
                                    <Text style={[commonstyle.btn_text, { color: constants.BLUE }, commonstyle.bold_text]}>Update Profile</Text>
                                </TouchableOpacity>
                            </View>
                            
                        </View>
                    </KeyboardAvoidingView >
                </ScrollView>
            </ImageBackground>
        );

    }


}



export default EditProfile2;

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
        marginTop: 15,
        height: 45,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button_submit: {
        borderRadius: 60,
        color: '#fff',
        position: 'relative',
        marginTop: 30,
        height: 45,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button_Skip:{
        borderRadius: 60,
        color: '#fff',
        position: 'relative',
        height: 45,
        marginTop: 15,
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
        marginTop: 15,
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
    },
    progressBar1: {
        height: 5,
        width: 100,
        backgroundColor: '#3179ff',
        borderRadius: 2
    }

});