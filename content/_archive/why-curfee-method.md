# „Warum Curfee?" und „Methode" (ersetzt durch „Wie ich entscheide" am 2026-08-08, Branch technical-positioning)

## Spektrum-SVG entfernt (2026-08-08 abends)

Die Inline-SVG-Grafik der Section (drei Zonen „Hart erzwungen" / „Sichtbar gemacht" /
„Menschliches Urteil" mit Regeltyp-Punkten und Achse) wurde beim Neubau der Section
entfernt. Ihr Inhalt lebt vollständig in den drei Spalten weiter: Regeltypen als Listen
mit abgestuften Punkt-Markern, Achse als schlichte Linie darüber. Zonen-Titel-Keys
(`decide.diagram.zone.1..3`) und das SVG-Aria entfernt, Markup in der Git-Historie.

Komponenten `WhyCurfeeSection.astro` und `MethodSection.astro` entfernt (Git-Historie).
Kern „Unmöglich machen, sichtbar machen oder dem Urteil überlassen" lebt als `decide.*` weiter.
`method.origin.1` (Logistik) wandert nach „Über mich". `method.origin.2` (Dokumentiert und
ignoriert) lebt sinngemäß in `decide.position.support` weiter. `howiwork.5` (Regeln bleiben
änderbar) wandert als Halbsatz in die Zusammenarbeit-Section.

## Warum Curfee? (`whycurfee.*`)

- Eyebrow de/en: Warum Curfee? / Why Curfee?
- Heading de: Was eine Maschine prüfen kann, sollte nie ein Mensch prüfen müssen. (jetzt Hero-H1)
- Heading en: Anything a machine can check, a human should never have to check.
- body.1 de: Jede pragmatische Entscheidung fügt eine weitere Regel hinzu, die die Menschen in deiner Organisation im Kopf behalten und händisch prüfen sollen.
- body.1 en: Every pragmatic decision adds another rule that the people in your organisation are asked to remember and check by hand.
- body.2 de: Ich möchte, dass Organisationen ihre Zeit und ihr Geld in Arbeit investieren, die Mehrwert für ihr Unternehmen und ihre Mitarbeitenden schafft. Deshalb habe ich Curfee gegründet. Ich beginne mit:
- body.2 en: I want organisations to invest their time and money in work that creates value for their business and employees. That's why I founded Curfee. I start:
- start.1 de/en: Deiner Systemlandschaft, die organisch gewachsen ist. / With your system landscape that has grown organically.
- start.2 de/en: Workflows, die funktionieren, weil jemand sie im Stillen pflegt. / With workflows that function because someone quietly maintains them.
- start.3 de/en: Den Entscheidungen, die getroffen, aber nie wirksam wurden. / With the decisions that have been made but never embedded.
- highlight de/en: Weniger zu tun ist schwieriger als mehr zu tun. / Doing less is harder than doing more.

## Methode (`method.*`, `howiwork.*`)

- Eyebrows: Methode / Method · Wie ich arbeite / How I work
- Gruppen: Wo ich beginne / Where I start · Wie ich entscheide / How I decide · Was bei dir bleibt / What stays with you
- howiwork.1 de: Ursache statt Symptom. Symptome zeigen die Richtung. Ursachen verlangen eine Lösung. Die Arbeit beginnt dort, wo das Problem entsteht.
- howiwork.1 en: Root cause over symptoms. Symptoms reveal the direction. Root causes demand resolution. The work begins where the chain ends.
- howiwork.2 de: Gewinn durch Weglassen. Die meisten Systemlandschaften leiden unter Ballast: zu viele Tools, Standards, die auf Disziplin beruhen, und aufgeblähte Workflows. Was nicht mehr existiert, braucht keine Pflege und wirft keine Fragen auf.
- howiwork.2 en: Addition by subtraction. Most system landscapes suffer from bloat: too many tools, standards that run on discipline, and inflated workflows. What no longer exists needs no maintenance and raises no questions.
- howiwork.3 de: Unmöglich machen, sichtbar machen oder dem Urteil überlassen. Manche Verstöße müssen unmöglich sein: bei Datenintegrität, Zugriffen oder rechtlichen Vorgaben. Andere bleiben als fehlschlagende Prüfungen sichtbar, die sich mit Begründung übergehen lassen. Die Arbeit liegt darin, zu entscheiden, welche Regel wohin gehört.
- howiwork.3 en: Make impossible, visible, or leave to judgment. Some violations must be impossible: data integrity, access, or legal requirements. Others stay visible as failing checks you can override with a reason. The work lies in deciding which rule goes where.
- howiwork.4 de: Fundament statt Workaround. Workarounds führen zu einer Struktur, die niemand gewählt hat. Ein solides Fundament kommt zuerst. Alles Weitere baut darauf auf.
- howiwork.4 en: Solid foundation over workaround. Workarounds lead to a structure that no one chose. A solid foundation comes first. Everything that follows builds on it.
- howiwork.5 de: Regeln bleiben änderbar. Jede Entscheidung, die das System durchsetzt, hat einen Verantwortlichen und einen günstigen Weg, sie zu ändern.
- howiwork.5 en: Rules stay changeable. Every decision built into the system has an owner and a cheap change path.

## Warum dieser Ansatz (`method.origins.heading`, `method.origin.*`)

- Überschrift de/en: Warum dieser Ansatz / Why this approach
- origin.1 de: Wurzeln in der Logistik. Angefangen habe ich damit, Abläufe zwischen Waren, Mitarbeitenden und Prozessen zu koordinieren. Wenn Menschen mit unterschiedlichen Arbeitsweisen zusammenarbeiten, zählt Struktur mehr als Disziplin.
- origin.1 en: Roots in logistics. I started by coordinating workflows between goods, employees, and processes. When people with different approaches work together, structure matters more than discipline.
- origin.2 de: Dokumentiert und ignoriert. In der Softwareentwicklung und Architektur habe ich immer wieder gesehen, wie gut dokumentierte Entscheidungen in der Praxis ignoriert wurden. Erst wenn eine Entscheidung in der Struktur lebt, wird der vereinbarte Weg zum einzigen Weg.
- origin.2 en: Documented and ignored. In software engineering and architecture, I kept watching well-documented decisions get ignored in practice. Once a decision lives in the structure, the agreed way becomes the only way.
- origin.3 de: Verbesserungen, die sich verzinsen. Eine eingebaute Entscheidung zahlt sich immer weiter aus, eine Abkürzung kostet immer weiter. Kommt Struktur zuerst, verzinsen sich die Verbesserungen statt der Komplexität.
- origin.3 en: Improvements that compound. An embedded decision keeps paying off, while a shortcut keeps costing. When structure comes first, improvements compound instead of complexity.
- origin.4 de: Struktur im Zeitalter der KI. Eine KI wird nicht müde und vergisst den vereinbarten Weg nicht. Sie erinnert sich aber auch nicht daran: Was nicht ins System eingebaut ist, bleibt für sie unsichtbar.
- origin.4 en: Structure in the age of AI. An AI does not get tired and does not forget the agreed way. It does not remember it either: whatever is not built into the system stays invisible.
