import {View, StyleSheet} from 'react-native';
import React, {useState, useEffect, useRef, useCallback, useMemo} from 'react';
import {adData, categories} from '../../utils/dummyData';
import AdCarousal from './AdCarousal';
import CustomText from '@components/ui/CustomText';
import {Fonts} from '../../utils/Constants';
import CategoryContainer from './CategoryContainer';
import HomeFlatlist from '@features/dashboard/flatlist/HomeFlatlist';
import SavedFlatlist from '@features/dashboard/flatlist/SavedFlatlist';
import FlashDealsFlatlist from '@features/dashboard/flatlist/FlashDealsFlatlist';
import ProductFlatlist from '@features/dashboard/flatlist/ProductFlatlist';
import LinearGradient from 'react-native-linear-gradient';
import PreviousFlatlist from '@features/dashboard/flatlist/PreviousFlatlist';
import {useAuthStore} from '@state/authStore';
import {fetchCustomerOrders} from '@services/OrderService';
import {getAllCategories, getProductsByCategoryId, getProductsBySubcategoryId, getSubcategory} from '@services/ProductService';
import CountDownTimer from './CountDownTimer';
import SubcategoryFlatlist from '@features/dashboard/flatlist/SubcategoryFlatlist';
import CategoryFlatlist from '@features/dashboard/flatlist/CategoryFlatlist';

