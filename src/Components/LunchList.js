// Libraries Imports
import React, { Fragment } from "react";

// Components Imports
import {
  Text,
  Dimensions,
  StyleSheet,
  View,
  ImageBackground,
  ActivityIndicator
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// APIs Calls Imports
import DishesList from "../APIs/DishesList";

import DishItem from "./DishesList";

export default class LunchList extends React.Component {
  state = {
    Dishes: [],
    dataReceivedFlag: false
  };

  // Life-cycle methods implementation
  componentDidMount() {
    DishesList.then(response =>
      this.setState({ Dishes: response.data, dataReceivedFlag: true })
    );
  }

  render() {
    return (
      <Fragment>
        <ImageBackground
          style={styles.header}
          source={require("../../assets/header-background.png")}
          imageStyle={{ opacity: 0.4 }}
        >
          <Icon
            name="silverware-variant"
            backgroundColor="#19A3D7"
            style={styles.icon}
          />
          <Text style={styles.headerText}>
            V <Text style={styles.oColor}>O </Text>I L A
          </Text>
        </ImageBackground>

        {/* conditional rendering to show spinner untill the data is fetched */}
        {this.state.dataReceivedFlag ? (
          <DishItem style={{ flex: 7 }} />
        ) : (
          <View style={styles.spinner}>
            <ActivityIndicator size="large" color="#19A3D7" />
          </View>
        )}
      </Fragment>
    );
  }
}

// Styles
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  header: {
    padding: 23,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderBottomColor: "#19A3D7",
    borderBottomWidth: 4,
    borderBottomStartRadius: 2,
    borderBottomEndRadius: 2,
    marginBottom: 0.02 * height
  },
  headerText: {
    fontSize: 40
  },
  icon: {
    fontSize: 36,
    marginRight: 0.03 * width,
    color: "#19A3D7"
  },
  sperator: {
    borderTopColor: "#19A3D7",
    borderTopWidth: 0.003 * width,
    width: "7%"
  },
  oColor: {
    color: "#19A3D7"
  },
  spinner: {
    flex: 6,
    alignItems: "center",
    justifyContent: "center"
  }
});
