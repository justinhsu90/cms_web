export default [
    {
        index: "dataAnalysis",
        label: "儀表板"
    },
    {
        index: "sku",
        label: "產品相關",
        isLevel: true,
        child: [
            {
                index: "sku",
                label: "SKU管理"
            },
            {
                index: "upc",
                label: "UPC管理"
            },
            {
                index: "documentManage",
                label: "文案管理"
            }
        ]
    },
    {
        index: "shipment",
        label: "做單及出貨",
        isLevel: true,
        child: [
            // {
            //     index: "shipment",
            //     label: "舊小包做單"
            // },
            {
                index: "single",
                label: "小包做單 (CKE only)"
            },
            {
                index: "excelUpload",
                label: "表格匯入"
            },
            {
                index: "shipping",
                label: "貨代出貨清單"
            },
            {
                index: "generateFile",
                label: "生成做單文件"
            },
            {
                index: "setship",
                label: "設定出貨方式"
            },
        ]
    },
    {
        index: "reportList",
        label: "各平台銷售表"
    },
    {
        index: "orderList",
        label: "訂單查詢"
    },
    {
        index: "replacement",
        label: "補發清單"
    },
    {
        index: "scriptExecutionList",
        label: "執行清單"
    },
    {
        index: "wowcher",
        label: "Wowcher",
        isLevel: true,
        child: [
            {
                index: "wowcherDealList",
                label: "上架清單"
            },
            {
                index: "wowcherSample",
                label: "樣品清單"
            },
            {
                index: "wowcherReplenish",
                label: "補貨計算"
            }
        ]
    },
    {
        index: "erp",
        label: "ERP",
        isLevel: true,
        child: [
            {
                index: "purchaRequire",
                label: "(1) 採購需求單"
            },
            {
                index: "erpPurchase",
                label: "(2) 採購單"
            },
            {
                index: "payment",
                label: "(3-1) 付款單"
            },
            {
                index: "put-storage",
                label: "(3-2) 入庫單"
            },
            {
                index: "erpSale",
                label: "(4) 銷貨單"
            },
            {
                index: "receivable",
                label: "(5-1) 應收帳款單"
            },
            {
                index: "receivableReport",
                label: "(5-2) 費用應收表"
            },
            {
                index: "inventoryList",
                label: "庫存異動表"
            }
        ]
    },
    {
        index: "singleLetter",
        label: "補發信單"
    }
]
