import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom'

import './styles.css'
import PageHeader from '../../Components/PageHeader';
import TeacherItem , {Teacher} from '../../Components/TeacherItem';
import Input from '../../Components/Input';
import Select from '../../Components/Select';
import api from '../../services/api';



const TeacherList: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');
  
  const [teachers, setTeachers] = useState([]);  
  
  
  async function  searchTeachers(e: FormEvent){
    e.preventDefault();
   
    const response = await api.get('classes',{
      params:{
        subject,
        week_day,
        time,
      }
    })
   setTeachers(response.data)

  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponiveis.">
          <form id="search-teachers" onSubmit={searchTeachers}>
          <Select 
              name="subject" 
              label="Matéria"
              value={subject}
              onChange={ e=>{
                setSubject(e.target.value)
              }}
              options={[
                
                {value:"Artes", label: "Artes"},
                {value:"Biologia", label: "Biologia"},
                {value:"Educação Física", label: "Educação Física"},
                {value:"Física", label: "Física"},
                {value:"Geografia", label: "Geografia"},
                {value:"História", label: "História"},
                {value:"Matemática", label: "Matemática"},
                {value:"Português", label: "Português"},
                {value:"Química", label: "Química"},
                {value:"Falar que dublagem não presta", label:"Falar que dublagem não presta"},
                
                
              ]}
              />
            <Select 
              name="week_day" 
              label="Dia da semana"
              value={week_day}
              onChange={ e=>{
                setWeekDay(e.target.value)
              }}
              options={[
                {value:"0", label: "Domingo"},
                {value:"1", label: "Segunda"},
                {value:"2 Física", label: "Terça"},
                {value:"3", label: "Quarta"},
                {value:"4", label: "Quinta"},
                {value:"5", label: "Sexta"},
                {value:"6", label: "Sábado"},
                
                
              ]}
              />
            <Input 
            type="time" 
            name="time" 
            label="Hora"
            value={time}
              onChange={ e=>{
                setTime(e.target.value)
                
              }}/>
            <button type="submit">Buscar</button>
            
          </form>

      </PageHeader>
      <main>
      {teachers.map((teacher: Teacher)=>{
          return <TeacherItem key={teacher.id} teacher={teacher}/>
        })}
        
        
      </main>
    </div>
  )
}

export default TeacherList;