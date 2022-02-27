import React from 'react'
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native'

const win = Dimensions.get('screen')

const ratio = win.width / 223

class FilmItem extends React.Component {
  render() {
    const card = this.props.deck
    return (
      <View style={styles.main_container}>
      <Image
        style={styles.image}
        source={{uri: card.imageUrl}}
        resizeMode={'contain'}
      />
      {/*<View style={styles.content_container}>
        <View style={styles.header_container}>
          <Text style={styles.title_text}>{card.name}</Text>
        </View>
        <View style={styles.description_container}>
          <Text style={styles.description_text} numberOfLines={6}>{card.originalText}</Text>
          </View>
          <View style={styles.date_container}>
          {card.types == 'Creature' ? <Text style={styles.date_text}>{card.power}/{card.toughness}</Text>:null}
          </View>
          <View style={styles.date_container}>
          <Text style={styles.date_text}>{card.number}</Text>
          </View>
    </View>*/}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flexDirection: 'row'
  },
  image: {
    width: win.width / 2 - 10,
    height: (310 * ratio) / 2 - 15,
    borderRadius: 9.7,
    margin: 5,
    backgroundColor: 'yellow'
  },
  content_container: {
    flex: 1,
    margin: 5
  },
  header_container: {
    flex: 3,
    flexDirection: 'row'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5
  },
  vote_text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#666666'
  },
  description_container: {
    flex: 7
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666'
  },
  date_container: {
    flex: 2
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14
  }
})

export default FilmItem