import { __decorate, __metadata, __param } from 'tslib';
import { ɵɵdefineInjectable, Injectable, EventEmitter, ElementRef, Optional, Self, Input, HostBinding, Output, Component, Pipe, NgModule } from '@angular/core';
import { NgControl, NG_VALIDATORS, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { parsePhoneNumber, getExampleNumber, parsePhoneNumberFromString } from 'libphonenumber-js';
import { ErrorStateMatcher, MatFormFieldControl, MatInputModule, MatMenuModule, MatButtonModule, MatDividerModule } from '@angular/material';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Subject } from 'rxjs';
import { FocusMonitor } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';

let NgxMatIntlTelInputService = class NgxMatIntlTelInputService {
    constructor() { }
};
NgxMatIntlTelInputService.ngInjectableDef = ɵɵdefineInjectable({ factory: function NgxMatIntlTelInputService_Factory() { return new NgxMatIntlTelInputService(); }, token: NgxMatIntlTelInputService, providedIn: "root" });
NgxMatIntlTelInputService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [])
], NgxMatIntlTelInputService);

class CountryCode {
    constructor() {
        this.allCountries = [
            ['Afghanistan (‫افغانستان‬‎)', 'af', '93'],
            ['Albania (Shqipëri)', 'al', '355'],
            ['Algeria (‫الجزائر‬‎)', 'dz', '213'],
            ['American Samoa', 'as', '1684'],
            ['Andorra', 'ad', '376'],
            ['Angola', 'ao', '244'],
            ['Anguilla', 'ai', '1264'],
            ['Antigua and Barbuda', 'ag', '1268'],
            ['Argentina', 'ar', '54'],
            ['Armenia (Հայաստան)', 'am', '374'],
            ['Aruba', 'aw', '297'],
            ['Australia', 'au', '61', 0],
            ['Austria (Österreich)', 'at', '43'],
            ['Azerbaijan (Azərbaycan)', 'az', '994'],
            ['Bahamas', 'bs', '1242'],
            ['Bahrain (‫البحرين‬‎)', 'bh', '973'],
            ['Bangladesh (বাংলাদেশ)', 'bd', '880'],
            ['Barbados', 'bb', '1246'],
            ['Belarus (Беларусь)', 'by', '375'],
            ['Belgium (België)', 'be', '32'],
            ['Belize', 'bz', '501'],
            ['Benin (Bénin)', 'bj', '229'],
            ['Bermuda', 'bm', '1441'],
            ['Bhutan (འབྲུག)', 'bt', '975'],
            ['Bolivia', 'bo', '591'],
            ['Bosnia and Herzegovina (Босна и Херцеговина)', 'ba', '387'],
            ['Botswana', 'bw', '267'],
            ['Brazil (Brasil)', 'br', '55'],
            ['British Indian Ocean Territory', 'io', '246'],
            ['British Virgin Islands', 'vg', '1284'],
            ['Brunei', 'bn', '673'],
            ['Bulgaria (България)', 'bg', '359'],
            ['Burkina Faso', 'bf', '226'],
            ['Burundi (Uburundi)', 'bi', '257'],
            ['Cambodia (កម្ពុជា)', 'kh', '855'],
            ['Cameroon (Cameroun)', 'cm', '237'],
            ['Canada', 'ca', '1', 1, ['204', '226', '236', '249', '250', '289', '306', '343', '365', '387', '403', '416', '418', '431', '437',
                    '438', '450', '506', '514', '519', '548', '579', '581', '587', '604', '613', '639', '647', '672', '705', '709', '742',
                    '778', '780', '782', '807', '819', '825', '867', '873', '902', '905']],
            ['Cape Verde (Kabu Verdi)', 'cv', '238'],
            ['Caribbean Netherlands', 'bq', '599', 1],
            ['Cayman Islands', 'ky', '1345'],
            ['Central African Republic (République centrafricaine)', 'cf', '236'],
            ['Chad (Tchad)', 'td', '235'],
            ['Chile', 'cl', '56'],
            ['China (中国)', 'cn', '86'],
            ['Christmas Island', 'cx', '61', 2],
            ['Cocos (Keeling) Islands', 'cc', '61', 1],
            ['Colombia', 'co', '57'],
            ['Comoros (‫جزر القمر‬‎)', 'km', '269'],
            ['Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)', 'cd', '243'],
            ['Congo (Republic) (Congo-Brazzaville)', 'cg', '242'],
            ['Cook Islands', 'ck', '682'],
            ['Costa Rica', 'cr', '506'],
            ['Côte d’Ivoire', 'ci', '225'],
            ['Croatia (Hrvatska)', 'hr', '385'],
            ['Cuba', 'cu', '53'],
            ['Curaçao', 'cw', '599', 0],
            ['Cyprus (Κύπρος)', 'cy', '357'],
            ['Czech Republic (Česká republika)', 'cz', '420'],
            ['Denmark (Danmark)', 'dk', '45'],
            ['Djibouti', 'dj', '253'],
            ['Dominica', 'dm', '1767'],
            ['Dominican Republic (República Dominicana)', 'do', '1', 2, ['809', '829', '849']], ['Ecuador', 'ec', '593'],
            ['Egypt (‫مصر‬‎)', 'eg', '20'],
            ['El Salvador', 'sv', '503'],
            ['Equatorial Guinea (Guinea Ecuatorial)', 'gq', '240'],
            ['Eritrea', 'er', '291'],
            ['Estonia (Eesti)', 'ee', '372'],
            ['Ethiopia', 'et', '251'],
            ['Falkland Islands (Islas Malvinas)', 'fk', '500'],
            ['Faroe Islands (Føroyar)', 'fo', '298'],
            ['Fiji', 'fj', '679'],
            ['Finland (Suomi)', 'fi', '358', 0],
            ['France', 'fr', '33'],
            ['French Guiana (Guyane française)', 'gf', '594'],
            ['French Polynesia (Polynésie française)', 'pf', '689'],
            ['Gabon', 'ga', '241'],
            ['Gambia', 'gm', '220'],
            ['Georgia (საქართველო)', 'ge', '995'],
            ['Germany (Deutschland)', 'de', '49'],
            ['Ghana (Gaana)', 'gh', '233'],
            ['Gibraltar', 'gi', '350'],
            ['Greece (Ελλάδα)', 'gr', '30'],
            ['Greenland (Kalaallit Nunaat)', 'gl', '299'],
            ['Grenada', 'gd', '1473'],
            ['Guadeloupe', 'gp', '590', 0],
            ['Guam', 'gu', '1671'],
            ['Guatemala', 'gt', '502'],
            ['Guernsey', 'gg', '44', 1],
            ['Guinea (Guinée)', 'gn', '224'],
            ['Guinea-Bissau (Guiné Bissau)', 'gw', '245'],
            ['Guyana', 'gy', '592'],
            ['Haiti', 'ht', '509'],
            ['Honduras', 'hn', '504'],
            ['Hong Kong (香港)', 'hk', '852'],
            ['Hungary (Magyarország)', 'hu', '36'],
            ['Iceland (Ísland)', 'is', '354'],
            ['India (भारत)', 'in', '91'],
            ['Indonesia', 'id', '62'],
            ['Iran (‫ایران‬‎)', 'ir', '98'],
            ['Iraq (‫العراق‬‎)', 'iq', '964'],
            ['Ireland', 'ie', '353'],
            ['Isle of Man', 'im', '44', 2],
            ['Israel (‫ישראל‬‎)', 'il', '972'],
            ['Italy (Italia)', 'it', '39', 0],
            ['Jamaica', 'jm', '1', 4, ['876', '658']], ['Japan (日本)', 'jp', '81'],
            ['Jersey', 'je', '44', 3],
            ['Jordan (‫الأردن‬‎)', 'jo', '962'],
            ['Kazakhstan (Казахстан)', 'kz', '7', 1],
            ['Kenya', 'ke', '254'],
            ['Kiribati', 'ki', '686'],
            ['Kosovo', 'xk', '383'],
            ['Kuwait (‫الكويت‬‎)', 'kw', '965'],
            ['Kyrgyzstan (Кыргызстан)', 'kg', '996'],
            ['Laos (ລາວ)', 'la', '856'],
            ['Latvia (Latvija)', 'lv', '371'],
            ['Lebanon (‫لبنان‬‎)', 'lb', '961'],
            ['Lesotho', 'ls', '266'],
            ['Liberia', 'lr', '231'],
            ['Libya (‫ليبيا‬‎)', 'ly', '218'],
            ['Liechtenstein', 'li', '423'],
            ['Lithuania (Lietuva)', 'lt', '370'],
            ['Luxembourg', 'lu', '352'],
            ['Macau (澳門)', 'mo', '853'],
            ['Macedonia (FYROM) (Македонија)', 'mk', '389'],
            ['Madagascar (Madagasikara)', 'mg', '261'],
            ['Malawi', 'mw', '265'],
            ['Malaysia', 'my', '60'],
            ['Maldives', 'mv', '960'],
            ['Mali', 'ml', '223'],
            ['Malta', 'mt', '356'],
            ['Marshall Islands', 'mh', '692'],
            ['Martinique', 'mq', '596'],
            ['Mauritania (‫موريتانيا‬‎)', 'mr', '222'],
            ['Mauritius (Moris)', 'mu', '230'],
            ['Mayotte', 'yt', '262', 1],
            ['Mexico (México)', 'mx', '52'],
            ['Micronesia', 'fm', '691'],
            ['Moldova (Republica Moldova)', 'md', '373'],
            ['Monaco', 'mc', '377'],
            ['Mongolia (Монгол)', 'mn', '976'],
            ['Montenegro (Crna Gora)', 'me', '382'],
            ['Montserrat', 'ms', '1664'],
            ['Morocco (‫المغرب‬‎)', 'ma', '212', 0],
            ['Mozambique (Moçambique)', 'mz', '258'],
            ['Myanmar (Burma) (မြန်မာ)', 'mm', '95'],
            ['Namibia (Namibië)', 'na', '264'],
            ['Nauru', 'nr', '674'],
            ['Nepal (नेपाल)', 'np', '977'],
            ['Netherlands (Nederland)', 'nl', '31'],
            ['New Caledonia (Nouvelle-Calédonie)', 'nc', '687'],
            ['New Zealand', 'nz', '64'],
            ['Nicaragua', 'ni', '505'],
            ['Niger (Nijar)', 'ne', '227'],
            ['Nigeria', 'ng', '234'],
            ['Niue', 'nu', '683'],
            ['Norfolk Island', 'nf', '672'],
            ['North Korea (조선 민주주의 인민 공화국)', 'kp', '850'],
            ['Northern Mariana Islands', 'mp', '1670'],
            ['Norway (Norge)', 'no', '47', 0],
            ['Oman (‫عُمان‬‎)', 'om', '968'],
            ['Pakistan (‫پاکستان‬‎)', 'pk', '92'],
            ['Palau', 'pw', '680'],
            ['Palestine (‫فلسطين‬‎)', 'ps', '970'],
            ['Panama (Panamá)', 'pa', '507'],
            ['Papua New Guinea', 'pg', '675'],
            ['Paraguay', 'py', '595'],
            ['Peru (Perú)', 'pe', '51'],
            ['Philippines', 'ph', '63'],
            ['Poland (Polska)', 'pl', '48'],
            ['Portugal', 'pt', '351'],
            ['Puerto Rico', 'pr', '1', 3, ['787', '939']], ['Qatar (‫قطر‬‎)', 'qa', '974'],
            ['Réunion (La Réunion)', 're', '262', 0],
            ['Romania (România)', 'ro', '40'],
            ['Russia (Россия)', 'ru', '7', 0],
            ['Rwanda', 'rw', '250'],
            ['Saint Barthélemy', 'bl', '590', 1],
            ['Saint Helena', 'sh', '290'],
            ['Saint Kitts and Nevis', 'kn', '1869'],
            ['Saint Lucia', 'lc', '1758'],
            ['Saint Martin (Saint-Martin (partie française))', 'mf', '590', 2],
            ['Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)', 'pm', '508'],
            ['Saint Vincent and the Grenadines', 'vc', '1784'],
            ['Samoa', 'ws', '685'],
            ['San Marino', 'sm', '378'],
            ['São Tomé and Príncipe (São Tomé e Príncipe)', 'st', '239'],
            ['Saudi Arabia (‫المملكة العربية السعودية‬‎)', 'sa', '966'],
            ['Senegal (Sénégal)', 'sn', '221'],
            ['Serbia (Србија)', 'rs', '381'],
            ['Seychelles', 'sc', '248'],
            ['Sierra Leone', 'sl', '232'],
            ['Singapore', 'sg', '65'],
            ['Sint Maarten', 'sx', '1721'],
            ['Slovakia (Slovensko)', 'sk', '421'],
            ['Slovenia (Slovenija)', 'si', '386'],
            ['Solomon Islands', 'sb', '677'],
            ['Somalia (Soomaaliya)', 'so', '252'],
            ['South Africa', 'za', '27'],
            ['South Korea (대한민국)', 'kr', '82'],
            ['South Sudan (‫جنوب السودان‬‎)', 'ss', '211'],
            ['Spain (España)', 'es', '34'],
            ['Sri Lanka (ශ්‍රී ලංකාව)', 'lk', '94'],
            ['Sudan (‫السودان‬‎)', 'sd', '249'],
            ['Suriname', 'sr', '597'],
            ['Svalbard and Jan Mayen', 'sj', '47', 1],
            ['Swaziland', 'sz', '268'],
            ['Sweden (Sverige)', 'se', '46'],
            ['Switzerland (Schweiz)', 'ch', '41'],
            ['Syria (‫سوريا‬‎)', 'sy', '963'],
            ['Taiwan (台灣)', 'tw', '886'],
            ['Tajikistan', 'tj', '992'],
            ['Tanzania', 'tz', '255'],
            ['Thailand (ไทย)', 'th', '66'],
            ['Timor-Leste', 'tl', '670'],
            ['Togo', 'tg', '228'],
            ['Tokelau', 'tk', '690'],
            ['Tonga', 'to', '676'],
            ['Trinidad and Tobago', 'tt', '1868'],
            ['Tunisia (‫تونس‬‎)', 'tn', '216'],
            ['Turkey (Türkiye)', 'tr', '90'],
            ['Turkmenistan', 'tm', '993'],
            ['Turks and Caicos Islands', 'tc', '1649'],
            ['Tuvalu', 'tv', '688'],
            ['U.S. Virgin Islands', 'vi', '1340'],
            ['Uganda', 'ug', '256'],
            ['Ukraine (Україна)', 'ua', '380'],
            ['United Arab Emirates (‫الإمارات العربية المتحدة‬‎)', 'ae', '971'],
            ['United Kingdom', 'gb', '44', 0],
            ['United States', 'us', '1', 0],
            ['Uruguay', 'uy', '598'],
            ['Uzbekistan (Oʻzbekiston)', 'uz', '998'],
            ['Vanuatu', 'vu', '678'],
            ['Vatican City (Città del Vaticano)', 'va', '39', 1],
            ['Venezuela', 've', '58'],
            ['Vietnam (Việt Nam)', 'vn', '84'],
            ['Wallis and Futuna (Wallis-et-Futuna)', 'wf', '681'],
            ['Western Sahara (‫الصحراء الغربية‬‎)', 'eh', '212', 1],
            ['Yemen (‫اليمن‬‎)', 'ye', '967'],
            ['Zambia', 'zm', '260'],
            ['Zimbabwe', 'zw', '263'],
            ['Åland Islands', 'ax', '358', 1]
        ];
    }
}
const Examples = {
    '001': '001',
    AC: '40123',
    AD: '312345',
    AE: '501234567',
    AF: '701234567',
    AG: '2684641234',
    AI: '2642351234',
    AL: '662123456',
    AM: '77123456',
    AO: '923123456',
    AR: '91123456789',
    AS: '6847331234',
    AT: '664123456',
    AU: '412345678',
    AW: '5601234',
    AX: '412345678',
    AZ: '401234567',
    BA: '61123456',
    BB: '2462501234',
    BD: '1812345678',
    BE: '470123456',
    BF: '70123456',
    BG: '48123456',
    BH: '36001234',
    BI: '79561234',
    BJ: '90011234',
    BL: '690001234',
    BM: '4413701234',
    BN: '7123456',
    BO: '71234567',
    BQ: '3181234',
    BR: '11961234567',
    BS: '2423591234',
    BT: '17123456',
    BW: '71123456',
    BY: '294911911',
    BZ: '6221234',
    CA: '5062345678',
    CC: '412345678',
    CD: '991234567',
    CF: '70012345',
    CG: '061234567',
    CH: '781234567',
    CI: '01234567',
    CK: '71234',
    CL: '221234567',
    CM: '671234567',
    CN: '13123456789',
    CO: '3211234567',
    CR: '83123456',
    CU: '51234567',
    CV: '9911234',
    CW: '95181234',
    CX: '412345678',
    CY: '96123456',
    CZ: '601123456',
    DE: '15123456789',
    DJ: '77831001',
    DK: '32123456',
    DM: '7672251234',
    DO: '8092345678',
    DZ: '551234567',
    EC: '991234567',
    EE: '51234567',
    EG: '1001234567',
    EH: '650123456',
    ER: '7123456',
    ES: '612345678',
    ET: '911234567',
    FI: '412345678',
    FJ: '7012345',
    FK: '51234',
    FM: '3501234',
    FO: '211234',
    FR: '612345678',
    GA: '06031234',
    GB: '7400123456',
    GD: '4734031234',
    GE: '555123456',
    GF: '694201234',
    GG: '7781123456',
    GH: '231234567',
    GI: '57123456',
    GL: '221234',
    GM: '3012345',
    GN: '601123456',
    GP: '690001234',
    GQ: '222123456',
    GR: '6912345678',
    GT: '51234567',
    GU: '6713001234',
    GW: '955012345',
    GY: '6091234',
    HK: '51234567',
    HN: '91234567',
    HR: '921234567',
    HT: '34101234',
    HU: '201234567',
    ID: '812345678',
    IE: '850123456',
    IL: '502345678',
    IM: '7924123456',
    IN: '8123456789',
    IO: '3801234',
    IQ: '7912345678',
    IR: '9123456789',
    IS: '6111234',
    IT: '3123456789',
    JE: '7797712345',
    JM: '8762101234',
    JO: '790123456',
    JP: '9012345678',
    KE: '712123456',
    KG: '700123456',
    KH: '91234567',
    KI: '72001234',
    KM: '3212345',
    KN: '8697652917',
    KP: '1921234567',
    KR: '1000000000',
    KW: '50012345',
    KY: '3453231234',
    KZ: '7710009998',
    LA: '2023123456',
    LB: '71123456',
    LC: '7582845678',
    LI: '660234567',
    LK: '712345678',
    LR: '770123456',
    LS: '50123456',
    LT: '61234567',
    LU: '628123456',
    LV: '21234567',
    LY: '912345678',
    MA: '650123456',
    MC: '612345678',
    MD: '62112345',
    ME: '67622901',
    MF: '690001234',
    MG: '321234567',
    MH: '2351234',
    MK: '72345678',
    ML: '65012345',
    MM: '92123456',
    MN: '88123456',
    MO: '66123456',
    MP: '6702345678',
    MQ: '696201234',
    MR: '22123456',
    MS: '6644923456',
    MT: '96961234',
    MU: '52512345',
    MV: '7712345',
    MW: '991234567',
    MX: '12221234567',
    MY: '123456789',
    MZ: '821234567',
    NA: '811234567',
    NC: '751234',
    NE: '93123456',
    NF: '381234',
    NG: '8021234567',
    NI: '81234567',
    NL: '612345678',
    NO: '40612345',
    NP: '9841234567',
    NR: '5551234',
    NU: '8884012',
    NZ: '211234567',
    OM: '92123456',
    PA: '61234567',
    PE: '912345678',
    PF: '87123456',
    PG: '70123456',
    PH: '9051234567',
    PK: '3012345678',
    PL: '512345678',
    PM: '551234',
    PR: '7872345678',
    PS: '599123456',
    PT: '912345678',
    PW: '6201234',
    PY: '961456789',
    QA: '33123456',
    RE: '692123456',
    RO: '712034567',
    RS: '601234567',
    RU: '9123456789',
    RW: '720123456',
    SA: '512345678',
    SB: '7421234',
    SC: '2510123',
    SD: '911231234',
    SE: '701234567',
    SG: '81234567',
    SH: '51234',
    SI: '31234567',
    SJ: '41234567',
    SK: '912123456',
    SL: '25123456',
    SM: '66661212',
    SN: '701234567',
    SO: '71123456',
    SR: '7412345',
    SS: '977123456',
    ST: '9812345',
    SV: '70123456',
    SX: '7215205678',
    SY: '944567890',
    SZ: '76123456',
    TA: '8999',
    TC: '6492311234',
    TD: '63012345',
    TG: '90112345',
    TH: '812345678',
    TJ: '917123456',
    TK: '7290',
    TL: '77212345',
    TM: '66123456',
    TN: '20123456',
    TO: '7715123',
    TR: '5012345678',
    TT: '8682911234',
    TV: '901234',
    TW: '912345678',
    TZ: '621234567',
    UA: '501234567',
    UG: '712345678',
    US: '2015550123',
    UY: '94231234',
    UZ: '912345678',
    VA: '3123456789',
    VC: '7844301234',
    VE: '4121234567',
    VG: '2843001234',
    VI: '3406421234',
    VN: '912345678',
    VU: '5912345',
    WF: '501234',
    WS: '7212345',
    XK: '43201234',
    YE: '712345678',
    YT: '639012345',
    ZA: '711234567',
    ZM: '955123456',
    ZW: '712345678'
};

