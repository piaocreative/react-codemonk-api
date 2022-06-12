module.exports = (swaggerJson) => {

    swaggerJson.paths['/talent/certifications'] = {
        'get': {
            'tags': [
                'Talent'
            ],
            'description': 'Talent certifications',
            'summary': 'Talent certifications',
            'parameters': [
                {
                    'in': 'query',
                    'name': 'q',
                    'description': 'search'
                }
            ],
            'responses': {
                200: {
                    'description': 'Success',
                    'schema': {
                        $ref: '#/definitions/certifications'
                    }
                },
                400: {
                    'description': 'Validation failed.',
                    'schema': {
                        '$ref': '#/definitions/errorBadRequest'
                    }
                },
                422: {
                    'description': 'User duplicate',
                    'schema': {
                        '$ref': '#/definitions/errorUserRegister'
                    }
                },
                500: {
                    'description': 'Internal Server Error',
                    'schema': {
                        '$ref': '#/definitions/unexpextedError'
                    }
                }
            }
        }
    };

    swaggerJson.definitions.certifications = {
        'type': 'object',
        'properties': {
            'status': {
                'type': 'number',
                'example': 1
            },
            'data': {
                'type': 'array',
                'example': [
                    "A+ (COMPTIA)",
                    "ADOBE CERTIFIED ASSOCIATE (ACA)",
                    "ADOBE CERTIFIED EXPERT (ACE)",
                    "ADOBE CERTIFICATION EXAMS (ALL)",
                    "ADVANCED INFORMATION SECURITY (AIS)",
                    "AMAZON WEB SERVICES CERTIFICATION (AWS)",
                    "APPLE CERTIFIED SUPPORT PROFESSIONAL (ACSP) – MACOS",
                    "APPLE CERTIFIED SUPPORT ESSENTIALS 10.14 – MACOS",
                    "APPLE CERTIFIED PRO (FOR FINAL CUT PRO X AND LOGIC PRO X)",
                    "APPLECARE SERVICE CERTIFICATIONS – ACMT & ACIT",
                    "ARUBA CERTIFIED CLEARPASS EXPERT (ACCX)",
                    "CERTIFIED BROADCAST NETWORKING TECHNOLOGIST (CBNT)",
                    "CERTIFIED COMPUTER EXAMINER (CCE)",
                    "CERTIFIED ELECTRONICS TECHNICIAN BY THE ETA (CET)",
                    "CERTIFIED TECHNICAL TRAINER (CTT)",
                    "CERTIFIED HARDWARE ASSET MANAGEMENT PROFESSIONAL (CHAMP)",
                    "CERTIFIED INFORMATION SYSTEMS AUDITOR (CISA)",
                    "CERTIFIED INFORMATION SECURITY MANAGER (CISM)",
                    "CERTIFIED INFORMATION SYSTEMS SECURITY PROFESSIONAL (CISSP)",
                    "CERTIFIED INFORMATION TECHNOLOGY ASSET MANAGER (CITAM)",
                    "CERTIFIED INTERNET WEBMASTER (CIW)",
                    "CERTIFIED SOFTWARE ASSET MANAGER (CSAM)",
                    "CERTIFIED SOFTWARE DEVELOPER PROGRAM (CSDP)",
                    "CERTIFIED SOFTWARE TESTER (CSTE)",
                    "CISCO CERTIFIED TECHNICIANS (CCT)",
                    "CISCO CERTIFIED ENTRY NETWORKING TECHNICIAN (CCENT)",
                    "CISCO CERTIFIED NETWORK ASSOCIATE (CCNA)",
                    "CISCO CERTIFIED NETWORK PROFESSIONAL ENTERPRISE (CCNP)",
                    "CISCO CERTIFIED ARCHITECT (CCAR)",
                    "CITRIX CERTIFIED EXPERT – VIRTUALIZATION (CCE-V)",
                    "CITRIX CERTIFIED PROFESSIONAL – VIRTUALIZATION (CCP-V)",
                    "CITRIX CERTIFIED ASSOCIATE – VIRTUALIZATION (CCA-V)",
                    "CITRIX CERTIFIED PROFESSIONAL – NETWORKING (CCP-N)",
                    "CITRIX CERTIFIED ASSOCIATE – NETWORKING (CCA-N)",
                    "CITRIX NETSCALER SD-WAN CERTIFIED (CC-SDWAN)",
                    "CITRIX CERTIFIED PROFESSIONAL – MOBILITY (CCP-M)",
                    "CHECK POINT CERTIFIED SECURITY ADMINISTRATOR (CCSA) R80",
                    "CHECK POINT CERTIFIED SECURITY (OTHER)",
                    "CLOUD+ (COMPTIA)",
                    "CSA+ (COMPTIA)",
                    "DELL EMC CERTIFICATION (ALL CERTIFICATIONS: EMCISA, EMCDS, VCE-CIA)",
                    "GIAC SECURITY EXPERT (GSE)",
                    "GOOGLE CLOUD CERTIFICATION (ASSOCIATE)",
                    "GOOGLE CLOUD CERTIFICATION (PROFESSIONAL)",
                    "GOOGLE CLOUD CERTIFICATION (G SUITE)",
                    "HELP DESK INSTITUTE (HDI)",
                    "HPE CERTIFICATION (ALL)",
                    "IBM PROFESSIONAL CERTIFICATIONS",
                    "INTERNET AND COMPUTING CORE CERTIFICATION (IC3)",
                    "LINUX+ (COMPTIA)",
                    "MICROSOFT TECHNOLOGY ASSOCIATE (MTA)",
                    "MICROSOFT CERTIFIED SOLUTIONS ASSOCIATE (MCSA)",
                    "MICROSOFT CERTIFIED SOLUTIONS EXPERT (MCSE)",
                    "MICROSOFT CERTIFICATIONS (ALL)",
                    "MICRO FOCUS IDENTITY MANAGER CERTIFICATION",
                    "MICRO FOCUS OPEN ENTERPRISE SERVER CERTIFICATION (OES)",
                    "MICRO FOCUS ZENWORKS CERTIFICATION",
                    "ORACLE CRM ON DEMAND CERTIFICATIONS",
                    "ORACLE CLOUD CERTIFICATIONS",
                    "ORACLE DATABASE CERTIFICATIONS",
                    "ORACLE JAVA CERTIFICATIONS",
                    "PALO ALTO NETWORKS CERTIFIED CYBERSECURITY ASSOCIATE (PCCSA)",
                    "PALO ALTO NETWORKS CERTIFIED NETWORK SECURITY ADMINISTRATOR (PCNSA)",
                    "PROJECT+ (COMPTIA)",
                    "RED HAT CERTIFIED SYSTEM ADMINISTRATOR (RHCSA)",
                    "RED HAT OPENSTACK CERTIFICATIONS",
                    "SALESFORCE CERTIFIED TECHNICAL ARCHITECT (CERTIFICATION)",
                    "SALESFORCE APPLICATION ARCHITECT (CERTIFICATION)",
                    "SALESFORCE SYSTEM ARCHITECT (CERTIFICATION)",
                    "SCRUM CERTIFICATION",
                    "SCRUM ALLIANCE – CERTIFIED SCRUMMASTER (CSM)",
                    "SCRUM ALLIANCE – CERTIFIED SCRUM DEVELOPERS (CSD)",
                    "SCRUM.ORG – PROFESSIONAL SCRUM MASTER (PSM)",
                    "SIMPLILEARN – AGILE SCRUM MASTER (ASM)",
                    "SERVER+ (COMPTIA)"
                ]
            },
            'message': {
                'type': 'string',
                'example': 'success'
            }
        }
    };

    return swaggerJson;
};
