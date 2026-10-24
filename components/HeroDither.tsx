'use client';

import { useEffect, useRef } from 'react';

/**
 * Efeito "dither" (estilo ASCII-art da 21st.dev, receita "Electric Gaze") desenhado em Canvas 2D sobre a foto:
 * a imagem é dividida em células, cada célula vira uma grade 3x3 de pontos acesos por um limiar Bayer (dither ordenado)
 * e a luminância de cada célula cintila no tempo (shimmer). Sem fundo: onde a célula é escura, aparece o que está atrás.
 * É a ABERTURA do site: roda por INTRO_MS e então se desmancha em uma onda, de cima para baixo, deixando a foto nítida.
 * Parâmetros da receita: células de 9 px na demo (6 px aqui, porque a nossa tela é bem menor), contraste 158, sem tinta, animação shimmer (velocidade 100, intensidade 60).
 */
const CELULA = 6;
const SUB = 3;
const PONTO = CELULA / SUB;
const BAYER = [0, 7, 3, 6, 5, 2, 4, 1, 8].map((v) => (v + 0.5) / 9);
const CONTRASTE = 1.58;
const VELOCIDADE = 1;
const INTENSIDADE = 0.6;
const QUADROS_POR_SEGUNDO = 30;
const INTRO_MS = 1700; // tempo com o efeito inteiro
const REVELA_MS = 1500; // tempo da onda que desmancha o efeito

const limitar = (v: number) => (v < 0 ? 0 : v > 255 ? 255 : v);

