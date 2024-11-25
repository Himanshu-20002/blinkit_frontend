import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React from 'react';
import {productHeader} from '@utils/dummyData';
import CustomText from '@components/ui/CustomText';
import {navigate} from '@utils/NavigationUtils';
import {Fonts} from '@utils/Constants';
import {useCallback,useEffect} from 'react';
import GreenUniversalAdd from '@components/ui/GreenUniversalAdd';

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

  // onCategoryChange('6740e58eafaba47dc6654457');
  useEffect(() => {
    // setProducts(products)
    //onCategoryChange('6740e58eafaba47dc6654458')
}, [products])

  const renderItem = ({item, index}: any) => {
    return (
      <View>
        <Image
          source={{uri: item.backgroundImage}}
          resizeMode="cover"
          style={styles.productBackgroundImage}
        />

        <View style={styles.featuredProductContainer}>
          <View
            style={[
              StyleSheet.absoluteFillObject,
              {
                backgroundColor: 'rgba(236 236 236 / 0.8)',
                borderRadius: 13,
              },
            ]}
          />
          <Image
            source={require('@assets/images/back.png')}
            style={{
              width: '100%',
              height: 140,
              zIndex: 0,
              resizeMode: 'contain',
            }}
          />
          <View style={styles.featuredProductTextContainer}>
            <CustomText
              variant="h7"
              fontFamily={Fonts.Regular}
              style={styles.rupee}>
              ₹
            </CustomText>
            <CustomText
              variant="h4"
              fontFamily={Fonts.Bold}
              style={styles.priceText}>
              {item.price}/
            </CustomText>
            <CustomText
              variant="h9"
              fontFamily={Fonts.Bold}
              style={styles.priceText}>
              {item.quantity}
            </CustomText>
          </View>
          <CustomText
            variant="h9"
            fontFamily={Fonts.Bold}
            style={styles.titleText}>
            {item.name}
          </CustomText>
          <Image
            source={{uri: item.images[0]}}
            resizeMode="contain"
            style={styles.productImage}
          />
          <View
            style={{position: 'absolute', top: 110, zIndex: 1000, right: 4}}>
            <GreenUniversalAdd item={item} />
          </View>
        </View>
      </View>
    );
  };
  return (
    <View>
      <FlatList
        keyExtractor={item => item._id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={products}
        renderItem={renderItem}
        snapToInterval={FULL_WIDTH - 28}
        decelerationRate="fast"
        style={styles.touchableContainer2}
        contentContainerStyle={{
          gap: 10,
          zIndex: 1000,
          paddingBottom: 19,
          marginLeft: 6,
        }}
        removeClippedSubviews={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  touchableContainer2: {
    width: '100%',
    height: 150,
    zIndex: 1000,
    overflow: 'hidden',
    marginRight: 1,
  },
  touchableContainer: {
    width: '100%',
    height: 150,
    zIndex: 100,
    backgroundColor: 'orangered',
    borderRadius: 9,
    overflow: 'hidden',
    position: 'absolute',
    top: 350,
    left: 0,
    right: 0,
    bottom: 0,
    marginRight: 100,
  },
  featuredProductTextContainer: {
    // flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 0,
    marginLeft: 10,
    zIndex: 1000,
    position: 'absolute',
    width: 90,
    height: 60,
    top: 3,
    left: 0,
    right: 0,
    bottom: 0,
  },
  featuredProductContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 118,
    height: 100,
    zIndex: 1000,
    gap: 10,

    // backgroundColor: 'limegreen',
  },
  productImage: {
    width: 130,
    height: 130,
    borderRadius: 13,
    borderWidth: 3,
    zIndex: 1000,
    position: 'absolute',
    top: 0,
    left: 270,
    right: 0,
    bottom: 0,
  },
  productBackgroundImage: {
    width: '100%',
    height: 130,
    borderRadius: 13,
    zIndex: 99,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // opacity:0.9
  },
});
export default ProductFlatlist;
