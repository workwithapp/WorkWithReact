import React, { Component, PropTypes } from 'react';
import { View, ScrollView, TouchableOpacity, ToastAndroid, Alert, Image, Text, ImageBackground, TextInput, StyleSheet, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import constants from '../common/constants';
import commonstyle from '../common/commonStyles';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/SimpleLineIcons'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Icon, Right, Body, Row } from 'native-base';
import { Base_Url } from '../constants/common';
import Spinner from 'react-native-loading-spinner-overlay';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
let _id,token;
class OtherProfile extends Component {

    constructor(props) {
        super(props);
        this.state={
            loading:false
        }
    }
     componentDidMount() {
         const { navigation } = this.props;
          _id = navigation.getParam('id');
          token = navigation.getParam('token');
           this.gotoHome(_id,token);

    }

    meetingFix = () => {
        this.props.navigation.navigate("Meeting");
    }
    goBack = () => {
        this.props.navigation.goBack();
    }
    
    gotoHome = (id,token) =>{
      
     this.setState({loading: true});
                  fetch(Base_Url+"/otherUserProfile/"+id, {
                        method: "POST",
                        headers: {
                            'accept': 'application/json',
                            'Content-Type': 'application/json',
                            'device-type':'A',
                            'version' : '1.0',
                            'token': token,
                        },
                        body: JSON.stringify({
                            version: '1.0' 
                        })

                    })
                    .then((response) =>
                    {
                      this.setState({loading: false});
                       console.log("detaillllll",response)
                       if(response.status==200){
                         var data = JSON.parse(response._bodyInit);
                          this.setState({data:data.data})
                         
                          
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
                        <Button style={{ backgroundColor: 'transparent',elevation:0 }} onPress={this.goBack}>
                        <Image style={{ height: 27, width: 27 }} source={require('../assets/back_icon.png')} />
                        </Button>
                    </Left>
                    <Image style={{ height: 30, width: 50, marginTop: 5 }} source={require('../assets/logo_without_text.png')} />
                    <Right></Right>
                </Header>
                 <Spinner
                      visible={this.state.loading}
                     />
                <ScrollView >
                    <View style={styles.containerVIew}>
                        <View style={styles.card}>
                            <ImageBackground source={require('../assets/william.png')} style={{ width: 'auto', height: 260, opacity: .2 }}>
                            </ImageBackground>
                            <View style={styles.dotSetting}>
                                <TouchableOpacity>
                                    <MaterialCommunityIcons name="dots-horizontal" size={25} color='#fff' style={styles.dots} />
                                </TouchableOpacity>
                                <View style={styles.cardOuter}>
                                    <TouchableOpacity>
                                       
                                    </TouchableOpacity>
                                    <View style={styles.cardProfile}>
                                    {data?.profile_pic ?<Image style={{ height: 100, width: 100, borderRadius: 50 }} source={{uri: data?.profile_pic}} />:
                                    <Image style={{ height: 100, width: 100, borderRadius: 50 }} source={require('../assets/william.png')} />}
                                        <View style={{ position: 'absolute', bottom: 5, right: 5 }}>
                                            <TouchableOpacity>
                                                <Entypo name="chat" size={25} color='#fff' />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                   
                                </View>

                                <View style={styles.profileData}>
                                    <Text style={{ color: '#fff', fontSize: 20}}>{data?.name}</Text>
                                    <Text style={{ color: '#fff', paddingTop: 10, }}>{data?.job_title}</Text>
                                    <Text style={{ color: '#989898', fontSize: 10, paddingTop: 20 }}>Location</Text>
                                    <Text style={{ color: '#fff', paddingTop: 10 }}>{data?.address}</Text>
                                </View>

                            </View>
                        </View>
                       

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
                            <Text>{data?.bio}</Text>
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
                            <Text>{data?.project}</Text>
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
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontWeight: 'bold' }}>Days:</Text>
                                <Text>{data?.day}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontWeight: 'bold' }}>Time:</Text>
                                <Text>{data?.time}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontWeight: 'bold' }}>Work Place:</Text>
                                <Text>{data?.work_place}</Text>
                            </View>
                        </View>
                        <View
                            style={{
                                borderBottomColor: '#989898',
                                borderBottomWidth: 0.5,
                                opacity: .2
                            }}
                        />

                        <View style={styles.suggestContent}>
                            <Text style={styles.suggestTextContent}>My Goals</Text>
                            <Text>{data?.goal}</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default OtherProfile;

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
        height: 260,
        width: '100%',
        borderRadius: 5,
        backgroundColor: '#000',
        position: 'relative'
    },
    dots: {
        paddingLeft: 10,
        paddingRight: 10,
        alignSelf: 'flex-end',
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
        backgroundColor: '#fff',
        position: 'relative'
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
        // backgroundColor: "#d9534f",
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 20,
        marginRight: 20,
        marginLeft: 20,
        borderColor: 'transparent'

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
    }
})