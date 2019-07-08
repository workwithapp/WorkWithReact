import React, { Component, PropTypes } from 'react';
import { View,FlatList, TouchableOpacity,AsyncStorage, ScrollView, ToastAndroid, Alert, Image, Text, ImageBackground, TextInput, StyleSheet, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Icons from 'react-native-vector-icons/Octicons';
import Lock from 'react-native-vector-icons/SimpleLineIcons'
import constants from '../common/constants';
import commonstyle from '../common/commonStyles';
import Feather from 'react-native-vector-icons/SimpleLineIcons'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Icon, Right, Body, Row } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Base_Url,Base_local_Url } from '../constants/common';
import Spinner from 'react-native-loading-spinner-overlay';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

class MyMatches extends Component {

    constructor(props) {
        super(props);
        this.state={
            _data:""
        }
    }

    gotoSettings = () => {
        this.props.navigation.navigate("Setting");
    }

     gotoChat = (id) => {
        this.props.navigation.navigate("Chat",{id:id});
    }

    otherProfile =(id)=>{
        // alert(id)
        this.props.navigation.navigate("OtherProfile",{id:id,token:this.state.token});
    }

     componentWillReceiveProps(nextProps) {
       this._getStoredData();
        if(nextProps.myProp !== this.props.myProps) {
        // Alert.alert("componentWillReceiveProps")
       }
     }
     _getStoredData(){
          AsyncStorage.getItem("user_data").then((value2) => {
          // console.log("daaaaaataaaaaaa",value2)
          let data=JSON.parse(value2);
          this.setState({token: data.data.token})
           this.getMatches( data.data.token)
        }).done(); 
     }

    componentDidMount() {
       this._getStoredData();
    }

       getMatches = (value) =>{
            this.setState({loading: true});
                  fetch(Base_Url+"/users/my-matches", {
                        method: "GET",
                        headers: {
                            'accept': 'application/json',
                            'Content-Type': 'application/json',
                            'device-type':'A',
                            'version' : '1.0',
                            'token':value
                        }

                    })
                    .then((response) =>
                    {
                      this.setState({loading: false});
                       console.log("mathcessssss",response)
                       if(response.status==200){
                         var data = JSON.parse(response._bodyInit);
                         this.setState({_data:data.data})
                         console.log(this.state._data)
                         // alert(this.state.data[this.state.currentIndex].email)
                         // console.log("stateee dataaaaa",this.state.data)
                       }
                       else{
                         var errorr = JSON.parse(response._bodyInit);
                         ToastAndroid.show(errorr.message, ToastAndroid.SHORT);
                       }
                     
                    })
     }
    render() {
        const {_data}=this.state;
        return (
            <View style={styles.container}>
                <Header
                    style={styles.transparentHeader}>
                    <Left style={{ flex: 1 }}>
                        <Button style={{ backgroundColor: 'transparent', elevation: 0 }} onPress={this.gotoSettings}>
                            <Feather name="settings" size={25} style={styles.btn_icon} />
                        </Button>
                    </Left>
                    <Image style={{ height: 30, width: 50, marginTop: 2 }} source={require('../assets/logo_without_text.png')} />
                    <Right></Right>
                </Header>
                 <Spinner overlayColor='transparent'
                      visible={this.state.loading}
                     />
                    <FlatList
                      data={_data}
                       keyExtractor={(item, index) => item.label}
                       renderItem={({item,index}) => ( 
                   
                        <TouchableOpacity style={styles.content} onPress={(val)=>{this.otherProfile(item.userId)}}>
                            <View style={styles.messageContent}>
                            
                             {item.profile_pic ?<Image style={styles.image} source={{uri: item.profile_pic}} />:
                                <Image style={styles.image} source={require('../assets/user1.png')} />}
                            </View>
                            <View style={styles.centerData}>
                                <TouchableOpacity onPress={(val)=>{this.otherProfile(item.userId)}}>
                                    <Text style={{ fontSize: 18, color: '#54007c' }}>{item.usename}
                            </Text>
                                    <Text style={{ color: '#000' }}>
                                        {item.job_title}
                            </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TouchableOpacity >
                                   <Image style={styles.dots} source={require('../assets/right_arrow.png')} />
                                </TouchableOpacity>
                            </View>
                    </TouchableOpacity>
                    )}
                     />
                      {!_data || _data.length==0?<View style={{justifyContent:"center",alignItems:"center",height:viewportHeight,width:viewportWidth}}>
                     <Text  style={{textAlign:"center",fontFamily: 'Roboto-Regular',fontSize: 16,color:"#cccccc"}}>No Matches Yet!!</Text></View>:null}
            </View>
        )
    }
}

export default MyMatches;
const styles = StyleSheet.create({

    container: {
        flex: 1
    },
    transparentHeader: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#488aff',
        borderBottomColor: 'transparent'
    },
    btn_icon: {
        color: 'white'
    },
    contentContainer: {
        padding: 15,
        backgroundColor: '#fff',
        height: viewportHeight,
        width: viewportWidth
    },
    content: {
        padding: 10,
        margin:10,
        alignItems: 'center',
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    messageContent: {
        height: 90,
        width: 90,
        backgroundColor: '#000',
        borderRadius: 45,
    },
    centerData: {
        paddingLeft:0,
        flexDirection: 'column',
        width: '50%',
    },
    dots: {
        alignSelf: 'flex-end',
        height:18,
        width:18
    },
    image: {
        height: 90,
        width: 90,
        borderRadius: 45,
        borderWidth: 1,
        borderColor: '#000'
    }
})