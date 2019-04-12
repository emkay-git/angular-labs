import { Component, ComponentFactoryResolver, NgModuleFactoryLoader, SystemJsNgModuleLoader, Injector } from '@angular/core';
import { DynamicComponent } from './dynamic/dynamic.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [{
    provide: NgModuleFactoryLoader,
    useClass: SystemJsNgModuleLoader
  }]
})
export class AppComponent {
  title = 'app';
  constructor(
    private resolver: ComponentFactoryResolver,
    private _injector: Injector,
    private loader: NgModuleFactoryLoader
  ) {

  }

  /**This creates the factory component of a component which is in the same module as this or in any other module,
   * which is imported by this module.
   */
  /** For 1st point */
  createDynamic() {
    const f = this.resolver.resolveComponentFactory(DynamicComponent);
    console.log(f);
  }


  /** For second poing */
  // loadModuleAndCreateDynamic() {
  //   let moduleLoaded = this.loader.load('app/external/external.module').then(factory => {
  //     const module = factory.create(this._injector);
  //     const r = module.componentFactoryResolver;
  //   }
  //   );
  //   console.log(moduleLoaded);
  // }

  /** For third point */
  // ngAfterViewInit() {
  //   System.import('app/t.module').then((module) => {
  //     _compiler.compileModuleAndAllComponentsAsync(module.TModule)
  //       .then((compiled) => {
  //         const m = compiled.ngModuleFactory.create(this._injector);
  //         const factory = compiled.componentFactories[0];
  //         const cmp = factory.create(this._injector, [], null, m);
  //       })
  //   })
  // }

}


/**
 * 1) So there is dynamic component loading for components which are in the same module as the component wanting to have the component factory.
 * or that component is exported in a module which is imported by the module in which that component is declared who wants the component factory of the component
 *
 * 2) Dynamic Dynamic component loading - If they are not in the same module, we load the module, get the factory and then get the component factories
 * for the components defined either in entry component of that module or in the component's template
 *
 * 3) Dynamic Dynamic component loading 2 - If they are not in the entry component, we load the module ourselves and then get the component from there.
 * using
 */