import { Pressable } from "react-native";
import Text from "./Text";

const AppBarTab = ({ tabName }) => {
  return (
    <Pressable>
      <Text color="textLight" fontWeight="bold">
        {tabName}
      </Text>
    </Pressable>
  );
};

export default AppBarTab;
