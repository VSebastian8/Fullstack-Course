import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.tabBar,
    paddingBottom: 7,
    paddingLeft: 7,
  },
  scroll: {
    gap: 10,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scroll}>
        <AppBarTab tabName="Repositories" path="/" />
        <AppBarTab tabName="Sign in" path="/signin" />
      </ScrollView>
    </View>
  );
};

export default AppBar;
