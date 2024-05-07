import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "react-native-paper";

const DemoTheme = () => {
    const theme = useTheme();
    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.primary }}>
            <Text style={{ color: theme.colors.onPrimary }}>Hello!</Text>
        </View>
    );
};

export default DemoTheme;