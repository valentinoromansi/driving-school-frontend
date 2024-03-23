'use client'

import { CSSProperties, forwardRef, useImperativeHandle, useRef, useState } from "react";


const sharedWrapperCss: CSSProperties = { display: 'inline-block', padding: '4px' }

/**
 * PARENT COMPONENT
 */

export default function ParentComp() {

  const childRef = useRef<ChildCompRefType>(null);

  return ( 
    <div style={{ ...sharedWrapperCss, border: 'solid 2px blue' }}>
      Parent <br/>
      <button onClick={() => { childRef.current?.add() }}>ADD</button>
      <button onClick={() => { childRef.current?.reset() }}>RESET</button> <br/><br/>
      <ChildComp ref={childRef}/>
    </div>
  );
}


/**
 * CHILD COMPONENT
 */

type ChildCompRefType = {
  reset: () => void,
  add: () => void
}

const ChildComp = forwardRef<ChildCompRefType>((props, ref) => {
  const [value, setValue] = useState<string>('')

  const reset = () => setValue('') 
  const add = () => setValue(value + 'X')

  useImperativeHandle(ref, () => ({
    reset: reset,
    add: add
  }));
  
  return(
    <div style={{ ...sharedWrapperCss, border: 'solid 2px green' }}>
      Child <br/>
      <button onClick={add}>ADD</button>
      <button onClick={reset}>RESET</button> <br/>
      {
        value
      }
    </div>
  )
})
