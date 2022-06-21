import React, { useState } from 'react';
import { Animated, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Text, View, MaterialIcons } from '../components/Themed';
import { MaterialCommunityIcons} from '@expo/vector-icons';
import { TrackLocationList, TrackTask } from '../constants/Track';
import { TaskContentModel } from '../model/Task';

import { useNavigation } from '@react-navigation/native';
import Avatar from '../assets/images/avatar.svg';

export function TrackScreen() {
    const [locationList, setLocationList] = useState(TrackLocationList)
    const navigation = useNavigation()

    const LocationElement = locationList.map((item, index)  => {
        return(
            <View key={index} >
            <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('TrackingLocation')}>
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


export function TrackLocationScreen() {
    const [taskList, setTaskList] = useState(TrackTask)
    const [active, setActive] = useState(0)
    const [xTabOne, setXTabOne] = useState(0)
    const [xTabTwo, setXTabTwo] = useState(0)
    const [translatex , setTranslatex] = useState( new Animated.Value(0))

    const handleSlide = (type: any) => { 
        Animated.spring(translatex, {
            toValue: type,
            useNativeDriver: false
        }).start()
    }

    const a = new Animated.Value(1);
    const b = Animated.divide(1, a);

  
    const TaskElement = (contentItem: TaskContentModel, i: number) => {
        return(
          <View key={'content' + i}>
            <TouchableOpacity>
                <View style={[styles.ContentContainer]} accessibilityRole='button'>
        
                    {/* title */}
                    <View style={styles.ContentWrapper}>
                    <Text style={styles.TextHeader}>{ contentItem.title }</Text>

                    <View style={styles.DatetimeWrapper}>
                        <MaterialCommunityIcons name="calendar-clock" size={20} color={ contentItem.timestatus=='overdue' ? '#FF4F4F':contentItem.timestatus=='today'? '#FF7B00':'#6c6c6c' } 
                            style={{ marginRight: 5 }} />
                        <Text style={[styles.TextContent, { color: contentItem.timestatus=='overdue' ? '#FF4F4F':contentItem.timestatus=='today'? '#FF7B00':'#6c6c6c' }]}>
                            { contentItem.datetime }
                        </Text>
                    </View>

                    <View style={styles.AssignWrapper}>
                        <Avatar  width={20} height={20} marginRight={10}/>
                        <Text style={styles.TextContent}>{ contentItem.assign }</Text> 
                    </View>
                    

                </View>
    
              </View>
            </TouchableOpacity>
          </View>
        )
    }

    const TaskElementList = (contentData: Array<TaskContentModel>) => {
        return (
          contentData.map((content: TaskContentModel, index: number) => {
            return TaskElement(content, index)
          })
        )
      }

    return(
        <View style={styles.Container}>
            <View style={styles.LocationWarpper}>
                {/* icon */}
                <View style={styles.IconWrapper}>
                <MaterialCommunityIcons name="map-marker-radius-outline" size={32} color={'#6C6C6C'} />
                </View>

                {/* title & content */}
                <Text style={[styles.TextHeader, {marginLeft: 10, color:'#6C6C6C'}]}>{ taskList.location }</Text>
            </View>

            <View style={{flexDirection:'row', position:'relative'}}>
            <View style={{position:'absolute', width:'50%', height:'100%', top:0, left:0, backgroundColor:'#007aff',borderRadius:4,}}/>
                <TouchableOpacity style={{
                    flex:1,
                    justifyContent:'center', 
                    alignItems:'center',
                    borderWidth:1, 
                    borderColor:'#007aff',
                    borderRightWidth:0,
                    borderTopRightRadius:0,
                    borderBottomRightRadius:0,
                    borderRadius:4,
                    padding:5,
                    }}
                    onLayout={event => setXTabOne(event.nativeEvent.layout.x)}
                    onPress={() => {setActive(0), handleSlide(xTabOne)}}
                >
                    <Text>TabOne</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    flex:1,
                    justifyContent:'center', 
                    alignItems:'center',
                    borderWidth:1, 
                    borderColor:'#007aff',
                    borderLeftWidth:0,
                    borderTopLeftRadius:0,
                    borderBottomLeftRadius:0,
                    borderRadius:4,
                    padding:5,
                    }}
                    onLayout={event => setXTabTwo(event.nativeEvent.layout.x)}
                    onPress={() => setActive(1) }
                >
                    <Text>TabTwo</Text>
                </TouchableOpacity>  
            </View>

            { TaskElementList(taskList.successful) }
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
        paddingHorizontal: 10,
        borderRadius: 10,
        width: 380,
    },
    LocationWarpper: {
        flexDirection: 'row',
        paddingVertical: 5,
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
        fontSize: 20,
        fontFamily: 'Mitr_500Medium'
    },
    TextContent: {
        fontSize: 15,
        fontFamily: 'Mitr_500Medium'
    },
    TaskWrapper:{
        flexDirection: 'row',
        backgroundColor: 'transparent',
        marginVertical: 5,
    },
    AssignWrapper:{
        flexDirection: 'row',
        backgroundColor: 'transparent',
        justifyContent: 'flex-start',
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
    DatetimeWrapper: {
        marginTop: 2,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        paddingVertical: 5,
    },
    MoreWrapper: {
        marginLeft: 'auto',
        marginRight: 2,
        backgroundColor: 'transparent'
      },
})