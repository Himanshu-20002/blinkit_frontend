import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, { useState } from 'react';
import {productHeader} from '@utils/dummyData';
import CustomText from '@components/ui/CustomText';
import {navigate} from '@utils/NavigationUtils';
import {Fonts} from '@utils/Constants';
import {useCallback,useEffect} from 'react';
import GreenUniversalAdd from '@components/ui/GreenUniversalAdd';
import { FlashList } from '@shopify/flash-list';
import Scalepress from '@components/ui/Scalepress';
import LinearGradient from 'react-native-linear-gradient';


const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
const FULL_WIDTH = screenWidth;

interface ProductFlatlistProps {
  products: any[];
  categoryId: string;
  onCategoryChange: (categoryId: string) => void;
}

const ProductFlatlist: React.FC<ProductFlatlistProps> = ({
  products,
  categoryId,
  onCategoryChange,
}) => {

  useEffect(() => {
    onCategoryChange('6740e58eafaba47dc6654457')
}, [])

  // const renderItem = ({item, index}: any) => {
  //   console.log("flatlistRendered")
  //   return (
  //     // <View>
  //     //   <Image
  //     //     source={{uri: item.backgroundImage}}
  //     //     resizeMode="cover"
  //     //     style={styles.productBackgroundImage}
  //     //   />

  //       <View style={styles.featuredProductContainer}>
  //         <View
  //           style={[
  //             StyleSheet.absoluteFillObject,
  //             {
  //               backgroundColor: 'rgba(236 236 236 / 0.8)',
  //               borderRadius: 13,
  //             },
  //           ]}
  //         />
  //         {/* <Image
  //           source={require('@assets/images/back.png')}
  //           style={{
  //             width: '100%',
  //             height: 140,
  //             zIndex: 0,
  //             position:'absolute',
  //             left: 12,
  //             right: 0,
  //             bottom: 20,
  //             resizeMode: 'contain',
  //           }}
  //         /> */}
  //         {/* <View style={styles.featuredProductTextContainer}>
  //           {/* <CustomText
  //             variant="h7"
  //             fontFamily={Fonts.Regular}
  //             >
              
  //           </CustomText> 
  //           <CustomText
  //             variant="h4"
  //             fontFamily={Fonts.Bold}
  //           >
  //             {item.price}/
  //           </CustomText>
  //           <CustomText
  //             variant="h9"
  //             fontFamily={Fonts.Bold}
  //            >
  //             {item.quantity}
  //           </CustomText>
  //         </View> 
  //          <CustomText
  //           variant="h9"
  //           fontFamily={Fonts.Bold}
  //        >
  //           {item.name}
  //         </CustomText> */}
  //         <Image
  //           source={{uri: item.images[0]}}
  //           resizeMode="contain"
  //           style={styles.productImage}
  //         />
  //         <View
  //           style={{position: 'absolute', top: 110, zIndex: 1000, right: 4}}>
  //           <GreenUniversalAdd item={item} />
  //         </View>
  //       </View>
  //     // </View>
  //   );
  // };
  return (
    <View style={styles.mainContainer}>
       
    <FlashList
      data={products}
      horizontal={true}
      estimatedItemSize={50}
      keyExtractor={(item) => item._id}
      // numColumns={6}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={
        {
       padding:2,
       paddingTop:2,
       paddingVertical:2
        }  }
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          {/* <View  style={{backgroundColor:'green'}} /> */}
            <View style={styles.imageContainer}>
            {/* <LinearGradient
            colors={['transparent', '#E4E2E6', 'hsl(268 88.24% 60%)']}
            style={styles.homeLinearGradient3}></LinearGradient> */}
               {/* <Image source={{ uri: "https://res.cloudinary.com/duyyhs6ef/image/upload/v1732522906/Untitled_design_10_waa7ck.png" }} style={styles.containerImage} /> */}
               <Image source={{ uri: item.images[0] }} style={styles.image} />
          </View>
          {/* <CustomText style={styles.itemName} numberOfLines={1}>{item.name.slice(0,15)}</CustomText> */}
          {/* <View
            style={{position: 'absolute', top: 110, zIndex: 1000, right: 4}}>
            </View> */}
            <GreenUniversalAdd item={item} />
        </View>
      )
    
    }
    />
    </View>
  );
};

