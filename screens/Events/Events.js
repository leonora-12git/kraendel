import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, TouchableHighlight, ScrollView } from 'react-native';
import styles from './styles';
import { db } from '../../firebase';
import { ref, onValue } from 'firebase/database';
import userPic from '../../assets/userdefaulticon.jpg';
import { AntDesign } from '@expo/vector-icons';
import en from '../../translations/en';
import mk from '../../translations/mk';

const EventBox = (props) => {
  const [todoData, setTodoData] = useState([]);
  const [lang, setLang] = useState(en);

  useEffect(() => {
    const postCountRef = ref(db, 'posts/');
    onValue(postCountRef, (snapshot) => {
      const data = snapshot.val();
      const newPost = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
        pressed: false,
      }));
      console.log(newPost);
      setTodoData(newPost);
    });
  }, []);

  useEffect(() => {
    // Update the language whenever the props change
    setLang(props.route.params.language);
  }, [props.route.params.language]);

  const handleLikeButtonPress = (itemId) => {
    setTodoData((prevData) =>
      prevData.map((item) =>
        item.id === itemId ? { ...item, pressed: !item.pressed } : item
      )
    );
  };

  return (
    <ScrollView>
      {todoData.map((item, index) => {
        return (
          <TouchableOpacity style={styles.boxContainer} key={index}>
            <View style={styles.profileContainer}>
              <Image source={{ uri: userPic }} style={styles.profileImage} />
              <Text style={styles.publisherName}>{item.user}</Text>
            </View>
            <View style={styles.eventContainer}>
              <View style={styles.eventDetails}>
                <Text style={styles.eventTitle}>{item.title}</Text>
                <Text style={styles.eventDescription}>{item.description}</Text>
              </View>
              <View style={styles.likeCommentContainer}>
                <TouchableOpacity
                  style={styles.likeButton}
                  onPress={() => handleLikeButtonPress(item.id)}
                >
                  <Text style={styles.buttonText}>
                    {lang.interested}{' '}
                    <AntDesign
                      name={item.pressed ? 'heart' : 'hearto'}
                      size={16}
                      color="white"
                    />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default EventBox;
