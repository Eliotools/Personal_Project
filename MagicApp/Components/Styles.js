import { Dimensions, StyleSheet } from 'react-native'
import Constants from 'expo-constants';

const win = Dimensions.get('screen')

const ratio = win.width / 223

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    search_container: {
        paddingTop: 20,
        backgroundColor: '#9EA2A5',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    slider_input: {
        width: '80%',
        height: 30,
        paddingLeft: 5,
        marginLeft: 5
    },
    text_input_name: {
        width: '90%',
        marginLeft: 5,
        height: 30,
        paddingLeft: 5,
        color: 'black'
    },
    text_input_other: {
        marginLeft: 5,
        marginRight: 5,
        height: 30,
        paddingLeft: 5
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: win.width / 2 - 10,
        height: (310 * ratio) / 2 - 15,
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

  export { styles }