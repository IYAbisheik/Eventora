import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props = {}

const Map = (props: Props) => {
  return (
    <View>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <Text>Map</Text>
    </View>
  )
}

export default Map

const styles = StyleSheet.create({})