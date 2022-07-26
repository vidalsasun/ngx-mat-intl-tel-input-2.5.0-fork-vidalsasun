import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
let SearchPipe = class SearchPipe {
    // country | search:'searchCriteria'
    transform(country, searchCriteria) {
        if (!searchCriteria || searchCriteria === '') {
            return true;
        }
        return country.toLowerCase().includes(searchCriteria.toLowerCase());
    }
};
SearchPipe = tslib_1.__decorate([
    Pipe({
        name: 'search'
    })
], SearchPipe);
export { SearchPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdmlkYWxzYXN1bi9uZ3gtbWF0LWludGwtdGVsLWlucHV0LyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUtwRCxJQUFhLFVBQVUsR0FBdkIsTUFBYSxVQUFVO0lBRXJCLG9DQUFvQztJQUNwQyxTQUFTLENBQUMsT0FBWSxFQUFFLGNBQW9CO1FBQzFDLElBQUksQ0FBQyxjQUFjLElBQUksY0FBYyxLQUFLLEVBQUUsRUFBRTtZQUM1QyxPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsT0FBTyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7Q0FFRixDQUFBO0FBWFksVUFBVTtJQUh0QixJQUFJLENBQUM7UUFDSixJQUFJLEVBQUUsUUFBUTtLQUNmLENBQUM7R0FDVyxVQUFVLENBV3RCO1NBWFksVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoe1xuICBuYW1lOiAnc2VhcmNoJ1xufSlcbmV4cG9ydCBjbGFzcyBTZWFyY2hQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG5cbiAgLy8gY291bnRyeSB8IHNlYXJjaDonc2VhcmNoQ3JpdGVyaWEnXG4gIHRyYW5zZm9ybShjb3VudHJ5OiBhbnksIHNlYXJjaENyaXRlcmlhPzogYW55KTogYW55IHtcbiAgICBpZiAoIXNlYXJjaENyaXRlcmlhIHx8IHNlYXJjaENyaXRlcmlhID09PSAnJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvdW50cnkudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hDcml0ZXJpYS50b0xvd2VyQ2FzZSgpKTtcbiAgfVxuXG59XG4iXX0=