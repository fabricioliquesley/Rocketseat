import { orderStatus } from "@/api/get-orders";

interface OrderStatusProps {
  status: orderStatus;
}

const orderStatusMap: Record<orderStatus, { color: string; text: string }> = {
  pending: {
    color: "bg-slate-400",
    text: "pendente",
  },
  canceled: {
    color: "bg-rose-500",
    text: "cancelado",
  },
  delivered: {
    color: "bg-emerald-500",
    text: "entregue",
  },
  delivering: {
    color: "bg-amber-500",
    text: "a caminho",
  },
  processing: {
    color: "bg-amber-500",
    text: "em preparo",
  },
};

export const OrderStatus = ({ status }: OrderStatusProps) => {
  return (
    <div className="flex items-center gap-2">
      <span
        data-testid="badge"
        className={`h-2 w-2 rounded-full ${orderStatusMap[status].color}`}
      />
      <span className="font-medium text-muted-foreground">
        {orderStatusMap[status].text}
      </span>
    </div>
  );
};
