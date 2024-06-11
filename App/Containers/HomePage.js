import React, { useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { TabView } from 'react-native-tab-view';
import FavoritesScreen from '../Components/FavoritesScreen';
import ExploreScreen from '../Components/ExploreScreen';

const HomePage = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'explore', title: 'Explore' },
    { key: 'favorites', title: 'Favorites' },
  ]);

  const TabBarComponent = (props) => {
    return (
      <View style={{
        flexDirection: 'row'
      }}>
        {props.navigationState.routes.map((route, i) => {
          return (
            <TouchableOpacity
              key={`index-tabbar-${i}`}
              style={{
                flex: 1,
                alignItems: 'center',
                padding: 14,
                borderBottomWidth: 3,
                borderBottomColor: index === i ? '#F26A24' : '#E2E4E7'
              }}
              onPress={() => {
                setIndex(i)
              }}>
              <Text style={{ color: index === i ? '#F26A24' : '#80838C', fontFamily: 'Poppins-Medium' }}>{route.title}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={({ route }) => {
        switch (route.key) {
          case 'explore':
            return <ExploreScreen />
          case 'favorites':
            return <FavoritesScreen />
          default: return null
        }
      }}
      onIndexChange={setIndex}
      initialLayout={{ width: Dimensions.get('screen').width, height: Dimensions.get('screen').height }}
      renderTabBar={TabBarComponent}
    />
  );
};

export default HomePage;
