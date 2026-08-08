# Hero (Texte ersetzt am 2026-08-08, Branch technical-positioning)

## Zwischenstand v3: ArchUnit-Snippet-Visual (gleicher Tag ersetzt durch das Modulith-Diagramm)

Das Hero-Visual zeigte einen beispielhaften ArchUnit-Test (`domain_stays_clean`, noClasses in
domain hängen von infrastructure ab) plus fehlgeschlagene CI-Ausgabe mit „1 rule violated ·
merge blocked", markiert mit Beispiel-Badge. Ersetzt durch ein Modulith-Diagramm (drei Module,
Schnittstellen-Port, gestoppter Grenzverstoß), womit das TODO für ein echtes Hero-Snippet
entfällt. Keys `hero.visual.rule` und `hero.visual.output` entfernt.

## Zwischenstand v2 (Diagramm-Formulierung, gleicher Tag wieder ersetzt durch die Build-bricht-Fassung)

- `hero.subtitle` de: Ich entwerfe Backend-Architektur für Java und das Spring-Ökosystem. Architekturentscheidungen enden bei mir nicht als Diagramm. Sie werden im System verankert, bis ihre Verletzung auffällt oder unmöglich ist.
- `hero.subtitle` en: I design backend architecture for Java and the Spring ecosystem. Architecture decisions do not end as diagrams here. They are anchored in the system, so violating them is either visible or impossible.
- `decide.position.support` verlor dabei seinen Schlusssatz an den Hero (`hero.anchor`): Erst wenn eine Entscheidung in der Struktur lebt, ist der vereinbarte Weg der einzige. / Only once a decision lives in the structure is the agreed way the only way.

## Zwischenstand v1 vom Vormittag (ersetzt am Nachmittag durch die Java/Spring-Fassung, H1 blieb)

- `hero.subtitle` de: Ich baue die Regeln, die heute in Wikis, Guidelines und Köpfen liegen, in deine Systeme ein: als Datenbank-Constraints, Architekturtests und CI-Gates. Am Ende ist der vereinbarte Weg der einzig mögliche.
- `hero.subtitle` en: I build the rules that sit in wikis, guidelines and heads today into your systems: as database constraints, architecture tests and CI gates. In the end, the agreed way is the only way left.
- `hero.fit` de: Für CTOs, Engineering-Leads und technische Bereichsleiter, deren Systemlandschaft schneller gewachsen ist als ihre Struktur.
- `hero.fit` en: For CTOs, engineering leads and technical department heads whose system landscape grew faster than its structure.

## `hero.heading` (alte H1)

- de: Wie viel <span>Zeit</span> verbringt dein Team jede Woche mit Arbeit, die <span>deine Systeme</span> erledigen sollten?
- en: How much of <span>your team's week</span> goes to work <span>your systems</span> should be doing?

## `hero.subtitle`

- de: Ich begleite dich dabei, Entscheidungen in deine Systeme einzubauen: solche, die längst getroffen sind und in deinen Wikis und Protokollen liegen, und solche, die erst noch getroffen werden müssen. Ab dann setzt das System sie durch, ohne dass jemand hinschauen oder sie pflegen muss.
- en: I guide you in building decisions into your systems: the ones already made and sitting in your wikis and meeting notes, and the ones that still need to be made. From then on, they get enforced without anyone watching or maintaining them.

## `hero.mode` (ersatzlos entfernt)

- de: Das Wissen bleibt bei deinem Team: Ich entwerfe das Vorgehen, das wir gemeinsam abstimmen, leite die Umsetzung und helfe mit, wo es nötig ist.
- en: The knowledge stays with your team: I design the approach we agree on, lead the implementation, and help where necessary.

## `hero.fit`

- de: Für CIOs, CTOs und technische Entscheider, deren Systemlandschaft schneller gewachsen ist als ihre Struktur.
- en: For CIOs, CTOs, and engineering leaders whose system landscape has outgrown its structure.

## Pillen-Visual (`hero.visual.*`, Komponente `HeroVisual.astro` neu geschrieben)

- de Zeilen: Das Team erinnern · Händisch prüfen · Richtlinien kontrollieren · Daten kopieren · Dokumentation lesen
- en Zeilen: Remind the team · Check by hand · Police the guidelines · Copy data · Read the documentation
- Stufen de: Disziplinabhängig → Reduzieren auf das, was zählt → Entscheidungen in die Struktur einbauen → Die Struktur übernimmt ab jetzt → Integrity by Design
- Stufen en: Runs on discipline → Reduce to what matters → Embed decisions into structure → The structure takes over → Integrity by Design
- Alte aria de: Diagramm: wiederkehrende Aufgaben, die auf Disziplin beruhen, reduziert auf das, was zählt, und eingebaut als Entscheidungen, die die Struktur durchsetzt
- Alte aria en: Diagram: recurring tasks that run on discipline, reduced to what matters and embedded as decisions the structure takes over
