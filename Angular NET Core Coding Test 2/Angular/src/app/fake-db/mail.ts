export class MailFakeDb {
    public static mails = [
        {
            'id': '15459251a6d6b397565',
            'from': {
                'name': 'Yu Zheaaa',
                'email': 'Yu_Zheaaa.com'
            },
            'to': [
                {
                    'name': 'Test',
                    'email': 'test@test1.com'
                }
            ],
            'subject': 'FY2020 FA Ad-hoc Asset Verification On Oct 21 2020',
            'message': '<p>Dear Custodian,</p><p>Please be informed that the AVE Task create for your action. Go to AMS -> AssetVerification Module for the details.</p>',
            'time': '21 Oct',
            'read': false,
            'starred': false,
            'important': true,
            'hasAttachments': false,
            'labels': [
                1
            ],
            'folder': 0
        },
        {
            'id': '154588a0864d2881124',
            'from': {
                'name': 'Tan Koh',
                'email': 'Tan Kohaaa.com'
            },
            'to': [
                {
                    'name': 'me',
                    'email': 'test@test2.com'
                }
            ],
            'subject': 'Pending Asset Return Acknowledgement',
            'message': '<p>Dear Custodian,</p><p>Please be informed that following items issued to you are pending your return acknowledgement. Go to AMS -> AssetLoan Module for the details.</p>',
            'time': '21 Oct',
            'read': false,
            'starred': false,
            'important': false,
            'hasAttachments': false,
            'labels': [
                0
            ],
            'folder': 0
        },
        {
            'id': '15453ba60d3baa5daaf',
            'from': {
                'name': 'Tan Koh',
                'email': 'Tan Kohaaa.com'
            },
            'to': [
                {
                    'name': 'Test',
                    'email': 'test@test1.com'
                }
            ],
            'subject': 'FY2020 LVA Staff Declaration On Oct 20 2020',
            'message': '<p>Dear Custodian,</p><p>Please be informed that the AVE Task create for your action. Go to AMS -> AssetVerification Module for the details.</p>',
            'time': '20 Oct',
            'read': false,
            'starred': false,
            'important': true,
            'hasAttachments': false,
            'labels': [
                1
            ],
            'folder': 0
        },
        {
            'id': '15453a06c08fb021776',
            'from': {
                'name': 'VTan Koh',
                'email': 'VTan Kohaaa.com'
            },
            'to': [
                {
                    'name': 'me',
                    'email': 'test@test1.com'
                }
            ],
            'subject': 'Pending Asset Lost Acknowledgement',
            'message': '<p>Dear Custodian,</p><p>Please be informed that following items issued to you are pending your acknowledgement. Go to AMS -> Lost/Damaged Asset Module for the details.</p>',
            'time': '24 Sep',
            'read': false,
            'starred': false,
            'important': false,
            'hasAttachments': false,
            'labels': [
                3
            ],
            'folder': 0
        },
        {
            'id': '154537435d5b32bf11a',
            'from': {
                'name': 'ViTan Koh',
                'email': 'ViTan Kohaaa.com'
            },
            'to': [
                {
                    'name': 'me',
                    'email': 'test@test1.com'
                }
            ],
            'subject': 'Pending Asset Servicing Acknowledgement',
            'message': '<p>Dear Custodian,</p><p>Please be informed that following items issued to you are pending your acknowledgement. Go to AMS -> AssetServicing Module for the details.</p>',
            'time': '10 Sep',
            'read': false,
            'starred': false,
            'important': false,
            'hasAttachments': false,
            'labels': [
                2
            ],
            'folder': 0
        },
        {
            'id': '1544e43dcdae6ebf876',
            'from': {
                'name': 'test',
                'email': 'test@test1.com'
            },
            'to': [
                {
                    'name': 'Tan Koh',
                    'email': 'Tan Kohaaa.com'
                }
            ],
            'subject': 'Pending Asset Servicing Acknowledgement',
            'message': '<p>Dear Tan Koh,</p><p>Please be informed that following items issued to you are pending your acknowledgement. Go to AMS -> AssetServicing Module for the details.</p>',
            'time': '4 Sep',
            'read': false,
            'starred': false,
            'important': false,
            'hasAttachments': false,
            'labels': [
                2
            ],
            'folder': 1
        },
    ];

    public static folders = [
        {
            'id': 1,
            'handle': 'inbox',
            'title': 'Inbox',
            'icon': 'inbox'
        },
        {
            'id': 0,
            'handle': 'sent',
            'title': 'Sent',
            'icon': 'send'
        },
        // {
        //     'id'    : 2,
        //     'handle': 'drafts',
        //     'title' : 'Drafts',
        //     'icon'  : 'email_open'
        // },
        // {
        //     'id'    : 3,
        //     'handle': 'spam',
        //     'title' : 'Spam',
        //     'icon'  : 'error'
        // },
        // {
        //     'id'    : 4,
        //     'handle': 'trash',
        //     'title' : 'Trash',
        //     'icon'  : 'delete'
        // }
    ];

    public static filters = [
        {
            'id': 0,
            'handle': 'starred',
            'title': 'Starred',
            'icon': 'star',
            'color': 'amber-fg'
        },
        {
            'id': 1,
            'handle': 'important',
            'title': 'Important',
            'icon': 'label',
            'color': 'red-fg'
        }
    ];

    public static labels = [
        {
            'id': 0,
            'handle': 'loan',
            'title': 'Asset Loan',
            'color': '#7cb342'
        },
        {
            'id': 1,
            'handle': 'verification',
            'title': 'Asset Verification',
            'color': '#d84315'
        },
        {
            'id': 2,
            'handle': 'servicing',
            'title': 'Assets Servicing',
            'color': '#607d8b'
        },
        {
            'id': 3,
            'handle': 'lostdamaged',
            'title': 'Lost/Damaged Assets',
            'color': '#03a9f4'
        },
        {
            'id': 4,
            'handle': 'donated',
            'title': 'Donated Assets',
            'color': '#03a9f4'
        },
        {
            'id': 5,
            'handle': 'transfers',
            'title': 'Transfer Assets',
            'color': '#03a9f4'
        }
    ];
}
