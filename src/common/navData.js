const nav = [
  {
    index: "dataAnalysis",
    label: "儀表板"
  },
  {
    index: "excelUpload",
    label: "表格匯入"
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
    label: "做單&出貨",
    isLevel: true,
    child: [
      // {
      //     index: "shipment",
      //     label: "舊小包做單"
      // },
      // {
      //   index: "single",
      //   label: "小包做單 (CKE only)"
      // },
      // {
      //   index: "excelUpload",
      //   label: "表格匯入"
      // },
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
      }
    ]
  },
  {
    index: "salesAndOrder",
    label: "訂單&銷售",
    isLevel: true,
    child: [
      {
        index: "orderList",
        label: "訂單查詢"
      },
       {
        index: "platformSales",
        label: "各平台銷售表"
      }
    ]
  },
  {
    index: "erp",
    label: "ERP",
    isLevel: true,
    child: [
      {
        index: "inventoryList",
        label: "(0) 庫存異動單"
      },
      {
        index: "purchaRequire",
        label: "(1) 採購需求單"
      },
      {
        index: "erpPurchase",
        label: "(2) 採購單"
      },
      // {
      //     index: "payment",
      //     label: "(3-1) 付款單"
      // },
      {
        index: "putStorage",
        label: "(3) 入庫單"
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
      }
    ]
  },
  {
    index: "Amazon",
    label: "Amazon",
    isLevel: true,
    child: [
      {
        index: "restockCount",
        label: "補貨計算"
      // },
      // {
      //   index: "salesPerformance",
      //   label: "銷售表現及週期"
      }
    ]
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
      }
    ]
  },
  {
    index: "gogroopie",
    label: "Gogroopie",
    isLevel: true,
    child: [
      {
        index: "gogroopieDealList",
        label: "上架清單"
      }
    ]
  },
  {
    index: "scriptExecutionList",
    label: "執行"
  },
  {
    index: "guangzhouWarehouse",
    label: "廣州相關",
    isLevel: true,
    child: [
      {
        index: "gzwarehouseList",
        label: "快遞簽收訊息"
      }
    ]
  },
  {
    index: "customerService",
    label: "客服&信件",
    isLevel: true,
    child: [
      {
        index: "wowcherInformCustomerParcelArrival",
        label: "補發信單"
      },
      {
        index: "replacement",
        label: "補發清單"
      }
    ]
  }
  // ,
  // {
  //   index: "email",
  //   label: "發送郵件"
  // }
];
export default nav;
