import {Pressable, StyleSheet, Text, View} from 'react-native';
import CreateScreen from './CreateScreen';
import AllItems from './AllItems';
import {useState} from 'react';
import { useTheme } from '../context/ThemeContext';

const HomeScreen = () => {
  const [view, setview] = useState(0);
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const [data, setdata] = useState([
    {id: 1, name: 'Wheat', stock: 5, unit: 'kg'},
    {id: 2, name: 'Rice', stock: 5, unit: 'kg'},
    {id: 3, name: 'Malka Daal', stock: 35, unit: 'kg'},
    {id: 4, name: 'SoyaChaap', stock: 55, unit: 'kg'},
    {id: 5, name: 'Corn', stock: 15, unit: 'kg'},
  ]);

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.header}>
        <Text style={[styles.title, {color: colors.text}]}>Dashboard</Text>
        <Pressable
          style={[styles.themeToggle, {backgroundColor: colors.surface}]}
          onPress={toggleTheme}>
          <Text style={[styles.themeToggleText, {color: colors.text}]}>
            {isDarkMode ? '🌙' : '☀️'}
          </Text>
        </Pressable>
      </View>

      <View style={styles.buttonContainer}>
        {['All Items', 'Low Stock', 'Create Items'].map((label, index) => (
          <Pressable
            key={label}
            style={[
              styles.button,
              {borderColor: colors.primary},
              view === index && {backgroundColor: colors.primary},
            ]}
            onPress={() => setview(index)}>
            <Text
              style={[
                styles.btnText,
                {color: view === index ? '#ffffff' : colors.primary},
              ]}>
              {label}
            </Text>
          </Pressable>
        ))}
      </View>

      {view === 0 && <AllItems data={data} />}
      {view === 1 && <AllItems data={data.filter(item => item.stock < 20)} />}
      {view === 2 && <CreateScreen data={data} setdata={setdata} />}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  themeToggle: {
    padding: 8,
    borderRadius: 20,
  },
  themeToggleText: {
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginVertical: 16,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 25,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  btnText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
