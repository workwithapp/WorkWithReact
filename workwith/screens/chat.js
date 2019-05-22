import React, { Component, PropTypes } from 'react';
import { View,AsyncStorage,FlatList, ScrollView, TouchableOpacity, ToastAndroid, Alert, Image, Text, ImageBackground, TextInput, StyleSheet, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo'
import constants from '../common/constants';
import commonstyle from '../common/commonStyles';
import { Dropdown } from 'react-native-material-dropdown';
import Feather from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Base_Url } from '../constants/common';
// import RNPickerSelect from 'react-native-picker-select';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Icon, Right, Body } from 'native-base';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
 var _id;
 let interval;
class Chat extends Component {

    static navigationOptions = {
        header: {
            visible: false,
        }
    };

    constructor() {
        super();
        this.state = {

            items: [],
            activeItem: 0,
            message:"",
            _data:[]
        }
    }

    componentDidMount() {
         const { navigation } = this.props;
          _id = navigation.getParam('id');
            AsyncStorage.getItem("user_data").then((value2) => {
          // console.log("daaaaaataaaaaaa",value2)
          let data=JSON.parse(value2);
          this.setState({token: data.data.token,user_id: data.data.id})
           this.getMessage();
        }).done(); 

     this.setState({interval: setInterval(()=>{
       this.getMessage();
     },1000)
    })

    }
    gotoCreateProfile = () => {
         clearInterval(this.state.interval);
    // alert("calleddd")   
      this.props.navigation.navigate("Messages",{refresh: 'refresh'});
    }

  componentWillUnmount () {
    
     clearInterval(this.state.interval);
       this.props.navigation.navigate("Messages",{refresh: 'refresh'});
  }
  getMessage=()=>{
       this.setState({loading: true});
                  fetch(Base_Url+"/users/get-message/"+_id, {
                        method: "GET",
                        headers: {
                            'accept': 'application/json',
                            'Content-Type': 'application/json',
                            'device-type':'A',
                            'version' : '1.0',
                            'token':this.state.token
                        }

                    })
                    .then((response) =>
                    {
                      this.setState({loading: false});
                       console.log("gwet messaageee",response)
                       if(response.status==200){
                         var data = JSON.parse(response._bodyInit);
                         this.setState({_data:data.data})
                         // console.log(this.state._data)
                       }
                       else{
                         var errorr = JSON.parse(response._bodyInit);
                         ToastAndroid.show(errorr.message, ToastAndroid.SHORT);
                       }
                     
                    })
    }

    sendMessage=()=>{
        // alert()
       this.setState({loading: true});
                  fetch(Base_Url+"/users/send-message/"+_id, {
                        method: "POST",
                        headers: {
                            'accept': 'application/json',
                            'Content-Type': 'application/json',
                            'device-type':'A',
                            'version' : '1.0',
                            'token':this.state.token
                        },
                        body: JSON.stringify({
                            message: this.state.message 
                        })

                    })
                    .then((response) =>
                    {
                      this.setState({loading: false,message:"",isFetching:!this.state.isFetching});
                       console.log("sendddd messaageee",response)
                       if(response.status==200){
                         var data = JSON.parse(response._bodyInit);
                         this.getMessage();
                         // this.setState({_data:data.data})
                         console.log(this.state._data)
                       }
                       else{
                         var errorr = JSON.parse(response._bodyInit);
                         ToastAndroid.show(errorr.message, ToastAndroid.SHORT);
                       }
                     
                    })
    }

    render() {


        return (
            <View style={styles.container}>
                <Header
                    style={styles.transparentHeader}>
                    <Left style={{ flex: 1 }}>
                        <Button style={{ backgroundColor: 'transparent',elevation:0 }} onPress={this.gotoCreateProfile}>
                        <Image style={{ height: 27, width: 27 }} source={require('../assets/back_icon.png')} />
                        </Button>
                    </Left>
                    <Text style={{ color: '#fff', fontSize: 18 }}>Chat</Text>
                    <Right>
                    </Right>
                </Header>
                 <ScrollView  ref={ref => this.scrollView = ref}
                    onContentSizeChange={(contentWidth, contentHeight)=>{        
                    this.scrollView.scrollToEnd({animated: true});
                  }}>
                 <FlatList
                      data={this.state._data}
                       keyExtractor={(item, index) => item.label}
                       refreshing={this.state.isFetching}
                       renderItem={({item,index}) => ( 
                      <View style={styles.containerVIew}>
                     
                        {this.state.user_id == item.sender_id ?<View style={{ flexDirection: 'row', position: 'relative', marginTop: 15, justifyContent: 'flex-start' }}>

                            <View style={{ height: 40, width: '40%' }}>

                            </View>

                            <View style={styles.right_content} >
                                <Text style={{ color: '#fff' }}>{item.message}</Text>
                            </View>
                            <Ionicons name="md-arrow-dropright" size={25} style={styles.arrow_right} />
                        </View>:
                        <View style={{ flexDirection: 'row', position: 'relative', marginTop: 15, justifyContent: 'flex-end' }}>

                            <View style={styles.left_content} >
                                <Text style={{ color: '#488aff' }}>{item.message}</Text>
                            </View>

                            <View style={{ height: 40, width: '40%' }}>

                            </View>

                            <Ionicons name="md-arrow-dropleft" size={25} style={styles.arrow_left} />
                        </View>}
                    
                    </View>
                    )}
                     />
                 </ScrollView>
                <View style={styles.footer}>
                    <View style={styles.input_outer}>

                        <TextInput style={{
                            alignSelf: 'stretch',
                            color: '#000',
                            paddingLeft: 10,
                            height:50
                        }}
                        value={this.state.message}
                            onChangeText={(message) => this.setState({ message })}
                            autoCapitalize='none'
                            returnKeyType="done"
                            underlineColorAndroid='transparent'
                            placeholder="Write a message"
                            placeholderTextColor='#000' >
                        </TextInput>
                        
                        <FontAwesome name="send-o" size={20} style={styles.input_icon}  onPress = {this.sendMessage}/>
                        
                    </View>
                </View>
            </View>

        )
    }

}

export default Chat;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff'
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
    arrow_right: {
        color: '#488aff',
        position: 'absolute',
        top: 8,
        right: 0
    },
    arrow_left: {
        color: '#989898',
        position: 'absolute',
        top: 8,
        left: 0
    },
    containerVIew: {
        padding: 20
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
    view_profile: {
        flexDirection: 'row'
    },
    right_content: {
        borderRadius: 5,
        width: '58%',
        backgroundColor: '#488aff',
        alignItems: 'flex-start',
        justifyContent: 'center',
        height: 'auto',
        padding: 5
    },
    left_content: {
        borderRadius: 5,
        borderWidth: 1,
        width: '58%',
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderColor: '#989898',
        height: 'auto',
        padding: 5
    },
    footer: {
        width: viewportWidth,
        height: 50,
        justifyContent: 'flex-end'
    },
    input_outer: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        position: 'relative',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#989898'
    },
    input_icon: {
        position: 'absolute',
        right: 10,
        color: '#488aff'
    },
    // textInput:{
    //     width:viewportWidth,
    //     height:20,
    //     backgroundColor:'#000',
    //     flexDirection:'row',
    //     justifyContent:'space-between'
    // }


})