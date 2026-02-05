
import { DocumentData, ServiceType } from '../types';

export const generateDocument = async (type: ServiceType, data: DocumentData): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 1500));

  let bodyContent = '';

  switch (type) {
    case 'GENERAL_PETITION':
      bodyContent = `
        <div style="margin-bottom: 30px;">${data.ciudadFecha}</div>
        <div style="margin-bottom: 25px; font-weight: bold;">Señores<br>${data.entidadDirigida?.toUpperCase()}<br>E. S. D.</div>
        <div style="margin-bottom: 25px; font-weight: bold;">ASUNTO: ${data.asuntoPeticion?.toUpperCase()}</div>
        <div class="justified" style="margin-bottom: 20px;">
          Yo, <b>${data.nombresApellidos}</b>, mayor de edad, identificado con ${data.tipoDocumento} No. <b>${data.numeroDocumento}</b>, domiciliado en la ciudad de ${data.ciudadResidencia}, actuando en ejercicio del Derecho Fundamental de Petición consagrado en el artículo 23 de la Constitución Política de Colombia y la Ley 1755 de 2015, me permito elevar ante ustedes la siguiente solicitud respetuosa, basada en los siguientes:
        </div>
        <div style="margin-bottom: 10px; font-weight: bold;">HECHOS</div>
        <div class="justified" style="margin-bottom: 20px; white-space: pre-wrap;">${data.hechosPeticion}</div>
        <div style="margin-bottom: 10px; font-weight: bold;">PRETENSIONES</div>
        <div class="justified" style="margin-bottom: 20px; white-space: pre-wrap;">${data.pretensionesPeticion}</div>
        <div class="justified" style="margin-bottom: 20px;">
          Solicito amablemente que se me brinde respuesta de fondo a lo aquí planteado dentro de los términos legales establecidos, remitiendo la comunicación al correo electrónico: <u>${data.correoElectronico}</u>.
        </div>
      `;
      break;

    case 'PETITION':
      bodyContent = `
        <div style="margin-bottom: 30px;">${data.ciudadFecha}</div>
        <div style="margin-bottom: 25px; font-weight: bold;">Señores<br>SECRETARÍA DE HACIENDA<br>DISTRITO DE BARRANCABERMEJA<br>E. S. D.</div>
        <div style="margin-bottom: 25px; font-weight: bold;">ASUNTO: Derecho de Petición</div>
        
        <div class="justified" style="margin-bottom: 15px;">
          Yo, <b>${data.nombresApellidos}</b>, mayor de edad, identificado con ${data.tipoDocumento} número <b>${data.numeroDocumento}</b>, domiciliado en la ciudad de ${data.ciudadResidencia}, en atención a las previsiones que consagran el Derecho Constitucional Fundamental de Petición contenido en el artículo 23 de la Constitución Política de Colombia, desarrollado por los artículos 5, 6, 17, 31 y 32 del Código Contencioso Administrativo y demás normas concordantes, me permito dirigir el presente escrito ante esta Entidad, para los efectos previstos en el artículo 226 de la Ley 1801 de 2016, con el fin de que <b>OFICIOSAMENTE</b> se declare la <b>PRESCRIPCIÓN</b> de la sanción impuesta con ocasión de infracción de convivencia, conforme a la Orden de Comparendo No. <b>${data.numeroComparendo}</b>, Expediente RNMC No. <b>${data.numeroExpediente}</b>, de fecha ${data.fechaComparendo}, asignado a la Inspección de Policía Permanente de Barrancabermeja, Turno ${data.numeroTurno}.
        </div>
        
        <div class="justified" style="margin-bottom: 15px;">
          Así mismo, solicito se sirva actualizar las bases de datos del Registro Nacional de Medidas Correctivas (RNMC) de la Policía Nacional y cualquier otra base de datos en la que figure como deudor de dicha sanción, teniendo en cuenta que la acción de cobro se encuentra prescrita, de conformidad con lo establecido en el artículo 817 del Estatuto Tributario, al haber transcurrido un término superior a cinco (5) años.
        </div>
        
        <div class="justified" style="margin-bottom: 35px;">
          La respuesta a este derecho de petición podrá ser remitida al siguiente correo electrónico: <u>${data.correoElectronico}</u>.
        </div>
      `;
      break;

    case 'RESIGNATION':
      bodyContent = `
        <div style="margin-bottom: 30px;">${data.ciudadFecha}</div>
        <div style="margin-bottom: 25px; font-weight: bold;">Señores<br>${data.empresaNombre?.toUpperCase()}<br>Departamento de Talento Humano<br>E. S. D.</div>
        <div style="margin-bottom: 25px; font-weight: bold;">ASUNTO: Renuncia Voluntaria e Irrevocable</div>
        <div class="justified" style="margin-bottom: 15px;">
          Por medio de la presente, yo <b>${data.nombresApellidos}</b>, identificado con ${data.tipoDocumento} No. <b>${data.numeroDocumento}</b>, me permito informar formalmente mi decisión de presentar <b>RENUNCIA VOLUNTARIA E IRREVOCABLE</b> al cargo de <b>${data.cargoDesempenado}</b> que he venido desempeñando en su prestigiosa organización.
        </div>
        <div class="justified" style="margin-bottom: 15px;">
          Esta determinación obedece estrictamente a motivos de índole personal y profesional que me impulsan a emprender nuevos proyectos. Asimismo, hago de su conocimiento que mi último día de labores será el próximo <b>${data.ultimoDiaLaboral}</b>, cumpliendo así con los términos de entrega de cargo establecidos por la ley y las políticas internas de la empresa.
        </div>
        <div class="justified" style="margin-bottom: 15px;">
          Deseo expresar mi más profundo agradecimiento por la confianza depositada en mis capacidades, así como por las oportunidades de crecimiento y aprendizaje que me fueron brindadas durante mi tiempo de vinculación. Me pongo a su entera disposición para realizar el proceso de empalme y entrega de mis responsabilidades de la manera más ordenada posible para no afectar el flujo operativo de la compañía.
        </div>
      `;
      break;

    case 'PERSONAL_REF':
      bodyContent = `
        <div style="margin-bottom: 30px;">${data.ciudadFecha}</div>
        <div style="margin-bottom: 40px; font-weight: bold; text-align: center; font-size: 14pt;">A QUIEN PUEDA INTERESAR</div>
        <div class="justified" style="margin-bottom: 15px;">
          Yo, <b>${data.nombresApellidos}</b>, identificado con ${data.tipoDocumento} No. <b>${data.numeroDocumento}</b>, por medio del presente documento y bajo la gravedad del juramento, hago constar que conozco de vista, trato y comunicación personal desde hace aproximadamente <b>${data.tiempoConocimiento}</b> al señor(a) <b>${data.nombreReferenciado}</b>, identificado(a) con cédula de ciudadanía No. <b>${data.cedulaReferenciado}</b>.
        </div>
        <div class="justified" style="margin-bottom: 15px;">
          Me permito dar fe de que durante el tiempo de nuestro trato personal, el referido ciudadano ha demostrado ser una persona íntegra, con altos valores morales, excelentes hábitos de convivencia y una conducta intachable en su entorno social y civil.
        </div>
        <div class="justified" style="margin-bottom: 15px;">
          Por lo anteriormente expuesto, no tengo óbice alguno en recomendarlo ampliamente para el desempeño de cualquier cargo, actividad comercial o trámite administrativo que requiera de una persona de absoluta confianza, responsabilidad y compromiso.
        </div>
      `;
      break;

    case 'FAMILY_REF':
      bodyContent = `
        <div style="margin-bottom: 30px;">${data.ciudadFecha}</div>
        <div style="margin-bottom: 40px; font-weight: bold; text-align: center; font-size: 14pt;">CERTIFICACIÓN DE REFERENCIA FAMILIAR</div>
        <div class="justified" style="margin-bottom: 15px;">
          Yo, <b>${data.nombresApellidos}</b>, identificado con ${data.tipoDocumento} No. <b>${data.numeroDocumento}</b>, en pleno uso de mis facultades legales, certifico que mantengo un vínculo de consanguinidad en calidad de <b>${data.parentesco}</b> con el señor(a) <b>${data.nombreReferenciado}</b>, quien se identifica con cédula de ciudadanía No. <b>${data.cedulaReferenciado}</b>.
        </div>
        <div class="justified" style="margin-bottom: 15px;">
          A través de este escrito, declaro que conozco su trayectoria de vida y comportamiento familiar desde hace <b>${data.tiempoConocimiento}</b>, pudiendo asegurar que es un miembro de nuestra familia caracterizado por su honestidad, rectitud y cumplimiento diligente de sus deberes.
        </div>
        <div class="justified" style="margin-bottom: 15px;">
          Doy mi respaldo personal y familiar sobre su honorabilidad, por lo cual expido la presente referencia para los fines legales o comerciales que el interesado considere pertinentes.
        </div>
      `;
      break;

    case 'WORK_REF':
      bodyContent = `
        <div style="margin-bottom: 30px;">${data.ciudadFecha}</div>
        <div style="margin-bottom: 40px; font-weight: bold; text-align: center; font-size: 14pt;">CERTIFICACIÓN LABORAL Y DE DESEMPEÑO</div>
        <div class="justified" style="margin-bottom: 15px;">
          La empresa <b>${data.empresaNombre?.toUpperCase()}</b>, a través de su representante legal o el área encargada, hace constar de manera formal que el señor(a) <b>${data.nombreReferenciado}</b>, identificado(a) con cédula de ciudadanía No. <b>${data.cedulaReferenciado}</b>, se vinculó con nuestra institución desempeñando de forma idónea el cargo de <b>${data.cargoDesempenado}</b>.
        </div>
        <div class="justified" style="margin-bottom: 15px;">
          Durante el ejercicio de sus funciones, el colaborador destacó por su alto sentido de la responsabilidad, puntualidad, ética profesional y capacidad para el cumplimiento de los objetivos institucionales asignados, manteniendo siempre una excelente relación con sus superiores y compañeros de trabajo.
        </div>
        <div class="justified" style="margin-bottom: 15px;">
          La presente certificación se expide a solicitud del interesado para ser presentada ante las autoridades o entidades que lo requieran, en la ciudad de Barrancabermeja.
        </div>
      `;
      break;

    case 'POWER_OF_ATTORNEY':
      bodyContent = `
        <div style="margin-bottom: 30px;">${data.ciudadFecha}</div>
        <div style="margin-bottom: 25px; font-weight: bold;">ASUNTO: Otorgamiento de Poder Amplio y Suficiente</div>
        <div class="justified" style="margin-bottom: 15px;">
          Yo, <b>${data.nombresApellidos}</b>, identificado con ${data.tipoDocumento} No. <b>${data.numeroDocumento}</b>, por medio del presente documento otorgo <b>PODER AMPLIO Y SUFICIENTE</b> al señor(a) <b>${data.nombreApoderado}</b>, identificado(a) con C.C. No. <b>${data.cedulaApoderado}</b>.
        </div>
        <div class="justified" style="margin-bottom: 15px;">
          Mi apoderado queda facultado expresamente para realizar el siguiente trámite: <i>${data.tramiteEspecifico}</i>, así como para firmar documentos, presentar solicitudes, recibir notificaciones y realizar todas las gestiones administrativas o legales necesarias ante las autoridades competentes para dar cabal cumplimiento al encargo aquí conferido.
        </div>
      `;
      break;
  }

  const footer = `
    <div style="margin-top: 40px;">Cordialmente,</div>
    <div style="margin-top: 50px;">
      <br>
      <b>${data.nombresApellidos}</b><br>
      ${data.tipoDocumento} ${data.numeroDocumento}<br>
      Celular: ${data.telefono}
    </div>
  `;

  const htmlContent = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <style>
        @page { size: 8.5in 11in; margin: 1in 1.25in 1in 1.25in; }
        body { font-family: 'Arial', sans-serif; font-size: 12pt; line-height: 1.5; color: #000; text-align: left; }
        .justified { text-align: justify; }
        div { margin: 0; padding: 0; }
        b { font-weight: bold; }
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
  link.download = `${type}_${data.numeroDocumento}.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
