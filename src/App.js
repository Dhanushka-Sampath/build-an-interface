import {useState, useEffect, useCallback} from "react"
import {FiAperture} from "react-icons/fi"
import Search from "./components/Search"
import AddAppointment from "./components/AddAppointment"
import AppointmentInfo from "./components/AppointmentInfo"
import Counter from "./components/Counter"


function App() {
  //below are available states, also called Hooks
  let [appointmentList, setAppointmentList] = useState([]);//initially value of appointmentList is an empty array
  let [query, setQuery] = useState("");// intially value of query is an empty string
  let [sortBy, setSortBy] = useState("petName");//ownerName
  let [orderBy, setOrderBy] = useState("asc");//desc|asc

  const filteredAppointments = appointmentList.filter(
    item => {
      return(
        item.petName.toLowerCase().includes(query.toLocaleLowerCase()) ||
        item.ownerName.toLowerCase().includes(query.toLocaleLowerCase()) ||
        item.aptNotes.toLowerCase().includes(query.toLocaleLowerCase())
      )
    }
  ).sort((a,b)=>{
    let order = (orderBy ==='asc')?1:-1;
    return(
      a[sortBy].toLowerCase()<b[sortBy].toLowerCase()
      ? -1 * order:1*order
    )
  })

  const fetchData = useCallback(()=>{
    fetch('./data.json')
    .then(response=>response.json())
    .then(data=>{
      setAppointmentList(data)
    })
  }, [])

  useEffect(()=>{
    fetchData()
  }, [fetchData])

  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-5xl mb-3">
        <FiAperture className="inline-block text-red-700"/>Your Appointments</h1>
        <AddAppointment
          onSendAppointment={myAppointment=>setAppointmentList([...appointmentList, myAppointment])}
          lastId={appointmentList.reduce((max,item)=>Number(item.id)>max?Number(item.id):max, 0)}
        />
        <Search 
          query={query}
          onQueryChange={myQuery=>setQuery(myQuery)}

          orderBy={orderBy}
          onOrderByChange={mySort=>setOrderBy(mySort)}

          sortBy={sortBy}
          onSortByChange={mySort=>setSortBy(mySort)}

        /> 
        <Counter/> 

        <ul className="divide-y divide-gray-200"> 
          {filteredAppointments
          .map(appointment=>(
           <AppointmentInfo key={appointment.id}
              appointment={appointment}
              onDeleteAppointment={
                appointmentId => 
                setAppointmentList(appointmentList.filter(appointment=>
                  appointment.id !== appointmentId))
              } 
           />
          ))
          }
        </ul>      
    </div>
  );
}

export default App;
