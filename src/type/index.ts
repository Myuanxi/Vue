export interface Data {
    transaction: number,//交易量
    amount: number,//交易金额
    login: number,//登录量
    time: Date//时间
}
//订单管理（订单编号 卖家 买家 物品编号 交易金额 支付时间 到货时间 到款时间）
export interface Order {
    id:string,
    sellerId:string,
    sellerName:string,
    buyerId:string,
    buyerName:string,
    goodId:string,
    price:number,
    timePayed?:Date,//支付时间
    timeEnd?:Date,//到款时间
    timePayBack?:Date,//退款
    state:string
}
//物品信息（物品编号 物品名称 物品品类 价格 剩余数量 卖家ID 卖家姓名 帖子ID ）
export interface Good {
    goodId:string,
    goodName:string,
    goodState:string,
    price:number,
    sellerId:number,
    sellerName:string
}
//用户日志（登录记录、购物记录、出售记录、发帖记录、时间）
export interface User {
    id:string,
    userId:string,
    name:string,
    state:string,//登录 购物 出售 发帖
    time:string
}