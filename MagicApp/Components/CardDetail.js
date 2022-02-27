// Components/FilmDetail.js

import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity } from 'react-native'
import { getCardUuidFromApi } from '../API/MTGApi'
import { connect } from 'react-redux'

class CardDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      card: undefined,
      isLoading: true
    }
  }

  componentDidMount() {
    console.log(this.props)
    getCardUuidFromApi(this.props.route.params.idCard).then(data => {
      this.setState({
        card: data,
        isLoading: false
      })
    })
  }

  componentDidUpdate() {
      console.log(this.state.card)
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


  _displayCard() {
    if (this.state.card !== undefined) {
        const card = this.state.card.cards[0]
        return (
            <ScrollView style={styles.scrollview_container}>
                <Image
                    style={styles.image}
                    source={{uri: card.imageUrl}}
                />
                <Text>{card.type}</Text>
                <Text>{card.text}</Text>
            </ScrollView>
        )
        }
    }

  render() {
    return (
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayCard()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollview_container: {
    flex: 1
  },
  image: {
    height: 169,
    margin: 5
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center'
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
  favorite_container: {
      alignItems: 'center'
  },
  favorite_img: {
      width: 40,
      height: 40
  }
})

export default CardDetail