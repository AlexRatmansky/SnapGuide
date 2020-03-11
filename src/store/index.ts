import _ from 'lodash';
import { createStore } from 'redux';
import { Guide } from '~/components/Guide';
import { Direction } from '~/constants';

enum Action {
  TOGGLE_ACTIVE = 'TOGGLE_ACTIVE',
  TOGGLE_VERTICAL_RULE = 'TOGGLE_VERTICAL_RULE',
  TOGGLE_HORIZONTAL_RULE = 'TOGGLE_HORIZONTAL_RULE',
  CLEAR_GUIDES = 'CLEAR_GUIDES',
  ARROW_POSITIONING = 'ARROW_POSITIONING',
  TOGGLE_LEGEND = 'TOGGLE_LEGEND',
  UPDATE_SCROLL_POSITION = 'UPDATE_SCROLL_POSITION',
  UPDATE_WINDOW_SIZE = 'UPDATE_WINDOW_SIZE',
  UPDATE_CURSOR_POS = 'UPDATE_CURSOR_POS',
  UPDATE_CROSS_POS = 'UPDATE_CROSS_POS',
  UPDATE_ELEM = 'UPDATE_ELEM',
}

export const toggleActive = () => ({
  type: Action.TOGGLE_ACTIVE,
});

export const toggleVerticalRule = () => ({
  type: Action.TOGGLE_VERTICAL_RULE,
});

export const toggleHorizontalRule = () => ({
  type: Action.TOGGLE_HORIZONTAL_RULE,
});

export const clearGuides = () => ({
  type: Action.CLEAR_GUIDES,
});

export const updateCursorPos = eventData => ({
  type: Action.UPDATE_CURSOR_POS,
  eventData,
});

export const updateCrossPos = eventData => ({
  type: Action.UPDATE_CROSS_POS,
  eventData,
});

export const updateElem = eventData => ({
  type: Action.UPDATE_ELEM,
  eventData,
});

export const arrowPositioning = params => ({
  type: Action.ARROW_POSITIONING,
  params,
});

export const toggleLegend = () => ({
  type: Action.TOGGLE_LEGEND,
});

export const updateScrollPosition = scrollPosition => ({
  type: Action.UPDATE_SCROLL_POSITION,
  scrollPosition,
});

export const updateWindowSize = windowSize => ({
  type: Action.UPDATE_WINDOW_SIZE,
  windowSize,
});

export interface Store {
  showApp: boolean;
  verticalGuides: Array<Guide>;
  horizontalGuides: Array<Guide>;
  guidesArr: any;
  legendVisible: boolean;
  cursorPos: any;
  crossPos: any;
  elem?: any;
  scrollPosition: any;
  windowSize: any;
  showLegend: boolean;
}

const initialState: Store = {
  showApp: true,

  // verticalGuides: (NODE_ENV === 'development' && CONFIG.VERTICAL_GUIDES) || [],
  // horizontalGuides: (NODE_ENV === 'development' && CONFIG.HORIZONTAL_GUIDES) || [],
  verticalGuides: [],
  horizontalGuides: [],
  guidesArr: [],
  legendVisible: true,
  cursorPos: {
    x: 0,
    y: 0,
  },
  crossPos: {
    x: 0,
    y: 0,
  },
  elem: undefined,
  scrollPosition: {
    scrollTop: window.pageYOffset,
    scrollLeft: window.pageXOffset,
  },
  windowSize: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  showLegend: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Action.TOGGLE_ACTIVE:
      return Object.assign({}, state, {
        showApp: !state.showApp,
      });

    case Action.TOGGLE_VERTICAL_RULE:
      let guidesArr = [...state.verticalGuides];
      let currGuidePosition = state.cursorPos.x;
      let currGuidePositionInArray = _.findIndex(guidesArr, guide => guide.position === currGuidePosition);

      if (currGuidePositionInArray === -1) {
        guidesArr.push({ position: currGuidePosition });
        return Object.assign({}, state, {
          verticalGuides: _.sortBy(guidesArr, ['position']),
        });
      } else {
        _.pullAt(guidesArr, currGuidePositionInArray);
      }
      return;

    case Action.TOGGLE_HORIZONTAL_RULE:
      let guidesArr2 = state.horizontalGuides;
      let currGuidePosition2 = state.cursorPos.y;
      let currGuidePositionInArray2 = _.findIndex(guidesArr2, guide => guide.position === currGuidePosition2);

      if (currGuidePositionInArray2 === -1) {
        guidesArr2.push({ position: currGuidePosition2 });
        return Object.assign({}, state, {
          horizontalGuides: _.sortBy(guidesArr2, ['position']),
        });
      } else {
        _.pullAt(guidesArr2, currGuidePositionInArray2);
      }
      return;

    case Action.CLEAR_GUIDES:
      return Object.assign({}, state, {
        verticalGuides: [],
        horizontalGuides: [],
      });

    case Action.UPDATE_CURSOR_POS:
      return Object.assign({}, state, { cursorPos: action.eventData });

    case Action.UPDATE_CROSS_POS:
      return Object.assign({}, state, { crossPos: action.eventData });

    case Action.UPDATE_ELEM:
      return Object.assign({}, state, { elem: action.eventData });

    case Action.ARROW_POSITIONING:
      let step = action.params.shiftKey ? 10 : 1;
      let axis;

      switch (action.params.direction) {
        case Direction.UP:
          axis = 'y';
          step *= -1;
          break;

        case Direction.DOWN:
          axis = 'y';
          break;

        case Direction.LEFT:
          axis = 'x';
          step *= -1;
          break;

        case Direction.RIGHT:
          axis = 'x';
          break;

        default:
          break;
      }

      const transfer = { crossPos: {}, cursorPos: {} };
      transfer.crossPos[axis] = state.crossPos[axis] + step;
      transfer.cursorPos[axis] = state.cursorPos[axis] + step;

      return Object.assign({}, state, transfer);

    case Action.TOGGLE_LEGEND:
      return Object.assign({}, state, {
        legendVisible: !state.legendVisible,
      });

    case Action.UPDATE_SCROLL_POSITION:
      return Object.assign({}, state, {
        scrollPosition: Object.assign({}, action.scrollPosition),
      });

    case Action.UPDATE_WINDOW_SIZE:
      return Object.assign({}, state, {
        windowSize: Object.assign({}, action.windowSize),
      });

    default:
      return state;
  }
};

export const store = createStore(reducer);
