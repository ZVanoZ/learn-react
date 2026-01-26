import React from 'react';

export interface ComponentLoaderConfig {
  componentName: string;
  importPath: string;
}

export type LoadableComponent = React.LazyExoticComponent<React.ComponentType<any>>;

export interface ComponentInstance {
  id: string;
  type: 'Component1' | 'Component2';
  component: LoadableComponent;
}

export type ComponentsArray = Array<ComponentInstance>;
