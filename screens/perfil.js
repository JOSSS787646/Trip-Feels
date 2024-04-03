import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, Modal } from 'react-native';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faCircleLeft, faSearch, faUser, faExclamationCircle, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faFacebookMessenger, faShareAlt } from '@fortawesome/free-brands-svg-icons'; // Importa los iconos de marcas
import { useNavigation } from "@react-navigation/native";
import { Uploading } from "../components/Uploading";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db, storage } from "../firebaseCredentials";
import AsyncStorage from '@react-native-async-storage/async-storage';

library.add(faBars);
library.add(faCircleLeft);
library.add(faSearch);
library.add(faUser);
library.add(faExclamationCircle);
library.add(faRightFromBracket);

const TripFeelsApp = () => {
  const navigation = useNavigation();
  const [images, setImages] = useState([]);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [image, setImage] = useState("");
  const [video, setIVideo] = useState("");
  const [progress, setProgress] = useState(0);
  const [files, setFiles] = useState([]);
  const [userName, setUserName] = useState('');


  useEffect(() => {
    // Recuperar el nombre de usuario almacenado en AsyncStorage
    AsyncStorage.getItem('usuario').then((value) => {
      if (value !== null) {
        setUserName(value);
      }
    });
  }, []);


  useEffect(() => {
    const unsuscribe = onSnapshot(collection(db, "files"), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const data = change.doc.data();
        if (change.type === 'added' && data && data.userName === userName) {
          console.log("Nuevo archivo", data);
          setFiles((prevFiles) => [...prevFiles, data]);
        }
      })
    });
  
    return () => unsuscribe();
  }, [userName]);
  

  

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect:[3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      //cargar imagen
      await uploadImage(result.assets[0].uri, "image");
    }
  }

  async function uploadImage(uri, fileType) {
    const response = await fetch(uri);
    const blob = await response.blob();

    const userFolderRef = ref(storage, `Stuff/${userName}`); // Subcarpeta del usuario

    // Genera un nombre único para la imagen
    const imageName = new Date().getTime().toString();
    const imageRef = ref(userFolderRef, imageName);
    
    const uploadTask = uploadBytesResumable(imageRef, blob);


    //Llamar los eventos
    uploadTask.on("state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log("Subiendo" + progress + "&done");
        setProgress(progress.toFixed())
      },
      (error) => {

      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) =>{
          console.log("File available at", downloadURL)

          //save record
          await saveRecord(fileType, downloadURL, new Date().toISOString());
          setImage("")
          setIVideo("")
        })
      }
    )
  }

  async function saveRecord(fileType, url, createdAt) {
    try {
      const docRef = await addDoc(collection(db, "files"), {
        fileType,
        url,
        createdAt,
        userName: userName // Incluye el nombre de usuario aquí
      });
      console.log("Documento guardado exitosamente", docRef.id);
    } catch (e) {
      console.log(e);
    }
  }
  

  const ProfileInfo = ({ photoURL, userName }) => {
    return (
      <View style={styles.profileContainer}>
        <Image source={{ uri: photoURL }} style={styles.profileImage} />
        <Text style={styles.userName}>{userName}</Text>
      </View>
    );
  };

  const handleRutasGeneradasPress = () => {
    navigation.navigate('rutasGeneradas');
  }
  

  return (
      <View style={styles.container}>
      <View style={styles.headerContainer}>
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
              <FontAwesomeIcon icon={faWhatsapp} size={30} color="#caf0f8" />
            </View>

            <View>
            <FontAwesomeIcon icon={faFacebookMessenger} size={30} color="#caf0f8" />
            </View>

            <View>
              <FontAwesomeIcon icon={faFacebookMessenger} size={30} color="#caf0f8" />
            </View>

            <View>
            <FontAwesomeIcon icon={faFacebookMessenger} size={30} color="#caf0f8" />
            </View>

          </View>
        </View>
      </Modal>

      <View style={styles.contenedorCentro}>
          <View style= {styles.infoProfile}>
            <ProfileInfo photoURL="https://via.placeholder.com/100" userName={userName} />
          </View>
          
        <View style={styles.header}>

          <TouchableOpacity style={styles.botonEditar}>
            <Text>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botonCompartir} onPress={() => setMenuOpen(true)}>
            <Text>Compartir Lugar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={files}
          keyExtractor={(item) => item.url}
          renderItem={({item}) => {
              if(item.fileType === "image"){
                  return(
                      <Image
                      source={{uri: item.url}}
                      style ={{width: 80, height:80}}
                      />
                  );
              }else{

              }

          }}
          numColumns={4}
        />
            {image && <Uploading image={image} video={video} progress={progress}/>}

        <TouchableOpacity 
        onPress={pickImage}
        style={{ backgroundColor: 'blue', alignItems: 'center', padding: 10, marginBottom: 15, marginLeft:70, marginTop:15 ,width:250, borderRadius:15 }}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Agregar Imagen</Text>
        </TouchableOpacity>

        <View style={styles.contenedorRegistroVisitas}></View>
      </View>

      <View style={styles.footerContainer}>
        <FontAwesomeIcon icon={faExclamationCircle} size={50} color="#03045E" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: 96,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 50,
    marginLeft: 20,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  contenedorCentro: {
    flex: 1,
    backgroundColor: 'white',
  },
  contenedorImagenes: {
    flexDirection: 'row',
    backgroundColor: 'black',
    padding: 5,
    justifyContent: 'flex-start',
    alignContent: 'space-around',
    marginBottom: 30,
    height: 200,
    marginHorizontal: 10,
  },
  contenedorImagen: {
    backgroundColor: 'white',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    height: 80,
    width: 80,
    marginLeft: 14
  },
  contenedorRegistroVisitas: {
    flexDirection: 'column',
    backgroundColor: 'rgba(0, 119, 182, 0.5)',
    padding: 30,
    justifyContent: 'space-evenly',
    height: 200,
    marginHorizontal: 10,
    borderRadius: 20
  },
  header: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 30
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    paddingTop: 30
  },
  iconContainer: {
    flexDirection: 'row',
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
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
   botonEditar: {
    backgroundColor: 'white',
    width: 90,
    height: 30,
    borderWidth: 1,
    shadowColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  botonCompartir: {
    backgroundColor: 'white',
    width: 120,
    height: 30,
    borderWidth: 1,
    shadowColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  infoProfile:{
    height:100,
    backgroundColor: 'white',
  },
  menuContainer: {
    backgroundColor: '#03045E',
    justifyContent: 'center',
    flexDirection:'row',
    width: '100%', // La mitad de la pantalla
    height: 190,
    borderRadius: 20,
    marginTop: 670
  },
  menuContent: {
    flex:1,
    height: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  closeButton: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: 'blue',
    alignItems: 'center',
    padding: 10,
    marginBottom: 15,
    marginLeft: 70,
    marginTop: 15,
    width: 250,
    borderRadius: 15,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TripFeelsApp;