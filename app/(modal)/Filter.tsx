import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
  Button,
  Animated,
} from "react-native";
import React, { useState, useEffect } from "react";
import Colors from "../../constants/Colors";
import { useNavigation } from "expo-router";
import filter from "../../assets/data/filter.json";
import { Ionicons } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useAnimatedStyle, useSharedValue } from "react-native-reanimated";

// import { categories } from "../../assets/data/home";

interface CategoryFilter {
  name: string;
  count: number;
  checked?: boolean;
}

const ItemBox = () => (
  <>
    <View style={styles.ItemContainer}>
      <TouchableOpacity style={styles.item}>
        <Ionicons name="arrow-down" size={20} color={Colors.medium} />
        <Text style={{ flex: 1 }}>Sort</Text>
        <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Ionicons name="fast-food-outline" size={20} color={Colors.medium} />
        <Text style={{ flex: 1 }}>Hygiene Rating</Text>
        <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Ionicons name="nutrition-outline" size={20} color={Colors.medium} />
        <Text style={{ flex: 1 }}>Offers</Text>
        <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Ionicons name="pricetag" size={20} color={Colors.medium} />
        <Text style={{ flex: 1 }}>Dietary</Text>
        <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
      </TouchableOpacity>
    </View>
    <Text style={styles.header}>Cartegories</Text>
  </>
);

export default function Filter() {
  const navigation = useNavigation();
  const [Categoryitems, setCategoryItems] = useState<CategoryFilter[]>(filter);
  const [SelectedCategories, setSelectedCategories] = useState<
    CategoryFilter[]
  >([]);
  const flexWidth = useSharedValue(0);
  // const animatedStyle = useAnimatedStyle(() => {
  //   return {
  //     width: flexWidth.value,
  //   };
  // });

  useEffect(() => {
    const hasSelected = SelectedCategories.length > 0;
    const selectedItems = Categoryitems.filter((item) => item.checked);
    {
      /*We have a big list of things called "Categoryitems."
     We want to make a new list, which we call "selectedItems."
     In the new list, we only want to put the things (items) that have a special mark called "checked" set to "true."*/
    }
    const newSelected = selectedItems.length > 0;
    // newSelected checks whether there are newly selected items by evaluating if the length of selectedItems is greater than 0.

    if (hasSelected !== newSelected) {
      console.log("Has changed");
      // A condition that checks if hasSelected and newSelected values are not the same. If they're different, it logs "Has changed."
      // flexWidth.value = newSelected ? 150 : 0;
    }
    setSelectedCategories(selectedItems);
  }, [Categoryitems]);

  //clear all
  const handleClearAll = () => {
    const updatedCategoryItems = Categoryitems.map((item) => {
      item.checked = false;

      return item;
    });
    setCategoryItems(updatedCategoryItems);
  };

  const renderItem: ListRenderItem<CategoryFilter> = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={styles.itemText}>
        {item.name} ({item.count})
      </Text>
      <BouncyCheckbox
        size={25}
        fillColor={Colors.primary}
        unfillColor="#FFFFFF"
        iconStyle={{ borderColor: "#20e1b2" }}
        innerIconStyle={{ borderWidth: 2 }}
        disableBuiltInState
        onPress={() => {
          const isChecked = Categoryitems[index].checked;
          const updatedItems = Categoryitems.map((item) => {
            if (item.name === Categoryitems[index].name) {
              item.checked = !isChecked;
            }
            return item;
          });
          setCategoryItems(updatedItems);
        }}
        isChecked={Categoryitems[index].checked}
      />
    </View>
  );
  return (
    <View style={styles.container}>
      {/* <Button title="clear all" onPress={handleClearAll} /> */}
      <FlatList
        // data={filter}
        data={Categoryitems}
        renderItem={renderItem}
        ListHeaderComponent={<ItemBox />}
      />
      <View style={styles.footer}>
        <View style={styles.btnContainer}>
          {/* <Animated.View style={[animatedStyle, styles.outlineButton]}> */}
          <TouchableOpacity
            style={styles.outlineButton}
            onPress={handleClearAll}
          >
            <Text style={styles.outlineButtonText}>Clear all</Text>
          </TouchableOpacity>
          {/* </Animated.View> */}

          <TouchableOpacity
            style={styles.fullButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.footerText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightGrey,
    // backgroundColor: Colors.primary,
    flex: 1,
    padding: 24,
  },
  footer: {
    position: "absolute",
    // backgroundColor: Colors.medium,
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    padding: 10,
    // elevation: 10,
    // shadowColor: "#000",
    // shadowOpacity: 0.5,
    // shadowRadius: 10,
  },
  fullButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    alignItems: "center",
    borderRadius: 8,
  },
  footerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  ItemContainer: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
  },
  item: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderColor: Colors.grey,
    borderBottomWidth: 1,
  },
  itemText: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
  },
  btnContainer: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
  },
  outlineButtonText: {
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 16,
  },
  outlineButton: {
    borderColor: Colors.primary,
    borderWidth: 0.5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
});
