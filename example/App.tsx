import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import HorizontalScrollMenu from 'react-native-horizontal-scroll-menu';

export default function App() {
  const [selected, setSelected] = useState(1);

  type routeProps = {
    id: number;
    name: string;
  };

  const NavigationTabs = [
    {
      id: 0,
      name: 'menu1',
    },
    {
      id: 1,
      name: 'menu2',
    },
    {
      id: 2,
      name: 'menu3',
    },
    {
      id: 3,
      name: 'menu4',
    },
    {
      id: 4,
      name: 'menu5',
    },
  ];

  const onPress = (route: routeProps) => {
    setSelected(route.id);
    console.log('Tab pressed', route.id);
  };

  return (
    <View style={styles.container}>
      <HorizontalScrollMenu
        items={NavigationTabs}
        onPress={onPress}
        selected={selected}
        buttonStyle={styles.buttonStyle}
        // activeBackgroundColor={''}
        // textStyle={themeTextStyle}
        itemWidth={80}
      />
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
});
