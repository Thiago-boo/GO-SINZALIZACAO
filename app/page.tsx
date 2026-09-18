"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";

const WHATSAPP_NUMBER = "5562996210885";

const services = [
  ["01", "Sinalização viária", "Pintura e implantação de sinalização horizontal para vias urbanas, rodovias e áreas de circulação."],
  ["02", "Placas e sinalização vertical", "Soluções de orientação, regulamentação e segurança para obras, empreendimentos e espaços públicos."],
  ["03", "Projetos e execução", "Atendimento técnico desde o levantamento da demanda até a entrega da sinalização implantada."],
];

const audiences = [
  ["Setor público", "Câmaras, municípios e prefeituras com demandas de mobilidade, segurança e organização urbana."],
  ["Construção civil", "Empreiteiras e construtoras que precisam sinalizar obras, acessos e novos empreendimentos."],
  ["Propriedades privadas", "Condomínios, empresas e particulares que valorizam orientação clara e circulação segura."],
];

const faqItems = [
  ["Quais serviços de sinalização vocês realizam?", "Sinalização horizontal e vertical, placas, orientação e soluções para vias, obras e áreas de circulação."],
  ["Vocês atendem prefeituras e municípios?", "Sim. Atendemos demandas de mobilidade, segurança e organização urbana para o setor público."],
  ["Atendem obras e propriedades particulares?", "Sim. Trabalhamos com empreiteiras, construtoras, condomínios, empresas e proprietários."],
  ["Onde a GO Sinalização está localizada?", "Estamos em Aparecida de Goiânia, com atendimento para demandas locais e regionais."],
  ["Vocês executam sinalização horizontal em ruas e rodovias?", "Sim. Executamos pintura de faixas, lombadas, vagas, cruzamentos e demais marcas viárias."],
];

const portfolioItems = [
  ["/images/placa-rua.jpg", "Placas de identificação de ruas instaladas", "Sinalização vertical urbana"],
  ["/images/pintura-pare.jpg", "Pintura de parada em via", "Sinalização horizontal"],
  ["/images/equipamentos.jpg", "Equipamentos para sinalização de obras", "Estrutura para obras"],
  ["/images/portaria-go-sinalizacao.png", "Portaria da GO Sinalização em Aparecida de Goiânia", "Atendimento local em Aparecida de Goiânia"],
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map(([name, text]) => ({
    "@type": "Question",
    name,
    acceptedAnswer: { "@type": "Answer", text },
  })),
};

type FormValues = { name: string; phone: string; email: string; sector: string; context: string };
const initialForm: FormValues = { name: "", phone: "", email: "", sector: "", context: "" };

function BusinessInfo() {
  return <div className="business-card">
    <p className="business-kicker">GO SINALIZAÇÃO · APARECIDA DE GOIÂNIA</p>
    <a href="tel:+556232050307" className="business-phone">(62) 3205-0307 <span aria-hidden="true">↗</span></a>
    <address>Av. W, Q. 83 — Mansões Paraíso<br />Aparecida de Goiânia — GO · 74952-570</address>
    <div className="business-details"><span>★ 4,0 · 7 avaliações no Google</span><span>Seg–Sex · 08:00–18:00</span><span>Sábado e domingo · fechado</span></div>
  </div>;
}

