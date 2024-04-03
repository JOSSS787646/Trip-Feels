import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Modal, BackHandler, Alert } from 'react-native';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faCircleLeft, faSearch, faUser, faExclamationCircle, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from '@react-navigation/native';

library.add(faBars);
library.add(faCircleLeft);
library.add(faSearch);
library.add(faUser);
library.add(faExclamationCircle);
library.add(faRightFromBracket);

const TripFeelsApp = () => {
  const navigation = useNavigation();
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const backAction = () => {
      // Solo mostramos el mensaje de confirmación si estamos en la página de personalización de ruta
      if (navigation.isFocused()) {
        Alert.alert(
          "Salir de la Aplicacion",
          "¿Estás seguro de que quieres salir?",
          [
            {
              text: "Cancelar",
              onPress: () => null,
              style: "cancel"
            },
            { text: "Salir", onPress: () => BackHandler.exitApp() }
          ],
          { cancelable: false }
        );
        return true;
      } else {
        return false;
      }
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  const handleRutasGeneradasPress = () => {
    navigation.navigate('rutasGeneradas');
  }

  const handlePerfilPress = () => {
    navigation.navigate('perfil');
  }

  const handleIniciaPress = () => {
    navigation.navigate('Inicia');
  }

  const handleSoportePress = () => {
    navigation.navigate('soporte');
  }

  const handlerutaMapaPress = () => {
    navigation.navigate('rutaMapa');
  }

  return (
    <View style={styles.container}>

      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.iconContainer} onPress={() => setMenuOpen(true)}>
          <FontAwesomeIcon icon={faBars} size={35} color="#03045E" style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.titleText}>TRIP FEELS</Text>
        <View style={styles.iconContainer}>
          <FontAwesomeIcon icon="circle-left" size={35} color="#03045E" style={styles.icon} />
        </View>
      </View>

      <Modal
        transparent={true}
        animationType="slide"
        visible={isMenuOpen}
        onRequestClose={() => setMenuOpen(false)}
      >
        <View style={styles.menuContainer}>
          <View style={styles.menuContent}>
            <TouchableOpacity onPress={() => setMenuOpen(false)}>
              <Text style={styles.closeButton}>Cerrar</Text>
            </TouchableOpacity>

            <View>
              <TouchableOpacity onPress={handleSoportePress}>
                <FontAwesomeIcon icon={faExclamationCircle} size={30} color="#caf0f8" />
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity onPress={handleIniciaPress}>
                <FontAwesomeIcon icon={faRightFromBracket} size={30} color="#caf0f8" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.header}></View>

      <Text style={styles.sectionTitle}>Personaliza tu ruta</Text>

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.contenedorCentro}>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Personas" keyboardType="numeric" />
          </View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Días" keyboardType="numeric" />
          </View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Presupuesto" keyboardType="numeric" />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleRutasGeneradasPress}>
            <Text style={styles.buttonText}>Generar Ruta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={handlePerfilPress}>
          <FontAwesomeIcon icon="user" size={50} color="#03045E" style={styles.iconUser} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handlerutaMapaPress}>
          <FontAwesomeIcon icon="search" size={50} color="#03045E" style={styles.iconSearch} />
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 96,
    backgroundColor: '#0096C7',
    paddingHorizontal: 20,
  },
  contenedorCentro: {
    flex: 1,
    backgroundColor: 'rgba(0, 119, 182, 0.5)',
    borderRadius: 18,
    marginHorizontal: 20,
    marginVertical: 20,
    padding: 30,
    justifyContent: 'space-evenly'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    paddingTop: 30
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: '#434343',
    borderRadius: 10,
    padding: 20,
    backgroundColor: 'white',
    fontWeight: 'bold',
    color: 'black',
    height: 59
  },
  button: {
    backgroundColor: 'rgba(0, 119, 182, 0.8)',
    borderRadius: 13,
    borderWidth: 1,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    height: 55
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  footerContainer: {
    width: '100%',
    height: 96,
    backgroundColor: '#0096C7',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  icon: {
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  iconUser: {
    marginLeft: 40
  },
  iconSearch: {
    marginRight: 40
  },
  menuContainer: {
    backgroundColor: '#03045E',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '50%', // La mitad de la pantalla
    height: 863,
    borderRadius: 30
  },
  menuContent: {
    flex: 1,
    height: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    paddingTop: 30,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  closeButton: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 20,
  },
});

export default TripFeelsApp;
