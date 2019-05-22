import React, { Component, PropTypes } from 'react';
import { View, ScrollView, TouchableOpacity, ToastAndroid, Alert, Image, Text, ImageBackground, TextInput, StyleSheet, Dimensions,AsyncStorage } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import constants from '../common/constants';
import commonstyle from '../common/commonStyles';
import Feather from 'react-native-vector-icons/SimpleLineIcons'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Icon, Right, Body, Row } from 'native-base';
import { Base_Url } from '../constants/common';
import Spinner from 'react-native-loading-spinner-overlay';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

class MyProfile extends Component {

    constructor(props) {
        super(props);
         this.state = {
            data:''
        }
    }

    meetingFix = () => {
        this.props.navigation.navigate("Meeting");
    }
    editProfile =()=>{
        this.props.navigation.navigate("EditProfile"); 
    }
    gotoSettings = () =>{
        this.props.navigation.navigate("Setting");
    }
     componentWillReceiveProps(nextProps) {
       this._getStoredData();
        if(nextProps.myProp !== this.props.myProps) {
        // Alert.alert("componentWillReceiveProps")
       }
     }

     _getStoredData(){
         AsyncStorage.getItem("user_data").then((value) => {
          console.log("daaaaaataaaaaaa",value)
          if (value !== null) {
          let data=JSON.parse(value);
          this.getProfile(data.data.token)
          }
        }).done();
     }

    componentDidMount() {
      this._getStoredData();
        
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
                         console.log("profillllleeeeee",data.data.profile_pic)
                        this.setState({data:data.data})
                       }
                       else{
                        ToastAndroid.show(data.message, ToastAndroid.SHORT);
                       }
                     
                    })
         }

    render() {
    const {data}=this.state;
        return (
            <View style={styles.container}>
                <Header
                    style={styles.transparentHeader}>
                    <Left style={{ flex: 1 }}>
                        <Button style={{ backgroundColor: 'transparent', elevation: 0 }} onPress={this.gotoSettings}>
                            <Feather name="settings" size={25} style={styles.btn_icon} />
                        </Button>
                    </Left>
                    <Image style={{ height: 30, width: 50, marginTop: 5 }} source={require('../assets/logo_without_text.png')} />
                    <Right></Right>
                </Header>
                <ScrollView >
                     <Spinner
                      visible={this.state.loading}
                     />
                    <View style={styles.containerVIew}>
                        <View style={styles.card}>
                            <ImageBackground source={{ uri: data.profile_pic}} defaultSource={require("../assets/user1.png")} style={{ width: 'auto', height: 260, opacity: .2 }}>
                            </ImageBackground>
                            <View style={styles.dotSetting}>
                                <View style={styles.buttonContainer1}>
                                    <TouchableOpacity style={[styles.btn, commonstyle.linkedin_btn]} onPress={this.editProfile}>
                                        <Text style={[commonstyle.bold_text, styles.btn_text]}>Edit Profile</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.cardOuter}>

                                    <View style={styles.cardProfile}>
                                     
                                        <Image style={{ height: 100, width: 100, borderRadius: 50 }} 
                                        source={{ uri: data.profile_pic}} defaultSource={require("../assets/user1.png")} />

                                    </View>
                                </View>

                                <View style={styles.profileData}>
                                    <Text style={{ color: '#fff', fontSize: 20,fontFamily: 'Roboto-Regular' }}>{data.name}</Text>
                                    <Text style={{ color: '#fff', paddingTop: 5, fontFamily: 'Roboto-Regular' }}>{data.job_title}</Text>
                                    <Text style={{ color: '#989898', fontSize: 10, paddingTop: 20 }}>Location</Text>
                                    <Text style={{ color: '#fff', paddingTop: 5,fontFamily: 'Roboto-Regular' }}>{data.address}</Text>
                                </View>

                            </View>
                        </View>
                        <ScrollView horizontal>

                            <View style={styles.matches}>

                                <View style={styles.MatchPrefrences}>
                                    <Text style={styles.textStyle}>
                                        #Friendship
                                </Text>
                                </View>

                                <View style={styles.MatchPrefrences}>
                                    <Text style={styles.textStyle}>
                                        #Collaborators
                                </Text>
                                </View>

                            </View>
                        </ScrollView>
                        <View
                            style={{
                                borderBottomColor: '#989898',
                                borderBottomWidth: 0.5,
                                opacity: .2,
                                backgroundColor: '#fff'
                            }}
                        />
                        <View
                            style={{
                                borderBottomColor: '#989898',
                                borderBottomWidth: 0.5,
                                opacity: .2
                            }}
                        />
                        <View style={styles.suggestContent}>
                            <Text style={styles.suggestTextContent}>Bio</Text>
                            <Text>{data.bio}</Text>
                        </View>
                        <View
                            style={{
                                borderBottomColor: '#989898',
                                borderBottomWidth: 0.5,
                                opacity: .2
                            }}
                        />

                        <View style={styles.suggestContent}>
                            <Text style={styles.suggestTextContent}>Project & Activities</Text>
                            <Text>{data.project}</Text>
                        </View>
                        <View
                            style={{
                                borderBottomColor: '#989898',
                                borderBottomWidth: 0.5,
                                opacity: .2
                            }}
                        />
                        <View style={styles.suggestContent}>
                            <Text style={styles.suggestTextContent}>Desired Work Hours</Text>
                            {data.day_name ?<View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontWeight: 'bold' }}>Days:</Text>
                                <Text>{data.day_name}</Text>
                            </View>:null}
                           {data.time_name ?<View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontWeight: 'bold' }}>Time:</Text>
                                <Text>{data.time_name}</Text>
                            </View>:null}
                            {data.work_place ?<View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontWeight: 'bold' }}>Work place:</Text>
                                <Text>{data.work_place}</Text>
                            </View>:null}
                        </View>
                        <View
                            style={{
                                borderBottomColor: '#989898',
                                borderBottomWidth: 0.5,
                                opacity: .2
                            }}
                        />

                       {data.goal ?<View style={styles.suggestContent}>
                            <Text style={styles.suggestTextContent}>My Goals</Text>
                            <Text>{data.goal}</Text>
                        </View>:null}

                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default MyProfile;

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
        padding: 15
    },
    card: {
        // marginTop:10,
        fontFamily: 'Roboto-Regular',
        height: 'auto',
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
        marginTop: -15,
        alignItems: 'center',
        justifyContent: 'center'
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
    buttonContainer1: {
        padding: 5,
        alignItems: 'flex-end'
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
    input_outer: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: 'transparent',
        marginTop: 10
    },
    btn: {
        borderRadius: 40,
        color: '#fff',
        position: 'relative',
        height: 30,
        padding: 5,
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center'
    }, btn_text: {
        fontSize: 13,
        color: '#fff',
    }
})