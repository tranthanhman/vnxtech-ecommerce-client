import { formatPrice } from "@/utils/format-price";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Order {
    id: string
    status: string
    date: string
    totalPrice: number
    orderItems: OrderItem[]
}

interface OrderItem {
    name: string
    quantity: number
    price: number
}

export default function OrderHistory({ orders }: { orders: Order[] }) {

    return (
        <div className="space-y-4">
            {orders && orders.map((order: Order) => (
                <div key={order.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-4">
                            <span className="font-semibold">#{order.id}</span>
                            <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                        </div>
                        <div className="text-sm text-gray-600">{order.date}</div>
                    </div>

                    <div className="space-y-2 mb-3">
                        {order?.orderItems && order?.orderItems.map((item: OrderItem, index: number) => (
                            <div key={index} className="flex justify-between text-sm">
                                <span>
                                    {item.name} x{item.quantity}
                                </span>
                                <span>{formatPrice(item.price)}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t">
                        <div className="font-semibold">Tổng: {formatPrice(order?.totalPrice)}</div>
                        <div className="space-x-2">
                            <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-2" />
                                Chi tiết
                            </Button>
                            {order.status === "Đã giao" && (
                                <Button variant="outline" size="sm">
                                    Mua lại
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

const getStatusColor = (status: string) => {
    switch (status) {
        case "Đã giao":
            return "bg-green-100 text-green-800"
        case "Đang giao":
            return "bg-blue-100 text-blue-800"
        case "Đang xử lý":
            return "bg-yellow-100 text-yellow-800"
        case "Đã hủy":
            return "bg-red-100 text-red-800"
        default:
            return "bg-gray-100 text-gray-800"
    }
}