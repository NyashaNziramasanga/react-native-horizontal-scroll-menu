import React, { useState, useEffect, useRef } from 'react';
import { LayoutRectangle, LayoutChangeEvent, Dimensions } from 'react-native';
import { Pressable, ScrollView, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export type RouteProps = {
  id: number;
  name: string;
};

export type NavigationTabsProps = {
  id: number;
  name: string;
};

export type HorizontalScrollMenu = {
  items: Array<NavigationTabsProps>;
  onPress: (route: RouteProps) => void;
  upperCase?: boolean;
  textStyle?: StyleProp<TextStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  activeTextColor?: string;
  activeBackgroundColor?: string;
  selected: number;
  scrollAreaStyle?: StyleProp<ViewStyle>;
  keyboardShouldPersistTaps?: boolean | 'always' | 'never' | 'handled';
  itemWidth?: number;
  centerPadding?: number;
};

const HorizontalScrollMenu: React.FC<HorizontalScrollMenu> = ({
  items,
  onPress,
  upperCase = false,
  textStyle,
  buttonStyle,
  activeTextColor = '#ffffff',
  activeBackgroundColor = '#000000',
  selected = 0,
  scrollAreaStyle,
  keyboardShouldPersistTaps = 'always',
  itemWidth = 100,
  centerPadding = screenWidth / 2 - itemWidth / 2
}) => {
  const [index, setIndex] = useState<number>(selected);
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

  return (
    <View style={[styles.scrollAreaStyle, scrollAreaStyle]}>
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
  contentContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollAreaStyle: {
    height: 50,
  },
});

export default HorizontalScrollMenu;
