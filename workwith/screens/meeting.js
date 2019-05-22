
import React, { Component, PropTypes } from 'react';
import { View, TouchableOpacity, ToastAndroid, Alert, Image, Text, Button, ImageBackground, TextInput, StyleSheet, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import constants from '../common/constants';
import commonstyle from '../common/commonStyles';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

class Meeting extends Component {

    constructor(props) {
        super(props);
    }

    gotoEmail = () => {
        this.props.navigation.navigate("Login");
    }
    goTochat = () => {
        this.props.navigation.navigate("Chat");
    }
    goToSuggest = () => {
        this.props.navigation.navigate("Suggested");
    }
    render() {
        // const={this.state.navigation};
        return (
            <ImageBackground source={require('../assets/gradient_bg.jpg')} style={{ width: viewportWidth, height: (viewportHeight) }}>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <View style={styles.Meetingimage}>
                            <Image style={{ height: 100, width: 100, borderRadius: 50, borderWidth: 2, borderColor: '#fff' }} source={require('../assets/hair_put1.jpg')} />
                        </View>
                        <View style={styles.Meetingimage}>
                            <Image style={{ height: 100, width: 100, borderRadius: 50, borderWidth: 2, borderColor: '#fff' }} source={require('../assets/william.png')} />
                        </View>
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.contentText}>You and Mary Jane</Text>
                        <Text style={styles.contentText}>are matched</Text>
                    </View>
                    <View style={styles.submitButton}>
                        <TouchableOpacity style={[styles.btn, commonstyle.white_btn]} onPress={this.goTochat}>
                            <Text style={[commonstyle.btn_text, { color: constants.BLUE }, commonstyle.bold_text]}>Send A Message</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btn, styles.white_btn]} onPress={this.goToSuggest} >
                            <Text style={[commonstyle.btn_text, { color: constants.White }, commonstyle.bold_text]}>Keep Browsing</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        );

    }

}

export default Meeting;

const styles = StyleSheet.create({
    container: {
        // marginTop: 80,
        flex: 1,
        padding: 20,
        fontFamily: 'Roboto-Regular'

    },
    imageContainer: {
        marginTop: 130,
        flexDirection: 'row',
        paddingLeft: 55,
        paddingRight: 55,
        alignItems: 'center',
        justifyContent: 'space-between'

    },
    Meetingimage: {
        height: 100,
        width: 100,
        alignSelf: 'center',
        borderRadius: 50,
        backgroundColor: '#fff'
    },
    content: {
        marginTop: 30,
        alignItems: 'center',
    },
    contentText: {
        color: '#fff',
        fontSize: 20
    },
    btn: {
        borderRadius: 60,
        color: '#fff',
        position: 'relative',
        marginTop: 15,
        height: 45,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    submitButton: {
        padding: 30
    },
    white_btn: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#fff'
    }

});