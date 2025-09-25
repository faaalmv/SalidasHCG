// src/components/OrderTable.tsx

import React, { useCallback } from 'react';
import type { Article, FormRow } from '../App';
import ArticleCombobox from './ArticleCombobox';
import QuantityInput from './QuantityInput';

interface OrderTableProps {
  rows: FormRow[];
  articles: Article[];
  onRowChange: (index: number, updatedRow: FormRow) => void;
  onRemoveRow: (id: number) => void;
}

const MIN_ROWS = 15; // Definimos el número mínimo de filas a mostrar

const OrderTable: React.FC<OrderTableProps> = ({ rows, articles, onRowChange, onRemoveRow }) => {

  const handleQuantityChange = useCallback(
    (index: number, field: 'cantidadPedida' | 'cantidadSurtida') =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newRow = { ...rows[index], [field]: e.target.value };
        onRowChange(index, newRow);
      },
    [rows, onRowChange]
  );

  const emptyRowsCount = Math.max(0, MIN_ROWS - rows.length);

  return (
    <table className="w-full border-collapse border border-black text-xs">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-black p-1 font-bold w-[10%]">CODIGO</th>
          <th className="border border-black p-1 font-bold w-[35%]">DESCRIPCION DEL ARTICULO</th>
          <th className="border border-black p-1 font-bold w-[10%]">UNIDAD</th>
          <th className="border border-black p-1 font-bold w-[8%]">CANTIDAD<br />PEDIDA</th>
          <th className="border border-black p-1 font-bold w-[8%]">CANTIDAD<br />SURTIDA</th>
          <th className="border border-black p-1 font-bold">CANTIDAD SURTIDA CON LETRA/<br />OBSERVACIONES</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={row.id} className="h-8 group relative">
            <td className="border border-black text-center p-1 align-top relative">
              <button
                onClick={() => onRemoveRow(row.id)}
                className="absolute -left-2 top-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Eliminar fila"
                disabled={rows.length <= 1}
              >
                X
              </button>
              {row.articulo?.codigo || ''}
            </td>
            <td className="border border-black p-0 align-top">
              <ArticleCombobox
                articles={articles}
                selectedArticle={row.articulo || null}
                onSelect={(selectedArticle) => {
                  const newRow = {
                    ...row,
                    articulo: selectedArticle || undefined,
                    cantidadPedida: '',
                    cantidadSurtida: ''
                  };
                  onRowChange(index, newRow);
                }}
              />
            </td>
            <td className="border border-black text-center p-1 align-top">{row.articulo?.presentacion || ''}</td>
            <td className="border border-black p-0 align-top">
              <QuantityInput
                value={row.cantidadPedida}
                onChange={handleQuantityChange(index, 'cantidadPedida')}
                disabled={!row.articulo}
                aria-label={`Cantidad pedida para ${row.articulo?.descripcion}`}
              />
            </td>
            <td className="border border-black p-0 align-top">
              <QuantityInput
                value={row.cantidadSurtida}
                onChange={handleQuantityChange(index, 'cantidadSurtida')}
                disabled={!row.articulo}
                aria-label={`Cantidad surtida para ${row.articulo?.descripcion}`}
              />
            </td>
            <td className="border border-black text-center p-1 align-top">{row.observaciones}</td>
          </tr>
        ))}
        {/* Renderizar filas vacías para mantener el formato del PDF */}
        {Array.from({ length: emptyRowsCount }).map((_, index) => (
            <tr key={`empty-${index}`} className="h-8">
                <td className="border border-black"></td>
                <td className="border border-black"></td>
                <td className="border border-black"></td>
                <td className="border border-black"></td>
                <td className="border border-black"></td>
                <td className="border border-black"></td>
            </tr>
        ))}
      </tbody>
    </table>
  );
};

export default React.memo(OrderTable);
