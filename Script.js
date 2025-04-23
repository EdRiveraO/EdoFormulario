const preciosVitaminas = {
  "Crecedor": 100000,
  "Engordador": 85000,
  "Vitaminador": 75000
};

const dosisVitaminas = {
  "Crecedor": 10,
  "Engordador": 12,
  "Vitaminador": 15
};

function actualizarCostoVitaminas() {
  const producto = document.getElementById("productoVitaminas").value;
  const costo = document.getElementById("costoVitaminas");
  const dosis = document.getElementById("dosisVitaminas");

  if (producto && preciosVitaminas[producto] !== undefined) {
    costo.value = preciosVitaminas[producto];
    dosis.value = dosisVitaminas[producto];
  } else {
    costo.value = "";
    dosis.value = "";
  }
}

function validarCampos() {
  const ids = [
    "nit", "nombreFinca", "explotacion", "animales", "decisionCompra",
    "quienToma", "criterio", "pesaMide", "almacenCompra",
    "productoVitaminas", "costoVitaminas", "dosisVitaminas", "aplicacionesVitaminas"
  ];

  for (const id of ids) {
    const campo = document.getElementById(id);
    if (!campo || campo.value.trim() === "") {
      alert(`Por favor completa el campo: ${id}`);
      campo.focus();
      return false;
    }
  }
  return true;
}

function confirmar() {
  if (!validarCampos()) return;

  const nit = document.getElementById("nit").value;
  const nombreFinca = document.getElementById("nombreFinca").value;
  const explotacion = document.getElementById("explotacion").value;
  const animales = document.getElementById("animales").value;
  const decisionCompra = document.getElementById("decisionCompra").value;
  const quienToma = document.getElementById("quienToma").value;
  const criterio = document.getElementById("criterio").value;
  const pesaMide = document.getElementById("pesaMide").value;
  const almacen = document.getElementById("almacenCompra").value;
  const producto = document.getElementById("productoVitaminas").value;
  const costo = document.getElementById("costoVitaminas").value;
  const dosis = document.getElementById("dosisVitaminas").value;
  const aplicaciones = document.getElementById("aplicacionesVitaminas").value;

  let contenido = `<p><strong>Razón Social, NIT:</strong> ${nit}</p>`;
  contenido += `<p><strong>Finca:</strong> ${nombreFinca}</p>`;
  contenido += `<p><strong>Tipo explotación:</strong> ${explotacion}</p>`;
  contenido += `<p><strong>N° animales:</strong> ${animales}</p>`;
  contenido += `<p><strong>Decisión de compra:</strong> ${decisionCompra}</p>`;
  contenido += `<p><strong>Quién decide:</strong> ${quienToma}</p>`;
  contenido += `<p><strong>Criterio:</strong> ${criterio}</p>`;
  contenido += `<p><strong>¿Pesa o mide?:</strong> ${pesaMide}</p>`;
  contenido += `<p><strong>Almacén:</strong> ${almacen}</p>`;
  contenido += `<hr><p><strong>Producto Vitaminas:</strong> ${producto}</p>`;
  contenido += `<p><strong>Costo:</strong> $${parseInt(costo).toLocaleString()}</p>`;
  contenido += `<p><strong>Dosis:</strong> ${dosis} mL</p>`;
  contenido += `<p><strong>Aplicaciones/año:</strong> ${aplicaciones}</p>`;

  if (producto === "Crecedor") {
    const frascos = Math.ceil((1000 * parseInt(aplicaciones)) * parseInt(dosis) / 500);
    contenido += `<p><strong>Frascos/año (calculado):</strong> ${frascos}</p>`;
  }

  document.getElementById("contenidoResumen").innerHTML = contenido;
  document.getElementById("panelResumen").classList.add("open");
  document.getElementById("panelResumen").style.paddingBottom = "100px";
}

function cerrarResumen() {
  document.getElementById("panelResumen").classList.remove("open");
}

function descargarPDF() {
  const panel = document.getElementById("panelResumen");
  const now = new Date();
  const fecha = now.toLocaleString('es-CO').replace(/[:/\s]/g, '-');
  const nombre = `ficha_cliente_resultados_${fecha}.pdf`;

  const opt = {
    margin: 0,
    filename: nombre,
    image: { type: 'jpeg', quality: 1 },
    html2canvas: { scale: 3, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(panel).save();
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("productoVitaminas").addEventListener("change", actualizarCostoVitaminas);
});