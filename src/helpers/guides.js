export function generateGuideMeasures(guidesArr) {
  let guidesMeasuresArr = [];
  let i = 0;

  for (let i = 0, len = guidesArr.length; i < len; i++) {
    guidesMeasuresArr.push({
      id: uuidv4(),
      start: guidesArr[i].position,
      end: guidesArr[i + 1].position
    });
  }

  return guidesMeasuresArr;
}