const ContentContainer = ({selectedIndex}: {selectedIndex: number}) => {
  console.log('rendering content container')
  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 18,
      marginTop: selectedIndex === 0 ? 10 : 270,
    },
    linearGradient: {
      height: 150,
      position: 'absolute',
      width: '100%',
      top: -4,
      left: 0,
      right: 0,
      zIndex: 1,
      transform: [{scaleY: -1}, {scaleX: -5}],
      opacity: 0.8,
    },
    homeLinearGradient2: {
      height: 150,
      position: 'absolute',
      width: '100%',
      top: -13,
      left: 18,
      right: 18,
      zIndex: -1,
      transform: [{scaleY: -1}, {scaleX: -5}],
      opacity: 0.8,
      
    },
    textHeader: {
      zIndex: 1000,
      marginBottom: 4,
      marginTop:12
    },
    homeLinearGradient: {
      height: 150,
      position: 'absolute',
      width: '100%',
      top: 300,
      left: 18,
      right: 18,
      zIndex: 1,
      transform: [{scaleY: -1}, {scaleX: -5}],
      opacity: 0.8,
    },
    homeLinearBorder: {
      height: 190,
      position: 'absolute',
      width: '100%',
      top: 249,
      left: 18,
      right: 18,
      zIndex: 0,
      transform: [{scaleY: -1}, {scaleX: -5}],
      opacity: 1,
      
    },
    homeLinearBorderCover: {
      height: 190,
      position: 'absolute',
      width: '100%',
      top: 257,
      left: 18,
      right: 18,
      zIndex: 1,
      transform: [{scaleY: -1}, {scaleX: -5}],
      opacity: 1,
      
    },
    flashDealsText: {
      marginBottom: 4,
      zIndex: 1000,
    },
    groceryLinearGradient: {
      height: 140,
      position: 'absolute',
      width: 800,
      top: 350,
      left: 0,
      right: 0,
      zIndex: 1,
      opacity: 1,
    },
    flashDealCounter: {
      marginBottom: 4,
      zIndex: 1000,
      color: 'white',
      position: 'absolute',
      right: 0,
    },
  });

  const [products, setProducts] = useState<any[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState('');
  
  const fetchProducts = useCallback(async(categoryId: string)=> {
    try {
      setProductsLoading(true);
      const response = await getProductsByCategoryId(categoryId);
      setProducts((response.slice(0, 8)));
    } catch (error) {
      console.log('Error fetching Products', error);
    } finally {
      setProductsLoading(false);
    }
  },[]);
  useEffect(() => {
    fetchProducts(currentCategoryId);
  }, [currentCategoryId, fetchProducts]);

  const handleCategoryChange = useCallback((newCategoryId: string) => {
    setCurrentCategoryId(newCategoryId);
  }, []);


  const [subcategory, setSubcategory] = useState<any[]>([]);
  // const [subcategoryProductsLoading, setSubcategoryProductsLoading] = useState(false);

  const fetchSubcategory = async () => {
    try {
      // setSubcategoryProductsLoading(true);
      const response = await getSubcategory();
      setSubcategory(response.slice(3, 20));
     
    } catch (error) {
      console.log('Error fetching Subcategory Products', error);
    } 
  };
  useEffect(() => {
    fetchSubcategory();
    console.log('DATA FETCHED ', selectedIndex);
    fetchOrders();

  }, [selectedIndex]);

  // const formatTime = (seconds: number) => {
  //   const minutes = Math.floor(seconds / 60);
  //   const secs = seconds % 60;
  //   return `${minutes}:${secs < 10 ? '0' : ''}${secs}`; // Format as MM:SS
  // };
  const [category, setCategory] = useState<any[]>([]);
  // const [subcategoryProductsLoading, setSubcategoryProductsLoading] = useState(false);

  const fetchCategory = async () => {
    try {
      // setSubcategoryProductsLoading(true);
      const response = await getAllCategories();
      console.log('category', response)
      setCategory(response);
     
    } catch (error) {
      console.log('Error fetching Category Products', error);
    } 
  };
  useEffect(() => {
    fetchCategory();
    console.log('DATA FETCHED ', selectedIndex);
    fetchOrders();
  }, [selectedIndex]);

  const {user} = useAuthStore();
  const [orders, setOrders] = useState<any[]>([]);

  const fetchOrders = async () => {
    const data = await fetchCustomerOrders(user?.id);
    if (data?.orders) {
      const sortedOrders = data.orders.sort(  
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      setOrders(sortedOrders.slice(0, 4)); // Get the first 5 orders
     
    
    }
  };

  


  // const renderFlashDeals = useCallback(() => (

  // ), [products]);
   
  const memoizedOrders = useMemo(() => {
    return orders; // Ensure this is the same reference if the data hasn't changed
  }, [orders]); // Add dependencies as needed

  const renderPreviousFlatlist = useCallback(() => (
    <PreviousFlatlist orders={memoizedOrders} />
  ), [memoizedOrders]);
 const renderCountDownTimer = useCallback(() => (
  <CountDownTimer />
 ), [])


  return (
    <>
    {/* <View style={{position:'absolute', top:0, left:0, right:0, zIndex:111111111}}>
    <SavedFlatlist selectedIndex={selectedIndex}/>
    </View> */}
    <View style={styles.container}>
      {selectedIndex === 0 && (
        <View style={{paddingBottom: 10}}>
          <AdCarousal adData={adData} />
          <HomeFlatlist />
          <LinearGradient
            colors={['transparent', '#891DF5', 'hsl(268 88.24% 60%)']}
            style={styles.homeLinearBorderCover}></LinearGradient>
          <LinearGradient
            colors={['transparent', '#891DF5', 'hsl(58.08 100% 50.98%)']}
            style={styles.homeLinearBorder}></LinearGradient>
        
        </View>
      )}
      {selectedIndex === 1 && (
        <View style={{marginTop: 1}}>
          <LinearGradient
            colors={['transparent', '#8A59DD', '#21C2F8']}
            style={styles.linearGradient}></LinearGradient>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <CustomText
              variant="h5"
              fontFamily={Fonts.SemiBold}
              style={styles.flashDealsText}>
              Flash Deals
            </CustomText>
            <View style={{position:'absolute', right:0, backgroundColor:'#4967FB', borderRadius:4, zIndex:1000, paddingHorizontal:4, }}>
            {renderCountDownTimer()}
                
            
            </View>
          </View>
          <FlashDealsFlatlist 
             products={products} 
             categoryId={currentCategoryId}
             onCategoryChange={handleCategoryChange} />
        </View>
      )}
      {selectedIndex === 1 && (
        <View style={{marginTop: 5}}>
          {/* <LinearGradient colors={['transparent', '#D0BAF6','rgb(57 228 23)']} style={styles.linearGradient}></LinearGradient> */}
          <CustomText
            variant="h5"
            fontFamily={Fonts.SemiBold}
            style={styles.textHeader}>
            Previouly bought
          </CustomText>
          {renderPreviousFlatlist()}
        </View>
      )}

      {selectedIndex === 0 && (
        <LinearGradient
          colors={['#ffffff', '#FFFFFF', 'transparent']}
          style={styles.groceryLinearGradient}></LinearGradient>
      )}
      <CustomText
        variant="h5"
        fontFamily={Fonts.SemiBold}
        style={[styles.textHeader, {marginTop: 18}]}>
        Grocery & Kitchen
      </CustomText>
      <CategoryContainer data={categories} />
    
        <View>
          <LinearGradient
            colors={['transparent', '#8A59DD', '#21C2F8']}
            style={styles.homeLinearGradient2}></LinearGradient>
         <ProductFlatlist 
        products={products} 
        categoryId={currentCategoryId}
        onCategoryChange={handleCategoryChange}
      />
        </View>
      {selectedIndex === 0 && <FlashDealsFlatlist products={products} />}
      {/* <CustomText variant="h5" fontFamily={Fonts.SemiBold}>Snacks & Drinks</CustomText>
      <CategoryContainer data={categories} /> */}
      <CustomText
        variant="h5"
        fontFamily={Fonts.SemiBold}
        style={styles.textHeader}>
        Personal Care
      </CustomText>
      <View style={{marginTop: 1 }}>
        <SubcategoryFlatlist subcategory={subcategory} />
      </View>
   
        <CategoryFlatlist category={category} />  
  
 
    
    </View>
    </>
  );
};

export default ContentContainer;
