import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import React from 'react';


const SubcategoryFlatlist = ({subcategory}: {subcategory: any[]}) => {
  return (
    <FlatList
      data={subcategory}
    //   numColumns={4}
      horizontal={true}
      keyExtractor={(item) => item._id}
    //   scrollEnabled={false}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
            <View style={styles.imageContainer}>
               <Image source={{ uri: item.image }} style={styles.image} />
          </View>
          <Text style={styles.itemName}>{item.name}</Text>
        </View>
      )}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#F0F0F008', // Change to a random color if needed
    borderRadius: 10,
    margin: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 120, // Adjust width as needed
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,

    

  },
  imageContainer: {
    width: 109,
    height: 109,
    borderRadius: 10,
    backgroundColor:'#fff',
    padding:3
  },
  itemName: {
    marginTop: 5,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default SubcategoryFlatlist;