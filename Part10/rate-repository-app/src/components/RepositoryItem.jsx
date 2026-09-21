import { View, Image, StyleSheet } from "react-native";
import Text from "./Text";
import Badge from "./Badge";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 5,
  },
  infoContainer: {
    flex: 1,
  },
  horizontalContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 10,
    flexGrow: 0,
    alignSelf: "flex-start",
    marginRight: 10,
  },
  tag: {
    borderRadius: 6,
    padding: 3,
    backgroundColor: theme.colors.primary,
    alignSelf: "flex-start",
  },
});

const RepositoryItem = ({
  fullName,
  description,
  language,
  stargazersCount,
  forksCount,
  reviewCount,
  ratingAverage,
  ownerAvatarUrl,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.horizontalContainer}>
        <Image style={styles.avatar} source={{ uri: ownerAvatarUrl }}></Image>
        <View style={styles.infoContainer}>
          <Text color="textPrimary" fontWeight="bold" fontSize="subheading">
            {fullName}
          </Text>
          <Text color="textSecondary">{description}</Text>
          <View style={styles.tag}>
            <Text color="textLight">{language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.horizontalContainer}>
        <Badge count={stargazersCount} typ="Stars" />
        <Badge count={forksCount} typ="Forks" />
        <Badge count={reviewCount} typ="Reviews" />
        <Badge count={ratingAverage} typ="Rating" />
      </View>
    </View>
  );
};

export default RepositoryItem;
