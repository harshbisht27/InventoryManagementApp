import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import { useTheme } from '../context/ThemeContext';

const AllItems = ({data}) => {
  const { colors, isDark } = useTheme();

  return (
    <ScrollView style={styles.container}>
      {data.map(item => (
        <View 
          key={item.id} 
          style={[
            styles.card, 
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            }
          ]}>
          <Text style={[styles.name, {color: colors.text}]}>{item.name}</Text>
          <View style={styles.details}>
            <Text style={[styles.stock, {color: colors.text}]}>
              Stock: {item.stock} {item.unit}
            </Text>
            <Text 
              style={[
                styles.stockStatus, 
                {color: item.stock < 20 ? colors.error : (isDark ? '#007AFF' : colors.success)}
              ]}>
              {item.stock < 20 ? 'Low Stock' : 'In Stock'}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default AllItems;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stock: {
    fontSize: 14,
  },
  stockStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
});