import { FlatList, StyleSheet, Text, View } from 'react-native';

const FlashcardsScreen = () => {
  const data = ['Flashcards 1', 'Flashcards 2'];

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

export default FlashcardsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
