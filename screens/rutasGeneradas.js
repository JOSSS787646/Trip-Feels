import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faCircleLeft, faSearch, faUser, faExclamationCircle, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from "@react-navigation/native";

library.add(faBars);
library.add(faCircleLeft);
library.add(faSearch);
library.add(faUser);
library.add(faExclamationCircle);
library.add(faRightFromBracket);

const RutasGeneradas = () => {
  const navigation = useNavigation();
  const [isMenuOpen, setMenuOpen] = useState(false);
  ;

  const handleIniciaPress = () => {
    navigation.navigate('Inicia');
  }

  const handleplanGeneradoPress = () => {
    navigation.navigate('planGenerado');
  }

  const handleSoportePress = () => {
    navigation.navigate('soporte');
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

      <Text style={styles.sectionTitle}>Posible plan generado</Text>

      <View style={styles.contenedorCentro}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>

          <TouchableOpacity onPress={handleplanGeneradoPress}>
            <View style={styles.contenedorPlanGenerado}>
            </View>
          </TouchableOpacity>


          <View style={styles.contenedorPlanGenerado}>
          </View>
          <View style={styles.contenedorPlanGenerado}>
          </View>
          <View style={styles.contenedorPlanGenerado}>
          </View>
          <View style={styles.contenedorPlanGenerado}>
          </View>
          <View style={styles.contenedorPlanGenerado}>
          </View>
          <View style={styles.contenedorPlanGenerado}>
          </View>
          <View style={styles.contenedorPlanGenerado}>
          </View>
          <View style={styles.contenedorPlanGenerado}>
          </View>
        </ScrollView>
      </View>

      <View style={styles.footerContainer}>
        <FontAwesomeIcon icon="user" size={50} color="#03045E" style={styles.iconUser} />
        <FontAwesomeIcon icon="search" size={50} color="#03045E" style={styles.iconSearch} />
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
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 30,
    justifyContent: 'flex-start'
  },
  contenedorPlanGenerado: {
    backgroundColor: 'rgba(0, 119, 182, 0.5)',
    padding: 30,
    justifyContent: 'flex-start',
    borderRadius: 15,
    marginBottom: 10,
    height: 136
  }
  ,
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

export default RutasGeneradas;
