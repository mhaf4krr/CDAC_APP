/*
  There are two scenarios possible:
  1. Internet is Avialable: -> then directly Fetch the Project List from Server and Update the List present in Local Storage
  2. Internet is Not Available : -> then fetch Local Storage for Project List and Display it to User
      
      -> Internet Not Available with Empty Local Storage :then we have nothing to display -> display an error 
*/


import React, { Component } from "react";

import AsyncStorage from '@react-native-async-storage/async-storage';

import {backend} from "../constants/backend"

import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  ScrollView,
  Touchable,
  TouchableOpacity,
} from "react-native";

import { Picker } from "@react-native-picker/picker";

import { Divider,DataTable, Button } from "react-native-paper"









export default class Update extends Component {
  state = {
    projectsLoaded: false,
    projects: [],

    selectedProjectId: false,
    selectedProject:null



  };


  fetchProjectComponents = async(projectID) =>{
    let formData = new FormData()
    formData.append("dataType",1)
    formData.append("projectForStage",projectID)

    let components = await fetch(backend+"callForSelectedProjectStagesMobile.html",{
      method:"POST",
      body:formData
    })

    let data = await components.text()
    
    data = (JSON.parse(data))
  
  }



  getProjectFromID(id) {
    let result = this.state.projects.filter((project) => {
      return project["projectId"] === id
    })
  
    return result[0]
  }
  
  isInternetAvailable (){
    let internet = this.props.internet
    return internet.status
  }

  fetchProjectsFromServer = async () => {
   try {
    let result = await fetch(backend + "callLoginProjectList.html");
    let data = await result.json();

    console.log(data);
    //Data received is an Array of Objects

    this.setState({
      projects: [...data],
      projectsLoaded: true,
    });

    this.setProjectsInLocalStorage(this.state.projects)
   } catch (error) {
     console.log("Internet Available but Server didnt respond, using Local Data if Available")
    let localData = await this.getProjectsFromLocalStorage()
    console.log(localData)
    if(localData){
      this.setState({
        projectsLoaded:true,
        projects:[...localData]
      })
    }
   }
  };


 

  setProjectsInLocalStorage = async(projects) =>{
    try {
      const data = JSON.stringify(projects)
      await AsyncStorage.setItem("projects",data)
      console.log("Projects stored Locally")
    } catch (error) {
      console.log(error)
    }
  }

  getProjectsFromLocalStorage = async(projects) =>{
    try {
      let data = await AsyncStorage.getItem("projects")
      if(data === null){
        return false
      }
      let projects = JSON.parse(data)
      return projects
    } catch (error) {
      console.log(error)
    }
  }



  async componentDidMount() {

   
    try {
      if(this.isInternetAvailable()){

        // await this.useLocalData()

        this.fetchProjectsFromServer()
        console.log("Internet is Available Fetching from Server")
       
      }

      else {

        /* No Internet is Available */
          await this.useLocalData()
      }
    } catch (error) {
      console.log(error)
    }
  }

  async useLocalData(){
    let localData = await this.getProjectsFromLocalStorage()
          if(localData){
            this.setState({
              projects:[...localData],
              projectsLoaded:true
            })
          }
  }

