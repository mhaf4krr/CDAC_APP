import React, { Component } from 'react'
import { ScrollView, Text, View,Dimensions } from 'react-native'

import { Appbar } from "react-native-paper"
import { BarChart} from "react-native-chart-kit"


export default class ViewScreen extends Component {
    render() {

        
        const data = {
            labels: ["0-25%", "26%-50%", "51%-75%", "76%-100%"],
            datasets: [
              {
                data: [2,5,10,6]
              }
            ]
          };

          const chartConfig = {
            backgroundGradientFrom: "#1E2923",
            backgroundGradientFromOpacity: 1,
            backgroundGradientTo: "#08130D",
            backgroundGradientToOpacity: 1,
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            strokeWidth: 1, // optional, default 3
            barPercentage: 1,
            useShadowColorFromDataset: false // optional
          };
        return (
            <View style={{ flex: 1 }}>
                <Appbar.Header style={{ backgroundColor: "#32a850" }}>
                    <Appbar.Content title="Status of Projects" />
                </Appbar.Header>

                <ScrollView>
                    
         
                    <BarChart
                        
                        data={data}
                        width={Dimensions.get("window").width}
                        height={Dimensions.get("window").height}
                        yAxisLabel=""
                        chartConfig={chartConfig}
                        verticalLabelRotation={0}
                    />
                </ScrollView>
            </View>
        )
    }
}
