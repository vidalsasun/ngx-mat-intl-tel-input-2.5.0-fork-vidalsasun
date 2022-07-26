import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var SearchPipe = /** @class */ (function () {
    function SearchPipe() {
    }
    // country | search:'searchCriteria'
    SearchPipe.prototype.transform = function (country, searchCriteria) {
        if (!searchCriteria || searchCriteria === '') {
            return true;
        }
        return country.toLowerCase().includes(searchCriteria.toLowerCase());
    };
    SearchPipe = tslib_1.__decorate([
        Pipe({
            name: 'search'
        })
    ], SearchPipe);
    return SearchPipe;
}());
export { SearchPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdmlkYWxzYXN1bi9uZ3gtbWF0LWludGwtdGVsLWlucHV0LyIsInNvdXJjZXMiOlsibGliL3NlYXJjaC5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUtwRDtJQUFBO0lBV0EsQ0FBQztJQVRDLG9DQUFvQztJQUNwQyw4QkFBUyxHQUFULFVBQVUsT0FBWSxFQUFFLGNBQW9CO1FBQzFDLElBQUksQ0FBQyxjQUFjLElBQUksY0FBYyxLQUFLLEVBQUUsRUFBRTtZQUM1QyxPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsT0FBTyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFUVSxVQUFVO1FBSHRCLElBQUksQ0FBQztZQUNKLElBQUksRUFBRSxRQUFRO1NBQ2YsQ0FBQztPQUNXLFVBQVUsQ0FXdEI7SUFBRCxpQkFBQztDQUFBLEFBWEQsSUFXQztTQVhZLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ3NlYXJjaCdcbn0pXG5leHBvcnQgY2xhc3MgU2VhcmNoUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuXG4gIC8vIGNvdW50cnkgfCBzZWFyY2g6J3NlYXJjaENyaXRlcmlhJ1xuICB0cmFuc2Zvcm0oY291bnRyeTogYW55LCBzZWFyY2hDcml0ZXJpYT86IGFueSk6IGFueSB7XG4gICAgaWYgKCFzZWFyY2hDcml0ZXJpYSB8fCBzZWFyY2hDcml0ZXJpYSA9PT0gJycpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBjb3VudHJ5LnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoQ3JpdGVyaWEudG9Mb3dlckNhc2UoKSk7XG4gIH1cblxufVxuIl19