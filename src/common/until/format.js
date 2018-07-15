export const format = {
    formatToPercent(row,column,cellValue){
        return (cellValue*100).toFixed(2)+"%"
    },
    formatToYuan(row,column,cellValue){
        return cellValue.toFixed(2)
    }
}
