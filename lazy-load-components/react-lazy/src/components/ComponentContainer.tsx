import React, { Suspense } from 'react';
import { ComponentInstance } from '../types';

interface ComponentContainerProps {
  components: ComponentInstance[];
}

const ComponentContainer: React.FC<ComponentContainerProps> = ({ components }) => {
  return (
    <div
      id="app-body"
      style={
        components.length === 0
          ? { display: 'flex', justifyContent: 'center', alignItems: 'center' }
          : {}
      }
    >
      {components.length === 0 ? (
        <div>EMPTY</div>
      ) : (
        components.map((comp) => {
          const Component = comp.component;
          return (
            <Suspense key={comp.id} fallback={<div>Загрузка компонента...</div>}>
              <Component />
            </Suspense>
          );
        })
      )}
    </div>
  );
};

export default ComponentContainer;
