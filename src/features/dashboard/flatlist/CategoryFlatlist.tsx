import { FlatList, Image, Text, View, StyleSheet } from "react-native";

const CategoryFlatlist = ({category}: {category: any[]}) => {
  return (
    <FlatList
      data={category}
      numColumns={4}
      scrollEnabled={false}
      removeClippedSubviews={false}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text style={styles.itemName}>{item.name}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: '#f0f0f0', // Change to a random color if needed
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
      itemName: {
        marginTop: 5,
        fontWeight: 'bold',
        color: '#333',
      },
});

export default CategoryFlatlist;
