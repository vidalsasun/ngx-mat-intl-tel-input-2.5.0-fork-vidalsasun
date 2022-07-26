import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatIntlTelInputComponent } from './ngx-mat-intl-tel-input.component';
import { MatButtonModule, MatInputModule, MatMenuModule, MatDividerModule } from '@angular/material';
import { SearchPipe } from './search.pipe';
let NgxMatIntlTelInputModule = class NgxMatIntlTelInputModule {
};
NgxMatIntlTelInputModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            NgxMatIntlTelInputComponent,
            SearchPipe,
        ],
        imports: [
            CommonModule,
            FormsModule,
            MatInputModule,
            MatMenuModule,
            MatButtonModule,
            MatDividerModule,
            ReactiveFormsModule
        ],
        exports: [NgxMatIntlTelInputComponent]
    })
], NgxMatIntlTelInputModule);
export { NgxMatIntlTelInputModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdC1pbnRsLXRlbC1pbnB1dC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdmlkYWxzYXN1bi9uZ3gtbWF0LWludGwtdGVsLWlucHV0LyIsInNvdXJjZXMiOlsibGliL25neC1tYXQtaW50bC10ZWwtaW5wdXQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsV0FBVyxFQUFFLG1CQUFtQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDakYsT0FBTyxFQUFDLGVBQWUsRUFBRSxjQUFjLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDbkcsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQWtCM0MsSUFBYSx3QkFBd0IsR0FBckMsTUFBYSx3QkFBd0I7Q0FBSSxDQUFBO0FBQTVCLHdCQUF3QjtJQWhCcEMsUUFBUSxDQUFDO1FBQ1IsWUFBWSxFQUFFO1lBQ1osMkJBQTJCO1lBQzNCLFVBQVU7U0FDWDtRQUNELE9BQU8sRUFBQztZQUNOLFlBQVk7WUFDWixXQUFXO1lBQ1gsY0FBYztZQUNkLGFBQWE7WUFDYixlQUFlO1lBQ2YsZ0JBQWdCO1lBQ2hCLG1CQUFtQjtTQUNwQjtRQUNELE9BQU8sRUFBRSxDQUFDLDJCQUEyQixDQUFDO0tBQ3ZDLENBQUM7R0FDVyx3QkFBd0IsQ0FBSTtTQUE1Qix3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0Zvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBOZ3hNYXRJbnRsVGVsSW5wdXRDb21wb25lbnQgfSBmcm9tICcuL25neC1tYXQtaW50bC10ZWwtaW5wdXQuY29tcG9uZW50JztcbmltcG9ydCB7TWF0QnV0dG9uTW9kdWxlLCBNYXRJbnB1dE1vZHVsZSwgTWF0TWVudU1vZHVsZSwgTWF0RGl2aWRlck1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgU2VhcmNoUGlwZSB9IGZyb20gJy4vc2VhcmNoLnBpcGUnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOZ3hNYXRJbnRsVGVsSW5wdXRDb21wb25lbnQsXG4gICAgU2VhcmNoUGlwZSxcbiAgXSxcbiAgaW1wb3J0czpbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIE1hdE1lbnVNb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdERpdmlkZXJNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZVxuICBdLFxuICBleHBvcnRzOiBbTmd4TWF0SW50bFRlbElucHV0Q29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hNYXRJbnRsVGVsSW5wdXRNb2R1bGUgeyB9XG4iXX0=