import React, { Component, PropTypes } from 'react';
import { View, TouchableOpacity, ScrollView, ToastAndroid, Alert, Image, Text, ImageBackground, TextInput, StyleSheet, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/Octicons';
import Lock from 'react-native-vector-icons/SimpleLineIcons'
import constants from '../common/constants';
import commonstyle from '../common/commonStyles';
import Feather from 'react-native-vector-icons/SimpleLineIcons'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Icon, Right, Body, Row } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

class BlockedUsers extends Component {

    constructor(props) {
        super(props);
    }

    goBack = () => {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    style={styles.transparentHeader}>
                    <Left style={{ flex: 1 }}>
                        <Button style={{ backgroundColor: 'transparent',elevation:0 }} onPress={this.goBack}>
                        <Image style={{ height: 27, width: 27 }} source={require('../assets/back_icon.png')} />
                        </Button>
                    </Left>
                    <Text style={{ color: '#fff', fontSize: 18 }}>Blocked Users</Text>
                    <Right></Right>
                </Header>
                <ScrollView>
                    <View style={styles.contentContainer}>
                        <View style={styles.content}>
                            <View style={styles.messageContent}>
                                <Image style={styles.image} source={require('../assets/william.png')} />
                            </View>
                            <View style={styles.centerData}>
                                <Text style={{ fontSize: 18, color: '#54007c' }}>Mary Jane
                            </Text>
                                <Text style={{ color: '#000' }}>
                                    Hello yeah i am here
                            </Text>
                            </View>
                            <TouchableOpacity style={[styles.btn, commonstyle.linkedin_btn]} onPress={this.editProfile}>
                                <Text style={[commonstyle.bold_text, styles.btn_text]}>Unblock</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default BlockedUsers;
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
    btn: {
        borderRadius: 40,
        color: '#fff',
        position: 'relative',
        height: 35,
        padding: 5,
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    contentContainer: {
        padding: 15,
        height: viewportHeight,
        width: viewportWidth
    },
    content: {
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
        padding: 5,
        flexDirection: 'column',
        width: '40%',
    },
    dots: {
        alignSelf: 'flex-end',

    },
    btn_text: {
        fontSize: 13,
        color: '#fff',
    },
    image: {
        height: 90,
        width: 90,
        borderRadius: 45,
        borderWidth: 1,
        borderColor: '#000'
    }
})