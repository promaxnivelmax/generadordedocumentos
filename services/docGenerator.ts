
import { DocumentData, ServiceType } from '../types';

declare var html2pdf: any;

export const generateDocument = async (type: ServiceType, data: DocumentData): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 1500));

  if (type === 'RESUME') {
    const element = document.createElement('div');
    element.innerHTML = `
      <style>
        @page { margin: 0; padding: 0; }
        .pdf-wrapper {
          width: 215.9mm;
          min-height: 279.4mm;
          margin: 0 !important;
          padding: 0 !important;
          background: #FFF;
          font-family: 'Inter', 'Arial', sans-serif;
          color: #0c0a09;
          display: flex;
          box-sizing: border-box;
          overflow: hidden;
        }
        .main-column {
          flex: 1;
          padding: 12mm 15mm;
          background: #FFF;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
        }
        .header-section {
          display: flex;
          gap: 25px;
          margin-bottom: 30px;
          align-items: center;
          border-bottom: 4px solid #dc2626;
          padding-bottom: 25px;
        }
        .photo-box {
          width: 120px;
          height: 160px;
          border: 3px solid #dc2626;
          border-radius: 8px;
          overflow: hidden;
          background: #f5f5f5;
        }
        .photo-box img { width: 100%; height: 100%; object-fit: cover; }
        
        .name-box h1 { font-size: 26pt; font-weight: 900; color: #0c0a09; text-transform: uppercase; line-height: 1; margin: 0; }
        .name-box h2 { font-size: 14pt; font-weight: 700; color: #dc2626; margin: 8px 0 0 0; text-transform: uppercase; letter-spacing: 1px; }

        .content-grid {
          display: grid;
          grid-template-columns: 70mm 1fr;
          gap: 30px;
          flex: 1;
        }

        .left-panel { border-right: 1px solid #eee; padding-right: 15px; }
        
        .section-title {
          font-size: 10pt;
          font-weight: 800;
          color: #dc2626;
          text-transform: uppercase;
          margin-bottom: 12px;
          border-left: 4px solid #dc2626;
          padding-left: 10px;
          letter-spacing: 1px;
        }

        .data-item { margin-bottom: 12px; }
        .data-item b { font-size: 8pt; color: #777; text-transform: uppercase; display: block; margin-bottom: 2px; }
        .data-item p { font-size: 9.5pt; color: #0c0a09; margin: 0; line-height: 1.3; }

        .right-panel { padding-left: 5px; }

        .summary-box { font-size: 10pt; text-align: justify; line-height: 1.5; color: #333; margin-bottom: 25px; }

        .entry-item { margin-bottom: 20px; page-break-inside: avoid; }
        .entry-header { display: flex; justify-content: space-between; font-weight: 800; font-size: 10.5pt; margin-bottom: 2px; }
        .entry-date { color: #dc2626; font-size: 9pt; }
        .entry-org { font-weight: 700; color: #444; font-size: 10pt; }
        .entry-desc { font-size: 9pt; color: #666; font-style: italic; }

        .ref-detailed { 
          background: #fcfcfc;
          border: 1px solid #eee;
          padding: 10px;
          border-radius: 6px;
          margin-bottom: 12px;
        }
        .ref-name { font-weight: 800; font-size: 10pt; color: #0c0a09; display: block; margin-bottom: 2px; }
        .ref-prof { color: #dc2626; font-size: 8.5pt; font-weight: 700; text-transform: uppercase; }
        .ref-phone { font-size: 9.5pt; color: #444; margin-top: 4px; display: block; font-weight: bold; }

        .signature-section { margin-top: auto; padding-top: 40px; text-align: center; }
        .sig-line { border-top: 2px solid #0c0a09; width: 220px; margin: 0 auto 8px auto; }
        .sig-name { font-size: 11pt; font-weight: 800; text-transform: uppercase; }
        .sig-id { font-size: 9.5pt; color: #555; }
      </style>
      <div class="pdf-wrapper">
        <div class="main-column">
          <div class="header-section">
            <div class="photo-box">
              ${data.fotoBase64 ? `<img src="${data.fotoBase64}" />` : '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#ccc;font-size:9pt;">FOTO</div>'}
            </div>
            <div class="name-box">
              <h1>${data.nombresApellidos}</h1>
              <h2>${data.cargoProfesion}</h2>
            </div>
          </div>

          <div class="content-grid">
            <div class="left-panel">
              <div class="section-title">Información Personal</div>
              <div class="data-item"><b>Documento</b> <p>${data.tipoDocumento} ${data.numeroDocumento}</p></div>
              <div class="data-item"><b>Lugar Expedición</b> <p>${data.lugarExpedicion}</p></div>
              <div class="data-item"><b>Fecha Nacimiento</b> <p>${data.fechaNacimiento}</p></div>
              <div class="data-item"><b>Lugar Nacimiento</b> <p>${data.lugarNacimiento}</p></div>
              
              <div class="section-title" style="margin-top:25px;">Contacto</div>
              <div class="data-item"><b>Celular</b> <p>${data.telefono}</p></div>
              <div class="data-item"><b>Correo</b> <p>${data.correoElectronico}</p></div>
              <div class="data-item"><b>Residencia</b> <p>${data.direccion}<br>${data.barrio}<br>${data.ciudadResidencia}</p></div>

              ${data.referencias && data.referencias.length > 0 ? `
              <div class="section-title" style="margin-top:25px;">Referencias</div>
              ${data.referencias.map(r => `
                <div class="ref-detailed">
                  <span class="ref-name">${r.nombre}</span>
                  <span class="ref-prof">${r.profesion}</span>
                  <span class="ref-phone">Cel: ${r.celular}</span>
                  <span style="font-size: 7.5pt; color: #888; text-transform: uppercase;">Referencia ${r.tipo}</span>
                </div>
              `).join('')}
              ` : ''}
            </div>

            <div class="right-panel">
              <div class="section-title">Perfil Profesional</div>
              <div class="summary-box">
                ${data.perfilProfesional || 'Profesional altamente calificado con sólida formación y experiencia orientada a resultados. Poseo gran capacidad analítica, liderazgo de equipos y adaptabilidad a entornos dinámicos.'}
              </div>

              ${data.experiencias && data.experiencias.length > 0 ? `
              <div class="section-title">Experiencia Laboral</div>
              ${data.experiencias.map(e => `
                <div class="entry-item">
                  <div class="entry-header">
                    <span>${e.cargo}</span>
                    <span class="entry-date">${e.fechaInicio} — ${e.fechaFinal || 'Actual'}</span>
                  </div>
                  <div class="entry-org">${e.empresa}</div>
                </div>
              `).join('')}
              ` : ''}

              ${data.estudios && data.estudios.length > 0 ? `
              <div class="section-title">Formación Académica</div>
              ${data.estudios.map(s => `
                <div class="entry-item">
                  <div class="entry-header">
                    <span>${s.titulo}</span>
                    <span class="entry-date">${s.fechaGrado}</span>
                  </div>
                  <div class="entry-org">${s.institucion}</div>
                  <div class="entry-desc">${s.nivel}</div>
                </div>
              `).join('')}
              ` : ''}

              <div class="signature-section">
                <div class="sig-line"></div>
                <div class="sig-name">${data.nombresApellidos}</div>
                <div class="sig-id">${data.tipoDocumento} No. ${data.numeroDocumento}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    const opt = {
      margin: 0,
      filename: `Hoja_De_Vida_${data.nombresApellidos.replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 3, useCORS: true, letterRendering: true, scrollY: 0 },
      jsPDF: { unit: 'mm', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(element).set(opt).save();
    return;
  }

  // Mapeo de nombres de archivos en español
  const fileNames: Record<ServiceType, string> = {
    'PETITION': 'Prescripcion_Comparendo_RNMC',
    'GENERAL_PETITION': 'Derecho_Peticion_General',
    'RESIGNATION': 'Carta_Renuncia_Laboral',
    'PERSONAL_REF': 'Certificado_Referencia_Personal',
    'FAMILY_REF': 'Certificado_Referencia_Familiar',
    'POWER_OF_ATTORNEY': 'Poder_Amplio_y_Suficiente',
    'WORK_REF': 'Certificacion_Laboral',
    'RESUME': 'Hoja_De_Vida'
  };

  let bodyContent = "";

  switch (type) {
    case 'PETITION':
      bodyContent = `
        <div style="margin-bottom: 25px;">${data.ciudadFecha}</div>
        <div style="margin-bottom: 35px; font-weight: bold;">
          Señores<br><br>
          SECRETARÍA DE HACIENDA<br>
          DISTRITO DE BARRANCABERMEJA<br>
          E. S. D.
        </div>
        <div style="margin-bottom: 25px; font-weight: bold; text-decoration: underline;">ASUNTO: Derecho de Petición</div>
        <div style="text-align: justify; line-height: 1.6; font-size: 12pt;">
          Yo, <b>${data.nombresApellidos}</b>, mayor de edad, identificado con <b>${data.tipoDocumento}</b> número <b>${data.numeroDocumento}</b>, domiciliado en la ciudad de <b>${data.ciudadResidencia}</b>, en atención a las previsiones que consagran el Derecho Constitucional Fundamental de Petición contenido en el artículo 23 de la Constitución Política de Colombia, desarrollado por los artículos 5, 6, 17, 31 y 32 del Código Contencioso Administrativo y demás normas concordantes, me permito dirigir el presente escrito ante esta Entidad, para los efectos previstos en el artículo 226 de la Ley 1801 de 2016, con el fin de que OFICIOSAMENTE se declare la <b>PRESCRIPCIÓN</b> de la sanción impuesta con ocasión de infracción de convivencia, conforme a la Orden de Comparendo No. <b>${data.numeroComparendo}</b>, Expediente RNMC No. <b>${data.numeroExpediente}</b>, de fecha <b>${data.fechaComparendo}</b>, asignado a la Inspección de Policía Permanente de Barrancabermeja, Turno <b>${data.numeroTurno}</b>.
          <br><br>
          Así mismo, solicito se sirva actualizar las bases de datos del Registro Nacional de Medidas Correctivas (RNMC) de la Policía Nacional y cualquier otra base de datos en la que figure como deudor de dicha sanción, teniendo en cuenta que la acción de cobro se encuentra prescrita, de conformidad con lo establecido en el artículo 817 del Estatuto Tributario, al haber transcurrido un término superior a cinco (5) años.
          <br><br>
          La respuesta a este derecho de petición podrá ser remitida al siguiente correo electrónico: <b>${data.correoElectronico}</b>.
        </div>
      `;
      break;

    case 'GENERAL_PETITION':
      bodyContent = `
        <div style="margin-bottom: 25px;">${data.ciudadFecha}</div>
        <div style="margin-bottom: 25px; font-weight: bold;">Señores<br>${data.entidadDirigida || 'A QUIEN CORRESPONDA'}<br>E. S. D.</div>
        <div style="margin-bottom: 25px; font-weight: bold; text-decoration: underline;">ASUNTO: DERECHO DE PETICIÓN (Art. 23 C.P.)</div>
        <div style="text-align: justify; line-height: 1.8; font-size: 12pt;">
          Yo, <b>${data.nombresApellidos}</b>, ciudadano(a) mayor de edad e identificado(a) como aparece al pie de mi firma, en ejercicio del derecho fundamental de petición consagrado en el artículo 23 de la Constitución Política de Colombia y conforme a las disposiciones de la Ley 1755 de 2015, me permito presentar ante ustedes la siguiente solicitud respetuosa:
          <br><br>
          <b>FUNDAMENTOS DE HECHO:</b><br>${data.hechosPeticion}
          <br><br>
          <b>PETICIÓN CONCRETA:</b><br>${data.pretensionesPeticion}
          <br><br>
          Para efectos de notificación, recibiré respuesta en la dirección: <b>${data.direccion}</b>, barrio <b>${data.barrio}</b>, o al correo electrónico <b>${data.correoElectronico}</b>.
        </div>
      `;
      break;

    case 'RESIGNATION':
      bodyContent = `
        <div style="margin-bottom: 25px;">${data.ciudadFecha}</div>
        <div style="margin-bottom: 35px; font-weight: bold;">
          Señores<br>
          <b>${data.empresaNombre}</b><br>
          Departamento de Talento Humano / Gerencia General<br>
          Ciudad.
        </div>
        <div style="margin-bottom: 25px; font-weight: bold; text-decoration: underline;">ASUNTO: RENUNCIA VOLUNTARIA E IRREVOCABLE</div>
        <div style="text-align: justify; line-height: 1.8; font-size: 12pt;">
          Respetados señores:
          <br><br>
          Por medio de la presente, yo <b>${data.nombresApellidos}</b>, identificado(a) con <b>${data.tipoDocumento}</b> No. <b>${data.numeroDocumento}</b>, me permito presentar ante ustedes mi renuncia formal, voluntaria e irrevocable al cargo de <b>${data.cargoDesempenado}</b> que he venido desempeñando con orgullo en su prestigiosa organización. 
          <br><br>
          Esta decisión responde a motivos estrictamente personales y de crecimiento profesional que me impulsan a iniciar una nueva etapa en mi carrera. Informo que mi último día de vinculación laboral efectiva será el próximo <b>${data.ultimoDiaLaboral}</b>, fecha en la cual haré entrega formal de mis funciones y responsabilidades asignadas.
          <br><br>
          Quiero expresar mi más profundo agradecimiento a la empresa, a la dirección y a mis compañeros de trabajo por la confianza depositada en mi gestión, así como por las invaluables oportunidades de aprendizaje y desarrollo profesional que me brindaron durante mi permanencia. Me llevo una experiencia sumamente enriquecedora de esta institución.
          <br><br>
          Quedo a su entera disposición para colaborar en el proceso de empalme y transición de cargo, asegurando que mis labores queden al día y en orden.
        </div>
      `;
      break;

    case 'PERSONAL_REF':
    case 'FAMILY_REF':
      bodyContent = `
        <div style="margin-bottom: 25px;">${data.ciudadFecha}</div>
        <br><br>
        <div style="text-align: center; margin-bottom: 45px; font-weight: bold; font-size: 16pt; text-decoration: underline;">CERTIFICACIÓN DE REFERENCIA ${type === 'FAMILY_REF' ? 'FAMILIAR' : 'PERSONAL'}</div>
        <br>
        <div style="text-align: justify; line-height: 2.0; font-size: 12pt;">
          <b>A QUIEN CORRESPONDA:</b>
          <br><br>
          El suscrito, <b>${data.nombresApellidos}</b>, ciudadano(a) mayor de edad, identificado(a) con <b>${data.tipoDocumento}</b> No. <b>${data.numeroDocumento}</b>, domiciliado en la ciudad de <b>${data.ciudadResidencia}</b>, hace constar por medio del presente documento que conoce de vista, trato y comunicación desde hace aproximadamente <b>${data.tiempoConocimiento}</b> al señor(a) <b>${data.nombreReferenciado}</b>, identificado(a) con cédula de ciudadanía No. <b>${data.cedulaReferenciado}</b>.
          <br><br>
          Durante el tiempo de nuestro conocimiento, el/la referido(a) ha demostrado poseer una intachable conducta moral, altos valores éticos, un gran sentido de la responsabilidad y honestidad absoluta en todos sus actos. Por tal motivo, doy fe de su buen nombre y su capacidad para asumir compromisos con seriedad y excelencia.
          <br><br>
          No tengo reserva alguna en recomendarlo(a) ampliamente para cualquier actividad, cargo o responsabilidad que se le asigne, pues tengo la plena seguridad de que su desempeño será ejemplar.
          <br><br>
          La presente certificación se expide a solicitud de la parte interesada a los <b>${new Date().getDate()}</b> días del mes de <b>${new Date().toLocaleDateString('es-CO', {month: 'long'})}</b> de <b>${new Date().getFullYear()}</b>.
        </div>
      `;
      break;

    case 'POWER_OF_ATTORNEY':
      bodyContent = `
        <div style="margin-bottom: 25px;">${data.ciudadFecha}</div>
        <br>
        <div style="text-align: center; margin-bottom: 40px; font-weight: bold; font-size: 16pt; text-decoration: underline;">PODER ESPECIAL, AMPLIO Y SUFICIENTE</div>
        <br>
        <div style="text-align: justify; line-height: 1.8; font-size: 12pt;">
          Yo, <b>${data.nombresApellidos}</b>, mayor de edad, plenamente identificado(a) con <b>${data.tipoDocumento}</b> No. <b>${data.numeroDocumento}</b> y con domicilio en la ciudad de <b>${data.ciudadResidencia}</b>, manifiesto que por medio del presente documento confiero <b>PODER ESPECIAL, AMPLIO Y SUFICIENTE</b> al señor(a) <b>${data.nombreApoderado}</b>, también mayor de edad e identificado(a) con cédula No. <b>${data.cedulaApoderado}</b>, para que en mi nombre y representación adelante todas las gestiones administrativas, legales y trámites ante las autoridades competentes relacionados con: 
          <br><br>
          <b>${data.tramiteEspecifico}</b>
          <br><br>
          Mi apoderado(a) queda expresamente facultado(a) para radicar solicitudes, firmar documentos públicos o privados, presentar peticiones, recibir notificaciones, interponer recursos y, en general, realizar cualquier actuación que sea necesaria y conducente para el cabal cumplimiento del encargo aquí otorgado.
          <br><br>
          En señal de aceptación de las facultades conferidas, se firma el presente documento en la ciudad de <b>${data.ciudadResidencia}</b>.
        </div>
      `;
      break;

    default:
      bodyContent = `<div style="padding: 50px;">Contenido de documento profesional generado.</div>`;
  }

  const footer = `
    <div style="margin-top: 80px;">
      Cordialmente,<br><br><br><br>
      <div style="border-top: 1px solid #000; width: 250px; margin-bottom: 10px;"></div>
      <b>${data.nombresApellidos}</b><br>
      ${data.tipoDocumento} No. ${data.numeroDocumento}<br>
      Teléfono: ${data.telefono}<br>
      Ciudad: ${data.ciudadResidencia}
    </div>
  `;

  const htmlContent = `
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Arial', sans-serif; padding: 2.5cm; color: #000; font-size: 12pt; background: #fff; }
          @page { size: letter; margin: 1in; }
        </style>
      </head>
      <body>
        ${bodyContent}
        ${footer}
      </body>
    </html>
  `;
  
  const blob = new Blob(['\ufeff', htmlContent], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${fileNames[type] || 'Documento'}_${data.numeroDocumento}.doc`;
  link.click();
  URL.revokeObjectURL(url);
};
