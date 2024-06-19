import {
  ContentContainer,
  DeliveryForecastBox,
  LocationBox,
  OrderDetails,
  PaymentMethodBox,
} from "./styles";

import deliveryMan from "../../assets/deliveryMan.svg";
import { CurrencyDollar, MapPin, Timer } from "@phosphor-icons/react";

export function Success() {
  return (
    <ContentContainer>
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
                Entrega em <b>Rua João Daniel Martinelli</b>, 102 Farrapos -
                Porto Alegre, RS
              </p>
            </LocationBox>
            <DeliveryForecastBox>
              <div>
                <Timer size={16} weight="fill" />
              </div>
              <p>
                Previsão de entrega <b>20 min - 30 min</b>
              </p>
            </DeliveryForecastBox>
            <PaymentMethodBox>
              <div>
                <CurrencyDollar size={16} />
              </div>
              <p>Pagamento na entrega <b>Cartão de Crédito</b></p>
            </PaymentMethodBox>
          </div>
        </div>
      </OrderDetails>
      <img src={deliveryMan} alt="delivery man illustration" />
    </ContentContainer>
  );
}
