import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Modal, Pressable, TextInput } from 'react-native';
import { Form } from 'native-base';
import {FAB} from 'react-native-paper';
// import { Formik } from 'formik';
import * as yup from 'yup';
import Button from './Button';
import axios from 'axios';
import { BASE_URL } from '../config/config';
import CustomSelect from './CustomSelect';
import CustomInput from './CustomInput';

interface NoteType {
    noteType: string;
    id: string;
}

const CustomModal = ({modalVisible, setModalVisible, addNote}) => {
    const [isLoading,setIsLoading] = useState<boolean>(true);
    const [types, setTypes] = useState<NoteType[]>([]);
    const initialValues = { type: '', name: '', content: '' };
    const [values,setValues] = useState(initialValues);

    const getTypes = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${BASE_URL}/noteTypes`);
            console.log('RESPONSE: ', response.data.data.noteTypes);
            const newTypes = {...response.data.data}.noteTypes.map((type:any) => ({
                id: type._id,
                value: type.noteType,
                label: type.noteType.charAt(0).toUpperCase() + type.noteType.slice(1),
            }));
            setTypes(newTypes);
        } catch (error) {
            console.log('>>> ',error);
        }
        setIsLoading(false);
    };

    useEffect(()=>{
        if (modalVisible){
            setValues(initialValues);
        }
    },[modalVisible])

    useEffect(()=>{
        getTypes();
    },[]);

    const modalSchema = yup.object().shape({
        type: yup
            .string()
            .required(),
        name: yup
            .string()
            .required('Please enter your name'),
        content: yup
            .string(),
    });

    const onChange = (name,value) => {
        console.log('>> onChange: ',name,value);
        setValues({ ...values, [name]: value });
    };

    const onSubmit = async () => {
        try {
            console.log("ON SUBMITTING: ",values)
            addNote({...values});
            setModalVisible(false);
        }
        catch (error){
            console.log(error);
        }
        finally {
            console.log('FINALLY');
        }
    };

    return (
        <>
            {
                !isLoading &&
                    <View style={modalVisible ? styles.backgroundOn : styles.backgroundOff}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <FAB
                                        style={styles.fab}
                                        small
                                        icon="close"
                                        onPress={() => setModalVisible(false)}
                                    />
                                    <View/>
                                    <Text style={styles.modalText}>Add a note</Text>
                                    {/* ! */}
                                    {/* <Form>
                                    </Form> */}
                                    <View style={styles.container}>
                                        <CustomSelect
                                            types={types}
                                            handleChange={onChange}
                                        />
                                        {
                                            console.log('VALUES: ', values)
                                        }
                                        {
                                            values.type === 'note' &&
                                            <>
                                                <CustomInput
                                                    label="Title"
                                                    placeholder="name"
                                                    value={values.name}
                                                    onChangeText={onChange}
                                                    onBlur={null}
                                                    isSecured={false}
                                                    leftIcon=""
                                                    rightIcon=""
                                                    // error={touched.name && errors.name}
                                                    error={false}
                                                    onRightIconPress={null}
                                                />
                                                <CustomInput
                                                    label="Content"
                                                    placeholder="content"
                                                    value={values.content}
                                                    onChangeText={onChange}
                                                    onBlur={null}
                                                    isSecured={false}
                                                    leftIcon=""
                                                    rightIcon=""
                                                    // error={touched.content && errors.content}
                                                    error={false}
                                                    onRightIconPress={null}
                                                />
                                            </>
                                        }
                                        {
                                            values.type === 'image' &&
                                            <Text>Image Picker</Text>
                                        }
                                        {
                                            values.type === 'list' &&
                                            <Text>List Picker</Text>
                                        }
                                        <Button
                                            title="Submit"
                                            onPress={onSubmit}
                                            isLoading={false}
                                        />
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>
            }
        </>
    );
};

{/* <Formik
validationSchema={modalSchema}
initialValues={initialValues}
onSubmit={onSubmit}
>
{({ handleChange, handleBlur, handleSubmit, isSubmitting, values, errors, touched}) => (
    <View style={styles.container}>
        <CustomSelect
            types={types}
            handleChange={handleChange}
        />
        {
            console.log('VALUES: ', values)
        }
        {
            values.type === 'Note' &&
            <>
                <Input
                    label="Title"
                    placeholder="name"
                    value={values.name}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    isSecured={false}
                    leftIcon=""
                    rightIcon=""
                    error={touched.name && errors.name}
                    onRightIconPress={null}
                />
                <Input
                    label="Content"
                    placeholder="content"
                    value={values.content}
                    onChangeText={handleChange('content')}
                    onBlur={handleBlur('content')}
                    isSecured={false}
                    leftIcon=""
                    rightIcon=""
                    error={touched.content && errors.content}
                    onRightIconPress={null}
                />
            </>
        }
        {
            values.type === 'Image' &&
            <Text>Image Picker</Text>
        }
        {
            values.type === 'List' &&
            <Text>List Picker</Text>
        }
        <Button
            title="Submit"
            onPress={handleSubmit}
            isLoading={isSubmitting}
        />
    </View>
)}
</Formik> */}

const styles = StyleSheet.create({
    container: {
        marginRight: 12,
        marginLeft: 12,
        height:'100%',
        width:'100%',
    },
    backgroundOff:{
        height:'100%',
        width:'100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: -1,
    },
    backgroundOn:{
        backgroundColor:'#00000099',
        height:'100%',
        width:'100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 1,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position:'relative',
    },
    modalView: {
        width: '95%',
        height: '95%',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        top: 0,
    },
});

export default CustomModal;