const phoneNumberValidator = (control) => {
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

var NgxMatIntlTelInputComponent_1;
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
__decorate([
    Input(),
    __metadata("design:type", Array)
], NgxMatIntlTelInputComponent.prototype, "preferredCountries", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NgxMatIntlTelInputComponent.prototype, "enablePlaceholder", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NgxMatIntlTelInputComponent.prototype, "cssClass", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], NgxMatIntlTelInputComponent.prototype, "name", void 0);
__decorate([
    Input(),
    __metadata("design:type", Array)
], NgxMatIntlTelInputComponent.prototype, "onlyCountries", void 0);
__decorate([
    Input(),
    __metadata("design:type", ErrorStateMatcher)
], NgxMatIntlTelInputComponent.prototype, "errorStateMatcher", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NgxMatIntlTelInputComponent.prototype, "enableSearch", void 0);
__decorate([
    HostBinding(),
    __metadata("design:type", Object)
], NgxMatIntlTelInputComponent.prototype, "id", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], NgxMatIntlTelInputComponent.prototype, "countryChanged", void 0);
__decorate([
    HostBinding('class.ngx-floating'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NgxMatIntlTelInputComponent.prototype, "shouldLabelFloat", null);
__decorate([
    Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], NgxMatIntlTelInputComponent.prototype, "placeholder", null);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], NgxMatIntlTelInputComponent.prototype, "required", null);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], NgxMatIntlTelInputComponent.prototype, "disabled", null);
NgxMatIntlTelInputComponent = NgxMatIntlTelInputComponent_1 = __decorate([
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
    __param(3, Optional()), __param(3, Self()),
    __metadata("design:paramtypes", [CountryCode,
        FocusMonitor,
        ElementRef,
        NgControl])
], NgxMatIntlTelInputComponent);

let SearchPipe = class SearchPipe {
    // country | search:'searchCriteria'
    transform(country, searchCriteria) {
        if (!searchCriteria || searchCriteria === '') {
            return true;
        }
        return country.toLowerCase().includes(searchCriteria.toLowerCase());
    }
};
SearchPipe = __decorate([
    Pipe({
        name: 'search'
    })
], SearchPipe);

let NgxMatIntlTelInputModule = class NgxMatIntlTelInputModule {
};
NgxMatIntlTelInputModule = __decorate([
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

/*
 * Public API Surface of ngx-mat-intl-tel-input
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NgxMatIntlTelInputComponent, NgxMatIntlTelInputModule, NgxMatIntlTelInputService, ɵ0, CountryCode as ɵa, phoneNumberValidator as ɵb, SearchPipe as ɵc };
//# sourceMappingURL=vidalsasun-ngx-mat-intl-tel-input.js.map
