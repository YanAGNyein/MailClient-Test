import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'messaging',
        title: 'Messaging',
        translate: 'NAV.MESSAGING',
        type: 'group',
        icon: 'icon-envelop',
        children: [
            {
                id: 'messaging',
                title: 'Messaging',
                translate: 'NAV.MESSAGING_VIEW',
                type: 'item',
                icon: 'icon-envelop',
                url: '/apps/mail',

            }
        ]
    }
];

export const navigationAssetViewer: FuseNavigation[] = [
    {
        id: 'messaging',
        title: 'Messaging',
        translate: 'NAV.MESSAGING',
        type: 'group',
        icon: 'icon-envelop',
        children: [
            {
                id: 'messaging',
                title: 'Messaging',
                translate: 'NAV.MESSAGING_VIEW',
                type: 'item',
                icon: 'icon-envelop',
                url: '/apps/mail',

            }
        ]
    }
    // {
    //     id: 'assetverification',
    //     title: 'Asset Verification',
    //     translate: 'NAV.ASSET_VERIFICATION',
    //     type: 'group',
    //     icon: 'icon-cycle-check',
    //     children: [
    //         {
    //             id: 'assetverification',
    //             title: 'Dashboard',
    //             translate: 'NAV.ASSET_VERIFICATION_DASHBOARD',
    //             type: 'item',
    //             icon: 'icon-dashboard',
    //             url: '/apps/assetverificationdashboard'

    //         },
    //         {
    //             id: 'assetverification',
    //             title: 'Asset Verification',
    //             translate: 'NAV.ASSET_VERIFICATION',
    //             type: 'collapsable',
    //             icon: 'icon-cycle-check',
    //             url: '/apps/assetverification',
                
    //             //GS 20201227 saa-37 - new, new adhoc asset verification tasks
    //                 children: [
    //                 {
    //                 id: 'assetverification',
    //                 title: 'New Asset Verification Exercise (Auto-Creation)',
    //                 translate: 'NAV.NEW_ASSET_VERIFICATION',
    //                 type: 'item',
    //                 icon: 'icon-asset-loan',
    //                 url: '/apps/addassetverification'

    //                 },
    //                 {
    //                 id: 'assetverification',
    //                 title: 'New Asset Verification Exercise (Ad-hoc)',
    //                 translate: 'NAV.NEW_ASSET_VERIFICATION_ADHOC',
    //                 type: 'item',
    //                 icon: 'icon-asset-loan',
    //                 url: '/apps/addassetverificationadhoc'

    //                 }
    //             ]

    //         },
            
    //     ]
    // }
    //,
    // {
    //     id: 'assetloan',
    //     title: 'Asset Loan',
    //     translate: 'NAV.ASSET_LOAN',
    //     type: 'group',
    //     icon: 'icon-asset-loan',
    //     children: [
    //         {
    //             id: 'assetloan',
    //             title: 'Asset Loan',
    //             translate: 'NAV.ASSET_LOAN',
    //             type: 'collapsable',
    //             icon: 'icon-asset-loan',
    //             url: '/apps/assetloan'

    //         },
    //     ]
    // }
    // ,
    // {
    //     id: 'assetservicing',
    //     title: 'Asset Servicing',
    //     translate: 'NAV.ASSET_SERVICING',
    //     type: 'group',
    //     icon: 'icon-asset-servicing',
    //     children: [
    //         {
    //             id: 'assetservicing',
    //             title: 'Asset Servicing',
    //             translate: 'NAV.ASSET_SERVICING',
    //             type: 'collapsable',
    //             icon: 'icon-asset-servicing',
    //             url: '/apps/assetservicing'

    //         }
    //     ]
    // }
    // ,
    // {
    //     id: 'asset-reporting',
    //     title: 'Asset Reporting',
    //     translate: 'NAV.ASSET_REPORTING',
    //     type: 'group',
    //     icon: 'icon-reports',
    //     children: [
    //         {
    //             id: 'asset-reporting',
    //             title: 'Asset Reporting',
    //             translate: 'NAV.ASSET_REPORTING',
    //             type: 'collapsable',
    //             icon: 'icon-reports',
    //             url: '/apps/reports/inventory'

    //         },
    //         {
    //             id: 'asset-reporting',
    //             title: 'Asset Details Report',
    //             translate: 'NAV.ASSET_DETAILS_REPORT',
    //             type: 'item',
    //             icon: 'icon-reports',
    //             url: '/apps/reports/assetdetails'

    //         },
    //         {
    //             id: 'asset-reporting',
    //             title: 'Asset Verification Exception Report',
    //             translate: 'NAV.AVEREPORT_EXCEPTION',
    //             type: 'collapsable',
    //             icon: 'icon-reports',
    //             url: '/apps/reports/assetverification-exception'

    //         },
    //     ]
    // }
    //,
    // {
    //     id: 'messaging',
    //     title: 'Messaging',
    //     translate: 'NAV.MESSAGING',
    //     type: 'group',
    //     icon: 'icon-envelop',
    //     children: [
    //         {
    //             id: 'messaging',
    //             title: 'Messaging',
    //             translate: 'NAV.MESSAGING',
    //             type: 'item',
    //             icon: 'icon-envelop',
    //             url: '/apps/mail',

    //         }
    //     ]
    // }
    //,
    // {
    //     id: 'usermanagement',
    //     title: 'User Management',
    //     translate: 'NAV.USER_MANAGEMENT',
    //     type: 'group',
    //     icon: 'icon-users',
    //     children: [
    //         {
    //             id: 'usermanagement',
    //             title: 'User Managment',
    //             translate: 'NAV.USER_MANAGEMENT',
    //             type: 'collapsable',
    //             icon: 'icon-users',
    //             url: '/apps/configuration/user',
    //             children: [
    //                 {
    //                     id: 'usermanagementcreate',
    //                     title: 'Create New User',
    //                     translate: 'NAV.USER_MANAGEMENT_CREATE',
    //                     type: 'item',
    //                     icon: 'icon-user-add',
    //                     url: '/apps/configuration/create-user'
    //                 }
    //             ]

    //         }
    //     ]
    // }
    //
    // + a few more modules
];

