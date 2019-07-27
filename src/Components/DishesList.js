// Libraries Imports
import React from "react";
import * as Animatable from "react-native-animatable";

// Components Imports
import {
  AnimatableManager,
  BorderRadiuses,
  ListItem,
  Text
} from "react-native-ui-lib";
import { StyleSheet, FlatList } from "react-native";

// User Defined Components.
import DishFlag from "./DishFlag";
import DishHours from "./DishHours";

import DishesList from "../APIs/DishesList";

export default class DishItem extends React.Component {
  state = {
    Dishes: []
  };

  // Life-cycle methods implementation
  componentDidMount() {
    DishesList.then(response => {
      this.setState({
        Dishes: response.data,
        DishName: response.data.map(item => [...item.DishName]),
        DishPhoto: response.data.map(item => [...item.DishPhoto])
      });
    });
  }
  keyExtractor = item => item.name;

  renderRow(row, id) {
    const animationProps = AnimatableManager.presets.fadeInRight;
    const imageAnimationProps = AnimatableManager.getRandomDelay();

    return (
      <Animatable.View {...animationProps}>
        <ListItem activeBackgroundColor="#000" activeOpacity={1} height={85}>
          <ListItem.Part left>
            <Animatable.Image
              source={{ uri: row.DishPhoto }}
              style={styles.image}
              {...imageAnimationProps}
            />
          </ListItem.Part>
          <ListItem.Part
            middle
            column
            containerStyle={[styles.border, { paddingRight: 17 }]}
          >
            <ListItem.Part containerStyle={{ marginBottom: 3 }}>
              <Text
                style={{ flex: 1, marginRight: 10, fontSize: 17 }}
                numberOfLines={1}
              >
                {row.DishName}
              </Text>
              <Text style={{ marginTop: 2, color: "#106550", fontSize: 20 }}>
                {row.DishPrice}
              </Text>
            </ListItem.Part>
            <ListItem.Part>
              <Text
                style={{ flex: 1, marginRight: 10, fontSize: 13 }}
                numberOfLines={1}
              >
                <Text style={{ color: "#D3271C", fontSize: 13 }}>
                  Category:
                </Text>
                {` ${row.CategoryName}`}
              </Text>
              <DishFlag flags={row.DishFlags} />
            </ListItem.Part>
            <ListItem.Part middle row>
              <DishHours hours={row.DishHours} />
            </ListItem.Part>
          </ListItem.Part>
        </ListItem>
      </Animatable.View>
    );
  }

  render() {
    console.log(this.state.Dishes);
    return (
      <FlatList
        data={this.state.Dishes}
        renderItem={({ item, index }) => this.renderRow(item, index)}
        keyExtractor={this.keyExtractor}
      />
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 54,
    height: 54,
    borderRadius: BorderRadiuses.br20,
    marginHorizontal: 14
  },
  border: {
    borderBottomWidth: 1,
    borderColor: "#d5d5d5"
  }
});
