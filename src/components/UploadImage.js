import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native'
import { COLORS, SIZES, icons, images } from '../constants';
import {launchImageLibrary} from 'react-native-image-picker';


export default function UploadImage() {
    const [image, setImage] = useState(null);

    const addImage = async () => {
        const result = await launchImageLibrary();
        setImage(result.assets[0].uri)
    };

    return (
              <View style={styles.container}>
                      <View style={styles.uploadBtnContainer}>
                    
                       
                    
                                  <TouchableOpacity onPress={() => addImage()} style={styles.cameraWrapper}>
                              <Image source={icons.camera} style={styles.cameraIcon} />
                              </TouchableOpacity>
                      </View>
              </View>
    );
}


const styles=StyleSheet.create({
    container:{
     
        height:50,
        width:50,
        // borderWidth: 1,
 

        position:'relative',
       
      
    },
    uploadBtnContainer:{
        position:'absolute',
        backgroundColor: COLORS.lightGray,
        width:'100%',
        alignItems:"center",
        justifyContent:'center',
        height:'100%',
    },
    uploadIcon: {
        height:50,
        width: 50,
       
        // width: 'auto',
        // backgroundColor: 'none'
    },
    uploadBtn:{
        flex: 1, 
        alignItems:"flex-end",
        justifyContent:'flex-end'
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
        borderRadius: 999
    },
    cameraIcon: {
        height: 20,
        width: 20   ,
        tintColor: COLORS.white
    }
})