import React, { Component, PropTypes } from 'react';
import { View, ScrollView,PermissionsAndroid,Platform, TouchableOpacity, ToastAndroid, Alert, Image, Text, ImageBackground, TextInput, StyleSheet, Dimensions,UIManager,AsyncStorage,FlatList } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import constants from '../common/constants';
import commonstyle from '../common/commonStyles';
import Feather from 'react-native-vector-icons/SimpleLineIcons'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Icon, Right, Body, Row } from 'native-base';
// import { Popover, PopoverController } from 'react-native-modal-popover';
import { Base_Url,Base_local_Url } from '../constants/common';
import Popover from 'react-native-popover-view';
import PopoverTooltip from 'react-native-popover-tooltip';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import Spinner from 'react-native-loading-spinner-overlay';
// import { MenuProvider } from 'react-native-popup-menu';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

class Suggested extends Component {

    constructor(props) {
        super(props);
        if( Platform.OS === 'android' )
          {
   
            UIManager.setLayoutAnimationEnabledExperimental(true);
   
          }
        this.state = {
            token:null,
            isVisible: false,
            currentIndex: 0,
            match_check:true,
            currentLongitude: '',
            currentLatitude: '',
            data:[{
                email:"",
                username:"",
                job_title:"",
                location:"",
                workplace_name:"",
                bio:"",
                project:"",
                desired_work_days:"",
                desired_work_time:"",
                my_goals:""
            }]
        }
    }


    meetingFix = () => {
        this.props.navigation.navigate("Meeting");
    }

    gotoSettings = () => {
        this.props.navigation.navigate("Setting");
    }
   
    showPopover=()=> {
        this.setState({
            isVisible: !this.state.isVisible
        });
    }
 
    closePopover=()=> {
      this.setState({isVisible: false});
    }

     componentWillReceiveProps(nextProps) {
        console.log("hiiii")
       this._getStoredData();
       var dummyData = [{
                email:"",
                username:"",
                job_title:"",
                location:"",
                workplace_name:"",
                bio:"",
                project:"",
                desired_work_days:"",
                desired_work_time:"",
                my_goals:""
            }];
       this.setState({
            currentIndex: 0,
            data: dummyData
        })
        if(nextProps.myProp !== this.props.myProps) {
        // Alert.alert("componentWillReceiveProps")
       }
     }

    _getStoredData(){
          AsyncStorage.getItem("lat").then((value2) => {
          console.log("latttttttt",value2)
        }).done(); 


        AsyncStorage.getItem("user_data").then((value2) => {
          // console.log("daaaaaataaaaaaa",value2)
          let data=JSON.parse(value2);
          this.setState({token: data.data.token})
           this.getSuggestions( data.data.token)
        }).done();  
    }
    
    componentDidMount() {
     this.requestCameraPermission();
     // this._getStoredData();
      
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
                    alert("err",err);
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
                this._getStoredData();
                //getting the Latitude from the location json
                that.setState({ currentLongitude:currentLongitude });
                //Setting state Longitude to re re-render the Longitude Text
                that.setState({ currentLatitude:currentLatitude });
                //Setting state Latitude to re re-render the Longitude Text
            },
            (error) =>{ 
                this._getStoredData();
                alert(error.message)},
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
           

   getSuggestions = (value) =>{
            this.setState({loading: true});

            if(!this.state.currentLatitude || !this.state.currentLongitude){
                this.setState({
                    currentLatitude:null,
                    currentLongitude:null
                 })
            }
                  fetch(Base_Url+"/users/suggestions", {
                        method: "POST",
                        headers: {
                            'accept': 'application/json',
                            'Content-Type': 'application/json',
                            'device-type':'A',
                            'version' : '1.0',
                            'token':value
                        },
                         body: JSON.stringify({
                            latitude: this.state.currentLatitude,
                            longitude: this.state.currentLongitude
                        })


                    })
                    .then((response) =>
                    {
                  console.log("lattttt",this.state.currentLatitude,this.state.currentLongitude)
                      this.setState({loading: false});
                       console.log("sugeesstionnsss",response)
                       if(response.status==200){
                        // alert("200")
                         var data = JSON.parse(response._bodyInit);
                         this.setState({data:data.data,interest:data.data.user_interests})
                         // alert(this.state.data[this.state.currentIndex].email)
                         console.log("stateee dataaaaa",this.state.data)
                         this.setState({match_check:false})
                       }
                       else{
                        // alert("not 200")
                        this.setState({match_check:true})
                         var errorr = JSON.parse(response._bodyInit);
                         ToastAndroid.show(errorr.message, ToastAndroid.SHORT);
                       }
                     
                    })
     }

