---
title: "Going \"AI-First\" means \"Data-First\": Why Architectural Structure is Data for AI"
excerpt: "Most teams treat \"AI-first\" as a tooling decision. It's a data decision, and the one of the most underestimated form of data is the architecture itself."
createdAt: 2026-04-20
topic: "Architecture"
tags:
  - AI
  - Architecture
  - Context Engineering
  - Fitness Functions
  - Standards
---

Being "AI-first" means being "data-first." This phrase is quoted, shared, and included in conference slides. But it is usually misunderstood. Most describe the tools themselves: Copilot seats, the introduction of Claude Code, an internal agent that initiates pull requests. That's the surface level. Behind it lies the decision that actually determines whether AI contributors can produce something useful in a codebase larger than a weekend project. This decision is all about data.

The structure of your repository consists of data. The structure of a module consists of data. The names of the folders, the location of the test file next to the service file, the fact that every scoped context provides a port in the same location, all of these is structural data that a stateless agent must infer from the information you provide in its context window. An "AI-first" approach is a "data-first" approach, and the most underestimated form of data is the architecture itself.

Data, in the context of "AI-first," is not just the rows in Postgres, the embeddings in a vector store, or the JSON data flying back and forth between services. The architectural structure itself is a form of data. And the architecture you choose is the most reliable communication channel between an architect and a stateless AI agent.

Most teams overlook this. They treat architecture as a cultural artifact, something that lead engineers carry around in their heads, enforced through code reviews, lunch conversations, and the occasional Confluence page that no one has opened since onboarding. This model works for a team of five people who have been working together for years. It breaks down the moment the primary maintainer of a module is an agent who has no memory of yesterday's pull request.

## The Context Window has No Memory

An AI agent performing a task is not a junior engineer. A junior engineer learns on the job. After six weeks, they no longer ask where the user repository is located. They internalize naming conventions. They develop an instinct for which directory a new service belongs. An agent does none of these things.

AI agents do not learn your codebase. They have no persistent memory between tasks. Each invocation starts with an empty memory and the tokens you provide. Anthropic's own development team clearly describes this limitation in its discussion of [effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents), where it views context as a finite resource that must be deliberately curated rather than simply stuffed full.

From a marketing perspective, the window seems large. In practice, however, it shrinks quickly. Dependencies, type definitions, the prompt, previous tool outputs, test frameworks, the file the agent is editing. The budget is exhausted before you've even noticed it was there. Research on long-context reasoning consistently reveals the same pattern: effective performance deteriorates long before the nominal limit, and this pattern has a name: "Lost in the Middle", models focus on the beginning and end of the window, overlooking what lies in the middle.

