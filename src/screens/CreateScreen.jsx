import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CreateScreen = ({ data, setData }) => {
  const { colors } = useTheme();
  const [name, setName] = useState('');
  const [stock, setStock] = useState('');
  const [unit, setUnit] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = () => {
    if (name && stock && unit) {
      if (editingId) {
        setData(data.map(item =>
          item.id === editingId
            ? { ...item, name, stock: parseInt(stock), unit }
            : item
        ));
        setEditingId(null);
      } else {
        const newItem = {
          id: Date.now(),
          name,
          stock: parseInt(stock),
          unit,
        };
        setData([...data, newItem]);
      }
      setName('');
      setStock('');
      setUnit('');
    } else {
      Alert.alert('Error', 'Please fill all fields');
    }
  };

  const handleEdit = (item) => {
    setName(item.name);
    setStock(item.stock.toString());
    setUnit(item.unit);
    setEditingId(item.id);
  };

  const handleDelete = (id) => {
    Alert.alert(
      "Delete Item",
      "Are you sure you want to delete this item?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => setData(data.filter(item => item.id !== id))
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={[styles.title, { color: colors.text }]}>
          {editingId ? 'Edit Item' : 'Add New Item'}
        </Text>
        <TextInput
          style={[styles.input, {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            color: colors.text
          }]}
          placeholder="Item Name"
          placeholderTextColor={colors.text + '80'}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={[styles.input, {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            color: colors.text
          }]}
          placeholder="Stock Amount"
          placeholderTextColor={colors.text + '80'}
          value={stock}
          onChangeText={setStock}
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            color: colors.text
          }]}
          placeholder="Unit (kg, L, etc.)"
          placeholderTextColor={colors.text + '80'}
          value={unit}
          onChangeText={setUnit}
        />
        <Pressable
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleSubmit}>
          <Text style={styles.buttonText}>
            {editingId ? 'Update Item' : 'Add Item'}
          </Text>
        </Pressable>
      </View>

      <View style={styles.listContainer}>
        <Text style={[styles.subtitle, { color: colors.text }]}>All Items</Text>
        {data.map(item => (
          <View
            key={item.id}
            style={[styles.itemCard, { backgroundColor: colors.surface }]}>
            <View style={styles.itemInfo}>
              <Text style={[styles.itemName, { color: colors.text }]}>
                {item.name}
              </Text>
              <Text style={[styles.itemStock, { color: colors.text }]}>
                Stock: {item.stock} {item.unit}
              </Text>
            </View>
            <View style={styles.actions}>
              <Pressable
                style={[styles.iconButton, { backgroundColor: colors.primary + '20' }]}
                onPress={() => handleEdit(item)}>
                <Icon name="pencil" size={20} color={colors.primary} />
              </Pressable>
              <Pressable
                style={[styles.iconButton, { backgroundColor: colors.error + '20' }]}
                onPress={() => handleDelete(item.id)}>
                <Icon name="delete" size={20} color={colors.error} />
              </Pressable>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    fontSize: 16,
  },
  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  listContainer: {
    paddingVertical: 16,
  },
  itemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemStock: {
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    padding: 8,
    borderRadius: 8,
  },
});

export default CreateScreen;   