import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { RNPickerSelect } from "react-native-picker-select";

export default function Inicia() {

    const navigation = useNavigation();

    const [nombre, setNombre] = useState('');
    const [usuario, setUsuario] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [estadoCivil, setEstadoCivil] = useState('');
    const [diaNacimiento, setDiaNacimiento] = useState('');
    const [mesNacimiento, setMesNacimiento] = useState('');
    const [anioNacimiento, setAnioNacimiento] = useState('');

    
  const handleRegister = () => {
    // Lógica de registro aquí
    console.log('Nombre:', nombre);
    console.log('Usuario:', usuario);
    console.log('Correo:', correo);
    console.log('Contraseña:', contrasena);
    console.log('Estado Civil:', estadoCivil);
    console.log('Fecha de Nacimiento:', `${diaNacimiento}/${mesNacimiento}/${anioNacimiento}`);
};

  // Función auxiliar para generar rangos de opciones para días, meses y años
  const generateOptions = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

    const handleIniciarSesionPress = () => {
        navigation.navigate('Inicia');
    };

    return (        
        <View style={styles.container}>
            <View style={styles.headerContainer}>                
                <Text style={styles.titleText}>TRIP FEELS</Text>  
                <Text style={styles.titleText2}>Crear Cuenta</Text>  
            </View>

            <View style={styles.contenedorCentro}> 
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.formContainer}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            placeholder=""
            value={nombre}
            onChangeText={setNombre}
            style={styles.input}
          />
          <Text style={styles.label}>Usuario</Text>
          <TextInput
            placeholder=""
            value={usuario}
            onChangeText={setUsuario}
            style={styles.input}
          />
          <Text style={styles.label}>Correo Electrónico</Text>
          <TextInput
            placeholder="example@gmail.com"
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
            style={styles.input}
          />
          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            placeholder=""
            value={contrasena}
            onChangeText={setContrasena}
            secureTextEntry
            style={styles.input}
          />
        </View>

        <View style={styles.formContainer}>
          <View style={styles.containerRowLabel}>
            <Text style={styles.label}>Día</Text>
            <Text style={styles.label}>Mes</Text>
            <Text style={styles.label}>Año</Text>
          </View>

          <View style={styles.containerRow}>
            {/* Día de Nacimiento */}
            <View style={styles.pickerContainer}>
              <RNPickerSelect
                placeholder={{}}
                onValueChange={(value) => setDiaNacimiento(value)}
                items={generateOptions(1, 31).map((day) => ({ label: `${day}`, value: `${day}` }))}
                style={pickerSelectStyles}
              />
            </View>

            {/* Mes de Nacimiento */}
            <View style={styles.pickerContainer}>
              <RNPickerSelect
                placeholder={{}}
                onValueChange={(value) => setMesNacimiento(value)}
                items={generateOptions(1, 12).map((month) => ({ label: `${month}`, value: `${month}` }))}
                style={pickerSelectStyles}
              />
            </View>

            {/* Año de Nacimiento */}
            <View style={styles.pickerContainer}>
              <RNPickerSelect
                placeholder={{}}
                onValueChange={(value) => setAnioNacimiento(value)}
                items={generateOptions(1900, 2024).map((year) => ({ label: `${year}`, value: `${year}` }))}
                style={pickerSelectStyles}
              />
            </View>
          </View>

          {/* Campo de Estado Civil */}
          <Text style={styles.label}>Estado Civil</Text>
          <RNPickerSelect
            placeholder={{ label: 'Selecciona tu estado civil', value: null }}
            onValueChange={(value) => setEstadoCivil(value)}
            items={[
              { label: 'Soltero', value: 'Soltero' },
              { label: 'Casado', value: 'Casado' },
              { label: 'Divorciado', value: 'Divorciado' },
              { label: 'Viudo', value: 'Viudo' },
            ]}
            style={pickerSelectStyles}
          />

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Registrar</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
            </View>
        </View>
    );
}


const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 16,
      padding: 8,
      width: '100%',
      borderRadius: 20,
      backgroundColor: 'white',
    },
    inputAndroid: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 16,
      padding: 8,
      width: '100%',
      borderRadius: 20,
      backgroundColor: 'white',
    },
  });
  

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
      },
      footer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 70,
      },
      formContainer: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: '#CAF0F8',
        borderWidth: 2,
        borderColor: '#000000',
        padding: 16,
        borderRadius: 20,
        marginBottom: 16,
      },
      header: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 20,
        letterSpacing: 5,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
      },
      label: {
        fontSize: 16,
        marginBottom: 4,
        color: '#333',
        flex: 1, // Para distribuir el espacio de manera equitativa en el contenedorRow
      },
      input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        padding: 8,
        width: '100%',
        borderRadius: 20,
        backgroundColor: 'white',
      },
      button: {
        width: '50%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#0077B6',
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#FFFFFF',
      },
      buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
      },
      containerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
      },
      containerRowLabel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
      },
      pickerContainer: {
        flex: 1,
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 8,
        backgroundColor: 'white',
      },
      containerBottom: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 2.5,
      },
    
});