      meetPass = (value) =>{
      console.log(this.state.data[this.state.currentIndex].user_id)
            this.setState({loading: true});
                  fetch(Base_Url+"/users/match/"+this.state.data[this.state.currentIndex].user_id, {
                        method: "POST",
                        headers: {
                            'accept': 'application/json',
                            'Content-Type': 'application/json',
                            'device-type':'A',
                            'version' : '1.0',
                            'token':this.state.token
                        },
                         body: JSON.stringify({
                            status: value,
                            device_id: 'fhukefjrgjnrk',
                            device_type: 'A',
                            version: '1.0' 
                        })

                    })
                    .then((response) =>
                    {
                      this.setState({loading: false});
                       console.log("meettt passs",response)
                       // this.getSuggestions(this.state.token);
                       if(response.status==200){
                        // alert("200")
                        // alert(this.state.currentIndex)
                         let nextIndex = this.state.currentIndex+1;

                          // alert(nextIndex)
                            if(nextIndex<this.state.data.length) {
                               this.setState({currentIndex: nextIndex})
                            }
                            else{
                              ToastAndroid.show('Suggesstions are ended', ToastAndroid.SHORT);
                              this.setState({match_check:true})
                               // alert(
                               //    'Connect',
                               //    'Oops!! Suggestions are ended for the time.',
                               //    [
                               //      {text: 'OK', onPress: () => },
                               //    ],
                               //    { cancelable: false }
                               //  )
                            }
                         // var data = JSON.parse(response._bodyInit);
                         // this.setState({data:data.data.user_details,interest:data.data.user_interests})
                       }
                       else{
                        // alert("naaaa")
                        this.setState({match_check:true})
                         var errorr = JSON.parse(response._bodyInit);
                         ToastAndroid.show(errorr.message, ToastAndroid.SHORT);
                       }
                     
                    })
     }


