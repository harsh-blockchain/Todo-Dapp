import Navbar from './Navbar'
import { IoMdAddCircle } from 'react-icons/io'
import Task from './Task'

const TodoList = ({account,setInput,input,addTask,tasks,deleteTask}) => <div className='w-[70%] bg-green-600 py-4 px-9  overflow-y-scroll scrollbar-hide rounded-xl bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30 border border-gray-100'>
  <Navbar />
  <h2 className='text-2xl bolder text-white pb-8'>
    Address - {account}
  </h2>

  <h2 className='text-3xl bolder text-gray-700 pb-8'>
    TASK MANAGEMENT APP
  </h2>


  <div className='py-3 text-gray-600 font-semibold text-lg'>TODAY&apos;S TASKS</div>
  <form className='flex items-center justify-center'>
    <input
        value={input}
        onChange={e => setInput(e.target.value)}
      className='rounded-[10px] w-full text-lg p-[10px] border-none outline-none bg-[#574592] text-white mb-[10px]'
      placeholder='Add a task for today...'
      // take input from the form here
    />
    <IoMdAddCircle
        onClick={addTask}
      // Add an onClick method
      className='text-[#ea0aff] text-[50px] cursor-pointer ml-[20px] mb-[10px]'
    />
  </form>
  <ul>
        {tasks.map(item=> 
            <Task 
              key={item.id} 
              taskText={item.taskText} 
              onClick={deleteTask(item.id)}
            />)
          }
    
  </ul>
</div>

export default TodoList