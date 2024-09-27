import { Injectable } from '@angular/core';
import { DavesaDrawerComponent } from '@davesa/components/drawer/drawer.component';

@Injectable({ providedIn: 'root' })
export class DavesaDrawerService {
    private _componentRegistry: Map<string, DavesaDrawerComponent> = new Map<
        string,
        DavesaDrawerComponent
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
    registerComponent(name: string, component: DavesaDrawerComponent): void {
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
    getComponent(name: string): DavesaDrawerComponent | undefined {
        return this._componentRegistry.get(name);
    }
}
