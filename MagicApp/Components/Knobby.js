import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Alert, Modal, Pressable,} from 'react-native';
import Slider from '@react-native-community/slider';
import ArcSlider from "rn-arc-slider";


class Knobby extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    value: 20,
    modalVisible: false,
    diceModal: false,
    counterone:0,
    countertwo:0,
    counterthree:0,
    counterfour:0,
    counterfive:0,
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }
  setDiceModal = (visible) => {
    this.setState({ diceModal: visible });
  }

  handleSliderChange = (value) => {
    if (value <= 100 && value >= 0) {
      this.setState({
        value:value
      })
    }
  }

  render() {
    return (
      
      <View style={styles.container}>
        {/* <Slider
          value={this.state.value}
          style={{width: 200, height: 40}}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          step={1}
          onValueChange={this.handleSliderChange}
        /> */}
        <TouchableOpacity activeOpacity={0.95} style={styles.buttontwo} onPress={() => this.setState({value:this.state.value + 1})}>
              <Text style={styles.text}>+1</Text>
        </TouchableOpacity>
        <View style={{height: 0, width: 100}}></View>
        <ArcSlider
          value={this.state.value}
          onChange={this.handleSliderChange}
          trackColor={"#fec859"}
          thumbColor={"#331a38"}
          textColor='#43b5a0'
          showThumbText
          showText
          textSize = {100}
          thumbRadius = {18}
          maxAngle={360}
          minAngle={0}
          trackWidth={10}
          minValue={0}
          maxValue={100}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              this.setModalVisible(!this.state.modalVisible);
            }}
          >
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Counters!</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width:140, height:100}}>
                <Button title="-" onPress={() => this.setState({counterone: this.state.counterone - 1})}></Button>
                <Text>{this.state.counterone}</Text>
                <Button title="+" onPress={() => this.setState({counterone: this.state.counterone + 1})}></Button>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width:140, height:100}}>
                <Button title="-" onPress={() => this.setState({countertwo: this.state.countertwo - 1})}></Button>
                <Text>{this.state.countertwo}</Text>
                <Button title="+" onPress={() => this.setState({countertwo: this.state.countertwo + 1})}></Button>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width:140, height:100}}>
                <Button title="-" onPress={() => this.setState({counterthree: this.state.counterthree - 1})}></Button>
                <Text>{this.state.counterthree}</Text>
                <Button title="+" onPress={() => this.setState({counterthree: this.state.counterthree + 1})}></Button>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width:140, height:100}}>
                <Button title="-" onPress={() => this.setState({counterfour: this.state.counterfour - 1})}></Button>
                <Text>{this.state.counterfour}</Text>
                <Button title="+" onPress={() => this.setState({counterfour: this.state.counterfour + 1})}></Button>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width:140, height:100}}>
                <Button title="-" onPress={() => this.setState({counterfive: this.state.counterfive - 1})}></Button>
                <Text>{this.state.counterfive}</Text>
                <Button title="+" onPress={() => this.setState({counterfive: this.state.counterfive + 1})}></Button>
                </View>
                <Pressable
                  style={[styles.buttonCounter, styles.buttonClose]}
                  onPress={() => this.setModalVisible(!this.state.modalVisible)}
                >
                  <Text style={styles.textStyle}>Hide Counters</Text>
                </Pressable>
              </View>

          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.diceModal}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              this.setDiceModal(!this.state.diceModal);
            }}
          >
            <View style={styles.modalView}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height:110}}>
            <Button title="Roll dice 4" onPress={() => {
              Alert.alert("You rolled a:", (Math.floor(Math.random() * 4) + 1).toString())
              this.setDiceModal(!this.state.diceModal)
              
              }}>
            </Button>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height:110}}>
            <Button title="Roll dice 6" onPress={() => {
              Alert.alert("You rolled a:", (Math.floor(Math.random() * 6) + 1).toString())
              this.setDiceModal(!this.state.diceModal)
              
              }}>
            </Button>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height:110}}>
            <Button title="Roll dice 8" onPress={() => {
              Alert.alert("You rolled a:", (Math.floor(Math.random() * 8) + 1).toString())
              this.setDiceModal(!this.state.diceModal)
              
              }}>
            </Button>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height:110}}>
            <Button title="Roll dice 10" onPress={() => {
              Alert.alert("You rolled a:", (Math.floor(Math.random() * 10) + 1).toString())
              this.setDiceModal(!this.state.diceModal)
              
              }}>
            </Button>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height:110}}>
            <Button title="Roll dice 12" onPress={() => {
              Alert.alert("You rolled a:", (Math.floor(Math.random() * 12) + 1).toString())
              this.setDiceModal(!this.state.diceModal)
              
              }}>
            </Button>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height:110}}>
            <Button title="Roll dice 20" onPress={() => {
              Alert.alert("You rolled a:", (Math.floor(Math.random() * 20) + 1).toString())
              this.setDiceModal(!this.state.diceModal)
              
              }}>
            </Button>
            </View>
              </View>
          </Modal>

          <Pressable
            style={[styles.buttonCounter, styles.buttonOpen]}
            onPress={() => this.setModalVisible(true)}
          >
            <Text style={styles.textStyle}>Show Counters</Text>
          </Pressable>
          {/* Dice */}
          <Pressable
            style={[styles.buttonCounter, styles.buttonOpen]}
            onPress={() => this.setDiceModal(true)}
          >
            <Text style={styles.textStyle}>  Show Dice          </Text>
          </Pressable>
        </View>
        <TouchableOpacity activeOpacity={0.95} style={styles.button} onPress={() => this.setState({value:this.state.value - 1})}>
              <Text style={styles.text}>-1</Text>
        </TouchableOpacity>
        <View style={{height: 30, width: 100}}></View>

        {/* <Text>{this.state.value.toString()}</Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
      flexDirection: 'row', 
      height: 260, 
      width: 400,
      backgroundColor: '#491d88',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 50,
      elevation:3,
  },
  buttontwo: {
    flexDirection: 'row', 
    height: 250, 
    width: 400,
    backgroundColor: '#fec859',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    elevation:3,
},
  text: {
      fontSize: 100,
      fontWeight: 'bold',
      color:'white'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 40,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    height:740,
    width:300,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonCounter: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#fa448c",
  },
  buttonClose: {
    backgroundColor: "#fa448c",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default Knobby