import React, { useState } from 'react';
import { StyleSheet, Appearance } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import Avatar from '../assets/images/avatar.svg';
import Colors from '../constants/Colors';
import { Text, View, MaterialIcons } from '../components/Themed';
import { UserInfo } from '../constants/UserInfo';

export default function ProfileScreen() {
    const [itemList, setItemList] = useState(UserInfo.Roles)

    const RoleElement = itemList.map((item, index)  => {
        return(
            <View key={index}>
                <View style={styles.RoleWrapper}>
                    <Text style={[styles.TextHeader, {color:'#000'}]} >{item.Role}</Text>
                    <View style={styles.LocationWrapper}>
                        <Feather name="map-pin" size={22} color="#13AF82" />
                        <Text style={styles.TextDatail} >{item.Location}</Text> 
                    </View>
                </View>
            </View>
            
        )
    })

    return(
        <View style={styles.Container}>
            <View style={styles.UserWrapper}>
                <Avatar  width={70} height={70} marginRight={20}/>
                <View style={styles.UserTextWrapper}>
                    <Text style={styles.TextHeader} >{UserInfo.Fname} {UserInfo.Lname}</Text>
                    <View style={styles.EmailWrapper}>
                        <Text style={[styles.EmailText, {color: '#000'}]} >{UserInfo.Email}</Text> 
                    </View>
                </View>
            </View>

            <Text style={styles.TextHeader} >ตำแหน่ง</Text>
            {RoleElement}
        </View>
    )
}


const styles = StyleSheet.create({
    Container: {
        flex: 1,
        flexGrow:1,
        paddingHorizontal: 10,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop:10,
    },
    RoleWrapper:{
        backgroundColor: '#fff',
        width: 370,
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        alignItems: 'flex-start',
    },
    LocationWrapper:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        marginVertical: 5,
    },
    UserWrapper:{
        flexDirection: 'row',
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        alignItems: 'center',
    },
    UserTextWrapper:{
        flexDirection: 'column',
    },
    EmailWrapper: {
        borderRadius: 50,
        backgroundColor: '#EEEEEE',
    },
    EmailText: {
        fontSize: 18,
        fontFamily: 'Mitr_500Medium',
        paddingVertical: 2,
        paddingHorizontal: 10,
        color: '#000'
    },
    TextHeader:{
        fontSize: 22,
        fontFamily: 'Mitr_500Medium',
    },
    TextDatail:{
        fontSize: 18,
        color: '#13AF82',
        fontFamily: 'Mitr_500Medium',
        marginHorizontal: 5,
    }
})