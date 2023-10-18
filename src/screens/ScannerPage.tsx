import React, {useEffect, useState} from 'react';
import {View, Text, Button, Linking} from 'react-native';
import {getFormId} from '../utils/getFormId';
import {handleScan} from '../utils/handleScan';
import {postData} from '../services/postData';

const ScannerPage = () => {
  const [formId, setFormId] = useState('1234');

  const testData = {
    data: {
      name: 'John Doe',
      email: 'JohnDoe@mail.com',
      phone: '48191919',
      address: '123 Main St',
      country: 'Norway',
    },
    formId,
  };

  useEffect(() => {
    const unsubscribe = Linking.addEventListener('url', getFormId(setFormId));

    Linking.getInitialURL()
      .then(url => {
        if (url) {
          getFormId(setFormId)({url});
        }
      })
      .catch(err => console.error('An error occurred', err));

    return () => {
      unsubscribe.remove();
    };
  }, []);

  return (
    <View>
      <Text>Scanner Page FormId: {formId}</Text>
      <Button title="Scan ID" onPress={handleScan} />
      <View style={{height: 40}} />
      <Button title="Post Data" onPress={() => postData(testData)} />
    </View>
  );
};

export default ScannerPage;
