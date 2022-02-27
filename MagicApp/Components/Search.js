import React from 'react'
import { Picker, Image, TouchableOpacity, SafeAreaView, View, TextInput, FlatList, ActivityIndicator, Text } from 'react-native'
import { Icon, Slider, Bouton } from 'react-native-elements'

import CardItem from './CardItem'
import { getCardsFromApiWithSearchedText, getSets, getTypes } from '../API/MTGApi'
import Collapsible from 'react-native-collapsible'
import { styles } from './Styles'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Cards: [],
      sets: [],
      types: [],
      isLoading: false,
      isCollapsed: true,
      searchedText: "",
      compar: "",
      colorsArray: [],
      cardSelect: [],
      dict: {
        'cmc': "",
        'colors': "",
        'set': "",
        'name': "",
        'types': ""
      },
      seen: {},
      mana: 0,
      colors: [{ col: "" }],
      collapse_icon: "chevrons-down",
      selector: false
    }
    this.page = 0
    this._setSets()
    this._setTypes()

  }

  handleChange = (e) => {
    if (["col"].includes(e.target.className)) {
      let colors = [...this.state.colors]
      colors[e.target.dataset.id][e.target.className] = e.target.value.toUpperCase()
      this.setState({ colors }, () => console.log(this.state.colors))
    } else {
      this.setState({ [e.target.name]: e.target.value.toUpperCase() })
    }
  }

  addColor = (e) => {
    this.setState((prevState) => ({
      colors: [...prevState.colors, { col: "" }],
    }));
  }

  handleSubmit = (e) => { e.preventDefault() }

  _searchCards() {
    this.page = 0
    this.setState({
      Cards: [],
    }, () => {
      if (this.state.compar == "<") {
        this.state.dict['cmc']--
        for (; this.state.dict['cmc'] >= 0; this.state.dict['cmc']--) {
          if (this.state.dict['cmc'] >= 0) {
            this._loadCards();
          }
        }
      }
      if (this.state.compar == "<=") {
        for (; this.state.dict['cmc'] >= 0; this.state.dict['cmc']--) {
          if (this.state.dict['cmc'] >= 0) {
            this._loadCards();
          }
        }
      }
      if (this.state.compar == ">") {
        this.state.dict['cmc']++
        for (; this.state.dict['cmc'] <= 20; this.state.dict['cmc']++) {
          this._loadCards();
        }
      }
      if (this.state.compar == ">=") {
        for (; this.state.dict['cmc'] <= 20; this.state.dict['cmc']++) {
          this._loadCards();
        }
      }
      else {
        this._loadCards()
      }
    })
    if (this.state.isCollapsed === false) {
      this.setState({
        isCollapsed: true,
        collapse_icon: "chevrons-down"
      })
    }
  }

  _loadCards() {
    if (this._dictEmplty()) {
      this.setState({ isLoading: true })
      getCardsFromApiWithSearchedText(this.state.dict, this.page + 1).then(data => {
        var filtered = data.cards.filter((value) => {
          return (this.state.seen.hasOwnProperty(value.name) ? false : (this.state.seen[value.name] = true))
        })

        this.page = + 1
        this.setState({
          Cards: [...this.state.Cards, ...filtered],
          isLoading: false
        })
      })
    }
  }

  _displayDict() {
    for (const [key, value] of Object.entries(this.state.dict)) {
      console.log(key, value);
    }
  }

  _dictEmplty() {
    for (const [key, value] of Object.entries(this.state.dict)) {
      if (value.length != 0) {
        return (true)
      }
    }
    return (false)
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  _searchTextInputChanged(type, text) {
    this.state.dict[type] = text
  }

  _collapsing() {
    if (this.state.isCollapsed === true) {
      this.setState({
        isCollapsed: false,
        collapse_icon: "chevrons-up"
      })
    } else {
      this.setState({
        isCollapsed: true,
        collapse_icon: "chevrons-down"
      })
    }
    console.log(this.state.isCollapsed)
  }

  _displayDetailForCard = (id) => {
    //this.props.navigation.navigate("CardDetail", {idCard: id})
    this.props.navigation.navigate("CardDetail", { idCard: id })
  }

  _setCompar(value) {
    this.setState({ compar: value })
  }

  _handleColors(value) {
    let tmpColor = []
    if (this.state.colorsArray.includes(value))
      this.state.colorsArray = this.state.colorsArray.filter(item => item !== value)
    else
      this.state.colorsArray.push(value)
    console.log(`Colors Array => ${this.state.colorsArray}`)
    tmpColor = this.state.colorsArray
    this.state.dict.colors = tmpColor.join("|")
    this.setState({ colorsArray: this.state.colorsArray })
    console.log(`Colors => ${this.state.dict.colors}`)
    console.log(this.state.sets)
  }

  _setSets() {
    getSets().then(data => {
      this.setState({ sets: data.sets.sort((a, b) => { return new Date(b.releaseDate) - new Date(a.releaseDate) }) })
    })
  }

  _setTypes() {
    getTypes().then(data => {
      this.setState({ types: data.types })
    })
  }

  _getSetsPicker() {
    var pickers = []
    var index = 0
    pickers.push(<Picker.Item key={index++} label="No Set selected" value="" />)
    this.state.sets.forEach(item => pickers.push(<Picker.Item key={index++} label={item.code + ' - ' + item.name} value={item.code} />))
    return (
      <Picker
        style={{ height: 30 }}
        selectedValue={this.state.dict.set}
        onValueChange={(itemValue, itemIndex) => {
          this.state.dict.set = itemValue
          this.setState({ dict: this.state.dict })
        }}
      >
        {pickers}
      </Picker>
    )
  }

  _getTypesPicker() {
    var pickers = []
    var index = 0
    pickers.push(<Picker.Item key={index++} label="No Type selected" value="" />)
    this.state.types.forEach(item => pickers.push(<Picker.Item key={index++} label={item} value={item} />))
    return (
      <Picker
        style={{ height: 30 }}
        selectedValue={this.state.dict.types}
        onValueChange={(itemValue, itemIndex) => {
          this.state.dict.types = itemValue
          this.setState({ dict: this.state.dict })
        }}
      >
        {pickers}
      </Picker>
    )
  }

  _addCard(id) {
    var tmp = this.state.cardSelect
    if (this.state.cardSelect.includes(id))
      tmp.pop(id)
    else
      tmp.push(id)
    this.setState({ cardSelect: tmp })
  }

  _displayAddCollection() {
    if (this.state.selector)
      return (
        <View style={{ alignItems: 'center', backgroundColor: 'transparent' }}>
          <TouchableOpacity style={{
            position: 'absolute',
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.2)',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            width: 200,
            height: 50,
            backgroundColor: '#fff',
            bottom: 10,
          }}>
            <Text>Add to Collection</Text>
          </TouchableOpacity>
        </View>)
  }

  render() {
    return (

      <SafeAreaView style={styles.main_container}>
        <View style={styles.search_container}>
          <View style={{ flexDirection: 'row' }}>
            <TextInput style={styles.text_input_name}
              placeholder={'Name'}
              onChangeText={(text) => this._searchTextInputChanged('name', text)}
              onSubmitEditing={() => this._searchCards()}
            />
            <TouchableOpacity
              onPress={() => this._searchCards()}
              style={{ width: 40, marginRight: 5 }}>
              <Icon
                name='search'
                type='feather'
                color='#141516'
              />
            </TouchableOpacity>
          </View>
          <Collapsible duration={100} collapsed={this.state.isCollapsed}>
            <View style={{ flexDirection: 'row' }}>
              <Slider
                style={styles.slider_input}
                value={this.state.mana}
                onValueChange={(mana) => {
                  this._searchTextInputChanged('cmc', mana.toString())
                  this.setState({ mana })
                }
                }
                maximumValue={20}
                minimumValue={0}
                step={1}
                trackStyle={{ height: 10, backgroundColor: 'transparent' }}
                thumbStyle={{ height: 10, width: 10, backgroundColor: 'black' }}
                allowTouchTrack={true}
              />
              <Text style={[styles.text_input_other, { paddingTop: 5, color: 'gray' }]}>CMC: {this.state.mana}</Text>
            </View>
            <View flexDirection='row' justifyContent="space-evenly" style={{ paddingTop: 10, paddingBottom: 10 }}>
              <TouchableOpacity onPress={() => this._setCompar("<=")}>
                <Icon size={20} type="font-awesome-5" color={this.state.compar == "<=" ? "#141516" : "#888A8C"} name="less-than-equal" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this._setCompar("<")}>
                <Icon size={20} type="font-awesome-5" color={this.state.compar == "<" ? "#141516" : "#888A8C"} name="less-than" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this._setCompar("=")}>
                <Icon size={20} type="font-awesome-5" color={this.state.compar == "=" ? "#141516" : "#888A8C"} name="equals" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this._setCompar(">=")}>
                <Icon size={20} type="font-awesome-5" color={this.state.compar == ">=" ? "#141516" : "#888A8C"} name="greater-than-equal" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this._setCompar(">")}>
                <Icon size={20} type="font-awesome-5" color={this.state.compar == ">" ? "#141516" : "#888A8C"} name="greater-than" />
              </TouchableOpacity>
            </View>
            <View flexDirection="row" justifyContent="space-evenly">
              <View style={{ borderColor: this.state.colorsArray.includes("white") ? "#141516" : "#888A8C", borderRadius: 100, borderWidth: 2 }}>
                <TouchableOpacity onPress={() => this._handleColors("white")}>
                  <Image source={{ uri: "https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/8/8e/W.svg/revision/latest/scale-to-width-down/100?cb=20160125094923" }} style={{ width: 20, height: 20 }} />
                </TouchableOpacity>
              </View>
              <View style={{ borderColor: this.state.colorsArray.includes("blue") ? "#141516" : "#888A8C", borderRadius: 100, borderWidth: 2 }}>
                <TouchableOpacity onPress={() => this._handleColors("blue")}>
                  <Image source={{ uri: "https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/9/9f/U.svg/revision/latest/scale-to-width-down/100?cb=20160121092256" }} style={{ width: 20, height: 20 }} />
                </TouchableOpacity>
              </View>
              <View style={{ borderColor: this.state.colorsArray.includes("black") ? "#141516" : "#888A8C", borderRadius: 100, borderWidth: 2 }}>
                <TouchableOpacity onPress={() => this._handleColors("black")}>
                  <Image source={{ uri: "https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/2/2f/B.svg/revision/latest/scale-to-width-down/100?cb=20160125093423" }} style={{ width: 20, height: 20 }} />
                </TouchableOpacity>
              </View>
              <View style={{ borderColor: this.state.colorsArray.includes("red") ? "#141516" : "#888A8C", borderRadius: 100, borderWidth: 2 }}>
                <TouchableOpacity onPress={() => this._handleColors("red")}>
                  <Image source={{ uri: "https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/8/87/R.svg/revision/latest/scale-to-width-down/100?cb=20160125094913" }} style={{ width: 20, height: 20 }} />
                </TouchableOpacity>
              </View>
              <View style={{ borderColor: this.state.colorsArray.includes("green") ? "#141516" : "#888A8C", borderRadius: 100, borderWidth: 2 }}>
                <TouchableOpacity onPress={() => this._handleColors("green")}>
                  <Image source={{ uri: "https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/8/88/G.svg/revision/latest/scale-to-width-down/100?cb=20160125094907" }} style={{ width: 20, height: 20 }} />
                </TouchableOpacity>
              </View>
            </View>
            {this._getTypesPicker()}
            {this._getSetsPicker()}

          </Collapsible>

          <TouchableOpacity onPress={() => this._collapsing()}>
            <Icon
              name={this.state.collapse_icon}
              type='feather'
              color='#141516' />
          </TouchableOpacity>
        </View>

        <FlatList
          data={this.state.Cards}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) =>
            <View style={styles.main_container}>
              <TouchableOpacity
                style={{ margin: 5, overflow: "hidden", borderRadius: 7, borderWidth: 3, borderColor: this.state.selector ? this.state.cardSelect.includes(item.id.toString()) ? "red" : "green" : "#FFFFFF" }}
                onLongPress={() => this.setState({ selector: !this.state.selector })}
                onPress={() => {
                  if (!this.state.selector)
                    this._displayDetailForCard(item.id.toString())
                  else
                    this._addCard(item.id.toString())
                }}>
                <Image
                  style={styles.image}
                  source={{ uri: item.imageUrl }}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
            </View>
          }
          onEndReachedThreshold={0.5}
          numColumns={2}
          onEndReached={() => {
            if (this.state.Cards.length % 100 === 0 && this.state.Cards.length < 1000) {
              this._loadCards()
            }
          }}
        />
        {this._displayLoading()}
        {this._displayAddCollection()}
      </SafeAreaView>
    )
  }
}

export default Search