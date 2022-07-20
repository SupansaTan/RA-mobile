import React, { useState } from 'react';
import { StyleSheet, Pressable, TextInput } from 'react-native';
import { Text, View } from '../../components/Themed';
import { useNavigation } from '@react-navigation/native';

export default function ResetPasswordScreen() {
    const navigation =  useNavigation()
    const [newpassword, onChangeNewpassword] = useState('')
    const [confirmpassword, onChangeConfirmpassword] = useState('')

    const CheckPassword = () => {
        if (newpassword==confirmpassword) {
            navigation.navigate('Root')
        }
    }

    return(
        <View style={styles.Container}>
            <View style={styles.ContentContainer}>
                <Text style={[styles.TextHeader, {marginBottom:20}]}>Reset Password</Text>
                <Text style={styles.TextContent} >New Password</Text>
                <TextInput
                    style={styles.Input}
                    onChangeText={onChangeNewpassword}
                    value={newpassword}
                    placeholder="new password"
                    secureTextEntry={true}
                />
                <Text style={styles.TextContent} >Confirm New Password</Text>
                <TextInput
                    style={styles.Input}
                    onChangeText={onChangeConfirmpassword}
                    value={confirmpassword}
                    placeholder="comfirm new password"
                    secureTextEntry={true}
                />
                <Pressable style={styles.Button} onPress={() => CheckPassword()}>
                    <Text style={styles.TextBT}>ยืนยัน</Text>
                </Pressable>
            </View>
            
        </View>
    )
}


const styles = StyleSheet.create({
    Container: {
        flex: 1,
        flexGrow:1,
        paddingHorizontal: 10,
    },
    ContentContainer:{
        flex: 1,
        paddingHorizontal:20,
        backgroundColor:'transparent',
        marginBottom:80,
        marginTop:20,
    },
    Input : {
        borderWidth:1, 
        width:'100%',
        borderRadius:5,
        height:40,
        marginBottom:15,
        padding:10
    },
    TextHeader:{
        fontSize: 22,
        fontFamily: 'Mitr_500Medium',
    },
    TextContent:{
        fontSize: 18,
        fontFamily: 'Mitr_500Medium',
    },
    Button: {
        width:'100%',
        backgroundColor: '#13AF82',
        height:'7%',
        alignItems:'center',
        justifyContent: 'center',
        borderRadius:10,
        marginTop:20,
        elevation:5,
    },
    TextBT: {
        color:'white',
        fontSize: 22,
        fontFamily: 'Mitr_500Medium',
    },
})