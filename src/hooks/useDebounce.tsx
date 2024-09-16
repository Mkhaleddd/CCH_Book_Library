import {useState,useEffect} from 'react'

const useDebounce = (value: unknown) => {
    const[debounce,setDebounce]=useState(value);
    useEffect(()=>{
        const handler=setTimeout(()=>{
            setDebounce(value)},1000);
            return ()=>{
                clearTimeout(handler)
            }
    },[value])

  return debounce
}

export default useDebounce