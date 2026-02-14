import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, API_URL } from '../theme';

const HomeScreen = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get(`${API_URL}/recipes`);
        setRecipes(res.data);
      } catch (err) {
        console.log("Error fetching recipes", err);
      }
    };
    fetchRecipes();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.replace('Login');
  };

  const renderRecipe = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>🏷 {item.category}</Text>
        </View>
        <TouchableOpacity 
          style={styles.cardButton}
          onPress={() => navigation.navigate('RecipeDetail', { id: item._id })}
        >
          <Text style={styles.cardButtonText}>Lihat Resep →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerBrand}>
          <View style={styles.emblem}><Text>🍳</Text></View>
          <View>
            <Text style={styles.headerTitle}>Rahasia Dapur</Text>
            <Text style={styles.headerSub}>KOLEKSI RESEP PKK</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Keluar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={recipes}
        keyExtractor={(item) => item._id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ paddingBottom: 30 }}
        ListHeaderComponent={() => (
          <>
            {/* Hero Section */}
            <View style={styles.hero}>
              <Text style={styles.heroLabel}>✦ RESEP PILIHAN IBU-IBU PKK ✦</Text>
              <Text style={styles.heroTitle}>Resep <Text style={{ color: COLORS.gold }}>Lezat</Text> & Penuh Cinta</Text>
            </View>
            <Text style={styles.sectionTitle}>🍽 Daftar Resep</Text>
          </>
        )}
        renderItem={renderRecipe}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.cream },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: COLORS.brownDeep,
    borderBottomWidth: 3,
    borderBottomColor: COLORS.terracotta,
  },
  headerBrand: { flexDirection: 'row', alignItems: 'center' },
  emblem: { width: 35, height: 35, backgroundColor: COLORS.terracotta, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  headerTitle: { color: COLORS.white, fontSize: 18, fontWeight: 'bold' },
  headerSub: { color: COLORS.gold, fontSize: 10, letterSpacing: 1 },
  logoutBtn: { borderColor: COLORS.terracotta, borderWidth: 1, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 4 },
  logoutText: { color: COLORS.terracotta, fontSize: 12, fontWeight: 'bold' },
  hero: { backgroundColor: COLORS.brownDeep, padding: 40, alignItems: 'center', marginBottom: 20 },
  heroLabel: { color: COLORS.gold, fontSize: 10, letterSpacing: 2, marginBottom: 10 },
  heroTitle: { color: COLORS.white, fontSize: 32, textAlign: 'center', fontWeight: 'bold' },
  sectionTitle: { fontSize: 20, color: COLORS.brownDeep, fontWeight: 'bold', paddingHorizontal: 20, marginBottom: 15 },
  row: { justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 15 },
  card: { flex: 1, backgroundColor: COLORS.white, marginHorizontal: 5, borderRadius: 8, overflow: 'hidden', elevation: 3 },
  cardImage: { width: '100%', height: 120 },
  cardContent: { padding: 12 },
  cardTitle: { fontSize: 14, fontWeight: 'bold', color: COLORS.brownDeep, marginBottom: 8, minHeight: 40 },
  badge: { backgroundColor: COLORS.terracottaPale, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, borderLeftWidth: 2, borderLeftColor: COLORS.terracotta, alignSelf: 'flex-start', marginBottom: 10 },
  badgeText: { fontSize: 10, color: COLORS.terracotta, fontWeight: 'bold' },
  cardButton: { backgroundColor: COLORS.terracotta, padding: 8, borderRadius: 4, alignItems: 'center' },
  cardButtonText: { color: COLORS.white, fontSize: 11, fontWeight: 'bold' }
});

export default HomeScreen;