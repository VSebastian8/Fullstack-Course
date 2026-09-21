import { View, StyleSheet } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  badgeContainer: {
    alignItems: "center",
  },
});

const Badge = ({ count, typ }) => {
  let countK = (count / 1000).toFixed(1);
  return (
    <View style={styles.badgeContainer}>
      <Text>{count >= 1000 ? `${countK}k` : count}</Text>
      <Text color="textSecondary">{typ}</Text>
    </View>
  );
};

export default Badge;
