
import React from 'react';

interface LinkItem {
  name: string;
  url: string;
  description?: string;
}

interface Category {
  title: string;
  icon: React.ReactNode;
  links: LinkItem[];
}

const categories: Category[] = [
  {
    title: 'Antecedentes y Consultas',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    links: [
      { name: 'Procuraduría General', url: 'https://www.procuraduria.gov.co/Pages/Generacion-de-antecedentes.aspx', description: 'Generación de antecedentes disciplinarios.' },
      { name: 'Policía Nacional', url: 'https://antecedentes.policia.gov.co:7005/WebJudicial/', description: 'Certificado de antecedentes judiciales.' },
      { name: 'Personería Municipal', url: 'https://antecedentes.personeriabogota.gov.co/expedicion-antecedentes', description: 'Expedición de antecedentes.' },
      { name: 'Contraloría General', url: 'https://www.contraloria.gov.co/web/guest/persona-natural', description: 'Certificado de antecedentes fiscales.' },
      { name: 'Medidas Correctivas (RNMC)', url: 'https://srvcnpc.policia.gov.co/PSC/frm_cnp_consulta.aspx', description: 'Consulta de comparendos de policía.' },
      { name: 'Inhabilidad Delitos Sexuales', url: 'https://inhabilidades.policia.gov.co:8080/', description: 'Consulta de inhabilidades específicas.' }
    ]
  },
  {
    title: 'Salud (Oficinas Virtuales EPS)',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    links: [
      { name: 'EPS SURA', url: 'https://portaleps.epssura.com/ServiciosUnClick/#/' },
      { name: 'EPS SANITAS', url: 'https://www.epssanitas.com/usuarios/web/nuevo-portal-eps/inicio?p_p_id=58&p_p_lifecycle=0&p_p_state=maximized&p_p_mode=view&saveLastPath=false&_58_struts_action=%2Flogin%2Flogin#gsc.tab=0' },
      { name: 'NUEVA EPS', url: 'https://portal.nuevaeps.com.co/Portal/home.jspx' },
      { name: 'SALUD TOTAL', url: 'https://transaccional.saludtotal.com.co/OficinaVirtual/' },
      { name: 'COOSALUD', url: 'https://coosalud.com/estado-de-afiliacion/' },
      { name: 'COMPENSAR EPS', url: 'https://seguridad.compensar.com/sign-in?serviceProviderName=WSFED-SP&response_type=code%20token&response_mode=form_post&_csrf=3ec304c0-0c73-49e5-85d0-e08f0220a55e&protocol=OIDC' },
      { name: 'FAMISANAR EPS', url: 'https://enlinea.famisanar.com.co/Portal/home.jspx?_gl=1*12se2mr*_gcl_au*MTkzNjk3OTkxOS4xNzcwMzA1ODI1' },
      { name: 'MUTUAL SER', url: 'https://afiliados.mutualser.com/' }
    ]
  },
  {
    title: 'Pensiones y Cesantías',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    links: [
      { name: 'COLPENSIONES', url: 'https://www.colpensiones.gov.co/pensiones/publicaciones/491/certificado-de-afiliacion/', description: 'Certificado de afiliación.' },
      { name: 'PORVENIR', url: 'https://www.porvenir.com.co/web/certificados-y-extractos/certificado-de-afiliacion' },
      { name: 'PROTECCIÓN', url: 'https://www.proteccion.com/portalafiliados/afiliados/certifacil' },
      { name: 'SKANDIA', url: 'https://cliente.skandia.com.co/wps/portal/clientes/LoginOM/' },
      { name: 'FONDO NACIONAL DEL AHORRO', url: 'https://www.fna.gov.co:8081/CWC/services/cobis/web/app/index.html#!/login' }
    ]
  },
  {
    title: 'Gobierno y Radicación',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    links: [
      { name: 'Alcaldía de Barrancabermeja', url: 'https://sgd.barrancabermeja.gov.co/BARRANCA.Pqrs.Web/Home/Radicado', description: 'Radicado PQRS / Dozzier.' },
      { name: 'Gobernación de Santander', url: 'https://forest.santander.gov.co:8443/forest-webfile/app', description: 'Radicado Dozzier.' },
      { name: 'Superintendencia de Salud', url: 'https://superargo.supersalud.gov.co/2/formularioWeb/pqrd.php', description: 'Formulario de PQRD.' },
      { name: 'Superintendencia Sociedades', url: 'https://www.supersociedades.gov.co/es/formulario-pqrsdf', description: 'Formulario PQRSDF.' },
      { name: 'Defensoría del Pueblo', url: 'http://eliseo.defensoria.gov.co/visionweb/cac2/web_preconsulta.php', description: 'Web Preconsulta.' }
    ]
  },
  {
    title: 'Tránsito y Educación',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    ),
    links: [
      { name: 'Consulta SIMIT', url: 'https://fcm.org.co/simit/', description: 'Consulta multas nacional.' },
      { name: 'Comparendos Barrancabermeja', url: 'https://tramitesittb.siotweb.com/Comparendos/Consultas', description: 'Consulta local ITTB.' },
      { name: 'RUNT', url: 'https://portalpublico.runt.gov.co/#/consulta-vehiculo/consulta/consulta-ciudadana', description: 'Consulta ciudadana.' },
      { name: 'Certificados SENA', url: 'https://certificados.sena.edu.co/', description: 'Descarga de títulos.' },
      { name: 'Consulta Cursos de Altura', url: 'https://app2.mintrabajo.gov.co/CentrosEntrenamiento/consulta_ext.aspx', description: 'Ministerio de Trabajo.' }
    ]
  }
];

const DirectoryPage: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-white mb-2">Directorio de Trámites</h2>
        <p className="text-slate-400">Acceso rápido a las oficinas virtuales y servicios gubernamentales oficiales.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, idx) => (
          <div key={idx} className="glass-card rounded-3xl overflow-hidden border border-white/5 flex flex-col">
            <div className="p-6 bg-gradient-to-r from-red-900/40 to-stone-900/40 border-b border-white/5 flex items-center gap-4">
              <div className="p-3 bg-red-600 rounded-2xl text-white shadow-lg shadow-red-900/20">
                {category.icon}
              </div>
              <h3 className="text-xl font-bold text-white leading-tight">{category.title}</h3>
            </div>
            
            <div className="p-4 flex-1 space-y-2">
              {category.links.map((link, lIdx) => (
                <a
                  key={lIdx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-red-500/20 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium group-hover:text-red-400 transition-colors text-sm">{link.name}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-500 group-hover:text-red-500 transition-colors shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                  {link.description && (
                    <span className="text-[10px] uppercase tracking-wider text-slate-500 group-hover:text-slate-400 transition-colors mt-1 font-semibold">{link.description}</span>
                  )}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-red-900/20 p-8 rounded-3xl border border-red-500/20 text-center">
        <h4 className="text-lg font-bold text-white mb-2">Aviso Importante</h4>
        <p className="text-slate-300 text-sm max-w-3xl mx-auto">
          Esta plataforma actúa como un puente informativo facilitado por **Iván Rodriguez**. Los enlaces redirigen a los sitios oficiales de cada entidad. Asegúrese siempre de verificar que se encuentra en una página gubernamental (terminada en .gov.co) antes de ingresar datos sensibles.
        </p>
      </div>
    </div>
  );
};

export default DirectoryPage;
