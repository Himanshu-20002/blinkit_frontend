import {View,  StyleSheet, ScrollView, Alert} from 'react-native';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {useAuthStore} from '@state/authStore';
import {confirmOrder, getOrderById, sendLiveOrderUpdates, updateOrderStatus} from '@services/OrderService';
import {Colors} from '../../utils/Constants';
import LiveHeader from '../../features/map/LiveHeader';
import LiveMap from '../../features/map/LiveMap';
import DeliveryDetails from '../../features/map/DeliveryDetails';
import OrderSummary from '../../features/map/OrderSummary';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import CustomButton from '@components/ui/CustomButton';
import { hocStyles } from '@styles/GlobalStyles';
import { PermissionsAndroid, Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const DeliveryMap: FC = () => {
  const user = useAuthStore((state) => state.user)
  const [orderData,setOrderData] = useState<any>(null)
  const [myLocation,setMyLocation] = useState<any>(null)
  const route = useRoute()
  const orderDetails = route?.params as Record<string,any>
  const {setCurrentOrder} = useAuthStore()
  console.log('orderDetails',orderDetails)
  console.log('orderData',orderData)
  if(myLocation){
    console.log('myLocation',myLocation)
  }

  const fetchOrderDetails = async () => {
    const data = await getOrderById(orderDetails?.orderId as any);
    setOrderData(data?.order);
  }

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      return result === RESULTS.GRANTED;
    }
  };

  useEffect(()=>{
    fetchOrderDetails()
  },[])

  useFocusEffect(
    useCallback(() => {
      const getLocation = async () => {
        const hasPermission = await requestLocationPermission();
        if (!hasPermission) {
          Alert.alert('Permission Denied', 'Location permission is required to use this feature.');
          return;
        }

        const watchId = Geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const address = 'saultanpur 4h-ee';
            setMyLocation({ latitude, longitude, address });
            if(myLocation){
              console.log('myLocation',myLocation);
            }
          },
          (error) => {
            console.log('error', error);
          },
          { enableHighAccuracy: true, distanceFilter: 7 }
        );

        return () => Geolocation.clearWatch(watchId);
      };

  getLocation();
}, [myLocation])
  );



  const acceptOrder = async () => {
    if (!myLocation) {
      Alert.alert('Location Error', 'Unable to get your current location.');
      return;
    }

    const data = await confirmOrder(orderData?._id,myLocation )
    if(data){
      setCurrentOrder(data)
      Alert.alert('Order Accepted')
    }else{
      Alert.alert('There was an error accepting the order')
    }
    fetchOrderDetails()
  }

  const orderPickedUp = async () => {
    const data = await updateOrderStatus(orderData?._id,myLocation,'arriving' )
    if(data){
      setCurrentOrder(data)
      Alert.alert('status changed to arriving')
    }else{
      Alert.alert('There was an error accepting the order')
    }
    fetchOrderDetails()
  } 
  const orderDelivered = async () => {
    const data = await updateOrderStatus(orderData?._id,myLocation,'delivered' )
    if(data){
      setCurrentOrder(data)
      Alert.alert('Order Delivered')
    }else{
      Alert.alert('There was an error deliverin the order')
    }
    fetchOrderDetails()
  }  


  //The component sets msg and time based on the currentOrder status.
  // This is used to display different messages and times based on the order's progress.

  let message = 'Start this order';
  let time = 'Arriving in 10 minutes';
  if (orderData?.deliveryPartner?._id  == user?._id && orderData?.status === 'confirmed') {
    message = 'Packing your order';
  }else if(orderData?.deliveryPartner?._id  == user?._id && orderData?.status === 'arriving'){
    message = 'Your order is on the way';
    time = 'Arriving in 5 minutes';
  }else if(orderData?.deliveryPartner?._id  == user?._id && orderData?.status === 'delivered'){
    message = 'Your order has been delivered';
    time = 'Enjoy your meal';
  }else if(orderData?.deliveryPartner?._id  != user?._id && orderData?.status === 'confirmed'){
    message = 'Order is assigned to another delivery partner';
  }



  useEffect(() => {
    async function sendLiveUpdate() {
      if (orderData?.deliveryPartner?._id == user?._id 
        && orderData?.status != 'delivered' 
        && orderData?.status != 'cancelled') {
        await sendLiveOrderUpdates(orderData._id, myLocation, orderData?.status);
        fetchOrderDetails();
      }
    }

    if (myLocation) {
      sendLiveUpdate();
    }
  }, [myLocation]);




  return (
    <View style={styles.container}>
      <LiveHeader type="Delivery" title={message} secondaryTitle='Delivery in 10 minutes' />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <LiveMap />
        <DeliveryDetails details={orderData?.customer}/>
        <OrderSummary  order={orderData}/>

        <View style={styles.flexRow}>
        <DeliveryDetails details={orderData?.customer}/>
        <OrderSummary  order={orderData}/>
        </View>
      </ScrollView>
      {orderData?.status != 'delivered' && orderData?.status != 'cancelled' && (
        <View style={[hocStyles.cartContainer,styles.btnContainer]}>
          {orderData?.status =='available' && (
            <CustomButton 
            disabled={false}
            title='Accept Order' 
            onPress={acceptOrder}
            loading={false}
            />
          )}
          {orderData?.status =='confirmed' &&
          orderData?.deliveryPartner?._id == user?._id && (
            <CustomButton 
            disabled={false}
            title='Order Picked Up' 
            onPress={orderPickedUp}
            loading={false}
            />
          )}
          {orderData?.status =='arriving' &&
          orderData?.deliveryPartner?._id == user?._id && (
            <CustomButton 
            disabled={false}
            title='Order Delivered' 
            onPress={orderDelivered}
            loading={false}
            />
          )}
        </View>
      )}
      
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  btnContainer:{
    padding:10,
    backgroundColor:Colors.backgroundSecondary
  },
  scrollContent: {
    paddingBottom: 150,
    backgroundColor: Colors.backgroundSecondary,
    padding: 15,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap:10,
    width:'100%',
    borderRadius:15,
    marginTop:15,
    paddingVertical:10,
    backgroundColor:'#fff',
    padding:10,
    borderBottomWidth:9,
    borderBottomColor:Colors.border,
  },
  iconContainer: {

    backgroundColor: Colors.backgroundSecondary,
    justifyContent:'center',
    alignItems:'center'
  },
});

export default DeliveryMap;
