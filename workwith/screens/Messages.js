import React, { Component, PropTypes } from 'react';
import { View,FlatList, TouchableOpacity, ScrollView, ToastAndroid, Alert, Image, Text, ImageBackground, TextInput, StyleSheet,AsyncStorage, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/Octicons';
import Lock from 'react-native-vector-icons/SimpleLineIcons'
import constants from '../common/constants';
import commonstyle from '../common/commonStyles';
import Feather from 'react-native-vector-icons/SimpleLineIcons'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Icon, Right, Body, Row } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Popover, PopoverController } from 'react-native-modal-popover';
import Spinner from 'react-native-loading-spinner-overlay';
import { Base_Url,Base_local_Url } from '../constants/common';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

class Messages extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            isVisible: false,
            messageList:[]
        }

          AsyncStorage.getItem("user_data").then((value2) => {
          console.log("daaaaaataaaaaaa",value2)
          let data=JSON.parse(value2);
          this.setState({token: data.data.token, user_id: data.data.id})
          this.getMessages();
        }).done();
    }

    gotoSettings = () => {
        this.props.navigation.navigate("Setting");
    }

      componentWillReceiveProps(nextProps) {
       this.getMessages();
        if(nextProps.myProp !== this.props.myProps) {
        // Alert.alert("componentWillReceiveProps")
       }
     }

   showPopover=()=> {
        // this.setState({
        //     isVisible: !this.state.isVisible
        // });
        // alert(this.state.isVisible)
    }
 
    closePopover=()=> {
      this.setState({isVisible: false});
    }

    gotToChat = (id) => {
        this.props.navigation.navigate("Chat",{id:id});
    }

     getMessages() {
        this.setState({loading: true});
          fetch(Base_Url+"/users/last-messages-list", {
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
               console.log("messsagesssss",response)
               if(response.status==200){
                 var data = JSON.parse(response._bodyInit);
                  this.setState({messageList: data})
                  
               }
             
              else{

              }
            })
      }

    render() {
    const{ isVisible }=this.state;
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
                <ScrollView>
                
                    <View style={styles.contentContainer}>
                      <Spinner overlayColor='transparent'
                      visible={this.state.loading}
                     />
                       <FlatList
                      data={this.state.messageList}
                       keyExtractor={(item, index) => item.label}
                       refreshing={this.state.isFetching}
                       renderItem={({item,index}) => ( 
                        <View style={styles.content} onPress={(val)=>{this.gotToChat(item.receiver_id)}}>
                            <View style={styles.messageContent}>
                            <TouchableOpacity onPress={(val)=>{this.gotToChat(item.receiver_id)}}>
                                <Image style={styles.image} source={{uri: item.profile_pic}}  />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.centerData}>
                                <TouchableOpacity onPress={(val)=>{this.gotToChat(item.receiver_id)}}>
                                    <Text style={{ fontSize: 20, color: '#54007c' }}>{item.receiverName}
                            </Text>
                                
                                <Text style={{ color: '#000' }}>
                                    {item.message}
                            </Text>
                                <Text>
                                    just now
                            </Text>
                            </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={this.showPopover}>
                                <MaterialCommunityIcons name="dots-horizontal" size={25} color='#000' style={styles.dots} />
                            </TouchableOpacity>
                             {isVisible ? 
                                <View style={{position:'absolute',top:15,right:10,zIndex:10,justifyContent:"flex-end"}}>
                                   <FontAwesome style={{alignSelf: 'flex-end',marginRight:9 }} name="caret-up" size={25} color='#000' />
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
                    )}
                     />

                    </View>
                </ScrollView>
                                      {!this.state.messageList || this.state.messageList.length==0?<View style={{justifyContent:"center",alignItems:"center",height:viewportHeight,width:viewportWidth}}>
                     <Text  style={{textAlign:"center",fontFamily: 'Roboto-Regular',fontSize: 16,color:"#cccccc"}}>No Messages Yet!!</Text></View>:null}
            </View>
        )
    }
}

export default Messages;
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
        color: 'white'
    },
    contentContainer: {
        padding: 15,
        height: viewportHeight,
        width: viewportWidth
    },
    content: {
        padding: 10,
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
        flexDirection: 'column',
        width: '50%',
    },
    dots: {
        alignSelf: 'flex-end',

    },
    image: {
        height: 90,
        width: 90,
        borderRadius: 45,
        borderWidth: 1,
        borderColor: '#000'
    }
})