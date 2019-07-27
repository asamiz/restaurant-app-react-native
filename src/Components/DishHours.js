import React from "react";
import { Picker, View, Text } from "react-native";

export default class DishHours extends React.Component {
  state = { selectedHour: "" };
  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 6,
          marginTop: 6
        }}
      >
        <Text> Dish Hours:</Text>
        <Picker
          selectedValue={this.state.selectedHour}
          style={{
            height: 50,
            width: "80%"
          }}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({ selectedHour: itemValue });
          }}
        >
          {this.props.hours.map(item => (
            <Picker.Item label={item.Hour} value={item.Hour} />
          ))}
        </Picker>
      </View>
    );
  }
}
