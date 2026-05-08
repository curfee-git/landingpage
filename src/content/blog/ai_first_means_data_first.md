---
title: "Going \"AI-First\" means \"Data-First\": Why Architectural Structure is Data for AI"
excerpt: "\"AI-first\" gets described in tools: Copilot seats, Claude Code rollouts, agents that open PRs. The decision that actually determines whether AI contributors can work in a real codebase is whether the architecture itself is treated as data."
createdAt: 2026-04-20
topic: "Architecture"
tags:
  - AI
  - Architecture
  - Context Engineering
  - Fitness Functions
  - Standards
---

Being "AI-first" means being "data-first." This phrase gets quoted and slotted into conference slides. It is usually misunderstood.

Most people describe AI-first in terms of the tools: Copilot seats, Claude Code rollouts, an internal agent that opens pull requests. That is one part of the answer. The other, the one that determines whether AI contributors can produce anything useful in a codebase larger than a weekend project, is whether the architecture itself is treated as data.

## The Context Window Has No Memory

An AI agent is not a junior engineer. A junior learns on the job. After six weeks, they no longer ask where the user repository is located, they internalize naming conventions, and they develop an instinct for which directory a new service belongs in. An agent does none of that.

AI agents do not learn your codebase. They have no persistent memory between tasks; each invocation starts with an empty slate and the tokens you provide. Anthropic's own engineering team describes this in its discussion of [effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents), treating context as a finite resource that must be curated rather than stuffed full.

