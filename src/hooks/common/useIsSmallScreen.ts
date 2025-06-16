import { useEffect, useState } from 'react';

const useIsSmallScreen = () => {
  const [isSmall, setIsSmall] = useState(window.innerWidth <= 850);
  const [isVerySmall, setIsVerySmall] = useState(window.innerWidth <= 470);

  useEffect(() => {
    const handleResize = () => {
      setIsSmall(window.innerWidth <= 850);
      setIsVerySmall(window.innerWidth <= 470)
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {isSmall, isVerySmall};
};

export default useIsSmallScreen