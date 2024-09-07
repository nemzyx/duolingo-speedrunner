# 🦜 Duolingo Speedrunning / XP Farmer 🌾
This script works 100% with just the default browser console. No installs or anything needed! Easy to run.

The `solver` works by looking up challenges in the `solutions` object, and then pressing the right buttons in the UI.

# How to Use
Currently works for `German > Section 2, Unit 1 > Level 1`. Open that in browser version of duolingo.

1. Copy `solver.js` and paste into browser console.
2. Copy `solutions.js` and paste into browser console.
3. Run `solve()` command in browser console (just type it like that and hit enter)

If you get an error it's most likely because the solution haven't been added yet. Then just manually solve the challenge and try running `solve()` again on the next one.

# Automation
Once all solutions have been added (or at least almost all of them), I will add another script in here that also automates running the `solve()` command, so that the lesson can be completed at ridiculous speed and farm XP or whatever you heart desires.

# Handling Listening/Speaking Challenges:
These are simply handled by the `solve()` command automatically pressing "Can't listen right now" button which makes Duolingo give an alternative challenge that can be solved without listening or speaking. So the `solve()` command does work for these challenges.

# ✍️ Solutions
Currently solutions are added for a lot of questions on `German > Section 2, Unit 1 > Level 1`. You should have some luck trying to run `solve()` on that one, but not all the solutions have been added yet. That's why I put this on GitHub - I was hoping others would like to contribute the missing solutions.

Most solutions fit into a "Question Type" where the title of the challenge is the type. E.g. "Write this in English".
However a few challenges have the specific question embedded in the title, so these are handled differently and belong in the `QuestionType` section of the `solutions`.

# Known issues
Currently there is just a single issue with this specific challenge:
```js
// "Write this in English" / Word Bank questions
'Ich spreche kein Deutsch, aber ich spreche Englisch.': ['I', "don't", 'speak', 'German', 'but', 'I', 'speak', 'English'],
```
This is a ***word bank*** question (the ones where you have to click words to translate a german sentence). The issue is that the bank of words contain duplicates, e.g. "speak" is there twice. The `solver` algorithm currently can't handle this, and needs to be patched to account for these instances. I haven't found other questions like this so far, but there likely are. For now, just skip / manually solve these. I will be working on a patch for resolving this eventually, but for now i've been able to complete the level multiple times with encountering this type of case. So it's not a priority atm, since it seems to be a slightly rare case.
