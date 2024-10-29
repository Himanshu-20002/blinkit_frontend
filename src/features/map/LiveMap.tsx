import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '../../utils/Constants'
import {screenHeight} from '../../utils/Scaling'

const LiveMap = () => {
  return (
    <View style={styles.container}>
      <Text>LiveMap</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        height:screenHeight*0.35,
        width:'100%',
        borderRadius:15,
        backgroundColor:'#fff',
        borderWidth:1,
        borderColor:Colors.border,
        position:'relative',
        overflow:'hidden'
    }
})
export default LiveMap