import React, {FC, useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';

import {Colors, Fonts} from '../../utils/Constants';
import {useNavigationState } from '@react-navigation/native';
import { useAuthStore } from '@state/authStore';
import { getOrderById } from '@services/OrderService';
import CustomText from '@components/ui/CustomText';
import { hocStyles } from '../../styles/GlobalStyles';
import { navigate } from '../../utils/NavigationUtils';
import { SOCKET_URL } from '@services/config';
import { io } from 'socket.io-client';

const withLiveStatus = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
) => {
  const WithCartComponent: FC<P> = props => {
    const {currentOrder,setCurrentOrder} = useAuthStore();
    const routeName = useNavigationState(state => state.routes[state.index].name);
    const fetchOrderDetails = async () => {
        const data = await getOrderById(currentOrder?._id as any);
        setCurrentOrder(data?.order);
    }

    useEffect(()=>{
        if(currentOrder){
            const socketInstance =io(SOCKET_URL,{
                transports:['websocket'],
                withCredentials:false,
            });
            socketInstance.emit('joinRoom',currentOrder?._id);
            socketInstance.on('liveTrackingUpdates',(updatedOrder:any)=>{
              fetchOrderDetails();
              console.log("RECEVING LIVE UPDATES",updatedOrder);
            });
            socketInstance.on('orderConfirmed',(updatedOrder:any)=>{
              fetchOrderDetails();
              console.log("ORDER CONFIRMATION LIVE UPDATE",updatedOrder);
            });
            return ()=>{
              socketInstance.disconnect();
            }
        }
    },[currentOrder]);
    return ( 
      // The component should render something here
      <View style={styles.container}>
        <WrappedComponent {...props} />
        {currentOrder && routeName ==='ProductDashboard' && (
            <View style={[hocStyles.cartContainer,{flexDirection:'row',alignItems:'center'}]}>
                <View style={styles.flexRow}>
                    <View style={styles.img}>
                        <Image source={require('../../assets/icons/bucket.png')} style={styles.cartIcon} />
                    </View>
                    <View style={{width:'68%'}}>
                        <CustomText variant='h7' fontFamily={Fonts.SemiBold}>Order is {currentOrder?.status}</CustomText>
                        <CustomText variant='h7' fontFamily={Fonts.SemiBold}>
                            {currentOrder?.items![0]?.item.name +
                            (currentOrder?.items?.length -1>0 ? ` and ${currentOrder?.items?.length -1} + items` : '')}
                            </CustomText>
                        <CustomText variant='h7' fontFamily={Fonts.SemiBold}>{currentOrder?.status === 'confirmed' ? 'Packing your order' : currentOrder?.status === 'ready_to_deliver' ? 'Ready to deliver' : currentOrder?.status === 'on_the_way' ? 'On the way' : currentOrder?.status === 'delivered' ? 'Delivered' : ''}</CustomText>

                    </View>


                <TouchableOpacity style={styles.btn} onPress={()=>navigate('LiveTracking')}>
                    <CustomText variant='h8' style={{color:Colors.secondary}} fontFamily={Fonts.Medium}>View Order</CustomText>
                </TouchableOpacity>
                </View>
            </View>
        )}
        



      </View>
    );
  };

  return WithCartComponent;
};
const styles = StyleSheet.create({
  container: {
    flex:1,
    // backgroundColor: Colors.backgroundSecondary,
  },
  flexRow:{
    flexDirection:'row',
    gap:10,
    borderRadius:15,
    width:'100%',
    marginTop:15,
    paddingVertical:10,
    backgroundColor:'white',
    padding:10,
    borderBottomWidth:0.9,
    borderColor:Colors.border,
    alignItems:'center',
  },
  img:{
    backgroundColor:Colors.backgroundSecondary,
    borderRadius:100,
    padding:10,
    justifyContent:'center',
    alignItems:'center'
  },
  cartIcon:{
    width:20,
    height:20
  },
  btn:{
    paddingHorizontal:10,
    paddingVertical:5,
    borderRadius:90,
    borderWidth:3,
    borderColor:Colors.secondary,
    marginRight:10,
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    right:5
  }
});

export default withLiveStatus;
