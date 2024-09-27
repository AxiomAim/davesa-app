import { NgModule, Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SortByFieldPipe } from './sortByField.pipe';
import { SafeHtmlPipe } from './safehtml.pipe';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        SortByFieldPipe,
        SafeHtmlPipe,
    ],
    exports: [
        SortByFieldPipe,
        SafeHtmlPipe,
    ]
})
export class PipesModule { }
