import { View, Text,StyleSheet,Image,useWindowDimensions,} from 'react-native'
import React from 'react'

const ContactScreen = () => {
  const styles = makeStyles();
  return (
  
    <View  style={ styles.container }>
       <Image source={require('../assets/contact.png')} style={ styles.container } />
       <View style={styles.pageTitleContainer}>
            <Text style={styles.pageTitle}>Mes Contacts</Text>
          </View>

          <View style={styles.firstContainer}>
            <View>
              <Text style={styles.textContainer}>Référent Hors Piste</Text>
            </View>

            <Text style={styles.infoContainer}>
              Name:Benjamin Tagawa{"\n"}N°:06 16 66 65 43{"\n"}
              Mail:btag@horspistes.com
            </Text>
          </View>

          <View style={styles.secondContainer}>
            <View>
              <Text style={styles.textContainer}>Référent HAS</Text>
            </View>
            <Text style={styles.infoContainer}>
              Name:Julien Hopper{"\n"}N°:06 16 66 65 43{"\n"}
              Mail:leh-has@gmail.com
            </Text>
          </View>
    </View>
    
  )
}
const makeStyles = () => {
  const { fontScale } = useWindowDimensions();
return(
  StyleSheet.create({
    container: {
      flex: 1,
      width:"100%",
      height:"100%",
      
    },
    pageTitle: {
      color: "white",
      fontSize: 40 / fontScale,
      fontWeight: "bold",
    },
    pageTitleContainer: {
      backgroundColor: "#2D5971",
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      zIndex: 90,
      width: "80%",
      position: "absolute",
      top: 40,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 10,
    },
    firstContainer:{
backgroundColor:"red",

    },
    textContainer:{
      fontSize:30,

    },
    infoContainer:{ 
fontSize:15,
    },
    secondContainer:{
backgroundColor:"violet"
    }
  })
 )}

 

export default ContactScreen

