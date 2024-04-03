import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';


const MyComponent = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [description, setDescription] = useState('');

  const handleSend = () => {
    // Aquí podrías implementar la lógica para enviar los datos
    console.log("Nombre:", name);
    console.log("Correo:", email);
    console.log("Teléfono:", phoneNumber);
    console.log("Descripción:", description);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesomeIcon icon="circle-left" size={35} color="#03045E" style={styles.icon} />
        </TouchableOpacity>
        </View>        
      </View>
      
      <Text style={styles.title}>Soporte Técnico:</Text>
      <Image
        source={require('../imagenes/soporte.jpg')}
        style={styles.image}
      />
      <View style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Correo"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Número de Teléfono"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Descripción"
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSend}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#EAEAEA'
  },
  header: {
    alignSelf: 'flex-start',
    position: 'absolute',
    backgroundColor: '#0077B6',
    top: 0,
    left: 310,
    padding: 10,
    borderRadius: 180,
  },
  backButton: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  title: {
    marginTop: 35,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 95
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#03045E',
    backgroundColor: '#CAF0F8',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#03045E',
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
  },
  descriptionInput: {
    height: 100,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
    left:135
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: 96,
    backgroundColor: '#EAEAEA',
    paddingHorizontal: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 30
  }
});

export default MyComponent;