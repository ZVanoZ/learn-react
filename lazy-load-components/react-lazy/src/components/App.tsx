import React, { useState } from 'react';
import ButtonPanel from './ButtonPanel';
import ComponentContainer from './ComponentContainer';
import ErrorBoundary from './ErrorBoundary';
import ComponentLoader from '../services/ComponentLoader';
import { ComponentInstance } from '../types';

const App: React.FC = () => {
  const [components, setComponents] = useState<ComponentInstance[]>([]);

  const handleButtonClick = (componentName: 'Component1' | 'Component2'): void => {
    const loader = ComponentLoader.getInstance();

    if (!loader.isLoaded(componentName)) {
      loader.loadComponent(componentName);
    }

    const loadedComponent = loader.getComponent(componentName);
    if (loadedComponent) {
      const newComponent: ComponentInstance = {
        id: `${componentName}-${Date.now()}-${Math.random()}`,
        type: componentName,
        component: loadedComponent,
      };
      setComponents((prev) => [...prev, newComponent]);
    }
  };

  const handleClearClick = (): void => {
    setComponents([]);
  };

  return (
    <div className="app">
      <ButtonPanel onButtonClick={handleButtonClick} onClearClick={handleClearClick} />
      <ErrorBoundary>
        <ComponentContainer components={components} />
      </ErrorBoundary>
    </div>
  );
};

export default App;
