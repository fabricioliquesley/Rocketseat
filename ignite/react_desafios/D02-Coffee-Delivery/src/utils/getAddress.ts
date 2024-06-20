export type getAddressResponse = {
  cep: string;
  logradouro: string;
  // complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  // ibge: "3550308";
  // gia: "1004";
  // ddd: "11";
  // siafi: "7107";
};

export async function getAddress(cep: string) {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json() as getAddressResponse;

    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}
