import React, { useState,useEffect } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { firestoredb } from '../../firebase';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { } from 'react';
import { db } from '../../firebase';
import { ref,set } from 'firebase/database'
import { auth } from '../../firebase';
import en from '../../translations/en';
import mk from '../../translations/mk';
import { analytics } from '../../firebase';
import {  logEvent } from "firebase/analytics";





const CreateEventPage = (props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [userEmail,setUserEmail] = useState('');
  const [lang, setLang] = useState(en);
  
  const addPost = async (title, description) => {
    try {
      const postsCollection = collection(firestoredb, 'posts');
      const newPostRef = await addDoc(postsCollection, {
        title: title,
        description: description,
      });
    
      logEvent(analytics, 'custom_event', {
        custom_param: 'Post Added',
      });
      console.log('Post added with ID:', newPostRef.id);
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };
  
  // Usage example
  
  
 
  useEffect(() => {
    const getCurrentUserEmail = () => {
      if (auth.currentUser) {
        setUserEmail(auth.currentUser.email);
      }
    };

    getCurrentUserEmail();
  }, []);


  useEffect(() => {
    // Update the language whenever the props change
    setLang(props.route.params.language);
  }, [props.route.params.language]);

  
  
  const addData = () => {
    set(ref(db, 'posts/' + title),{
      title:title,
      description:description,
      user:userEmail,
  
    });
    setTitle('');
    setDescription('');
    addPost(title,description,10);
    

    console.log("added")
  }

 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{lang.cevent}</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder={lang.title}
          onChangeText={(text) => setTitle(text)}
          value={title}
        />
        <TextInput
          style={styles.input}
          placeholder={lang.description}
          onChangeText={(text) =>setDescription(text)}
          value={description}
        />
   
      </View>
      <TouchableOpacity style={styles.createButton} onPress={addData}>
        <Text style={styles.createButtonText}>{lang.cevent}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  photoButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
  photoButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  photoPreview: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CreateEventPage;
