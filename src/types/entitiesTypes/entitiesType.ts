import { selectDataType } from "types/utilTypes"

export enum currenciesEnum {
  usd = "usd",
  rub = "rub",
  eur = "eur"
}

export enum timeMeasuresEnum {
  day = "day",
  hour = "hour"
}

export enum priceMeasureEnum {
  day = "day",
  hour = "hour",
  week = "week",
  person = "person",
  rent = "rent"
}

export enum payWaysEnum {
  usd = "usd",
  visa = "visa",
  masterCard = "masterCard"
}

export type vehiclesByCountry = {
  name: string;
  id: number;
  counter: number;
}

export interface countriesWithBothCounters extends selectDataType {
  jets_count?: number;
  yachts_count?: number;
}

export type countriesEnum =
  "238-lithuania"|

  "129-bolivia"|

  "097-sint maarten"|

  "038-republic of macedonia"|

  "007-jersey"|

  "091-ossetia"|

  "026-trinidad and tobago"|

  "259-slovenia"|

  "150-british virgin islands"|

  "070-tuvalu"|

  "113-sierra leone"|

  "045-liechtenstein"|

  "042-yemen"|

  "106-turks and caicos"|

  "227-scotland"|

  "228-serbia"|

  "142-basque country"|

  "165-poland"|

  "155-brunei"|

  "078-greenland"|

  "163-aruba"|

  "197-france"|

  "202-czech republic"|

  "043-liberia"|

  "242-mauritius"|

  "133-cuba"|

  "118-macao"|

  "075-gabon"|

  "089-nauru"|

  "001-paraguay"|

  "104-tokelau"|

  "030-moldova"|

  "187-philippines"|

  "082-guyana"|

  "247-zambia"|

  "209-belgium"|

  "181-cook islands"|

  "184-egypt"|

  "100-somaliland"|

  "149-bosnia and herzegovina"|

  "083-kiribati"|

  "140-afghanistan"|

  "183-taiwan"|

  "013-samoa"|

  "090-northern marianas islands"|

  "195-united arab emirates"|

  "060-sao tome and prince"|

  "171-central african republic"|

  "160-andorra"|

  "121-england"|

  "081-guernsey"|

  "061-sardinia"|

  "044-russia"|

  "251-malta"|

  "175-anguilla"|

  "230-spain"|

  "120-palau"|

  "080-guam"|

  "166-cape verde"|

  "131-costa rica"|

  "112-seychelles"|

  "243-namibia"|

  "128-croatia"|

  "003-democratic republic of congo"|

  "108-guinea"|

  "232-pakistan"|

  "029-maldives"|

  "154-turkey"|

  "188-south africa"|

  "220-monaco"|

  "033-mexico"|

  "216-panama"|

  "177-american samoa"|

  "008-madagascar"|

  "246-wales"|

  "200-iran"|

  "024-swaziland"|

  "127-bulgaria"|

  "182-morocco"|

  "214-ecuador"|

  "144-burkina faso"|

  "010-mongolia"|

  "207-malaysia"|

  "189-peru"|

  "252-european union"|

  "164-benin"|

  "167-chad"|

  "031-montenegro"|

  "257-mozambique"|

  "098-portugal"|

  "021-republic of the congo"|

  "117-fiji"|

  "245-dominican republic"|

  "176-switzerland"|

  "174-corsica"|

  "124-tonga"|

  "066-canada"|

  "153-bonaire"|

  "058-niger"|

  "191-denmark"|

  "069-turkmenistan"|

  "109-vietnam"|

  "122-Rapa Nui"|

  "241-japan"|

  "114-vanuatu"|

  "244-qatar"|

  "138-angola"|

  "014-haiti"|

  "148-bermuda"|

  "219-south korea"|

  "015-isle of man"|

  "110-united kingdom"|

  "005-georgia"|

  "047-san marino"|

  "263-italy"|

  "093-pitcairn islands"|

  "053-kyrgyzstan"|

  "116-faroe islands"|

  "002-senegal"|

  "059-norfolk island"|

  "151-barbados"|

  "198-ukraine"|

  "036-libya"|

  "143-australia"|

  "169-british indian ocean territory"|

  "255-lebanon"|

  "035-East Timor"|

  "076-gibraltar"|

  "226-north korea"|

  "086-melilla"|

  "101-south sudan"|

  "087-montserrat"|

  "208-germany"|

  "224-syria"|

  "254-uganda"|

  "146-bahrain"|

  "240-luxembourg"|

  "229-kazakhstan"|

  "236-honduras"|

  "017-lesotho"|

  "199-argentina"|

  "050-djibouti"|

  "141-armenia"|

  "094-saba island"|

  "018-rwanda"|

  "201-colombia"|

  "210-hungary"|

  "185-indonesia"|

  "016-ivory coast"|

  "223-guatemala"|

  "063-somalia"|

  "250-tunisia"|

  "027-french polynesia"|

  "105-transnistria"|

  "054-mali"|

  "126-galapagos islands"|

  "092-palestine"|

  "123-st lucia"|

  "157-aland islands"|

  "048-st barts"|

  "233-cyprus"|

  "203-israel"|

  "073-virgin islands"|

  "217-united nations"|

  "190-sweden"|

  "215-new zealand"|

  "107-orkney islands"|

  "211-finland"|

  "162-abkhazia"|

  "186-united states"|

  "032-papua new guinea"|

  "218-slovakia"|

  "077-netherlands"|

  "135-botswana"|

  "172-comoros"|

  "004-estonia"|

  "103-gambia"|

  "248-el salvador"|

  "235-myanmar"|

  "125-martinique"|

  "011-china"|

  "152-belarus"|

  "012-nepal"|

  "041-uzbekist??n"|

  "249-nicaragua"|

  "262-ethiopia"|

  "039-sahrawi arab democratic republic"|

  "134-bangladesh"|

  "161-balearic islands"|

  "102-st vincent and the grenadines"|

  "136-Algeria"|

  "040-sudan"|

  "192-greece"|

  "071-vatican city"|

  "239-hawaii"|

  "057-micronesia"|

  "258-puerto rico"|

  "237-jamaica"|

  "180-cocos island"|

  "194-laos"|

  "085-mauritania"|

  "099-solomon islands"|

  "055-india"|

  "168-bhutan"|

  "213-romania"|

  "139-british columbia"|

  "204-saudi arabia"|

  "022-brazil"|

  "037-nato"|

  "051-eritrea"|

  "221-jordan"|

  "020-equatorial guinea"|

  "095-saint kitts and nevis"|

  "025-tajikistan"|

  "173-canary islands"|

  "145-albania"|

  "009-malawi"|

  "115-dominica"|

  "068-togo"|

  "205-norway"|

  "079-grenada"|

  "028-madeira"|

  "132-singapore"|

  "064-suriname"|

  "052-guinea bissau"|

  "046-northern cyprus"|

  "222-iceland"|

  "049-curacao"|

  "158-antigua and barbuda"|

  "206-venezuela"|

  "111-kosovo"|

  "159-burundi"|

  "212-chile"|

  "170-cayman islands"|

  "096-sint eustatius"|

  "130-cambodia"|

  "074-falkland islands"|

  "019-zimbabwe"|

  "062-bhutan"|

  "253-nigeria"|

  "234-kenya"|

  "065-azores islands"|

  "261-oman"|

  "137-azerbaijan"|

  "178-ceuta"|

  "056-marshall island"|

  "179-christmas island"|

  "225-uruguay"|

  "023-sri lanka"|

  "006-ghana"|

  "231-latvia"|

  "260-tanzania"|

  "067-bahamas"|

  "034-tibet"|

  "147-belize"|

  "072-austria"|

  "193-ireland"|

  "088-thailand"|

  "119-niue"|

  "156-cameroon"|

  "084-kuwait"|

  "256-iraq"|

  "196-hong kong"


