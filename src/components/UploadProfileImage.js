import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { COLORS, constants, icons } from '../constants';
import DocumentPicker from 'react-native-document-picker';


const varEnv = constants.varEnv;

export default function UploadProfileImage({ image, setImage }) {

  const uploadImage = async fileImage => {

    // Check if any file is selected or not
    if (fileImage != null) {
      // If file selected then create FormData
      const fileToUpload = fileImage;
      const data = new FormData();
      data.append('file', fileToUpload);
      // Please change file upload URL
      await axios
        .post(`${varEnv.apiUrl}/users/upload`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(res => {
          setImage(res.data.url);
        })
        .catch(err => {
          console.log(err.response);
        });
    } else {
      // If no file selected the show alert
      alert('Please Select File first');
    }
  };

  const selectFile = async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.images],
        // There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      // Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      // Setting the state to show single file attributes
      //   setImage(res);
      uploadImage(res[0]);
    } catch (err) {
      setImage(null);
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        alert('Canceled');
      } else {
        // For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };


  console.log('IMAGE NULL')
  console.log(icons.camera)
  console.log(icons.user)

  return (
    <View style={styles.container}>
      <View style={styles.uploadBtnContainer}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={{ width: 150, height: 150 }}
            resizeMode="cover"
          />
        ) : (
          <Image source={icons.user} style={styles.uploadIcon} />
        )}
        <TouchableOpacity
          //   onPress={addImage}
          onPress={selectFile}
          style={styles.cameraWrapper}>
          <Image source={icons.camera} style={styles.cameraIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    elevation: 2,
    height: 120,
    width: 120,
    // borderWidth: 1,
    borderColor: COLORS.lightGray3,
    backgroundColor: COLORS.lightGray3,
    position: 'relative',
    borderRadius: 999,
    overflow: 'hidden',
  },
  uploadBtnContainer: {
    position: 'absolute',
    backgroundColor: COLORS.lightGray,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  uploadIcon: {
    height: 100,
    width: 100,
    tintColor: COLORS.lightGray3,
    // width: 'auto',
    // backgroundColor: 'none'
  },
  uploadBtn: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  cameraWrapper: {
    position: 'absolute',
    backgroundColor: COLORS.primary,
    padding: 5,
    height: 35,
    width: 35,
    right: 15,
    bottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 999,
  },
  cameraIcon: {
    height: 20,
    width: 20,
    tintColor: COLORS.white,
  },
});
