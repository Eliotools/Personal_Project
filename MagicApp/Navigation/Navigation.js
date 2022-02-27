import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import CardDetail from '../Components/CardDetail'
import Search from '../Components/Search'

const SearchStackNavigator = createStackNavigator({
    Search: {
        screen: Search,
        navigationOptions: {
            title: "Rechercher"
        }
    },
    CardDetail: {
        screen: CardDetail
    }
})

export default createAppContainer(SearchStackNavigator)