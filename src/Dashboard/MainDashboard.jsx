
import NavbarDashboard from './NavbarDashboard'
import { Route, Routes } from 'react-router-dom'
import { CoursesDahsbord } from './CoursesDahsbord'
import InstructorDashboard from './InstructorDashboard'

export const MainDashboard = () => {
  return (
    
    <div className='flex min-h-screen'>
        <NavbarDashboard/>
        <Routes className="flex-1 p-8 space-y-12 bg-gray-100 dark:bg-gray-900">
          <Route path='/CoursesDahsbord' element={<CoursesDahsbord/>}/>
          <Route path='/InstructorDashboard' element={<InstructorDashboard/>}/>
        </Routes>
    </div>
  )
}
