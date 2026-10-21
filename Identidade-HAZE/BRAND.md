# HAZE: identidade visual (fonte de verdade)

HAZE significa atmosfera, e a atmosfera é viva: vida, clareza e luz.
O visual é luminoso e arejado. Nada pesado, nada sombrio, nada "genérico de template".
Frase da marca: Marcas que atraem os clientes certos

## 1. Logo

- Arquivos em `logos/`. Use sempre o arquivo, nunca redesenhe nem recrie em texto.
- Palavra HAZE em letras extra pesadas e largas, com H, A e Z levemente sobrepostas e uma barra ciano sob o H.
- Versões:
  - `logo-principal.png`: off-white com barra ciano, para fundos pretos e escuros (versão de referência)
  - `logo-claro.png`: preta com barra ciano, para off-white e fundos claros
  - `logo-mono-preto.png`: tudo preto, para fundo ciano e fotos claras
  - `logo-mono-branco.png`: tudo off-white, para grafite e superfícies escuras
  - `logo-mono-ciano.png`: tudo ciano, uso raro
- A marca NÃO usa símbolo, ícone ou emblema. A pasta `Simbolos/` do projeto é de testes descartados: não use nada dela.

## 2. Cores (únicas permitidas)

| Nome | Hex | Uso |
|---|---|---|
| Preto | `#000000` | base escura e texto |
| Off-white | `#F1EEE7` | base clara e texto sobre escuro |
| Ciano | `#01BBFB` | destaque: barra, botões, faixas, números |
| Cinza | `#8D8B86` | textos de apoio |
| Grafite | `#141414` | cards e blocos escuros |
| Linha | `#2B2B2B` | divisórias em fundo escuro |

- Branco puro `#FFFFFF` NÃO existe na marca. O claro é sempre o off-white `#F1EEE7`.
- Texto sobre ciano é preto. Texto sobre preto é off-white.
- Prefira cor sólida da paleta para texto, em vez de preto ou off-white com transparência.

## 3. Tipografia (uma família de título, uma de texto)

- Títulos: **Archivo expandida** (`font-variation-settings: 'wdth' 125`), peso 900, caixa alta, entretraço levemente negativo.
- Texto corrido, botões, rótulos: **Inter** (400, 500, 600).
- PROIBIDO serifada e itálico em qualquer lugar. Não existe Instrument Serif na marca.
- Destaque de palavra-chave: a MESMA Archivo 900 da frase, com a barra ciano embaixo. Sem trocar de fonte, sem itálico, sem aumentar o tamanho da palavra.
- A barra: reta, cantos retos, horizontal, largura igual à da palavra, altura de uns 12% a 15% do tamanho da fonte. Em fundo ciano a barra é preta. Nunca inclinada, nunca solta como decoração.

## 4. Texto

- Sem ponto final em títulos, frases curtas, cards, botões, listas, rodapé e copyright. Em parágrafo de mais de uma frase, una as ideias com vírgula ou reescreva em uma frase só.
- Interrogação e exclamação podem ficar onde fazem sentido.
- Sem ícones, emojis ou símbolos para decorar. O que sinaliza é texto, número ou a barra ciano.

## 5. Texturas (`texturas/`, todas 16:9, 1920x1080)

Use como fundo de seção (`background-size: cover`), com texto por cima. Converta para webp ao copiar para `public/`.

- `fosca.jpg`: preto fosca com grão. Seções escuras padrão.
- `fosca-azul.jpg`: preto fosca com brilho azul na lateral. Fechamentos e chamadas fortes.
- `nevoa.jpg` e `nevoa-fim.jpg`: névoa azul sobre preto. Abertura (hero) e fim.
- `papel.jpg`: papel off-white com grão. Seções claras simples.
- `papel-azul.jpg`: papel off-white com névoa azul nas laterais. Seções claras principais.
- `ciano.jpg`: nuvens em ciano. Uma seção de destaque por página, com texto preto.
- `topografica-v3.jpg`: linhas topográficas com tons azuis. Seções claras alternativas (FAQ, antes e depois).
- `concreto.jpg` e `vidro.jpg`: superfícies para blocos de mockup.
- Ritmo: alterne escuro e claro, no máximo uma seção ciano. Nada de gradiente próprio inventado: as texturas já trazem o azul.

## 6. Imagens

- Só mockups da própria HAZE (`mockups/`) ou fotos luminosas de arquitetura moderna e mar, no clima do `mockups/moodboard.jpg`.
- Mostre cada mockup inteiro, na proporção original, sem recorte (`object-fit: contain`, não `cover`).
- Proibido: fotos genéricas de paisagem clássica, pôr do sol, rochas, cenas escuras e quentes.

## 7. Componentes

- Cards: fundo off-white com borda preta de 2px, ou grafite `#141414` com borda `#2B2B2B`, canto de 24px, sem sombra pesada.
- Botão principal: pílula ciano com texto preto.
- Sem interface imitando outros produtos (WhatsApp, redes sociais etc.).

## 8. Aplicação no deck (referência)

A apresentação da marca e a apresentação para clientes seguem estas mesmas regras. Quando em dúvida, copie a decisão delas.