export default function HeroDither({
  src,
  posicao = [0.5, 0.42],
  aoPronto,
  aoRevelar,
  aoFim,
}: {
  src: string;
  /** Onde a foto se ancora ao cobrir o quadro (x, y de 0 a 1), como o object-position. */
  posicao?: [number, number];
  aoPronto?: () => void;
  /** Quando a onda que desmancha o efeito começa (a foto nítida pode começar a aparecer). */
  aoRevelar?: () => void;
  /** Quando o efeito acabou e o canvas pode sair da tela. */
  aoFim?: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const quadro = canvas?.parentElement;
    if (!canvas || !quadro) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let vivo = true;
    let visivel = true;
    let frame = 0;
    let ultimo = 0;
    let inicioT = 0;
    let revelando = false;
    let preparado = false;
    let cols = 0;
    let linhas = 0;
    let lum = new Float32Array(0);
    let cor = new Uint32Array(0);
    let fase = new Float32Array(0);
    let pixels = new Uint32Array(0);
    let dados: ImageData | null = null;
    const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const imagem = new Image();
    imagem.src = src;

    // Amostra a foto (já "cobrindo" o quadro) e guarda cor e luminância média de cada célula
    const preparar = () => {
      const largura = Math.max(1, Math.round(quadro.clientWidth));
      const altura = Math.max(1, Math.round(quadro.clientHeight));
      canvas.width = largura;
      canvas.height = altura;

      const escala = Math.max(largura / imagem.naturalWidth, altura / imagem.naturalHeight);
      const dw = imagem.naturalWidth * escala;
      const dh = imagem.naturalHeight * escala;
      ctx.clearRect(0, 0, largura, altura);
      ctx.drawImage(imagem, (largura - dw) * posicao[0], (altura - dh) * posicao[1], dw, dh);
      const lido = ctx.getImageData(0, 0, largura, altura).data;

      cols = Math.ceil(largura / CELULA);
      linhas = Math.ceil(altura / CELULA);
      lum = new Float32Array(cols * linhas);
      cor = new Uint32Array(cols * linhas);
      fase = new Float32Array(cols * linhas);
      for (let cy = 0; cy < linhas; cy++) {
        for (let cx = 0; cx < cols; cx++) {
          let r = 0;
          let g = 0;
          let b = 0;
          let n = 0;
          for (let y = cy * CELULA; y < Math.min(altura, (cy + 1) * CELULA); y += 3) {
            for (let x = cx * CELULA; x < Math.min(largura, (cx + 1) * CELULA); x += 3) {
              const i = (y * largura + x) * 4;
              r += lido[i];
              g += lido[i + 1];
              b += lido[i + 2];
              n++;
            }
          }
          r = limitar(((r / n - 128) * CONTRASTE) + 128);
          g = limitar(((g / n - 128) * CONTRASTE) + 128);
          b = limitar(((b / n - 128) * CONTRASTE) + 128);
          const i = cy * cols + cx;
          lum[i] = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          cor[i] = (255 << 24) | (b << 16) | (g << 8) | r;
          fase[i] = Math.random();
        }
      }
      dados = ctx.createImageData(largura, altura);
      pixels = new Uint32Array(dados.data.buffer);
      preparado = true;
    };

    const desenhar = (agoraMs: number, revela = 0) => {
      if (!preparado || !dados) return;
      const t = (agoraMs / 1000) * VELOCIDADE;
      const largura = canvas.width;
      const altura = canvas.height;
      pixels.fill(0);
      for (let cy = 0; cy < linhas; cy++) {
        for (let cx = 0; cx < cols; cx++) {
          const i = cy * cols + cx;
          // Shimmer: cada célula cintila no seu ritmo e uma onda de brilho atravessa a imagem
          const brilho =
            lum[i] +
            Math.sin(t * 2.4 + fase[i] * 6.2832) * INTENSIDADE * 0.2 +
            Math.sin(t * 1.5 + cx * 0.18 + cy * 0.1) * INTENSIDADE * 0.1;
          // Onda de revelação: de cima para baixo, os pontos rareiam até sumir e a foto aparece
          const onda = revela * 1.7 - (cy / linhas) * 0.7;
          if (onda >= 1) continue;
          const fator = onda > 0.45 ? 1 - (onda - 0.45) / 0.55 : 1;
          const b = brilho * fator;
          if (b <= 0.055) continue;
          const c = cor[i];
          for (let sy = 0; sy < SUB; sy++) {
            for (let sx = 0; sx < SUB; sx++) {
              if (b <= BAYER[sy * SUB + sx]) continue;
              const x0 = cx * CELULA + sx * PONTO;
              const y0 = cy * CELULA + sy * PONTO;
              for (let y = y0; y < Math.min(altura, y0 + PONTO); y++) {
                const linha = y * largura;
                for (let x = x0; x < Math.min(largura, x0 + PONTO); x++) pixels[linha + x] = c;
              }
            }
          }
        }
      }
      ctx.putImageData(dados, 0, 0);
    };

    const quadroAnimado = (agoraMs: number) => {
      if (!vivo) return;
      frame = requestAnimationFrame(quadroAnimado);
      if (!visivel || document.hidden) return;
      if (agoraMs - ultimo < 1000 / QUADROS_POR_SEGUNDO) return;
      ultimo = agoraMs;
      const decorrido = agoraMs - inicioT;
      if (decorrido >= INTRO_MS && !revelando) {
        revelando = true;
        aoRevelar?.();
      }
      const revela = Math.min(1, Math.max(0, (decorrido - INTRO_MS) / REVELA_MS));
      desenhar(agoraMs, revela);
      if (revela >= 1) {
        vivo = false;
        cancelAnimationFrame(frame);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        aoFim?.();
      }
    };

    const iniciar = () => {
      if (!vivo) return;
      try {
        // Com "reduzir movimento" a abertura não existe: a foto nítida já fica à vista
        if (semMovimento) {
          aoRevelar?.();
          aoFim?.();
          return;
        }
        preparar();
        inicioT = performance.now();
        desenhar(inicioT);
        aoPronto?.();
        frame = requestAnimationFrame(quadroAnimado);
      } catch {
        // sem canvas utilizável: a foto original continua à vista
      }
    };

    if (imagem.complete && imagem.naturalWidth) iniciar();
    else imagem.addEventListener('load', iniciar, { once: true });

    const observador = new IntersectionObserver(([e]) => (visivel = e.isIntersecting));
    observador.observe(canvas);
    let redimensiona = 0;
    const tamanho = new ResizeObserver(() => {
      window.clearTimeout(redimensiona);
      redimensiona = window.setTimeout(() => {
        if (!preparado) return;
        try {
          preparar();
          desenhar(performance.now());
        } catch {
          // mantém o quadro anterior
        }
      }, 200);
    });
    tamanho.observe(quadro);

    return () => {
      vivo = false;
      cancelAnimationFrame(frame);
      window.clearTimeout(redimensiona);
      observador.disconnect();
      tamanho.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 size-full [image-rendering:pixelated]" />;
}
