import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatIntlTelInputComponent } from './ngx-mat-intl-tel-input.component';
import { MatButtonModule, MatInputModule, MatMenuModule, MatDividerModule } from '@angular/material';
import { SearchPipe } from './search.pipe';
var NgxMatIntlTelInputModule = /** @class */ (function () {
    function NgxMatIntlTelInputModule() {
    }
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
    return NgxMatIntlTelInputModule;
}());
export { NgxMatIntlTelInputModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdC1pbnRsLXRlbC1pbnB1dC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdmlkYWxzYXN1bi9uZ3gtbWF0LWludGwtdGVsLWlucHV0LyIsInNvdXJjZXMiOlsibGliL25neC1tYXQtaW50bC10ZWwtaW5wdXQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsV0FBVyxFQUFFLG1CQUFtQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDakYsT0FBTyxFQUFDLGVBQWUsRUFBRSxjQUFjLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDbkcsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQWtCM0M7SUFBQTtJQUF3QyxDQUFDO0lBQTVCLHdCQUF3QjtRQWhCcEMsUUFBUSxDQUFDO1lBQ1IsWUFBWSxFQUFFO2dCQUNaLDJCQUEyQjtnQkFDM0IsVUFBVTthQUNYO1lBQ0QsT0FBTyxFQUFDO2dCQUNOLFlBQVk7Z0JBQ1osV0FBVztnQkFDWCxjQUFjO2dCQUNkLGFBQWE7Z0JBQ2IsZUFBZTtnQkFDZixnQkFBZ0I7Z0JBQ2hCLG1CQUFtQjthQUNwQjtZQUNELE9BQU8sRUFBRSxDQUFDLDJCQUEyQixDQUFDO1NBQ3ZDLENBQUM7T0FDVyx3QkFBd0IsQ0FBSTtJQUFELCtCQUFDO0NBQUEsQUFBekMsSUFBeUM7U0FBNUIsd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTmd4TWF0SW50bFRlbElucHV0Q29tcG9uZW50IH0gZnJvbSAnLi9uZ3gtbWF0LWludGwtdGVsLWlucHV0LmNvbXBvbmVudCc7XG5pbXBvcnQge01hdEJ1dHRvbk1vZHVsZSwgTWF0SW5wdXRNb2R1bGUsIE1hdE1lbnVNb2R1bGUsIE1hdERpdmlkZXJNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFNlYXJjaFBpcGUgfSBmcm9tICcuL3NlYXJjaC5waXBlJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTmd4TWF0SW50bFRlbElucHV0Q29tcG9uZW50LFxuICAgIFNlYXJjaFBpcGUsXG4gIF0sXG4gIGltcG9ydHM6W1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBNYXRNZW51TW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXREaXZpZGVyTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGVcbiAgXSxcbiAgZXhwb3J0czogW05neE1hdEludGxUZWxJbnB1dENvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4TWF0SW50bFRlbElucHV0TW9kdWxlIHsgfVxuIl19