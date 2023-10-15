module.exports = function check(str, bracketsConfig) {
  if (str.length % 2 !== 0) return false;

  const bracketsPairs = {
    openBrackets: [],
    closeBrackets: [],
    sameBrackets: [],
  };
  
  const bracketsStack = [];

  bracketsConfig.forEach((bracketsGroup) => {
    const [openBracket, closeBracket] = bracketsGroup;

    if (openBracket === closeBracket) {
      bracketsPairs.sameBrackets.push(openBracket);
    }

    bracketsPairs.openBrackets.push(openBracket);
    bracketsPairs.closeBrackets.push(closeBracket);
  });

  for (let i = 0; i < str.length; i++) {
    const bracket = str[i];
    const isOpen = bracketsPairs.openBrackets.includes(bracket);
    const isSame = bracketsPairs.sameBrackets.includes(bracket);
    const bracketsStackTop = bracketsStack.at(-1);

    if (isSame && bracketsStack.length !== 0) {
      bracketsStackTop === bracket ? bracketsStack.pop() : bracketsStack.push(bracket);
      continue;
    }

    if (isOpen) {
      bracketsStack.push(bracket);
      continue;
    }

    const closeBracketIndex = bracketsPairs.closeBrackets.findIndex(
      (closeBracket) => closeBracket === bracket
    );
    const openBracket = bracketsPairs.openBrackets[closeBracketIndex];

    if (bracketsStackTop !== openBracket) return false;

    bracketsStack.pop();
  }

  return bracketsStack.length === 0;
};
