import React from 'react'
import { View, Text ,StyleSheet} from 'react-native'
import {List,Card, Paragraph, Divider, Subheading,TextInput,Button} from "react-native-paper"



export default function ProjectComponent(props) {

    let [expanded,setExpanded] = React.useState(false)
    return (
     <View>
        <List.Accordion
        title={props.title}
        style={{color:"black"}}
        left={props => <List.Icon {...props} color="#4287f5" icon="folder" />}
        expanded={expanded}
        onPress={()=>{
            setExpanded(!expanded)
        }}>
        
        <View style={styles["wrapper"]}>
        
        
        <Paragraph style={{textAlign:'justify'}}>
        Lorem ipsum dolor sit amet,  , sem. Nulla consequat massa quis enim. Donec pede justo,  Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. S
        </Paragraph>

       
            <View>
                <Subheading style={{color:"blue",marginVertical:15}}> Current Progress : 60%</Subheading>
            </View>

            <View style={styles["uploadWrapper"]}>
            <TextInput

          
      label="UPDATED PROGRESS PERCENTAGE"
      keyboardType="number-pad"
      value={"0"}
    //   onChangeText={text => setText(text)}
    />

<Button  mode="contained" style={{marginTop:15,paddingVertical:10,backgroundColor:"#18c729"}}  onPress={() => console.log('Pressed')}>
    UPDATE PROGRESS
  </Button>
            </View>
        <Divider style={{borderColor:"black",borderWidth:1,marginVertical:20}}/>
        </View>
    
      </List.Accordion>

        <Divider/>
      </View>
    )
}

const styles = StyleSheet.create({
    wrapper:{
      
        width:"90%",
        justifyContent:"space-between"
        
    },
    uploadWrapper:{
     
    }
})