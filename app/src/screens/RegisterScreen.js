import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, API_URL } from '../theme';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/register`, { username, password });
      // await AsyncStorage.setItem('token', res.data.token);
      navigation.replace('Login');
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Gagal terhubung ke server";
      Alert.alert('Register gagal', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <View style={styles.headerTopLine} />
        
        <View style={styles.brand}>
          <Text style={styles.icon}>🍳</Text>
          <Text style={styles.title}>Bergabung Yuk!</Text>
          <Text style={styles.subtitle}>Daftarkan diri untuk mulai menemukan resep lezat</Text>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>USERNAME</Text>
          <TextInput
            style={styles.input}
            placeholder="Masukkan username Anda"
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>PASSWORD</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            secureTextEntry
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity onPress={handleRegister} disabled={loading}>
          <LinearGradient
            colors={[COLORS.terracotta, COLORS.terracottaLight]}
            style={styles.button}
          >
            <Text style={styles.buttonText}>{loading ? 'Memuat...' : '✦ Daftar ✦'}</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.linkContainer}>
          <Text style={styles.linkText}>Sudah punya akun? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkAction}>Masuk di sini</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.brownDeep,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: COLORS.white,
    padding: 30,
    borderRadius: 8,
    elevation: 10,
    shadowColor: COLORS.gold,
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  headerTopLine: {
    height: 5,
    backgroundColor: COLORS.terracotta,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  brand: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  icon: { fontSize: 36, marginBottom: 8 },
  title: { fontSize: 26, color: COLORS.brownDeep, fontWeight: 'bold' },
  subtitle: { fontSize: 14, color: COLORS.brownMid, marginTop: 8, textAlign: 'center' },
  formGroup: { marginBottom: 18 },
  label: { fontSize: 11, fontWeight: 'bold', color: COLORS.brownMid, marginBottom: 8, letterSpacing: 1.5 },
  input: {
    borderWidth: 1.5,
    borderColor: '#E8DDD0',
    backgroundColor: '#FDFAF7',
    padding: 12,
    borderRadius: 4,
    color: COLORS.brownDeep,
  },
  button: {
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: 'white', fontWeight: 'bold', letterSpacing: 2 },
  linkContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  linkText: { color: COLORS.brownMid },
  linkAction: { color: COLORS.terracotta, fontWeight: 'bold' },
});

export default RegisterScreen;