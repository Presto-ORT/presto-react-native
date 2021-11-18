import React, { useEffect, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getCategories } from '../../api/categories';
import { saveRecord } from "../../api/records";
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
    Keyboard,
    ActivityIndicator
} from 'react-native';

export default function AddRecord({ navigation }) {

    const [amount, setAmount] = useState();
    const [description, setDescription] = useState();
    const [expense, setExpense] = useState(true);
    const [category, setCategory] = useState();
    const [subCategory, setSubCategory] = useState();
    const [date, setDate] = useState(new Date());
    const [dateToShow, setDateToShow] = useState("");
    const [mode, setMode] = useState('date');
    const [pesos, setPesos] = useState(true);
    const [user, setUser] = useState();
    const [show, setShow] = useState(false);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorAmount, setErrorAmount] = useState()


    useEffect(async () => {
        try {
            let response = await getCategories();
            setCategories(response);
            setLoading(false);
        } catch {

        }

    }, [])



    const handleChangeDate = (e, selectedDate) => {
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

    const handleAmount = e => {
        const hasNumber = new RegExp(/^-?\d+\.?\d*$/);

        if(e <= 0){
            setAmount(null);
            setErrorAmount("El valor no puede ser igual o menor a 0.");
        }else if(!hasNumber.test(e)){
            setAmount(null);
            setErrorAmount("Solo puede ingresar números.");
        }else{
            setAmount(e);
            setErrorAmount("");
        }
    }

    const handleEnviarRegistro = async () => {
        const registro = {
            date,
            category,
            sub: subCategory,
            amount,
            dolar: !pesos,
            description,
            expense
        }
        
        if (!registro.date || !registro.category || !registro.sub || !registro.amount) return;
        
        try{
            await saveRecord(registro);
            console.log("se registró")
            navigation.navigate('Diario', {enviado: true});
        }catch{
            console.log("No se pudo registrar.")
        }
    }

    if(loading){
        return(
        <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#0000ff"/>
        </View>)
    }else{
        return (
            
            <View style={styles.container}>
                
                <View style={styles.formContainer}>
                    <View>
                        <TouchableHighlight>
                            <Text
                                style={[styles.textInput]}
                                onPress={showDatepicker}>
                                {dateToShow == "" ? "Ingresar fecha del gasto" : dateToShow}
                            </Text>
                        </TouchableHighlight>
                    </View>
                    {show && <DateTimePicker
                        style={styles.width}
                        maximumDate={new Date()}
                        testID="dateTimePicker"
                        value={date}
                        mode={"date"}
                        is24Hour={true}
                        display="default"
                        onChange={handleChangeDate}
                        maxDate = {new Date()}
                    />
                    }
                    <TouchableWithoutFeedback onPress={() => Keyboard.dismis}>
                        <Picker
                            style={[styles.picker, styles.width]}
                            selectedValue={category}
                            onValueChange={(itemValue) => setCategory(itemValue)}
                        >
                            <Picker.Item label={"Ingresar una Categoría"} value={""}/>
                            {categories.length > 0 && categories.map((c,i) =>
                                <Picker.Item
                                    label={c.title}
                                    value={c.title} 
                                    key={i}/>
                            )}
                        </Picker>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <Picker
                            style={[styles.picker, styles.width]}
                            selectedValue={subCategory}
                            onValueChange={(itemValue) => setSubCategory(itemValue)}
                        >
                            <Picker.Item label={"Ingresar una Subcategoría"} value={""}/>
                            {category &&
                                categories.filter(c => c.title === category)[0].subcategory.map((fc,i) =>
                                    <Picker.Item 
                                        label={fc.title} 
                                        value={fc.title} 
                                        key={i} />
                                )
                            }
                        </Picker>
                    </TouchableWithoutFeedback>
                    <View style={styles.width, styles.montoTipo}>
                        <TextInput
                            style={[styles.textInput]}
                            placeholder="Ingresar el valor"
                            value={amount}
                            keyboardType="numeric"
                            onChangeText={(value) => handleAmount(value)}
                        />
                        <Switch
                            style = {styles.borderBottom}
                            trackColor={{ false: '#a0a3a8', true: '#a0a3a8' }}
                            thumbColor={pesos ? '#4a628a' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onChange={() => { setPesos(!pesos) }}
                            value={pesos}
    
                        />
                    </View>
                    {errorAmount !== "" && <Text style={{marginBottom:25, color:"red"}}> {errorAmount} </Text>}
                    <TextInput
                        style={[styles.width, styles.textInput]}
                        placeholder="Ingresar una descripción"
                        value={description}
                        multiline={true}
                        onChangeText={(value) => setDescription(value)}
                    />
                    <Button
                        title="Ingresar gasto"
                        color="#4a628a"
                        onPress={handleEnviarRegistro}
                        disabled={!date || !category || !subCategory || !amount}
                    />
                </View>
            </View>
        );
    }
    

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingTop:30
    },
    formContainer: {
        padding: 8,
        flex: 1
    },
    width: {
        width: Dimensions.get('window').width - 35,
    },
    button: {
        backgroundColor: 'red',
    },
    picker: {
        height: 25,
        marginBottom: 30
    },
    montoTipo: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textInput: {
        fontSize: 16,
        marginLeft: 10,
        marginBottom: 30,
    },
});