export default function Home() {
  const [formValues, setFormValues] = useState<FormValues>(initialForm);
  const [errors, setErrors] = useState<Partial<FormValues>>({});

  function updateField(field: keyof FormValues, value: string) {
    setFormValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  }

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Partial<FormValues> = {};
    (Object.keys(formValues) as Array<keyof FormValues>).forEach((field) => {
      if (!formValues[field].trim()) nextErrors[field] = "Este campo é obrigatório.";
    });
    if (formValues.email && !/^\S+@\S+\.\S+$/.test(formValues.email)) nextErrors.email = "Informe um e-mail válido.";
    if (Object.keys(nextErrors).length) { setErrors(nextErrors); return; }
    const message = `Olá, gostaria de solicitar um orçamento com a GO Sinalização.\n\nNome: ${formValues.name}\nTelefone: ${formValues.phone}\nE-mail: ${formValues.email}\nSetor: ${formValues.sector}\n\nContexto do projeto:\n${formValues.context}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="GO Sinalização — início"><Image className="brand-logo" src="/images/go-sinalizacao-transparent.png" alt="GO Sinalização" width={150} height={100} priority /></a>
      <nav aria-label="Navegação principal"><a href="#solucoes">Soluções</a><a href="#atendimento">Atendimento</a><a href="#empresa">A empresa</a><a href="#portfolio">Portfólio</a><a href="#faq">FAQ</a><a href="#localizacao">Localização</a></nav>
      <a className="header-cta" href="#contato">Solicitar orçamento <span aria-hidden="true">↗</span></a>
    </header>

    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <div className="hero-copy"><p className="eyebrow"><span /> Sinalização que orienta e protege</p><h1 id="hero-title">Segurança para<br /><em>cada caminho.</em></h1><p className="hero-text">Projetos e soluções em sinalização para cidades, obras e espaços que precisam funcionar melhor.</p><div className="hero-actions"><a className="button button-orange" href="#contato">Fale com nossa equipe <span aria-hidden="true">→</span></a><a className="text-link light" href="#solucoes">Conheça as soluções <span aria-hidden="true">↓</span></a></div></div>
      <div className="hero-art" aria-hidden="true"><video autoPlay muted loop playsInline poster="/images/rodovia.jpg"><source src="/videos/hero-go-sinalizacao.mp4" type="video/mp4" /></video><div className="hero-photo-shade" /><div className="art-caption"><Image src="/images/go-sinalizacao-transparent.png" alt="" width={116} height={77} /><p>Precisão técnica<br />em cada entrega.</p></div></div>
    </section>

    <section id="conteudo" className="intro journey-section section-pad" aria-labelledby="conteudo-title"><span className="route-marker" aria-hidden="true">KM 01</span><p className="section-number">KM 01 — O QUE FAZEMOS</p><div className="intro-layout"><h2 id="conteudo-title">Mais clareza.<br />Mais <em>segurança.</em></h2><div><p>Transformamos necessidades de circulação e orientação em sinalização bem executada — com diálogo técnico, planejamento e compromisso com cada detalhe.</p><a className="text-link dark" href="#empresa">Conheça a GO Sinalização <span aria-hidden="true">→</span></a></div></div></section>
    <section id="solucoes" className="solutions journey-section section-pad" aria-labelledby="solucoes-title"><span className="route-marker" aria-hidden="true">KM 02</span><div className="section-heading"><p className="section-number">KM 02 — SOLUÇÕES</p><h2 id="solucoes-title">A solução certa<br />para cada <em>trajeto.</em></h2></div><div className="service-list">{services.map(([number, title, description]) => <article className="service-card" key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div><b aria-hidden="true">↗</b></article>)}</div></section>
    <section id="atendimento" className="audiences journey-section section-pad" aria-labelledby="atendimento-title"><span className="route-marker" aria-hidden="true">KM 03</span><div className="audience-intro"><p className="section-number">KM 03 — PARA QUEM</p><h2 id="atendimento-title">Parceria para<br />quem faz a cidade<br /><em>acontecer.</em></h2></div><div className="audience-list">{audiences.map(([title, description], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>)}</div></section>
    <section className="process journey-section" aria-labelledby="processo-title"><span className="route-marker route-marker-light" aria-hidden="true">CHECKPOINTS</span><div className="process-content"><p className="section-number">UM PROCESSO CLARO</p><h2 id="processo-title">Da demanda<br />à <em>solução.</em></h2><ol><li><span>01</span> Entendemos o contexto</li><li><span>02</span> Planejamos a melhor solução</li><li><span>03</span> Executamos com cuidado técnico</li></ol></div></section>

    <section id="portfolio" className="portfolio journey-section section-pad" aria-labelledby="portfolio-title"><span className="route-marker" aria-hidden="true">KM 04</span><div className="portfolio-heading"><p className="section-number">KM 04 — PORTFÓLIO</p><h2 id="portfolio-title">Trabalho que se vê<br />em cada <em>detalhe.</em></h2></div><div className="portfolio-carousel" role="region" aria-label="Projetos realizados pela GO Sinalização">{portfolioItems.map(([src, alt, caption], index) => <figure key={src} className={index === 0 ? "portfolio-featured" : ""}><Image src={src} alt={alt} fill sizes="(max-width: 800px) 84vw, 38vw" /><figcaption>{caption}</figcaption></figure>)}</div></section>
    <section id="empresa" className="about journey-section section-pad" aria-labelledby="empresa-title"><span className="route-marker" aria-hidden="true">KM 05</span><p className="section-number">KM 05 — SOBRE A GO</p><div><h2 id="empresa-title">Sinalizar é<br /><em>cuidar.</em></h2><p>A GO Sinalização atua para tornar os espaços mais seguros, legíveis e preparados para o movimento de pessoas e veículos. Unimos experiência prática e atendimento próximo para entregar sinalização com propósito.</p></div></section>
    <section id="localizacao" className="location journey-section section-pad" aria-labelledby="localizacao-title"><span className="route-marker" aria-hidden="true">CHEGADA</span><div className="location-heading"><p className="section-number">LOCALIZAÇÃO</p><h2 id="localizacao-title">Perto para<br />atender <em>melhor.</em></h2></div><div className="location-grid"><BusinessInfo /><div className="map-wrap"><iframe title="Localização da GO Sinalização" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3820.044136389651!2d-49.2810645!3d-16.7744796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935efb8610aa728b%3A0x8e9d2a5c0a0cd149!2zR08gU2luYWxpemHDp8Ojbw!5e0!3m2!1spt-BR!2sbr!4v1789052514208!5m2!1spt-BR!2sbr" width="780" height="420" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" /></div></div></section>

    <section id="contato" className="contact journey-section" aria-labelledby="contato-title"><span className="route-destination" aria-hidden="true">●</span><div className="contact-copy"><p className="eyebrow"><span /> Vamos conversar</p><h2 id="contato-title">Seu projeto começa<br />com uma boa <em>conversa.</em></h2><p>Conte o que sua cidade, obra ou propriedade precisa sinalizar. Nossa equipe está pronta para entender a demanda.</p><div id="faq" className="faq" aria-label="Perguntas frequentes"><p>Perguntas frequentes</p>{faqItems.map(([question, answer]) => <details key={question}><summary>{question}</summary><span>{answer}</span></details>)}</div></div>
      <form className="contact-form" onSubmit={submitForm} noValidate><div className="form-heading"><p>Solicite um orçamento</p><span>Respondemos pelo WhatsApp</span></div><div className="field"><label htmlFor="name">Nome <b aria-hidden="true">*</b></label><input id="name" name="name" autoComplete="name" value={formValues.name} onChange={(event) => updateField("name", event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />{errors.name && <small id="name-error">{errors.name}</small>}</div><div className="field"><label htmlFor="phone">Telefone <b aria-hidden="true">*</b></label><input id="phone" name="phone" type="tel" autoComplete="tel" value={formValues.phone} onChange={(event) => updateField("phone", event.target.value)} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} />{errors.phone && <small id="phone-error">{errors.phone}</small>}</div><div className="field"><label htmlFor="email">E-mail <b aria-hidden="true">*</b></label><input id="email" name="email" type="email" autoComplete="email" value={formValues.email} onChange={(event) => updateField("email", event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />{errors.email && <small id="email-error">{errors.email}</small>}</div><div className="field"><label htmlFor="sector">Qual setor? <b aria-hidden="true">*</b></label><select id="sector" name="sector" value={formValues.sector} onChange={(event) => updateField("sector", event.target.value)} aria-invalid={Boolean(errors.sector)} aria-describedby={errors.sector ? "sector-error" : undefined}><option value="">Selecione uma opção</option><option>Setor público</option><option>Construção civil</option><option>Empresa</option><option>Condomínio</option><option>Propriedade privada</option><option>Outro</option></select>{errors.sector && <small id="sector-error">{errors.sector}</small>}</div><div className="field"><label htmlFor="context">Contexto / observação <b aria-hidden="true">*</b></label><textarea id="context" name="context" rows={5} value={formValues.context} onChange={(event) => updateField("context", event.target.value)} aria-invalid={Boolean(errors.context)} aria-describedby={errors.context ? "context-error" : undefined} />{errors.context && <small id="context-error">{errors.context}</small>}</div><button className="button button-whatsapp" type="submit">Solicitar orçamento <span aria-hidden="true">↗</span></button></form>
    </section>
    <footer><a className="brand" href="#inicio"><Image className="brand-logo" src="/images/go-sinalizacao-transparent.png" alt="GO Sinalização" width={136} height={91} /></a><p>© 2026 GO Sinalização. Todos os direitos reservados.</p><a href="#inicio">Voltar ao topo ↑</a></footer>
  </main>;
}