Every task starts from scratch. The context window is limited. Depending on the model and level, it ranges somewhere between [200,000 and 2 million tokens](https://www.anthropic.com/news/claude-sonnet-4-5), but in practice it is far less when you factor in tool schemas, previous rounds, and retrieved files. The agent does not get to know your codebase. It does not accumulate institutional knowledge. It does not remember the meeting where you decided that email sending would run through `notifications` rather than `users`.

The practical consequence is problematic for teams that have built up their codebase over a decade through decentralized decisions. An agent cannot keep the entire codebase in mind; it can only store a subset of it. The question is whether this subset is representative for the rest.

If every module in the system looks different, a single module tells the agent nothing about the next one. The number of tokens required for orientation for a single task skyrockets. The quality of the conclusions decreases as more context is available. A phenomenon that is now well documented in [research on degradation with long context](https://arxiv.org/abs/2307.03172) as already mentioned (the "lost-in-the-middle" effect, where models overlook information hidden in the middle of large prompts).

If every module follows the same pattern, a single module is the system in miniature. A module that has been understood can be applied to the next one. The pattern fits into the window because the window needs only one example of it.

## Structure Is Your Best Data

Time and again, I come across the same gap when I’m familiarizing myself with existing code. The database schema is documented. The API specifications are defined at least most of the time. The technical terms are listed in a glossary that was last updated years ago. The folder structure, the module boundaries, the way a new feature is integrated into the system all of this is "tribal knowledge" stored in the minds of the engineers who have been there the longest. For an engineer who spends six weeks getting up to speed, this just barely works. For an AI agent called upon on a Tuesday afternoon, it doesn't work at all.

A standardized architecture transforms tribal knowledge into structured data. A recurring module pattern tells an engineer reading a code review the same thing as an agent analyzing a directory listing. The function is located here. Your tests are located there. Your contract is in this file. Your boundary ends at this import rule. No additional explanation is needed to convey this signal, because the structure carries it within itself.

This isn't a new idea that's just been dressed up for AI. The Thoughtworks Technology Radar has already bluntly addressed the risks of [AI-accelerated shadow IT](https://www.thoughtworks.com/radar/techniques/ai-accelerated-shadow-it) and the way unstructured AI contributions accumulate technical debt in systems that were already in a tailspin. [METR's 2025 study on AI-assisted developer productivity](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) tracks a related signal: experienced developers were on average 19% slower when AI tools were allowed, not faster. The answer to this is: more structure in AI contributions. In my experience, this structure must be machine-readable, enforced, and consistent enough that a "stateless" reader can recognize it from a fragment.

This consistency isn't aesthetic. It's informational. The architecture communicates to the agent, in a condensed form that fits within the context window: *Here is what a module looks like, here is the logic, here are the side effects, here is where you are not allowed to cross.*

Compare this to a codebase where one module uses Active Record, with controllers calling models directly; another uses CQRS with separate read and write paths; and a third implements a thin service layer over an ORM. Each requires a new mental model. An architect creates these models once and maintains them. An agent must rebuild them for every task and pays for it with tokens and the quality of their conclusions.

## Standardization Is a One-Time Cost

This is where it gets economically interesting, and this is where the somewhat uncomfortable argument lies.

Opting for a standardized architecture entails a significant upfront investment. You pay for it once in advance and know exactly what it costs. The migration is manageable. The scope is limited. You can plan the rollout over the course of a quarter and track when the last non-compliant module was removed.

Deviating from conventions is the opposite of that. No one consciously decides to deviate from them. A repo starts out clean. Someone publishes a feature under time pressure and skips the usual layout. A team lead comes from a different stack and brings their preferred structure with them. A refactoring begins and is never completed. Two years later, there are four patterns in the same codebase, each the spirit of a reasonable decision, none of them enforced. The costs are distributed, invisible, and only become apparent when a new developer asks which pattern to follow and receives three different answers.

For a stateless agent, a discrepancy is catastrophic in a way that it isn't for an engineer. An engineer plays it safe. He skims the README file, asks someone on Slack, looks at the latest merge, and pieces the information together. An agent does none of that. He only sees what's in the window. If the window contains two incompatible patterns, they pick one of them usually the wrong one for the task, and generate code that passes local tests but causes the integration to fail.

The argument for the architectural decision is simple: you should bear the costs of standardization early on, because the alternative isn't free, it involves worse costs that are paid in small increments and forever.

This is the same approach that database normalization takes for data, static typing for runtime behavior, and [architectural decision records](https://adr.github.io/) for the chain of reasoning. Local flexibility is sacrificed in order to gain global readability. When AI agents come into play, global readability is no longer just a nice-to-have feature, but determines whether the agents can function at all.

## Agents Are Workers

Architects tend to treat agents like employees. They provide them with context, train them, and build up their understanding. This is a category mistake. Agents are not trainees. They are stateless, interchangeable, and fundamentally replaceable, and that is precisely their advantage, not their limitation.

You can deploy three different programming agents from three different providers for the same task and compare the results. You can swap out a Claude-based agent for a GPT-based one in the middle of a workflow. You can shut one down, start another up, or chain them together sequentially. You can run them in parallel across modules without any coordination effort, since none of them needs the history of the others.

All of this only works if the environment in which they operate is uniform. A standardized architecture makes agents interchangeable. A custom-built, culturally grown architecture ties you to the agent that happens to have cached the most context, or to the engineer who is willing to insert the same twenty files into every new session.

The honest rephrasing: The architecture must be structured so clearly that any agent, regardless of its provider, delivers consistent results when configured to do so. This is a property of the system, not the model. [Google's guidelines on agent-based AI architectural patterns](https://docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system) point in a similar direction: agents should be viewed as combinable "workers" within a system whose structure is defined outside of them.

The technical leverage here is real. [Anthropic's published guidelines on building effective agents](https://www.anthropic.com/research/building-effective-agents) repeatedly emphasize this: agents work best when the environment provides them with clear tools, clear boundaries, and consistent feedback signals. A structure outside the agent, enforced by the pipeline, unchanged across model changes.

## The Pipeline Enforces the Architecture

A Confluence page describing your module's layout is a guideline. A pipeline check that rejects a pull request if the layout is violated is a decision that enforces itself. This distinction is more important than ever for AI contributors compared to developers who write code by hand, since AI contributors produce large amounts of code and are not deterred when a reviewer points out their fourth violation of conventions within a week.

The architecture defines the pattern. CI ensures compliance with the pattern. The agent follows the pattern because the pipeline does not allow for anything else. This is the model I keep coming back to: a set of architecture fitness functions that run with every commit, each checking an important property: no cross-module imports, every module exposes its port at the expected location, no database calls outside the repository layer, and every public function has a contract test.

Even though fitness functions aren't the only quality assurance tools available, you can create, optimize, and use them to your heart's content. With them, you can test just about anything that matters to you whether you wrote the code yourself or it comes from an external tool. For getting started, they offer the greatest flexibility of all available options.

Fitness functions are not a new concept. Neal Ford, Rebecca Parsons, and Patrick Kua made the case for them in [Building Evolutionary Architectures](https://www.oreilly.com/library/view/building-evolutionary-architectures/9781491986356/) years before AI agents arrived, and the Thoughtworks piece on [fitness-function-driven development](https://www.thoughtworks.com/insights/articles/fitness-function-driven-development) by Paula Paul and Rosemary Wang puts the idea into concrete practice. Tools like [ArchUnit](https://www.archunit.org/) for dependency and module-boundary checks, and [Testcontainers](https://testcontainers.com/) for adapter-level integration, make these fitness functions enforceable in real pipelines. What AI changes is the sense of urgency. A repository with five developers can survive through discipline and code reviews. A codebase with five engineers and three agents generating thirty pull requests daily cannot. The capacity for reviews is exhausted. Enforcement must be automated.

When the pipeline enforces the architecture, three things happen simultaneously. Technical reviewers no longer waste attention on layout checks and instead focus on logic. The agent receives immediate, specific feedback on every deviation. And the architecture itself no longer decays, since deviations are detected at the commit that caused them, rather than in the quarter when they are noticed.

These aren't mere formalities. Every check is a piece of architecture encoded as executable data that is human-readable, enforced by the pipeline, and implicitly processed by the agent via the feedback loop: "Your pull request failed because it exceeded this limit." The agent doesn't need to read the architecture treatise. It needs the red X on the failed check, and it will adapt to the pattern within a few iterations.

There's a second-order effect that I find more interesting. As soon as the pipeline enforces the structure, the context you pass to the agent shrinks. You no longer have to explain the architecture in the command line. You no longer need to include three example modules so that it can deduce the form. The form is already guaranteed. The agent reads a module, recognizes the pattern because the pattern is simply the pattern and operates within it.

If this is the state your system landscape needs to reach, [a structural diagnosis](/#services) is usually the fastest way to identify where the architecture is still carried in people's heads versus where the pipeline already enforces it.

## The Architect's Two Audiences

The role of the architect is changing, though not to the dramatic extent that the discussion sometimes suggests. The architect still makes the decisions. He continues to weigh the pros and cons. He still defines the structure of the system. The difference is that these decisions now have two target audiences: the developers who will maintain the code, and the agents who will interact with it without ever seeing a Confluence page.

Writing for both target groups simultaneously is an art in itself. This means that architectural decisions must be expressible in code in directory structures, in lint rules, in fitness functions, in port definitions and not just in wikis. It means viewing the repository's layout as part of the interface the system provides to its contributors, whether they are engineers or agents. It means recognizing when a local deviation from the pattern costs more in consistency than it gains in local elegance.

## Structure Is the Message

The transition from purely engineering-driven development to development involving engineers and agents does not require new architectural styles. Architectures have been around for decades: hexagonal architecture, clean architecture, onion architecture, and many more. What changes is the importance placed on consistency.

In a team without agents, consistency is a nice bonus that pays off over time. In a hybrid team with stateless agents, consistency is the bandwidth of your communication channel. Every module that follows the pattern makes every agent more effective. Every exception reduces the usable context window for every future task.

The architects who internalize this first will have clearer codebases, faster agents, and more predictable migrations. Those who continue to treat architecture as a stylistic preference will spend the next three years repeatedly re-explaining their system, one context window at a time.

Architecture is data. Standardize the data, and the agent becomes a contributor. Leave it custom-built, and the agent becomes a burden, not because the agent is weak, but because the channel is noisy.

Choose your channel deliberately.