    render() {

    console.log("renderr data",this.state.data)
        const{data,token,interest,isVisible,currentIndex,match_check}=this.state;
         // alert(data.name)
        var {width, height} = Dimensions.get('window');
        var displayArea = {x: 5, y: 20, width: width - 10, height: height - 25};
        return (

            <View style={styles.container}>
                <Header
                    style={styles.transparentHeader}>
                    <Left style={{ flex: 1 }}>
                        <TouchableOpacity>
                            <Button style={{ backgroundColor: 'transparent', elevation: 0 }} onPress={this.gotoSettings}>
                                <Feather name="settings" size={25} style={styles.btn_icon} />
                            </Button>
                        </TouchableOpacity>
                    </Left>
                    <Image style={{ height: 30, width: 50, marginTop: 5 }} source={require('../assets/logo_without_text.png')} />
                    <Right></Right>
                </Header>
                 <Spinner overlayColor='transparent'
                      visible={this.state.loading}
                     />
                {match_check === false ?<ScrollView >
               
                    <View style={styles.containerVIew}>
                        <View style={styles.card}>
                            <ImageBackground  source={data?.profile_pic
                                        ? data?.profile_pic
                                        : require('../assets/user1.png')}  defaultSource={require("../assets/user1.png")}  style={{ width: 'auto', height: 260, opacity: .2 }}>
                            </ImageBackground>
                            <View style={styles.dotSetting}>
                             
                           <View style={{position:'relative'}}>
                               <TouchableOpacity onPress={this.showPopover}>
                                    <MaterialCommunityIcons name="dots-horizontal" size={25} color='#fff' style={styles.dots} />
                                </TouchableOpacity>
                                 {isVisible ? 
                                <View style={{position:'absolute',top:15,right:10,zIndex:10,justifyContent:"flex-end"}}>
                                   <FontAwesome style={{alignSelf: 'flex-end',marginRight:9 }} name="caret-up" size={25} color='#fff' />
                                    <View style={{backgroundColor:"#fff",borderRadius:5,marginTop:-10}}>
                                        <TouchableOpacity onPress={this.closePopover}>
                                            <Text style={{color:'black',fontFamily: 'Roboto-Regular',textAlign:'center',borderBottomWidth:1,borderBottomColor:"#ccc",padding:6,fontSize:12}}>Block User</Text>
                                         </TouchableOpacity>
                                          <TouchableOpacity onPress={this.closePopover}>
                                             <Text style={{color:'black',fontFamily: 'Roboto-Regular',padding:6,fontSize:12}}>Report the User</Text> 
                                          </TouchableOpacity>
                                    </View>
                                </View> :null}   
                             </View>

                                <View style={styles.cardOuter}>
                                    <TouchableOpacity style={[styles.cardInner,{backgroundColor: '#ccc'}]} onPress={(val)=>{this.meetPass('4')}}>
                                            <Text style={{ color: '#fff',fontFamily: 'Roboto-Bold' }}>PASS</Text>
                                    </TouchableOpacity>
                                    <View style={styles.cardProfile}>
                                       
                                        <Image style={{ height: 100, width: 100, borderRadius: 50 }}  source={data?.profile_pic
                                        ? data?.profile_pic
                                        : require('../assets/user1.png')} />
                                    </View>
                                    <TouchableOpacity onPress={(val)=>{this.meetPass('0')}}  style={styles.cardInner}>
                                       
                                            <Text style={{ color: '#fff',fontFamily: 'Roboto-Bold' }}>MEET</Text>

                                    </TouchableOpacity>
                                </View>
                                <View style={styles.profileData}>
                                   {data[currentIndex].username ? <Text style={{ color: '#fff', fontSize: 20, fontFamily: 'Roboto-Regular' }}>{data[currentIndex].username}</Text>:null}
                                     {data[currentIndex].job_title ?<Text style={{ color: '#fff', paddingTop: 10,fontFamily: 'Roboto-Regular' }}>{data[currentIndex].job_title}</Text>:null}
                                     <Text style={{ color: '#989898', fontSize: 10, paddingTop: 20 }}>Location</Text>
                                    {data[currentIndex].location ?<Text style={{ color: '#fff', paddingTop: 10,fontFamily: 'Roboto-Regular' }}>{data[currentIndex].location}</Text>:null}
                                </View>

                            </View>
                        </View>
                     <FlatList
                      horizontal={true}
                      refreshing={this.state.isFetching}
                       data={interest}
                       keyExtractor={(item, index) => item.label}
                       renderItem={({item,index}) => ( 
                     <View style={styles.matches}>

                                <View style={styles.MatchPrefrences}>
                                    <Text style={styles.textStyle}>
                                        #Friendship
                                </Text>
                                </View>
                                </View>
                    )}
                     />
                      
                        <View
                            style={{
                                borderBottomColor: '#989898',
                                borderBottomWidth: 0.5,
                                opacity: .2,
                                backgroundColor: '#fff'
                            }}
                        />
                       {data[currentIndex].workplace_name ? <View style={styles.suggestContent}>
                            <Text style={styles.suggestTextContent}>Work Place</Text>
                            <Text>{data[currentIndex].workplace_name}</Text>
                        </View>:null}
                        <View
                            style={{
                                borderBottomColor: '#989898',
                                borderBottomWidth: 0.5,
                                opacity: .2
                            }}
                        />
                         {data[currentIndex].bio ?<View style={styles.suggestContent}>
                            <Text style={styles.suggestTextContent}>Bio</Text>
                            <Text>{data[currentIndex].bio}</Text>
                        </View>:null}
                        <View
                            style={{
                                borderBottomColor: '#989898',
                                borderBottomWidth: 0.5,
                                opacity: .2
                            }}
                        />

                         {data[currentIndex].project ?<View style={styles.suggestContent}>
                            <Text style={styles.suggestTextContent}>Project & Activities</Text>
                            <Text>{data[currentIndex].project}</Text>
                        </View>:null}
                        <View
                            style={{
                                borderBottomColor: '#989898',
                                borderBottomWidth: 0.5,
                                opacity: .2
                            }}
                        />
                        {data[currentIndex].desired_work_days || data[currentIndex].desired_work_time  ? <View style={styles.suggestContent}>
                            <Text style={styles.suggestTextContent}>Desired Work Hours</Text>
                            {data[currentIndex].desired_work_days ?<View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontWeight: 'bold' }}>Days:</Text>
                                <Text>{data?.desired_work_days}</Text>
                            </View>:null}
                            {data[currentIndex].desired_work_time ?<View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontWeight: 'bold' }}>Time:</Text>
                                <Text>{data?.desired_work_time}</Text>
                            </View>:null}
                        </View>:null}
                        <View
                            style={{
                                borderBottomColor: '#989898',
                                borderBottomWidth: 0.5,
                                opacity: .2
                            }}
                        />

                       {data[currentIndex].my_goals ? <View style={styles.suggestContent}>
                            <Text style={styles.suggestTextContent}>My Goals</Text>
                            <Text>{data?.my_goals}</Text>
                        </View>:null}
                    </View>
                </ScrollView>:
                <ImageBackground source={require('../assets/background.png')} style={{ width: 'auto',justifyContent:"center",alignItems:"center",flex:1}}>
                 <View style={{justifyContent:"center",alignItems:"center",padding:30,paddingLeft:50,paddingRight:50}}>
                 <Text style={{color:"#fff", fontFamily: 'Roboto-Light',textAlign:"center",fontSize:16}}>Your suggested matches for the day are over now.</Text>
               </View>
              </ImageBackground>}
            </View>
            
        )
    }
}

export default Suggested;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentContainer: {
        paddingVertical: 20
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
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15
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
        marginTop: 10,
        alignItems: 'center'
    },
    matches: {
        // flex:1,
        overflow: 'scroll',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#fff'

        // justifyContent:'space-between'
    },
    MatchPrefrences: {
        margin: 10,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderWidth: 0.5,
        borderColor: '#54007c',
        alignItems: 'center',
        height: 40,
        width: 'auto',
        borderRadius: 5
    },
    textStyle: {
        padding: 10,
        color: '#54007c'
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
    content: {
        padding: 16,
        backgroundColor: 'pink',
        borderRadius: 8,
      },
      arrow: {
        borderTopColor: 'pink',
      },
      background: {
        backgroundColor: 'rgba(0, 0, 255, 0.5)'
      },
})