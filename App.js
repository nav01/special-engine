import { StyleSheet, View, StatusBar, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Main from './components/Main';
import Asset from './components/Asset';
import ScannerView from './components/ScannerView';
import QuickCheckIn from './components/QuickCheckIn';
import QuickCheckOut from './components/QuickCheckOut';
import Audit from './components/Audit';

const Stack = createNativeStackNavigator();

function MainScreen({ navigation }) {
  return (
    <View style = {styles.container}>
      <StatusBar style="auto" />
      <Main navigation={navigation}/>
    </View>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main" >
        <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Asset" component={Asset} options = {{ headerTitleAlign: 'center' }} />
        <Stack.Screen name="ScannerView" component={ScannerView} options = {{ title: 'Scan Asset', headerTitleAlign: 'center' }} />
        <Stack.Screen name="QuickCheckIn" component={QuickCheckIn} options = {{ title: 'Quick Check In', headerTitleAlign: 'center' }} />
        <Stack.Screen name="QuickCheckOut" component={QuickCheckOut} options = {{ title: 'Quick Check Out', headerTitleAlign: 'center' }} />
        <Stack.Screen name="Audit" component={Audit} options = {{ title: 'Audit', headerTitleAlign: 'center' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
});
