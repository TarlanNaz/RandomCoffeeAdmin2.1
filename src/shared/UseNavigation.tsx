import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

let navigationInstance: ((path: string) => void) | null = null;

export const useNavigation = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigationInstance = navigate;
    
    return () => {
      navigationInstance = null;
    };
  }, [navigate]);
  
  return navigationInstance;
};

export const navigateTo = (path: string) => {
  if (navigationInstance) {
    navigationInstance(path);
  } else {
    console.error('Navigation instance not initialized');
  }
};