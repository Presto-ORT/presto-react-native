import React, { useEffect, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { saveRecord } from "../../api/records";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    Picker,
    Switch,
    Button,
    Dimensions
} from 'react-native';


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

    const handleChangeDate = (e, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate)
        setDateToShow(currentDate)
    }

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const handleEnviarRegistro = async () => {
        const registro = {
            date,
            category,
            subCategory,
            amount,
            pesos,
            description,
        }

        if (!registro.date || !registro.category || !registro.subCategory || !registro.amount) return;

        await saveRecord(registro);
        navigation.navigate('Diario');
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
                    testID="dateTimePicker"
                    value={date}
                    mode={"date"}
                    is24Hour={true}
                    display="default"
                    onChange={handleChangeDate}
                />
                }
                <Picker
                    style={styles.picker, styles.width}
                    selectedValue={category}
                    onValueChange={(itemValue) => setCategory(itemValue)}
                >
                    <Picker.Item label="Categoria" value="categoria" />
                </Picker>
                <Picker
                    style={styles.picker, styles.width}
                    selectedValue={subCategory}
                    onValueChange={(itemValue) => setSubCategory(itemValue)}
                >
                    <Picker.Item label="Sub-categoria" value="categoria" />
                </Picker>
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
                        onChange={() => { setPesos(!pesos) }}
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
    width: {
        width: Dimensions.get('window').width - 35,
    },
    button: {
        backgroundColor: 'red',
    },
    picker: {
        height: 25,
        width: 100
    },
    montoTipo: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textInput: {
        fontSize: 16
    },
    inputDescripcion: {
        height: 110
    }
});