import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Tooltips } from 'app/core/util/app-tooltips';

@Injectable({
    providedIn: 'root'
})

export class TooltipService {
    _tooltipEnabled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    tooltipEnabled$ = this._tooltipEnabled.asObservable();

    tooltipEnabled(): boolean {
        return this._tooltipEnabled.getValue();
    }

    getTooltip(key: string): string {
        const isEnabled = this.tooltipEnabled();
        return isEnabled ? Tooltips[key] : null;
    }

    setTooltip(value: boolean): void {
        this._tooltipEnabled.next(value);
        localStorage.setItem('tooltipsEnabled', value.toString());
    }
}
