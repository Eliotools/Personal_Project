import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { styles } from './Styles'

class CardItem extends React.Component {
  render() {
    const { card, displayDetailForCard} = this.props

    return (
      <View style={styles.main_container}>
        <TouchableOpacity style={styles.main_container} onPress={() => displayDetailForCard(card.id)}>
        <Image
          style={styles.image}
          source={{uri: card.imageUrl}}
          resizeMode={'contain'}
        />
       </TouchableOpacity>
      </View>
    )
  }
}

export default CardItem