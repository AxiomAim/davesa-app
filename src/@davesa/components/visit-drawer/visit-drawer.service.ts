import { Injectable } from '@angular/core';
import { DavesaVisitDrawerComponent } from './visit-drawer.component';

@Injectable({ providedIn: 'root' })
export class DavesaVisitDrawerService {
    private _componentRegistry: Map<string, DavesaVisitDrawerComponent> = new Map<
        string,
        DavesaVisitDrawerComponent
    >();

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register drawer component
     *
     * @param name
     * @param component
     */
    registerComponent(name: string, component: DavesaVisitDrawerComponent): void {
        this._componentRegistry.set(name, component);
    }

    /**
     * Deregister drawer component
     *
     * @param name
     */
    deregisterComponent(name: string): void {
        this._componentRegistry.delete(name);
    }

    /**
     * Get drawer component from the registry
     *
     * @param name
     */
    getComponent(name: string): DavesaVisitDrawerComponent | undefined {
        return this._componentRegistry.get(name);
    }
}
