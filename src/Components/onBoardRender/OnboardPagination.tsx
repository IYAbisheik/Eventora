import { StyleSheet, View, Text, Dimensions } from "react-native";
import React from "react";
import { onboardingData } from "../../Screens/Onboard/onboard";
import { SharedValue } from "react-native-reanimated";
import Dot from "./Dot";

type Props = {
    data: onboardingData[],
    x: SharedValue<number>
};

const OnboardPagination = ({data,x}:Props) => {
    const {width,height} = Dimensions.get('window')
    return(
        <View style={[styles.paginationConatiner,{top: width/30}]}>
            {data.map((_,index) => {
                return <Dot index={index} x={x}/>
            })}
        </View>
    )
}

export default OnboardPagination;

const styles = StyleSheet.create({
    paginationConatiner: {
        flexDirection: "row",
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    }
})