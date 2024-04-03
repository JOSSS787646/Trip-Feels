import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Inicia() {
    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const navigation = useNavigation();

    const handleIniciarSesionPress = async () => {
        // Validar si el nombre de usuario y la contraseña están vacíos
        if (usuario === '' || contraseña === '') {
            Alert.alert('Error', 'Por favor, ingresa un nombre de usuario y una contraseña.');
            return;
        }

        try {
            // Realizar la solicitud HTTP para iniciar sesión
            const response = await axios.post('http://tripfels.somee.com/api/user/Login', {
                UserName: usuario, // Utiliza el nombre de usuario en lugar del correo electrónico
                Password: contraseña
            });

            // Guardar el nombre de usuario en AsyncStorage
            await AsyncStorage.setItem('usuario', usuario);

            // Si la solicitud es exitosa, navegar a la pantalla de PersonalizarRuta
            navigation.navigate('PersonalizarRuta');
        } catch (error) {
            // Si hay un error en la solicitud, mostrar un mensaje de error
            Alert.alert('Error', 'Nombre de usuario o contraseña incorrectos.');
        }
    };

    const handleRegistroPress = () => {
        // Navegar a la pantalla de registro
        navigation.navigate('RegisterScreen');
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.titleText}>TRIP FEELS</Text>
                <Text style={styles.titleText2}>Iniciar sesión</Text>
            </View>

            <View style={styles.contenedorCentro}>
                <View>
                    <Image style={styles.imagenLogo} source={require('../imagenes/TripFeelsLogo2.png')} />
                </View>
                <View>
                    <View style={styles.cajaTexto}>
                        <TextInput
                            placeholder='Nombre de usuario'
                            style={{ paddingHorizontal: 15 }}
                            onChangeText={(text) => setUsuario(text)}
                        />
                    </View>
                    <View style={styles.cajaTexto}>
                        <TextInput
                            placeholder='Contraseña'
                            style={{ paddingHorizontal: 15 }}
                            secureTextEntry
                            onChangeText={(text) => setContraseña(text)}
                        />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleIniciarSesionPress}>
                        <Text style={styles.buttonText}>Iniciar Sesión</Text>
                    </TouchableOpacity>
                    <View style={styles.registrate}>
                        <Text>
                            ¿No tienes cuenta?
                            <Text style={styles.colorRegistrate} onPress={handleRegistroPress}>Regístrate</Text>
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    contenedorCentro: {
        flex: 1,
        backgroundColor: '#CAF0F8',
        borderRadius: 18,
        marginHorizontal: 20,
        marginVertical: 20,
        padding: 20,
        flexDirection: 'column',
        borderWidth: 1,
    },
    headerContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 140,
        backgroundColor: 'white',
        paddingHorizontal: 20,
    },
    titleText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 20,
        paddingTop: 30
    },
    titleText2: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    imagenLogo: {
        width: 300,
        height: 100,
        marginTop: 40,
        marginBottom: 40
    },
    cajaTexto: {
        paddingVertical: 20,
        backgroundColor: 'white',
        borderRadius: 30,
        marginVertical: 10,
        marginBottom: 30,
        borderWidth: 1
    },
    checkboxContainer: {
        backgroundColor: 'transparent',
        borderWidth: 0,
    },
    button: {
        backgroundColor: '#0077B6',
        borderRadius: 30,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
        height: 55,
        width: 200,
        marginLeft: 60,
        marginBottom: 40
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15
    },
    registrate: {
        alignContent: 'center',
        marginLeft: 55
    },
    colorRegistrate: {
        color: "blue",
        fontSize: 16
    }
});