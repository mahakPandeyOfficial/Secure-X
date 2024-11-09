import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import Buttons from "../components/Buttons";
import { useNavigation } from '@react-navigation/native';
import { SignIn, useSignIn } from '@clerk/clerk-react';  // Clerk imports

const Login = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, isLoaded } = useSignIn();  // Clerk hook for signing in
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signIn.create({
        identifier: email,
        password: password,
      });
      // Redirect or handle successful login
      console.log("User signed in!");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View style={{ marginVertical: 22 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              marginVertical: 12,
              color: COLORS.black,
            }}
          >
            SecureX - Your safety platform
          </Text>

          <Text
            style={{
              fontSize: 16,
              color: COLORS.black,
            }}
          >
            Welcome back again!!!
          </Text>
        </View>

        {/** Email Address */}
        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}
          >
            Email address
          </Text>

          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="Enter your email address"
              placeholderTextColor={COLORS.black}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              style={{
                width: "100%",
              }}
            />
          </View>
        </View>

        {/** Password */}
        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 400,
              marginVertical: 8,
            }}
          >
            Password
          </Text>

          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor={COLORS.black}
              secureTextEntry={!isPasswordShown}
              value={password}
              onChangeText={setPassword}
              style={{
                width: "100%",
              }}
            />

            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={{
                position: "absolute",
                right: 12,
              }}
            >
              {isPasswordShown ? (
                <Ionicons name="eye-off" size={24} color={COLORS.black} />
              ) : (
                <Ionicons name="eye" size={24} color={COLORS.black} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/** Check Box */}
        <View style={{ flexDirection: 'row', marginVertical: 6 }}>
          <Checkbox
            style={{ marginRight: 8 }}
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? COLORS.primary : undefined}
          />
          <Text>Remember Me</Text>
        </View>

        <Buttons
          title="Login"
          filled
          textColor={COLORS.white}
          onPress={handleLogin}  // Call handleLogin on button press
          style={{
            marginTop: 18,
            marginBottom: 4,
          }}
        />

        {/** Sign Up Option */}
        <View style={{ flexDirection: 'row', alignItems: "center", marginVertical: 20 }}>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: COLORS.grey,
              marginHorizontal: 10,
            }}
          />

          <Text style={{ fontSize: 14 }}>Or SignUp with</Text>

          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: COLORS.grey,
              marginHorizontal: 10,
            }}
          />
        </View>

        {/** Social Buttons */}
        <View style={{ flexDirection: 'row', justifyContent: "center" }}>
          <TouchableOpacity
            onPress={() => console.log("Pressed Facebook")}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: "center",
              flexDirection: "row",
              height: 52,
              borderWidth: 1,
              borderColor: COLORS.grey,
              marginRight: 4,
              borderRadius: 10,
            }}
          >
            <Image
              source={require("../assets/facebook.png")}
              style={{
                height: 36,
                width: 36,
                marginRight: 8,
              }}
              resizeMode="contain"
            />
            <Text> Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => console.log("Pressed Google")}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: "center",
              flexDirection: "row",
              height: 52,
              borderWidth: 1,
              borderColor: COLORS.grey,
              marginRight: 4,
              borderRadius: 10,
            }}
          >
            <Image
              source={require("../assets/google.png")}
              style={{
                height: 45,
                width: 50,
                marginRight: 8,
              }}
              resizeMode="contain"
            />
            <Text> Google</Text>
          </TouchableOpacity>
        </View>

        {/** Register Option */}
        <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 22 }}>
          <Text style={{ fontSize: 16, color: COLORS.black }}>Don't have an account? </Text>
          <Pressable onPress={() => navigation.navigate("Signup")}>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.primary,
                fontWeight: "bold",
                marginLeft: 6,
              }}
            >
              Register
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
