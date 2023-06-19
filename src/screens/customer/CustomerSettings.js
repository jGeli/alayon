import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '../../constants'

export default function CustomerSettings({navigation}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}
        onPress={() => navigation.navigate("Main", {})}
      >
      <Text style={styles.buttonText}>BACK TO MAIN</Text>
      </TouchableOpacity>
    </View>
  )
}