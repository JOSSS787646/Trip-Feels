// Importa las bibliotecas necesarias
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

// Define el componente SideMenu
const SideMenu = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Agrega los elementos del menú aquí */}
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}>
        <FontAwesomeIcon icon="home" size={24} color="white" />
        <Text style={styles.menuText}>Home</Text>
      </TouchableOpacity>

      {/* Agrega más elementos del menú según sea necesario */}
    </View>
  );
};

// Estilos para el componente SideMenu
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#03045E',
    paddingTop: 50,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  menuText: {
    color: 'white',
    marginLeft: 20,
    fontSize: 18,
  },
});

export default SideMenu;
