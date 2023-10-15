module.exports = function check(str, bracketsConfig) {
  if (str.length % 2 !== 0) return false;

  const bracketsPairs = {
    openBrackets: [],
    closeBrackets: {},
    sameBrackets: [],
  };

  const bracketsStack = [];

  bracketsConfig.forEach((bracketsGroup) => {
    const [openBracket, closeBracket] = bracketsGroup;

    if (openBracket === closeBracket) {
      bracketsPairs.sameBrackets.push(openBracket);
    }

    bracketsPairs.openBrackets.push(openBracket);
    bracketsPairs.closeBrackets[closeBracket] = openBracket;
  });

  for (let i = 0; i < str.length; i++) {
    const bracket = str[i];
    const isOpen = bracketsPairs.openBrackets.includes(bracket);
    const isSame = bracketsPairs.sameBrackets.includes(bracket);
    const isbracketsStackEmpty = bracketsStack.length === 0;
    const bracketsStackTop = bracketsStack.at(-1);

    if (isSame && !isbracketsStackEmpty) {
      bracketsStackTop === bracket ? bracketsStack.pop() : bracketsStack.push(bracket);
      continue;
    }

    if (isOpen) {
      bracketsStack.push(bracket);
      continue;
    }

    const openBracket = bracketsPairs.closeBrackets[bracket];

    if (bracketsStackTop !== openBracket) return false;

    bracketsStack.pop();
  }

  return bracketsStack.length === 0;
};
