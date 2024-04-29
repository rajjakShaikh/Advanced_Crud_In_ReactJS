import {useDispatch } from 'react-redux'
import { increment,decrement } from '../feature/Counter/counterSlice'

export default function Counter() {
    // const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch;
    const handleClick = () => {
    dispatch(increment())
}

  return (
      <div>
          <button onClick={handleClick} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'>increment</button>
          <span>
              {/* count: {count} */}
          </span>
      <button onClick={()=>dispatch(decrement())} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded'>Decreament</button>
    </div>
  )
}
