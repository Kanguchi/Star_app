import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { Card, Icon } from "react-native-elements";
import axios from "axios";
export default class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
      
      url: `http://localhost:5000/star?name=${this.props.navigation.getParam(
        "name"
      )}`
    };
  }

  componentDidMount() {
    this.getDetails();
  }
  getDetails = () => {
    const { url } = this.state;
    axios
      .get(url)
      .then(response => {
        this.setDetails(response.data.data);
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  };

  setDetails = planetDetails => {
    
    this.setState({
      details: planetDetails
      
    });
  };

  render() {
    const { details, imagePath } = this.state;
    if (details.specifications) {
      return (
        <View style={styles.container}>
          <Card
            title={details.star_names}
            
          >
            <View>
              <Text
                style={styles.cardItem}
              >{`Distance from Earth : ${details.distance}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Solar Radius  : ${details.solar_radius}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Gravity : ${details.star_gravity}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Solar Mass : ${details.solar_mass}`}</Text>
              
              <Text
                style={styles.cardItem}
              >{`Star Mass : ${details.mass}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Star Radius : ${details.radius}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Apparent Magnitude : ${details.apparent_magnitude}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Star Luminosity : ${details.luminosity}`}</Text>
            </View>
            
          </Card>
        </View>
      );
    }
    return null;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cardItem: {
    marginBottom: 10
  }
});