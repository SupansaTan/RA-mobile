import React, { useState } from 'react';
import { StyleSheet, Switch, Platform, TouchableOpacity, TextInput } from 'react-native';
import { Fontisto, FontAwesome } from '@expo/vector-icons'
import Colors from '../constants/Colors';
import { Text, View, MaterialIcons } from '../components/Themed';
import { MaterialCommunityIcons} from '@expo/vector-icons';
import { TrackLocationList } from '../constants/Track';
import { TrackTaskList } from '../constants/Track';

export default function TrackScreen() {
    const [locationList, setLocationList] = useState(TrackLocationList)
    const [taskList, setTaskList] = useState(TrackLocationList)

    const LocationElement = locationList.map((item, index)  => {
        return(
            <View key={index} >
            <TouchableOpacity>
            <View style={styles.ContentContainer}>
                <View style={styles.LocationWarpper}>
                    {/* icon */}
                    <View style={styles.IconWrapper}>
                    <MaterialCommunityIcons name="map-marker-radius-outline" size={32} color={'#6C6C6C'} />
                    </View>

                    {/* title & content */}
                    <Text style={[styles.TextHeader, {marginLeft: 10}]}>{ item.location }</Text>

                    {/* icon */}
                    <View style={styles.MoreWrapper}>
                    <MaterialIcons name="keyboard-arrow-right" size={30} />
                    </View>
                </View>
                
                {/* task process */}
                <View style={styles.ContentWrapper}>
                    <View style={styles.TaskWrapper}>
                        <Text style={[styles.TextContent, {color:'#13AF82'}]}> ดำเนินการเรียบร้อย </Text>
                        {/* total successful task */}
                        <View style={styles.NumberWrapper}>
                            <View style={[styles.NumberCard, {backgroundColor: '#DEF4EC'}]}>
                                <Text style={[styles.TextContent, {color:'#13AF82'}]}> {item.successful} </Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.TaskWrapper}>
                        <Text style={[styles.TextContent, {color:'#FF4F4F'}]}> รอดำเนินการ </Text>
                        {/* total in process task */}
                        <View style={styles.NumberWrapper}>
                            <View style={[styles.NumberCard, {backgroundColor: '#FFDBDB'}]}>
                                <Text style={[styles.TextContent, {color:'#FF4F4F'}]}> {item.inprogress} </Text>
                            </View>
                        </View>
                    </View>
                </View>

            </View> 
            </TouchableOpacity>
        </View>
        )
    })

    return(
        <View style={styles.Container}>
            {LocationElement}
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
    ContentContainer: {
        flexDirection: 'column',
        padding: 10,
        borderRadius: 10,
        width: 380,
    },
    LocationWarpper: {
        flexDirection: 'row',
    },
    ContentWrapper: {
        marginVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
    },
    IconWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    TextHeader: {
        fontSize: 18,
        fontFamily: 'Mitr_500Medium'
    },
    TextContent: {
        fontSize: 15,
        fontFamily: 'Mitr_400Regular'
    },
    MoreWrapper: {
        marginLeft: 'auto',
        backgroundColor: 'transparent'
    },
    TaskWrapper:{
        flexDirection: 'row',
        backgroundColor: 'transparent',
        marginVertical: 5,
    },
    NumberWrapper: {
        marginLeft: 'auto',
        marginRight: 2,
        backgroundColor: 'transparent'
    },
    NumberCard: {
    borderRadius: 15,
    paddingVertical: 2,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    },
})