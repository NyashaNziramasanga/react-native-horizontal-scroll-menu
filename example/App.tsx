import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import HorizontalScrollMenu, { RouteProps } from '@nyashanziramasanga/react-native-horizontal-scroll-menu/src';

export default function App() {
  const [selectedIndex, setSelectedIndex] = useState(1);

  const NavigationTabs = [
    {
      id: 0,
      name: 'Tab1',
    },
    {
      id: 1,
      name: 'Tab2',
    },
    {
      id: 2,
      name: 'Tab3',
    },
    {
      id: 3,
      name: 'Tab4',
    },
    {
      id: 4,
      name: 'Tab5',
    },
  ];

  const onPress = (route: RouteProps) => {
    setSelectedIndex(route.id);
    console.log('Tab pressed', route);
  };

  return (
    <View style={styles.container}>
      <HorizontalScrollMenu
        items={NavigationTabs}
        onPress={onPress}
        selected={selectedIndex}
        buttonStyle={styles.buttonStyle}
        itemWidth={80}
        scrollAreaStyle={{ height: 50 }}
      />

      <Text style={styles.text}>TabName: {NavigationTabs[selectedIndex].name}</Text>
      <Text style={styles.text}>TabIndex: {selectedIndex}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    margin: 0,
    borderWidth: 0,
  },
  text: {
    fontSize: 30,
    margin: 15,
  },
});
