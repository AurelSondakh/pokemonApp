import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StatusBar, Image } from 'react-native';
import { TabView } from 'react-native-tab-view';
import FavoritesScreen from '../Components/FavoritesScreen';
import ExploreScreen from '../Components/ExploreScreen';
import { useNavigation } from '@react-navigation/native';

const HomePage = () => {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'explore', title: 'Explore' },
    { key: 'favorites', title: 'Favorites' },
  ]);

  const TabBarComponent = (props) => {
    return (
      <View style={{
        flexDirection: 'row',
        backgroundColor: '#273D71',
        paddingBottom: 1,
        paddingHorizontal: 25,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20
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
                borderBottomColor: index === i ? '#FFF' : '#273D71'
              }}
              onPress={() => {
                setIndex(i)
              }}>
              <Text style={{ color: index === i ? '#FFF' : '#80838C', fontFamily: 'Poppins-Medium' }}>{route.title}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
        if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor('#273D71');
        }
        StatusBar.setBarStyle('light-content');
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <>
      <View style={{ backgroundColor: '#273D71', alignItems: 'center', paddingVertical: 15 }}>
        <Image style={{ width: 350, height: 100, resizeMode: 'contain' }} source={require('../Assets/Images/pokemon_logo.png')} />
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={({ route }) => {
          switch (route.key) {
            case 'explore':
              return <ExploreScreen />;
            case 'favorites':
              return <FavoritesScreen />;
            default: return null;
          }
        } }
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('screen').width, height: Dimensions.get('screen').height }}
        renderTabBar={TabBarComponent} />
    </>
  );
};

export default HomePage;
