
import React, { useState, useEffect, useCallback } from "react";

const COLORS = {
  navy: "#0B1A3E",
  darkNavy: "#060F28",
  accent: "#3B82F6",
  accentLight: "#60A5FA",
  purple: "#8B5CF6",
  green: "#10B981",
  orange: "#F59E0B",
  red: "#EF4444",
  white: "#FFFFFF",
  lightGray: "#F1F5F9",
  midGray: "#94A3B8",
  textLight: "#CBD5E1",
  cardBg: "rgba(255,255,255,0.06)",
  cardBorder: "rgba(255,255,255,0.1)",
};

const animations = `
@import url('https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600;700;800&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeInLeft {
  from { opacity: 0; transform: translateX(-40px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes fadeInRight {
  from { opacity: 0; transform: translateX(40px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.85); }
  to { opacity: 1; transform: scale(1); }
}
@keyframes slideDown {
  from { opacity: 0; transform: translateY(-30px); }
  to { opacity: 1; transform: translateY(0); }
}
.animated { opacity: 0; animation-fill-mode: forwards; }
`;

const Anim = ({ children, type = "fadeInUp", delay = 0, duration = 0.7, style = {}, active }) => (
  <div
    className="animated"
    style={{
      ...style,
      animation: active ? `${type} ${duration}s ease-out ${delay}s forwards` : "none",
      opacity: active ? undefined : 0,
    }}
  >
    {children}
  </div>
);

const Pill = ({ text, color, delay, active }) => (
  <Anim type="scaleIn" delay={delay} active={active}>
    <span style={{
      display: "inline-block", padding: "6px 18px", borderRadius: 50,
      background: `${color}22`, border: `1px solid ${color}55`, color,
      fontSize: 13, fontWeight: 600, letterSpacing: 0.5,
    }}>{text}</span>
  </Anim>
);

const Card = ({ title, items, icon, color, delay, active, style = {} }) => (
  <Anim type="scaleIn" delay={delay} active={active} style={{ flex: 1, minWidth: 220, ...style }}>
    <div style={{
      background: COLORS.cardBg, border: `1px solid ${COLORS.cardBorder}`,
      borderRadius: 16, padding: 28, height: "100%",
      borderTop: `3px solid ${color}`,
    }}>
      <div style={{ fontSize: 28, marginBottom: 10 }}>{icon}</div>
      <div style={{ fontSize: 17, fontWeight: 700, color: COLORS.white, marginBottom: 14 }}>{title}</div>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "flex-start" }}>
          <span style={{ color, fontSize: 14, marginTop: 2, flexShrink: 0 }}>&#9656;</span>
          <span style={{ fontSize: 14, color: COLORS.textLight, lineHeight: 1.5 }}>{item}</span>
        </div>
      ))}
    </div>
  </Anim>
);



