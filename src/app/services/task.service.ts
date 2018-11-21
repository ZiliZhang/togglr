import { ComponentFactoryResolver, Injectable, Injector, EmbeddedViewRef, ApplicationRef } from '@angular/core'

import { TaskComponent } from '../components/task/task.component';

@Injectable({ providedIn: 'root' })

export class TaskService {
    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector
    ) { }

    appendTask() {
        // 1. Create a component reference from the component
        const componentRef = this.componentFactoryResolver
            .resolveComponentFactory(TaskComponent)
            .create(this.injector);

        // 2. Attach component to the appRef so that it's inside the ng component tree
        this.appRef.attachView(componentRef.hostView);

        // 3. Get DOM element from component
        const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
            .rootNodes[0] as HTMLElement;

        // 4. Append DOM element to the body
        document.querySelector('.tasks').appendChild(domElem);
    }

    //remove the component from the component tree and from the DOM
    removeTask(task: any) {
        // Create a component reference from the component
        const componentRef = this.componentFactoryResolver
            .resolveComponentFactory(task)
            .create(this.injector);

        //Detach the view from the ApplicationRef
        this.appRef.detachView(componentRef.hostView);
        
        //Destroy the Component Ref. This will automatically remove the DOM element from the document.
        componentRef.destroy();
    }
}
