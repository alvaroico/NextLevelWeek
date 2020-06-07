import React, {useState, useEffect} from 'react';
import { Feather as Icon } from "@expo/vector-icons";
import { View, ImageBackground, Image, StyleSheet, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

const Home = () => {
  const [uf, setUf] = useState('0');

  const [ufs, setUfs ] = useState<IBGEUFResponser[]>([]);
  const [cities, setCities] = useState<IBGECityResponser[]>([]);


  const [city, setcity] = useState('');

  const navigation = useNavigation();
 
    const placeholder = {
      label: 'Selecione a UF',
      value: '0',
      color: '#000',
    };
    const placeholdercity = {
      label: 'Selecione a Cidade',
      value: '0',
      color: '#000',
    };




  function handleNavigateToPoinst(){
    navigation.navigate('Points',{
      uf,
      city,
    })
  }

  interface IBGEUFResponse {
    sigla: string;
    nome: string;
  }
  interface IBGEUFResponser {
    label: string;
    value: string;
  }
  interface IBGECityResponse {
    id: number;
    nome: string;
  }
  interface IBGECityResponser {
    label: string;
    value: string;
  }

  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
      const ufInitials = response.data.map(uf => {
        return {
          label: uf.nome,
          value: uf.sigla
        };
      });

      //const ufIName = response.data.map(uf => uf.nome);
      setUfs(ufInitials)
      
    });
  }, []);

  useEffect(() => {
    // carregar as cidades sempre que a UF mudar
    if (uf === '0'){
      return;
    }
    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`).then(response => {
      const cityNames = response.data.map(city => {
        return {
          label: city.nome,
          value: city.nome
        };
      });
      setCities(cityNames);
    });
  }, [uf]);

    return (
      
<KeyboardAvoidingView style={{ flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

    <ImageBackground 
    source={require('../../assets/home-background.png')} 
    style={styles.container}
    imageStyle={{ width: 274, height: 368}}
    >
      <View style={styles.main}>
      <Image source={require('../../assets/logo.png')}/>
      <View>
      <Text style={styles.title}>Seu marketplace de coleta de resíduos </Text>
      <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente</Text>
      </View>
      </View>
      <View style={styles.footer}>
      <View style={styles.input} >
        <RNPickerSelect
            placeholder={placeholder}
            items={ufs}
            onValueChange={(text) => setUf(text)}
         />
      </View>
      <View style={styles.input} >
        <RNPickerSelect
            placeholder={placeholdercity}
            items={cities}
            onValueChange={(text) => setcity(text)}
        />
      </View>
    
      



        <RectButton style={styles.button} onPress={handleNavigateToPoinst}>
          <View style={styles.buttonIcon} >
            <Text>
              <Icon name="arrow-right" color="#FFF" size={24} ></Icon>
            </Text>
          </View>
          <Text style={styles.buttonText} >
            Entrar
          </Text>
        </RectButton>

      </View>
    </ImageBackground>
</KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});


export default Home;