const styles = StyleSheet.create({
  // touchableContainer2: {
  //   width: '100%',
  //   height: 150,
  //   zIndex: 1000,
  //   overflow: 'hidden',
  //   marginRight: 1,
  // },
  // touchableContainer: {
  //   width: '100%',
  //   height: 150,
  //   zIndex: 100,
  //   backgroundColor: 'orangered',
  //   borderRadius: 9,
  //   overflow: 'hidden',
  //   position: 'absolute',
  //   top: 350,
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  //   marginRight: 100,
  // },
  // featuredProductTextContainer: {
  //   // flex: 1,
  //   justifyContent: 'flex-start',
  //   alignItems: 'flex-start',
  //   gap: 0,
  //   marginLeft: 10,
  //   zIndex: 1000,
  //   position: 'absolute',
  //   width: 90,
  //   height: 60,
  //   top: 3,
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  // },
  // featuredProductContainer: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   width: 118,
  //   height: 100,
  //   zIndex: 1000,
  //   gap: 10,

  //   // backgroundColor: 'limegreen',
  // },
  // productImage: {
  //   width: 100,
  //   height: 100,
  //   borderRadius: 13,
  //   borderWidth: 3,
  //   zIndex: 1,
  //   position: 'absolute',

  //   top: 5,
  //   left: 9,
  //   right: 0,
  //   bottom: 0,
  //   resizeMode:"contain"
  // },
  // productBackgroundImage: {
  //   width: '100%',
  //   height: 130,
  //   borderRadius: 13,
  //   zIndex: 99,
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   bottom: 0,
  //   // opacity:0.9
  // },

  // //////


  // homeLinearGradient3: {
  //   height: 100,
  //   position: 'absolute',
  //   width: '24%',
  //   top: -9,
  //   left: 43,
  //   right: 0,
  //   zIndex: -1,
  //   transform: [{scaleY: -1}, {scaleX: -5}],
  //   opacity:0.8,
  // },
  //   container: {
  //     padding: 0,
  //     // backgroundColor: '#2961FC',
  //     borderRadius: 2,
  //     marginBottom: 0,
  //     marginLeft: -19,
  //     zIndex: 100,
  //     height:100,
  //     width: '110%',
  //     alignItems: 'flex-start',
  //     justifyContent: 'flex-start',
      
    
      
  
  //     marginTop: 0,
  //   },
  //   // row: {
  //   //   flexDirection: 'row',
  //   //   justifyContent: 'center',
  //   //   height: 100,
  //   //   alignItems: 'baseline', //baseline for text to remain in same line and on top
  //   //   marginBottom: 4,
  //   //   maxWidth: 'auto',
  //   // },
  //   item: {
  //     width: '100%',
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     marginBottom: 0,
  //   },
  //   // image: {
  //   //   width: '100%',
  //   //   height: '100%',
  //   //   resizeMode: 'contain',
  //   //   zIndex: 100,
  //   // },
  //   // imageContainer: {
  //   //   width: '90%',
  //   //   height: 69,
  //   //   borderRadius: 10,
  //   //   padding: 4,
  //   //   marginBottom: 8,
  //   //   backgroundColor: '#E5F3F39F',
  //   //   justifyContent: 'center',
  //   //   alignItems: 'center',
  //   // },
  //   // text: {
  //   //   marginTop: 5,
  //   //   textAlign: 'center',
  //   // },



  //   ///////////////////////////////////
  //     homeLinearGradient: {
  //       height: 150,
  //       position: 'absolute',
  //       width: '100%',
  //       top: 30,
  //       left: 18,
  //       right: 18,
  //       zIndex: 1,
  //       transform: [{scaleY: -1}, {scaleX: -5}],
  //       opacity: 0.8,
  //     },
        mainContainer: {
        padding: 0,
        // backgroundColor: '#888888',
        borderRadius: 2,
        marginBottom: -13,
        marginLeft: -3,
        zIndex: 100,
        height:146,
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        
      
        
    
        marginTop: 26,
      },
      itemContainer: {
         backgroundColor: '#EDECEDDC',
        borderRadius: 10,
        gap:0,
        paddingBottom:0,
        alignItems: 'center',
        justifyContent: 'center',
        width: 115,
        height: 130,
        marginBottom: 20,
        marginLeft: 10,
        // backgroundColor: 'green',
      
    
      },
      image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        position: 'absolute',
        top: 0,
        left:5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:4,
        resizeMode: 'contain',
    
        
    
      },
      imageContainer: {
        width: 109,
        height: 109,
        borderRadius: 10,
        padding:3,
        backgroundColor: 'thistle',
        marginTop:13
      },
      
      containerImage:{
        width: 109,
        height: 109,
        borderRadius: 10,
        // backgroundColor: '#fff',
        padding:0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 9, // Adjust elevation as needed
        marginBottom: 5, // Adjust margin as needed
        marginLeft: 10, // Adjust margin as needed
        lineHeight: 18, // Adjust line height as needed
        marginRight: 10, // Adjust margin as needed
     // Adjust elevation as needed
       position: 'absolute',
        top: 0, // Adjust top position as needed
        right: 0, // Adjust right position as needed
        left: -10, // Adjust left position as
      },
      itemName: {
        marginTop: 5,
        fontWeight: 'bold',
        color: '#9C8E8E',
        fontSize: 14, // Adjust font size as needed
        marginBottom: 5, // Adjust margin as needed
        marginLeft: 10, // Adjust margin as needed
        lineHeight: 18, // Adjust line height as needed
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 2, // Adjust elevation as needed
        
    
      },

  
});
export default ProductFlatlist;
