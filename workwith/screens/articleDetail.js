import React, { Component, PropTypes } from 'react';
import { View, ScrollView, TouchableOpacity, ToastAndroid, Alert, Image, Text, ImageBackground, TextInput, StyleSheet, Dimensions } from 'react-native';
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
import Spinner from 'react-native-loading-spinner-overlay';
import Moment from 'moment';
// import RNPickerSelect from 'react-native-picker-select';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Icon, Right, Body } from 'native-base';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

let _id,token;
class ArticleDetail extends Component {

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
        }
    }

    componentDidMount() {
         const { navigation } = this.props;
          _id = navigation.getParam('id');
           token = navigation.getParam('token');
           this.gotoHome();

    }
    gotoCreateProfile = () => {
        this.props.navigation.goBack();
    }

    gotoHome = () =>{
      
     this.setState({loading: true});
                  fetch(Base_Url+"/articleDetails", {
                        method: "POST",
                        headers: {
                            'accept': 'application/json',
                            'Content-Type': 'application/json',
                            'device-type':'A',
                            'version' : '1.0',
                            'token': token,
                        },
                        body: JSON.stringify({
                            article_id: _id,
                            device_id: 'fhukefjrgjnrk',
                            device_type: 'A',
                            version: '1.0' 
                        })

                    })
                    .then((response) =>
                    {
                      this.setState({loading: false});
                       console.log(response)
                       if(response.status==200){
                         var data = JSON.parse(response._bodyInit);
                          this.setState({data:data.data})
                         
                          
                       }
                    })
      
    }

    render() {

 const{data}=this.state;
        return (
            <View style={styles.container}>
                <Header
                    style={styles.transparentHeader}>
                     <Left style={{ flex: 1 }}>
                        <Button style={{ backgroundColor: 'transparent',elevation:0 }} onPress={this.gotoCreateProfile}>
                        <Image style={{ height: 27, width: 27 }} source={require('../assets/back_icon.png')} />
                        </Button>
                    </Left>
                    <Text style={{ color: '#fff', fontSize: 18 }}>Blog Detail</Text>
                    <Right>
                    </Right>
                </Header>
                 <Spinner
                      visible={this.state.loading}
                     />
                <ScrollView>
                    <View style={styles.containerVIew}>
                        <View style={styles.card}>
                        {data?.image ? <Image style={{ width: 'auto', height: 260, borderRadius: 5 }} source={{uri: data?.image}} />
                  :<Image style={{ width: 'auto', height: 260, borderRadius: 5 }} source={require('../assets/william.png')} />}
                        </View>
                        <View style={{ width: '100%', height: 'auto', backgroundColor: 'transparent', paddingTop: 10 }}>

                            <Text style={{ fontSize: 18, color: '#54007c' }}>{data?.title}</Text>
                            <View style={{ paddingTop: 5, paddingBottom: 5 }}>
                                <Text>POSTED ON</Text>
                                <Text style={{ fontWeight: 'bold', color: '#000' }}>{Moment(data?.created_at).format('d MMM YYYY')}</Text>
                            </View>
                            <Text style={{ color: '#000' }}>{data?.description}</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>

        )
    }

}

export default ArticleDetail;

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

})