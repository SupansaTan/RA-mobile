import React, { useState } from 'react';
import { StyleSheet, Switch, Platform, TouchableOpacity, TextInput } from 'react-native';
import { Fontisto, FontAwesome } from '@expo/vector-icons';
import Avatar from '../assets/images/avatar.svg';
import Colors from '../constants/Colors';
import { Text, View, MaterialIcons } from '../components/Themed';
import { UserInfo } from '../constants/UserInfo';
import { MaterialCommunityIcons} from '@expo/vector-icons';

export default function ProfileScreen() {
    const [itemList, setItemList] = useState(UserInfo.Roles)

    const RoleElement = itemList.map((item, index)  => {
        return(
            <View key={index}>
                <View style={styles.RoleWrapper}>
                    <Text style={styles.TextHeader} >{item.Role}</Text>
                    <View style={styles.LocationWrapper}>
                        <MaterialCommunityIcons name="map-marker-radius-outline" size={32} color='#13AF82' />
                        <Text style={styles.TextDatail} >{item.Location}</Text> 
                    </View>
                </View>
            </View>
            
        )
    })

    return(
        <View style={styles.Container}>
            <View style={styles.UserWrapper}>
                <Avatar  width={80} height={80} marginRight={20}/>
                <View style={styles.UserTextWrapper}>
                    <Text style={styles.TextHeader} >{UserInfo.Fname} {UserInfo.Lname}</Text>
                    <Text style={styles.TextDatail} >{UserInfo.Email}</Text> 
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
    TextHeader:{
        fontSize: 23,
        fontFamily: 'Mitr_500Medium',
    },
    TextDatail:{
        fontSize: 18,
        fontFamily: 'Mitr_500Medium',
        marginHorizontal: 5,
    }
})