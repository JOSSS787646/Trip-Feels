import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Inicia from './screens/inicia'; 
import PersonalizarRuta from './screens/personalizarRuta';
import registro from './screens/registro';
import RegisterScreen from './screens/RegisterScreen';
import rutasGeneradas from './screens/rutasGeneradas';
import perfil from './screens/perfil';
import soporte from './screens/soporte';
import planGenerado from './screens/planGenerado';
import rutaMapa from './screens/rutaMapa';

const miImagen = require('./imagenes/TripFeelsLogo.png');

const Stack = createStackNavigator();

function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown: false}} />
        <Stack.Screen name="Inicia" component={Inicia} options={{headerShown: false}}/>
        <Stack.Screen name="PersonalizarRuta" component={PersonalizarRuta} options={{headerShown: false}}/>
        <Stack.Screen name="registro" component={registro} options={{headerShown: false}}/>
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{headerShown: false}}/>
        <Stack.Screen name="rutasGeneradas" component={rutasGeneradas} options={{headerShown: false}}/>
        <Stack.Screen name="perfil" component={perfil} options={{headerShown: false}}/>
        <Stack.Screen name="soporte" component={soporte} options={{headerShown: false}}/>
        <Stack.Screen name="planGenerado" component={planGenerado} options={{headerShown: false}}/>
        <Stack.Screen name="rutaMapa" component={rutaMapa} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Inicia'); // Reemplaza el splash con la pantalla de inicio
    }, 5000); // 5000 milisegundos = 5 segundos

    return () => clearTimeout(timer); // Limpiar el temporizador al desmontar el componente
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image style={styles.imagenLogo} source={miImagen} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00B4D8'
  },
  imagenLogo: {
    height: 300,
    width: 300
  },
});

export default MyStack;
