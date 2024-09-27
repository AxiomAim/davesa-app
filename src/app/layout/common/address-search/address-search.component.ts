import { Overlay } from '@angular/cdk/overlay';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    Renderer2,
    SimpleChanges,
    ViewChild,
    ViewEncapsulation,
    inject,
} from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule,
    UntypedFormControl,
} from '@angular/forms';
import {
    MAT_AUTOCOMPLETE_SCROLL_STRATEGY,
    MatAutocomplete,
    MatAutocompleteModule,
} from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { davesaAnimations } from '@davesa/animations/public-api';
import { Subject, debounceTime, filter, map, takeUntil } from 'rxjs';

@Component({
    selector: 'address-search',
    templateUrl: './address-search.component.html',
    encapsulation: ViewEncapsulation.None,
    exportAs: 'davesaSearch',
    animations: davesaAnimations,
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        FormsModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatOptionModule,
        RouterLink,
        NgTemplateOutlet,
        MatFormFieldModule,
        MatInputModule,
        NgClass,
        
    ],
    providers: [
        NgZone,
        {
            provide: MAT_AUTOCOMPLETE_SCROLL_STRATEGY,
            useFactory: () => {
                const overlay = inject(Overlay);
                return () => overlay.scrollStrategies.block();
            },
        },
    ],
})
export class AddressSearchComponent implements OnChanges, OnInit, OnDestroy {
    lat = 37.7749; 
    lng = -122.4194; 
    zoom = 13; 

    @Input() appearance: 'basic' | 'bar' = 'basic';
    @Input() debounce: number = 300;
    @Input() minLength: number = 2;
    @Output() search: EventEmitter<any> = new EventEmitter<any>();

    opened: boolean = false;
    resultSets: any[];
    searchControl: UntypedFormControl = new UntypedFormControl();
    private _matAutocomplete: MatAutocomplete;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _elementRef: ElementRef,
        private _httpClient: HttpClient,
        private _renderer2: Renderer2,
        private ngZone: NgZone
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Host binding for component classes
     */
    @HostBinding('class') get classList(): any {
        return {
            'search-appearance-bar': this.appearance === 'bar',
            'search-appearance-basic': this.appearance === 'basic',
            'search-opened': this.opened,
        };
    }

    /**
     * Setter for bar search input
     *
     * @param value
     */
    @ViewChild('addressSearchInput')
    set addressSearchInput(value: ElementRef) {
        // If the value exists, it means that the search input
        // is now in the DOM, and we can focus on the input..
        if (value) {
            // Give Angular time to complete the change detection cycle
            setTimeout(() => {
                // Focus to the input element
                value.nativeElement.focus();
            });
        }
    }

    /**
     * Setter for mat-autocomplete element reference
     *
     * @param value
     */
    @ViewChild('matAutocomplete')
    set matAutocomplete(value: MatAutocomplete) {
        this._matAutocomplete = value;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On changes
     *
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void {
        // Appearance
        if ('appearance' in changes) {
            // To prevent any issues, close the
            // search after changing the appearance
            this.close();
        }
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.addressSearchInput.nativeElement.addEventListener('input', () => {
            this.getAutocompletePredictions();
          });
        // Subscribe to the search field value changes
        this.searchControl.valueChanges
            .pipe(
                debounceTime(this.debounce),
                takeUntil(this._unsubscribeAll),
                map((value) => {
                    // Set the resultSets to null if there is no value or
                    // the length of the value is smaller than the minLength
                    // so the autocomplete panel can be closed
                    if (!value || value.length < this.minLength) {
                        this.resultSets = null;
                    }

                    // Continue
                    return value;
                }),
                // Filter out undefined/null/false statements and also
                // filter out the values that are smaller than minLength
                filter((value) => value && value.length >= this.minLength)
            )
            .subscribe((value) => {
                this._httpClient
                    .post('api/common/search', { query: value })
                    .subscribe((resultSets: any) => {
                        // Store the result sets
                        this.resultSets = resultSets;

                        // Execute the event
                        this.search.next(resultSets);
                    });
            });
    }

    getAutocompletePredictions() {
        const inputValue = this.addressSearchInput.nativeElement.value;
    
        if (inputValue.length === 0) {
          // Clear any previous predictions if the input is empty
          return;
        }
    
        this._httpClient.get('https://maps.googleapis.com/maps/api/place/autocomplete/json', {
          params: {
            input: inputValue,
            key: 'AIzaSyAO7Mg2Cs1qzo_3jkKkZAKY6jtwIlm41-I', // Replace with your actual API key
            // Add other parameters as needed (e.g., types, components, etc.)
          }
        }).subscribe((response: any) => {
          this.ngZone.run(() => {
            // Handle the autocomplete predictions (e.g., display them in a dropdown)
            console.log(response.predictions); 
          });
        });
      }

      onPlaceSelected(prediction: any) {
        // Get the place details using the place_id
        this._httpClient.get('https://maps.googleapis.com/maps/api/place/details/json', {
          params: {
            place_id: prediction.place_id,
            key: 'AIzaSyAO7Mg2Cs1qzo_3jkKkZAKY6jtwIlm41-I',
            fields: 'geometry,name' // Specify the fields you need
          }
        }).subscribe((response: any) => {
          this.ngZone.run(() => {
            const place = response.result;
    
            if (place.geometry && place.geometry.location) {
              this.lat = place.geometry.location.lat;
              this.lng = place.geometry.location.lng;
              this.zoom = 15; 
            }
          });
        });
      }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * On keydown of the search input
     *
     * @param event
     */
    onKeydown(event: KeyboardEvent): void {
        // Escape
        if (event.code === 'Escape') {
            // If the appearance is 'bar' and the mat-autocomplete is not open, close the search
            if (this.appearance === 'bar' && !this._matAutocomplete.isOpen) {
                this.close();
            }
        }
    }

    /**
     * Open the search
     * Used in 'bar'
     */
    open(): void {
        // Return if it's already opened
        if (this.opened) {
            return;
        }

        // Open the search
        this.opened = true;
    }

    /**
     * Close the search
     * * Used in 'bar'
     */
    close(): void {
        // Return if it's already closed
        if (!this.opened) {
            return;
        }

        // Clear the search input
        this.searchControl.setValue('');

        // Close the search
        this.opened = false;
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
