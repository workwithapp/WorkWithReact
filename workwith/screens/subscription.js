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

// import RNPickerSelect from 'react-native-picker-select';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Icon, Right, Body } from 'native-base';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

class Subscription extends Component {

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

    }
    gotoCreateProfile = () => {
        this.props.navigation.goBack();
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
                    <Text style={{ color: '#fff', fontSize: 18 }}>Subscription</Text>
                    <Right>
                    </Right>
                </Header>
                <ScrollView>
                    <View style={styles.containerVIew}>
                        <ImageBackground source={require('../assets/gradient_bg.jpg')} style={{ width: viewportWidth, height: 100 }}>
                            <View style={{ padding: 10 }}>
                                <View style={styles.header_content}>
                                    <Text style={{ color: '#fff' }}>Current Subscription</Text>
                                    <Text style={{ color: '#fff' }}>Days Left</Text>
                                </View>
                                <View style={styles.header_content}>
                                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#fff' }}>1 MONTH</Text>
                                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#fff' }}>2 Days</Text>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={styles.subscription_content}>
                        <Text style={{ color: '#000',fontSize:12 }}>You can choose another plan below</Text>
                        <View style={{
                            marginTop: 10, height: 'auto',width: '100%'}}>
                            
                            <View style={styles.subscription_box}>
                                <Text style={{ fontSize: 20, color: '#000' }}> 1 month
                            </Text>
                                <Text style={{ color: '#488aff', fontWeight: 'bold', fontSize: 20 }}>$198.99
                            </Text>
                                <Text style={{ color: '#989898' }}>($ 198.99/month)
                            </Text>
                            </View>

                            <View style={styles.subscription_box}>
                                <Text style={{ fontSize: 20, color: '#000' }}> 1 month
                            </Text>
                                <Text style={{ color: '#488aff', fontWeight: 'bold', fontSize: 20 }}>$198.99
                            </Text>
                                <Text style={{ color: '#989898' }}>($ 198.99/month)
                            </Text>
                            </View>

                            <View style={styles.subscription_box}>
                                <Text style={{ fontSize: 20, color: '#000' }}> 1 month
                            </Text>
                                <Text style={{ color: '#488aff', fontWeight: 'bold', fontSize: 20 }}>$198.99
                            </Text>
                                <Text style={{ color: '#989898' }}>($ 198.99/month)
                            </Text>
                            </View>
                        </View>
                        <View style={styles.btn}>
                        <TouchableOpacity style={[commonstyle.btn, commonstyle.linkedin_btn, styles.btn]} onPress={this.changePassword}>
                            <Text style={[commonstyle.bold_text, commonstyle.btn_text]}>Subscribe Now</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </ScrollView>
            </View>

        )
    }

}

export default Subscription;

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
        width: viewportWidth,
        height: 70
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
    header_content: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    subscription_content: {
        alignItems: 'center',
        padding: 50
    },

    subscription_box: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 10,
        height: 'auto',
        width: '100%',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn: {
        borderRadius: 60,
        color: '#488aff',
        position: 'relative',
        marginTop: 20,
        height: 45,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }

})