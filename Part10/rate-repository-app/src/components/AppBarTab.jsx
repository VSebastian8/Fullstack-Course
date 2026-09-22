import { Pressable } from "react-native";
import { Link } from "react-router-native";
import Text from "./Text";

const AppBarTab = ({ tabName, path }) => {
  return (
    <Pressable>
      <Link to={path}>
        <Text color="textLight" fontWeight="bold">
          {tabName}
        </Text>
      </Link>
    </Pressable>
  );
};

export default AppBarTab;
