import { DoCheck, ElementRef, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { CountryCode } from './data/country-code';
import { Country } from './model/country.model';
import { PhoneNumber } from 'libphonenumber-js';
import { ErrorStateMatcher, MatFormFieldControl } from '@angular/material';
import { Subject } from 'rxjs';
import { FocusMonitor } from '@angular/cdk/a11y';
export declare class NgxMatIntlTelInputComponent implements OnInit, OnDestroy, DoCheck, MatFormFieldControl<any> {
    private countryCodeData;
    private fm;
    private elRef;
    ngControl: NgControl;
    static nextId: number;
    preferredCountries: Array<string>;
    enablePlaceholder: boolean;
    cssClass: any;
    name: string;
    onlyCountries: Array<string>;
    errorStateMatcher: ErrorStateMatcher;
    enableSearch: boolean;
    private _placeholder;
    private _required;
    private _disabled;
    stateChanges: Subject<void>;
    focused: boolean;
    errorState: boolean;
    id: string;
    describedBy: string;
    phoneNumber: string;
    allCountries: Array<Country>;
    preferredCountriesInDropDown: Array<Country>;
    selectedCountry: Country;
    numberInstance: PhoneNumber;
    value: any;
    searchCriteria: string;
    countryChanged: EventEmitter<Country>;
    static getPhoneNumberPlaceHolder(countryISOCode: any): string;
    private _getFullNumber;
    onTouched: () => void;
    propagateChange: (_: any) => void;
    constructor(countryCodeData: CountryCode, fm: FocusMonitor, elRef: ElementRef<HTMLElement>, ngControl: NgControl);
    ngOnInit(): void;
    ngDoCheck(): void;
    onPhoneNumberChange(): void;
    onCountrySelect(country: Country, el: any): void;
    onInputKeyPress(event: any): void;
    protected fetchCountryData(): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    writeValue(value: any): void;
    readonly empty: boolean;
    readonly shouldLabelFloat: boolean;
    placeholder: string;
    required: boolean;
    disabled: boolean;
    setDescribedByIds(ids: string[]): void;
    onContainerClick(event: MouseEvent): void;
    reset(): void;
    ngOnDestroy(): void;
}
