import React, { Component, PropTypes } from 'react';
import { View, ScrollView,FlatList,AsyncStorage, TouchableOpacity, ToastAndroid, Alert, Image, Text, ImageBackground, TextInput, StyleSheet, Dimensions } from 'react-native';
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
import Moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';
// import RNPickerSelect from 'react-native-picker-select';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Icon, Right, Body } from 'native-base';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

class BlogList extends Component {

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

  componentWillReceiveProps(nextProps) {
       this._getStoredData();
        if(nextProps.myProp !== this.props.myProps) {
        // Alert.alert("componentWillReceiveProps")
       }
     }

  _getStoredData(){
     AsyncStorage.getItem("user_data").then((value2) => {
          console.log("daaaaaataaaaaaa",value2)
          let data=JSON.parse(value2);
          this.setState({token: data.data.token})
          this.getSuggestions( data.data.token)
        }).done();
  }

  componentDidMount() {
     this._getStoredData();
        
    }

  gotoDetail = (id) => {

    this.props.navigation.navigate('ArticleDetail',{});
  }
  allItems = () => {
  }

  otherProfile = () => {
    this.props.navigation.navigate('OtherProfile');
  }
  gotoSettings = () =>{
    this.props.navigation.navigate("Setting");
}
   getSuggestions = (value) =>{
            this.setState({loading: true});
                  fetch(Base_Url+"/articleList", {
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
                       console.log("articlesss",response)
                       if(response.status==200){
                         var data = JSON.parse(response._bodyInit);
                         this.setState({data:data.data})
                       }
                       else{
                         var errorr = JSON.parse(response._bodyInit);
                         ToastAndroid.show(errorr.message, ToastAndroid.SHORT);
                       }
                     
                    })
    }

  render() {
 const { data } =this.state;

    return (
      <View style={styles.container}>
        <Header
          style={styles.transparentHeader}>
             <Left style={{ flex: 1 }}>
                        <Button style={{ backgroundColor: 'transparent',elevation:0 }} onPress={() => this.props.navigation.goBack()} >
                          <Image style={{ height: 27, width: 27 }} source={require('../assets/back_icon.png')} />
                        </Button>
                    </Left>
           <Text style={{ color: '#fff', fontSize: 18 }}>Blog List</Text>
          <Right></Right>
        </Header>
          <Spinner visible={this.state.loading}/>
               <FlatList
                      refreshing={this.state.isFetching}
                       data={data}
                       keyExtractor={(item, index) => item.label}
                       renderItem={({item,index}) => ( 
              <View style={styles.sub_articles}>

              <View style={{ height: 'auto', width: '100%',backgroundColor: 'transparent',padding:5,borderWidth:1,borderColor:"#ccc" }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('ArticleDetail',{id:item.id,token:this.state.token})}>
                
                {item.image ? <Image style={{ height: 150, width: '100%', borderRadius: 10 }} source={{uri: item.image}} />
                  :<Image style={{ height: 150, width: '100%', borderRadius: 10 }} source={require('../assets/william.png')} />}
                  <View style={{ padding: 5 }}>
                    <Text style={{ fontSize: 12, color: '#54007c',textAlign:"center" }}>{item.title}</Text>
                    <Text style={{ textAlign:"center" }}>POSTED ON</Text>
                    <Text style={{ fontWeight: 'bold', color: '#000',textAlign:"center" }}>{Moment(item.created_at).format('d MMM YYYY')}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
                    )}
                     />
      </View>

    )
  }

}

export default BlogList;

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
   btn: {
        borderRadius: 60,
        color: '#fff',
        position: 'relative',
        marginTop: 30,
        height: 45,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center'
    },
  containerVIew: {
    backgroundColor: '#fff',
    padding: 15
  },
  card: {
    // marginTop:10,
    fontFamily: 'Roboto-Regular',
    height: 260,
    width: '100%',
    borderRadius: 5,
    backgroundColor: '#000',
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
  sub_content: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  sub_articles: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})