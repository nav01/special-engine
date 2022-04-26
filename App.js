
import { StyleSheet, View, StatusBar } from 'react-native';
import Main from './components/Main';

export default function App() {

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Main />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
