// src/App.tsx

import React, { useState, useEffect } from 'react';
import { pb } from './lib/pocketbase';
import OrderTable from './components/OrderTable';
import type { Article, FormRow } from './types';

function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [rows, setRows] = useState<FormRow[]>([
    { id: 1, cantidadPedida: '', cantidadSurtida: '', observaciones: '' }
  ]);
  const [nextId, setNextId] = useState(2);

  useEffect(() => {
    const controller = new AbortController();
    const fetchArticles = async () => {
      try {
        const records = await pb.collection('articulos').getFullList<Article>({
          sort: 'descripcion',
          signal: controller.signal,
        });
        setArticles(records);
      } catch (error: any) {
        if (!error.isAbort) {
          console.error("Hubo un error al cargar los artículos:", error);
        }
      }
    };
    fetchArticles();
    return () => {
      controller.abort();
    };
  }, []);

  const handleRowChange = (index: number, updatedRow: FormRow) => {
    const newRows = [...rows];
    newRows[index] = updatedRow;
    setRows(newRows);
  };

  const handleAddRow = () => {
    const newRow: FormRow = {
      id: nextId,
      cantidadPedida: '',
      cantidadSurtida: '',
      observaciones: ''
    };
    setRows([...rows, newRow]);
    setNextId(prevId => prevId + 1);
  };

  const handleRemoveRow = (idToRemove: number) => {
    if (rows.length <= 1) return;
    setRows(rows.filter(row => row.id !== idToRemove));
  };

  return (
    <div className="max-w-7xl mx-auto p-6 font-serif text-xs bg-white">
      <header className="mb-4">
        <div className="text-center">
            <h1 className="font-bold text-lg">HOSPITAL CIVIL DE GUADALAJARA</h1>
            <h2 className="font-bold text-base">PEDIDO AL ALMACEN</h2>
            <h3 className="font-bold text-base">VIVERES</h3>
        </div>
        
        <div className="flex justify-between mt-4">
            <span><span className="font-bold">Unidad Hospitalaria:</span> Fray Antonio Alcalde</span>
            <span><span className="font-bold">Partida Presupuestal:</span> 2212</span>
        </div>
         <div className="flex justify-between mt-2">
            <span><span className="font-bold">FECHA:</span> 15-sep-2025</span>
            <span><span className="font-bold">SERVICIO:</span> DIETOLOGIA</span>
        </div>
        <div className="mt-2">
            <span><span className="font-bold">CUENTA:</span> __________________</span>
        </div>
      </header>

      <main className="my-6">
        <OrderTable
          rows={rows}
          articles={articles}
          onRowChange={handleRowChange}
          onRemoveRow={handleRemoveRow}
        />
        <div className="mt-6 flex justify-center">
            <button
              onClick={handleAddRow}
              className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              + Agregar Fila
            </button>
        </div>
      </main>

      <footer className="grid grid-cols-4 gap-4 text-center">
        <div className="flex flex-col justify-end">
          <div className="border-t border-black h-12 mb-1"></div>
          <p className="font-bold">JEFE DE SERVICIO DIETOLOGÍA</p>
          <p>KARLA MABEL GUTIERREZ VELASCO</p>
          <p>2000060</p>
          <p className="text-gray-600 mt-2">NOMBRE Y FIRMA</p>
        </div>
        <div className="flex flex-col justify-end">
          <div className="border-t border-black h-12 mb-1"></div>
          <p className="font-bold">ALMACÉN DE VÍVERES</p>
          <p>OSCAR BECERRA GONZALEZ</p>
          <p>980933</p>
          <p className="text-gray-600 mt-2">NOMBRE Y FIRMA</p>
        </div>
        <div className="flex flex-col justify-end">
          <div className="border-t border-black h-12 mb-1"></div>
          <p className="font-bold">ENTREGADO POR</p>
          <p className="text-gray-600 mt-8">NOMBRE, Y RUD</p>
        </div>
        <div className="flex flex-col justify-end">
          <div className="border-t border-black h-12 mb-1"></div>
          <p className="font-bold">RECIBIDO POR</p>
          <p className="text-gray-600 mt-8">NOMBRE, Y RUD</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
