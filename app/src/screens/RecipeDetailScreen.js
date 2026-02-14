import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { WebView } from 'react-native-webview';
import { COLORS, API_URL } from '../theme';

const RecipeDetailScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axios.get(`${API_URL}/recipes/${id}`);
        setRecipe(res.data);
      } catch (err) {
        console.log("Error fetching detail", err);
      }
    };
    fetchDetail();
  }, [id]);

  if (!recipe) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={COLORS.terracotta} />
        <Text style={{ marginTop: 10, color: COLORS.brownMid }}>Sedang memuat resep...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Hero */}
      <View style={styles.hero}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Kembali ke Beranda</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{recipe.title}</Text>
        {recipe.category && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>🏷 {recipe.category}</Text>
          </View>
        )}
      </View>

      <View style={styles.body}>
        {/* Video */}
        {recipe.videoUrl && (
          <View style={styles.videoContainer}>
            <WebView 
              source={{ uri: recipe.videoUrl }} 
              style={{ flex: 1 }}
              javaScriptEnabled={true}
            />
          </View>
        )}

        {/* Bahan */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🛒 Bahan-bahan</Text>
          {recipe.ingredients.map((item, index) => (
            <Text key={index} style={styles.listItem}>• {item}</Text>
          ))}
        </View>

        {/* Langkah */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👩‍🍳 Langkah-langkah</Text>
          {recipe.steps.map((step, index) => (
            <Text key={index} style={styles.listItem}>{index + 1}. {step}</Text>
          ))}
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>✦ Rahasia Dapur PKK Nusantara ✦</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.cream },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.cream },
  hero: { backgroundColor: COLORS.brownDeep, padding: 25, paddingTop: 40 },
  backText: { color: COLORS.goldLight, marginBottom: 15, fontWeight: 'bold' },
  title: { fontSize: 28, color: COLORS.white, fontWeight: 'bold', marginBottom: 10 },
  badge: { backgroundColor: 'rgba(212,168,71,0.15)', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 4, borderLeftWidth: 3, borderLeftColor: COLORS.gold },
  badgeText: { color: COLORS.goldLight, fontWeight: 'bold', fontSize: 12 },
  body: { padding: 20 },
  videoContainer: { height: 200, marginBottom: 20, borderRadius: 8, overflow: 'hidden', borderWidth: 2, borderColor: COLORS.gold },
  section: { backgroundColor: COLORS.white, padding: 20, borderRadius: 8, marginBottom: 20, elevation: 2 },
  sectionTitle: { fontSize: 18, color: COLORS.brownDeep, fontWeight: 'bold', marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 10 },
  listItem: { fontSize: 14, color: COLORS.brownMid, marginBottom: 8, lineHeight: 22 },
  footer: { backgroundColor: COLORS.brownDeep, padding: 20, alignItems: 'center' },
  footerText: { color: 'rgba(255,252,248,0.5)', fontSize: 11, letterSpacing: 1 },
});

export default RecipeDetailScreen;