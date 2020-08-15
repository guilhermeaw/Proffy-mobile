import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';

const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState([] as Teacher[]);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  
  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  function handleToggleFiltersVisible() {
    setIsFiltersVisible(!isFiltersVisible);
  }

  async function handleFiltersSubmit() {
    const response = await api.get('/classes', {
      params: {
        subject,
        week_day,
        time
      }
    });

    setIsFiltersVisible(false);

    setTeachers(response.data);
  }

  return (
    <View style={styles.container}>
      <PageHeader 
        title="Proffys disponíveis"
        headerRight={(
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather name="filter" size={20} color="#FFF" />
          </BorderlessButton>
        )}
      >
        { isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput 
              placeholderTextColor="#c1bccc"
              value={subject}
              onChangeText={text => setSubject(text)}
              style={styles.input} 
              placeholder="Qual a matéria" 
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput 
                  placeholderTextColor="#c1bccc" 
                  value={week_day}
                  onChangeText={text => setWeekDay(text)}
                  style={styles.input} 
                  placeholder="Qual o dia?" 
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput 
                  placeholderTextColor="#c1bccc"
                  value={time}
                  onChangeText={text => setTime(text)}
                  style={styles.input} 
                  placeholder="Qual horário?" 
                />
              </View>
            </View>

            <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>

          </View>
        )}
      </PageHeader>

      <ScrollView 
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
      >
        {teachers.map(teacher => {
          return <TeacherItem key={teacher.id} teacher={teacher} />
        })}
      </ScrollView>
    </View>
  );
}

export default TeacherList;