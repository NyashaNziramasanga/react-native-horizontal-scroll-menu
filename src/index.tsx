import React, { useState, useEffect, useRef } from 'react';
import { LayoutRectangle, LayoutChangeEvent, Dimensions } from 'react-native';
import { Pressable, ScrollView, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

const screenWidth = Dimensions.get('window').width;

type routeProps = {
  id: number;
  name: string;
};

type NavigationTabsProps = {
  id: number;
  name: string;
};

type HorizontalScrollMenu = {
  items: Array<NavigationTabsProps>;
  onPress: (route: routeProps) => void;
  upperCase?: boolean;
  textStyle?: StyleProp<TextStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  activeTextColor?: string;
  activeBackgroundColor?: string;
  selected: number;
  containerStyle?: object;
  keyboardShouldPersistTaps?: boolean | 'always' | 'never' | 'handled';
  itemWidth?: number;
};

const HorizontalScrollMenu: React.FC<HorizontalScrollMenu> = ({
  items,
  onPress,
  upperCase = false,
  textStyle,
  buttonStyle,
  activeTextColor = '#006EFD',
  activeBackgroundColor = '#000000',
  selected = 0,
  containerStyle: scrollAreaStyle = {},
  keyboardShouldPersistTaps = 'always',
  itemWidth = 100,
}) => {
  const [index, setIndex] = useState<number>();
  const [cords, setCords] = useState<LayoutRectangle>();

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (selected != index) {
      setIndex(selected);
      scrollToPosition();
    }

    if (selected) {
      setIndex(selected);
      scrollToPosition();
    }
  }, [selected]);

  const scrollToDefaultIndex = () => {
    let x = itemWidth * selected;
    if (scrollViewRef.current !== null) {
      scrollViewRef.current.scrollTo({
        x: x,
        y: 0,
        animated: true,
      });
    }
  };

  const scrollToPosition = () => {
    let x = itemWidth * selected;
    if (cords !== undefined && scrollViewRef.current !== null) {
      scrollViewRef.current.scrollTo({
        x: x,
        y: 0,
        animated: true,
      });
    }
  };

  const onLayoutScrollView = (event: LayoutChangeEvent) => {
    const layout = event.nativeEvent.layout;

    setTimeout(scrollToDefaultIndex, 0);
    setCords(layout);
  };

  const centerPadding = screenWidth / 2 - itemWidth / 2;

  return (
    <View style={scrollAreaStyle}>
      <ScrollView
        ref={scrollViewRef}
        bounces={true}
        horizontal={true}
        pagingEnabled={false}
        contentContainerStyle={[styles.contentContainerStyle, { paddingHorizontal: centerPadding }]}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={200}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      >
        {items.map((route, i) => (
          <Pressable
            style={[
              styles.tabItem,
              { width: itemWidth },
              index === route.id && styles.tabItemFocused,
              buttonStyle ? buttonStyle : styles.buttonStyles,
              index === route.id && activeBackgroundColor ? { backgroundColor: activeBackgroundColor } : false,
            ]}
            key={(route.id ? route.id : i).toString()}
            onPress={() => {
              scrollToPosition();
              return onPress(route);
            }}
            onLayout={onLayoutScrollView}
          >
            <Text
              style={[
                textStyle ? textStyle : styles.tabItemText,
                index == route.id && styles.tabItemTextFocused,
                index == route.id && activeTextColor ? { color: activeTextColor } : false,
              ]}
            >
              {upperCase ? route.name.toUpperCase() : route.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  tabItem: {
    borderRadius: 10,
    borderColor: '#E4E4E4',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  tabItemText: {
    color: '#8C8C8C',
  },
  tabItemFocused: {
    borderWidth: 0,
  },
  tabItemTextFocused: {
    color: '#FFFFFF',
  },
  buttonStyles: {
    marginRight: 10,
  },
  contentContainerStyle: { alignItems: 'center', justifyContent: 'center' },
});

export default HorizontalScrollMenu;
