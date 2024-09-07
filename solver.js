const LANG="de"
let solve = () => {
  const getCompleteChatChallenge = () => {
    let challenge = ""
    for(const part of document.querySelectorAll(`[data-test="challenge challenge-dialogue"] > div > div > div > div > div > div > div > div [lang="${LANG}"]`)) {
      challenge += part.innerText
    }
    return challenge
  }

  const getSelectCorrectMeaningChallenge = () => {
    let challenge = ""
    for(const part of document.querySelectorAll('[data-test="challenge challenge-assist"] > div > div > div > div > div > div > div')) {
      challenge += part.innerText
    }
    return challenge
  }

  const MCSolver = (qtype, challenge, cbChoices = null, solution = null) => {
    const path = '[aria-label="choice"]'
    const choices = []
    for(const child of document.querySelector(path).children) {
      if(!cbChoices)
        choices.push(child.children[1].innerText)
      else choices.push(cbChoices(child))
    }
    
    const sol = solution || solutions[qtype][challenge]
    const index = choices.indexOf(sol)
    document.querySelector(`${path} > div:nth-child(${index+1})`).click()

    document.querySelector('[data-test="player-next"]').click()
    setTimeout(()=>document.querySelector('[data-test="player-next"]').click(),0)
  }

  const MatchSolver = () => {
    const path = '[data-test="challenge challenge-match"] > div > div > div'
    const choices = []
    for(const child of document.querySelector(path).children) {
      choices.push(child.children[0].children[2].innerText)
    }

    for(let i=0; i<choices.length/2; i++) {
      const english = choices[i]
      const index = choices.indexOf(solutions["Match"][english])
      document.querySelector(`${path} > span:nth-child(${i+1}) > button`).click()
      document.querySelector(`${path} > span:nth-child(${index+1}) > button`).click()
    }
    setTimeout(()=>document.querySelector('[data-test="player-next"]').click(),0)
  }

  const getFillBlankSolution = (qtype) => {
    const path = '[data-test="challenge challenge-tapComplete"] > div > div > div'
    let content = ""
    for(const child of document.querySelector(path).children) {
      if(child.getAttribute('lang') === LANG)
        content += child.innerText
      else content += "_"
    }

    return solutions[qtype][content]
  }

  const WordBankSolver = (solution) => {
    const wordBank = []
    for(const child of document.querySelector('[data-test="word-bank"]').children) {
      wordBank.push(child.innerText)
    }
    
    for(const token of solution) {
      const index = wordBank.indexOf(token)
      document.querySelector(`[data-test="word-bank"] > div:nth-child(${index+1}) > span > button`).click()
    }

    document.querySelector('[data-test="player-next"]').click()
    setTimeout(()=>document.querySelector('[data-test="player-next"]').click(),0)
  }

  const SkipListeningOrSpeaking = () => {
    document.querySelector('[data-test="player-skip"]').click()
    setTimeout(()=>document.querySelector('[data-test="player-next"]').click(),0)
  }

  // ----------------------

  const qtype = document.querySelector('[data-test="challenge-header"]').innerText;
  switch(qtype) {
    case "Select the matching pairs":
      MatchSolver()
      break;
    case "Fill in the blank":
      WordBankSolver(getFillBlankSolution(qtype))
      break;
    case "Write this in English":
      WordBankSolver(solutions[qtype][document.querySelector(`[lang="${LANG}"]`).innerText])
      break;
    case "Complete the chat":
      MCSolver(qtype, getCompleteChatChallenge())
      break;
    case "Select the correct meaning":
      MCSolver(qtype, getSelectCorrectMeaningChallenge())
      break;
    case 'Tap what you hear':
      SkipListeningOrSpeaking()
      break;
    case 'What do you hear?':
      SkipListeningOrSpeaking()
      break;
    case 'Speak this sentence':
      SkipListeningOrSpeaking()
      break;
    default:
      for(const [challengeType, challenges] of Object.entries(solutions["QuestionType"])) {
        for(const [question, solution] of Object.entries(challenges)) {
          if(question === qtype) {
            switch(challengeType) {
              case "MC Select Picture":
                MCSolver(
                  "QuestionType", question,
                  (child) => child.children[1].children[0].innerText,
                  solution
                )
                break;
            }
          }
        }
      }
      break;
  }
}
