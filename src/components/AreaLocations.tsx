//import liraries
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES, icons } from '../constants';
import { Image } from 'react-native';
import { cutString } from '../utils/helpers';
import { FlatList } from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAreaLocations } from '../redux/actions/data.actions';
import { SET_MAP_LOCATION } from '../redux/actions/type';

// create a component
const AreaLocations = ({navigation, route}) => {
    const dispatch = useDispatch();
    const [list, setList] = useState([]);
    
    


    const handleGetAreaLocations = async () => {
        let areas = await dispatch(getAreaLocations());
        console.log('AREAS', areas)
        if(areas){
            setList(areas)
        } 
    }







    function renderHeader() {
        return (
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                paddingRight: SIZES.padding * 2,
                justifyContent: 'center',
              }}>
              <Image
                source={icons.arrow_back}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 25,
                  tintColor: COLORS.white
                }}
              />
            </TouchableOpacity>
            <Text
               style={{fontSize: 17, color: COLORS.white, flexGrow: 1}}
            >Select Your City</Text>
            <Text
              style={{fontSize: 17, color: COLORS.white, fontWeight: 'bold'}}
            >
            Philippines
            </Text>
           
          </View>
        );
    }


    function renderItem({item, index}){
        console.log('ITEMM', item, index)
    
        return (
            <TouchableOpacity style={styles.listItem}
                onPress={() => {
                    dispatch({type: SET_MAP_LOCATION, payload: item})  
                    navigation.goBack() 
                }}
            >
            <View>
                <Text
                    style={{...FONTS.body3, color: COLORS.black}}
                >{item.cityMun}</Text>
                <Text
                    style={{...FONTS.body4, color: COLORS.darkGray}}
                >Province of {item.province}</Text>
                </View>
                {(!item.hasRider || !item.hasShop) &&
                <Text
                    style={{...FONTS.body3, color: COLORS.red}}
                >Comming Soon!</Text>
            }
            </TouchableOpacity>
        )
    
    }
    
    useEffect(() => {
            handleGetAreaLocations()
    }, [])
    


console.log('LISTING HERE', list)


    return (
        <View style={styles.container}>
        {renderHeader()}
            <FlatList
                keyExtractor={(item) => item._id}
                data={list}
                renderItem={renderItem}
                
            />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
      headerContainer: {
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        // justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.padding
      },
      listItem: {
                padding: SIZES.padding,
                paddingHorizontal: SIZES.padding * 2,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottomColor: COLORS.darkGray,
                borderTopColor: COLORS.darkGray,
                borderWidth: .5
        }
});

//make this component available to the app
export default AreaLocations;
