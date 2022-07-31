// import React, {useState, useEffect} from 'react';
// import { View, Text, StyleSheet, Modal } from 'react-native';
// import {FAB} from 'react-native-paper';
// import Button from './Button';
// import CustomSelect from './CustomSelect';
// import CustomInput from './CustomInput';

// const CustomEditModal = ({
//         modalVisible,
//         setModalVisible,
//         editId,
//         noteData,
//         editNote,
//     }) => {
//     const [isLoading,setIsLoading] = useState<boolean>(true);
//     const initialValues = { type: '', name: '', content: '' };
//     const [values,setValues] = useState(initialValues);

//     useEffect(()=>{
//         console.log('NOTE DATA: ', noteData);
//         // const data =  (!!editId) ? {...noteData?.find((item)=>item.id === editId)[0]} : initialValues;
//         // setValues(data);
//         setIsLoading(false);
//     },[]);

//     useEffect(()=>{
//         if (modalVisible) {
//             // const data =  {...noteData?.find((item)=>item.id === editId)[0]};
//             // setValues(data);
//         }
//     },[modalVisible]);

//     const onChange = (name,value) => {
//         console.log('>> onChange: ',name,value);
//         // setValues({ ...values, [name]: value });
//     };

//     const onSubmit = async () => {
//         try {
//             // console.log("ON SUBMITTING: ",values)
//             // editNote({...values});
//             setModalVisible(false);
//         }
//         catch (error){
//             console.log(error);
//         }
//         finally {
//             console.log('FINALLY');
//         }
//     };

//     return (
//         <>
//             {
//                 !isLoading &&
//                     <View style={modalVisible ? styles.backgroundOn : styles.backgroundOff}>
//                         <Modal
//                             animationType="slide"
//                             transparent={true}
//                             visible={modalVisible}
//                             onRequestClose={() => {
//                                 setModalVisible(!modalVisible);
//                             }}
//                         >
//                             <View style={styles.centeredView}>
//                                 <View style={styles.modalView}>
//                                     <FAB
//                                         style={styles.fab}
//                                         small
//                                         icon="close"
//                                         onPress={() => setModalVisible(false)}
//                                     />
//                                     <View/>
//                                     <View style={styles.container}>
//                                         {/* {
//                                             values.type === 'note' &&
//                                             <>
//                                                 <CustomInput
//                                                     label="Title"
//                                                     placeholder="name"
//                                                     value={values.name}
//                                                     onChangeText={onChange}
//                                                     onBlur={null}
//                                                     isSecured={false}
//                                                     leftIcon=""
//                                                     rightIcon=""
//                                                     // error={touched.name && errors.name}
//                                                     error={false}
//                                                     onRightIconPress={null}
//                                                 />
//                                                 <CustomInput
//                                                     label="Content"
//                                                     placeholder="content"
//                                                     value={values.content}
//                                                     onChangeText={onChange}
//                                                     onBlur={null}
//                                                     isSecured={false}
//                                                     leftIcon=""
//                                                     rightIcon=""
//                                                     // error={touched.content && errors.content}
//                                                     error={false}
//                                                     onRightIconPress={null}
//                                                 />
//                                             </>
//                                         }
//                                         {
//                                             values.type === 'image' &&
//                                             <Text>Image Picker</Text>
//                                         }
//                                         {
//                                             values.type === 'list' &&
//                                             <Text>List Picker</Text>
//                                         } */}
//                                         <Button
//                                             title="Submit"
//                                             onPress={onSubmit}
//                                             isLoading={false}
//                                         />
//                                     </View>
//                                 </View>
//                             </View>
//                         </Modal>
//                     </View>
//             }
//         </>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         marginRight: 12,
//         marginLeft: 12,
//         height:'100%',
//         width:'100%',
//     },
//     backgroundOff:{
//         height:'100%',
//         width:'100%',
//         justifyContent: 'center',
//         alignItems: 'center',
//         position: 'absolute',
//         zIndex: -1,
//     },
//     backgroundOn:{
//         backgroundColor:'#00000099',
//         height:'100%',
//         width:'100%',
//         justifyContent: 'center',
//         alignItems: 'center',
//         position: 'absolute',
//         zIndex: 1,
//     },
//     centeredView: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         position:'relative',
//     },
//     modalView: {
//         width: '95%',
//         height: '95%',
//         margin: 20,
//         backgroundColor: 'white',
//         borderRadius: 20,
//         padding: 35,
//         alignItems: 'center',
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 4,
//         elevation: 5,
//     },
//     button: {
//         borderRadius: 20,
//         padding: 10,
//         elevation: 2,
//     },
//     buttonOpen: {
//         backgroundColor: '#F194FF',
//     },
//     buttonClose: {
//         backgroundColor: '#2196F3',
//     },
//     textStyle: {
//         color: 'white',
//         fontWeight: 'bold',
//         textAlign: 'center',
//     },
//     modalText: {
//         marginBottom: 15,
//         textAlign: 'center',
//     },
//     fab: {
//         position: 'absolute',
//         margin: 16,
//         right: 0,
//         top: 0,
//     },
// });

// export default CustomEditModal;
