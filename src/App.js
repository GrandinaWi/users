import React, {useEffect, useState} from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {

    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [search,setSearch]=useState('')
    const [invite,setInvite]=useState([])
    const [count,setCount]=useState(false);

    useEffect(() => {
        fetch('https://reqres.in/api/users')
            .then((res)=>res.json())
                .then((json)=>{
               setUsers(json.data);
        })
            .catch((err)=>{
            console.warn(err);
                   alert('Ошибка при загрузке пользователей');
                })
            .finally(()=>setLoading(false));
    }, [count]);
    const onChangeSearch = (event)=>{
        setSearch(event.target.value);
    }
    const onClickInvite = (id)=>{
        if (invite.includes(id)){
            setInvite(prev=>prev.filter(_id=>_id!==id));
        }else{
            setInvite((prev)=>[...prev,id])
        }
    }

    const sendUsers=()=>{
        setCount(true);
    }
    function back(){
        setUsers([]);
        setSearch('');
        setLoading(true)
        setInvite([])
        setCount(false);
    }
    return (
    <div className="App">
        {
            count ? (<Success back={back} count={invite.length} /> )
                : (<Users sendUsers={sendUsers} onClickInvite={onClickInvite} invite={invite} onChangeSearch={onChangeSearch} search={search} items={users} isLoading={isLoading} />)
        }


    </div>
  );
}

export default App;
