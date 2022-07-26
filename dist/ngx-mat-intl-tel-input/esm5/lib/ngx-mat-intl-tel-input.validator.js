import { parsePhoneNumber } from 'libphonenumber-js';
export var phoneNumberValidator = function (control) {
    var error = { validatePhoneNumber: true };
    var numberInstance;
    if (control.value) {
        try {
            numberInstance = parsePhoneNumber(control.value);
        }
        catch (e) {
            //control.setValue(null);
            return error;
        }
        if (numberInstance && !numberInstance.isValid()) {
            //control.setValue(null);
            if (!control.touched) {
                control.markAsTouched();
            }
            return error;
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdC1pbnRsLXRlbC1pbnB1dC52YWxpZGF0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdmlkYWxzYXN1bi9uZ3gtbWF0LWludGwtdGVsLWlucHV0LyIsInNvdXJjZXMiOlsibGliL25neC1tYXQtaW50bC10ZWwtaW5wdXQudmFsaWRhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBQyxnQkFBZ0IsRUFBYyxNQUFNLG1CQUFtQixDQUFDO0FBRWhFLE1BQU0sQ0FBQyxJQUFNLG9CQUFvQixHQUFHLFVBQUMsT0FBb0I7SUFDdkQsSUFBTSxLQUFLLEdBQUcsRUFBQyxtQkFBbUIsRUFBRSxJQUFJLEVBQUMsQ0FBQztJQUMxQyxJQUFJLGNBQTJCLENBQUM7SUFDaEMsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFO1FBQ2pCLElBQUk7WUFDRixjQUFjLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2xEO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVix5QkFBeUI7WUFDekIsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELElBQUksY0FBYyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQy9DLHlCQUF5QjtZQUN6QixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtnQkFDcEIsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO2FBQ3pCO1lBQ0QsT0FBTyxLQUFLLENBQUM7U0FDZDtLQUNGO0FBQ0gsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtGb3JtQ29udHJvbH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtwYXJzZVBob25lTnVtYmVyLCBQaG9uZU51bWJlcn0gZnJvbSAnbGlicGhvbmVudW1iZXItanMnO1xuXG5leHBvcnQgY29uc3QgcGhvbmVOdW1iZXJWYWxpZGF0b3IgPSAoY29udHJvbDogRm9ybUNvbnRyb2wpID0+IHtcbiAgY29uc3QgZXJyb3IgPSB7dmFsaWRhdGVQaG9uZU51bWJlcjogdHJ1ZX07XG4gIGxldCBudW1iZXJJbnN0YW5jZTogUGhvbmVOdW1iZXI7XG4gIGlmIChjb250cm9sLnZhbHVlKSB7XG4gICAgdHJ5IHtcbiAgICAgIG51bWJlckluc3RhbmNlID0gcGFyc2VQaG9uZU51bWJlcihjb250cm9sLnZhbHVlKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvL2NvbnRyb2wuc2V0VmFsdWUobnVsbCk7XG4gICAgICByZXR1cm4gZXJyb3I7XG4gICAgfVxuXG4gICAgaWYgKG51bWJlckluc3RhbmNlICYmICFudW1iZXJJbnN0YW5jZS5pc1ZhbGlkKCkpIHtcbiAgICAgIC8vY29udHJvbC5zZXRWYWx1ZShudWxsKTtcbiAgICAgIGlmICghY29udHJvbC50b3VjaGVkKSB7XG4gICAgICAgIGNvbnRyb2wubWFya0FzVG91Y2hlZCgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGVycm9yO1xuICAgIH1cbiAgfVxufTtcbiJdfQ==