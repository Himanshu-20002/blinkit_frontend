import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import React from 'react';
import { FlashList } from '@shopify/flash-list';
import CustomText from '@components/ui/CustomText';



const SubcategoryFlatlist = ({subcategory}: {subcategory: any[]}) => {
  return (
    <View style={styles.mainContainer}>
    <FlatList
      data={subcategory}
      horizontal={true}
      // estimatedItemSize={30}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
            <View style={styles.imageContainer}>
               <Image source={{ uri: "https://res.cloudinary.com/duyyhs6ef/image/upload/v1732522906/Untitled_design_10_waa7ck.png" }} style={styles.containerImage} />
               <Image source={{ uri: item.image }} style={styles.image} />
          </View>
          <CustomText style={styles.itemName} numberOfLines={1}>{item.name}</CustomText>
        </View>
      )}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
    backgroundColor: '#E8E8E8',
    borderRadius: 3,
    marginBottom: 10,

    marginTop: 10,
  },
  itemContainer: {
    backgroundColor: '#CAC9C9C6', // Change to a random color if needed
    borderRadius: 10,
    margin: 1,
    padding: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 120, // Adjust width as needed
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    position: 'absolute',
    top: 9,
    left:5,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',

    

  },
  imageContainer: {
    width: 109,
    height: 109,
    borderRadius: 10,
    padding:3,
    backgroundColor: 'red',
    marginTop:3
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

export default SubcategoryFlatlist;