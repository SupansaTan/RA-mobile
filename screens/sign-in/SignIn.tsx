import React, { useState } from 'react';
import { StyleSheet, Pressable, TextInput } from 'react-native';
import { Text, View } from '../../components/Themed';
import { useNavigation } from '@react-navigation/native';


export default function SignInScreen() {
    const navigation =  useNavigation()
    const [email, onChangeEmail] = useState('')
    const [password, onChangePassword] = useState('')

    return(
        <View style={styles.Container}>
            <View style={styles.ContentContainer}>
                <Text style={styles.GreenText}>เข้าสู่ระบบ</Text>
                <Text style={styles.TextHeader} >Email</Text>
                <TextInput
                    style={styles.Input}
                    onChangeText={onChangeEmail}
                    value={email}
                    placeholder="name@cpf.co.th"
                    clearButtonMode='always'
                    keyboardType='email-address'
                />
                <Text style={styles.TextHeader} >Password</Text>
                <TextInput
                    style={styles.Input}
                    onChangeText={onChangePassword}
                    value={password}
                    placeholder="password"
                    secureTextEntry={true}
                />
                <View style={{alignItems:'flex-end'}}>
                    <Pressable onPress={() => navigation.navigate('ResetPassword')}>
                    <Text style={[styles.GreenText,{fontSize:18}]}>ลืมรหัสผ่าน?</Text>
                </Pressable>
                </View>
                <Pressable style={styles.Button} onPress={() => navigation.navigate('Root')}>
                    <Text style={styles.TextBT}>เข้าสู่ระบบ</Text>
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
        justifyContent: 'center',
        marginBottom:80
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
    GreenText:{
        fontSize: 25,
        color: '#13AF82',
        fontFamily: 'Mitr_500Medium',
        marginBottom:20,
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