const slides = [
  // Слайд 0 — Титульный
  ({ active }) => (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -100, right: -100, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)" }} />
      <div style={{ position: "absolute", bottom: -80, left: -80, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)" }} />
      <Anim type="slideDown" delay={0.2} active={active}>
        <div style={{ display: "flex", gap: 10, marginBottom: 30, justifyContent: "center" }}>
          <Pill text="ФИНАНСОВЫЕ УСЛУГИ" color={COLORS.accent} delay={0.4} active={active} />
          <Pill text="СТРАТЕГИЯ LLM" color={COLORS.purple} delay={0.5} active={active} />
        </div>
      </Anim>
      <Anim type="fadeInUp" delay={0.3} active={active}>
        <h1 style={{ fontSize: 50, fontWeight: 300, color: COLORS.white, lineHeight: 1.15, maxWidth: 850, marginBottom: 20 }}>
          Раскрываем потенциал <span style={{ fontWeight: 700, background: "linear-gradient(135deg, #3B82F6, #8B5CF6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>LLM-трансформации</span>
        </h1>
      </Anim>
      <Anim type="fadeInUp" delay={0.6} active={active}>
        <p style={{ fontSize: 20, color: COLORS.midGray, maxWidth: 650, lineHeight: 1.6, marginBottom: 40 }}>
          Стратегический воркшоп для ускорения внедрения ИИ в процессы разработки и продуктовый портфель
        </p>
      </Anim>
      <Anim type="fadeInUp" delay={0.9} active={active}>
        <div style={{ padding: "14px 36px", borderRadius: 50, background: "linear-gradient(135deg, #3B82F6, #8B5CF6)", color: COLORS.white, fontWeight: 600, fontSize: 16 }}>
          Предложение воркшопа для руководства
        </div>
      </Anim>
    </div>
  ),

  // Слайд 1 — Повестка
  ({ active }) => (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "20px 0" }}>
      <Anim type="fadeInUp" delay={0.1} active={active}>
        <div style={{ marginBottom: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.accent, letterSpacing: 2 }}>ПОВЕСТКА</span>
        </div>
        <h2 style={{ fontSize: 38, fontWeight: 300, color: COLORS.white, marginBottom: 8 }}>Два стратегических направления</h2>
        <p style={{ fontSize: 16, color: COLORS.midGray, marginBottom: 36, maxWidth: 650 }}>Наш воркшоп охватывает два взаимодополняющих направления внедрения LLM</p>
      </Anim>
      <div style={{ display: "flex", gap: 28, flex: 1 }}>
        <Anim type="fadeInLeft" delay={0.4} active={active} style={{ flex: 1 }}>
          <div style={{
            background: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(59,130,246,0.05))",
            border: `2px solid ${COLORS.accent}`, borderRadius: 20, padding: 36, height: "100%",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: 16, right: 20, fontSize: 11, fontWeight: 700, color: COLORS.accent, background: `${COLORS.accent}22`, padding: "4px 14px", borderRadius: 50 }}>ОСНОВНОЙ ФОКУС</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.accent, letterSpacing: 1, marginBottom: 12 }}>НАПРАВЛЕНИЕ A</div>
            <h3 style={{ fontSize: 24, fontWeight: 700, color: COLORS.white, marginBottom: 16 }}>LLM в разработке</h3>
            <p style={{ fontSize: 15, color: COLORS.textLight, lineHeight: 1.7, marginBottom: 20 }}>Трансформация инженерной организации с помощью ИИ-практик разработки</p>
            {["Продуктивность разработчиков", "Наблюдаемость и инструменты для менеджеров", "Валидация качества", "Автоматизация выходных артефактов"].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{ width: 24, height: 24, borderRadius: "50%", background: `${COLORS.accent}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: COLORS.accent, fontWeight: 700 }}>{i+1}</span>
                <span style={{ fontSize: 14, color: COLORS.white, fontWeight: 500 }}>{item}</span>
              </div>
            ))}
          </div>
        </Anim>
        <Anim type="fadeInRight" delay={0.6} active={active} style={{ flex: 1 }}>
          <div style={{
            background: COLORS.cardBg, border: `1px solid ${COLORS.cardBorder}`,
            borderRadius: 20, padding: 36, height: "100%", opacity: 0.8,
          }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.purple, letterSpacing: 1, marginBottom: 12 }}>НАПРАВЛЕНИЕ Б</div>
            <h3 style={{ fontSize: 24, fontWeight: 700, color: COLORS.white, marginBottom: 16 }}>LLM в продукте</h3>
            <p style={{ fontSize: 15, color: COLORS.textLight, lineHeight: 1.7, marginBottom: 20 }}>Замена ручных финансовых сервисов и устаревших продуктов на ИИ-решения</p>
            {["ИИ-финансовые консультанты", "Автоматическая оценка рисков", "Персонализированные финансовые продукты", "Автоматизация комплаенса"].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{ color: COLORS.purple, fontSize: 14 }}>&#9656;</span>
                <span style={{ fontSize: 14, color: COLORS.midGray, fontWeight: 500 }}>{item}</span>
              </div>
            ))}
            <div style={{ marginTop: 16, fontSize: 13, color: COLORS.midGray, fontStyle: "italic" }}>Подробно рассматривается на Фазе 2</div>
          </div>
        </Anim>
      </div>
    </div>
  ),

  // Слайд 2 — Почему сейчас
  ({ active }) => (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "20px 0" }}>
      <Anim type="fadeInUp" delay={0.1} active={active}>
        <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.orange, letterSpacing: 2 }}>КОНТЕКСТ РЫНКА</span>
        <h2 style={{ fontSize: 38, fontWeight: 300, color: COLORS.white, marginBottom: 8, marginTop: 8 }}>Почему именно сейчас?</h2>
        <p style={{ fontSize: 16, color: COLORS.midGray, marginBottom: 32 }}>Финансовые компании, действующие сейчас, получают кумулятивное преимущество</p>
      </Anim>
      <div style={{ display: "flex", gap: 20, marginBottom: 28 }}>
        <NumberCard number="73%" label="фин. компаний инвестируют в ИИ" delay={0.3} active={active} color={COLORS.accent} />
        <NumberCard number="2.5x" label="Рост скорости разработки" delay={0.45} active={active} color={COLORS.green} />
        <NumberCard number="40%" label="Сокращение ручных процессов" delay={0.6} active={active} color={COLORS.purple} />
        <NumberCard number="$4.4T" label="Прогноз рынка ИИ к 2030" delay={0.75} active={active} color={COLORS.orange} />
      </div>
      <div style={{ display: "flex", gap: 20, flex: 1 }}>
        {[
          { title: "Конкурентное давление", text: "Ранние последователи уже выпускают продукты с ИИ. Окно для преимущества первопроходца стремительно закрывается.", color: COLORS.red, icon: "&#9888;" },
          { title: "Регуляторная готовность", text: "Компании с развитыми ИИ-фреймворками управления быстрее и легче адаптируются к новым нормативным требованиям.", color: COLORS.orange, icon: "&#9881;" },
          { title: "Удержание талантов", text: "Лучшие инженеры ожидают современные ИИ-инструменты. Организации без них теряют сотрудников.", color: COLORS.green, icon: "&#9733;" },
        ].map((item, i) => (
          <Anim key={i} type="fadeInUp" delay={0.5 + i * 0.15} active={active} style={{ flex: 1 }}>
            <div style={{ background: COLORS.cardBg, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 16, padding: 24, height: "100%", borderLeft: `3px solid ${item.color}` }}>
              <div style={{ fontSize: 24, marginBottom: 8 }} dangerouslySetInnerHTML={{ __html: item.icon }} />
              <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.white, marginBottom: 8 }}>{item.title}</div>
              <div style={{ fontSize: 14, color: COLORS.textLight, lineHeight: 1.6 }}>{item.text}</div>
            </div>
          </Anim>
        ))}
      </div>
    </div>
  ),

  // Слайд 3 — Обзор направления A
  ({ active }) => (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "20px 0" }}>
      <Anim type="fadeInUp" delay={0.1} active={active}>
        <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.accent, letterSpacing: 2 }}>НАПРАВЛЕНИЕ A — ДЕТАЛЬНЫЙ ОБЗОР</span>
        <h2 style={{ fontSize: 38, fontWeight: 300, color: COLORS.white, marginBottom: 8, marginTop: 8 }}>LLM в процессе разработки</h2>
        <p style={{ fontSize: 16, color: COLORS.midGray, marginBottom: 36 }}>Четыре взаимосвязанных столпа трансформации инженерной организации</p>
      </Anim>
      <div style={{ display: "flex", gap: 20, flex: 1 }}>
        {[
          { num: "01", title: "Продуктивность разработчиков", desc: "Ускорение работы с помощью ИИ-ассистента для кодинга, ревью и поиска знаний", color: COLORS.accent, items: ["Генерация и рефакторинг кода", "Ускорение код-ревью", "Поиск знаний", "Исправление багов и качество кода", "Безопасность и снижение рисков"] },
          { num: "02", title: "Наблюдаемость для менеджеров", desc: "Прозрачность внедрения ИИ, качества и метрик влияния на команды", color: COLORS.purple, items: ["Дашборды внедрения", "Метрики качества", "Спринт-аналитика", "Анализ использования продукта", "Обнаружение проблем", "Генерация отчётов"] },
          { num: "03", title: "Валидация качества", desc: "Автоматизация тестирования, код-ревью и проверок на соответствие", color: COLORS.green, items: ["Генерация тестов с LLM", "Автоматическое код-ревью", "Обнаружение граничных случаев", "Комплаенс для фин. сектора (SOX, PCI-DSS)"] },
          { num: "04", title: "Автоматизация артефактов", desc: "Устранение рутины через автогенерацию документации, отчётов и релизов", color: COLORS.orange, items: ["Релизные заметки", "API-документация", "Спринт-отчёты и инцидент-репорты", "Записи архитектурных решений"] },
        ].map((item, i) => (
          <Anim key={i} type="fadeInUp" delay={0.3 + i * 0.15} active={active} style={{ flex: 1 }}>
            <div style={{ background: COLORS.cardBg, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 20, padding: 28, height: "100%", position: "relative", overflow: "hidden" }}>
              <div style={{ fontSize: 48, fontWeight: 800, color: `${item.color}15`, position: "absolute", top: 10, right: 16 }}>{item.num}</div>
              <div style={{ width: 40, height: 4, borderRadius: 2, background: item.color, marginBottom: 18 }} />
              <div style={{ fontSize: 17, fontWeight: 700, color: COLORS.white, marginBottom: 10 }}>{item.title}</div>
              <div style={{ fontSize: 13, color: COLORS.midGray, lineHeight: 1.6, marginBottom: 18 }}>{item.desc}</div>
              {item.items.map((it, j) => (
                <div key={j} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: item.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: COLORS.textLight }}>{it}</span>
                </div>
              ))}
            </div>
          </Anim>
        ))}
      </div>
    </div>
  ),

  // Слайд 4 — Продуктивность разработчиков
  ({ active }) => (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "16px 0" }}>
      <Anim type="fadeInUp" delay={0.1} active={active}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.accent, letterSpacing: 2 }}>СТОЛП 01</span>
          <span style={{ width: 40, height: 1, background: COLORS.accent }} />
        </div>
        <h2 style={{ fontSize: 36, fontWeight: 300, color: COLORS.white, marginBottom: 24 }}>Продуктивность разработчиков</h2>
      </Anim>
      <div style={{ display: "flex", gap: 20, flex: 1 }}>
        <div style={{ flex: 1.2, display: "flex", flexDirection: "column", gap: 12 }}>
          <Card active={active} delay={0.3} color={COLORS.accent} icon="&#60;/&#62;" title="ИИ-ассистент для кодинга" items={["Контекстные предложения кода для вашей кодовой базы", "Рефакторинг и мульти-файловые изменения за секунды", "Поддержка всех основных языков и фреймворков"]} />
          <Card active={active} delay={0.5} color={COLORS.accentLight} icon="&#128269;" title="Поиск знаний" items={["Мгновенные ответы из внутренней документации", "Поиск по кодовой базе с учётом контекста", "Снижение зависимости от устных знаний"]} />
          <Card active={active} delay={0.6} color={COLORS.green} icon="&#9878;" title="Исправление багов и качество кода" items={["ИИ-анализ первопричин для быстрой сортировки багов", "Предиктивное обнаружение дефектов до продакшена", "Автоматические предложения исправлений с учётом контекста"]} />
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
          <Card active={active} delay={0.4} color={COLORS.purple} icon="&#9889;" title="Ускорение код-ревью" items={["ИИ-предложения до ревью человеком", "Автоматическая проверка стиля и конвенций", "Ускорение обработки PR"]} />
          <Card active={active} delay={0.55} color={COLORS.red} icon="&#128737;" title="Безопасность и снижение рисков" items={["Проактивное обнаружение уязвимостей в процессе разработки", "Автоматическое сканирование безопасности каждого коммита", "Сокращение площади атаки через ИИ-контроль безопасного кода"]} />
          <Anim type="scaleIn" delay={0.65} active={active} style={{ flex: 1 }}>
            <div style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.12), rgba(139,92,246,0.12))", border: `1px solid ${COLORS.accent}44`, borderRadius: 16, padding: 24, height: "100%" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.accent, marginBottom: 14 }}>ОЖИДАЕМЫЙ ЭФФЕКТ</div>
              {[["Время цикла", "-35%", COLORS.green], ["Пропускная способность PR", "+50%", COLORS.accent], ["Время исправления багов", "-45%", COLORS.green], ["Уязвимости безопасности", "-60%", COLORS.red], ["Время онбординга", "-40%", COLORS.purple], ["Качество кода", "+30%", COLORS.orange]].map(([label, val, c], i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, paddingBottom: 8, borderBottom: i < 5 ? `1px solid ${COLORS.cardBorder}` : "none" }}>
                  <span style={{ fontSize: 13, color: COLORS.textLight }}>{label}</span>
                  <span style={{ fontSize: 18, fontWeight: 700, color: c }}>{val}</span>
                </div>
              ))}
            </div>
          </Anim>
        </div>
      </div>
    </div>
  ),

  // Слайд 5 — Наблюдаемость для менеджеров
  ({ active }) => (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "16px 0" }}>
      <Anim type="fadeInUp" delay={0.1} active={active}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.purple, letterSpacing: 2 }}>СТОЛП 02</span>
          <span style={{ width: 40, height: 1, background: COLORS.purple }} />
        </div>
        <h2 style={{ fontSize: 36, fontWeight: 300, color: COLORS.white, marginBottom: 24 }}>Наблюдаемость и инструменты для менеджеров</h2>
      </Anim>
      <div style={{ display: "flex", gap: 20, flex: 1 }}>
        <div style={{ flex: 1.1, display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { title: "Дашборды внедрения ИИ", desc: "Отслеживание использования ИИ-инструментов, частоты и уровня внедрения по командам и сотрудникам", color: COLORS.purple },
            { title: "Метрики качества", desc: "Мониторинг качества ИИ-генерируемого кода через показатели принятия, частоту ревизий и корреляцию дефектов", color: COLORS.accent },
            { title: "Спринт-аналитика", desc: "Визуализация влияния ИИ на скорость, завершение историй и инженерную ёмкость на уровне команды и организации", color: COLORS.green },
            { title: "Анализ использования продукта и поставки", desc: "Корреляция инженерных результатов с внедрением продукта, использованием фич и показателями поставки", color: COLORS.orange },
            { title: "Обнаружение проблем в масштабе", desc: "ИИ-дебаггинг для выявления и приоритизации проблем — доставка разработчикам готовых, действенных багов с анализом причин и предложениями решений", color: COLORS.red },
            { title: "Генерация отчётов и презентаций", desc: "Автоматическое создание управленческих отчётов, исполнительных сводок и презентаций из актуальных данных", color: COLORS.accentLight },
          ].map((item, i) => (
            <Anim key={i} type="fadeInLeft" delay={0.3 + i * 0.12} active={active} style={{ flex: 1 }}>
              <div style={{ background: COLORS.cardBg, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 14, padding: "16px 20px", height: "100%", borderLeft: `3px solid ${item.color}`, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.white, marginBottom: 6 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: COLORS.textLight, lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            </Anim>
          ))}
        </div>
        <Anim type="fadeInRight" delay={0.5} active={active} style={{ flex: 0.9 }}>
          <div style={{ background: "linear-gradient(180deg, rgba(139,92,246,0.1), rgba(59,130,246,0.05))", border: `1px solid ${COLORS.purple}33`, borderRadius: 20, padding: 28, height: "100%", display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.purple, marginBottom: 16 }}>УПРАВЛЕНИЕ В ФИНАНСОВОМ СЕКТОРЕ</div>
            <p style={{ fontSize: 13, color: COLORS.textLight, lineHeight: 1.6, marginBottom: 16 }}>Регулируемые среды требуют повышенной прозрачности. Наш фреймворк покрывает:</p>
            {[
              "Прозрачность рисков и комплаенса для ИИ-кода",
              "Аудиторский след каждого ИИ-изменения",
              "Проверка обработки конфиденциальных данных",
              "Политики использования моделей и ограничения",
              "Регуляторная отчётность по метрикам ИИ",
              "Ролевой доступ к данным наблюдаемости",
              "Корреляция инцидентов с метриками поставки",
              "Автоматический анализ первопричин и трекинг решений",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 10 }}>
                <span style={{ color: COLORS.purple, fontSize: 14, marginTop: 1, flexShrink: 0 }}>&#10003;</span>
                <span style={{ fontSize: 13, color: COLORS.textLight, lineHeight: 1.45 }}>{item}</span>
              </div>
            ))}
          </div>
        </Anim>
      </div>
    </div>
  ),

  // Слайд 6 — Валидация качества
  ({ active }) => (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "20px 0" }}>
      <Anim type="fadeInUp" delay={0.1} active={active}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.green, letterSpacing: 2 }}>СТОЛП 03</span>
          <span style={{ width: 40, height: 1, background: COLORS.green }} />
        </div>
        <h2 style={{ fontSize: 38, fontWeight: 300, color: COLORS.white, marginBottom: 32 }}>Валидация качества</h2>
      </Anim>
      <div style={{ display: "flex", gap: 24, flex: 1 }}>
        <Card active={active} delay={0.3} color={COLORS.green} icon="&#9745;" title="Генерация тестов с LLM" style={{ flex: 1 }}
          items={["Автогенерация юнит-, интеграционных и e2e-тестов", "Обнаружение граничных случаев из анализа кода", "Выявление пробелов в покрытии тестами", "Дополнение регрессионного набора"]} />
        <Card active={active} delay={0.45} color={COLORS.accent} icon="&#128737;" title="Автоматическое код-ревью" style={{ flex: 1 }}
          items={["Обнаружение уязвимостей безопасности", "Проверка паттернов комплаенса", "Валидация лучших практик", "Выявление анти-паттернов производительности"]} />
        <Card active={active} delay={0.6} color={COLORS.orange} icon="&#9878;" title="Специфика финансового сектора" style={{ flex: 1 }}
          items={["Слои проверки целостности данных", "Полная генерация аудиторского следа", "Предотвращение утечки ПДн/конфиденциальных данных", "Проверки регуляторного соответствия (SOX, PCI-DSS)"]} />
      </div>
      <Anim type="fadeInUp" delay={0.8} active={active}>
        <div style={{ marginTop: 20, background: `${COLORS.green}11`, border: `1px solid ${COLORS.green}33`, borderRadius: 12, padding: "16px 24px", display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 20, color: COLORS.green }}>&#9432;</span>
          <span style={{ fontSize: 14, color: COLORS.textLight }}>
            <strong style={{ color: COLORS.green }}>Ключевой инсайт:</strong> В финансовом секторе валидация качества — не опция, а регуляторное требование. ИИ-валидация обеспечивает скорость и аудируемость, недоступные ручным процессам.
          </span>
        </div>
      </Anim>
    </div>
  ),

  // Слайд 7 — Автоматизация артефактов
  ({ active }) => (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "20px 0" }}>
      <Anim type="fadeInUp" delay={0.1} active={active}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.orange, letterSpacing: 2 }}>СТОЛП 04</span>
          <span style={{ width: 40, height: 1, background: COLORS.orange }} />
        </div>
        <h2 style={{ fontSize: 38, fontWeight: 300, color: COLORS.white, marginBottom: 32 }}>Автоматизация выходных артефактов</h2>
      </Anim>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, flex: 1 }}>
        {[
          { title: "Релизные заметки и ченжлоги", desc: "Автогенерация комплексных релизных заметок из истории коммитов, описаний PR и задач Jira для заинтересованных сторон", icon: "&#128196;", color: COLORS.orange },
          { title: "API-документация", desc: "Поддержание API-документации в актуальном состоянии с автогенерацией описаний эндпоинтов, схем запросов/ответов и примеров", icon: "&#128218;", color: COLORS.accent },
          { title: "Спринт-отчёты и инцидент-репорты", desc: "Автоматические сводки спринтов, отчёты по скорости и постмортемы инцидентов — экономия часов менеджерского времени", icon: "&#128202;", color: COLORS.purple },
          { title: "Записи архитектурных решений", desc: "Фиксация и формализация архитектурных решений с ИИ-генерацией ADR, связывая контекст, обоснование и последствия", icon: "&#127959;", color: COLORS.green },
        ].map((item, i) => (
          <Anim key={i} type="scaleIn" delay={0.3 + i * 0.15} active={active}>
            <div style={{ background: COLORS.cardBg, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 16, padding: 28, height: "100%", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <span style={{ fontSize: 24 }} dangerouslySetInnerHTML={{ __html: item.icon }} />
                <span style={{ fontSize: 16, fontWeight: 700, color: COLORS.white }}>{item.title}</span>
              </div>
              <p style={{ fontSize: 14, color: COLORS.textLight, lineHeight: 1.7, flex: 1 }}>{item.desc}</p>
              <div style={{ marginTop: 14, width: 40, height: 3, borderRadius: 2, background: item.color }} />
            </div>
          </Anim>
        ))}
      </div>
      <Anim type="fadeInUp" delay={0.85} active={active}>
        <div style={{ marginTop: 20, textAlign: "center", fontSize: 15, color: COLORS.midGray }}>
          <strong style={{ color: COLORS.orange }}>Цель:</strong> Устранить рутину, чтобы ваша команда сосредоточилась на решении бизнес-задач
        </div>
      </Anim>
    </div>
  ),

  // Слайд 8 — Направление Б
  ({ active }) => (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "20px 0" }}>
      <Anim type="fadeInUp" delay={0.1} active={active}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.purple, letterSpacing: 2 }}>НАПРАВЛЕНИЕ Б — ОБЗОР</span>
        </div>
        <h2 style={{ fontSize: 38, fontWeight: 300, color: COLORS.white, marginBottom: 8 }}>LLM в продукте и сервисном слое</h2>
        <p style={{ fontSize: 16, color: COLORS.midGray, marginBottom: 32 }}>Замена ручных финансовых услуг интеллектуальными ИИ-решениями</p>
      </Anim>
      <div style={{ display: "flex", gap: 24, flex: 1 }}>
        {[
          { title: "ИИ-финансовые консультанты", desc: "Замена или усиление ручного консалтинга с помощью LLM-агентов, предоставляющих персонализированные финансовые рекомендации в масштабе", items: ["Доступность 24/7", "Стабильный комплаенс", "Масштабируемая персонализация"], color: COLORS.purple },
          { title: "Автоматизация рисков и отчётности", desc: "Трансформация ручных оценок рисков и клиентских отчётов в ИИ-генерируемую аналитику реального времени", items: ["Оценка рисков в реальном времени", "Автоматические регуляторные отчёты", "Динамические портфельные отчёты"], color: COLORS.accent },
          { title: "Интеллектуальные продуктовые движки", desc: "Создание динамически персонализированных финансовых продуктов под индивидуальный профиль клиента, толерантность к риску и жизненные события", items: ["Гиперперсонализация", "Динамические модели ценообразования", "Предиктивные потребности клиентов"], color: COLORS.green },
        ].map((item, i) => (
          <Anim key={i} type="fadeInUp" delay={0.3 + i * 0.2} active={active} style={{ flex: 1 }}>
            <div style={{ background: COLORS.cardBg, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 20, padding: 28, height: "100%", display: "flex", flexDirection: "column" }}>
              <div style={{ width: 50, height: 50, borderRadius: 12, background: `${item.color}22`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: item.color }} />
              </div>
              <h3 style={{ fontSize: 19, fontWeight: 700, color: COLORS.white, marginBottom: 12 }}>{item.title}</h3>
              <p style={{ fontSize: 14, color: COLORS.textLight, lineHeight: 1.7, marginBottom: 20, flex: 1 }}>{item.desc}</p>
              {item.items.map((it, j) => (
                <div key={j} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ color: item.color, fontSize: 14 }}>&#9656;</span>
                  <span style={{ fontSize: 13, color: COLORS.textLight }}>{it}</span>
                </div>
              ))}
            </div>
          </Anim>
        ))}
      </div>
      <Anim type="fadeInUp" delay={0.9} active={active}>
        <div style={{ marginTop: 20, background: `${COLORS.purple}11`, border: `1px solid ${COLORS.purple}33`, borderRadius: 12, padding: "14px 24px", textAlign: "center" }}>
          <span style={{ fontSize: 14, color: COLORS.textLight }}>
            <strong style={{ color: COLORS.purple }}>Фаза 2</strong> — Детальная проработка этих возможностей после закладки фундамента в разработке
          </span>
        </div>
      </Anim>
    </div>
  ),

  // Слайд 9 — Модель воркшопа
  ({ active }) => (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "20px 0" }}>
      <Anim type="fadeInUp" delay={0.1} active={active}>
        <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.accent, letterSpacing: 2 }}>МОДЕЛЬ ВЗАИМОДЕЙСТВИЯ</span>
        <h2 style={{ fontSize: 38, fontWeight: 300, color: COLORS.white, marginBottom: 32, marginTop: 8 }}>Структура воркшопа</h2>
      </Anim>
      <div style={{ display: "flex", gap: 24, marginBottom: 24 }}>
        {[
          { phase: "Фаза 1", title: "Оценка", duration: "Неделя 1-2", desc: "Оценка текущих инструментов, процессов и готовности инженерных команд", color: COLORS.accent, items: ["Аудит технологий", "Интервью с командами", "Анализ пробелов"] },
          { phase: "Фаза 2", title: "Пилот", duration: "Неделя 3-6", desc: "Развёртывание LLM-инструментов с выбранными командами, измерение эффекта и итерация", color: COLORS.purple, items: ["Развёртывание инструментов", "Базовые KPI", "Итеративная настройка"] },
          { phase: "Фаза 3", title: "Масштабирование", duration: "Неделя 7-12", desc: "Развёртывание проверенных практик на всю организацию с фреймворками управления и обучения", color: COLORS.green, items: ["Развёртывание на всю организацию", "Настройка управления", "Программы обучения"] },
        ].map((item, i) => (
          <Anim key={i} type="fadeInUp" delay={0.3 + i * 0.2} active={active} style={{ flex: 1 }}>
            <div style={{ background: COLORS.cardBg, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 20, padding: 28, height: "100%", position: "relative" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: item.color, letterSpacing: 1 }}>{item.phase}</span>
                <span style={{ fontSize: 11, color: COLORS.midGray, background: COLORS.cardBg, padding: "4px 12px", borderRadius: 50 }}>{item.duration}</span>
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: COLORS.white, marginBottom: 10 }}>{item.title}</h3>
              <p style={{ fontSize: 14, color: COLORS.textLight, lineHeight: 1.6, marginBottom: 16 }}>{item.desc}</p>
              {item.items.map((it, j) => (
                <div key={j} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: item.color }} />
                  <span style={{ fontSize: 13, color: COLORS.textLight }}>{it}</span>
                </div>
              ))}
            </div>
          </Anim>
        ))}
      </div>
      <Anim type="fadeInUp" delay={0.9} active={active}>
        <div style={{ background: COLORS.cardBg, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 16, padding: 24, display: "flex", gap: 40, justifyContent: "center" }}>
          {[
            ["Индивидуально", "Адаптировано под ваш стек и регуляторные ограничения"],
            ["Измеримо", "Чёткие KPI и бенчмарки ROI на каждой фазе"],
            ["Практически", "Ваши команды получают реальные навыки, а не только теорию"],
          ].map(([title, desc], i) => (
            <div key={i} style={{ textAlign: "center", flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.white, marginBottom: 4 }}>{title}</div>
              <div style={{ fontSize: 13, color: COLORS.midGray }}>{desc}</div>
            </div>
          ))}
        </div>
      </Anim>
    </div>
  ),

  // Слайд 10 — Призыв к действию
  ({ active }) => (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -120, left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 60%)" }} />
      <div style={{ position: "absolute", bottom: -100, right: -100, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 60%)" }} />
      <Anim type="scaleIn" delay={0.2} active={active}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg, #3B82F6, #8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 32, boxShadow: "0 0 40px rgba(59,130,246,0.3)" }}>
          <span style={{ fontSize: 36, color: COLORS.white }}>&#10140;</span>
        </div>
      </Anim>
      <Anim type="fadeInUp" delay={0.4} active={active}>
        <h2 style={{ fontSize: 46, fontWeight: 300, color: COLORS.white, lineHeight: 1.2, maxWidth: 700, marginBottom: 16 }}>
          Давайте <span style={{ fontWeight: 700 }}>начнём</span>
        </h2>
      </Anim>
      <Anim type="fadeInUp" delay={0.6} active={active}>
        <p style={{ fontSize: 18, color: COLORS.midGray, maxWidth: 600, lineHeight: 1.6, marginBottom: 40 }}>
          Запланируйте воркшоп, определите пилотные команды и начните трансформацию инженерной организации с помощью LLM
        </p>
      </Anim>
      <div style={{ display: "flex", gap: 20, marginBottom: 40 }}>
        {[
          { label: "Назначить воркшоп", primary: true },
          { label: "Определить команды", primary: false },
          { label: "Согласовать KPI", primary: false },
        ].map((btn, i) => (
          <Anim key={i} type="fadeInUp" delay={0.8 + i * 0.1} active={active}>
            <div style={{
              padding: "14px 28px", borderRadius: 50, fontWeight: 600, fontSize: 15,
              background: btn.primary ? "linear-gradient(135deg, #3B82F6, #8B5CF6)" : "transparent",
              color: COLORS.white,
              border: btn.primary ? "none" : `1px solid ${COLORS.cardBorder}`,
              cursor: "pointer",
            }}>{btn.label}</div>
          </Anim>
        ))}
      </div>
      <Anim type="fadeIn" delay={1.2} active={active}>
        <p style={{ fontSize: 14, color: COLORS.midGray }}>
          Готовы обсудить следующие шаги? Давайте согласуем сроки и объём работ.
        </p>
      </Anim>
    </div>
  ),
];

export default function App() {
  const [current, setCurrent] = useState(0);
  const [viewAll, setViewAll] = useState(false);
  const total = slides.length;

  const next = useCallback(() => setCurrent(c => Math.min(c + 1, total - 1)), [total]);
  const prev = useCallback(() => setCurrent(c => Math.max(c - 1, 0)), []);

  useEffect(() => {
    const handler = (e) => {
      if (viewAll) return;
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); next(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev, viewAll]);

  const slideNames = [
    "Титульный", "Повестка", "Почему сейчас?", "Направление разработки", "Продуктивность",
    "Наблюдаемость", "Качество", "Автоматизация", "Продуктовый слой", "Модель воркшопа", "Следующие шаги"
  ];

  if (viewAll) {
    return (
      <div style={{ fontFamily: "'Figtree', sans-serif", background: COLORS.darkNavy, minHeight: "100vh", padding: 32 }}>
        <style>{animations}</style>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ color: COLORS.white, fontSize: 22, fontWeight: 300 }}>Все слайды</h2>
          <button onClick={() => setViewAll(false)} style={{ padding: "8px 20px", borderRadius: 50, background: COLORS.accent, color: COLORS.white, border: "none", cursor: "pointer", fontFamily: "'Figtree', sans-serif", fontWeight: 600, fontSize: 14 }}>
            Вернуться к презентации
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {slides.map((Slide, i) => (
            <div key={i}>
              <div style={{ color: COLORS.midGray, fontSize: 13, marginBottom: 8, fontWeight: 600 }}>Слайд {i + 1} — {slideNames[i]}</div>
              <div className="page" style={{ background: COLORS.navy, borderRadius: 16, padding: "48px 56px", aspectRatio: "16/9", maxWidth: 1000, cursor: "pointer", border: `1px solid ${COLORS.cardBorder}` }} onClick={() => { setCurrent(i); setViewAll(false); }}>
                <Slide active={true} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const Slide = slides[current];

  return (
    <div style={{ fontFamily: "'Figtree', sans-serif", background: COLORS.darkNavy, height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <style>{animations}</style>


      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <div className="page" key={current} style={{ flex: 1, padding: "40px 56px", overflow: "auto" }}>
          <Slide active={true} />
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 24px", borderTop: `1px solid ${COLORS.cardBorder}`, flexShrink: 0 }}>
        <button onClick={prev} disabled={current === 0} style={{ padding: "8px 20px", borderRadius: 6, background: current === 0 ? "transparent" : COLORS.cardBg, border: `1px solid ${current === 0 ? "transparent" : COLORS.cardBorder}`, color: current === 0 ? COLORS.cardBorder : COLORS.textLight, cursor: current === 0 ? "default" : "pointer", fontFamily: "'Figtree', sans-serif", fontSize: 13, fontWeight: 500 }}>
          &#8592; Назад
        </button>
        <div style={{ display: "flex", gap: 6 }}>
          {slides.map((_, i) => (
            <div key={i} onClick={() => setCurrent(i)} style={{ width: i === current ? 24 : 8, height: 8, borderRadius: 4, background: i === current ? COLORS.accent : COLORS.cardBorder, cursor: "pointer", transition: "all 0.3s" }} />
          ))}
        </div>
        <button onClick={next} disabled={current === total - 1} style={{ padding: "8px 20px", borderRadius: 6, background: current === total - 1 ? "transparent" : COLORS.accent, border: "none", color: current === total - 1 ? COLORS.cardBorder : COLORS.white, cursor: current === total - 1 ? "default" : "pointer", fontFamily: "'Figtree', sans-serif", fontSize: 13, fontWeight: 500 }}>
          Далее &#8594;
        </button>
      </div>
    </div>
  );
}
