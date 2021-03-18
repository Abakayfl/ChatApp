import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Chat extends React.Component {
  render() {
    let color = this.props.route.params.color;
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });

    const styles = StyleSheet.create({
      container: {
        backgroundColor: color,
        flex: 1,
      },
    });

    return (
      <View style={styles.container}>
        <Text>This Chat View!</Text>
      </View>
    )
  }
}