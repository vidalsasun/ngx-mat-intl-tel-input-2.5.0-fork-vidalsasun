import { parsePhoneNumber } from 'libphonenumber-js';
export const phoneNumberValidator = (control) => {
    const error = { validatePhoneNumber: true };
    let numberInstance;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdC1pbnRsLXRlbC1pbnB1dC52YWxpZGF0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdmlkYWxzYXN1bi9uZ3gtbWF0LWludGwtdGVsLWlucHV0LyIsInNvdXJjZXMiOlsibGliL25neC1tYXQtaW50bC10ZWwtaW5wdXQudmFsaWRhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBQyxnQkFBZ0IsRUFBYyxNQUFNLG1CQUFtQixDQUFDO0FBRWhFLE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFHLENBQUMsT0FBb0IsRUFBRSxFQUFFO0lBQzNELE1BQU0sS0FBSyxHQUFHLEVBQUMsbUJBQW1CLEVBQUUsSUFBSSxFQUFDLENBQUM7SUFDMUMsSUFBSSxjQUEyQixDQUFDO0lBQ2hDLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRTtRQUNqQixJQUFJO1lBQ0YsY0FBYyxHQUFHLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNsRDtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YseUJBQXlCO1lBQ3pCLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxJQUFJLGNBQWMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUMvQyx5QkFBeUI7WUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7Z0JBQ3BCLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQzthQUN6QjtZQUNELE9BQU8sS0FBSyxDQUFDO1NBQ2Q7S0FDRjtBQUNILENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Rm9ybUNvbnRyb2x9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7cGFyc2VQaG9uZU51bWJlciwgUGhvbmVOdW1iZXJ9IGZyb20gJ2xpYnBob25lbnVtYmVyLWpzJztcblxuZXhwb3J0IGNvbnN0IHBob25lTnVtYmVyVmFsaWRhdG9yID0gKGNvbnRyb2w6IEZvcm1Db250cm9sKSA9PiB7XG4gIGNvbnN0IGVycm9yID0ge3ZhbGlkYXRlUGhvbmVOdW1iZXI6IHRydWV9O1xuICBsZXQgbnVtYmVySW5zdGFuY2U6IFBob25lTnVtYmVyO1xuICBpZiAoY29udHJvbC52YWx1ZSkge1xuICAgIHRyeSB7XG4gICAgICBudW1iZXJJbnN0YW5jZSA9IHBhcnNlUGhvbmVOdW1iZXIoY29udHJvbC52YWx1ZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy9jb250cm9sLnNldFZhbHVlKG51bGwpO1xuICAgICAgcmV0dXJuIGVycm9yO1xuICAgIH1cblxuICAgIGlmIChudW1iZXJJbnN0YW5jZSAmJiAhbnVtYmVySW5zdGFuY2UuaXNWYWxpZCgpKSB7XG4gICAgICAvL2NvbnRyb2wuc2V0VmFsdWUobnVsbCk7XG4gICAgICBpZiAoIWNvbnRyb2wudG91Y2hlZCkge1xuICAgICAgICBjb250cm9sLm1hcmtBc1RvdWNoZWQoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBlcnJvcjtcbiAgICB9XG4gIH1cbn07XG4iXX0=