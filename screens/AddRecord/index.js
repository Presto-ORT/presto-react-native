import React, { useEffect, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getCategories } from '../../api/categories';
import { 
    StyleSheet, 
    Text, 
    View,
    TextInput,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Picker,
    Switch,
    Button,
    Dimensions,
    Platform,
    Keyboard
 } from 'react-native';
import { set } from 'react-native-reanimated';

 


export default function AddRecord({ navigation }) {
    
    const [amount, setAmount] = useState();
    const [description, setDescription] = useState();
    const [expense, setExpense] = useState();
    const [category, setCategory] = useState();
    const [subCategory, setSubCategory] = useState();
    const [date, setDate] = useState(new Date());
    const [dateToShow, setDateToShow] = useState("");
    const [mode, setMode] = useState('date');
    const [pesos, setPesos] = useState(true);
    const [user, setUser] = useState();
    const [show, setShow] = useState(false);
    const [categories,setCategories] = useState([]);
    

  
    useEffect(async ()=>{
        try{
            let response = await getCategories();
            console.log(response)
            setCategories(response);
        }catch{
            console.log("No se pudo completar")
        }

    },[])

    const handleChangeDate = (e, selectedDate) => {
        console.log(selectedDate)
        setShow(Platform.OS === 'ios');
        setDate(selectedDate)
        dateFormatter(selectedDate)
    }

    const dateFormatter = (date) => {
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        setDateToShow(`${day}/${month}/${year}`)
    }

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };
    
    const showDatepicker = () => {
    showMode('date');
    };

    const handleEnviarRegistro = () => {
        const registro = {
            date,
            category,
            subCategory,
            amount,
            pesos,
            description,
            user
        }

        console.log(registro)
    }


    
    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
            <View>
                <TouchableHighlight>
                    <Text
                    style={styles.textInput} 
                    onPress={showDatepicker}>
                        {dateToShow == "" ? "Ingresar fecha del gasto" : dateToShow}
                    </Text>
                </TouchableHighlight>
            </View>
                {show && <DateTimePicker
                    style={styles.width}
                    maximumDate = {new Date()}
                    testID="dateTimePicker"
                    value={date}
                    mode={"date"}
                    is24Hour={true}
                    display="default"
                    onChange={handleChangeDate}
                />
                }
                <TouchableWithoutFeedback onPress={() => Keyboard.dismis }>
                    <Picker
                        style={styles.picker, styles.width}
                        selectedValue={category}
                        onValueChange={(itemValue) => setCategory(itemValue)}
                    >
                        {categories.length > 0 && categories.map(c => 
                            <Picker.Item 
                            placeholder="Ingrese una categoria"
                            label={c.title} 
                            value={c.title} />
                        )}
                    </Picker>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                    <Picker
                        style={styles.picker, styles.width}
                        selectedValue={subCategory}
                        onValueChange={(itemValue) => setSubCategory(itemValue)}
                    >
                        {category &&
                        categories.filter(c => c.title === category)[0].subcategory.map(fc => 
                            <Picker.Item label={fc.title} value={fc.title} />
                        )
                        }
                    </Picker>
                </TouchableWithoutFeedback>
                <View style={styles.width, styles.montoTipo}>
                    <TextInput 
                        style={styles.textInput}
                        placeholder="Ingresar el valor"
                        value={amount}
                        keyboardType="numeric"
                        onChangeText={(value) => setAmount(value)}
                    />
                    <Switch
                        trackColor={{ false: '#a0a3a8', true: '#a0a3a8' }}
                        thumbColor={pesos ? '#4a628a' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onChange={() => {setPesos(!pesos)}}
                        value={pesos}
                        
                    />
                </View>
                <TextInput
                    style={styles.width, styles.textInput, styles.inputDescripcion}
                    placeholder="Ingresar la descripción"
                    value={description}
                    multiline={true}
                    onChangeText={(value) => setDescription(value)}
                />
                <Button
                    title="Ingresar gasto"
                    color="#4a628a"
                    onPress={handleEnviarRegistro}
                />
            </View>
        </View>
    );
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    formContainer: {
      padding: 8,
      flex: 1
    },
    width:{
        width: Dimensions.get('window').width - 35,
    },
    button: {
      backgroundColor: 'red',
    },
    picker:{ 
        height: 25, 
        width: 100 
    },
    montoTipo: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textInput:{
        fontSize: 16
    },
    inputDescripcion:{
        height: 110
    }
  });