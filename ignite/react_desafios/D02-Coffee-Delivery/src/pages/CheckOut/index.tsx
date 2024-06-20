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
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { coffees } from "../../utils/coffees";
import { formatPrice } from "../../utils/formatPrice";
import { getAddress, getAddressResponse } from "../../utils/getAddress";
import { useNavigate } from "react-router-dom";

export function CheckOut() {
  const { selectedCoffees, clearCart } = useContext(CartContext);
  const [address, setAddress] = useState<getAddressResponse>();
  const [cep, setCep] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const selectedCoffeeIds = new Set(
    selectedCoffees.map((selectedCoffee) => selectedCoffee.id)
  );

  const filteredCoffeesList = coffees
    .filter((coffee) => selectedCoffeeIds.has(coffee.id))
    .map((coffee) => {
      const selectedCoffee = selectedCoffees.find((sc) => sc.id === coffee.id);
      return {
        ...coffee,
        quantity: selectedCoffee ? selectedCoffee.quantity : 0,
      };
    });

  const totalItemsPrice = filteredCoffeesList.reduce((acc, coffee) => {
    const selectedCoffee = selectedCoffees.find((sc) => sc.id === coffee.id);
    const quantity = selectedCoffee ? selectedCoffee.quantity : 0;

    return acc + coffee.price * quantity;
  }, 0);
  const deliveryPrice = 3.5;
  const totalPrice = totalItemsPrice + deliveryPrice;

  const navigate = useNavigate();

  function handleSubmit() {
    const order = {
      address: {
        ...address,
        number,
        complement,
      },
      deliveryTime: 30,
      paymentMethod,
    };

    localStorage.setItem("@coffee-delivery:order", JSON.stringify(order));
    clearCart();
    navigate("/success");
  }

  useEffect(() => {
    if (cep.length === 8) {
      getAddress(cep)
        .then((address) => {
          setAddress(address);
        })
        .catch((error) => {
          console.error("Error fetching address:", error);
        });
    }
  }, [cep]);

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
            <Input
              placeholder="CEP"
              type="number"
              onChange={(e) => setCep(e.target.value)}
            />
            <Input
              placeholder="Rua"
              type="text"
              value={address?.logradouro}
              readOnly
            />
            <Input
              placeholder="Número"
              type="number"
              onChange={(e) => setNumber(e.target.value)}
            />
            <Input
              placeholder="Complemento"
              type="text"
              variant={"optional"}
              onChange={(e) => setComplement(e.target.value)}
            />
            <Input
              placeholder="Bairro"
              type="text"
              value={address?.bairro}
              readOnly
            />
            <Input
              placeholder="Cidade"
              type="text"
              value={address?.localidade}
              readOnly
            />
            <Input placeholder="UF" type="text" value={address?.uf} readOnly />
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
              <input
                type="radio"
                name="paymentMethod"
                id="creditCard"
                value="creditCard"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <CreditCard size={16} />
              <p>Cartão de crédito</p>
              <div className="whenChecked"></div>
            </PaymentMethod>
            <PaymentMethod>
              <input
                type="radio"
                name="paymentMethod"
                id="debitCard"
                value="debitCard"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <Bank size={16} />
              <p>Cartão de debito</p>
              <div className="whenChecked"></div>
            </PaymentMethod>
            <PaymentMethod>
              <input
                type="radio"
                name="paymentMethod"
                id="money"
                value="money"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
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
          {filteredCoffeesList.map((coffee) => (
            <>
              <CoffeeItem coffeeData={coffee} key={coffee.id} />
              <Separator />
            </>
          ))}
          <div className="values">
            <div>
              <p>Total de itens</p>
              <span>R$ {formatPrice(totalItemsPrice)}</span>
            </div>
            <div>
              <p>Entrega</p>
              <span>R$ {formatPrice(deliveryPrice)}</span>
            </div>
            <div>
              <h3>Total</h3>
              <h3>R$ {formatPrice(totalPrice)}</h3>
            </div>
          </div>
          <button onClick={handleSubmit}>confirmar pedido</button>
        </OrderDetails>
      </section>
    </CheckoutContainer>
  );
}
