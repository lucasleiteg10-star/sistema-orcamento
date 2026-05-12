"use client";

import { useEffect, useState } from "react";

import {
  valoresRegime,
  agravanteRegime,
  agravanteFaturamento,
  valoresFolha,
  agravanteFiscal,
  agravanteNegocio,
  agravanteAtendimento,
  descontoGrupo,
} from "./data/tabelas";

export default function Home() {
  const [regime, setRegime] = useState("Simples Nacional");
  const [tipoRegime, setTipoRegime] = useState("Regime Competência");
  const [faturamento, setFaturamento] = useState("Até 120 mil ano");
  const [folha, setFolha] = useState("Pró-labore");
  const [negocio, setNegocio] = useState("Serviços");
  const [atendimento, setAtendimento] = useState("De 3 até 5 horas");
  const [grupo, setGrupo] = useState("De 1 a 2 empresas");

  const [resultado, setResultado] = useState<number | null>(null);
  const [subtotal1, setSubtotal1] = useState(0);
  const [subtotal2, setSubtotal2] = useState(0);

  function calcularOrcamento() {
    // BLOCO 1
    const valorBase = valoresRegime[regime];
    const multRegime = agravanteRegime[tipoRegime];
    const multFaturamento = agravanteFaturamento[faturamento];

    const subtotal1Calc =
      valorBase * multRegime * multFaturamento;

    setSubtotal1(subtotal1Calc);

    // BLOCO 2
    const valorFolha = valoresFolha[folha];

    let fiscalKey = regime;
    if (!(fiscalKey in agravanteFiscal)) {
      fiscalKey = "Simples Nacional";
    }

    const multFiscal = agravanteFiscal[fiscalKey];
    const multNegocio = agravanteNegocio[negocio];

    const subtotal2Calc =
      valorFolha * multFiscal * multNegocio;

    setSubtotal2(subtotal2Calc);

    // FINAL
    const multAtendimento =
      agravanteAtendimento[atendimento];

    const multGrupo = descontoGrupo[grupo];

    const valorFinal =
      (subtotal1Calc + subtotal2Calc) *
      multAtendimento *
      multGrupo;

    setResultado(valorFinal);
  }

  useEffect(() => {
    calcularOrcamento();
  }, [
    regime,
    tipoRegime,
    faturamento,
    folha,
    negocio,
    atendimento,
    grupo,
  ]);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Sistema de Orçamento
        </h1>

        <div className="space-y-6">

          {/* REGIME */}
          <select
            className="w-full border p-3 rounded-xl"
            value={regime}
            onChange={(e) => setRegime(e.target.value)}
          >
            {Object.keys(valoresRegime).map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          {/* TIPO REGIME */}
          <select
            className="w-full border p-3 rounded-xl"
            value={tipoRegime}
            onChange={(e) => setTipoRegime(e.target.value)}
          >
            {Object.keys(agravanteRegime).map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          {/* FATURAMENTO */}
          <select
            className="w-full border p-3 rounded-xl"
            value={faturamento}
            onChange={(e) => setFaturamento(e.target.value)}
          >
            {Object.keys(agravanteFaturamento).map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          {/* FOLHA */}
          <select
            className="w-full border p-3 rounded-xl"
            value={folha}
            onChange={(e) => setFolha(e.target.value)}
          >
            {Object.keys(valoresFolha).map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          {/* NEGÓCIO */}
          <select
            className="w-full border p-3 rounded-xl"
            value={negocio}
            onChange={(e) => setNegocio(e.target.value)}
          >
            {Object.keys(agravanteNegocio).map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          {/* ATENDIMENTO */}
          <select
            className="w-full border p-3 rounded-xl"
            value={atendimento}
            onChange={(e) => setAtendimento(e.target.value)}
          >
            {Object.keys(agravanteAtendimento).map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          {/* GRUPO */}
          <select
            className="w-full border p-3 rounded-xl"
            value={grupo}
            onChange={(e) => setGrupo(e.target.value)}
          >
            {Object.keys(descontoGrupo).map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          {/* DETALHAMENTO */}
          <div className="bg-gray-100 p-4 rounded-xl text-sm">
            <p><strong>Detalhamento:</strong></p>

            <p>Subtotal 1: {subtotal1.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
            <p>Subtotal 2: {subtotal2.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>

            <p>Atendimento: x{agravanteAtendimento[atendimento]}</p>
            <p>Grupo: x{descontoGrupo[grupo]}</p>
          </div>

          {/* RESULTADO FINAL */}
          {resultado !== null && (
            <div className="bg-green-100 p-6 rounded-xl text-center">
              <p className="text-lg font-medium">
                Valor estimado:
              </p>

              <p className="text-3xl font-bold text-green-700 mt-2">
                {resultado.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}