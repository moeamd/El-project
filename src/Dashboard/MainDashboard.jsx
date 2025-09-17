
import NavbarDashboard from './NavbarDashboard'
import { Route, Routes } from 'react-router-dom'
import { CoursesDahsbord } from './CoursesDahsbord'
import InstructorDashboard from './InstructorDashboard'

export const MainDashboard = () => {
  return (
    
    <div className='flex'>
        <NavbarDashboard/>
        <Routes>
          <Route path='/CoursesDahsbord' element={<CoursesDahsbord/>}/>
          <Route path='/InstructorDashboard' element={<InstructorDashboard/>}/>
        </Routes>
    </div>
  )
}
