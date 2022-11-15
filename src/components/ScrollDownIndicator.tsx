import { useState, useEffect } from 'react';
import '../styles/ScrollDownIndicator.scss'

function ScrollDownIndicator() {

  const [showIndicator, setShowIndicator] = useState(true);

  const scrollDownListener = () => {
    if (window.scrollY === 0)
      setShowIndicator(true)
    else
      setShowIndicator(false)
  }

  useEffect(()=> {
    window.addEventListener('scroll', scrollDownListener);
  })
  
  if (!showIndicator)
    return <></>

  return (
    <div className="scroll-down-indicator">
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
};

export default ScrollDownIndicator;
