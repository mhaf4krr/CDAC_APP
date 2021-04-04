/*
  There are two scenarios possible:
  1. Internet is Avialable: -> then directly Fetch the Project List from Server and Update the List present in Local Storage
  2. Internet is Not Available : -> then fetch Local Storage for Project List and Display it to User
      
      -> Internet Not Available with Empty Local Storage :then we have nothing to display -> display an error 
*/


import React, { Component } from "react";

import AsyncStorage from '@react-native-async-storage/async-storage';

import { backend } from "../constants/backend"

import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,

  ScrollView,

  TouchableOpacity,
} from "react-native";

import { Picker } from "@react-native-picker/picker";

import { Divider, Button } from "react-native-paper"






import GlobalContext from "../context/GlobalContext"



export default class Update extends Component {
  state = {
    projectsLoaded: false,
    selectedProjectId: false,

  };

  static contextType = GlobalContext





  getProjectFromID(id) {
    let result = this.context.projects.filter((project) => {
      return project["projectId"] === id
    })

    return result[0]
  }

  isInternetAvailable() {
    let internet = this.props.internet
    return internet.status
  }

  fetchProjectsFromServer = async () => {
    try {

     

      let empId = this.context.user["empId"]

      console.log("empId", empId)

      console.log("Fetching Projects from Server")
      let formData = new FormData()

      formData.append("empId", empId)
      formData.append("status", "4");
      formData.append("type", "1");

      let result = await fetch(backend + "callLoginProjectList.html", {
        method: "POST",
        body: formData,
        headers:new Headers({
          "Authorization":`Bearer ${this.context.token}`
        })
      });
      let data = await result.json();


      //Data received is an Array of Objects

      // console.log("DATA FROM SERVER",data)


      this.context.handleSetProjects([...data])
      
      this.setState({
        projectsLoaded: true,
      });

     
      
      this.setProjectsInLocalStorage(data)

    } catch (error) {
      console.log("Internet Available but Server didnt respond, using Local Data if Available")
      let localData = await this.getProjectsFromLocalStorage()
      // console.log(localData)
      if (localData) {

        this.context.handleSetProjects(localData)

        this.setState({
          projectsLoaded: true,
          
        })
      }
    }
  };




  setProjectsInLocalStorage = async (projects) => {
    try {
      const data = JSON.stringify(projects)
      await AsyncStorage.setItem("projects", data)
      console.log("Projects stored Locally")
    } catch (error) {
      console.log(error)
    }
  }

  getProjectsFromLocalStorage = async (projects) => {
    try {
      let data = await AsyncStorage.getItem("projects")
      if (data === null) {
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


      const unsubscribe = this.props.navigation.addListener('focus', async() => {
        // The screen is focused
        // Call any action
        if(this.state.unsubscribe === null){
            this.setState({
                unsubscribe:unsubscribe
            })


        }

        console.log("Update is fouced")

        if(this.context.internet.status){
          this.fetchProjectsFromServer()
        }


      });

      if (this.isInternetAvailable()) {

        // await this.useLocalData()

        await this.fetchProjectsFromServer()
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

  async useLocalData() {
    let localData = await this.getProjectsFromLocalStorage()
    if (localData) {
      this.context.handleSetProjects(localData)

      this.setState({
 
        projectsLoaded: true,

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
              CHOOSE PROJECT
            </Text>
          </View>

          <View style={styles["picker_container"]}>

            <View style={styles["container"]}>
              <Picker style={styles["picker"]}

                selectedValue={this.state.selectedProjectTitle}

                onValueChange={(itemValue, itemIndex) => {

                  this.context.handleSetSelectedProject(this.getProjectFromID(itemValue))

                  this.setState({
                    selectedProjectId: itemValue,
                  })
                }

                }
              >

                {this.context.projects.map((project) => {
                  return (
                    <Picker.Item key={project["projectId"]} projectSel={project} label={`${project["projectTitle"]} | ${project["districtName"]} `} value={project["projectId"]}
                    />
                  )
                })}

              </Picker>

            </View>

          </View>


          <Divider style={{ marginVertical: 15 }} />

          {this.context.selectedProject !== null ? (
           


              <View style={styles["cardWrapper"]}>
                <View>
                  <View style={styles["cardHeader"]}>
                    <Text style={styles["cardHeaderText"]}>PROJECT INFORMATION</Text>
                  </View>
                  <View style={styles["cardRow"]}>
                    <Text style={styles["cardHeading"]}> PROJECT</Text>
                    <Text> {this.context.selectedProject["projectTitle"]} </Text>
                  </View>

                  <Divider />

                  <View style={styles["cardRow"]}>
                    <Text style={styles["cardHeading"]}>DISTRICT</Text>
                    <Text> {this.context.selectedProject["districtName"]}</Text>
                  </View>

                  <Divider />

                  <View style={styles["cardRow"]}>
                    <Text style={styles["cardHeading"]}>PROJECT ID</Text>
                    <Text> {this.context.selectedProject["projectId"]} </Text>
                  </View>

                  <Divider />

                  <View style={styles["cardRowDescription"]}>
                    <Text style={styles["cardHeading"]}>
                      DESCRIPTION
                            </Text>

                    <Text style={{ marginTop: 10 }}>

                      {this.context.selectedProject["projectDescription"]}
                    </Text>
                  </View>
                  <Divider />
                </View>

                <TouchableOpacity style={styles["btnWrapper"]}>
                  <Button style={{
                    paddingVertical: 5,
                    backgroundColor: "green"
                  }} mode="contained"

                    onPress={e => {
                      
                       

                      this.props.navigation.navigate("Project Components", {
                     
                       })

                  
                    }}

                  > SHOW COMPONENTS</Button>
                </TouchableOpacity>

              </View>
          

          ) : null}




        </ScrollView>

      )}
    </View>

    );
  }
}

const styles = StyleSheet.create({

  btnWrapper: {
    width: "65%",
    paddingVertical: 15,
    alignSelf: "center"
  },

  cardRowDescription: {
    padding: 10,
    paddingVertical: 15
  },

  cardRow: {
    display: "flex",
    flexDirection: 'row',
    alignSelf: "center",
    justifyContent: "space-between",
    width: "90%",
    paddingVertical: 15
  },

  cardHeading: {
    fontWeight: "bold",
    alignSelf: 'flex-start'
  },

  cardHeaderText: { color: "white", fontSize: 15 }
  ,
  cardHeader: {
    backgroundColor: "#42a1f5",
    justifyContent: "center",
    alignItems: "center",

    paddingVertical: 20,
    borderTopEndRadius: 15
  },

  cardWrapper: {

    width: "85%",
    justifyContent: "center",
    backgroundColor: "white",

    paddingBottom: 10,
    alignSelf: "center",
    borderRadius: 15,
    borderColor: "#77a7e6",
    borderWidth: 1
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
    fontSize: 15,
    fontWeight: "bold"
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
    alignItems: "flex-start",
    paddingHorizontal: 15,
    paddingTop: 30,
  },
});