From a marketing perspective, the context window seems large. In practice, it shrinks fast. Tool schemas, dependencies, previous results, the current file, the prompt itself: the budget is exhausted before anyone realized it was there. Research on long-context reasoning shows the same pattern repeatedly. Effective performance degrades long before the nominal limit. Models focus on the beginning and end of the window and overlook what is in the middle: the ["Lost in the Middle"](https://arxiv.org/abs/2307.03172) effect.

The practical consequence is uncomfortable for teams that have grown their codebase over a decade through decentralized decisions. An agent cannot store the whole codebase in its context window. Only a subset fits at any time. The question is whether that subset is representative of the rest.

If every module looks different, one module tells the agent nothing about the next. The number of tokens required for orientation on a single task skyrockets. Quality of conclusions drops as more context is loaded.

If every module follows the same pattern, one module is the system in miniature. A pattern understood once applies to the next. One example is enough.

## Structure Is Your Best Data

I keep running into the same gap when I familiarize myself with existing code. The database schema is documented. The API specifications are defined, most of the time. Technical terms appear in a glossary last updated years ago. The folder structure, the module boundaries, the way a new feature integrates into the system. All of that exists as tribal knowledge in the minds of the engineers who have been there longest. For an engineer who spends six weeks getting up to speed, that just barely works. For an AI agent called in on a Tuesday afternoon, it does not work at all.

I worked once at a company that built a product suite of more than ten domains, each owned by a different team. Every domain had a core repository plus whatever was built on top of it, for a total of more than thirty repositories across the suite. The architecture was a set of distributed monoliths. Developers rotated constantly between in-house and client projects, switching codebases every few weeks, and the inconsistency showed up everywhere. Comment styles and architectural decisions varied across files in the same repository. Each codebase had its own pipeline. Starting a local environment took a dozen Docker containers. The suite was supposed to fit together, but integration was rebuilt per customer at every rollout.

A standardized architecture transforms tribal knowledge into structured data. A recurring module pattern tells an engineer reading a code review the same thing it tells an agent analyzing a directory listing. The function is here. The tests are next to it. The contract is in this file. The boundary ends at this import rule. No additional explanation is needed, because the structure communicates the signal itself.

This is not new packaged for AI. The Thoughtworks Technology Radar has addressed [AI-accelerated shadow IT](https://www.thoughtworks.com/radar/techniques/ai-accelerated-shadow-it) and the way unstructured AI contributions accumulate technical debt in already-fragile systems. [METR's 2025 study on AI-assisted developer productivity](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) shows a related signal: experienced developers were on average 19% slower with AI tools enabled. The expected speedup did not show up. The response: more structure in AI contributions, machine-readable, enforced, consistent enough that a stateless reader recognizes it from a fragment.

This consistency is not aesthetic. It is informational. The architecture communicates to the agent, in condensed form that fits inside the context window: *Here is what a module looks like. Here are the boundaries it is not allowed to cross.*

Compare that to a codebase where one module uses Active Record with controllers calling models directly, another uses CQRS with separate read and write paths, and a third implements a thin service layer over an ORM. Each requires a new mental model. An architect creates those models once and maintains them. An agent rebuilds them for every task and pays for it with tokens and quality.

## Agents Are Replaceable Resources

Architects tend to treat agents like employees, providing context and training as if details would accumulate across sessions. This is a category mistake. Agents are stateless and interchangeable, and that is precisely their advantage.

You can deploy three different agents from three different providers on the same task and compare the results. You can swap a Claude-based agent for a GPT-based one mid-workflow, or shut one down and start another in parallel without coordination, because none of them needs the history of the others.

All of that only works if the environment they operate in is uniform. A standardized architecture makes agents interchangeable. A custom-built, culturally grown one ties you to the agent that happened to cache the most context, or to the engineer who is willing to load the same twenty files into every new session.

The honest rephrasing: the architecture has to be structured clearly enough that any agent, regardless of provider, delivers consistent results when configured to do so. This is a property of the system itself; the choice of model is incidental. [Anthropic's guidelines on building effective agents](https://www.anthropic.com/research/building-effective-agents) point in the same direction. Agents work best when the environment provides clear tool definitions and clear boundaries, with consistent feedback on every action they take. Structure outside the agent, enforced by the pipeline, remains consistent across model changes.

## The Architect's Two Audiences

The role of the architect has not changed. The audience has.

Until recently, architectural decisions were written for one kind of reader: the engineer who would maintain the code. Confluence pages, ADRs, whiteboard sketches, onboarding docs. All of it aimed at humans who could ask follow-up questions and gather tribal knowledge over time.

AI contributors have joined the room. They don't read Confluence. They don't ask follow-up questions. They see only what is in the context window, and they act on what the system allows.

Architects now write for two audiences.

An engineer reads the commit, the pull request, the review comment. An agent reads the directory layout, the import graph, the fitness function that blocks its PR. An engineer can be told something in a meeting and remember it. An agent has access to none of that. The same architectural decision has to be encoded so that the agent encounters it as a property of the code itself.

This is not a small shift. Architectural decisions have to become expressible in forms that both audiences can read. They have to be documented in a form a human can read, and enforced in a form a machine can act on. A naming convention in a wiki is instruction for humans. A lint rule that rejects the wrong name is instruction for both.

The architects who internalize this are already moving their decisions out of wikis and onboarding slides. A naming convention becomes a linter rule. A diagram of module structure becomes the actual directory layout.

The decisions have not changed. The location has. Architecture is still the work. The artifact is the system itself, written so that a machine can act on it without translation, and so that a human can still read and revise it.

## Standardization Is a One-Time Cost

This is where the economic argument matters, and where it gets uncomfortable.

Choosing a standardized architecture means a significant upfront investment. You pay for it once, in advance, and you know what it costs. The migration is manageable and the scope is bounded. You can plan the rollout over a quarter and track when the last non-compliant module was removed.

Deviating from conventions is the opposite. No one consciously decides to deviate. A repo starts clean. Someone delivers a feature under time pressure and skips the usual layout. A team lead arrives from a different stack and brings their preferred structure. A refactoring starts and never finishes. Two years later, four patterns coexist in the same codebase, each the residue of a reasonable decision, none of them enforced. The costs are distributed and invisible, and only show up when a new developer asks which pattern to follow and gets three different answers.

For a stateless agent, inconsistency is catastrophic in a way it isn't for an engineer. An engineer plays it safe. They skim the README, ask someone on Slack, look at the latest merge, and piece it together. An agent does none of that. It sees only what is in the context window. If the window contains two incompatible patterns, it picks one, usually the wrong one, and generates code that passes local tests but breaks at integration.

The argument is simple: pay the cost of standardization early, because the alternative is not free. The alternative is paid in smaller increments, indefinitely.

This is the same logic that drives database normalization in storage and static typing for runtime behavior. It is also why [architectural decision records](https://adr.github.io/) exist: to keep the reasoning available after the people who created it have moved on. Local flexibility is sacrificed for global readability. When AI agents enter the picture, global readability stops being a nice-to-have. It determines whether the agents can function at all.

## The Pipeline Enforces the Architecture

A Confluence page describing your module layout is a guideline. A pipeline check that rejects a pull request when the layout is violated is enforcement. The distinction matters more for AI contributors than for developers, because AI contributors produce large amounts of code and are not discouraged when a reviewer flags their fourth convention violation in a week.

The architecture defines the pattern. CI enforces it. The agent follows the pattern because the pipeline does not allow anything else. This is the model I keep returning to: architectural fitness functions running on every commit, each checking a property that matters. No cross-module imports. Every module exposes its port at the expected location. No database calls outside the repository layer. Every public function has a contract test.

Fitness functions are not the only tool available, but they offer the greatest flexibility. You can shape and extend them to enforce almost anything that matters, whether the code came from an engineer or an external tool.

The concept predates AI by years. Neal Ford, Rebecca Parsons, and Patrick Kua made the case in [Building Evolutionary Architectures](https://www.oreilly.com/library/view/building-evolutionary-architectures/9781491986356/). The Thoughtworks piece on [fitness-function-driven development](https://www.thoughtworks.com/insights/articles/fitness-function-driven-development) by Paula Paul and Rosemary Wang puts it into practice. Tools like [ArchUnit](https://www.archunit.org/) for dependency and boundary checks, and [Testcontainers](https://testcontainers.com/) for adapter-level integration, make these fitness functions enforceable in real pipelines.

What AI changes is urgency. A repository with five developers can survive on discipline and code reviews. A codebase with five engineers and three agents producing thirty pull requests a day cannot. Review capacity is exhausted. Enforcement has to be automated.

When the pipeline enforces the architecture, several things happen at once. Reviewers stop spending attention on layout and focus on logic. The agent receives immediate, specific feedback on every deviation. The architecture itself stops decaying, because deviations get caught at the commit that caused them, instead of months later.

There is a second-order effect I find more interesting. Once the pipeline enforces structure, the context you pass to the agent shrinks. You no longer have to explain the architecture in the prompt. You no longer need to include three example modules so the agent can infer the pattern. The pattern is guaranteed. The agent reads a module, recognizes the pattern because the pattern is consistent, and operates within it.

## Structure Is the Message

The shift from engineering-only development to development with engineers and agents does not require new architectural styles. Hexagonal, clean, onion, and others have existed for decades. What changes is the weight placed on consistency.

In a team without agents, consistency is a quality-of-life improvement that pays off over time. In a hybrid team with stateless agents, consistency becomes the bandwidth of your communication channel. Every module that follows the pattern makes every agent more effective. Every exception reduces the usable context window for every future task.

The architects who internalize this first will have clearer codebases and more predictable migrations. The ones who keep treating architecture as stylistic preference will spend the next three years re-explaining their system in every prompt.

Architecture is data. Standardized data lets the agent contribute as productively as a new engineer who has been onboarded. Inconsistent data forces the agent to spend most of its tokens reconstructing the conventions, leaving very little for the actual work.

The choice is structural. The cost is paid either upfront, in standardization work, or continuously, in time spent compensating for the lack of it.
