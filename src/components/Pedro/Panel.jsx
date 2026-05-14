import { useState, useRef, useEffect} from "react";
import * as XLSX from "xlsx";
import { AFILIADOS_INICIAL, CAMPOS, VACIO } from "./data/afiliados";
import styles from "./Panel.module.css";

function Formulario({ form, onChange, onGuardar, onCancelar, titulo }) {
  return (
    <div className={styles.formBox}>
      <p className={styles.formTitulo}>{titulo}</p>
      <div className={styles.formGrid}>
        {CAMPOS.map((c) => (
          <div key={c.key} className={styles.formField}>
            <label className={styles.label}>{c.label}</label>
            <input
              className={styles.input}
              value={form[c.key]}
              onChange={(e) => onChange(c.key, e.target.value)}
            />
          </div>
        ))}
      </div>
      <div className={styles.formActions}>
        <button className={styles.btnPrimary} onClick={onGuardar}>Guardar</button>
        <button className={styles.btnGhost} onClick={onCancelar}>Cancelar</button>
      </div>
    </div>
  );
}

export default function Panel() {
  // GUARDAMO EN LOCAL STORAGE
  const [personas, setPersonas] = useState(() => {
    const persistido = localStorage.getItem("padron_afiliados");
    return persistido ? JSON.parse(persistido) : AFILIADOS_INICIAL;
  });

  const [busqueda, setBusqueda] = useState("");
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState(VACIO);
  const [agregando, setAgregando] = useState(false);
  
  const fileInputRef = useRef(null);


  useEffect(() => {
    localStorage.setItem("padron_afiliados", JSON.stringify(personas));
  }, [personas]);

 
const handleImport = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (evt) => {
    const bstr = evt.target.result;
    const wb = XLSX.read(bstr, { type: "binary" });
    const ws = wb.Sheets[wb.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(ws, { defval: "" });

    setPersonas(prev => {
      let listaNueva = [...prev];
      let cont = 0;

      data.forEach((fila, index) => {
        // Función ultra-detectora: busca una palabra clave en las llaves del Excel
        const buscarValor = (palabraClave) => {
          const llaveEncontrada = Object.keys(fila).find(k => 
            k.toLowerCase().includes(palabraClave.toLowerCase())
          );
          return llaveEncontrada ? String(fila[llaveEncontrada]).trim() : "";
        };

        const dni = buscarValor("dni").replace(/\D/g, "");
        const nombre = buscarValor("nombre");

        if (nombre && dni) {
          const existe = listaNueva.some(p => String(p.dni) === dni);
          if (!existe) {
            const nuevo = {
              id: Date.now() + index + Math.random(),
              nombre: nombre,
              apellido: buscarValor("apellido"),
              dni: dni,
              direccion: buscarValor("direcc") || buscarValor("calle"),
              ciudad: buscarValor("ciudad") || buscarValor("prov") || buscarValor("loca"),
              mail: buscarValor("mail") || buscarValor("correo") || buscarValor("email"),
              telefono: buscarValor("tel") || buscarValor("cel") || buscarValor("contac")
            };
            listaNueva.push(nuevo);
            cont++;
          }
        }
      });
      alert(`Se agregaron ${cont} nuevos.`);
      return listaNueva;
    });
    e.target.value = "";
  };
  reader.readAsBinaryString(file);
};
  const filtradas = busqueda.trim()
    ? personas.filter((p) => p.dni.includes(busqueda.trim()))
    : personas;  
  const cambiar = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  function borrar(id) {
    if (confirm("¿Eliminar este afiliado?"))
      setPersonas((p) => p.filter((x) => x.id !== id));
  }

  function editar(p) {
    setEditando(p.id);
    setForm({ ...p });
    setAgregando(false);
  }

  function guardarEdicion() {
    setPersonas((p) => p.map((x) => (x.id === editando ? { ...form, id: editando } : x)));
    setEditando(null);
    setForm(VACIO);
  }

  function iniciarAgregar() {
    setAgregando(true);
    setEditando(null);
    setForm(VACIO);
  }

  function guardarNuevo() {
    setPersonas((p) => [...p, { ...form, id: Date.now() }]);
    setAgregando(false);
    setForm(VACIO);
  }

  function cancelar() {
    setEditando(null);
    setAgregando(false);
    setForm(VACIO);
  }

  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.titulo}>Padrón <span className={styles.acento}>afiliados</span></h1>
          <p className={styles.subtitulo}>Sistema de gestión · {personas.length} registros totales</p>
        </div>
        
        <div className={styles.actions}>
          {/* Input oculto y botón de importación */}
          <input 
            type="file" 
            ref={fileInputRef} 
            style={{ display: 'none' }} 
            accept=".xlsx, .xls" 
            onChange={handleImport}
          />
          <button 
            className={styles.btnGhost} 
            onClick={() => fileInputRef.current.click()}
            style={{ marginRight: '10px' }}
          >
            Importar Excel
          </button>

          {!agregando && (
            <button className={styles.btnPrimary} onClick={iniciarAgregar}>+ Nuevo</button>
          )}
        </div>
      </header>

      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon}>⌕</span>
          <input
            className={styles.searchInput}
            placeholder="Buscar por DNI..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          {busqueda && (
            <button className={styles.clearBtn} onClick={() => setBusqueda("")}>✕</button>
          )}
        </div>
        <span className={styles.count}>
          {filtradas.length} resultado{filtradas.length !== 1 ? "s" : ""}
          {busqueda && ` para "${busqueda}"`}
        </span>
      </div>

      {agregando && (
        <Formulario
          form={form}
          onChange={cambiar}
          onGuardar={guardarNuevo}
          onCancelar={cancelar}
          titulo="Nuevo afiliado"
        />
      )}

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              {CAMPOS.map((c) => (
                <th key={c.key} className={styles.th}>{c.label}</th>
              ))}
              <th className={styles.th}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtradas.length === 0 && (
              <tr>
                <td colSpan={CAMPOS.length + 1} className={styles.empty}>
                  Sin resultados para ese DNI.
                </td>
              </tr>
            )}
            {filtradas.map((p) =>
              editando === p.id ? (
                <tr key={p.id} className={styles.rowEditing}>
                  {CAMPOS.map((c) => (
                    <td key={c.key} className={styles.td}>
                      <input
                        className={`${styles.input} ${styles.inputInline}`}
                        value={form[c.key]}
                        onChange={(e) => cambiar(c.key, e.target.value)}
                      />
                    </td>
                  ))}
                  <td className={styles.td}>
                    <div className={styles.actions}>
                      <button className={`${styles.btnPrimary} ${styles.btnSm}`} onClick={guardarEdicion}>Guardar</button>
                      <button className={`${styles.btnGhost} ${styles.btnSm}`} onClick={cancelar}>Cancelar</button>
                    </div>
                  </td>
                </tr>
              ) : (
                <tr key={p.id} className={styles.row}>
                  {CAMPOS.map((c) => (
                    <td key={c.key} className={styles.td}>{p[c.key]}</td>
                  ))}
                  <td className={styles.td}>
                    <div className={styles.actions}>
                      <button className={`${styles.btnGhost} ${styles.btnSm}`} onClick={() => editar(p)}>Editar</button>
                      <button className={`${styles.btnDanger} ${styles.btnSm}`} onClick={() => borrar(p.id)}>Borrar</button>
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}