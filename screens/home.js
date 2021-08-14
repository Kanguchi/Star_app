import * as React from 'react';
import { View, Text, StyleSheet, Alert, SafeAreaView } from "react-native";
import { FlatList } from 'react-native-web/dist/index';
import axios from "axios";
import { ListItem } from "react-native-elements";

export default class HomeScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            listData: [],
            url: 'http://127.0.0.1:5000/'
        }
    }
    componentDidMount(){
        this.getStars();
    }
    getStars=()=>{
        const {url}=this.state;
        axios.get(url).then(response=>{
            return this.setState({
                listData: response.data.data
            })
        })
        .catch(error=>{
            Alert.alert(error.message)
        })
    }
    renderItem = ({
        item, index
    })=>(
        <ListItem key={index}
        title={`Star : ${item.name}`}
        subtitle={`Distance from earth : ${item.distance}`}
        titleStyle={styles.title}
        containerStyle={styles.listContainer}
        bottomDivider
        chevron
        onPress={()=>this.props.navigation.navigate('Details', {star_name:item.name})}/>
    )
    keyExtractor = (item, index) => index.toString()
    render(){
        const{listData}=this.state;
        if (listData.length === 0){
            return(
                <View style={styles.emptyContainer}>
                    <Text>Loading . . .</Text>
                </View>
            )
        }
        return(
            <View style={styles.container}>
                <SafeAreaView/>
                <View style={styles.upperContainer}>
                    <Text style={styles.headerText}>Star's World</Text>
                </View>
                <View style={styles.lowerContainer}>
                    <Flatlist
                        keyExtractor={this.keyExtractor}
                        data = {this.state.listData}
                        renderItem = {this.renderItem}
                        />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#edc988',
    },
    upperContainer:{
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyContainer:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center'
    },
    lowerContainer:{
        flex:0.9,
    },
    headerText:{
        fontSize: 13,
        fontWeight: 'Bold',
        color: '#132743'
    },
    emptyContainerText:{
        fontSize: 20
    },
    title:{
        fontSize:18,
        fontWeight: 'Bold',
        color: '#e7385e'
    },
    listContainer:{
        backgroundColor: '#eeecba'
    }
})