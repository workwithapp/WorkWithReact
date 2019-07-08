
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
const fruits = ['Apples', 'Oranges', 'Pears','AA','BB','CC','DD','EE','F','GET']
let selectedFruits1= [],selectedWork=[],selectedDay=[],selectedTime=[];

class EditProfile2 extends Component {
  static propTypes = {};

    state = {
        projects:"",
        name:"",
        image:"",
        gender:"",
        birth:"",
        about:"",
        title:"",
        goal:'',
        selectedItems : [],
        interestList: [],
        daysList: [],
        workList: [],
        timeList: [],
        interests:[],
        dayss:[],
        time:[],
        workplace:[],
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
      this.requestCameraPermission();
       thisObj = this;
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
                       
                       if(response.status==200){
                         var data = JSON.parse(response._bodyInit);
                         console.log("profillllleeeeee",data)
                        this.setState({
                            data:data.data,
                            name:data.data.name,
                            goal:data.data.goal,
                            dayss:data.data.day,
                            interests:data.data.interest,
                            time:data.data.time,
                            workplace:data.data.work_place
                        })
                      console.log("interestssssss",this.state.interests)
                       }
                       else{
                        ToastAndroid.show(data.message, ToastAndroid.SHORT);
                       }
                     
                    })
                  }
      async requestCameraPermission() {
        this.setState({loading: true});
        var that =this;
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
                            'title': 'Location Access Required',
                            'message': 'This App needs to Access your location'
                        }
                    )
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        //To Check, If Permission is granted
                        that.callLocation(that);
                    } else {
                        alert("Permission Denied");
                    }
                } catch (err) {
                    // alert("err",err);
                    console.warn(err)
                }
    }

        callLocation(that){
        // alert("callLocation Called");
        navigator.geolocation.getCurrentPosition(
            //Will give you the current location
            (position) => {
                
                console.log("locationnnnnnnn",position)
                const currentLongitude = JSON.stringify(position.coords.longitude);
                //getting the Longitude from the location json
                const currentLatitude = JSON.stringify(position.coords.latitude);
                // this._getStoredData();
                //getting the Latitude from the location json
                that.setState({ currentLongitude:currentLongitude });
                //Setting state Longitude to re re-render the Longitude Text
                that.setState({ currentLatitude:currentLatitude });
                //Setting state Latitude to re re-render the Longitude Text
            },
            (error) =>{ 
                // this._getStoredData();
                // alert(error.message)
              },
            { timeout: 20000, maximumAge: 1000 }
        );
        that.watchID = navigator.geolocation.watchPosition((position) => {
            //Will give you the location on location change
            console.log(position);
            const currentLongitude = JSON.stringify(position.coords.longitude);
            //getting the Longitude from the location json
            const currentLatitude = JSON.stringify(position.coords.latitude);
            //getting the Latitude from the location json
            that.setState({ currentLongitude:currentLongitude });
            //Setting state Longitude to re re-render the Longitude Text
            that.setState({ currentLatitude:currentLatitude });
            //Setting state Latitude to re re-render the Longitude Text
        });
    }
    componentWillUnmount = () => {
        navigator.geolocation.clearWatch(this.watchID);
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
 updateText = text => {
 // alert(text)
        this.setState({text});
    };



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


    gotoCreateProfile = () => {
        this.props.navigation.goBack();
    }

    genderPicker = () => {
        //  alert('hit');
        this.setPickerVisible(true);
    }

    goToSuggestScreen = () => {
      const{image,name,gender,birth,about,title,projects}=this.state;
        if(!this.state.currentLatitude || !this.state.currentLongitude){
                this.setState({
                    currentLatitude:null,
                    currentLongitude:null
                 })
            }
       this.setState({errInterest: false})
       var interest_arry=[];
       var work_arry=[];
       var day_arry=[];
       var time_arry=[];

       if(selectedFruits1){
          for(var i in this.state.selectedFruits){
          interest_arry.push(this.state.selectedFruits[i].value)
          }
       }

        if(selectedWork){
          for(var i in this.state.selectedWorkk){
          work_arry.push(this.state.selectedWorkk[i].value)
          }
       }

         if(selectedDay){
          for(var i in this.state.selectedDayy){
          day_arry.push(this.state.selectedDayy[i].value)
          }
       }
      
         if(selectedTime){
          for(var i in this.state.selectedTimee){
          time_arry.push(this.state.selectedTimee[i].value)
          }
       }
      
       if(selectedFruits1) {
             console.log("hiiiiiiiiiiiiiiiiiiiii ",interest_arry)
         console.log("tokennnn ",this.state.token)
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
              data.append('name', name);
              data.append('gender', gender);
              data.append('dob', birth);
              data.append('bio', about);
              data.append('job_title', title);
              data.append('project', projects);
              data.append('interest', interest_arry.toString());
              data.append('work_place', work_arry.toString());
              data.append('day', day_arry.toString());
              data.append('time', time_arry.toString());
              data.append('goal', this.state.goal);
              data.append('profile_pic', image);
              data.append('devicetype', 'A');
              data.append('appversion', '1.0');
              data.append('latitude', this.state.currentLatitude);
              data.append('longitude', this.state.currentLongitude);
              data.append('token', this.state.token);
              console.log("dataaaaa",data)
          
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
               console.log("updateddddddd",response)
               if(response.status==200){
                 var data = JSON.parse(response._bodyInit);
                   // AsyncStorage.setItem('loggedIn',  'true');
                   ToastAndroid.show(data.message, ToastAndroid.SHORT);
                   
                   this.props.navigation.navigate("Main");
                  
               }
               else{
                 ToastAndroid.show('An error occured, try again later', ToastAndroid.SHORT);
               }
             
            }).catch(
          function(error) {
            console.log("errrrorrrrrrrr",error)
            reject(new Error(`Unable to retrieve events.\n${error.message}`));
          }
        );
       }
       else{
          this.setState({errInterest: true})
       }
     

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
       console.log("imageeeeeee",navigation.getParam('image'))
        this.setState({
                name:navigation.getParam('name'),
                image:navigation.getParam('image'),
                gender:navigation.getParam('gender'),
                birth:navigation.getParam('birth'),
                about:navigation.getParam('about'),
                title:navigation.getParam('title'),
                projects:navigation.getParam('projects')
                })
        }

       onSelectedItemsChange = (selectedItems) => {
        console.log(selectedItems)
    this.setState({ selectedItems });
  }
 


    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    DeleteModal = () => {
      // alert("heyyyy")
        this.setModalVisible(true);
    }
    CloseModal = () => {
      console.log("selectedFruits132323232323",selectedFruits1)
        this.setModalVisible(false);
        this.setState({check:true,isFetching:!this.state.isFetching})
    }

 
   onSelectionsChange = (selectedFruits) => {

    console.log("selectedFruits",selectedFruits)
    selectedFruits1=[];
    for(var i in selectedFruits){
      selectedFruits1.push(selectedFruits[i].label);
    }
    this.setState({ selectedFruits: selectedFruits})
   }

    workModal = () => {
      this.setState({ workVisible: true });
    }

    CloseModalWork = () => {
     this.setState({ workVisible: false });
    this.setState({checkwork:true,isFetching:!this.state.isFetching})
    }


   onSelectionsChangeWOrk = (selectedFruits) => {
    // selectedWork=selectedFruits;
    selectedWork=[];
    for(var i in selectedFruits){
      selectedWork.push(selectedFruits[i].label);
    }
    this.setState({ selectedWorkk: selectedFruits})
    console.log("selectedWork",selectedWork)
  }

   dayModal = () => {
      this.setState({ daysVisible: true });
    }
    CloseModalDay = () => {
     this.setState({ daysVisible: false });
        this.setState({checkday:true,isFetching:!this.state.isFetching})
    }


   onSelectionsChangeDay = (selectedFruits) => {
   // selectedDay=selectedFruits;
       selectedDay=[];
    for(var i in selectedFruits){
      selectedDay.push(selectedFruits[i].label);
    }
    this.setState({ selectedDayy: selectedFruits})
    console.log("selectedDay",selectedDay)
  }

    timeModal = () => {
      this.setState({ timeVisible: true });
    }
    CloseModalTime = () => {
     this.setState({ timeVisible: false });
        this.setState({checktime:true,isFetching:!this.state.isFetching})
    }


  onSelectionsChangeTime = (selectedFruits) => {
   // selectedTime=selectedFruits;
   selectedTime=[];
    for(var i in selectedFruits){
      selectedTime.push(selectedFruits[i].label);
    }
    this.setState({ selectedTimee: selectedFruits})
    console.log("selectedTime",selectedTime)
  }
 gotoCreateProfile = () => {
        this.props.navigation.goBack();
    }

    render() {
     console.log("renederrrrr",this.state.interests)
      const { selectedItems,interestList,interestText,workList,daysList,timeList } = this.state;

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
                <ScrollView>
                    <KeyboardAvoidingView behavior="padding" enabled >
                     <Spinner
                      visible={this.state.loading}
                     />
                        <View style={styles.container}>
                            <View style={{ height: 5, width: 200, borderRadius: 2, flexDirection: 'row', marginTop: 30, backgroundColor: '#3179ff' }}>
                                
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
                            {this.state.interests.length !=0 && selectedTime=='' ?<Text style={{ color: 'white',fontSize:16 }}>{this.state.interests.join(', ')}</Text>:
                             (this.state.checktime == false  || selectedTime=='' ? <Text style={{ color: 'white', width: '100%',fontSize:16 }}>Select times you can work</Text>:
                              <Text style={{ color: 'white',fontSize:16 }}>{selectedTime.join(', ')}</Text>)}

                              <TouchableOpacity style={styles.input_icon1} onPress={this.DeleteModal.bind(this)}>
                              <Ionicons name="ios-arrow-down" size={25}  style={{color:"white"}}/>  
                              </TouchableOpacity> 
                            </View>
                              <View style={{flexDirection:'row', width:'100%'}}>
                               {this.state.errInterest ?
                                       <Text style={{fontSize:14, color: 'red', marginLeft:25, marginTop: 10}}>Interest is required</Text> : null
                                 }
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
                                    {this.state.workplace.length !=0 && selectedWork=='' ?<Text style={{ color: 'white',fontSize:16 }}>{this.state.workplace.join(', ')}</Text>:
       (this.state.checkwork == false || selectedWork=='' ? <Text style={{ color: 'white', width: '100%',fontSize:16 }}>Select where you can work</Text>:
        <Text style={{ color: 'white',fontSize:16 }}>{selectedWork.join(', ')}</Text>)}

                              <TouchableOpacity style={styles.input_icon1} onPress={this.workModal.bind(this)}>
                              <Ionicons name="ios-arrow-down" size={25}  style={{color:"white"}}/>  
                              </TouchableOpacity> 

                              
                            </View>
                           
                            <Text style={{ color: '#fff', alignSelf: 'flex-start', marginTop: 40, paddingLeft: -15 }}>Days Available</Text>
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
                                    {this.state.dayss.length !=0 && selectedDay=='' ?<Text style={{ color: 'white',fontSize:16 }}>{this.state.dayss.join(', ')}</Text>:
       (this.state.checkday == false || selectedDay=='' ? <Text style={{ color: 'white', width: '100%',fontSize:16 }}>Select Days (Optional)</Text>:
        <Text style={{ color: 'white',fontSize:16 }}>{selectedDay.join(', ')}</Text>)}

                              <TouchableOpacity style={styles.input_icon1} onPress={this.dayModal.bind(this)}>
                              <Ionicons name="ios-arrow-down" size={25}  style={{color:"white"}}/>  
                              </TouchableOpacity> 
                            </View>
                              <Text style={{ color: '#fff', alignSelf: 'flex-start', marginTop: 40, paddingLeft: -15 }}>Times Available</Text>
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
                                             {this.state.time.length !=0 && selectedTime=='' ?<Text style={{ color: 'white',fontSize:16 }}>{this.state.time.join(', ')}</Text>:
       (this.state.checktime == false  || selectedTime=='' ? <Text style={{ color: 'white', width: '100%',fontSize:16 }}>Select times you can work</Text>:
        <Text style={{ color: 'white',fontSize:16 }}>{selectedTime.join(', ')}</Text>)}
                              <TouchableOpacity style={styles.input_icon1} onPress={this.timeModal.bind(this)}>
                              <Ionicons name="ios-arrow-down" size={25}  style={{color:"white"}}/>  
                              </TouchableOpacity> 

                            </View>
                             <View style={[styles.input_outer,{marginTop:10}]}>

                                <TextInput style={{
                                    alignItems: 'center',
                                    color: 'white',
                                    height: 70,
                                    justifyContent: "flex-start",
                                    textAlignVertical:'top',
                                    fontSize: 16
                                }}
                                   value={this.state.goal}
                                   selectionColor={'white'}
                                    multiline={true}
                                    underlineColorAndroid='transparent'
                                    numberOfLines={10}
                                    onChangeText={(goal) => this.setState({ goal })}
                                     autoCapitalize='words' 
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
                       <ScrollView>
                            <SelectMultiple
                              items={interestList}
                              selectedItems={this.state.selectedFruits}
                              onSelectionsChange={this.onSelectionsChange} />

                            </ScrollView>
                              <View style={styles.btn}>
                                    <TouchableOpacity style={[commonstyle.btn, commonstyle.linkedin_btn, styles.btn]} onPress={this.CloseModal}>
                                        <Text style={[commonstyle.bold_text, commonstyle.btn_text]}>OK</Text>
                                    </TouchableOpacity>
                                </View>
                        </View>
                   
                    </View>
                </Modal>

                  <Modal
                    visible={this.state.workVisible}
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
                       <ScrollView>
                            <SelectMultiple
                              items= { workList }
                               selectedItems={this.state.selectedWorkk}
                              onSelectionsChange={this.onSelectionsChangeWOrk} />

                            </ScrollView>
                            <View style={styles.btn}>
                                    <TouchableOpacity style={[commonstyle.btn, commonstyle.linkedin_btn, styles.btn]} onPress={this.CloseModalWork}>
                                        <Text style={[commonstyle.bold_text, commonstyle.btn_text]}>OK</Text>
                                    </TouchableOpacity>
                                </View>
                        </View>
                   
                    </View>
                </Modal>

                  <Modal
                    visible={this.state.daysVisible}
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
                       <ScrollView>
                            <SelectMultiple
                              items= { daysList }
                               selectedItems={this.state.selectedDayy}
                              onSelectionsChange={this.onSelectionsChangeDay} />
 
                            </ScrollView>
                               <View style={styles.btn}>
                                    <TouchableOpacity style={[commonstyle.btn, commonstyle.linkedin_btn, styles.btn]} onPress={this.CloseModalDay}>
                                        <Text style={[commonstyle.bold_text, commonstyle.btn_text]}>OK</Text>
                                    </TouchableOpacity>
                                </View>
                        </View>
                   
                    </View>
                </Modal>

                    <Modal
                    visible={this.state.timeVisible}
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
                       <ScrollView>
                            <SelectMultiple
                              items= { timeList }
                               selectedItems={this.state.selectedTimee}
                              onSelectionsChange={this.onSelectionsChangeTime} />

                            </ScrollView>
                              <View style={styles.btn}>
                                    <TouchableOpacity style={[commonstyle.btn, commonstyle.linkedin_btn, styles.btn]} onPress={this.CloseModalTime}>
                                        <Text style={[commonstyle.bold_text, commonstyle.btn_text]}>OK</Text>
                                    </TouchableOpacity>
                                </View>
                        </View>
                   
                    </View>
                </Modal>
            </ImageBackground>
        );

    }


}



export default EditProfile2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height:'100%',
        alignItems: 'center',
        padding: 25,
        paddingLeft: 35,
        paddingRight: 35,
        fontFamily: 'Roboto-Regular',
    },
     select: {
        backgroundColor: '#6A85B1',
        width: 300,
    },
    itemText: {
    padding: 16,
    color: "#fff"
},
itemTextSelected: {
    padding: 16,
    color: "#fff",
    backgroundColor: '#f00'
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
    suggestContent: {
        padding: 10,
        backgroundColor: '#fff'
    },
    suggestTextContent: {
        backgroundColor: '#fff',
        fontSize: 18,
        color: '#54007c'
    },
    input_outer: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: 'transparent',
        marginTop: 10
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
     input_icon1: {
        position: 'absolute',
        right: 5,
        width:30,
        bottom: 10,
        justifyContent:"center",
        alignItems:"center",
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