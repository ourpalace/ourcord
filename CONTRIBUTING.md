# OurCords Contributing Guidelines

> __NOTE:__ Everything here hasn't been verified / finished yet.

## 1. Contributing

You are here to help on OurCord? Epic, feel welcome, and read the following sections to know how to start contributing and make this the most awesome Discord library!

<br>

## 2. Table of Contents

<!-- no toc -->
- [1. Contributing](#1-contributing)
- [2. Table of Contents](#2-table-of-contents)
- [3. FAQ](#3-faq)
  - [3.1. Why should I read your guidelines?](#31-why-should-i-read-your-guidelines)
  - [3.2. What do you want me to contribute?](#32-what-do-you-want-me-to-contribute)
  - [3.3. What contributions you DON'T want?](#33-what-contributions-you-dont-want)
  - [3.4. Do we have to use gitmoji for our commits and PRs?](#34-do-we-have-to-use-gitmoji-for-our-commits-and-prs)
  - [3.5. Why do we have to email you guys for security vulnerabilities instead of opening an issue?](#35-why-do-we-have-to-email-you-guys-for-security-vulnerabilities-instead-of-opening-an-issue)
  - [3.6. How do I determine whether I'm are dealing with a security issue or a normal issue?](#36-how-do-i-determine-whether-im-are-dealing-with-a-security-issue-or-a-normal-issue)
- [4. Ground Rules](#4-ground-rules)
- [5. Your First Contribution](#5-your-first-contribution)
- [6. Getting started](#6-getting-started)
- [7. How to report a bug](#7-how-to-report-a-bug)
- [8. How to suggest a feature or enhancement](#8-how-to-suggest-a-feature-or-enhancement)
- [9. Code review process](#9-code-review-process)
- [10. Conventions](#10-conventions)
  - [10.1. Code](#101-code)
    - [Indentation](#indentation)
    - [camelCase](#camelcase)
    - [Double or Single Quotes or Backticks?](#double-or-single-quotes-or-backticks)
    - [Formatting](#formatting)
  - [10.2. Commit messages](#102-commit-messages)
  - [10.3. Issue and Pull Request Labeling](#103-issue-and-pull-request-labeling)
- [11. Generating the Documentation](#11-generating-the-documentation)
  - [Using docs.sh](#using-docssh)
- [12. Developer Certificate of Origin](#12-developer-certificate-of-origin)
- [13. Links](#13-links)
  
[Back to README.md](README.md)
<br>
<br>

## 3. FAQ

> Frequently Asked Questions
<br>

#### 3.1. Why should I read your guidelines?

- Following these guidelines helps to communicate that you respect the time of the developers managing and developing this open-source project. In return, they should reciprocate that respect in addressing your issue, assessing changes, and helping you finalize your pull requests.

---

#### 3.2. What do you want me to contribute?

- Keep an open mind! Improving documentation, bug triaging, or improving ~~our bad code~~ are all examples of helpful contributions that mean less work for you.

---

#### 3.3. What contributions you DON'T want?

- Please don't use the issue tracker for any support-related questions, instead, ~~raid~~ join our [Discord](https://discord.gg/3yDQKDXXdk "Discord Invite- Our Palce") for support or consider using Stack Overflow.

---

#### 3.4. Do we have to use [gitmoji](https://gitmoji.dev/ "Gitmoji") for our commits and PRs?

- It's not necessary but recommended.

---

#### 3.5. Why do we have to email you guys for security vulnerabilities instead of opening an issue?

- For security reasons, as if you used the issue tracker, everyone can see it, but in email only we can see it.

---

##### 3.6. How do I determine whether I'm are dealing with a security issue or a normal issue?

- Ask yourself these questions:
  - Can I access something that's not mine, or something I shouldn't have access to?
  - Can I disable something for other people?
- If the answer to either of those two questions are "yes", then you're probably dealing with a security issue. Note that even if you answer "no" to both questions, you may still be dealing with a security issue, so if you're unsure, just email us at `[INSERT EMAIL ADDRESS]`.

<br>

## 4. Ground Rules

> _This section will set expectations for behavior for everyone_

- Each pull request should implement atleast __ONE__ feature or bug fix.
- Create issues for any major changes and enhancements that you wish to make. Discuss things transparently and get community feedback.
- Be aware that the pull request review process is not immediate, and is generally proportional to the number of comments of the pull request.
- Do not commit changes to files that are irrelevant to your feature or bug fix (`.gitignore`, `.markdownlint.json`, etc.).
- Be welcoming to newcomers and encourage diverse new contributors from all backgrounds.
- Be willing to accept criticism and work on improving your code.

<br>

## 5. Your First Contribution

Unsure where to begin contributing to OurCord? You can start by looking through these beginner and help-wanted issues:

- Beginner issues (Issues that should only require a few lines of code, and a test or two).
- Help wanted issues (Issues which should be a bit more involved than beginner issues).

While not perfect, a number of comments are a reasonable proxy for the impact a given change will have.

If you want to read about using OurCord or developing tutorials for OurCord bots, the OurCord documentation is free and available online. You can find the source to the documentation [here](https://ourcord.js.org "OurCord Documentation").

If you're still stuck here are a couple of tutorials:

- [Make a Pull Request](http://makeapullrequest.com/ "Make a Pull Request")
- [First Timers Only](http://www.firsttimersonly.com/ "First Timers Only")
- [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github "How to Contribute to an Open Source Project on GitHub")

_At this point, you're ready to make your changes! Feel free to ask for help, everyone is a beginner at first :D._

> __NOTE:__ If a maintainer asks you to "rebase" your PR, they're saying that a lot of code has changed and that you need to update your branch so it's easier to merge.

<br>

## 6. Getting started

> _This section is a quick walkthrough of how to submit a contribution._

For something that is bigger than a one or two-line fix:

1. [Create a fork](https://help.github.com/forking/ "GitHub Help - Forking") of `ourcord/ourcord`.
2. Edit your changes in your fork (`<your_username>/ourcord`).
3. If you like the change and think the project could use it:

- Be really really sure your code follows our [code style](#101-code)
- After that, you can now send a pull request and join the contributor gang B).

> __NOTE:__ Small contributions such as fixing spelling errors, where the content is small enough to not be considered intellectual property, can be submitted by a contributor as a patch.

As a rule of thumb, changes are obvious fixes if they do not introduce any new functionality or creative thinking. As long as the change does not affect functionality, some likely examples include the following:

- Spelling/grammar fixes
- Typo correction, white space, and formatting changes
- Comment clean up
- Bug fixes that change default return values or error codes stored in constants
- Adding logging messages or debugging output
- Changes to ‘metadata’ files like Gemfile, .gitignore, build scripts, etc.
- Moving source files from one directory or package to another

<br>

---

## 7. How to report a bug

> __!IMPORTANT!:__ If you find a security vulnerability, __DO NOT__ open an issue. Email [INSERT EMAIL ADDRESS] instead. _[FAQ #5](#35-why-do-we-have-to-email-you-guys-for-security-vulnerabilities-instead-of-opening-an-issue) & [FAQ #6](#36-how-do-i-determine-whether-im-are-dealing-with-a-security-issue-or-a-normal-issue)_
>
> __INFO:__ The template below for your bug reporting needs!

```markdown
<!--
If you need help with ourcord please join the discord server: https://discord.gg/3yDQKDXXdk
This issue tracker is only for bug reports and feature suggestions.
You won't receive any basic help here.

Replace "x" with the information
Remove "r" so the code block will work properly - You can't use a code block in a code block :(

Remember to list these in your report:
- What did you expect to see?
- What you got instead?

-->

__Please describe the problem you are having in as much detail as possible:__
x
__Include a reproducible code sample here, if possible:__
x
`r``js
<CODE>
`r``

__Further details:__

- OurCord version: x
- Node.js version: x
- Operating system: x
- Priority this issue should have: x
<!--^^ please be realistic and elaborate if possible-^^-->

__Other details:__
x

<!--
If the below applies to you, please check the respective checkbox by inserting an "x" ([] -> [x]).
You don't have to modify the text to suit your particular situation – if you want to
elaborate, please do so in the description.
It's not required to test your issue on the master branch, it would make fixing
the problem a lot easier for us, so please do so if possible. ;)
-->

- [ ] I have also tested the issue on the latest master, commit hash:
```

---

## 8. How to suggest a feature or enhancement

> _This section will give a process for suggesting a feature_

If you find yourself wishing for a feature that doesn't exist in OurCord, you are probably not alone. There are bound to be others out there with similar needs. Many of the features that OurCord has today have been added because our users saw the need. Open an issue on our issues list on GitHub which describes the feature you would like to see, why you need it, and how it should work.

> __INFO:__ The template below for your feature suggesting needs!

```markdown
<!--
If you need help with ourcord please join the discord server: https://discord.gg/3yDQKDXXdk
This issue tracker is only for bug reports and feature suggestions.
You won't receive any basic help here.
-->

**Is your feature request related to a problem? Please describe.**
A clear and concise description of what the problem is. Eg. I'm always frustrated when [...]

**Describe the ideal solution**
A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear and concise description of any alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request here.
```

---
<br>

## 9. Code review process

> _This section explains how a contribution gets accepted after it’s been submitted._

The ourcord team looks at PRs on a regular basis. It will depend on factors like _activity_ and _quality_.
After we requested feedback, we expect responses within two weeks. After two weeks we may close the pull request if it isn't showing any activity at all.

<br>

## 10. Conventions

> _This section explains the preferred style of commit messages and code!_

---

### 10.1. Code

[JSHint](https://jshint.com/ "JSHint") and [ESlint](https://eslint.org/ "ESlint") is used for checking code style and quality. It is also useful for avoiding some errors. The custom settings should be fine to use.

#### Indentation

- Indentation should be using 4 spaces instead of tabs.

---

#### camelCase

> __NOTE:__ An exception for this is [`README`](README.md), [`CODE_OF_CONDUCT`](CODE_OF_CONDUCT.md), [`CONTRIBUTING`](CONTRIBUTING.md), [`LICENSE`](LICENSE),
> and [`src/structures`](src/structures)

- camelCase should be used for all variables and file names. Avoid the use of underscores as word separators. This exetends to almost everything.

---

#### Double or Single Quotes or Backticks?

- You should be using single quotes, backticks are only needed if you need variable interpolation (``` `foo ${bar}` ```).

---

#### Formatting

- WIP

---

### 10.2. Commit messages

- Use the present tense _("Add config", not "Added config")_
- Use the imperative mood _("Move square to...", not "Moves square to...")_
- Limit the first line to 72 characters or less
- Its __[recommended](#34-do-we-have-to-use-gitmoji-for-our-commits-and-prs)__ starting the commit message with [Gitmoji](https://gitmoji.dev/ "Gitmoji").

---

### 10.3. Issue and Pull Request Labeling

> This section lists the labels we use to help us track and manage issues and pull requests!
>
> __NOTE:__ If you have suggestions for new labels, open a issue ;).

| Label name | Search 🔎 (`ourcord/ourcord`) | Description |
|-|-|-|
| `bug` | [Search](https://github.com/ourcord/ourcord/issues?q=label%3Abug+) | Confirmed bugs or very likely to be bugs. |
| `documentation` | [Search](https://github.com/ourcord/ourcord/issues?q=label%3Adocumentation+) | Anything related to documentation. |
| `duplicate` | [Search](https://github.com/ourcord/ourcord/issues?q=label%3Aduplicate+) | Issues which are duplicates of other issues. |
| `enhancement`  | [Search](https://github.com/ourcord/ourcord/issues?q=label%3Aenhancement+) | Feature requests. |
| `good first issue` | [Search](https://github.com/ourcord/ourcord/issues?q=label%3A%22good+first+issue%22+) | A good first issue! |
| `help wanted` | [Search](https://github.com/ourcord/ourcord/issues?q=+label%3A%22help+wanted%22+) | We need some help here! |
| `important` | [Search](https://github.com/ourcord/ourcord/issues?q=label%3Aimportant+) | Important, thats all. |
| `invalid` | [Search](https://github.com/ourcord/ourcord/issues?q=label%3Ainvalid+) | Invalid issues. |
| `Please fix this now Mattthew` | [Search](https://github.com/ourcord/ourcord/issues?q=label%3A%22Please+fix+this+now+Mattthew%22+) | Summons Mattthew to fix this. |
| `wontfix` | [Search](https://github.com/ourcord/ourcord/issues?q=label%3Awontfix+) | Won't be fixed on. |

---
<br>

## 11. Generating the Documentation

> This section gives a step by step guide to generate the documentation.
>
> __NOTE:__ The only time you'll need to regenerate the documentation is when
> you change [`README.md`](README.md) or code in [`src/`](src/).

### Using docs.sh

> You might not have to do Step 3 if you're using Vercel or Netlify. Doing just Step 1 should be enough. _(Remember to commit!)_

1. Run `npm run docs:gen` at the root directory.
2. Run `npm run docs:dev` to view the docs in development mode.
3. Run `npm run docs:build` to build your docs for production

_If your having any problems ask [@khalby786](https://github.com/khalby786)._

<br>

## 12. Developer Certificate of Origin

```txt
Developer's Certificate of Origin 1.1

By making a contribution to this project, I certify that:

(a) The contribution was created in whole or in part by me and I
    have the right to submit it under the open source license
    indicated in the file; or

(b) The contribution is based upon previous work that, to the best
    of my knowledge, is covered under an appropriate open source
    license and I have the right under that license to submit that
    work with modifications, whether created in whole or in part
    by me, under the same open source license (unless I am
    permitted to submit under a different license), as indicated
    in the file; or

(c) The contribution was provided directly to me by some other
    person who certified (a), (b) or (c) and I have not modified
    it.

(d) I understand and agree that this project and the contribution
    are public and that a record of the contribution (including all
    personal information I submit with it, including my sign-off) is
    maintained indefinitely and may be redistributed consistent with
    this project or the open source license(s) involved.
```

---

## 13. Links

- [Discord Server](https://discord.gg/3yDQKDXXdk "Discord Invite- Our Palce")
- [Gitmoji](https://gitmoji.dev/ "Gitmoji")
- [Documentation](https://ourcord.js.org "OurCord Documentation")
- [Make a Pull Request](http://makeapullrequest.com/ "Make a Pull Request")
- [First Timers Only](http://www.firsttimersonly.com/ "First Timers Only")
- [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github "How to Contribute to an Open Source Project on GitHub")
- [Forking](https://help.github.com/forking/ "GitHub Help - Forking")
- [JSHint](https://jshint.com/ "JSHint")
- [ESlint](https://eslint.org/ "ESlint")

---

[Back to top](#ourcords-contributing-guidelines) | [Back to README.md](README.md)

> Copyright (C) 2020 OurCord and its contributors.
