import {
  ContentContainer,
  DeliveryForecastBox,
  LocationBox,
  OrderDetails,
  PaymentMethodBox,
} from "./styles";

import deliveryMan from "../../assets/deliveryMan.svg";
import { CurrencyDollar, MapPin, Timer } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { getAddressResponse } from "../../utils/getAddress";

type addressWithNumberAndComplement = getAddressResponse & {
  number: string;
  complement: string;
};

interface OrderProps {
  address: addressWithNumberAndComplement;
  deliveryTime: number;
  paymentMethod: "money" | "debitCard" | "creditCard";
}

const PAYMENT_METHOD = {
  money: "Dinheiro",
  debitCard: "Cartão de debito",
  creditCard: "Cartão de credito",
};

export function Success() {
  const [order, setOrder] = useState<OrderProps | null>(null);
  useEffect(() => {
    const orderAsJSON = localStorage.getItem("@coffee-delivery:order");

    if (orderAsJSON) {
      setOrder(JSON.parse(orderAsJSON));
    }
  }, []);

  return (
    <ContentContainer>
      {!order ? (
        <h2>Não existe nem um pedido em andamento</h2>
      ) : (
        <>
          <OrderDetails>
            <h2>Uhu! Pedido confirmado</h2>
            <p>Agora é só aguardar que logo o café chegará até você</p>
            <div className="gradient">
              <div>
                <LocationBox>
                  <div>
                    <MapPin size={16} weight="fill" />
                  </div>
                  <p>
                    Entrega em <b>{order.address.logradouro}</b>,{" "}
                    {order.address.number} {order.address.bairro} -{" "}
                    {order.address.localidade}, {order.address.uf}
                  </p>
                </LocationBox>
                <DeliveryForecastBox>
                  <div>
                    <Timer size={16} weight="fill" />
                  </div>
                  <p>
                    Previsão de entrega <b>{order.deliveryTime} min</b>
                  </p>
                </DeliveryForecastBox>
                <PaymentMethodBox>
                  <div>
                    <CurrencyDollar size={16} />
                  </div>
                  <p>
                    Pagamento na entrega{" "}
                    <b>{PAYMENT_METHOD[order.paymentMethod]}</b>
                  </p>
                </PaymentMethodBox>
              </div>
            </div>
          </OrderDetails>
          <img src={deliveryMan} alt="delivery man illustration" />
        </>
      )}
    </ContentContainer>
  );
}
