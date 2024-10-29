import { View, Text, StyleSheet, Image } from 'react-native'
import React, { FC } from 'react'
import { Colors } from '../../utils/Constants'
import { Fonts } from '../../utils/Constants'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { RFValue } from 'react-native-responsive-fontsize'
import CustomText from '../../components/ui/CustomText'
import BillDetails from '@features/order/BillDetails'


const OrderSummary:FC<{order:any}> = ({order}) => {
    const totalPrice = order?.items?.reduce((total:number,cartItem:any)=>total+(cartItem?.count*cartItem?.item?.price),0)
 
    return (
    <View style={styles.container}>
  <View style={styles.flexRow}>
         <View style={styles.iconContainer}>
            <Icon name='shopping-outline' size={RFValue(20)} color={Colors.disabled} />
        </View>
        <View>
            <CustomText variant='h7' fontFamily={Fonts.SemiBold}>Order Summary</CustomText>
            <CustomText variant='h9' fontFamily={Fonts.Medium}>Order Id: #{order?.orderId}</CustomText>
        </View>
      </View>
      {order?.items?.map((item:any , index:number)=>(
        <View style={styles.flexRow} key={index}>
        <View style={styles.imageContainer}>
            <Image source={{uri:item?.item?.image}} style={styles.image} />
            </View>
            <View style={{width:'55%'}}>
                <CustomText variant='h7' fontFamily={Fonts.SemiBold}>{item?.item?.name}   {item?.item?.quantity}</CustomText>
                <CustomText variant='h9' fontFamily={Fonts.Medium}>{item?.count} x  ₹{item?.item?.price}</CustomText>


            </View>
        </View>
      ))}
      <BillDetails totalItemPrice={totalPrice} />
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        width:'100%',
        borderRadius:15,
      marginVertical:15,
      paddingVertical:10,
      backgroundColor:'#fff'
    },
    flexRow:{
        flexDirection:'row',
        alignItems:'center',
        gap:10,
        padding:10,
        borderBottomWidth:0.7,
        borderColor:Colors.border
    }, iconContainer:{
        backgroundColor:Colors.backgroundSecondary,
        padding:10,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:100
      }, imageContainer:{
        width:RFValue(50),
        height:RFValue(50),
        borderRadius:15,
        backgroundColor:Colors.backgroundSecondary
        ,padding:2
      }, image:{
        width:'100%',
        height:'100%',
        resizeMode:'cover',
        borderRadius:15
      }
})

export default OrderSummary