export const navigationCustodian: FuseNavigation[] = [
    {
        id: 'asset',
        title: 'Asset',
        translate: 'NAV.ASSET',
        type: 'group',
        icon: 'icon-reports',
        children: [
            {
                id: 'dashboards',
                title: 'Dashboards',
                translate: 'NAV.DASHBOARDS',
                type: 'collapsable',
                icon: 'icon-dashboard',
                children: [
                    {
                        id: 'analytics',
                        title: 'Analytics',
                        type: 'item',
                        icon: 'icon-dashboard_customize',
                        url: '/apps/dashboards/analytics'
                    },
                ]
            },
            {
                id: 'item_management',
                title: 'Item Management',
                translate: 'NAV.ITEM_MANAGEMENT',
                type: 'collapsable',
                icon: 'icon-item',
                children: [
                    {
                        id: 'itemcreationbycategory',
                        title: 'Item Categories',
                        type: 'item',
                        icon: 'icon-item-category',
                        url: '/apps/configuration/item/itemcreationbycategory'
                    },
                ]
            },
            {
                id: 'warehouse_management',
                title: 'Warehouse Management',
                translate: 'NAV.WAREHOUSE_MANAGEMENT',
                type: 'collapsable',
                icon: 'icon-warehouse',
                children: [
                    {
                        id: 'location',
                        title: 'Location',
                        type: 'item',
                        icon: 'icon-location',
                        url: '/apps/configuration/location'
                    },
                    {
                        id: 'tagcreation',
                        title: 'RFID Tags',
                        type: 'item',
                        icon: 'icon-tags',
                        url: '/apps/configuration/inventory/tagcreation'
                    }
                ]
            },
            {
                id: 'transactions',
                title: 'Transactions',
                translate: 'NAV.TRANSACTIONS',
                type: 'collapsable',
                icon: 'icon-transactions',
                children: [
                    {
                        id: 'checkin',
                        title: 'CheckIn',
                        type: 'item',
                        icon: 'icon-checkin',
                        url: '/apps/transactions/checkin/todo',
                    },
                    {
                        id: 'item',
                        title: 'Movement',
                        type: 'item',
                        icon: 'icon-movement',
                        url: '/apps/transactions/movement/todo'
                    },
                    {
                        id: 'checkout',
                        title: 'CheckOut',
                        type: 'item',
                        icon: 'icon-checkout',
                        url: '/apps/transactions/checkout/todo'
                    }
                ]
            },
            {
                id: 'cyclecount',
                title: 'Cyclecount',
                translate: 'NAV.CYCLECOUNT',
                type: 'item',
                icon: 'icon-cycle-check',
                url: '/apps/cyclecount/todo'
            },
            {
                id: 'reports',
                title: 'Reports',
                translate: 'NAV.REPORTS',
                type: 'collapsable',
                icon: 'icon-reports',
                children: [
                    {
                        id: 'inventorysummary',
                        title: 'Inventory Summary Report',
                        type: 'item',
                        icon: 'icon-reports',
                        url: '/apps/reports/inventorysummary'
                    },
                    {
                        id: 'inventory',
                        title: 'Inventory Details Report',
                        type: 'item',
                        icon: 'icon-reports',
                        url: '/apps/reports/inventory'
                    },
                    {
                        id: 'movementsummary',
                        title: 'Movement Summary Report',
                        type: 'item',
                        icon: 'icon-reports',
                        url: '/apps/reports/movementsummary'
                    },
                    {
                        id: 'movementreport',
                        title: 'Movement details Report',
                        type: 'item',
                        icon: 'icon-reports',
                        url: '/apps/reports/movementreport'
                    },
                ]
            },

            {
                id: 'usermanagement',
                title: 'UserManagement',
                translate: 'NAV.USERMANAGEMENT',
                type: 'collapsable',
                icon: 'icon-users',
                children: [
                    {
                        id: 'usermanagement',
                        title: 'UserManagement',
                        type: 'item',
                        icon: 'icon-users',
                        url: '/apps/configuration/user'
                    },
                ]
            },
        ]
    }
];


export const navigationUserAdmin: FuseNavigation[] = [
    {
        id: 'usermanagement',
        title: 'User Management',
        translate: 'NAV.USER_MANAGEMENT',
        type: 'group',
        icon: 'icon-users',
        children: [
            {
                id: 'usermanagement',
                title: 'User Managment',
                translate: 'NAV.USER_MANAGEMENT',
                type: 'collapsable',
                icon: 'icon-users',
                url: '/apps/configuration/user',
                children: [
                    {
                        id: 'usermanagementcreate',
                        title: 'Create New User',
                        translate: 'NAV.USER_MANAGEMENT_CREATE',
                        type: 'item',
                        icon: 'icon-user-add',
                        url: '/apps/configuration/create-user'
                    }
                ]
            }
        ]
    }
];