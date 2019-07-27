import React from "react";
import { Text } from "react-native";

export default class DishFlags extends React.Component {
  render() {
    return (
      <Text style={{ color: "#D81E5B", fontSize: 12 }}>
        {this.props.flags.map(item => item.Flag)}
      </Text>
    );
  }
}
