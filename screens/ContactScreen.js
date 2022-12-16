import { View, Text,StyleSheet,Image,KeyboardAvoidingView} from 'react-native'
import React from 'react'

const ContactScreen = () => {
  return (
  
    <View  style={ styles.container }>
       <Image source={require('../assets/contact.png')} style={styles.backgroundImage} />
      
    </View>
    
  )
}



var styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backgroundImage: {
    flex: 1,
   

  },

})

export default ContactScreen

