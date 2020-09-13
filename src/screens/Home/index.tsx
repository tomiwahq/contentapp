import React, { useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Button,
    Alert,
    ScrollView,
    Image,
    SafeAreaView,
    TouchableOpacity,
    Animated,
    Platform,
    StatusBar,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import Card from "../../components/Card";
import { CategoryPill } from "../../components/CategoryPill";
import Card2 from "../../components/Card2";
import Menu from "../../components/Menu";
import { MENU } from "../../components/Menu/constants";
import { openMenuAction } from "../../components/Menu/actions";
import { openLoginAction } from "../../components/Login/actions";
import {
    getPopularPostsAction,
    getLatestPostsAction,
} from "../../components/Posts/actions";
import Login from "../../components/Login";

const scale = new Animated.Value(1);
const opacity = new Animated.Value(1);

export default function Home({ navigation }) {
    const menu = useSelector((store: any) => store.menu);
    const login = useSelector((store: any) => store.login);
    const posts = useSelector((store: any) => store.posts);
    const application = useSelector((store: any) => store.application);
    const dispatch = useDispatch();
    const openMenu = () => dispatch(openMenuAction());
    const openLogin = () => dispatch(openLoginAction());
    const getPopularPosts = () => dispatch(getPopularPostsAction());
    const getLatestPosts = () => dispatch(getLatestPostsAction());

    useEffect(() => {
        StatusBar.setBarStyle("dark-content", true);

        if (Platform.OS == "android") {
            StatusBar.setBarStyle("light-content", true);
        }
        getPopularPosts();
        getLatestPosts();
    }, []);

    useEffect(() => {
        toggleMenu();
    }, [menu.action]);

    const toggleMenu = () => {
        if (menu.action == MENU.OPEN) {
            Animated.timing(scale, {
                toValue: 0.9,
                duration: 300,
                // easing: Easing.in()
            }).start();
            Animated.spring(opacity, {
                toValue: 0.5,
            }).start();
            StatusBar.setBarStyle("light-content", true);
        }

        if (menu.action == MENU.CLOSE) {
            Animated.timing(scale, {
                toValue: 1,
                duration: 300,
                // easing: Easing.in()
            }).start();
            Animated.spring(opacity, {
                toValue: 1,
            }).start();
            StatusBar.setBarStyle("dark-content", true);
            if (Platform.OS == "android") {
                StatusBar.setBarStyle("light-content", true);
            }
        }
    };
    let categories;
    if (application.gettingCategories) {
        categories = <CategoryPill text="Loading categories..." />;
    } else {
        if (
            !Array.isArray(application.categories) ||
            !application.categories.length ||
            application.getCategoriesError !== ""
        ) {
            categories = <CategoryPill text="Error loading categories" />;
        } else {
            categories = application.categories.map((category, index) => (
                <CategoryPill
                    key={category.category_id}
                    image={category.image}
                    text={category.name}
                />
            ));
        }
    }

    let popularPosts;
    if (posts.gettingPopularPosts) {
        popularPosts = (
            <Card
                title="Loading popular posts..."
                caption="If you get to read this"
                subtitle="Then your network is slow"
            />
        );
    } else {
        if (
            !Array.isArray(posts.popularPosts) ||
            !posts.popularPosts.length ||
            posts.getPopularPostsError !== ""
        ) {
            popularPosts = (
                <Card
                    title="Error loading popular posts"
                    caption="An error has occurred"
                    subtitle="Please restart the application"
                />
            );
        } else {
            popularPosts = posts.popularPosts.map((popularPost, index) => (
                <TouchableOpacity
                    key={popularPost.post_id}
                    onPress={() =>
                        navigation.push("Post", {
                            post: popularPost,
                        })
                    }
                >
                    <Card
                        title={popularPost.title}
                        image={popularPost.image}
                        logo={popularPost.categoryImage}
                        caption={`${index + 1} of ${
                            posts.popularPosts.length
                        } Posts`}
                        subtitle={popularPost.categoryName}
                    />
                </TouchableOpacity>
            ));
        }
    }

    let latestPosts;
    if (posts.gettingLatestPosts) {
        latestPosts = (
            <Card2
                title="Loading latest posts..."
                caption="If you get to read this"
                subtitle="Then your network is slow"
            />
        );
    } else {
        if (
            !Array.isArray(posts.latestPosts) ||
            !posts.latestPosts.length ||
            posts.getLatestPostsError !== ""
        ) {
            latestPosts = (
                <Card2
                    title="Error loading latest posts"
                    caption="An error has occurred"
                    subtitle="Please restart the application"
                />
            );
        } else {
            latestPosts = posts.latestPosts.map((card2, index) => (
                <Card2
                    key={card2.post_id}
                    image={card2.image}
                    title={card2.title}
                    subtitle={card2.categoryName}
                    logo={card2.categoryImage}
                    author="Tomiwa Ibiwoye"
                    avatar={require("../../../assets/avatar.jpg")}
                    caption={card2.categoryName}
                />
            ));
        }
    }

    return (
        <View style={styles.rootView}>
            <Menu />
            <Animated.View
                style={[
                    styles.container,
                    {
                        transform: [
                            {
                                scale: scale,
                            },
                        ],
                        opacity: opacity,
                    },
                ]}
            >
                <SafeAreaView>
                    <ScrollView>
                        <View style={styles.titleBar}>
                            <TouchableOpacity
                                onPress={openMenu}
                                style={{
                                    marginLeft: 20,
                                }}
                            >
                                <Image
                                    style={styles.avatar}
                                    source={
                                        application.user.photo == undefined
                                            ? require("../../../assets/avatar-default.jpg")
                                            : { uri: application.user.photo }
                                    }
                                />
                            </TouchableOpacity>
                            <View
                                style={{
                                    marginLeft: 20,
                                }}
                            >
                                <Text style={styles.title}>Welcome back,</Text>
                                <Text style={styles.name}>
                                    {application.user.name == undefined
                                        ? "Loading..."
                                        : `${application.user.name} ${application.user.surname}`}
                                </Text>
                            </View>
                            <Ionicons
                                name="ios-notifications"
                                size={32}
                                color="#4775f2"
                                style={{
                                    position: "absolute",
                                    right: 20,
                                    top: 5,
                                }}
                            />
                        </View>
                        <ScrollView
                            style={{ flexDirection: "row", paddingLeft: 12 }}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        >
                            {categories}
                        </ScrollView>
                        <Text style={styles.subtitle}>Popular Posts</Text>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            style={{ paddingLeft: 10 }}
                        >
                            {popularPosts}
                        </ScrollView>
                        <Text style={styles.subtitle}>Latest Posts</Text>
                        <View style={styles.card2Container}>{latestPosts}</View>
                    </ScrollView>
                </SafeAreaView>
            </Animated.View>
            <Login />
        </View>
    );
}

const styles = StyleSheet.create({
    rootView: {
        flex: 1,
        backgroundColor: "#000000",
    },

    container: {
        flex: 1,
        backgroundColor: "#f0f3f5",
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
    },

    title: {
        fontSize: 14,
        color: "#b8bece",
    },

    name: {
        fontSize: 18,
        color: "#3c4560",
        fontWeight: "bold",
    },

    titleBar: {
        width: "100%",
        marginTop: 50,
        flexDirection: "row",
    },

    subtitle: {
        color: "#b8bece",
        fontWeight: "600",
        fontSize: 15,
        marginLeft: 20,
        textTransform: "uppercase",
    },

    avatar: {
        width: 44,
        height: 44,
        backgroundColor: "#555555",
        borderRadius: 22,
    },

    card2Container: {
        flexDirection: "row",
        flexWrap: "wrap",
        paddingHorizontal: 10,
    },
});
