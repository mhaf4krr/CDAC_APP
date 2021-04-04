import React from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { List, Card, Paragraph, Divider, Subheading, TextInput, Button } from "react-native-paper"

import DateTimePicker from '@react-native-community/datetimepicker';

import GlobalContext from "../context/GlobalContext"



import { backend } from '../constants/backend';






export default function ProjectComponent(props) {

    let [currentProgress, setCurrentProgress] = React.useState("0")

    let [selectedDate, setDate] = React.useState(new Date())

    let [expanded, setExpanded] = React.useState(false)

    let [showDateSelector, setShowDateSelector] = React.useState(false)



    fetchLatestProjectsAfterUpdate = async(context) => {
        try {

            if (context.internet.status) {

                console.log(context.selectedProject)
                let empId =     context.user["empId"]

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
                        "Authorization":`Bearer ${context.token}`
                      })
                });
                let data = await result.json();

                let filterSelectedProject = data.filter((project)=>{
                    return project["projectTitle"] === context.selectedProject["projectTitle"]
                })

                filterSelectedProject= filterSelectedProject[0]

                console.log("Filtered New Project ",filterSelectedProject)


                context.handleSetSelectedProject(filterSelectedProject)
                context.handleSetProjects([...data])

            }
            else{
                console.log("No internet is Available for Updates")
            }

        } catch (error) {
            console.log(error)
        }
    }


    async function updateComponentProgress(token, componentId, progress, date, context) {
        let items = [token, componentId, progress, date]
        console.log(items)

        if (!validate(items)) {
            return
        }


        if(!context.internet.status){
            console.log("No internet to Update")
            return
        }


        let formData = new FormData()
        formData.append("status", "1"),
            formData.append("projectStageId", componentId),
            formData.append("percentage", progress),
            formData.append("progressDate", date),
            formData.append("heldStatus", "1"),
            formData.append("achieved", "1")

        let response = await fetch(backend + "saveComponentProgressMobile.html", {
            method: "POST",
            body: formData,
            headers: new Headers({
                "Bearer": token
            })
        })

        if (response.status === 200) {
            let resData = await response.json()
            if (resData.success) {
                console.log("Request Success")

              

                await fetchLatestProjectsAfterUpdate(context)

                Alert.alert("Notification", resData["message"],
                    [{
                        text: "Understood"
                    }])

            }

            else {
                Alert.alert("Notification", resData["message"],
                    [{
                        text: "Understood"
                    }])
            }


        }

        else {
            console.log("error with request")
        }


    }

    function validate(items) {
        let valid = true

        for (let i = 0; i < items.length; i++) {
            if (items[i] === "" || items[i] === undefined || items[i] === null) {
                valid = false
                break
            }
        }

        return valid
    }

    function formatDate(date) {

        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        let formattedDate = day + "-" + month + "-" + year
        return formattedDate
    }

    let onDateChange = (event, selectedDate) => {
        console.log(selectedDate)
        let date = selectedDate
        setShowDateSelector(false)
        setDate(date)

    }



    return (



        <GlobalContext.Consumer>
            {context => (

                <View>
                    <List.Accordion

                        title={props.component.stages.title}
                        style={{ color: "black", fontSize: 15 }}
                        left={props => <List.Icon {...props} color="#4287f5" icon="folder" />}
                        expanded={expanded}
                        onPress={() => {
                            setExpanded(!expanded)
                        }}>

                        <View style={styles["wrapper"]}>


                            <Paragraph style={{ textAlign: 'justify' }}>
                                {props.component.stages.description}
                            </Paragraph>


                            <View>
                                <Subheading style={{ color: "blue", marginVertical: 15 }}> Current Progress : {props.component["completionPercentage"]}%</Subheading>
                            </View>

                            <View style={styles["uploadWrapper"]}>
                                <TextInput


                                    label="UPDATED PROGRESS PERCENTAGE"
                                    keyboardType="number-pad"
                                    value={currentProgress}
                                    onChangeText={text => {
                                        setCurrentProgress(text)
                                    }}
                                />

                                <View>

                                    {console.log("SEL DATE", selectedDate)}

                                    <Divider />

                                    <View style={{ paddingVertical: 15 }}><Text>Selected Date:{selectedDate.toDateString()}</Text></View>
                                    <Button mode="outlined" style={{ width: "50%", alignSelf: "center", marginTop: 15 }} onPress={e => {
                                        setShowDateSelector(true)
                                    }}> Select Date</Button>

                                    <Divider />

                                    {showDateSelector ? <DateTimePicker mode={"date"} value={selectedDate} onChange={onDateChange} /> : null}
                                </View>

                               {context.internet.status?(
                                    <Button mode="contained" style={{ marginTop: 15, paddingVertical: 10, backgroundColor: "#3f8a33" }} onPress={async () => {

                                  
                                        await updateComponentProgress(context.token, props.component["projectStageId"], currentProgress, formatDate(selectedDate), context)
   
   
   
                                   }}>
                                       UPDATE PROGRESS
                         </Button>
                               ):null}
                            </View>
                            <Divider style={{ borderColor: "black", borderWidth: 1, marginVertical: 20 }} />
                        </View>

                    </List.Accordion>

                    <Divider />
                </View>

            )}
        </GlobalContext.Consumer>


    )
}

const styles = StyleSheet.create({
    wrapper: {

        width: "90%",
        justifyContent: "space-between"

    },
    uploadWrapper: {

    }
})