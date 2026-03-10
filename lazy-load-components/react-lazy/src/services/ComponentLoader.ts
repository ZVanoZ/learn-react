import React from 'react';
import { LoadableComponent } from '../types';

class ComponentLoader {
  private static instance: ComponentLoader;
  private loadedComponents: Map<string, LoadableComponent> = new Map();

  private componentMap: Record<string, () => Promise<any>> = {
    Component1: () => import('../components/Component1/Component1').then((res)=>{
      return new Promise(resolve => {
        setTimeout(()=>{resolve(res)}, 2000);
      })
    }),
    Component2: () => import('../components/Component2/Component2').then((res)=>{
      return new Promise(resolve => {
        setTimeout(()=>{resolve(res)}, 5000);
      })
    }),
  };

  private constructor() {}

  static getInstance(): ComponentLoader {
    if (!ComponentLoader.instance) {
      ComponentLoader.instance = new ComponentLoader();
    }
    return ComponentLoader.instance;
  }

  loadComponent(name: string): LoadableComponent {
    if (this.loadedComponents.has(name)) {
      return this.loadedComponents.get(name)!;
    }

    const loader = this.componentMap[name];
    if (!loader) {
      throw new Error(`Component ${name} not found`);
    }

    const lazyComponent = React.lazy(loader);
    this.loadedComponents.set(name, lazyComponent);
    return lazyComponent;
  }

  isLoaded(name: string): boolean {
    return this.loadedComponents.has(name);
  }

  getComponent(name: string): LoadableComponent | null {
    return this.loadedComponents.get(name) || null;
  }
}

export default ComponentLoader;
