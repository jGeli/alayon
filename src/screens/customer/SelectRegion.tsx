//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, Switch, FlatList, Alert } from 'react-native';
import { COLORS, FONTS, SIZES, icons, constants } from '../../constants';
import { useDispatch } from 'react-redux';
import { getAreaCodes } from '../../redux/actions/data.actions';
import TestScreen from '../TestScreen';
import { ScrollView } from 'react-native';
import AreaStep from '../../components/AreaStep';


// create a component
const SelectRegion = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const [areas, setAreas] = useState([]);
    const [areaOptions, setAreaOptions] = useState([]);
    const [stepInput, setStepInput] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [areaValue, setAreaValue] = useState({
        region: null,
        regCode: null,
        province: null,
        provCode: null,
        cityMun: null,
        cityMunCode: null,
        barangay: null,
        barangayCode: null
    })
    
    
    const handleStepInput = (e) => {
        setCurrentStep(e)
    
        if(e === 0){
            setStepInput([])
            setAreaOptions([])
            return
        } 
        
        if(e === 1){
            setAreaOptions(areas[areaValue.regCode].provinces);
        } 
        
        if(e === 2){
            setAreaOptions(areas[areaValue.regCode].provinces[areaValue.provCode].cityMuns);
        } 
        
        if(e === 3){
            setAreaOptions(areas[areaValue.regCode].provinces[areaValue.provCode].cityMuns[areaValue.cityMunCode].barangays);
        } 
        
        setStepInput(Object.entries(areaValue).filter(([key, val]) => {
            return (key === 'region' || key === 'province' || key === 'cityMun' || key === 'barangay') && val;
        }).map(([key, val]) =>  { return val}))
    }

    const handleRegions = async () => {
        let regions = await dispatch(getAreaCodes());
        if (regions) {
            setAreas(regions)
            
        }
    }
    
    const handleReset = () => {
    setCurrentStep(0)
        setStepInput([])
        setAreaValue({
            region: null,
            regCode: null,
            province: null,
            provCode: null,
            cityMun: null,
            cityMunCode: null,
            barangay: null,
            barangayCode: null
        })
        
    
    }

    const handleSelectRegion = async (item, index) => {
        setAreaOptions(item.provinces)
        setCurrentStep(1)
        if(item.name != areaValue.region){
        setStepInput([item.name, 'Select Province'])
        setAreaValue({...areaValue, region: item.name, regCode: index, province: null, cityMun: null, barangay: null, provCode: null, cityMunCode: null, barangayCode: null})
        } else {
            setStepInput(Object.entries(areaValue).filter(([key, val]) => {
                return (key === 'region' || key === 'province' || key === 'cityMun' || key === 'barangay') && val;
            }).map(([key, val]) =>  { return val}))
        }
    }

    const handleSelect = async (item, index) => {
        if(currentStep === 1){
            setAreaOptions(item.cityMuns);
            setCurrentStep(2);
            setAreaValue({...areaValue, province: item.name, provCode: index, cityMun: null, barangay: null, barangayCode: null, cityMunCode: null});
            setStepInput([areaValue.region, item.name, 'Select City'])
        }
        
        if(currentStep === 2){
            setAreaOptions(item.barangays);
            setCurrentStep(3);
            setAreaValue({...areaValue, cityMun: item.name, cityMunCode: index, barangay: null, barangayCode: null});
            setStepInput([areaValue.region, areaValue.province, item.name, 'Select Barangay'])
        }
        if(currentStep === 3){
                setCurrentStep(4)
                setAreaValue({...areaValue, barangay: item.name, barangayCode: index});
                setStepInput([areaValue.region, areaValue.province, areaValue.cityMun, item.name])
                navigation.navigate('Map', route.params)
        }
    }

    function renderHeader() {
        return (
            <View
                style={styles.header}>
                <TouchableOpacity
                    style={{ margin: SIZES.padding, marginRight: SIZES.padding * 2 }}
                    onPress={() => navigation.goBack()}>
                    <Image
                        source={icons.back}
                        style={{ height: 20, width: 20, tintColor: COLORS.primary }}
                    />
                </TouchableOpacity>
                <Text
                    style={{
                        ...FONTS.body2,
                        color: COLORS.black,
                        // fontWeight: 'bold',
                    }}>
                    Select Region
                </Text>

                <View></View>
            </View>
        );
    }

    useEffect(() => {
        handleRegions()
    }, [])


    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            <View
                style={{
                    width: '100%',
                    height: 50,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    paddingHorizontal: SIZES.padding,
                    paddingBottom: 3
                }}
            >
                <Text style={{ ...FONTS.body4, color: COLORS.transparentBlack7 }}>Select Region</Text>
                <TouchableOpacity><Text style={{ ...FONTS.body4, color: COLORS.primary }}
                    onPress={() => handleReset()}
                >Reset</Text>
                </TouchableOpacity>
            </View>
            {stepInput.length !== 0 ?
            <View
                style={{
                    height: stepInput.length * 50,
                    paddingVertical: 5,
                    paddingLeft: SIZES.padding,
                       flexDirection: 'row',
                    width: '100%',
                    backgroundColor: COLORS.white
                }}
            >
      
                <AreaStep 
                    currentPage={currentStep}
                    handleStepInput={handleStepInput}
                    stepInput={stepInput}
                />
                </View>
:
<>
            <View
                style={{
                    width: '100%',
                    // flexGrow: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start'
                }}
            >
                {areas.map((a, index) => {
                    return (
                        <TouchableOpacity style={{...styles.listItem, backgroundColor: COLORS.white}} key={a.code} onPress={() => handleSelectRegion(a, index)}>
                            <View style={styles.listItemContent}>
                                <Text>{a.name}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}

            </View>
          
            </>
             }
                        <View
                style={{
                    width: '100%',
                    height: 40,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    paddingHorizontal: SIZES.padding,
                    paddingBottom: 3
                }}
            >
                <Text style={{ ...FONTS.body5, color: COLORS.transparentBlack7 }}>{currentStep === 1 ? 'Select Province' : currentStep === 2 ? 'Select City/Municipality'  : currentStep === 3 ?'Select Barangay' :  ''}</Text>
           
            </View>
          {stepInput.length !== 0 && currentStep <= 3 ? <View
                style={{
                    flex: 1,
                    width: '100%',
                    // flexGrow: 1,
                    // marginTop: SIZES.padding * 3,
                    // paddingBottom: SIZES.padding * 5
                }}
            >
                <FlatList
                    data={areaOptions}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.code}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={styles.listItem} key={item.code} onPress={() => handleSelect(item, index)}>
                                <View style={styles.listItemContent}>
                                    <Text>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View> : null}
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        height: '100%',
        flexGrow: 1,
        flex: 1,
        // flexDirection: 'column',
        backgroundColor: COLORS.lightGray3,
        paddingBottom: SIZES.padding * 3,
        // marginBottom: SIZES.padding * 8,
        // alignItems: 'center',

    },
    header: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        elevation: 5,
        width: '100%'
    },
    listItem: {
        
        position: 'relative',
        width: '110%',
        backgroundColor: COLORS.lightGray 
    },
    listItemContent: {
        paddingVertical: 10,
        paddingLeft: 10,
        marginLeft: SIZES.padding,
        borderBottomColor: COLORS.darkGray2,
        borderBottomWidth: .5,
    }

});

//make this component available to the app
export default SelectRegion;