  render() {

    return (
      <View>
        {/* <View style={styles["headerWrapper"]}>
          <Text style={styles["headerText"]}>UPDATE PROJECTS SCREEN</Text>
        </View> */}

        {!this.state.projectsLoaded ? (
          <View style={styles["loadingScreen"]}>
            <Text>Please wait, loading projects</Text>
            <View style={styles["activityWrapper"]}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          </View>
        ) : (
          <ScrollView>
            <View style={styles["projectWrapper"]}>
              <Text style={styles["projectText"]}>
                Choose a Project to Update
              </Text>
            </View>

            <View style={styles["picker_container"]}>

              <View style={styles["container"]}>
                <Picker style={styles["picker"]}

                  selectedValue={this.state.selectedProjectTitle}

                  onValueChange={(itemValue, itemIndex) => {
                    this.setState({
                      selectedProjectId: itemValue,
                      selectedProject: this.getProjectFromID(itemValue)
                    })


                    this.fetchProjectComponents(itemValue)

                  }

                  }
                >

                  {this.state.projects.map((project) => {
                    return (
                      <Picker.Item key={project["projectId"]} projectSel={project} label={`${project["projectTitle"]} | ${project["districtName"]} `} value={project["projectId"]}





                      />
                    )
                  })}

                </Picker>

              </View>

             
              

            </View>


            <Divider style={{marginVertical:15}}/>
           
                  {this.state.selectedProject!==null?(
                        <View style={styles["cardWrapper"]}>
                        <View>
                          <View style={styles["cardHeader"]}>
                          <Text style={styles["cardHeaderText"]}>PROJECT INFORMATION</Text>
                          </View>
                          <View style={styles["cardRow"]}>
                            <Text style={styles["cardHeading"]}> Project</Text>
                            <Text> {this.state.selectedProject["projectTitle"]} </Text>
                          </View>
        
                          <Divider/>
        
                          <View style={styles["cardRow"]}>
                            <Text style={styles["cardHeading"]}> District</Text>
                            <Text> {this.state.selectedProject["districtName"]}</Text>
                          </View>
        
                          <Divider/>
        
                          <View style={styles["cardRow"]}>
                            <Text style={styles["cardHeading"]}> Project ID</Text>
                            <Text> {this.state.selectedProject["projectId"]} </Text>
                          </View>
        
                          <Divider/>
        
                          <View style={styles["cardRowDescription"]}>
                              <Text style={styles["cardHeading"]}>
                                Description
                              </Text>
        
                              <Text>
  
                              {this.state.selectedProject["projectDescription"]}
                              </Text>
                          </View>
                          <Divider/>
                          </View> 
        
                          <TouchableOpacity style={styles["btnWrapper"]}>
                            <Button style={{
                              paddingVertical:5,
                              backgroundColor:"green"
                            }} mode="contained"
                            
                            onPress={e=>{
                              this.props.navigation.navigate("Project Components",{
                                components:[]
                              })
                            }}

                            > SHOW COMPONENTS</Button>
                          </TouchableOpacity>
                    </View>
                  ):null}
            
            
           

          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({

  btnWrapper:{
    width:"65%",
    paddingVertical:15,
    alignSelf:"center"
  },

  cardRowDescription:{
    padding:10,
    paddingVertical:15
  },

  cardRow:{display:"flex",
  flexDirection:'row',
  alignSelf:"center",
  justifyContent:"space-between",
  width:"90%",
  paddingVertical:15
},

  cardHeading:{
    fontWeight:"bold",
    alignSelf:'flex-start'
  },  

  cardHeaderText:{color:"white",}
  ,
  cardHeader:{
    backgroundColor:"#42a1f5",
    justifyContent:"center",
    alignItems:"center",

    paddingVertical:25
  },

  cardWrapper:{
    
    width:"80%",
    justifyContent:"center",
    backgroundColor:"white",
    borderWidth:1,
    borderColor:"black",
    alignSelf:"center"
  },  

  picker_container: {
    display: "flex",
    alignItems: "center",
    paddingTop: 20
  },
  container: {
    borderColor: "black",
    width: "80%",
    alignItems: "center",
    borderWidth: 1,
  }
  ,

  activityWrapper: {
    paddingTop: 50
  },

  picker: {
    width: "80%",
    height: 40,
    borderColor: "red",
    backgroundColor: "gray",
    borderWidth: 3
  }
  ,
  projectText: {
    fontSize: 18,
  },

  projectDropdown: {
    width: "80%",
    marginVertical: 20,
  },
  headerWrapper: {
    backgroundColor: "#1760cf",
    padding: 15,
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },

  loadingScreen: {
    flex: 1,
    height: "100%",
    paddingTop: 60,
    justifyContent: "center",
    alignItems: "center",
  },

  projectWrapper: {
    alignItems: "center",
    paddingTop: 30,
  },
});
