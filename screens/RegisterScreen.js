import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Swal
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState("");
  const [usuario, setUsuario] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("");
  const [diaNacimiento, setDiaNacimiento] = useState("");
  const [mesNacimiento, setMesNacimiento] = useState("");
  const [anioNacimiento, setAnioNacimiento] = useState("");
  const [errors, setErrors] = useState({});

  const handleRegister = () => {
    const userData = {
      name: nombre,
      userName: usuario,
      email: correo,
      password: contrasena,
      civilStatus: estadoCivil,
      birthday: `${anioNacimiento}-${mesNacimiento.toString().padStart(2, '0')}-${diaNacimiento.toString().padStart(2, '0')}T00:00:00Z`
    };
    
    const validationErrors = {};
    if (!nombre) {
      validationErrors.nombre = 'Nombre es requerido';
    }
    if (!usuario) {
      validationErrors.usuario = 'Usuario es requerido';
    }
    if (!correo) {
      validationErrors.correo = 'Correo es requerido';
    }
    if (!contrasena) {
      validationErrors.contrasena = 'Contraseña es requerida';
    }
    if (!estadoCivil) {
      validationErrors.estadoCivil = 'Estado civil es requerido';
    }
    if (!diaNacimiento || !mesNacimiento || !anioNacimiento) {
      validationErrors.fechaNacimiento = 'Fecha de nacimiento es requerida';
    }
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }
  
    axios.post('http://tripfels.somee.com/api/user', userData)
    .then(response => {
      console.log('Registro exitoso');
      console.log(response.data); // Si tu API devuelve alguna respuesta
      Alert.alert('¡Bienvenido!', 'Usuario registrado con exito');
     
    })
    .catch(error => {
      Alert.alert('Error', 'El nombre de usurio o correo ya esta registrado');
      // Aquí podrías manejar el error de alguna manera, como mostrar un mensaje al usuario
    });
};
  
  const handleIniciarSesionPress = () => {
    navigation.navigate('Inicia');
  };
  
  const generateOptions = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };
  
   return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.footer}>
        <Text style={styles.titleText}>TRIP FEELS cambio</Text>
        <Text style={styles.title}>Crear Cuenta</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          placeholder=""
          value={nombre}
          onChangeText={setNombre}
          style={styles.input}
        />
        {errors.nombre && <Text style={styles.errorText}>{errors.nombre}</Text>}
        <Text style={styles.label}>Usuario</Text>
        <TextInput
          placeholder=""
          value={usuario}
          onChangeText={setUsuario}
          style={styles.input}
        />
        {errors.usuario && <Text style={styles.errorText}>{errors.usuario}</Text>}
        <Text style={styles.label}>Correo Electrónico</Text>
        <TextInput
          placeholder="example@gmail.com"
          value={correo}
          onChangeText={setCorreo}
          keyboardType="email-address"
          style={styles.input}
        />
        {errors.correo && <Text style={styles.errorText}>{errors.correo}</Text>}
        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          placeholder=""
          value={contrasena}
          onChangeText={setContrasena}
          secureTextEntry
          style={styles.input}
        />
        {errors.contrasena && <Text style={styles.errorText}>{errors.contrasena}</Text>}
      </View>

      <View style={styles.formContainer}>
        <View style={styles.containerRowLabel}>
          <Text style={styles.label}>Día</Text>
          <Text style={styles.label}>Mes</Text>
          <Text style={styles.label}>Año</Text>
        </View>

        <View style={styles.containerRow}>
          <View style={styles.pickerContainer}>
            <RNPickerSelect
              placeholder={{}}
              onValueChange={(value) => setDiaNacimiento(value)}
              items={generateOptions(1, 31).map((day) => ({
                label: day.toString(),
                value: day,
              }))}
              style={pickerSelectStyles}
            />
          </View>
          <View style={styles.pickerContainer}>
            <RNPickerSelect
              placeholder={{}}
              onValueChange={(value) => setMesNacimiento(value)}
              items={generateOptions(1, 12).map((month) => ({
                label: month.toString(),
                value: month,
              }))}
              style={pickerSelectStyles}
            />
          </View>
          <View style={styles.pickerContainer}>
            <RNPickerSelect
              placeholder={{}}
              onValueChange={(value) => setAnioNacimiento(value)}
              items={generateOptions(1900, 2024).map((year) => ({
                label: year.toString(),
                value: year,
              }))}
              style={pickerSelectStyles}
            />
          </View>
        </View>
        {errors.fechaNacimiento && <Text style={styles.errorText}>{errors.fechaNacimiento}</Text>}

        <Text style={styles.label}>Estado Civil</Text>
        <RNPickerSelect
          placeholder={{ label: "Selecciona tu estado civil", value: null }}
          onValueChange={(value) => setEstadoCivil(value)}
          items={[
            { label: "Soltero", value: "Soltero" },
            { label: "Casado", value: "Casado" },
            { label: "Divorciado", value: "Divorciado" },
            { label: "Viudo", value: "Viudo" },
          ]}
          style={pickerSelectStyles}
        />
        {errors.estadoCivil && <Text style={styles.errorText}>{errors.estadoCivil}</Text>}

        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}
        >
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    width: "100%",
    borderRadius: 20,
    backgroundColor: "white",
  },
  inputAndroid: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    width: "100%",
    borderRadius: 20,
    backgroundColor: "white",
  },
});

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
  },
  containerCompleto: {
    backgroundColor: "white",
  },
  footer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 140,
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#CAF0F8",
    borderWidth: 2,
    borderColor: "#000000",
    padding: 16,
    borderRadius: 20,
    marginBottom: 16,
  },
  titleText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "black",
    marginBottom: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    color: "#333",
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    width: "100%",
    borderRadius: 20,
    backgroundColor: "white",
  },
  button: {
    width: "50%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#0077B6",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  containerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  containerRowLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  pickerContainer: {
    flex: 1,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 8,
    backgroundColor: "white",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 8,
  },
});

export default RegisterScreen;
