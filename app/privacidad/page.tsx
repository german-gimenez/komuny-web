'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import KomIA from '../components/KomIA';
import NavBar from '../components/NavBar';
import { ScrollProgressBar, BackToTop } from '../components/ScrollProgress';
import SiteFooter from '../components/SiteFooter';
import { Shield, Mail, ArrowLeft } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

export default function PrivacidadPage() {
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
              <Shield size={13} color="var(--accent)" />
              <span
                style={{
                  fontSize: '0.78rem',
                  color: 'var(--accent)',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                }}
              >
                POL&Iacute;TICA DE PRIVACIDAD &middot; KOMUNY EDU
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
            Pol&iacute;tica de Privacidad
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
                En <strong>Komuny Edu</strong> (operada por <strong>Napsix Inc.</strong> y con el
                respaldo de la <strong>Fundaci&oacute;n Komuny Social</strong>) respetamos tu
                privacidad. Este documento explica qu&eacute; datos recolectamos, c&oacute;mo los
                usamos y qu&eacute; derechos ten&eacute;s sobre ellos.
              </p>

              <h2>1. Responsable del tratamiento</h2>
              <ul>
                <li>
                  <strong>Razon social comercial:</strong> Napsix Inc. (Delaware, USA)
                </li>
                <li>
                  <strong>Aliado institucional:</strong> Fundaci&oacute;n Komuny Social &middot;
                  CUIT 30-71735388-5 &middot; Mendoza, Argentina
                </li>
                <li>
                  <strong>Sitio:</strong> komuny.org &middot; chat.komuny.org
                </li>
                <li>
                  <strong>Contacto de privacidad:</strong>{' '}
                  <a href="mailto:hola@komuny.org">hola@komuny.org</a>
                </li>
              </ul>

              <h2>2. Datos que recolectamos</h2>
              <p>
                Komuny Edu opera dos servicios principales: el sitio web educativo en{' '}
                <strong>komuny.org</strong> y la plataforma de chat con IA en{' '}
                <strong>chat.komuny.org</strong>. Los datos recolectados var&iacute;an seg&uacute;n
                el servicio:
              </p>

              <h3>Sitio web komuny.org</h3>
              <ul>
                <li>
                  <strong>Datos t&eacute;cnicos:</strong> tipo de navegador, sistema operativo,
                  direcci&oacute;n IP an&oacute;nima, p&aacute;ginas visitadas. Usados para mejorar
                  la experiencia y entender qu&eacute; recursos son m&aacute;s &uacute;tiles.
                </li>
                <li>
                  <strong>Cookies y almacenamiento local:</strong> preferencias de uso (idioma,
                  tema, herramientas favoritas).
                </li>
                <li>
                  <strong>Datos de las herramientas IA p&uacute;blicas:</strong> los prompts que
                  envi&aacute;s a las herramientas de komuny.org/herramientas se procesan en
                  tiempo real, <strong>no se almacenan</strong> en nuestras bases de datos.
                </li>
              </ul>

              <h3>Plataforma chat.komuny.org</h3>
              <ul>
                <li>
                  <strong>Datos de cuenta:</strong> nombre, email, contrase&ntilde;a (hasheada),
                  fecha de registro. Necesarios para crear y mantener tu cuenta.
                </li>
                <li>
                  <strong>Datos de login social (opcional):</strong> si te registr&aacute;s con
                  Google, recibimos tu nombre, email y avatar p&uacute;blico.
                </li>
                <li>
                  <strong>Conversaciones:</strong> los mensajes que enviaste y respuestas de la
                  IA se almacenan asociados a tu cuenta para que pod&aacute;s consultarlos
                  despu&eacute;s. Pod&eacute;s eliminarlos en cualquier momento.
                </li>
                <li>
                  <strong>Memoria personalizada:</strong> si configur&aacute;s preferencias (pa&iacute;s,
                  nivel educativo, materias), las guardamos para personalizar respuestas.
                </li>
                <li>
                  <strong>Archivos subidos:</strong> documentos que subas para procesar con IA se
                  almacenan temporalmente y se pueden eliminar.
                </li>
                <li>
                  <strong>Datos t&eacute;cnicos:</strong> IP, navegador, timestamps de uso (para
                  seguridad y prevenci&oacute;n de abuso).
                </li>
              </ul>

              <h2>3. Para qu&eacute; usamos los datos</h2>
              <ul>
                <li>Brindar y operar los servicios de Komuny Edu</li>
                <li>
                  Personalizar la experiencia (adaptaci&oacute;n regional, idioma, asistentes
                  pedag&oacute;gicos)
                </li>
                <li>Comunicarnos contigo sobre actualizaciones o cambios importantes</li>
                <li>Prevenir uso indebido, fraude o spam</li>
                <li>Mejorar nuestros productos y contenidos educativos</li>
                <li>
                  Cumplir con obligaciones legales (cuando aplique seg&uacute;n jurisdicci&oacute;n)
                </li>
              </ul>
              <p>
                <strong>No vendemos tus datos personales</strong> ni los compartimos con
                anunciantes. No usamos tus conversaciones para entrenar modelos de IA.
              </p>

              <h2>4. Base legal del tratamiento</h2>
              <p>El tratamiento de tus datos se basa en:</p>
              <ul>
                <li>
                  <strong>Consentimiento:</strong> al crear una cuenta y aceptar estos t&eacute;rminos,
                  consent&iacute;s el tratamiento descrito.
                </li>
                <li>
                  <strong>Ejecuci&oacute;n de servicio:</strong> los datos m&iacute;nimos para
                  prestarte el servicio (autenticaci&oacute;n, conversaciones, memoria).
                </li>
                <li>
                  <strong>Inter&eacute;s leg&iacute;timo:</strong> seguridad, prevenci&oacute;n de
                  abuso y mejora del servicio.
                </li>
              </ul>

              <h2>5. Terceros que procesan datos por nosotros</h2>
              <p>
                Para operar Komuny Chat, compartimos datos m&iacute;nimos con los siguientes
                proveedores de infraestructura:
              </p>
              <ul>
                <li>
                  <strong>Anthropic</strong> (modelos Claude): tus mensajes se env&iacute;an a la
                  API de Anthropic para generar respuestas. Anthropic no almacena las
                  conversaciones para entrenar modelos. M&aacute;s info:{' '}
                  <a
                    href="https://www.anthropic.com/legal/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    pol&iacute;tica de privacidad de Anthropic
                  </a>
                  .
                </li>
                <li>
                  <strong>Railway</strong> (hosting de la aplicaci&oacute;n): aloja los servidores
                  y bases de datos. M&aacute;s info:{' '}
                  <a
                    href="https://railway.com/legal/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    privacy.railway.com
                  </a>
                  .
                </li>
                <li>
                  <strong>Cloudflare</strong> (DNS, CDN, seguridad): procesa el tr&aacute;fico
                  HTTP. M&aacute;s info:{' '}
                  <a
                    href="https://www.cloudflare.com/privacypolicy/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    cloudflare.com/privacypolicy
                  </a>
                  .
                </li>
                <li>
                  <strong>Vercel</strong> (hosting de komuny.org): infraestructura del sitio
                  educativo. M&aacute;s info:{' '}
                  <a
                    href="https://vercel.com/legal/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    vercel.com/legal/privacy-policy
                  </a>
                  .
                </li>
                <li>
                  <strong>Google</strong> (OAuth, si elegis ese m&eacute;todo de login):{' '}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    policies.google.com/privacy
                  </a>
                  .
                </li>
              </ul>
              <p>
                Estos proveedores actan como encargados de tratamiento con clausulas de
                confidencialidad y seguridad adecuadas.
              </p>

              <h2>6. Datos de estudiantes (especial atenci&oacute;n)</h2>
              <p>
                Komuny Edu est&aacute; dirigido a <strong>docentes</strong>, no a estudiantes
                directamente. Sin embargo, los docentes pueden mencionar situaciones de
                aprendizaje al interactuar con la IA.
              </p>
              <p>
                <strong>Solicitamos firmemente que no ingreses datos personales identificables
                de estudiantes</strong> (nombres completos, DNI, fotos, calificaciones con
                identificaci&oacute;n, direcciones, datos de salud, etc.). Usa contextos
                an&oacute;nimos ("un estudiante de 12 a&ntilde;os...", "el grupo de 6&deg;
                grado...").
              </p>
              <p>
                Si detectamos que se est&aacute;n ingresando datos personales de menores
                sistematicamente, podemos suspender la cuenta para proteger a esos terceros que
                no consintieron el tratamiento.
              </p>

              <h2>7. Tus derechos</h2>
              <p>Como titular de tus datos, ten&eacute;s derecho a:</p>
              <ul>
                <li>
                  <strong>Acceso:</strong> saber qu&eacute; datos tuyos tenemos
                </li>
                <li>
                  <strong>Rectificaci&oacute;n:</strong> corregir datos inexactos
                </li>
                <li>
                  <strong>Supresi&oacute;n / olvido:</strong> pedir la eliminaci&oacute;n de tu
                  cuenta y conversaciones
                </li>
                <li>
                  <strong>Portabilidad:</strong> exportar tus conversaciones en un formato
                  legible (markdown/json)
                </li>
                <li>
                  <strong>Oposici&oacute;n:</strong> oponerte a ciertos usos de tus datos
                </li>
                <li>
                  <strong>Retiro de consentimiento:</strong> revocar tu consentimiento en
                  cualquier momento
                </li>
              </ul>
              <p>
                Para ejercer estos derechos, escribinos a{' '}
                <a href="mailto:hola@komuny.org">hola@komuny.org</a>. Respondemos en hasta 30
                d&iacute;as.
              </p>

              <h2>8. Retenci&oacute;n de datos</h2>
              <ul>
                <li>
                  <strong>Cuenta activa:</strong> mientras uses Komuny Chat conservamos tus
                  datos.
                </li>
                <li>
                  <strong>Cuenta eliminada:</strong> al borrar tu cuenta, eliminamos todos tus
                  datos personales y conversaciones dentro de 30 d&iacute;as. Algunos datos
                  agregados y an&oacute;nimos (estad&iacute;sticas de uso) pueden conservarse para
                  reportes.
                </li>
                <li>
                  <strong>Cuenta inactiva:</strong> tras 24 meses sin actividad, podemos
                  contactarte y eventualmente eliminar la cuenta tras aviso previo.
                </li>
                <li>
                  <strong>Backups:</strong> los respaldos rutinarios pueden conservar datos hasta
                  90 d&iacute;as adicionales antes de rotaci&oacute;n.
                </li>
              </ul>

              <h2>9. Seguridad</h2>
              <p>
                Aplicamos medidas t&eacute;cnicas y organizativas razonables para proteger tus
                datos:
              </p>
              <ul>
                <li>Cifrado en tr&aacute;nsito (HTTPS/TLS)</li>
                <li>Cifrado en reposo de credenciales (bcrypt)</li>
                <li>Control de acceso por roles a la infraestructura</li>
                <li>Backups regulares y monitoreo de actividad inusual</li>
                <li>Pol&iacute;ticas internas de manejo de datos</li>
              </ul>
              <p>
                Si detectamos una brecha de seguridad que afecte tus datos, te notificaremos
                seg&uacute;n las leyes aplicables.
              </p>

              <h2>10. Cookies y tecnolog&iacute;as similares</h2>
              <p>Usamos cookies y almacenamiento local del navegador para:</p>
              <ul>
                <li>
                  <strong>Esenciales:</strong> mantener tu sesi&oacute;n iniciada, recordar
                  preferencias (idioma, tema).
                </li>
                <li>
                  <strong>Anal&iacute;ticas (an&oacute;nimas):</strong> entender qu&eacute;
                  contenidos son m&aacute;s usados, sin identificarte personalmente.
                </li>
              </ul>
              <p>
                No usamos cookies publicitarias ni de seguimiento por terceros.
              </p>

              <h2>11. Menores de edad</h2>
              <p>
                Komuny Edu est&aacute; dirigido a <strong>educadores mayores de 18
                a&ntilde;os</strong>. No recolectamos intencionalmente datos de menores. Si sos
                menor o tutor de un menor que cre&oacute; cuenta, escribinos para eliminarla.
              </p>

              <h2>12. Transferencias internacionales</h2>
              <p>
                Nuestros proveedores de infraestructura pueden procesar datos en servidores
                ubicados fuera de tu pa&iacute;s (principalmente Estados Unidos y Europa). Estos
                proveedores cumplen con marcos de protecci&oacute;n internacional como el DPF
                EU-US y SCC.
              </p>

              <h2>13. Cambios en esta pol&iacute;tica</h2>
              <p>
                Podemos actualizar esta pol&iacute;tica para reflejar cambios en el servicio o
                marco legal. Te avisaremos por email o en la plataforma con al menos 15
                d&iacute;as de anticipaci&oacute;n. El uso continuado del servicio implica
                aceptaci&oacute;n.
              </p>

              <h2>14. Ley aplicable y jurisdicci&oacute;n</h2>
              <p>
                Para usuarios en Argentina: Ley 25.326 de Protecci&oacute;n de Datos Personales y
                jurisdicci&oacute;n de tribunales de Mendoza, Argentina.
              </p>
              <p>
                Para usuarios en otras jurisdicciones LATAM: respetamos las leyes locales de
                protecci&oacute;n de datos personales (LGPD Brasil, Ley 1581 Colombia, LFPDPPP
                M&eacute;xico, etc.).
              </p>
              <p>
                Para usuarios en EE.UU. y otras jurisdicciones: leyes del estado de Delaware,
                EE.UU.
              </p>

              <h2>15. Contacto</h2>
              <p>
                Para cualquier consulta sobre privacidad o datos personales:
              </p>
              <ul>
                <li>
                  Email: <a href="mailto:hola@komuny.org">hola@komuny.org</a>
                </li>
                <li>Asunto sugerido: &quot;Privacidad &mdash; [tu consulta]&quot;</li>
              </ul>
              <p>Respondemos en un plazo m&aacute;ximo de 30 d&iacute;as.</p>
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
              href="mailto:hola@komuny.org?subject=Privacidad"
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
              href="/terminos"
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
              T&eacute;rminos de Servicio
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
