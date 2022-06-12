module.exports = {
    profile: [{
        it: 'As a user I should validate first name',
        options: {
        },
        status: 0
    },
    {
        it: 'As a user I should validate last name',
        options: {
            firstName: 'Test~'
        },
        status: 0
    },
    {
        it: 'As a user I should validate role',
        options: {
            firstName: 'Test~',
            lastName: 'Tes\'me'
        },
        status: 0
    },
    {
        it: 'As a user I should validate desingnation minimum',
        options: {
            firstName: 'Test~',
            lastName: 'Tes\'me',
            designation: 'A',
            countryCode: '91'
        },
        status: 0
    },
    {
        it: 'As a user I should validate desingnation maximum',
        options: {
            firstName: 'Test~',
            lastName: 'Tes\'me',
            designation: '1234567890123456789012345678901',
            countryCode: '91'
        },
        status: 0
    },
    {
        it: 'As a user I should validate county code number',
        options: {
            firstName: 'Test~',
            lastName: 'Tes\'me',
            designation: 'CEO'
        },
        status: 0
    },
    {
        it: 'As a user I should validate phone number',
        options: {
            firstName: 'Test~',
            lastName: 'Tes\'me',
            designation: 'CEO',
            countryCode: '91'
        },
        status: 0
    },
    {
        it: 'As a user I should validate agency name',
        options: {
            firstName: 'Test~',
            lastName: 'Tes\'me',
            designation: 'CEO',
            countryCode: '91',
            phoneNumber: '9925461330'
        },
        status: 0
    },
    {
        it: 'As a user I should validate agency name minimum',
        options: {
            firstName: 'Test~',
            lastName: 'Tes\'me',
            designation: 'CEO',
            countryCode: '91',
            phoneNumber: '9925461330',
            agencyName: 'A'
        },
        status: 0
    },
    {
        it: 'As a user I should validate agency name maximum',
        options: {
            firstName: 'Test~',
            lastName: 'Tes\'me',
            designation: 'CEO',
            countryCode: '91',
            phoneNumber: '9925461330',
            agencyName: '12345678901234567890123456789011234567890123456789012345678901'
        },
        status: 0
    },
    {
        it: 'As a user I should validate agency register number',
        options: {
            firstName: 'Test~',
            lastName: 'Tes\'me',
            designation: 'CEO',
            countryCode: '91',
            phoneNumber: '9925461330',
            agencyName: 'Dream'
        },
        status: 0
    },
    {
        it: 'As a user I should validate agency zip code',
        options: {
            firstName: 'Test~',
            lastName: 'Tes\'me',
            designation: 'CEO',
            countryCode: '91',
            phoneNumber: '9925461330',
            agencyName: 'Dream',
            registeredNumber: 'ABC'
        },
        status: 0
    },
    {
        it: 'As a user I should validate agency address line one',
        options: {
            firstName: 'Test~',
            lastName: 'Tes\'me',
            designation: 'CEO',
            countryCode: '91',
            phoneNumber: '9925461330',
            agencyName: 'Dream',
            registeredNumber: 'ABC',
            agencyPostCode: '380011'
        },
        status: 0
    },
    {
        it: 'As a user I should validate agency city',
        options: {
            firstName: 'Test~',
            lastName: 'Tes\'me',
            designation: 'CEO',
            countryCode: '91',
            phoneNumber: '9925461330',
            agencyName: 'Dream',
            registeredNumber: 'ABC',
            agencyPostCode: '380011',
            agencyAddressLineOne: 'Adddress one'
        },
        status: 0
    },
    {
        it: 'As a user I should validate agency address country',
        options: {
            firstName: 'Test~',
            lastName: 'Tes\'me',
            designation: 'CEO',
            countryCode: '91',
            phoneNumber: '9925461330',
            agencyName: 'Dream',
            registeredNumber: 'ABC',
            agencyPostCode: '380011',
            agencyAddressLineOne: 'Adddress one',
            agencyCity: 'Ahmedabad'
        },
        status: 0
    },
    {
        it: 'As a user I should validate agency register duns',
        options: {
            firstName: 'Test~',
            lastName: 'Tes\'me',
            designation: 'CEO',
            countryCode: '91',
            phoneNumber: '9925461330',
            agencyName: 'Dream',
            registeredNumber: 'ABC',
            agencyPostCode: '380011',
            agencyAddressLineOne: 'Adddress one',
            agencyCity: 'Ahmedabad',
            agencyCountry: 'India'
        },
        status: 0
    },
    {
        it: 'As a user I should validate agency vat number',
        options: {
            firstName: 'Test~',
            lastName: 'Tes\'me',
            designation: 'CEO',
            countryCode: '91',
            phoneNumber: '9925461330',
            agencyName: 'Dream',
            registeredNumber: 'ABC',
            agencyPostCode: '380011',
            agencyAddressLineOne: 'Adddress one',
            agencyCity: 'Ahmedabad',
            agencyCountry: 'India',
            duns: 'Some number'
        },
        status: 0
    },
    {
        it: 'As a user I should validate agency trading name is not passed',
        options: {
            firstName: 'Test~',
            lastName: 'Tes\'me',
            designation: 'CEO',
            countryCode: '91',
            phoneNumber: '9925461330',
            agencyName: 'Dream',
            registeredNumber: 'ABC',
            agencyPostCode: '380011',
            agencyAddressLineOne: 'Adddress one',
            agencyCity: 'Ahmedabad',
            agencyCountry: 'India',
            duns: 'Some number',
            agencyVatNumber: 'CS22'
        },
        status: 0
    },
    {
        it: 'As a user I should validate agency trading name is minimum',
        options: {
            firstName: 'Test~',
            lastName: 'Tes\'me',
            designation: 'CEO',
            countryCode: '91',
            phoneNumber: '9925461330',
            agencyName: 'Dream',
            registeredNumber: 'ABC',
            agencyPostCode: '380011',
            agencyAddressLineOne: 'Adddress one',
            agencyCity: 'Ahmedabad',
            agencyCountry: 'India',
            duns: 'Some number',
            agencyVatNumber: 'CS22',
            tradingName: 'T'
        },
        status: 0
    },
    {
        it: 'As a user I should validate agency trading name is maximum',
        options: {
            firstName: 'Test~',
            lastName: 'Tes\'me',
            designation: 'CEO',
            countryCode: '91',
            phoneNumber: '9925461330',
            agencyName: 'Dream',
            registeredNumber: 'ABC',
            agencyPostCode: '380011',
            agencyAddressLineOne: 'Adddress one',
            agencyCity: 'Ahmedabad',
            agencyCountry: 'India',
            duns: 'Some number',
            agencyVatNumber: 'CS22',
            tradingName: '12345678901234567890123456789011234567890123456789012345678901'
        },
        status: 0
    },
    {
        it: 'As a user I should validate agency trading website',
        options: {
            firstName: 'Test~',
            lastName: 'Tes\'me',
            designation: 'CEO',
            countryCode: '91',
            phoneNumber: '9925461330',
            agencyName: 'Dream',
            registeredNumber: 'ABC',
            agencyPostCode: '380011',
            agencyAddressLineOne: 'Adddress one',
            agencyCity: 'Ahmedabad',
            agencyCountry: 'India',
            duns: 'Some number',
            agencyVatNumber: 'CS22',
            tradingName: 'Trade'
        },
        status: 0
    },
    {
        it: 'As a user I should validate agency trading summary is not passed',
        options: {
            firstName: 'Test~',
            lastName: 'Tes\'me',
            designation: 'CEO',
            countryCode: '91',
            phoneNumber: '9925461330',
            agencyName: 'Dream',
            registeredNumber: 'ABC',
            agencyPostCode: '380011',
            agencyAddressLineOne: 'Adddress one',
            agencyCity: 'Ahmedabad',
            agencyCountry: 'India',
            duns: 'Some number',
            agencyVatNumber: 'CS22',
            tradingName: 'Trade',
            tradingWebsite: 'http://google.com'
        },
        status: 0
    },
    {
        it: 'As a user I should validate agency trading summary is less than minimum',
        options: {
            firstName: 'Test~',
            lastName: 'Tes\'me',
            designation: 'CEO',
            countryCode: '91',
            phoneNumber: '9925461330',
            agencyName: 'Dream',
            registeredNumber: 'ABC',
            agencyPostCode: '380011',
            agencyAddressLineOne: 'Adddress one',
            agencyCity: 'Ahmedabad',
            agencyCountry: 'India',
            duns: 'Some number',
            agencyVatNumber: 'CS22',
            tradingName: 'Trade',
            tradingWebsite: 'http://google.com',
            tradingSummary: 'Lorem ipsum dolor sit amet.'
        },
        status: 0
    },
    {
        it: 'As a user I should validate agency trading summary is greate than maximum',
        options: {
            firstName: 'Test~',
            lastName: 'Tes\'me',
            designation: 'CEO',
            countryCode: '91',
            phoneNumber: '9925461330',
            agencyName: 'Dream',
            registeredNumber: 'ABC',
            agencyPostCode: '380011',
            agencyAddressLineOne: 'Adddress one',
            agencyCity: 'Ahmedabad',
            agencyCountry: 'India',
            duns: 'Some number',
            agencyVatNumber: 'CS22',
            tradingName: 'Trade',
            tradingWebsite: 'http://google.com',
            tradingSummary: `
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at efficitur metus.
            Duis convallis enim eu turpis convallis hendrerit. Quisque vestibulum id magna
            placerat sagittis.Duis vestibulum justo ac mi molestie ultrices. Sed accumsan
            eleifend purus, at dignissim lacus hendrerit eu.Phasellus tempor sollicitudin
            odio ac posuere. Integer eros urna, venenatis ac felis quis, tempus fringilla quam.
            Curabitur gravida faucibus aliquet. Vestibulum elementum laoreet accumsan.
            Suspendisse imperdiet orci ut quam mattis, eu molestie enim viverra. Nulla
            porta eros feugiat porttitor ultrices.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at efficitur metus.
            Duis convallis enim eu turpis convallis hendrerit. Quisque vestibulum id magna
            placerat sagittis.Duis vestibulum justo ac mi molestie ultrices. Sed accumsan
            eleifend purus, at dignissim lacus hendrerit eu.Phasellus tempor sollicitudin
            odio ac posuere. Integer eros urna, venenatis ac felis quis, tempus fringilla quam.
            Curabitur gravida faucibus aliquet. Vestibulum elementum laoreet accumsan.
            Suspendisse imperdiet orci ut quam mattis, eu molestie enim viverra. Nulla
            porta eros feugiat porttitor ultrices.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at efficitur metus.
            Duis convallis enim eu turpis convallis hendrerit. Quisque vestibulum id magna
            placerat sagittis.Duis vestibulum justo ac mi molestie ultrices. Sed accumsan
            eleifend purus, at dignissim lacus hendrerit eu.Phasellus tempor sollicitudin
            odio ac posuere. Integer eros urna, venenatis ac felis quis, tempus fringilla quam.
            Curabitur gravida faucibus aliquet. Vestibulum elementum laoreet accumsan.
            Suspendisse imperdiet orci ut quam mattis, eu molestie enim viverra. Nulla
            porta eros feugiat porttitor ultrices`
        },
        status: 0
    },
    {
        it: 'As a user I should validate agency trading post code',
        options: {
            firstName: 'Test~',
            lastName: 'Tes\'me',
            designation: 'CEO',
            countryCode: '91',
            phoneNumber: '9925461330',
            agencyName: 'Dream',
            registeredNumber: 'ABC',
            agencyPostCode: '380011',
            agencyAddressLineOne: 'Adddress one',
            agencyCity: 'Ahmedabad',
            agencyCountry: 'India',
            duns: 'Some number',
            agencyVatNumber: 'CS22',
            tradingName: 'Trade',
            tradingWebsite: 'http://google.com',
            tradingSummary: 'Lorem ipsum dolor sit amet, consectetur adipiscingLorem ipsum dolor sit amet, consectetur adipiscing'
        },
        status: 0
    },
    {
        it: 'As a user I should validate agency address line one',
        options: {
            firstName: 'Test~',
            lastName: 'Tes\'me',
            designation: 'CEO',
            countryCode: '91',
            phoneNumber: '9925461330',
            agencyName: 'Dream',
            registeredNumber: 'ABC',
            agencyPostCode: '380011',
            agencyAddressLineOne: 'Adddress one',
            agencyCity: 'Ahmedabad',
            agencyCountry: 'India',
            duns: 'Some number',
            agencyVatNumber: 'CS22',
            tradingName: 'Trade',
            tradingWebsite: 'http://google.com',
            tradingSummary: 'Lorem ipsum dolor sit amet, consectetur adipiscingLorem ipsum dolor sit amet, consectetur adipiscing',
            tradingPostCode: '380091'
        },
        status: 0
    },
    {
        it: 'As a user I should validate agency trading city',
        options: {
            firstName: 'Test~',
            lastName: 'Tes\'me',
            designation: 'CEO',
            countryCode: '91',
            phoneNumber: '9925461330',
            agencyName: 'Dream',
            registeredNumber: 'ABC',
            agencyPostCode: '380011',
            agencyAddressLineOne: 'Adddress one',
            agencyCity: 'Ahmedabad',
            agencyCountry: 'India',
            duns: 'Some number',
            agencyVatNumber: 'CS22',
            tradingName: 'Trade',
            tradingWebsite: 'http://google.com',
            tradingSummary: 'Lorem ipsum dolor sit amet, consectetur adipiscingLorem ipsum dolor sit amet, consectetur adipiscing',
            tradingPostCode: '380091',
            tradingAddressLineOne: 'trading address one'
        },
        status: 0
    },
    {
        it: 'As a user I should validate agency trading country',
        options: {
            firstName: 'Test~',
            lastName: 'Tes\'me',
            designation: 'CEO',
            countryCode: '91',
            phoneNumber: '9925461330',
            agencyName: 'Dream',
            registeredNumber: 'ABC',
            agencyPostCode: '380011',
            agencyAddressLineOne: 'Adddress one',
            agencyCity: 'Ahmedabad',
            agencyCountry: 'India',
            duns: 'Some number',
            agencyVatNumber: 'CS22',
            tradingName: 'Trade',
            tradingWebsite: 'http://google.com',
            tradingSummary: 'Lorem ipsum dolor sit amet, consectetur adipiscingLorem ipsum dolor sit amet, consectetur adipiscing',
            tradingPostCode: '380091',
            tradingAddressLineOne: 'trading address one',
            tradingCity: 'Ahmedabad'
        },
        status: 0
    }]
};
