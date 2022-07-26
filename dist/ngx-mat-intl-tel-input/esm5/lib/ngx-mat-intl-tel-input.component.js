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
var ɵ0 = phoneNumberValidator;
var NgxMatIntlTelInputComponent = /** @class */ (function () {
    function NgxMatIntlTelInputComponent(countryCodeData, fm, elRef, ngControl) {
        var _this = this;
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
        this.id = "ngx-mat-intl-tel-input-" + NgxMatIntlTelInputComponent_1.nextId++;
        this.describedBy = '';
        this.phoneNumber = '';
        this.allCountries = [];
        this.preferredCountriesInDropDown = [];
        this.countryChanged = new EventEmitter();
        this.onTouched = function () {
        };
        this.propagateChange = function (_) {
        };
        fm.monitor(elRef, true).subscribe(function (origin) {
            if (_this.focused && !origin) {
                _this.onTouched();
            }
            _this.focused = !!origin;
            _this.stateChanges.next();
        });
        this.fetchCountryData();
        if (this.ngControl != null) {
            this.ngControl.valueAccessor = this;
        }
    }
    NgxMatIntlTelInputComponent_1 = NgxMatIntlTelInputComponent;
    NgxMatIntlTelInputComponent.getPhoneNumberPlaceHolder = function (countryISOCode) {
        try {
            return getExampleNumber(countryISOCode, Examples).number.toString();
        }
        catch (e) {
            return e;
        }
    };
    NgxMatIntlTelInputComponent.prototype._getFullNumber = function () {
        var val = this.phoneNumber.trim();
        var dialCode = this.selectedCountry.dialCode;
        var prefix;
        var numericVal = val.replace(/\D/g, '');
        // normalized means ensure starts with a 1, so we can match against the full dial code
        var normalizedVal = numericVal.charAt(0) === '1' ? numericVal : '1'.concat(numericVal);
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
    };
    NgxMatIntlTelInputComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.preferredCountries.length) {
            this.preferredCountries.forEach(function (iso2) {
                var preferredCountry = _this.allCountries.filter(function (c) {
                    return c.iso2 === iso2;
                });
                _this.preferredCountriesInDropDown.push(preferredCountry[0]);
            });
        }
        if (this.onlyCountries.length) {
            this.allCountries = this.allCountries.filter(function (c) { return _this.onlyCountries.includes(c.iso2); });
        }
        if (this.numberInstance && this.numberInstance.country) {
            // If an existing number is present, we use it to determine selectedCountry
            this.selectedCountry = this.allCountries.find(function (c) { return c.iso2 === _this.numberInstance.country.toLowerCase(); });
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
    };
    NgxMatIntlTelInputComponent.prototype.ngDoCheck = function () {
        if (this.ngControl) {
            this.errorState = this.ngControl.invalid && this.ngControl.touched;
            this.stateChanges.next();
        }
    };
    NgxMatIntlTelInputComponent.prototype.onPhoneNumberChange = function () {
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
    };
    NgxMatIntlTelInputComponent.prototype.onCountrySelect = function (country, el) {
        this.selectedCountry = country;
        this.countryChanged.emit(this.selectedCountry);
        this.onPhoneNumberChange();
        el.focus();
    };
    NgxMatIntlTelInputComponent.prototype.onInputKeyPress = function (event) {
        var pattern = /[0-9+\- ]/;
        if (!pattern.test(event.key)) {
            event.preventDefault();
        }
    };
    NgxMatIntlTelInputComponent.prototype.fetchCountryData = function () {
        var _this = this;
        this.countryCodeData.allCountries.forEach(function (c) {
            var country = {
                name: c[0].toString(),
                iso2: c[1].toString(),
                dialCode: c[2].toString(),
                priority: +c[3] || 0,
                areaCodes: c[4] || undefined,
                flagClass: c[1].toString().toUpperCase(),
                placeHolder: ''
            };
            if (_this.enablePlaceholder) {
                country.placeHolder = NgxMatIntlTelInputComponent_1.getPhoneNumberPlaceHolder(country.iso2.toUpperCase());
            }
            _this.allCountries.push(country);
        });
    };
    NgxMatIntlTelInputComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    NgxMatIntlTelInputComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    NgxMatIntlTelInputComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    NgxMatIntlTelInputComponent.prototype.writeValue = function (value) {
        var _this = this;
        // when form is reset
        if (value === null) {
            this.reset();
        }
        if (value) {
            this.numberInstance = parsePhoneNumberFromString(value);
            if (this.numberInstance) {
                var countryCode_1 = this.numberInstance.country;
                this.phoneNumber = this.numberInstance.formatNational();
                if (!countryCode_1) {
                    return;
                }
                setTimeout(function () {
                    _this.selectedCountry = _this.allCountries.find(function (c) { return c.iso2 === countryCode_1.toLowerCase(); });
                    _this.countryChanged.emit(_this.selectedCountry);
                }, 1);
            }
        }
    };
    Object.defineProperty(NgxMatIntlTelInputComponent.prototype, "empty", {
        get: function () {
            return !this.phoneNumber;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxMatIntlTelInputComponent.prototype, "shouldLabelFloat", {
        get: function () {
            return this.focused || !this.empty;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxMatIntlTelInputComponent.prototype, "placeholder", {
        get: function () {
            return this._placeholder;
        },
        set: function (value) {
            this._placeholder = value;
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxMatIntlTelInputComponent.prototype, "required", {
        get: function () {
            return this._required;
        },
        set: function (value) {
            this._required = coerceBooleanProperty(value);
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxMatIntlTelInputComponent.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            this._disabled = coerceBooleanProperty(value);
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    NgxMatIntlTelInputComponent.prototype.setDescribedByIds = function (ids) {
        this.describedBy = ids.join(' ');
    };
    NgxMatIntlTelInputComponent.prototype.onContainerClick = function (event) {
        if (event.target.tagName.toLowerCase() !== 'input') {
            // tslint:disable-next-line:no-non-null-assertion
            this.elRef.nativeElement.querySelector('input').focus();
        }
    };
    NgxMatIntlTelInputComponent.prototype.reset = function () {
        this.phoneNumber = '';
        this.propagateChange(null);
    };
    NgxMatIntlTelInputComponent.prototype.ngOnDestroy = function () {
        this.stateChanges.complete();
        this.fm.stopMonitoring(this.elRef);
    };
    var NgxMatIntlTelInputComponent_1;
    NgxMatIntlTelInputComponent.nextId = 0;
    NgxMatIntlTelInputComponent.ctorParameters = function () { return [
        { type: CountryCode },
        { type: FocusMonitor },
        { type: ElementRef },
        { type: NgControl, decorators: [{ type: Optional }, { type: Self }] }
    ]; };
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
    return NgxMatIntlTelInputComponent;
}());
export { NgxMatIntlTelInputComponent };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LW1hdC1pbnRsLXRlbC1pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdmlkYWxzYXN1bi9uZ3gtbWF0LWludGwtdGVsLWlucHV0LyIsInNvdXJjZXMiOlsibGliL25neC1tYXQtaW50bC10ZWwtaW5wdXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULE9BQU8sRUFDUCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFdBQVcsRUFDWCxLQUFLLEVBQ0wsU0FBUyxFQUNULE1BQU0sRUFDTixRQUFRLEVBQ1IsTUFBTSxFQUNOLElBQUksRUFDTCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsYUFBYSxFQUFFLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3hELE9BQU8sRUFBQyxXQUFXLEVBQUUsUUFBUSxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDMUQsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFFeEUsT0FBTyxFQUFDLGdCQUFnQixFQUFFLDBCQUEwQixFQUFjLE1BQU0sbUJBQW1CLENBQUM7QUFDNUYsT0FBTyxFQUFDLGlCQUFpQixFQUFFLG1CQUFtQixFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDekUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDNUQsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUM3QixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7U0FZL0Isb0JBQW9CO0FBS3BDO0lBaUVFLHFDQUNVLGVBQTRCLEVBQzVCLEVBQWdCLEVBQ2hCLEtBQThCLEVBQ1gsU0FBb0I7UUFKakQsaUJBaUJDO1FBaEJTLG9CQUFlLEdBQWYsZUFBZSxDQUFhO1FBQzVCLE9BQUUsR0FBRixFQUFFLENBQWM7UUFDaEIsVUFBSyxHQUFMLEtBQUssQ0FBeUI7UUFDWCxjQUFT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b0IsQ0FBQzs7O3VFQUdqQztJQUdEO1FBREMsS0FBSyxFQUFFOzs7a0VBR1A7SUFRRDtRQURDLEtBQUssRUFBRTs7OytEQUdQO0lBUUQ7UUFEQyxLQUFLLEVBQUU7OzsrREFHUDtJQXRPVSwyQkFBMkI7UUFmdkMsU0FBUyxDQUFDO1lBQ1QsOENBQThDO1lBQzlDLFFBQVEsRUFBRSx3QkFBd0I7WUFDbEMsKzBEQUFzRDtZQUV0RCxTQUFTLEVBQUU7Z0JBQ1QsV0FBVztnQkFDWCxFQUFDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxXQUFXLEVBQUUsNkJBQTJCLEVBQUM7Z0JBQ3hFO29CQUNFLE9BQU8sRUFBRSxhQUFhO29CQUN0QixRQUFRLElBQXNCO29CQUM5QixLQUFLLEVBQUUsSUFBSTtpQkFDWjthQUNGOztTQUNGLENBQUM7UUFzRUcsbUJBQUEsUUFBUSxFQUFFLENBQUEsRUFBRSxtQkFBQSxJQUFJLEVBQUUsQ0FBQTtpREFITSxXQUFXO1lBQ3hCLFlBQVk7WUFDVCxVQUFVO1lBQ2EsU0FBUztPQXJFdEMsMkJBQTJCLENBa1F2QztJQUFELGtDQUFDO0NBQUEsQUFsUUQsSUFrUUM7U0FsUVksMkJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBEb0NoZWNrLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RCaW5kaW5nLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFNlbGZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7TkdfVkFMSURBVE9SUywgTmdDb250cm9sfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0NvdW50cnlDb2RlLCBFeGFtcGxlc30gZnJvbSAnLi9kYXRhL2NvdW50cnktY29kZSc7XG5pbXBvcnQge3Bob25lTnVtYmVyVmFsaWRhdG9yfSBmcm9tICcuL25neC1tYXQtaW50bC10ZWwtaW5wdXQudmFsaWRhdG9yJztcbmltcG9ydCB7Q291bnRyeX0gZnJvbSAnLi9tb2RlbC9jb3VudHJ5Lm1vZGVsJztcbmltcG9ydCB7Z2V0RXhhbXBsZU51bWJlciwgcGFyc2VQaG9uZU51bWJlckZyb21TdHJpbmcsIFBob25lTnVtYmVyfSBmcm9tICdsaWJwaG9uZW51bWJlci1qcyc7XG5pbXBvcnQge0Vycm9yU3RhdGVNYXRjaGVyLCBNYXRGb3JtRmllbGRDb250cm9sfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQge2NvZXJjZUJvb2xlYW5Qcm9wZXJ0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7U3ViamVjdH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge0ZvY3VzTW9uaXRvcn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuXG5AQ29tcG9uZW50KHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNvbXBvbmVudC1zZWxlY3RvclxuICBzZWxlY3RvcjogJ25neC1tYXQtaW50bC10ZWwtaW5wdXQnLFxuICB0ZW1wbGF0ZVVybDogJy4vbmd4LW1hdC1pbnRsLXRlbC1pbnB1dC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL25neC1tYXQtaW50bC10ZWwtaW5wdXQuY29tcG9uZW50LmNzcyddLFxuICBwcm92aWRlcnM6IFtcbiAgICBDb3VudHJ5Q29kZSxcbiAgICB7cHJvdmlkZTogTWF0Rm9ybUZpZWxkQ29udHJvbCwgdXNlRXhpc3Rpbmc6IE5neE1hdEludGxUZWxJbnB1dENvbXBvbmVudH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcbiAgICAgIHVzZVZhbHVlOiBwaG9uZU51bWJlclZhbGlkYXRvcixcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hNYXRJbnRsVGVsSW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgRG9DaGVjaywgTWF0Rm9ybUZpZWxkQ29udHJvbDxhbnk+IHtcbiAgc3RhdGljIG5leHRJZCA9IDA7XG5cbiAgQElucHV0KCkgcHJlZmVycmVkQ291bnRyaWVzOiBBcnJheTxzdHJpbmc+ID0gW107XG4gIEBJbnB1dCgpIGVuYWJsZVBsYWNlaG9sZGVyID0gdHJ1ZTtcbiAgQElucHV0KCkgY3NzQ2xhc3M7XG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcbiAgQElucHV0KCkgb25seUNvdW50cmllczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICBASW5wdXQoKSBlcnJvclN0YXRlTWF0Y2hlcjogRXJyb3JTdGF0ZU1hdGNoZXI7XG4gIEBJbnB1dCgpIGVuYWJsZVNlYXJjaCA9IGZhbHNlO1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dmFyaWFibGUtbmFtZVxuICBwcml2YXRlIF9wbGFjZWhvbGRlcjogc3RyaW5nO1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dmFyaWFibGUtbmFtZVxuICBwcml2YXRlIF9yZXF1aXJlZCA9IGZhbHNlO1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dmFyaWFibGUtbmFtZVxuICBwcml2YXRlIF9kaXNhYmxlZCA9IGZhbHNlO1xuICBzdGF0ZUNoYW5nZXMgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBmb2N1c2VkID0gZmFsc2U7XG4gIGVycm9yU3RhdGUgPSBmYWxzZTtcbiAgQEhvc3RCaW5kaW5nKCkgaWQgPSBgbmd4LW1hdC1pbnRsLXRlbC1pbnB1dC0ke05neE1hdEludGxUZWxJbnB1dENvbXBvbmVudC5uZXh0SWQrK31gO1xuICBkZXNjcmliZWRCeSA9ICcnO1xuICBwaG9uZU51bWJlciA9ICcnO1xuICBhbGxDb3VudHJpZXM6IEFycmF5PENvdW50cnk+ID0gW107XG4gIHByZWZlcnJlZENvdW50cmllc0luRHJvcERvd246IEFycmF5PENvdW50cnk+ID0gW107XG4gIHNlbGVjdGVkQ291bnRyeTogQ291bnRyeTtcbiAgbnVtYmVySW5zdGFuY2U6IFBob25lTnVtYmVyO1xuICB2YWx1ZTtcbiAgc2VhcmNoQ3JpdGVyaWE6IHN0cmluZztcbiAgQE91dHB1dCgpXG4gIGNvdW50cnlDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8Q291bnRyeT4gPSBuZXcgRXZlbnRFbWl0dGVyPENvdW50cnk+KCk7XG5cbiAgc3RhdGljIGdldFBob25lTnVtYmVyUGxhY2VIb2xkZXIoY291bnRyeUlTT0NvZGU6IGFueSk6IHN0cmluZyB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBnZXRFeGFtcGxlTnVtYmVyKGNvdW50cnlJU09Db2RlLCBFeGFtcGxlcykubnVtYmVyLnRvU3RyaW5nKCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIGU7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0RnVsbE51bWJlcigpIHtcbiAgICBjb25zdCB2YWwgPSB0aGlzLnBob25lTnVtYmVyLnRyaW0oKTtcbiAgICBjb25zdCBkaWFsQ29kZSA9IHRoaXMuc2VsZWN0ZWRDb3VudHJ5LmRpYWxDb2RlO1xuICAgIGxldCBwcmVmaXg7XG4gICAgY29uc3QgbnVtZXJpY1ZhbCA9IHZhbC5yZXBsYWNlKC9cXEQvZywgJycpO1xuICAgIC8vIG5vcm1hbGl6ZWQgbWVhbnMgZW5zdXJlIHN0YXJ0cyB3aXRoIGEgMSwgc28gd2UgY2FuIG1hdGNoIGFnYWluc3QgdGhlIGZ1bGwgZGlhbCBjb2RlXG4gICAgY29uc3Qgbm9ybWFsaXplZFZhbCA9IG51bWVyaWNWYWwuY2hhckF0KDApID09PSAnMScgPyBudW1lcmljVmFsIDogJzEnLmNvbmNhdChudW1lcmljVmFsKTtcbiAgICBpZiAodmFsLmNoYXJBdCgwKSAhPT0gJysnKSB7XG4gICAgICAvLyB3aGVuIHVzaW5nIHNlcGFyYXRlRGlhbENvZGUsIGl0IGlzIHZpc2libGUgc28gaXMgZWZmZWN0aXZlbHkgcGFydCBvZiB0aGUgdHlwZWQgbnVtYmVyXG4gICAgICBwcmVmaXggPSAnKycuY29uY2F0KGRpYWxDb2RlKTtcbiAgICB9IGVsc2UgaWYgKHZhbCAmJiB2YWwuY2hhckF0KDApICE9PSAnKycgJiYgdmFsLmNoYXJBdCgwKSAhPT0gJzEnICYmIGRpYWxDb2RlICYmIGRpYWxDb2RlLmNoYXJBdCgwKSA9PT0gJzEnXG4gICAgICAmJiBkaWFsQ29kZS5sZW5ndGggPT09IDQgJiYgZGlhbENvZGUgIT09IG5vcm1hbGl6ZWRWYWwuc3Vic3RyKDAsIDQpKSB7XG4gICAgICAvLyBlbnN1cmUgbmF0aW9uYWwgTkFOUCBudW1iZXJzIGNvbnRhaW4gdGhlIGFyZWEgY29kZVxuICAgICAgcHJlZml4ID0gZGlhbENvZGUuc3Vic3RyKDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcmVmaXggPSAnJztcbiAgICB9XG4gICAgcmV0dXJuIHByZWZpeCArIG51bWVyaWNWYWw7XG4gIH1cblxuICBvblRvdWNoZWQgPSAoKSA9PiB7XG4gIH1cblxuICBwcm9wYWdhdGVDaGFuZ2UgPSAoXzogYW55KSA9PiB7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvdW50cnlDb2RlRGF0YTogQ291bnRyeUNvZGUsXG4gICAgcHJpdmF0ZSBmbTogRm9jdXNNb25pdG9yLFxuICAgIHByaXZhdGUgZWxSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgcHVibGljIG5nQ29udHJvbDogTmdDb250cm9sXG4gICkge1xuICAgIGZtLm1vbml0b3IoZWxSZWYsIHRydWUpLnN1YnNjcmliZShvcmlnaW4gPT4ge1xuICAgICAgaWYgKHRoaXMuZm9jdXNlZCAmJiAhb3JpZ2luKSB7XG4gICAgICAgIHRoaXMub25Ub3VjaGVkKCk7XG4gICAgICB9XG4gICAgICB0aGlzLmZvY3VzZWQgPSAhIW9yaWdpbjtcbiAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9KTtcbiAgICB0aGlzLmZldGNoQ291bnRyeURhdGEoKTtcbiAgICBpZiAodGhpcy5uZ0NvbnRyb2wgIT0gbnVsbCkge1xuICAgICAgdGhpcy5uZ0NvbnRyb2wudmFsdWVBY2Nlc3NvciA9IHRoaXM7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMucHJlZmVycmVkQ291bnRyaWVzLmxlbmd0aCkge1xuICAgICAgdGhpcy5wcmVmZXJyZWRDb3VudHJpZXMuZm9yRWFjaChpc28yID0+IHtcbiAgICAgICAgY29uc3QgcHJlZmVycmVkQ291bnRyeSA9IHRoaXMuYWxsQ291bnRyaWVzLmZpbHRlcigoYykgPT4ge1xuICAgICAgICAgIHJldHVybiBjLmlzbzIgPT09IGlzbzI7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnByZWZlcnJlZENvdW50cmllc0luRHJvcERvd24ucHVzaChwcmVmZXJyZWRDb3VudHJ5WzBdKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAodGhpcy5vbmx5Q291bnRyaWVzLmxlbmd0aCkge1xuICAgICAgdGhpcy5hbGxDb3VudHJpZXMgPSB0aGlzLmFsbENvdW50cmllcy5maWx0ZXIoYyA9PiB0aGlzLm9ubHlDb3VudHJpZXMuaW5jbHVkZXMoYy5pc28yKSk7XG4gICAgfVxuICAgIGlmICh0aGlzLm51bWJlckluc3RhbmNlICYmIHRoaXMubnVtYmVySW5zdGFuY2UuY291bnRyeSkge1xuICAgICAgLy8gSWYgYW4gZXhpc3RpbmcgbnVtYmVyIGlzIHByZXNlbnQsIHdlIHVzZSBpdCB0byBkZXRlcm1pbmUgc2VsZWN0ZWRDb3VudHJ5XG4gICAgICB0aGlzLnNlbGVjdGVkQ291bnRyeSA9IHRoaXMuYWxsQ291bnRyaWVzLmZpbmQoYyA9PiBjLmlzbzIgPT09IHRoaXMubnVtYmVySW5zdGFuY2UuY291bnRyeS50b0xvd2VyQ2FzZSgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMucHJlZmVycmVkQ291bnRyaWVzSW5Ecm9wRG93bi5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZENvdW50cnkgPSB0aGlzLnByZWZlcnJlZENvdW50cmllc0luRHJvcERvd25bMF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNlbGVjdGVkQ291bnRyeSA9IHRoaXMuYWxsQ291bnRyaWVzWzBdO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmNvdW50cnlDaGFuZ2VkLmVtaXQodGhpcy5zZWxlY3RlZENvdW50cnkpO1xuICB9XG5cbiAgbmdEb0NoZWNrKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm5nQ29udHJvbCkge1xuICAgICAgdGhpcy5lcnJvclN0YXRlID0gdGhpcy5uZ0NvbnRyb2wuaW52YWxpZCAmJiB0aGlzLm5nQ29udHJvbC50b3VjaGVkO1xuICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBvblBob25lTnVtYmVyQ2hhbmdlKCk6IHZvaWQge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLm51bWJlckluc3RhbmNlID0gcGFyc2VQaG9uZU51bWJlckZyb21TdHJpbmcodGhpcy5fZ2V0RnVsbE51bWJlcigpKTtcbiAgICAgIHRoaXMudmFsdWUgPSB0aGlzLm51bWJlckluc3RhbmNlLm51bWJlcjtcbiAgICAgIC8qaWYgKHRoaXMubnVtYmVySW5zdGFuY2UgJiYgdGhpcy5udW1iZXJJbnN0YW5jZS5pc1ZhbGlkKCkpIHtcbiAgICAgICAgdGhpcy5waG9uZU51bWJlciA9IHRoaXMubnVtYmVySW5zdGFuY2UuZm9ybWF0TmF0aW9uYWwoKTtcbiAgICAgIH0qL1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIGlmIG5vIHBvc3NpYmxlIG51bWJlcnMgYXJlIHRoZXJlLFxuICAgICAgLy8gdGhlbiB0aGUgZnVsbCBudW1iZXIgaXMgcGFzc2VkIHNvIHRoYXQgdmFsaWRhdG9yIGNvdWxkIGJlIHRyaWdnZXJlZCBhbmQgcHJvcGVyIGVycm9yIGNvdWxkIGJlIHNob3duXG4gICAgICB0aGlzLnZhbHVlID0gdGhpcy5fZ2V0RnVsbE51bWJlcigpO1xuICAgIH1cbiAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSh0aGlzLnZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkNvdW50cnlTZWxlY3QoY291bnRyeTogQ291bnRyeSwgZWwpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGVkQ291bnRyeSA9IGNvdW50cnk7XG4gICAgdGhpcy5jb3VudHJ5Q2hhbmdlZC5lbWl0KHRoaXMuc2VsZWN0ZWRDb3VudHJ5KTtcbiAgICB0aGlzLm9uUGhvbmVOdW1iZXJDaGFuZ2UoKTtcbiAgICBlbC5mb2N1cygpO1xuICB9XG5cbiAgcHVibGljIG9uSW5wdXRLZXlQcmVzcyhldmVudCk6IHZvaWQge1xuICAgIGNvbnN0IHBhdHRlcm4gPSAvWzAtOStcXC0gXS87XG4gICAgaWYgKCFwYXR0ZXJuLnRlc3QoZXZlbnQua2V5KSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgZmV0Y2hDb3VudHJ5RGF0YSgpOiB2b2lkIHtcbiAgICB0aGlzLmNvdW50cnlDb2RlRGF0YS5hbGxDb3VudHJpZXMuZm9yRWFjaChjID0+IHtcbiAgICAgIGNvbnN0IGNvdW50cnk6IENvdW50cnkgPSB7XG4gICAgICAgIG5hbWU6IGNbMF0udG9TdHJpbmcoKSxcbiAgICAgICAgaXNvMjogY1sxXS50b1N0cmluZygpLFxuICAgICAgICBkaWFsQ29kZTogY1syXS50b1N0cmluZygpLFxuICAgICAgICBwcmlvcml0eTogK2NbM10gfHwgMCxcbiAgICAgICAgYXJlYUNvZGVzOiBjWzRdIGFzIHN0cmluZ1tdIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgZmxhZ0NsYXNzOiBjWzFdLnRvU3RyaW5nKCkudG9VcHBlckNhc2UoKSxcbiAgICAgICAgcGxhY2VIb2xkZXI6ICcnXG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5lbmFibGVQbGFjZWhvbGRlcikge1xuICAgICAgICBjb3VudHJ5LnBsYWNlSG9sZGVyID0gTmd4TWF0SW50bFRlbElucHV0Q29tcG9uZW50LmdldFBob25lTnVtYmVyUGxhY2VIb2xkZXIoY291bnRyeS5pc28yLnRvVXBwZXJDYXNlKCkpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmFsbENvdW50cmllcy5wdXNoKGNvdW50cnkpO1xuICAgIH0pO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAvLyB3aGVuIGZvcm0gaXMgcmVzZXRcbiAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICAgIHRoaXMucmVzZXQoKTtcbiAgICB9XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLm51bWJlckluc3RhbmNlID0gcGFyc2VQaG9uZU51bWJlckZyb21TdHJpbmcodmFsdWUpO1xuICAgICAgaWYgKHRoaXMubnVtYmVySW5zdGFuY2UpIHtcbiAgICAgICAgY29uc3QgY291bnRyeUNvZGUgPSB0aGlzLm51bWJlckluc3RhbmNlLmNvdW50cnk7XG4gICAgICAgIHRoaXMucGhvbmVOdW1iZXIgPSB0aGlzLm51bWJlckluc3RhbmNlLmZvcm1hdE5hdGlvbmFsKCk7XG4gICAgICAgIGlmICghY291bnRyeUNvZGUpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZENvdW50cnkgPSB0aGlzLmFsbENvdW50cmllcy5maW5kKGMgPT4gYy5pc28yID09PSBjb3VudHJ5Q29kZS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgICB0aGlzLmNvdW50cnlDaGFuZ2VkLmVtaXQodGhpcy5zZWxlY3RlZENvdW50cnkpO1xuICAgICAgICB9LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXQgZW1wdHkoKSB7XG4gICAgcmV0dXJuICF0aGlzLnBob25lTnVtYmVyO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5uZ3gtZmxvYXRpbmcnKVxuICBnZXQgc2hvdWxkTGFiZWxGbG9hdCgpIHtcbiAgICByZXR1cm4gdGhpcy5mb2N1c2VkIHx8ICF0aGlzLmVtcHR5O1xuICB9XG5cbiAgQElucHV0KClcbiAgZ2V0IHBsYWNlaG9sZGVyKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3BsYWNlaG9sZGVyO1xuICB9XG5cbiAgc2V0IHBsYWNlaG9sZGVyKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9wbGFjZWhvbGRlciA9IHZhbHVlO1xuICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIGdldCByZXF1aXJlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fcmVxdWlyZWQ7XG4gIH1cblxuICBzZXQgcmVxdWlyZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9yZXF1aXJlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICB9XG5cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgfVxuXG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gIH1cblxuICBzZXREZXNjcmliZWRCeUlkcyhpZHM6IHN0cmluZ1tdKSB7XG4gICAgdGhpcy5kZXNjcmliZWRCeSA9IGlkcy5qb2luKCcgJyk7XG4gIH1cblxuICBvbkNvbnRhaW5lckNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgaWYgKChldmVudC50YXJnZXQgYXMgRWxlbWVudCkudGFnTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnaW5wdXQnKSB7XG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gICAgICB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXQnKSEuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLnBob25lTnVtYmVyID0gJyc7XG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UobnVsbCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN0YXRlQ2hhbmdlcy5jb21wbGV0ZSgpO1xuICAgIHRoaXMuZm0uc3RvcE1vbml0b3JpbmcodGhpcy5lbFJlZik7XG4gIH1cblxufVxuIl19