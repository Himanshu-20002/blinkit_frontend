import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import { NoticeHeight } from '../../utils/Scaling'
import CustomText from '@components/ui/CustomText'
import { Fonts } from '../../utils/Constants'
import Svg from 'react-native-svg'
import { Defs, Path, G, Use } from 'react-native-svg'
import { wavyData } from '../../utils/dummyData'

const Notice = () => {
  return (
    <View style={{height:NoticeHeight}}>
      <View style={styles.Container}>   
        <View style={styles.noticeContainer}>
           <SafeAreaView style={{padding:10}}>
            <View style={styles.noticeContent}>
               <CustomText style={styles.heading} variant='h8' fontFamily={Fonts.SemiBold}>
                It's raining near this location 
                </CustomText>
                <CustomText style={styles.textCenter} variant='h9'>
                    Our Delivery Partner may take longer to reach you
                </CustomText>
            </View>
           </SafeAreaView>
        </View>

      </View>
      <Svg
      width='100%'
      height='35'
      fill='#CCD5E4'
      viewBox='0 0 4000 1000'
      preserveAspectRatio='none'
      style={styles.wave}
      >
        <Defs>
            <Path id='wavepath' d={wavyData} />
        </Defs>
        <G>
            <Use href='#wavepath'  y="321"/>
        </G>
      </Svg>
    </View>
  )
}

const styles = StyleSheet.create({
    Container: {
        backgroundColor: '#CCD5E4',
    },
    noticeContainer: {
        backgroundColor: '#CCD5E4',
        alignItems: 'center',
        justifyContent: 'center',
    },
    noticeContent: {
        backgroundColor: '#CCD5E4',
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        color:'#2D3875',
        marginBottom:8,
        textAlign:'center'
    },
    textCenter: {
        textAlign: 'center',
        marginBottom:8
    },
    wave: {
       width:'100%',
       transform: [{rotate: '180deg'}],
       color:'#CCD5E4'
    }
})
export default Notice