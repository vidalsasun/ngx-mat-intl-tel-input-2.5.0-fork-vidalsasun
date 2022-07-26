var NgxMatIntlTelInputComponent_1;
import * as tslib_1 from "tslib";
import { Component, DoCheck, ElementRef, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Optional, Output, Self } from '@angular/core';
import { NG_VALIDATORS, NgControl } from '@angular/forms';
import { CountryCode, Examples } from './data/country-code';
import { phoneNumberValidator } from './ngx-mat-intl-tel-input.validator';
import { getExampleNumber, parsePhoneNumberFromString } from 'libphonenumber-js';
import { ErrorStateMatcher, MatFormFieldControl } from '@angular/material';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Subject } from 'rxjs';
import { FocusMonitor } from '@angular/cdk/a11y';
const ɵ0 = phoneNumberValidator;
let NgxMatIntlTelInputComponent = NgxMatIntlTelInputComponent_1 = class NgxMatIntlTelInputComponent {
    constructor(countryCodeData, fm, elRef, ngControl) {
        this.countryCodeData = countryCodeData;
        this.fm = fm;
        this.elRef = elRef;
        this.ngControl = ngControl;
        this.preferredCountries = [];
        this.enablePlaceholder = true;
        this.onlyCountries = [];
        this.enableSearch = false;
        // tslint:disable-next-line:variable-name
        this._required = false;
        // tslint:disable-next-line:variable-name
        this._disabled = false;
        this.stateChanges = new Subject();
        this.focused = false;
        this.errorState = false;
        this.id = `ngx-mat-intl-tel-input-${NgxMatIntlTelInputComponent_1.nextId++}`;
        this.describedBy = '';
        this.phoneNumber = '';
        this.allCountries = [];
        this.preferredCountriesInDropDown = [];
        this.countryChanged = new EventEmitter();
        this.onTouched = () => {
        };
        this.propagateChange = (_) => {
        };
        fm.monitor(elRef, true).subscribe(origin => {
            if (this.focused && !origin) {
                this.onTouched();
            }
            this.focused = !!origin;
            this.stateChanges.next();
        });
        this.fetchCountryData();
        if (this.ngControl != null) {
            this.ngControl.valueAccessor = this;
        }
    }
    static getPhoneNumberPlaceHolder(countryISOCode) {
        try {
            return getExampleNumber(countryISOCode, Examples).number.toString();
        }
        catch (e) {
            return e;
        }
    }
    _getFullNumber() {
        const val = this.phoneNumber.trim();
        const dialCode = this.selectedCountry.dialCode;
        let prefix;
        const numericVal = val.replace(/\D/g, '');
        // normalized means ensure starts with a 1, so we can match against the full dial code
        const normalizedVal = numericVal.charAt(0) === '1' ? numericVal : '1'.concat(numericVal);
        if (val.charAt(0) !== '+') {
            // when using separateDialCode, it is visible so is effectively part of the typed number
            prefix = '+'.concat(dialCode);
        }
        else if (val && val.charAt(0) !== '+' && val.charAt(0) !== '1' && dialCode && dialCode.charAt(0) === '1'
            && dialCode.length === 4 && dialCode !== normalizedVal.substr(0, 4)) {
            // ensure national NANP numbers contain the area code
            prefix = dialCode.substr(1);
        }
        else {
            prefix = '';
        }
        return prefix + numericVal;
    }
    ngOnInit() {
        if (this.preferredCountries.length) {
            this.preferredCountries.forEach(iso2 => {
                const preferredCountry = this.allCountries.filter((c) => {
                    return c.iso2 === iso2;
                });
                this.preferredCountriesInDropDown.push(preferredCountry[0]);
            });
        }
        if (this.onlyCountries.length) {
            this.allCountries = this.allCountries.filter(c => this.onlyCountries.includes(c.iso2));
        }
        if (this.numberInstance && this.numberInstance.country) {
            // If an existing number is present, we use it to determine selectedCountry
            this.selectedCountry = this.allCountries.find(c => c.iso2 === this.numberInstance.country.toLowerCase());
        }
        else {
            if (this.preferredCountriesInDropDown.length) {
                this.selectedCountry = this.preferredCountriesInDropDown[0];
            }
            else {
                this.selectedCountry = this.allCountries[0];
            }
        }
        this.countryChanged.emit(this.selectedCountry);
    }
    ngDoCheck() {
        if (this.ngControl) {
            this.errorState = this.ngControl.invalid && this.ngControl.touched;
            this.stateChanges.next();
        }
    }
    onPhoneNumberChange() {
        try {
            this.numberInstance = parsePhoneNumberFromString(this._getFullNumber());
            this.value = this.numberInstance.number;
            /*if (this.numberInstance && this.numberInstance.isValid()) {
              this.phoneNumber = this.numberInstance.formatNational();
            }*/
        }
        catch (e) {
            // if no possible numbers are there,
            // then the full number is passed so that validator could be triggered and proper error could be shown
            this.value = this._getFullNumber();
        }
        this.propagateChange(this.value);
    }
    onCountrySelect(country, el) {
        this.selectedCountry = country;
        this.countryChanged.emit(this.selectedCountry);
        this.onPhoneNumberChange();
        el.focus();
    }
    onInputKeyPress(event) {
        const pattern = /[0-9+\- ]/;
        if (!pattern.test(event.key)) {
            event.preventDefault();
        }
    }
    fetchCountryData() {
        this.countryCodeData.allCountries.forEach(c => {
            const country = {
                name: c[0].toString(),
                iso2: c[1].toString(),
                dialCode: c[2].toString(),
                priority: +c[3] || 0,
                areaCodes: c[4] || undefined,
                flagClass: c[1].toString().toUpperCase(),
                placeHolder: ''
            };
            if (this.enablePlaceholder) {
                country.placeHolder = NgxMatIntlTelInputComponent_1.getPhoneNumberPlaceHolder(country.iso2.toUpperCase());
            }
            this.allCountries.push(country);
        });
    }
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    writeValue(value) {
        // when form is reset
        if (value === null) {
            this.reset();
        }
        if (value) {
            this.numberInstance = parsePhoneNumberFromString(value);
            if (this.numberInstance) {
                const countryCode = this.numberInstance.country;
                this.phoneNumber = this.numberInstance.formatNational();
                if (!countryCode) {
                    return;
                }
                setTimeout(() => {
                    this.selectedCountry = this.allCountries.find(c => c.iso2 === countryCode.toLowerCase());
                    this.countryChanged.emit(this.selectedCountry);
                }, 1);
            }
        }
    }
    get empty() {
        return !this.phoneNumber;
    }
    get shouldLabelFloat() {
        return this.focused || !this.empty;
    }
    get placeholder() {
        return this._placeholder;
    }
    set placeholder(value) {
        this._placeholder = value;
        this.stateChanges.next();
    }
    get required() {
        return this._required;
    }
    set required(value) {
        this._required = coerceBooleanProperty(value);
        this.stateChanges.next();
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
        this.stateChanges.next();
    }
    setDescribedByIds(ids) {
        this.describedBy = ids.join(' ');
    }
    onContainerClick(event) {
        if (event.target.tagName.toLowerCase() !== 'input') {
            // tslint:disable-next-line:no-non-null-assertion
            this.elRef.nativeElement.querySelector('input').focus();
        }
    }
    reset() {
        this.phoneNumber = '';
        this.propagateChange(null);
    }
    ngOnDestroy() {
        this.stateChanges.complete();
        this.fm.stopMonitoring(this.elRef);
    }
};
NgxMatIntlTelInputComponent.nextId = 0;
NgxMatIntlTelInputComponent.ctorParameters = () => [
    { type: CountryCode },
    { type: FocusMonitor },
    { type: ElementRef },
    { type: NgControl, decorators: [{ type: Optional }, { type: Self }] }
];
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array)
], NgxMatIntlTelInputComponent.prototype, "preferredCountries", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], NgxMatIntlTelInputComponent.prototype, "enablePlaceholder", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], NgxMatIntlTelInputComponent.prototype, "cssClass", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], NgxMatIntlTelInputComponent.prototype, "name", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Array)
], NgxMatIntlTelInputComponent.prototype, "onlyCountries", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", ErrorStateMatcher)
], NgxMatIntlTelInputComponent.prototype, "errorStateMatcher", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], NgxMatIntlTelInputComponent.prototype, "enableSearch", void 0);
tslib_1.__decorate([
    HostBinding(),
    tslib_1.__metadata("design:type", Object)
], NgxMatIntlTelInputComponent.prototype, "id", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], NgxMatIntlTelInputComponent.prototype, "countryChanged", void 0);
tslib_1.__decorate([
    HostBinding('class.ngx-floating'),
    tslib_1.__metadata("design:type", Object),
    tslib_1.__metadata("design:paramtypes", [])
], NgxMatIntlTelInputComponent.prototype, "shouldLabelFloat", null);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String),
    tslib_1.__metadata("design:paramtypes", [String])
], NgxMatIntlTelInputComponent.prototype, "placeholder", null);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], NgxMatIntlTelInputComponent.prototype, "required", null);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Boolean),
    tslib_1.__metadata("design:paramtypes", [Boolean])
], NgxMatIntlTelInputComponent.prototype, "disabled", null);
NgxMatIntlTelInputComponent = NgxMatIntlTelInputComponent_1 = tslib_1.__decorate([
    Component({
        // tslint:disable-next-line:component-selector
        selector: 'ngx-mat-intl-tel-input',
        template: "<div class=\"ngx-mat-tel-input-container\">\n  <button type=\"button\" mat-button [matMenuTriggerFor]=\"menu\" class=\"country-selector\">\n    <span class=\"country-selector-flag flag\" [ngClass]=\"selectedCountry.flagClass\"></span>\n    <span class=\"country-selector-code\">+{{selectedCountry.dialCode}}</span>\n  </button>\n  <mat-menu #menu=\"matMenu\">\n    <input *ngIf=\"enableSearch\" class=\"country-search\" [(ngModel)]=\"searchCriteria\" type=\"text\" placeholder=\"Search...\" (click)=\"$event.stopPropagation()\" />\n    <button type=\"button\" mat-menu-item class=\"country-list-button\" *ngFor=\"let country of preferredCountriesInDropDown\" (click)=\"onCountrySelect(country, focusable)\">\n      <div class=\"icon-wrapper\">\n        <div class=\"flag\" [ngClass]=\"country.flagClass\"></div>\n      </div>\n      <div class=\"label-wrapper\">{{country.name}} +{{country.dialCode}}</div>\n    </button>\n    <mat-divider *ngIf=\"preferredCountriesInDropDown?.length\"></mat-divider>\n    <ng-container *ngFor=\"let country of allCountries\">\n      <button type=\"button\" mat-menu-item class=\"country-list-button\" *ngIf=\"country.name | search:searchCriteria\" (click)=\"onCountrySelect(country, focusable)\">\n        <div class=\"icon-wrapper\">\n          <div class=\"flag\" [ngClass]=\"country.flagClass\"></div>\n        </div>\n        <div class=\"label-wrapper\">{{country.name}} +{{country.dialCode}}</div>\n      </button>\n    </ng-container>\n  </mat-menu>\n\n  <input matInput type=\"tel\" autocomplete=\"off\"\n         [ngClass]=\"cssClass\"\n         (blur)=\"onTouched()\"\n         (keypress)=\"onInputKeyPress($event)\"\n         [(ngModel)]=\"phoneNumber\"\n         (ngModelChange)=\"onPhoneNumberChange()\"\n         [errorStateMatcher]=\"errorStateMatcher\"\n         [disabled]=\"disabled\" #focusable>\n</div>\n",
        providers: [
            CountryCode,
            { provide: MatFormFieldControl, useExisting: NgxMatIntlTelInputComponent_1 },
            {
                provide: NG_VALIDATORS,
                useValue: ɵ0,
                multi: true,
            }
        ],
        styles: ["input:not(.country-search){border:none;background:0 0;outline:0;font:inherit;width:100%;box-sizing:border-box;margin-left:0;position:relative;z-index:0;margin-top:0!important;margin-bottom:0!important;margin-right:0;padding:0 6px 0 90px}input.country-search{width:100%;height:34px;padding:20px 20px 24px;border:none;border-bottom:1px solid #ddd;font-size:14px}.icon-wrapper{padding-right:24px}.flag{background-image:url(https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/flags_sprite_2x.png);background-size:100% auto;-webkit-filter:drop-shadow(1px 1px 1px rgba(0, 0, 0, .54));filter:drop-shadow(1px 1px 1px rgba(0, 0, 0, .54));height:14px;width:24px}.icon-wrapper,.label-wrapper{display:table-cell;vertical-align:top}.country-selector{background-image:url(https://www.gstatic.com/images/icons/material/system/1x/arrow_drop_down_grey600_18dp.png);background-position:right center;background-repeat:no-repeat;background-size:18px auto;border-radius:0;color:rgba(0,0,0,.87);flex-shrink:0;height:initial;line-height:unset;width:90px;opacity:0;transition:opacity .2s;position:absolute;top:0;bottom:0;padding:1px;right:auto;left:0;font-size:inherit;font-weight:inherit;z-index:1}:host.ngx-floating .country-selector{opacity:1!important}.country-selector-flag{display:inline-block;margin-right:.5ex}.country-list-button{color:rgba(0,0,0,.87);direction:ltr;font-size:16px;font-weight:400;height:initial;line-height:normal;min-height:48px;padding:14px 24px;text-align:left;text-transform:none;width:100%}.flag.KY{background-position:0 0}.flag.AC{background-position:0 -14px}.flag.AE{background-position:0 -28px}.flag.AF{background-position:0 -42px}.flag.AG{background-position:0 -56px}.flag.AI{background-position:0 -70px}.flag.AL{background-position:0 -84px}.flag.AM{background-position:0 -98px}.flag.AO{background-position:0 -112px}.flag.AQ{background-position:0 -126px}.flag.AR{background-position:0 -140px}.flag.AS{background-position:0 -154px}.flag.AT{background-position:0 -168px}.flag.AU{background-position:0 -182px}.flag.AW{background-position:0 -196px}.flag.AX{background-position:0 -210px}.flag.AZ{background-position:0 -224px}.flag.BA{background-position:0 -238px}.flag.BB{background-position:0 -252px}.flag.BD{background-position:0 -266px}.flag.BE{background-position:0 -280px}.flag.BF{background-position:0 -294px}.flag.BG{background-position:0 -308px}.flag.BH{background-position:0 -322px}.flag.BI{background-position:0 -336px}.flag.BJ{background-position:0 -350px}.flag.BL{background-position:0 -364px}.flag.BM{background-position:0 -378px}.flag.BN{background-position:0 -392px}.flag.BO{background-position:0 -406px}.flag.BQ{background-position:0 -420px}.flag.BR{background-position:0 -434px}.flag.BS{background-position:0 -448px}.flag.BT{background-position:0 -462px}.flag.BV{background-position:0 -476px}.flag.BW{background-position:0 -490px}.flag.BY{background-position:0 -504px}.flag.BZ{background-position:0 -518px}.flag.CA{background-position:0 -532px}.flag.CC{background-position:0 -546px}.flag.CD{background-position:0 -560px}.flag.CF{background-position:0 -574px}.flag.CG{background-position:0 -588px}.flag.CH{background-position:0 -602px}.flag.CI{background-position:0 -616px}.flag.CK{background-position:0 -630px}.flag.CL{background-position:0 -644px}.flag.CM{background-position:0 -658px}.flag.CN{background-position:0 -672px}.flag.CO{background-position:0 -686px}.flag.CP{background-position:0 -700px}.flag.CR{background-position:0 -714px}.flag.CU{background-position:0 -728px}.flag.CV{background-position:0 -742px}.flag.CW{background-position:0 -756px}.flag.CX{background-position:0 -770px}.flag.CY{background-position:0 -784px}.flag.CZ{background-position:0 -798px}.flag.DE{background-position:0 -812px}.flag.DG{background-position:0 -826px}.flag.DJ{background-position:0 -840px}.flag.DK{background-position:0 -854px}.flag.DM{background-position:0 -868px}.flag.DO{background-position:0 -882px}.flag.DZ{background-position:0 -896px}.flag.EA{background-position:0 -910px}.flag.EC{background-position:0 -924px}.flag.EE{background-position:0 -938px}.flag.EG{background-position:0 -952px}.flag.EH{background-position:0 -966px}.flag.ER{background-position:0 -980px}.flag.ES{background-position:0 -994px}.flag.ET{background-position:0 -1008px}.flag.EU{background-position:0 -1022px}.flag.FI{background-position:0 -1036px}.flag.FJ{background-position:0 -1050px}.flag.FK{background-position:0 -1064px}.flag.FM{background-position:0 -1078px}.flag.FO{background-position:0 -1092px}.flag.FR{background-position:0 -1106px}.flag.GA{background-position:0 -1120px}.flag.GB{background-position:0 -1134px}.flag.GD{background-position:0 -1148px}.flag.GE{background-position:0 -1162px}.flag.GF{background-position:0 -1176px}.flag.GG{background-position:0 -1190px}.flag.GH{background-position:0 -1204px}.flag.GI{background-position:0 -1218px}.flag.GL{background-position:0 -1232px}.flag.GM{background-position:0 -1246px}.flag.GN{background-position:0 -1260px}.flag.GP{background-position:0 -1274px}.flag.GQ{background-position:0 -1288px}.flag.GR{background-position:0 -1302px}.flag.GS{background-position:0 -1316px}.flag.GT{background-position:0 -1330px}.flag.GU{background-position:0 -1344px}.flag.GW{background-position:0 -1358px}.flag.GY{background-position:0 -1372px}.flag.HK{background-position:0 -1386px}.flag.HM{background-position:0 -1400px}.flag.HN{background-position:0 -1414px}.flag.HR{background-position:0 -1428px}.flag.HT{background-position:0 -1442px}.flag.HU{background-position:0 -1456px}.flag.IC{background-position:0 -1470px}.flag.ID{background-position:0 -1484px}.flag.IE{background-position:0 -1498px}.flag.IL{background-position:0 -1512px}.flag.IM{background-position:0 -1526px}.flag.IN{background-position:0 -1540px}.flag.IO{background-position:0 -1554px}.flag.IQ{background-position:0 -1568px}.flag.IR{background-position:0 -1582px}.flag.IS{background-position:0 -1596px}.flag.IT{background-position:0 -1610px}.flag.JE{background-position:0 -1624px}.flag.JM{background-position:0 -1638px}.flag.JO{background-position:0 -1652px}.flag.JP{background-position:0 -1666px}.flag.KE{background-position:0 -1680px}.flag.KG{background-position:0 -1694px}.flag.KH{background-position:0 -1708px}.flag.KI{background-position:0 -1722px}.flag.KM{background-position:0 -1736px}.flag.KN{background-position:0 -1750px}.flag.KP{background-position:0 -1764px}.flag.KR{background-position:0 -1778px}.flag.KW{background-position:0 -1792px}.flag.AD{background-position:0 -1806px}.flag.KZ{background-position:0 -1820px}.flag.LA{background-position:0 -1834px}.flag.LB{background-position:0 -1848px}.flag.LC{background-position:0 -1862px}.flag.LI{background-position:0 -1876px}.flag.LK{background-position:0 -1890px}.flag.LR{background-position:0 -1904px}.flag.LS{background-position:0 -1918px}.flag.LT{background-position:0 -1932px}.flag.LU{background-position:0 -1946px}.flag.LV{background-position:0 -1960px}.flag.LY{background-position:0 -1974px}.flag.MA{background-position:0 -1988px}.flag.MC{background-position:0 -2002px}.flag.MD{background-position:0 -2016px}.flag.ME{background-position:0 -2030px}.flag.MF{background-position:0 -2044px}.flag.MG{background-position:0 -2058px}.flag.MH{background-position:0 -2072px}.flag.MK{background-position:0 -2086px}.flag.ML{background-position:0 -2100px}.flag.MM{background-position:0 -2114px}.flag.MN{background-position:0 -2128px}.flag.MO{background-position:0 -2142px}.flag.MP{background-position:0 -2156px}.flag.MQ{background-position:0 -2170px}.flag.MR{background-position:0 -2184px}.flag.MS{background-position:0 -2198px}.flag.MT{background-position:0 -2212px}.flag.MU{background-position:0 -2226px}.flag.MV{background-position:0 -2240px}.flag.MW{background-position:0 -2254px}.flag.MX{background-position:0 -2268px}.flag.MY{background-position:0 -2282px}.flag.MZ{background-position:0 -2296px}.flag.NA{background-position:0 -2310px}.flag.NC{background-position:0 -2324px}.flag.NE{background-position:0 -2338px}.flag.NF{background-position:0 -2352px}.flag.NG{background-position:0 -2366px}.flag.NI{background-position:0 -2380px}.flag.NL{background-position:0 -2394px}.flag.NO{background-position:0 -2408px}.flag.NP{background-position:0 -2422px}.flag.NR{background-position:0 -2436px}.flag.NU{background-position:0 -2450px}.flag.NZ{background-position:0 -2464px}.flag.OM{background-position:0 -2478px}.flag.PA{background-position:0 -2492px}.flag.PE{background-position:0 -2506px}.flag.PF{background-position:0 -2520px}.flag.PG{background-position:0 -2534px}.flag.PH{background-position:0 -2548px}.flag.PK{background-position:0 -2562px}.flag.PL{background-position:0 -2576px}.flag.PM{background-position:0 -2590px}.flag.PN{background-position:0 -2604px}.flag.PR{background-position:0 -2618px}.flag.PS{background-position:0 -2632px}.flag.PT{background-position:0 -2646px}.flag.PW{background-position:0 -2660px}.flag.PY{background-position:0 -2674px}.flag.QA{background-position:0 -2688px}.flag.RE{background-position:0 -2702px}.flag.RO{background-position:0 -2716px}.flag.RS{background-position:0 -2730px}.flag.RU{background-position:0 -2744px}.flag.RW{background-position:0 -2758px}.flag.SA{background-position:0 -2772px}.flag.SB{background-position:0 -2786px}.flag.SC{background-position:0 -2800px}.flag.SD{background-position:0 -2814px}.flag.SE{background-position:0 -2828px}.flag.SG{background-position:0 -2842px}.flag.SH{background-position:0 -2856px}.flag.SI{background-position:0 -2870px}.flag.SJ{background-position:0 -2884px}.flag.SK{background-position:0 -2898px}.flag.SL{background-position:0 -2912px}.flag.SM{background-position:0 -2926px}.flag.SN{background-position:0 -2940px}.flag.SO{background-position:0 -2954px}.flag.SR{background-position:0 -2968px}.flag.SS{background-position:0 -2982px}.flag.ST{background-position:0 -2996px}.flag.SV{background-position:0 -3010px}.flag.SX{background-position:0 -3024px}.flag.SY{background-position:0 -3038px}.flag.SZ{background-position:0 -3052px}.flag.TA{background-position:0 -3066px}.flag.TC{background-position:0 -3080px}.flag.TD{background-position:0 -3094px}.flag.TF{background-position:0 -3108px}.flag.TG{background-position:0 -3122px}.flag.TH{background-position:0 -3136px}.flag.TJ{background-position:0 -3150px}.flag.TK{background-position:0 -3164px}.flag.TL{background-position:0 -3178px}.flag.TM{background-position:0 -3192px}.flag.TN{background-position:0 -3206px}.flag.TO{background-position:0 -3220px}.flag.TR{background-position:0 -3234px}.flag.TT{background-position:0 -3248px}.flag.TV{background-position:0 -3262px}.flag.TW{background-position:0 -3276px}.flag.TZ{background-position:0 -3290px}.flag.UA{background-position:0 -3304px}.flag.UG{background-position:0 -3318px}.flag.UM{background-position:0 -3332px}.flag.UN{background-position:0 -3346px}.flag.US{background-position:0 -3360px}.flag.UY{background-position:0 -3374px}.flag.UZ{background-position:0 -3388px}.flag.VA{background-position:0 -3402px}.flag.VC{background-position:0 -3416px}.flag.VE{background-position:0 -3430px}.flag.VG{background-position:0 -3444px}.flag.VI{background-position:0 -3458px}.flag.VN{background-position:0 -3472px}.flag.VU{background-position:0 -3486px}.flag.WF{background-position:0 -3500px}.flag.WS{background-position:0 -3514px}.flag.XK{background-position:0 -3528px}.flag.YE{background-position:0 -3542px}.flag.YT{background-position:0 -3556px}.flag.ZA{background-position:0 -3570px}.flag.ZM{background-position:0 -3584px}.flag.ZW{background-position:0 -3598px}"]
    }),
    tslib_1.__param(3, Optional()), tslib_1.__param(3, Self()),
    tslib_1.__metadata("design:paramtypes", [CountryCode,
        FocusMonitor,
        ElementRef,
        NgControl])
], NgxMatIntlTelInputComponent);
export { NgxMatIntlTelInputComponent };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdC1pbnRsLXRlbC1pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdmlkYWxzYXN1bi9uZ3gtbWF0LWludGwtdGVsLWlucHV0LyIsInNvdXJjZXMiOlsibGliL25neC1tYXQtaW50bC10ZWwtaW5wdXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxPQUFPLEVBQ1AsVUFBVSxFQUNWLFlBQVksRUFDWixXQUFXLEVBQ1gsS0FBSyxFQUNMLFNBQVMsRUFDVCxNQUFNLEVBQ04sUUFBUSxFQUNSLE1BQU0sRUFDTixJQUFJLEVBQ0wsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFDLGFBQWEsRUFBRSxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4RCxPQUFPLEVBQUMsV0FBVyxFQUFFLFFBQVEsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQzFELE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLG9DQUFvQyxDQUFDO0FBRXhFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBRSwwQkFBMEIsRUFBYyxNQUFNLG1CQUFtQixDQUFDO0FBQzVGLE9BQU8sRUFBQyxpQkFBaUIsRUFBRSxtQkFBbUIsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQ3pFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDN0IsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLG1CQUFtQixDQUFDO1dBWS9CLG9CQUFvQjtBQUtwQyxJQUFhLDJCQUEyQixtQ0FBeEMsTUFBYSwyQkFBMkI7SUFpRXRDLFlBQ1UsZUFBNEIsRUFDNUIsRUFBZ0IsRUFDaEIsS0FBOEIsRUFDWCxTQUFvQjtRQUh2QyxvQkFBZSxHQUFmLGVBQWUsQ0FBYTtRQUM1QixPQUFFLEdBQUYsRUFBRSxDQUFjO1FBQ2hCLFVBQUssR0FBTCxL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OEM7UUFDOUMsUUFBUSxFQUFFLHdCQUF3QjtRQUNsQywrMERBQXNEO1FBRXRELFNBQVMsRUFBRTtZQUNULFdBQVc7WUFDWCxFQUFDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxXQUFXLEVBQUUsNkJBQTJCLEVBQUM7WUFDeEU7Z0JBQ0UsT0FBTyxFQUFFLGFBQWE7Z0JBQ3RCLFFBQVEsSUFBc0I7Z0JBQzlCLEtBQUssRUFBRSxJQUFJO2FBQ1o7U0FDRjs7S0FDRixDQUFDO0lBc0VHLG1CQUFBLFFBQVEsRUFBRSxDQUFBLEVBQUUsbUJBQUEsSUFBSSxFQUFFLENBQUE7NkNBSE0sV0FBVztRQUN4QixZQUFZO1FBQ1QsVUFBVTtRQUNhLFNBQVM7R0FyRXRDLDJCQUEyQixDQWtRdkM7U0FsUVksMkJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBEb0NoZWNrLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RCaW5kaW5nLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFNlbGZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7TkdfVkFMSURBVE9SUywgTmdDb250cm9sfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0NvdW50cnlDb2RlLCBFeGFtcGxlc30gZnJvbSAnLi9kYXRhL2NvdW50cnktY29kZSc7XG5pbXBvcnQge3Bob25lTnVtYmVyVmFsaWRhdG9yfSBmcm9tICcuL25neC1tYXQtaW50bC10ZWwtaW5wdXQudmFsaWRhdG9yJztcbmltcG9ydCB7Q291bnRyeX0gZnJvbSAnLi9tb2RlbC9jb3VudHJ5Lm1vZGVsJztcbmltcG9ydCB7Z2V0RXhhbXBsZU51bWJlciwgcGFyc2VQaG9uZU51bWJlckZyb21TdHJpbmcsIFBob25lTnVtYmVyfSBmcm9tICdsaWJwaG9uZW51bWJlci1qcyc7XG5pbXBvcnQge0Vycm9yU3RhdGVNYXRjaGVyLCBNYXRGb3JtRmllbGRDb250cm9sfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQge2NvZXJjZUJvb2xlYW5Qcm9wZXJ0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7U3ViamVjdH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge0ZvY3VzTW9uaXRvcn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuXG5AQ29tcG9uZW50KHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNvbXBvbmVudC1zZWxlY3RvclxuICBzZWxlY3RvcjogJ25neC1tYXQtaW50bC10ZWwtaW5wdXQnLFxuICB0ZW1wbGF0ZVVybDogJy4vbmd4LW1hdC1pbnRsLXRlbC1pbnB1dC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL25neC1tYXQtaW50bC10ZWwtaW5wdXQuY29tcG9uZW50LmNzcyddLFxuICBwcm92aWRlcnM6IFtcbiAgICBDb3VudHJ5Q29kZSxcbiAgICB7cHJvdmlkZTogTWF0Rm9ybUZpZWxkQ29udHJvbCwgdXNlRXhpc3Rpbmc6IE5neE1hdEludGxUZWxJbnB1dENvbXBvbmVudH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcbiAgICAgIHVzZVZhbHVlOiBwaG9uZU51bWJlclZhbGlkYXRvcixcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hNYXRJbnRsVGVsSW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgRG9DaGVjaywgTWF0Rm9ybUZpZWxkQ29udHJvbDxhbnk+IHtcbiAgc3RhdGljIG5leHRJZCA9IDA7XG5cbiAgQElucHV0KCkgcHJlZmVycmVkQ291bnRyaWVzOiBBcnJheTxzdHJpbmc+ID0gW107XG4gIEBJbnB1dCgpIGVuYWJsZVBsYWNlaG9sZGVyID0gdHJ1ZTtcbiAgQElucHV0KCkgY3NzQ2xhc3M7XG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcbiAgQElucHV0KCkgb25seUNvdW50cmllczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICBASW5wdXQoKSBlcnJvclN0YXRlTWF0Y2hlcjogRXJyb3JTdGF0ZU1hdGNoZXI7XG4gIEBJbnB1dCgpIGVuYWJsZVNlYXJjaCA9IGZhbHNlO1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dmFyaWFibGUtbmFtZVxuICBwcml2YXRlIF9wbGFjZWhvbGRlcjogc3RyaW5nO1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dmFyaWFibGUtbmFtZVxuICBwcml2YXRlIF9yZXF1aXJlZCA9IGZhbHNlO1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dmFyaWFibGUtbmFtZVxuICBwcml2YXRlIF9kaXNhYmxlZCA9IGZhbHNlO1xuICBzdGF0ZUNoYW5nZXMgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBmb2N1c2VkID0gZmFsc2U7XG4gIGVycm9yU3RhdGUgPSBmYWxzZTtcbiAgQEhvc3RCaW5kaW5nKCkgaWQgPSBgbmd4LW1hdC1pbnRsLXRlbC1pbnB1dC0ke05neE1hdEludGxUZWxJbnB1dENvbXBvbmVudC5uZXh0SWQrK31gO1xuICBkZXNjcmliZWRCeSA9ICcnO1xuICBwaG9uZU51bWJlciA9ICcnO1xuICBhbGxDb3VudHJpZXM6IEFycmF5PENvdW50cnk+ID0gW107XG4gIHByZWZlcnJlZENvdW50cmllc0luRHJvcERvd246IEFycmF5PENvdW50cnk+ID0gW107XG4gIHNlbGVjdGVkQ291bnRyeTogQ291bnRyeTtcbiAgbnVtYmVySW5zdGFuY2U6IFBob25lTnVtYmVyO1xuICB2YWx1ZTtcbiAgc2VhcmNoQ3JpdGVyaWE6IHN0cmluZztcbiAgQE91dHB1dCgpXG4gIGNvdW50cnlDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8Q291bnRyeT4gPSBuZXcgRXZlbnRFbWl0dGVyPENvdW50cnk+KCk7XG5cbiAgc3RhdGljIGdldFBob25lTnVtYmVyUGxhY2VIb2xkZXIoY291bnRyeUlTT0NvZGU6IGFueSk6IHN0cmluZyB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBnZXRFeGFtcGxlTnVtYmVyKGNvdW50cnlJU09Db2RlLCBFeGFtcGxlcykubnVtYmVyLnRvU3RyaW5nKCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIGU7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0RnVsbE51bWJlcigpIHtcbiAgICBjb25zdCB2YWwgPSB0aGlzLnBob25lTnVtYmVyLnRyaW0oKTtcbiAgICBjb25zdCBkaWFsQ29kZSA9IHRoaXMuc2VsZWN0ZWRDb3VudHJ5LmRpYWxDb2RlO1xuICAgIGxldCBwcmVmaXg7XG4gICAgY29uc3QgbnVtZXJpY1ZhbCA9IHZhbC5yZXBsYWNlKC9cXEQvZywgJycpO1xuICAgIC8vIG5vcm1hbGl6ZWQgbWVhbnMgZW5zdXJlIHN0YXJ0cyB3aXRoIGEgMSwgc28gd2UgY2FuIG1hdGNoIGFnYWluc3QgdGhlIGZ1bGwgZGlhbCBjb2RlXG4gICAgY29uc3Qgbm9ybWFsaXplZFZhbCA9IG51bWVyaWNWYWwuY2hhckF0KDApID09PSAnMScgPyBudW1lcmljVmFsIDogJzEnLmNvbmNhdChudW1lcmljVmFsKTtcbiAgICBpZiAodmFsLmNoYXJBdCgwKSAhPT0gJysnKSB7XG4gICAgICAvLyB3aGVuIHVzaW5nIHNlcGFyYXRlRGlhbENvZGUsIGl0IGlzIHZpc2libGUgc28gaXMgZWZmZWN0aXZlbHkgcGFydCBvZiB0aGUgdHlwZWQgbnVtYmVyXG4gICAgICBwcmVmaXggPSAnKycuY29uY2F0KGRpYWxDb2RlKTtcbiAgICB9IGVsc2UgaWYgKHZhbCAmJiB2YWwuY2hhckF0KDApICE9PSAnKycgJiYgdmFsLmNoYXJBdCgwKSAhPT0gJzEnICYmIGRpYWxDb2RlICYmIGRpYWxDb2RlLmNoYXJBdCgwKSA9PT0gJzEnXG4gICAgICAmJiBkaWFsQ29kZS5sZW5ndGggPT09IDQgJiYgZGlhbENvZGUgIT09IG5vcm1hbGl6ZWRWYWwuc3Vic3RyKDAsIDQpKSB7XG4gICAgICAvLyBlbnN1cmUgbmF0aW9uYWwgTkFOUCBudW1iZXJzIGNvbnRhaW4gdGhlIGFyZWEgY29kZVxuICAgICAgcHJlZml4ID0gZGlhbENvZGUuc3Vic3RyKDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcmVmaXggPSAnJztcbiAgICB9XG4gICAgcmV0dXJuIHByZWZpeCArIG51bWVyaWNWYWw7XG4gIH1cblxuICBvblRvdWNoZWQgPSAoKSA9PiB7XG4gIH1cblxuICBwcm9wYWdhdGVDaGFuZ2UgPSAoXzogYW55KSA9PiB7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvdW50cnlDb2RlRGF0YTogQ291bnRyeUNvZGUsXG4gICAgcHJpdmF0ZSBmbTogRm9jdXNNb25pdG9yLFxuICAgIHByaXZhdGUgZWxSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgcHVibGljIG5nQ29udHJvbDogTmdDb250cm9sXG4gICkge1xuICAgIGZtLm1vbml0b3IoZWxSZWYsIHRydWUpLnN1YnNjcmliZShvcmlnaW4gPT4ge1xuICAgICAgaWYgKHRoaXMuZm9jdXNlZCAmJiAhb3JpZ2luKSB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgICB9XG4gICAgICB0aGlzLmZvY3VzZWQgPSAhIW9yaWdpbjtcbiAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9KTtcbiAgICB0aGlzLmZldGNoQ291bnRyeURhdGEoKTtcbiAgICBpZiAodGhpcy5uZ0NvbnRyb2wgIT0gbnVsbCkge1xuICAgICAgdGhpcy5uZ0NvbnRyb2wudmFsdWVBY2Nlc3NvciA9IHRoaXM7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMucHJlZmVycmVkQ291bnRyaWVzLmxlbmd0aCkge1xuICAgICAgdGhpcy5wcmVmZXJyZWRDb3VudHJpZXMuZm9yRWFjaChpc28yID0+IHtcbiAgICAgICAgY29uc3QgcHJlZmVycmVkQ291bnRyeSA9IHRoaXMuYWxsQ291bnRyaWVzLmZpbHRlcigoYykgPT4ge1xuICAgICAgICAgIHJldHVybiBjLmlzbzIgPT09IGlzbzI7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnByZWZlcnJlZENvdW50cmllc0luRHJvcERvd24ucHVzaChwcmVmZXJyZWRDb3VudHJ5WzBdKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAodGhpcy5vbmx5Q291bnRyaWVzLmxlbmd0aCkge1xuICAgICAgdGhpcy5hbGxDb3VudHJpZXMgPSB0aGlzLmFsbENvdW50cmllcy5maWx0ZXIoYyA9PiB0aGlzLm9ubHlDb3VudHJpZXMuaW5jbHVkZXMoYy5pc28yKSk7XG4gICAgfVxuICAgIGlmICh0aGlzLm51bWJlckluc3RhbmNlICYmIHRoaXMubnVtYmVySW5zdGFuY2UuY291bnRyeSkge1xuICAgICAgLy8gSWYgYW4gZXhpc3RpbmcgbnVtYmVyIGlzIHByZXNlbnQsIHdlIHVzZSBpdCB0byBkZXRlcm1pbmUgc2VsZWN0ZWRDb3VudHJ5XG4gICAgICB0aGlzLnNlbGVjdGVkQ291bnRyeSA9IHRoaXMuYWxsQ291bnRyaWVzLmZpbmQoYyA9PiBjLmlzbzIgPT09IHRoaXMubnVtYmVySW5zdGFuY2UuY291bnRyeS50b0xvd2VyQ2FzZSgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMucHJlZmVycmVkQ291bnRyaWVzSW5Ecm9wRG93bi5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZENvdW50cnkgPSB0aGlzLnByZWZlcnJlZENvdW50cmllc0luRHJvcERvd25bMF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNlbGVjdGVkQ291bnRyeSA9IHRoaXMuYWxsQ291bnRyaWVzWzBdO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmNvdW50cnlDaGFuZ2VkLmVtaXQodGhpcy5zZWxlY3RlZENvdW50cnkpO1xuICB9XG5cbiAgbmdEb0NoZWNrKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm5nQ29udHJvbCkge1xuICAgICAgdGhpcy5lcnJvclN0YXRlID0gdGhpcy5uZ0NvbnRyb2wuaW52YWxpZCAmJiB0aGlzLm5nQ29udHJvbC50b3VjaGVkO1xuICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBvblBob25lTnVtYmVyQ2hhbmdlKCk6IHZvaWQge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLm51bWJlckluc3RhbmNlID0gcGFyc2VQaG9uZU51bWJlckZyb21TdHJpbmcodGhpcy5fZ2V0RnVsbE51bWJlcigpKTtcbiAgICAgIHRoaXMudmFsdWUgPSB0aGlzLm51bWJlckluc3RhbmNlLm51bWJlcjtcbiAgICAgIC8qaWYgKHRoaXMubnVtYmVySW5zdGFuY2UgJiYgdGhpcy5udW1iZXJJbnN0YW5jZS5pc1ZhbGlkKCkpIHtcbiAgICAgICAgdGhpcy5waG9uZU51bWJlciA9IHRoaXMubnVtYmVySW5zdGFuY2UuZm9ybWF0TmF0aW9uYWwoKTtcbiAgICAgIH0qL1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIGlmIG5vIHBvc3NpYmxlIG51bWJlcnMgYXJlIHRoZXJlLFxuICAgICAgLy8gdGhlbiB0aGUgZnVsbCBudW1iZXIgaXMgcGFzc2VkIHNvIHRoYXQgdmFsaWRhdG9yIGNvdWxkIGJlIHRyaWdnZXJlZCBhbmQgcHJvcGVyIGVycm9yIGNvdWxkIGJlIHNob3duXG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5fZ2V0RnVsbE51bWJlcigpO1xuICAgIH1cbiAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSh0aGlzLnZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkNvdW50cnlTZWxlY3QoY291bnRyeTogQ291bnRyeSwgZWwpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGVkQ291bnRyeSA9IGNvdW50cnk7XG4gICAgdGhpcy5jb3VudHJ5Q2hhbmdlZC5lbWl0KHRoaXMuc2VsZWN0ZWRDb3VudHJ5KTtcbiAgICB0aGlzLm9uUGhvbmVOdW1iZXJDaGFuZ2UoKTtcbiAgICBlbC5mb2N1cygpO1xuICB9XG5cbiAgcHVibGljIG9uSW5wdXRLZXlQcmVzcyhldmVudCk6IHZvaWQge1xuICAgIGNvbnN0IHBhdHRlcm4gPSAvWzAtOStcXC0gXS87XG4gICAgaWYgKCFwYXR0ZXJuLnRlc3QoZXZlbnQua2V5KSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgZmV0Y2hDb3VudHJ5RGF0YSgpOiB2b2lkIHtcbiAgICB0aGlzLmNvdW50cnlDb2RlRGF0YS5hbGxDb3VudHJpZXMuZm9yRWFjaChjID0+IHtcbiAgICAgIGNvbnN0IGNvdW50cnk6IENvdW50cnkgPSB7XG4gICAgICAgIG5hbWU6IGNbMF0udG9TdHJpbmcoKSxcbiAgICAgICAgaXNvMjogY1sxXS50b1N0cmluZygpLFxuICAgICAgICBkaWFsQ29kZTogY1syXS50b1N0cmluZygpLFxuICAgICAgICBwcmlvcml0eTogK2NbM10gfHwgMCxcbiAgICAgICAgYXJlYUNvZGVzOiBjWzRdIGFzIHN0cmluZ1tdIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgZmxhZ0NsYXNzOiBjWzFdLnRvU3RyaW5nKCkudG9VcHBlckNhc2UoKSxcbiAgICAgICAgcGxhY2VIb2xkZXI6ICcnXG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5lbmFibGVQbGFjZWhvbGRlcikge1xuICAgICAgICBjb3VudHJ5LnBsYWNlSG9sZGVyID0gTmd4TWF0SW50bFRlbElucHV0Q29tcG9uZW50LmdldFBob25lTnVtYmVyUGxhY2VIb2xkZXIoY291bnRyeS5pc28yLnRvVXBwZXJDYXNlKCkpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmFsbENvdW50cmllcy5wdXNoKGNvdW50cnkpO1xuICAgIH0pO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAvLyB3aGVuIGZvcm0gaXMgcmVzZXRcbiAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICAgIHRoaXMucmVzZXQoKTtcbiAgICB9XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLm51bWJlckluc3RhbmNlID0gcGFyc2VQaG9uZU51bWJlckZyb21TdHJpbmcodmFsdWUpO1xuICAgICAgaWYgKHRoaXMubnVtYmVySW5zdGFuY2UpIHtcbiAgICAgICAgY29uc3QgY291bnRyeUNvZGUgPSB0aGlzLm51bWJlckluc3RhbmNlLmNvdW50cnk7XG4gICAgICAgIHRoaXMucGhvbmVOdW1iZXIgPSB0aGlzLm51bWJlckluc3RhbmNlLmZvcm1hdE5hdGlvbmFsKCk7XG4gICAgICAgIGlmICghY291bnRyeUNvZGUpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZENvdW50cnkgPSB0aGlzLmFsbENvdW50cmllcy5maW5kKGMgPT4gYy5pc28yID09PSBjb3VudHJ5Q29kZS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgICB0aGlzLmNvdW50cnlDaGFuZ2VkLmVtaXQodGhpcy5zZWxlY3RlZENvdW50cnkpO1xuICAgICAgICB9LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXQgZW1wdHkoKSB7XG4gICAgcmV0dXJuICF0aGlzLnBob25lTnVtYmVyO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5uZ3gtZmxvYXRpbmcnKVxuICBnZXQgc2hvdWxkTGFiZWxGbG9hdCgpIHtcbiAgICByZXR1cm4gdGhpcy5mb2N1c2VkIHx8ICF0aGlzLmVtcHR5O1xuICB9XG5cbiAgQElucHV0KClcbiAgZ2V0IHBsYWNlaG9sZGVyKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3BsYWNlaG9sZGVyO1xuICB9XG5cbiAgc2V0IHBsYWNlaG9sZGVyKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9wbGFjZWhvbGRlciA9IHZhbHVlO1xuICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIGdldCByZXF1aXJlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fcmVxdWlyZWQ7XG4gIH1cblxuICBzZXQgcmVxdWlyZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9yZXF1aXJlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICB9XG5cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgfVxuXG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gIH1cblxuICBzZXREZXNjcmliZWRCeUlkcyhpZHM6IHN0cmluZ1tdKSB7XG4gICAgdGhpcy5kZXNjcmliZWRCeSA9IGlkcy5qb2luKCcgJyk7XG4gIH1cblxuICBvbkNvbnRhaW5lckNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgaWYgKChldmVudC50YXJnZXQgYXMgRWxlbWVudCkudGFnTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnaW5wdXQnKSB7XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gICAgICB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXQnKSEuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLnBob25lTnVtYmVyID0gJyc7XG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UobnVsbCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN0YXRlQ2hhbmdlcy5jb21wbGV0ZSgpO1xuICAgIHRoaXMuZm0uc3RvcE1vbml0b3JpbmcodGhpcy5lbFJlZik7XG4gIH1cblxufVxuIl19