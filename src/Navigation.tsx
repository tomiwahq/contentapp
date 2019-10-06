import React from "react";
import { createAppContainer } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";

import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import Home from "./screens/Home";
import Courses from "./screens/Courses";
import Projects from "./screens/Projects";
import Section from "./screens/Section";

const activeColor = "#4775f2";
const inactiveColor = "#b8bece";

const HomeStack = createStackNavigator(
    {
        Home: {
            screen: Home,
        },
        Section: {
            screen: Section,
        },
    },
    {
        headerMode: "none",
    }
);

const CoursesStack = createStackNavigator(
    {
        Courses: {
            screen: Courses,
        },
    },
    {
        headerMode: "none",
    }
);

const ProjectStack = createStackNavigator(
    {
        Projects: {
            screen: Projects,
        },
    },
    {
        headerMode: "none",
    }
);

const TabNavigator = createBottomTabNavigator({
    HomeStack: {
        screen: HomeStack,
        navigationOptions: ({ navigation }) => {
            let tabBarVisible = true;

            const routeName =
                navigation.state.routes[navigation.state.index].routeName;
            if (routeName == "Section") {
                tabBarVisible = false;
            }

            return {
                tabBarVisible,
                tabBarLabel: "Home",
                tabBarIcon: ({ focused }) => (
                    <Ionicons
                        name="ios-home"
                        size={26}
                        color={focused ? activeColor : inactiveColor}
                    />
                ),
            };
        },
    },
    CoursesStack: {
        screen: CoursesStack,
        navigationOptions: {
            tabBarLabel: "Courses",
            tabBarIcon: ({ focused }) => (
                <Ionicons
                    name="ios-albums"
                    size={26}
                    color={focused ? activeColor : inactiveColor}
                />
            ),
        },
    },
    ProjectStack: {
        screen: ProjectStack,
        navigationOptions: {
            tabBarLabel: "Projects",
            tabBarIcon: ({ focused }) => (
                <Ionicons
                    name="ios-folder"
                    size={26}
                    color={focused ? activeColor : inactiveColor}
                />
            ),
        },
    },
});
const RNFD = createAppContainer(TabNavigator);

export default RNFD;
