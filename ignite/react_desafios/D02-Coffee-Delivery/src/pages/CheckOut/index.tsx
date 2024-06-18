import {
  Bank,
  CreditCard,
  CurrencyDollar,
  MapPin,
  Money,
} from "@phosphor-icons/react";
import {
  CardDescription,
  CheckoutContainer,
  DeliveryFormCard,
  OrderDetails,
  PaymentMethod,
  PaymentMethodContainer,
  Separator,
} from "./styles";
import { Input } from "./components/Input";
import { CoffeeItem } from "./components/CoffeeItem";

export function CheckOut() {
  return (
    <CheckoutContainer>
      <section>
        <h3>Complete seu pedido</h3>
        <DeliveryFormCard>
          <CardDescription icon_color="yellow">
            <MapPin size={22} />
            <div>
              <p>Endereço de Entrega</p>
              <span>Informe o endereço onde deseja receber seu pedido</span>
            </div>
          </CardDescription>
          <form>
            <Input placeholder="CEP" type="number" />
            <Input placeholder="Rua" type="text" />
            <Input placeholder="Número" type="number" />
            <Input placeholder="Complemento" type="text" variant={"optional"} />
            <Input placeholder="Bairro" type="text" />
            <Input placeholder="Cidade" type="text" />
            <Input placeholder="UF" type="text" />
          </form>
        </DeliveryFormCard>
        <PaymentMethodContainer>
          <CardDescription icon_color="purple">
            <CurrencyDollar size={22} />
            <div>
              <p>Endereço de Entrega</p>
              <span>Informe o endereço onde deseja receber seu pedido</span>
            </div>
          </CardDescription>
          <div className="paymentMethodOptions">
            <PaymentMethod>
              <input type="radio" name="paymentMethod" id="creditCard" />
              <CreditCard size={16} />
              <p>Cartão de crédito</p>
              <div className="whenChecked"></div>
            </PaymentMethod>
            <PaymentMethod>
              <input type="radio" name="paymentMethod" id="debitCard" />
              <Bank size={16} />
              <p>Cartão de debito</p>
              <div className="whenChecked"></div>
            </PaymentMethod>
            <PaymentMethod>
              <input type="radio" name="paymentMethod" id="money" />
              <Money size={16} />
              <p>Dinheiro</p>
              <div className="whenChecked"></div>
            </PaymentMethod>
          </div>
        </PaymentMethodContainer>
      </section>
      <section>
        <h3>Cafés selecionados</h3>
        <OrderDetails>
          <CoffeeItem />
          <Separator />
          <CoffeeItem />
          <Separator />
          <div className="values">
            <div>
              <p>Total de itens</p>
              <span>R$ 29,70</span>
            </div>
            <div>
              <p>Entrega</p>
              <span>R$ 3,50</span>
            </div>
            <div>
              <h3>Total</h3>
              <h3>R$ 33,50</h3>
            </div>
          </div>
          <button>confirmar pedido</button>
        </OrderDetails>
      </section>
    </CheckoutContainer>
  );
}
