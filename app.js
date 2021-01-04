import { data } from "./config.mjs";

const apiKey = data.key;
const wrapper = document.getElementById("coins");

axios
  .get(
    `https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?CMC_PRO_API_KEY=${apiKey}`
  )
  .then((response) => {
    if (response.status !== 200)
      throw new Error(
        `Erro ao executar a requisição. Status: ${response.status}`
      );
    return response;
  })
  .then((result) => {
    let cryptos = result.data.data;
    let text = "";
    for (let iterator = 0; iterator < 10; iterator++) {
      text =
        text +
        `
      <div class="media">
        <div class="container">
          <i class="fas fa-coins text-center" style="font-size: 2em;"></i>
        </div>
        <div class="media-body">
          <h5 class="mt-2 title">${cryptos[iterator].name}</h5>
          <p class="symbol">${cryptos[iterator].symbol}</p>
          <p class="rank">Rank: #${cryptos[iterator].rank}</p>
        </div>
      </div>`;

      wrapper.innerHTML = text;
    }
  })
  .catch((err) => {
    console.error(err.message);
  });
