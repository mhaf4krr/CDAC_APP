import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";

import { Picker } from "@react-native-picker/picker";

import { List } from "react-native-paper";

import { backend } from "../constants/backend";

import Project from "../components/Project";

export default class Update extends Component {
  state = {
    projectsLoaded: false,
    projects: [],
    selectedProject: false,
    selectedLanguage: "English",
  };

  fetchProjectsFromServer = async () => {
    let result = await fetch(backend + "callLoginProjectList.html");
    let data = await result.json();

    console.log(data);
    //Data received is an Array of Objects

    this.setState({
      projects: [...data],
      projectsLoaded: true,
    });
  };

  componentDidMount() {
    this.fetchProjectsFromServer();
  }

  render() {
    console.log(backend);
    return (
      <View>
        <View style={styles["headerWrapper"]}>
          <Text style={styles["headerText"]}>Update Projects</Text>
        </View>

        {!this.state.projectsLoaded ? (
          <View style={styles["loadingScreen"]}>
            <Text>Please wait, loading projects</Text>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View>
            <View style={styles["projectWrapper"]}>
              <Text style={styles["projectText"]}>
                Choose a Project to Update
              </Text>
            </View>
            <View>
                <Project/>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  projectText: {
    fontSize: 18,
  },

  projectDropdown: {
    width: "80%",
    marginVertical: 20,
  },
  headerWrapper: {
    backgroundColor: "green",
    padding: 15,
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },

  loadingScreen: {
    flexGrow: 1,
    paddingTop: 60,
    justifyContent: "center",
    alignItems: "center",
  },

  projectWrapper: {
    alignItems: "center",
    paddingTop: 30,
  },
});
