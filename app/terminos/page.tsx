'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import KomIA from '../components/KomIA';
import NavBar from '../components/NavBar';
import { ScrollProgressBar, BackToTop } from '../components/ScrollProgress';
import SiteFooter from '../components/SiteFooter';
import { FileText, Mail, ArrowLeft } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

export default function TerminosPage() {
  return (
    <main style={{ minHeight: '100vh' }}>
      <NavBar />
      <ScrollProgressBar />

      {/* HERO */}
      <section style={{ padding: '6rem 2rem 3rem' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <motion.div {...fadeUp()}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'var(--accent-pale)',
                border: '1px solid var(--accent-light)',
                padding: '0.4rem 1.1rem',
                borderRadius: '20px',
                marginBottom: '2rem',
              }}
            >
              <FileText size={13} color="var(--accent)" />
              <span
                style={{
                  fontSize: '0.78rem',
                  color: 'var(--accent)',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                }}
              >
                T&Eacute;RMINOS DE SERVICIO &middot; KOMUNY EDU
              </span>
            </div>
          </motion.div>
          <motion.h1
            {...fadeUp(0.1)}
            style={{
              fontFamily: 'Fraunces, serif',
              fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              marginBottom: '1.25rem',
            }}
          >
            T&eacute;rminos de Servicio
          </motion.h1>
          <motion.p
            {...fadeUp(0.2)}
            style={{
              fontSize: '0.95rem',
              color: 'var(--ink-muted)',
              lineHeight: 1.7,
            }}
          >
            <strong>Vigencia:</strong> 12 de mayo de 2026 &middot;{' '}
            <strong>&Uacute;ltima actualizaci&oacute;n:</strong> 12 de mayo de 2026
          </motion.p>
        </div>
      </section>

      {/* CONTENT */}
      <section style={{ padding: '2rem 2rem 5rem' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <article className="legal-doc">
            <motion.div {...fadeUp()}>
              <p style={{ fontSize: '1.02rem', lineHeight: 1.75, marginBottom: '2rem' }}>
                Bienvenido a <strong>Komuny Edu</strong>. Estos T&eacute;rminos de Servicio
                (&quot;T&eacute;rminos&quot;) rigen tu uso de nuestros servicios, incluyendo el
                sitio web <strong>komuny.org</strong>, las herramientas de IA p&uacute;blicas y la
                plataforma <strong>chat.komuny.org</strong>. Al usar nuestros servicios,
                aceptaste estos T&eacute;rminos.
              </p>

              <h2>1. Aceptaci&oacute;n</h2>
              <p>
                Al crear una cuenta, usar las herramientas o navegar el sitio, confirmas que:
              </p>
              <ul>
                <li>Le&iacute;ste y entendiste estos T&eacute;rminos</li>
                <li>
                  Aceptaste tambi&eacute;n la{' '}
                  <Link href="/privacidad">Pol&iacute;tica de Privacidad</Link>
                </li>
                <li>Sos mayor de 18 a&ntilde;os o tutor legal autorizado</li>
                <li>
                  Si act&uacute;as en nombre de una instituci&oacute;n educativa, tenes autoridad
                  para vincularla
                </li>
              </ul>

              <h2>2. Qu&eacute; es Komuny Edu</h2>
              <p>
                Komuny Edu es una iniciativa educativa que ofrece recursos abiertos y herramientas
                de inteligencia artificial para docentes de Am&eacute;rica Latina. Operada por{' '}
                <strong>Napsix Inc.</strong> con el respaldo institucional de la{' '}
                <strong>Fundaci&oacute;n Komuny Social</strong> (CUIT 30-71735388-5, Mendoza,
                Argentina).
              </p>
              <p>Nuestros servicios principales:</p>
              <ul>
                <li>
                  <strong>komuny.org</strong> &mdash; sitio educativo con glosario, gu&iacute;as,
                  templates y 5 herramientas IA p&uacute;blicas
                </li>
                <li>
                  <strong>chat.komuny.org</strong> &mdash; plataforma de chat con IA tipo
                  ChatGPT/Claude para docentes, con 6 asistentes pedag&oacute;gicos
                  especializados
                </li>
                <li>
                  <strong>Repositorio p&uacute;blico</strong> en GitHub con contenido educativo
                  libre y gratuito
                </li>
              </ul>

              <h2>3. Cuenta de usuario</h2>
              <p>Para usar chat.komuny.org necesit&aacute;s crear una cuenta. Aceptas:</p>
              <ul>
                <li>Proporcionar informaci&oacute;n veraz y actualizada</li>
                <li>Mantener tu contrase&ntilde;a segura y no compartir tu cuenta</li>
                <li>Notificarnos inmediatamente si detectas uso no autorizado</li>
                <li>Ser responsable de toda actividad que ocurra bajo tu cuenta</li>
              </ul>
              <p>
                Pod&eacute;s eliminar tu cuenta en cualquier momento desde la configuraci&oacute;n
                o escribiendo a <a href="mailto:hola@komuny.org">hola@komuny.org</a>.
              </p>

              <h2>4. Uso aceptable</h2>
              <p>Pod&eacute;s usar Komuny Edu para:</p>
              <ul>
                <li>Planificar clases y secuencias did&aacute;cticas</li>
                <li>Crear materiales educativos y rubricas de evaluaci&oacute;n</li>
                <li>Adaptar contenidos a la diversidad de tus estudiantes</li>
                <li>Comunicaci&oacute;n con familias y reflexi&oacute;n pedag&oacute;gica</li>
                <li>
                  Cualquier uso pedag&oacute;gico leg&iacute;timo enmarcado en buenas pr&aacute;cticas
                  docentes
                </li>
              </ul>
              <p>
                <strong>No pod&eacute;s usar Komuny Edu para:</strong>
              </p>
              <ul>
                <li>
                  Generar contenido enga&ntilde;oso, difamatorio, ilegal o que viole derechos de
                  terceros
                </li>
                <li>Plagio acad&eacute;mico o suplantar producciones de estudiantes</li>
                <li>Acoso, discriminaci&oacute;n o creaci&oacute;n de material da&ntilde;ino</li>
                <li>Generar contenido sexual, violento o inapropiado para entornos educativos</li>
                <li>
                  Intentar extraer, manipular o atacar la plataforma (ingenier&iacute;a inversa,
                  scraping masivo, bypassing de l&iacute;mites, etc.)
                </li>
                <li>
                  Usar bots o automatizaciones sin autorizaci&oacute;n escrita previa
                </li>
                <li>
                  Compartir tu cuenta con terceros o revender el acceso
                </li>
                <li>Cualquier actividad que viole leyes aplicables en tu jurisdicci&oacute;n</li>
              </ul>

              <h2>5. Datos de estudiantes (REGLA CR&Iacute;TICA)</h2>
              <p
                style={{
                  background: 'var(--accent-pale)',
                  border: '1px solid var(--accent-light)',
                  padding: '1.25rem',
                  borderRadius: '12px',
                  marginTop: '1rem',
                }}
              >
                <strong style={{ color: 'var(--accent)' }}>
                  PROHIBIDO ingresar datos personales identificables de estudiantes en cualquier
                  servicio de Komuny Edu, incluyendo chat.komuny.org y las herramientas
                  p&uacute;blicas.
                </strong>
              </p>
              <p>Esto incluye, pero no se limita a:</p>
              <ul>
                <li>Nombres y apellidos completos de estudiantes</li>
                <li>DNI, n&uacute;meros de matr&iacute;cula u otros identificadores</li>
                <li>Fotos o im&aacute;genes que permitan identificarlos</li>
                <li>Direcciones, tel&eacute;fonos, datos de contacto familiar</li>
                <li>Calificaciones asociadas a nombres</li>
                <li>Informaci&oacute;n m&eacute;dica o psicol&oacute;gica con identificadores</li>
                <li>Cualquier dato sensible reconocible</li>
              </ul>
              <p>
                <strong>S&iacute; pod&eacute;s usar contextos an&oacute;nimos:</strong>
              </p>
              <ul>
                <li>&quot;un estudiante de 12 a&ntilde;os con dificultades de lectura&quot;</li>
                <li>&quot;el grupo de 5&deg; grado de la escuela&quot;</li>
                <li>&quot;una estudiante de secundaria que muestra desinter&eacute;s&quot;</li>
              </ul>
              <p>
                Esta regla protege a menores de edad que no consintieron el tratamiento. Su
                incumplimiento es causal de suspensi&oacute;n inmediata de la cuenta.
              </p>

              <h2>6. Inteligencia Artificial y limitaciones</h2>
              <p>
                Las respuestas generadas por IA en Komuny Edu (asistentes pedag&oacute;gicos,
                herramientas, chat) pueden contener errores, imprecisiones o sesgos.
                Reconoc&eacute;s y aceptas que:
              </p>
              <ul>
                <li>
                  <strong>La IA no reemplaza tu criterio profesional</strong>. Es una herramienta
                  de apoyo, no de decisi&oacute;n.
                </li>
                <li>
                  Siempre debes <strong>revisar y verificar</strong> el contenido generado antes
                  de usarlo en clase o compartirlo con estudiantes, familias o instituciones.
                </li>
                <li>
                  La IA puede &quot;alucinar&quot; informaci&oacute;n: inventar datos, citas o
                  hechos que parecen reales pero son falsos.
                </li>
                <li>
                  No nos hacemos responsables por decisiones pedag&oacute;gicas, evaluativas o
                  comunicativas que tomes basadas exclusivamente en respuestas de IA.
                </li>
                <li>
                  Komuny Edu usa modelos de <strong>Anthropic (Claude)</strong> y se compromete a
                  usar modelos con buenas pr&aacute;cticas de seguridad, pero ninguna IA es
                  infalible.
                </li>
              </ul>

              <h2>7. Propiedad intelectual</h2>

              <h3>Tu contenido</h3>
              <p>
                Conservas todos los derechos sobre los prompts que escribis y los contenidos que
                gener&aacute;s al usar Komuny Edu. Pod&eacute;s usar las respuestas de la IA para
                tu pr&aacute;ctica docente sin restricciones.
              </p>
              <p>
                Al usar Komuny Edu, nos otorg&aacute;s una licencia limitada para procesar tus
                inputs y mostrarlos en tu cuenta (no para entrenar modelos, no para uso
                comercial nuestro).
              </p>

              <h3>Nuestro contenido</h3>
              <p>
                El c&oacute;digo, dise&ntilde;o, marca, logo, glosario, guias y materiales
                educativos de Komuny Edu est&aacute;n protegidos por derechos de autor. El c&oacute;digo
                de las plataformas est&aacute; disponible bajo licencias open source en{' '}
                <a
                  href="https://github.com/german-gimenez/komuny"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  github.com/german-gimenez/komuny
                </a>
                .
              </p>
              <p>
                Pod&eacute;s usar el contenido educativo de komuny.org en tus clases con
                atribuci&oacute;n. Para reutilizaci&oacute;n comercial, contactanos.
              </p>

              <h2>8. Modelos de IA y proveedores</h2>
              <p>
                Komuny Edu usa modelos de IA proporcionados por terceros, principalmente{' '}
                <strong>Anthropic (Claude Haiku y Sonnet)</strong>. El costo de uso de estos
                modelos es absorbido por Komuny Edu para que el servicio sea gratuito para
                docentes.
              </p>
              <p>
                Anthropic procesa tus mensajes seg&uacute;n su pol&iacute;tica de privacidad. Las
                conversaciones <strong>no se usan para entrenar</strong> sus modelos.
              </p>

              <h2>9. Servicio gratuito y l&iacute;mites</h2>
              <p>
                Komuny Edu es <strong>gratuito</strong> para docentes. Para mantener el servicio
                sostenible, aplicamos l&iacute;mites razonables:
              </p>
              <ul>
                <li>L&iacute;mite de mensajes por hora/d&iacute;a (anti-abuso)</li>
                <li>L&iacute;mite de archivos subidos</li>
                <li>L&iacute;mites por IP y por usuario</li>
                <li>
                  Puede haber l&iacute;mites adicionales para prevenir uso indebido o costos
                  excesivos
                </li>
              </ul>
              <p>
                Nos reservamos el derecho de ajustar estos l&iacute;mites con aviso previo.
              </p>

              <h2>10. Suspensi&oacute;n y terminaci&oacute;n</h2>
              <p>
                Podemos suspender o cancelar tu cuenta sin previo aviso si:
              </p>
              <ul>
                <li>Violas estos T&eacute;rminos</li>
                <li>Ingresas datos personales de estudiantes (cl&aacute;usula 5)</li>
                <li>Detectamos actividad fraudulenta o ilegal</li>
                <li>Requerimientos legales nos obligan a hacerlo</li>
              </ul>
              <p>
                Vos tambi&eacute;n pod&eacute;s cancelar tu cuenta en cualquier momento. Tras
                cancelaci&oacute;n, eliminamos tus datos seg&uacute;n nuestra Pol&iacute;tica de
                Privacidad.
              </p>

              <h2>11. Modificaciones del servicio</h2>
              <p>
                Komuny Edu est&aacute; en evoluci&oacute;n constante. Podemos:
              </p>
              <ul>
                <li>Agregar, modificar o eliminar funcionalidades</li>
                <li>Cambiar los modelos de IA utilizados</li>
                <li>Interrumpir temporalmente el servicio para mantenimiento</li>
                <li>Discontinuar servicios con aviso previo razonable (30 d&iacute;as)</li>
              </ul>
              <p>
                No nos hacemos responsables por p&eacute;rdidas derivadas de cambios o
                interrupciones del servicio.
              </p>

              <h2>12. Disponibilidad y garant&iacute;as</h2>
              <p>
                El servicio se presta &quot;tal cual&quot; y &quot;seg&uacute;n disponibilidad&quot;.
                No garantizamos:
              </p>
              <ul>
                <li>Disponibilidad ininterrumpida del 100%</li>
                <li>Que la IA d&eacute; respuestas correctas o completas</li>
                <li>Compatibilidad con todos los dispositivos o navegadores</li>
                <li>Que el servicio sea apto para fines pedag&oacute;gicos espec&iacute;ficos</li>
              </ul>
              <p>
                Hacemos esfuerzos razonables para mantener la calidad y disponibilidad.
              </p>

              <h2>13. Limitaci&oacute;n de responsabilidad</h2>
              <p>
                En la m&aacute;xima medida permitida por ley, Komuny Edu y sus operadores no
                ser&aacute;n responsables por:
              </p>
              <ul>
                <li>
                  Da&ntilde;os indirectos, incidentales, especiales o consecuentes derivados del
                  uso del servicio
                </li>
                <li>
                  Decisiones pedag&oacute;gicas tomadas exclusivamente con base en respuestas de
                  IA
                </li>
                <li>P&eacute;rdida de datos por causas ajenas a nuestro control</li>
                <li>Interrupciones causadas por proveedores terceros</li>
                <li>Errores u omisiones en el contenido generado por IA</li>
              </ul>
              <p>
                Nuestra responsabilidad m&aacute;xima total se limita a los honorarios que nos
                hayas pagado en los &uacute;ltimos 12 meses (cero, dado que el servicio es
                gratuito).
              </p>

              <h2>14. Indemnizaci&oacute;n</h2>
              <p>
                Aceptas indemnizar y mantener indemne a Komuny Edu, Napsix Inc. y la Fundaci&oacute;n
                Komuny Social ante reclamos derivados de:
              </p>
              <ul>
                <li>Tu uso indebido del servicio</li>
                <li>Tu violaci&oacute;n de estos T&eacute;rminos</li>
                <li>Tu violaci&oacute;n de derechos de terceros</li>
                <li>El ingreso de datos personales de estudiantes sin consentimiento</li>
              </ul>

              <h2>15. Ley aplicable y resoluci&oacute;n de disputas</h2>
              <p>
                Estos T&eacute;rminos se rigen por:
              </p>
              <ul>
                <li>
                  <strong>Usuarios en Argentina:</strong> leyes de la Rep&uacute;blica Argentina y
                  jurisdicci&oacute;n de tribunales de Mendoza.
                </li>
                <li>
                  <strong>Usuarios en otras jurisdicciones LATAM:</strong> leyes locales de
                  consumidor aplicables m&aacute;s leyes del estado de Delaware, EE.UU.
                </li>
                <li>
                  <strong>Resto del mundo:</strong> leyes del estado de Delaware, EE.UU.
                </li>
              </ul>
              <p>
                Antes de iniciar un proceso legal, te pedimos contactarnos a{' '}
                <a href="mailto:hola@komuny.org">hola@komuny.org</a> para intentar resolver la
                disputa de forma amistosa.
              </p>

              <h2>16. Modificaciones de estos T&eacute;rminos</h2>
              <p>
                Podemos actualizar estos T&eacute;rminos. Cambios significativos se notificar&aacute;n
                con al menos 15 d&iacute;as de anticipaci&oacute;n por email o en la plataforma.
                El uso continuado tras la entrada en vigor implica aceptaci&oacute;n.
              </p>

              <h2>17. Cl&aacute;usulas generales</h2>
              <ul>
                <li>
                  <strong>Acuerdo completo:</strong> Estos T&eacute;rminos y la Pol&iacute;tica de
                  Privacidad constituyen el acuerdo completo entre vos y Komuny Edu.
                </li>
                <li>
                  <strong>Separabilidad:</strong> Si alguna cl&aacute;usula se declara inv&aacute;lida,
                  el resto sigue vigente.
                </li>
                <li>
                  <strong>No renuncia:</strong> El no ejercicio de un derecho no implica renuncia
                  al mismo.
                </li>
                <li>
                  <strong>Cesi&oacute;n:</strong> Podemos ceder estos T&eacute;rminos en caso de
                  reorganizaci&oacute;n; vos no pod&eacute;s ceder tu cuenta sin nuestro
                  consentimiento.
                </li>
              </ul>

              <h2>18. Contacto</h2>
              <p>Para consultas sobre estos T&eacute;rminos:</p>
              <ul>
                <li>
                  Email: <a href="mailto:hola@komuny.org">hola@komuny.org</a>
                </li>
                <li>
                  Sitio: <a href="https://komuny.org">komuny.org</a>
                </li>
                <li>
                  GitHub:{' '}
                  <a
                    href="https://github.com/german-gimenez/komuny"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    github.com/german-gimenez/komuny
                  </a>
                </li>
              </ul>
            </motion.div>
          </article>

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.2)}
            style={{
              marginTop: '4rem',
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'transparent',
                color: 'var(--ink)',
                padding: '0.8rem 1.75rem',
                borderRadius: '30px',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '0.95rem',
                border: '1.5px solid var(--border)',
              }}
            >
              <ArrowLeft size={16} /> Volver al inicio
            </Link>
            <a
              href="mailto:hola@komuny.org?subject=Terminos"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'var(--ink)',
                color: 'var(--bg)',
                padding: '0.8rem 1.75rem',
                borderRadius: '30px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.95rem',
              }}
            >
              <Mail size={16} /> Contactanos
            </a>
            <Link
              href="/privacidad"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'transparent',
                color: 'var(--accent)',
                padding: '0.8rem 1.75rem',
                borderRadius: '30px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.95rem',
                border: '1.5px solid var(--accent-light)',
              }}
            >
              Pol&iacute;tica de Privacidad
            </Link>
          </motion.div>
        </div>
      </section>

      <SiteFooter />

      <style>{`
        .legal-doc h2 {
          font-family: 'Fraunces', serif;
          font-size: clamp(1.3rem, 2.4vw, 1.65rem);
          font-weight: 700;
          color: var(--ink);
          margin: 2.5rem 0 1rem 0;
          letter-spacing: -0.01em;
        }
        .legal-doc h3 {
          font-family: 'Fraunces', serif;
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--ink);
          margin: 1.5rem 0 0.5rem 0;
        }
        .legal-doc p {
          font-size: 1rem;
          line-height: 1.75;
          color: var(--ink-muted);
          margin: 0.75rem 0;
        }
        .legal-doc ul, .legal-doc ol {
          margin: 0.75rem 0 1rem 1.5rem;
          color: var(--ink-muted);
          font-size: 1rem;
          line-height: 1.75;
        }
        .legal-doc li {
          margin: 0.5rem 0;
        }
        .legal-doc a {
          color: var(--accent);
          text-decoration: underline;
          text-decoration-color: var(--accent-light);
          text-underline-offset: 3px;
        }
        .legal-doc a:hover {
          color: var(--ink);
        }
        .legal-doc strong {
          color: var(--ink);
          font-weight: 600;
        }
      `}</style>

      <KomIA />
      <BackToTop />
    </main>
  );
}
